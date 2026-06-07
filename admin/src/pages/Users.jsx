import React, { useState, useEffect } from 'react';
import { fetchUsers, updateUser, deleteUser, fetchRoles } from '../lib/api';
import {
  Users as UsersIcon,
  Edit2,
  Trash2,
  Search,
  X,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Shield,
} from 'lucide-react';
import toast from 'react-hot-toast';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // System roles list for dropdown
  const [roles, setRoles] = useState([]);

  // Modal / Form state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '', // read-only
    role: '',
    isVerified: false,
    blocked: false,
    isActive: true,
    bio: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await fetchUsers({ page, limit, search });
      setUsers(res.data || []);
      setTotalPages(res.pagination?.totalPages || 1);
      setTotal(res.pagination?.total || 0);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const loadRolesList = async () => {
    try {
      const res = await fetchRoles({ limit: 100 });
      setRoles(res.data || []);
    } catch (err) {
      console.error('Error loading roles list:', err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page, search]);

  useEffect(() => {
    loadRolesList();
  }, []);

  const handleOpenEdit = (user) => {
    setEditingId(user._id);
    setFormData({
      fullName: user.fullName || '',
      username: user.username || '',
      email: user.email || '',
      role: typeof user.role === 'object' ? user.role?._id : user.role || '',
      isVerified: !!user.isVerified,
      blocked: !!user.blocked,
      isActive: user.isActive !== undefined ? user.isActive : true,
      bio: user.bio || '',
    });
    setFormErrors({});
    setModalOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.username.trim()) errors.username = 'Username is required';
    if (!formData.role) errors.role = 'Role selection is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    const parsedData = {
      fullName: formData.fullName.trim(),
      username: formData.username.trim().toLowerCase(),
      role: formData.role,
      isVerified: formData.isVerified,
      blocked: formData.blocked,
      isActive: formData.isActive,
      bio: formData.bio.trim(),
    };

    try {
      await updateUser(editingId, parsedData);
      setModalOpen(false);
      loadUsers();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        'Are you sure you want to deactivate (soft-delete) this user? The user will no longer be active.'
      )
    )
      return;

    try {
      await deleteUser(id);
      loadUsers();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to deactivate user');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <UsersIcon className="text-indigo-600" size={24} />
            Users Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Browse registered profiles, moderate access block status, and update system role
            mappings.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search users by name, username, or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 text-sm text-slate-700 transition-colors placeholder:text-slate-400"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <div className="text-xs text-slate-400 whitespace-nowrap">
          Total: <span className="font-semibold text-slate-700">{total}</span> users
        </div>
      </div>

      {/* Grid or Table list */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="text-indigo-600 animate-spin" size={36} />
            <span className="text-slate-400 text-sm font-medium">Loading user list...</span>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-16 px-6">
            <UsersIcon className="mx-auto text-slate-300 mb-4 opacity-40" size={48} />
            <h3 className="font-bold text-slate-800 text-lg">No Users Found</h3>
            <p className="text-slate-400 text-sm mt-1 max-w-sm mx-auto">
              {search
                ? 'No users matched your query. Try a different search term.'
                : 'No users registered on the platform yet.'}
            </p>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="mt-4 text-xs font-bold text-indigo-600 hover:text-indigo-700 px-3.5 py-2 border border-indigo-100 hover:border-indigo-200 rounded-xl bg-indigo-50/50 cursor-pointer"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/75 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Verification
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-xs flex-shrink-0">
                          {u.profilePic ? (
                            <img
                              src={u.profilePic}
                              alt="avatar"
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            u.fullName?.slice(0, 2).toUpperCase() || 'JD'
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 text-sm">{u.fullName}</div>
                          <div className="text-xs text-slate-400">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono text-xs text-slate-500">@{u.username}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100/40">
                        <Shield size={11} />
                        {typeof u.role === 'object' ? u.role?.name : 'User'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {u.isVerified ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
                          Unverified
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {u.blocked ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded-md">
                          Blocked
                        </span>
                      ) : u.isActive ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                      <div className="flex items-center justify-end gap-2.5">
                        <button
                          onClick={() => handleOpenEdit(u)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all cursor-pointer"
                          title="Edit Profile"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(u._id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-100 hover:bg-red-50/30 transition-all cursor-pointer"
                          title="Deactivate / Block User"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
            <span className="text-xs text-slate-500">
              Page <span className="font-semibold text-slate-700">{page}</span> of{' '}
              <span className="font-semibold text-slate-700">{totalPages}</span>
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit User Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-[fadeSlide_0.2s_ease]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <UserCheck className="text-indigo-600" size={18} />
                Modify User Profile
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 bg-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Email Address (Read-only)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-400 cursor-not-allowed text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-3.5 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all
                    ${formErrors.fullName ? 'border-red-400' : 'border-slate-200'}`}
                />
                {formErrors.fullName && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={10} /> {formErrors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="e.g. johndoe"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className={`w-full px-3.5 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all
                    ${formErrors.username ? 'border-red-400' : 'border-slate-200'}`}
                />
                {formErrors.username && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={10} /> {formErrors.username}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Role Assignment
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className={`w-full px-3.5 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all bg-white
                    ${formErrors.role ? 'border-red-400' : 'border-slate-200'}`}
                >
                  <option value="">-- Choose Role --</option>
                  {roles.map((r) => (
                    <option key={r._id} value={r._id}>
                      {r.name}
                    </option>
                  ))}
                </select>
                {formErrors.role && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={10} /> {formErrors.role}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Short Bio
                </label>
                <textarea
                  placeholder="A short description about this user..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={2}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all resize-none"
                />
              </div>

              {/* Status Toggles */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isVerified"
                    checked={formData.isVerified}
                    onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                  />
                  <label
                    htmlFor="isVerified"
                    className="text-xs font-semibold text-slate-700 cursor-pointer"
                  >
                    Profile is Email Verified
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="blocked"
                    checked={formData.blocked}
                    onChange={(e) => setFormData({ ...formData, blocked: e.target.checked })}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-slate-300"
                  />
                  <label
                    htmlFor="blocked"
                    className="text-xs font-semibold text-slate-700 cursor-pointer text-red-600"
                  >
                    Block User (Suspend access)
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActiveUser"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                  />
                  <label
                    htmlFor="isActiveUser"
                    className="text-xs font-semibold text-slate-700 cursor-pointer"
                  >
                    User Account is Active
                  </label>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 text-slate-500 hover:text-slate-700 text-sm font-medium border border-slate-200 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl active:scale-95 shadow-md shadow-indigo-600/15 disabled:opacity-50 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  {submitting && <Loader2 size={14} className="animate-spin" />}
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
