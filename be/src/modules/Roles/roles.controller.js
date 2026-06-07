const rolesService = require('./roles.service');
const {
  ApiSuccessResponse,
  ApiPaginationSuccessResponse,
} = require('../../utils/ApiSuccessResponse');

// POST /api/roles
exports.createRole = async (req, res) => {
  const role = await rolesService.createRole(req.body);
  return ApiSuccessResponse(res, 201, 'Role created successfully', role);
};

// GET /api/roles
exports.getRoles = async (req, res) => {
  const { roles, pagination } = await rolesService.getRoles(req.query);
  return ApiPaginationSuccessResponse(res, 200, 'Roles fetched successfully', roles, pagination);
};

// GET /api/roles/:id
exports.getRoleById = async (req, res) => {
  const role = await rolesService.getRoleById(req.params.id);
  return ApiSuccessResponse(res, 200, 'Role found', role);
};

// PATCH /api/roles/:id
exports.updateRole = async (req, res) => {
  const updated = await rolesService.updateRole(req.params.id, req.body);
  return ApiSuccessResponse(res, 200, 'Role updated successfully', updated);
};

// POST /api/roles/:id/permissions/add
exports.addPermissionsToRole = async (req, res) => {
  const updated = await rolesService.addPermissionsToRole(req.params.id, req.body.permissionIds);
  return ApiSuccessResponse(res, 200, 'Permissions added to role successfully', updated);
};

// POST /api/roles/:id/permissions/remove
exports.removePermissionsFromRole = async (req, res) => {
  const updated = await rolesService.removePermissionsFromRole(req.params.id, req.body.permissionIds);
  return ApiSuccessResponse(res, 200, 'Permissions removed from role successfully', updated);
};

// PUT /api/roles/:id/permissions
exports.setPermissionsOnRole = async (req, res) => {
  const updated = await rolesService.setPermissionsOnRole(req.params.id, req.body.permissionIds);
  return ApiSuccessResponse(res, 200, 'Role permissions updated successfully', updated);
};

// POST /api/roles/assign-to-user
exports.assignRoleToUser = async (req, res) => {
  const result = await rolesService.assignRoleToUser(req.body);
  return ApiSuccessResponse(res, 200, 'Role assigned to user successfully', result);
};

// DELETE /api/roles/:id
exports.softDeleteRole = async (req, res) => {
  const result = await rolesService.softDeleteRole(req.params.id);
  return ApiSuccessResponse(res, 200, 'Role deactivated (soft deleted) successfully', result);
};
