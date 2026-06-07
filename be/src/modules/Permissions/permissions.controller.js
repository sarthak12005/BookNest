const permissionsService = require('./permissions.service');
const {
  ApiSuccessResponse,
  ApiPaginationSuccessResponse,
} = require('../../utils/ApiSuccessResponse');

// POST /api/permissions
exports.createPermission = async (req, res) => {
  const permission = await permissionsService.createPermission(req.body);
  return ApiSuccessResponse(res, 201, 'Permission created successfully', permission);
};

// GET /api/permissions
exports.getPermissions = async (req, res) => {
  const { permissions, pagination } = await permissionsService.getPermissions(req.query);
  return ApiPaginationSuccessResponse(res, 200, 'Permissions fetched successfully', permissions, pagination);
};

// GET /api/permissions/:id
exports.getPermissionById = async (req, res) => {
  const permission = await permissionsService.getPermissionById(req.params.id);
  return ApiSuccessResponse(res, 200, 'Permission found', permission);
};

// PATCH /api/permissions/:id
exports.updatePermission = async (req, res) => {
  const updated = await permissionsService.updatePermission(req.params.id, req.body);
  return ApiSuccessResponse(res, 200, 'Permission updated successfully', updated);
};

// DELETE /api/permissions/:id
exports.deletePermission = async (req, res) => {
  const result = await permissionsService.deletePermission(req.params.id);
  return ApiSuccessResponse(res, 200, 'Permission deleted successfully', result);
};
