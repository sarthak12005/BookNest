// Admin API library — mirrors fe/src/lib/api.js
import axiosInstance from './axiosInstance';
import toast from 'react-hot-toast';

// ─── Auth ───────────────────────────────────────────────────────────────────
export const loginAdmin = async ({ email, password }) => {
  const res = await axiosInstance.post('/auth/login', { email, password });
  return res.data;
};

export const fetchAdminUser = async () => {
  const res = await axiosInstance.get('/auth/me');
  return res.data.user;
};

export const logoutAdmin = async () => {
  await axiosInstance.post('/auth/logout');
};

// ─── Roles ──────────────────────────────────────────────────────────────────
export const fetchRoles = async (params = {}) => {
  const res = await axiosInstance.get('/roles', { params });
  return res.data;
};

export const fetchRoleById = async (id) => {
  const res = await axiosInstance.get(`/roles/${id}`);
  return res.data.data;
};

export const createRole = async (data) => {
  const res = await axiosInstance.post('/roles', data);
  toast.success('Role created successfully');
  return res.data.data;
};

export const updateRole = async (id, data) => {
  const res = await axiosInstance.patch(`/roles/${id}`, data);
  toast.success('Role updated successfully');
  return res.data.data;
};

export const addPermissionsToRole = async (roleId, permissionIds) => {
  const res = await axiosInstance.post(`/roles/${roleId}/permissions/add`, { permissionIds });
  toast.success('Permissions added to role');
  return res.data.data;
};

export const removePermissionsFromRole = async (roleId, permissionIds) => {
  const res = await axiosInstance.post(`/roles/${roleId}/permissions/remove`, { permissionIds });
  toast.success('Permissions removed from role');
  return res.data.data;
};

export const setPermissionsOnRole = async (roleId, permissionIds) => {
  const res = await axiosInstance.put(`/roles/${roleId}/permissions`, { permissionIds });
  toast.success('Role permissions updated');
  return res.data.data;
};

export const assignRoleToUser = async ({ userId, roleId }) => {
  const res = await axiosInstance.post('/roles/assign-to-user', { userId, roleId });
  toast.success('Role assigned to user');
  return res.data.data;
};

export const softDeleteRole = async (id) => {
  const res = await axiosInstance.delete(`/roles/${id}`);
  toast.success('Role deactivated');
  return res.data.data;
};

// ─── Permissions ────────────────────────────────────────────────────────────
export const fetchPermissions = async (params = {}) => {
  const res = await axiosInstance.get('/permissions', { params });
  return res.data;
};

export const fetchPermissionById = async (id) => {
  const res = await axiosInstance.get(`/permissions/${id}`);
  return res.data.data;
};

export const createPermission = async (data) => {
  const res = await axiosInstance.post('/permissions', data);
  toast.success('Permission created successfully');
  return res.data.data;
};

export const updatePermission = async (id, data) => {
  const res = await axiosInstance.patch(`/permissions/${id}`, data);
  toast.success('Permission updated successfully');
  return res.data.data;
};

export const deletePermission = async (id) => {
  const res = await axiosInstance.delete(`/permissions/${id}`);
  toast.success('Permission deleted');
  return res.data.data;
};
