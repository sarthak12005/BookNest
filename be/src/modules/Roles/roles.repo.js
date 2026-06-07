const { Types } = require('mongoose');
const Role = require('./schemas/roles.schema');

// ─── Create ────────────────────────────────────────────────────────────────
exports.createRole = async (data) => {
  return await Role.create(data);
};

// ─── Find by ID ────────────────────────────────────────────────────────────
exports.findRoleById = async (id, populate = false) => {
  const query = Role.findById(new Types.ObjectId(id));
  if (populate) query.populate('permissions', '_id name code description');
  return await query.lean();
};

// ─── Find by code (unique lookup) ──────────────────────────────────────────
exports.findRoleByCode = async (code) => {
  return await Role.findOne({ code: code.toUpperCase() }).lean();
};

// ─── Find by name ──────────────────────────────────────────────────────────
exports.findRoleByName = async (name) => {
  return await Role.findOne({ name: name.toLowerCase() }).lean();
};

// ─── Paginated list ────────────────────────────────────────────────────────
exports.getRoles = async ({ filter, sort, skip, limit }) => {
  const [roles, total] = await Promise.all([
    Role.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('permissions', '_id name code description')
      .lean(),
    Role.countDocuments(filter),
  ]);
  return { roles, total };
};

// ─── Update role fields ────────────────────────────────────────────────────
exports.updateRole = async (id, updateData) => {
  return await Role.findOneAndUpdate(
    { _id: new Types.ObjectId(id), isActive: { $exists: true } },
    { $set: updateData },
    { new: true, runValidators: true }
  )
    .populate('permissions', '_id name code description')
    .lean();
};

// ─── Add permissions ($addToSet — no duplicates) ───────────────────────────
exports.addPermissionsToRole = async (roleId, permissionIds) => {
  return await Role.findByIdAndUpdate(
    new Types.ObjectId(roleId),
    { $addToSet: { permissions: { $each: permissionIds.map((id) => new Types.ObjectId(id)) } } },
    { new: true }
  )
    .populate('permissions', '_id name code description')
    .lean();
};

// ─── Remove permissions ────────────────────────────────────────────────────
exports.removePermissionsFromRole = async (roleId, permissionIds) => {
  return await Role.findByIdAndUpdate(
    new Types.ObjectId(roleId),
    { $pull: { permissions: { $in: permissionIds.map((id) => new Types.ObjectId(id)) } } },
    { new: true }
  )
    .populate('permissions', '_id name code description')
    .lean();
};

// ─── Set (replace) all permissions ─────────────────────────────────────────
exports.setPermissionsOnRole = async (roleId, permissionIds) => {
  return await Role.findByIdAndUpdate(
    new Types.ObjectId(roleId),
    { $set: { permissions: permissionIds.map((id) => new Types.ObjectId(id)) } },
    { new: true }
  )
    .populate('permissions', '_id name code description')
    .lean();
};

// ─── Soft delete (isActive = false) ───────────────────────────────────────
exports.softDeleteRole = async (id) => {
  return await Role.findByIdAndUpdate(
    new Types.ObjectId(id),
    { $set: { isActive: false } },
    { new: true }
  ).lean();
};

// ─── Hard delete ───────────────────────────────────────────────────────────
exports.hardDeleteRole = async (id) => {
  return await Role.findByIdAndDelete(new Types.ObjectId(id));
};
