const permissionsRepo = require('./permissions.repo');
const {
  throwBadRequestException,
  throwNotFoundException,
} = require('../../utils/errorResponse');

// ─── Create Permission ──────────────────────────────────────────────────────
exports.createPermission = async (body) => {
  const { name, code, description } = body;

  const normalizedCode = code.toUpperCase().trim();
  const normalizedName = name.toUpperCase().trim();

  // Guard: code must be unique
  const existingByCode = await permissionsRepo.findPermissionByCode(normalizedCode);
  if (existingByCode) {
    throwBadRequestException('Permission code already exists', [
      {
        field: 'code',
        message: `A permission with code '${normalizedCode}' already exists.`,
      },
    ]);
  }

  // Guard: name must be unique
  const existingByName = await permissionsRepo.findPermissionByName(normalizedName);
  if (existingByName) {
    throwBadRequestException('Permission name already exists', [
      {
        field: 'name',
        message: `A permission with name '${normalizedName}' already exists.`,
      },
    ]);
  }

  const permission = await permissionsRepo.createPermission({
    name: normalizedName,
    code: normalizedCode,
    description: description?.trim(),
  });

  return permission;
};

// ─── Get All Permissions (paginated + search) ───────────────────────────────
exports.getPermissions = async (filters) => {
  const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = filters;

  const filter = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { code: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
  const skip = (page - 1) * limit;

  const { permissions, total } = await permissionsRepo.getPermissions({ filter, sort, skip, limit });

  return {
    permissions,
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

// ─── Get Permission by ID ───────────────────────────────────────────────────
exports.getPermissionById = async (id) => {
  const permission = await permissionsRepo.findPermissionById(id);
  if (!permission) {
    throwNotFoundException('Permission not found', [
      { field: 'id', message: `No permission found with id '${id}'.` },
    ]);
  }
  return permission;
};

// ─── Update Permission ──────────────────────────────────────────────────────
exports.updatePermission = async (id, body) => {
  const existing = await permissionsRepo.findPermissionById(id);
  if (!existing) {
    throwNotFoundException('Permission not found');
  }

  const updateData = {};

  if (body.name !== undefined) {
    const normalizedName = body.name.toUpperCase().trim();
    const duplicate = await permissionsRepo.findPermissionByName(normalizedName);
    if (duplicate && duplicate._id.toString() !== id) {
      throwBadRequestException('Permission name already in use', [
        { field: 'name', message: `Another permission with name '${normalizedName}' already exists.` },
      ]);
    }
    updateData.name = normalizedName;
  }

  if (body.description !== undefined) {
    updateData.description = body.description.trim();
  }

  const updated = await permissionsRepo.updatePermission(id, updateData);
  return updated;
};

// ─── Delete Permission ──────────────────────────────────────────────────────
exports.deletePermission = async (id) => {
  const existing = await permissionsRepo.findPermissionById(id);
  if (!existing) {
    throwNotFoundException('Permission not found');
  }
  await permissionsRepo.deletePermission(id);
  return { id, deleted: true };
};
