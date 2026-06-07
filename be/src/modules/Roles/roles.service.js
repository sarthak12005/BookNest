const { Types } = require('mongoose');
const rolesRepo = require('./roles.repo');
const permissionsRepo = require('../Permissions/permissions.repo');
const User = require('../Users/schema/users.schema');
const {
  throwBadRequestException,
  throwNotFoundException,
} = require('../../utils/errorResponse');

// ─── Helper: verify all permission IDs exist ──────────────────────────────
const verifyPermissionsExist = async (permissionIds) => {
  if (!permissionIds || permissionIds.length === 0) return;

  const found = await permissionsRepo.findPermissionsByIds(permissionIds);
  if (found.length !== permissionIds.length) {
    const foundIds = new Set(found.map((p) => p._id.toString()));
    const invalid = permissionIds.filter((id) => !foundIds.has(id));
    throwBadRequestException('One or more permission IDs are invalid', [
      {
        field: 'permissionIds',
        message: `The following permission IDs do not exist: ${invalid.join(', ')}`,
      },
    ]);
  }
};

// ─── Create Role ──────────────────────────────────────────────────────────
exports.createRole = async (body) => {
  const { name, code, permissions = [], isActive } = body;

  const normalizedCode = code.toUpperCase().trim();
  const normalizedName = name.toLowerCase().trim();

  // Guard: code uniqueness
  const byCode = await rolesRepo.findRoleByCode(normalizedCode);
  if (byCode) {
    throwBadRequestException('Role code already exists', [
      { field: 'code', message: `A role with code '${normalizedCode}' already exists.` },
    ]);
  }

  // Guard: name uniqueness
  const byName = await rolesRepo.findRoleByName(normalizedName);
  if (byName) {
    throwBadRequestException('Role name already exists', [
      { field: 'name', message: `A role with name '${normalizedName}' already exists.` },
    ]);
  }

  // Verify all given permission IDs exist
  if (permissions.length > 0) {
    await verifyPermissionsExist(permissions);
  }

  const role = await rolesRepo.createRole({
    name: normalizedName,
    code: normalizedCode,
    permissions: permissions.map((id) => new Types.ObjectId(id)),
    isActive: isActive ?? true,
  });

  // Repopulate permissions for the response
  return await rolesRepo.findRoleById(role._id.toString(), true);
};

// ─── Get All Roles (paginated) ─────────────────────────────────────────────
exports.getRoles = async (filters) => {
  const { page = 1, limit = 10, search, isActive, sortBy = 'createdAt', sortOrder = 'desc' } = filters;

  const filter = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { code: { $regex: search, $options: 'i' } },
    ];
  }
  if (isActive !== undefined) filter.isActive = isActive;

  const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
  const skip = (page - 1) * limit;

  const { roles, total } = await rolesRepo.getRoles({ filter, sort, skip, limit });

  return {
    roles,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  };
};

// ─── Get Role by ID ────────────────────────────────────────────────────────
exports.getRoleById = async (id) => {
  const role = await rolesRepo.findRoleById(id, true);
  if (!role) {
    throwNotFoundException('Role not found', [{ field: 'id', message: `No role found with id '${id}'.` }]);
  }
  return role;
};

// ─── Update Role (name, isActive only) ────────────────────────────────────
exports.updateRole = async (id, body) => {
  const existing = await rolesRepo.findRoleById(id);
  if (!existing) throwNotFoundException('Role not found');

  const updateData = {};

  if (body.name !== undefined) {
    const normalizedName = body.name.toLowerCase().trim();
    const duplicate = await rolesRepo.findRoleByName(normalizedName);
    if (duplicate && duplicate._id.toString() !== id) {
      throwBadRequestException('Role name already in use', [
        { field: 'name', message: `Another role with name '${normalizedName}' already exists.` },
      ]);
    }
    updateData.name = normalizedName;
  }

  if (body.isActive !== undefined) updateData.isActive = body.isActive;

  return await rolesRepo.updateRole(id, updateData);
};

// ─── Add Permissions to Role ───────────────────────────────────────────────
exports.addPermissionsToRole = async (roleId, permissionIds) => {
  const role = await rolesRepo.findRoleById(roleId);
  if (!role) throwNotFoundException('Role not found');

  await verifyPermissionsExist(permissionIds);

  return await rolesRepo.addPermissionsToRole(roleId, permissionIds);
};

// ─── Remove Permissions from Role ─────────────────────────────────────────
exports.removePermissionsFromRole = async (roleId, permissionIds) => {
  const role = await rolesRepo.findRoleById(roleId, true);
  if (!role) throwNotFoundException('Role not found');

  // Guard: warn if trying to remove a permission not currently on the role
  const currentPermissionIds = new Set(role.permissions.map((p) => p._id.toString()));
  const notPresent = permissionIds.filter((id) => !currentPermissionIds.has(id));
  if (notPresent.length > 0) {
    throwBadRequestException('Some permission IDs are not assigned to this role', [
      {
        field: 'permissionIds',
        message: `The following IDs are not on this role: ${notPresent.join(', ')}`,
      },
    ]);
  }

  return await rolesRepo.removePermissionsFromRole(roleId, permissionIds);
};

// ─── Set (replace all) Permissions on Role ─────────────────────────────────
exports.setPermissionsOnRole = async (roleId, permissionIds) => {
  const role = await rolesRepo.findRoleById(roleId);
  if (!role) throwNotFoundException('Role not found');

  if (permissionIds.length > 0) {
    await verifyPermissionsExist(permissionIds);
  }

  return await rolesRepo.setPermissionsOnRole(roleId, permissionIds);
};

// ─── Assign Role to User ───────────────────────────────────────────────────
exports.assignRoleToUser = async ({ userId, roleId }) => {
  // Check role exists and is active
  const role = await rolesRepo.findRoleById(roleId);
  if (!role) throwNotFoundException('Role not found');
  if (!role.isActive) {
    throwBadRequestException('Cannot assign an inactive role', [
      { field: 'roleId', message: 'The selected role is currently inactive.' },
    ]);
  }

  // Check user exists
  const user = await User.findById(userId).select('_id username email role').lean();
  if (!user) {
    throwNotFoundException('User not found', [
      { field: 'userId', message: `No user found with id '${userId}'.` },
    ]);
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: { role: roleId } },
    { new: true }
  )
    .select('_id username email role')
    .populate('role', '_id name code')
    .lean();

  return updatedUser;
};

// ─── Soft Delete Role ──────────────────────────────────────────────────────
exports.softDeleteRole = async (id) => {
  const existing = await rolesRepo.findRoleById(id);
  if (!existing) throwNotFoundException('Role not found');

  if (!existing.isActive) {
    throwBadRequestException('Role is already inactive', [
      { field: 'id', message: 'This role has already been deactivated.' },
    ]);
  }

  return await rolesRepo.softDeleteRole(id);
};
