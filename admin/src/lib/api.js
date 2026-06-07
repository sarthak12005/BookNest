// Admin API library — mirrors fe/src/lib/api.js
import axiosInstance from './axiosInstance';
import toast from 'react-hot-toast';

// ─── Auth ───────────────────────────────────────────────────────────────────
export const loginAdmin = async ({ email, password }) => {
  const res = await axiosInstance.post('/auth/login', { email, password });
  return res.data.data;
};

export const fetchAdminUser = async () => {
  const res = await axiosInstance.get('/auth/me');
  return res.data.data.user;
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

// ─── Books ──────────────────────────────────────────────────────────────────
export const fetchBooks = async (params = {}) => {
  const res = await axiosInstance.get('/books', { params });
  return res.data;
};

export const fetchBookById = async (id) => {
  const res = await axiosInstance.get(`/books/${id}`);
  return res.data.data;
};

export const createBook = async (data) => {
  const res = await axiosInstance.post('/books', data);
  toast.success('Book added successfully');
  return res.data.data;
};

export const updateBook = async (id, data) => {
  const res = await axiosInstance.patch(`/books/${id}`, data);
  toast.success('Book updated successfully');
  return res.data.data;
};

export const deleteBook = async (id) => {
  const res = await axiosInstance.delete(`/books/${id}`);
  toast.success('Book deleted successfully');
  return res.data.data;
};

// ─── Categories ─────────────────────────────────────────────────────────────
export const fetchCategories = async (params = {}) => {
  const res = await axiosInstance.get('/category', { params });
  return res.data; // returns both data and pagination
};

export const fetchCategoryById = async (id) => {
  const res = await axiosInstance.get(`/category/${id}`);
  return res.data.data;
};

export const createCategory = async (data) => {
  const res = await axiosInstance.post('/category', data);
  toast.success('Category created successfully');
  return res.data.data;
};

export const updateCategory = async (id, data) => {
  const res = await axiosInstance.put(`/category/${id}`, data);
  toast.success('Category updated successfully');
  return res.data.data;
};

export const deleteCategory = async (id) => {
  const res = await axiosInstance.delete(`/category/${id}`);
  toast.success('Category deleted successfully');
  return res.data.data;
};

// ─── Users ──────────────────────────────────────────────────────────────────
export const fetchUsers = async (params = {}) => {
  const res = await axiosInstance.get('/users', { params });
  return res.data;
};

export const fetchUserById = async (id) => {
  const res = await axiosInstance.get(`/users/${id}`);
  return res.data.data;
};

export const updateUser = async (id, data) => {
  const res = await axiosInstance.patch(`/users/${id}`, data);
  toast.success('User details updated successfully');
  return res.data.data;
};

export const deleteUser = async (id) => {
  const res = await axiosInstance.delete(`/users/${id}`);
  toast.success('User deactivated successfully');
  return res.data.data;
};

// ─── Authors ────────────────────────────────────────────────────────────────
export const fetchAuthors = async () => {
  const res = await axiosInstance.get('/books/authors');
  return res.data.data || [];
};
