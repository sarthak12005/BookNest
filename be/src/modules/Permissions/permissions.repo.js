const { Types } = require('mongoose');
const Permission = require('./schemas/permissions.schema');

// ─── Create ────────────────────────────────────────────────────────────────
exports.createPermission = async (data) => {
  return await Permission.create(data);
};

// ─── Find by ID ────────────────────────────────────────────────────────────
exports.findPermissionById = async (id) => {
  return await Permission.findById(new Types.ObjectId(id));
};

// ─── Find by code (unique lookup) ──────────────────────────────────────────
exports.findPermissionByCode = async (code) => {
  return await Permission.findOne({ code: code.toUpperCase() });
};

// ─── Find by name (unique lookup) ──────────────────────────────────────────
exports.findPermissionByName = async (name) => {
  return await Permission.findOne({ name: name.toUpperCase() });
};

// ─── Paginated list ────────────────────────────────────────────────────────
exports.getPermissions = async ({ filter, sort, skip, limit }) => {
  const [permissions, total] = await Promise.all([
    Permission.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    Permission.countDocuments(filter),
  ]);
  return { permissions, total };
};

// ─── Find many by IDs (used when assigning to roles) ──────────────────────
exports.findPermissionsByIds = async (ids) => {
  return await Permission.find({
    _id: { $in: ids.map((id) => new Types.ObjectId(id)) },
  }).lean();
};

// ─── Update ────────────────────────────────────────────────────────────────
exports.updatePermission = async (id, updateData) => {
  return await Permission.findByIdAndUpdate(
    new Types.ObjectId(id),
    { $set: updateData },
    { new: true, runValidators: true }
  );
};

// ─── Delete (hard delete — permissions are system-level data) ──────────────
exports.deletePermission = async (id) => {
  return await Permission.findByIdAndDelete(new Types.ObjectId(id));
};
