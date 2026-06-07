import React, { useState, useEffect } from 'react';
import {
  fetchRoles,
  createRole,
  updateRole,
  softDeleteRole,
  fetchPermissions,
  setPermissionsOnRole,
  assignRoleToUser
} from '../lib/api';
import {
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  UserCheck,
  Search,
  X,
  Loader2,
  AlertCircle,
  CheckSquare,
  Square,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Save,
  Users
} from 'lucide-react';
import toast from 'react-hot-toast';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // System-wide permissions list (for assignment)
  const [allPermissions, setAllPermissions] = useState([]);
  const [loadingPerms, setLoadingPerms] = useState(false);

  // Modals / Panels
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [permPanelOpen, setPermPanelOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);

  // Selected entities
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedPermIds, setSelectedPermIds] = useState([]);

  // Form States
  const [editingId, setEditingId] = useState(null);
  const [roleForm, setRoleForm] = useState({ name: '', code: '', isActive: true });
  const [roleErrors, setRoleErrors] = useState({});
  const [submittingRole, setSubmittingRole] = useState(false);
  
  const [assignForm, setAssignForm] = useState({ userId: '', roleId: '' });
  const [assignErrors, setAssignErrors] = useState({});
  const [submittingAssign, setSubmittingAssign] = useState(false);
  
  const [savingPermissions, setSavingPermissions] = useState(false);

  const loadRoles = async () => {
    setLoading(true);
    try {
      const res = await fetchRoles({ page, limit, search });
      setRoles(res.data || []);
      setTotalPages(res.pagination?.totalPages || 1);
      setTotal(res.pagination?.total || 0);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load roles');
    } finally {
      setLoading(false);
    }
  };

  const loadAllPermissions = async () => {
    setLoadingPerms(true);
    try {
      const res = await fetchPermissions({ limit: 100 });
      setAllPermissions(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load system permissions');
    } finally {
      setLoadingPerms(false);
    }
  };

  useEffect(() => {
    loadRoles();
    loadAllPermissions();
  }, [page, search]);

  const handleOpenAddRole = () => {
    setEditingId(null);
    setRoleForm({ name: '', code: '', isActive: true });
    setRoleErrors({});
    setRoleModalOpen(true);
  };

  const handleOpenEditRole = (role) => {
    setEditingId(role._id);
    setRoleForm({ name: role.name, code: role.code, isActive: role.isActive });
    setRoleErrors({});
    setRoleModalOpen(true);
  };

  const handleOpenPermissions = (role) => {
    setSelectedRole(role);
    // Extract mapped IDs from populated permissions array
    const mappedIds = role.permissions ? role.permissions.map(p => typeof p === 'object' ? p._id : p) : [];
    setSelectedPermIds(mappedIds);
    setPermPanelOpen(true);
  };

  const handleOpenAssign = (role) => {
    setAssignForm({ userId: '', roleId: role._id });
    setAssignErrors({});
    setUserModalOpen(true);
  };

  const validateRoleForm = () => {
    const errors = {};
    if (!roleForm.name.trim()) errors.name = 'Role name is required';
    if (!editingId && !roleForm.code.trim()) {
      errors.code = 'Role code is required';
    } else if (!editingId && !/^[A-Z][A-Z0-9_]*$/.test(roleForm.code)) {
      errors.code = 'Code must be SCREAMING_SNAKE_CASE (e.g. EDITOR)';
    }
    setRoleErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRoleSubmit = async (e) => {
    e.preventDefault();
    if (!validateRoleForm()) return;

    setSubmittingRole(true);
    try {
      if (editingId) {
        await updateRole(editingId, {
          name: roleForm.name.trim(),
          isActive: roleForm.isActive,
        });
      } else {
        await createRole({
          name: roleForm.name.trim(),
          code: roleForm.code.trim().toUpperCase(),
          isActive: roleForm.isActive,
        });
      }
      setRoleModalOpen(false);
      loadRoles();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Action failed');
    } finally {
      setSubmittingRole(false);
    }
  };

  const handleTogglePermission = (permId) => {
    if (selectedPermIds.includes(permId)) {
      setSelectedPermIds(selectedPermIds.filter(id => id !== permId));
    } else {
      setSelectedPermIds([...selectedPermIds, permId]);
    }
  };

  const handleSavePermissions = async () => {
    if (!selectedRole) return;
    setSavingPermissions(true);
    try {
      await setPermissionsOnRole(selectedRole._id, selectedPermIds);
      setPermPanelOpen(false);
      loadRoles();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to update permissions');
    } finally {
      setSavingPermissions(false);
    }
  };

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!assignForm.userId.trim()) errors.userId = 'User ID is required';
    if (!/^[0-9a-fA-F]{24}$/.test(assignForm.userId.trim())) {
      errors.userId = 'User ID must be a valid 24-character hex MongoDB ID';
    }
    setAssignErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmittingAssign(true);
    try {
      await assignRoleToUser({
        userId: assignForm.userId.trim(),
        roleId: assignForm.roleId,
      });
      setUserModalOpen(false);
      loadRoles();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to assign role to user');
    } finally {
      setSubmittingAssign(false);
    }
  };

  const handleDeleteRole = async (id) => {
    if (!window.confirm('Are you sure you want to deactivate (soft delete) this role?')) return;

    try {
      await softDeleteRole(id);
      loadRoles();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to deactivate role');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="text-indigo-600" size={24} />
            Roles Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Configure system access levels, assign security permissions, and map roles to users.
          </p>
        </div>
        <button
          onClick={handleOpenAddRole}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-indigo-600/20 active:scale-95 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 text-sm self-start sm:self-auto"
        >
          <Plus size={16} />
          Create Role
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search roles by name or code..."
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
          Total: <span className="font-semibold text-slate-700">{total}</span> roles
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="text-indigo-600 animate-spin" size={36} />
            <span className="text-slate-400 text-sm font-medium">Loading system roles...</span>
          </div>
        ) : roles.length === 0 ? (
          <div className="text-center py-16 px-6">
            <ShieldCheck className="mx-auto text-slate-300 mb-4 opacity-40" size={48} />
            <h3 className="font-bold text-slate-800 text-lg">No Roles Found</h3>
            <p className="text-slate-400 text-sm mt-1 max-w-sm mx-auto">
              {search
                ? 'No roles matched your search. Try adjusting the query.'
                : 'Create user roles to manage your application permissions.'}
            </p>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="mt-4 text-xs font-bold text-indigo-600 hover:text-indigo-700 px-3 py-1.5 border border-indigo-100 hover:border-indigo-200 rounded-xl bg-indigo-50/50 cursor-pointer"
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
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role Code</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Permissions Count</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {roles.map((role) => (
                  <tr key={role._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4.5 whitespace-nowrap">
                      <div className="font-semibold text-slate-800 text-sm">{role.name}</div>
                    </td>
                    <td className="px-6 py-4.5 whitespace-nowrap">
                      <span className="inline-flex items-center font-mono text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100/60 px-2.5 py-1 rounded-md">
                        {role.code}
                      </span>
                    </td>
                    <td className="px-6 py-4.5 whitespace-nowrap">
                      {role.isActive ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4.5 whitespace-nowrap">
                      <span className="text-slate-600 text-sm font-semibold">
                        {role.permissions?.length || 0} assigned
                      </span>
                    </td>
                    <td className="px-6 py-4.5 whitespace-nowrap text-right text-xs font-medium">
                      <div className="flex items-center justify-end gap-2.5">
                        <button
                          onClick={() => handleOpenPermissions(role)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all cursor-pointer flex items-center gap-1.5 text-xs"
                          title="Assign Permissions"
                        >
                          <ShieldCheck size={13} />
                          Permissions
                        </button>
                        <button
                          onClick={() => handleOpenAssign(role)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all cursor-pointer flex items-center gap-1.5 text-xs"
                          title="Assign Role to User"
                          disabled={!role.isActive}
                          style={{ opacity: role.isActive ? 1 : 0.5 }}
                        >
                          <UserCheck size={13} />
                          Assign User
                        </button>
                        <button
                          onClick={() => handleOpenEditRole(role)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all cursor-pointer"
                          title="Edit Role Name"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteRole(role._id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-100 hover:bg-red-50/30 transition-all cursor-pointer"
                          title="Deactivate / Delete"
                          disabled={!role.isActive}
                          style={{ opacity: role.isActive ? 1 : 0.5 }}
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

      {/* Role Creation / Editing Modal */}
      {roleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-[fadeSlide_0.2s_ease]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <ShieldCheck className="text-indigo-600" size={18} />
                {editingId ? 'Edit Role' : 'Create Role'}
              </h3>
              <button
                onClick={() => setRoleModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleRoleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Role Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Content Editor"
                  value={roleForm.name}
                  onChange={(e) => setRoleForm({ ...roleForm, name: e.target.value })}
                  className={`w-full px-3.5 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all
                    ${roleErrors.name ? 'border-red-400' : 'border-slate-200'}`}
                />
                {roleErrors.name && (
                  <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} /> {roleErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Role Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. EDITOR"
                  value={roleForm.code}
                  onChange={(e) => setRoleForm({ ...roleForm, code: e.target.value })}
                  disabled={!!editingId}
                  className={`w-full px-3.5 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all font-mono uppercase
                    ${editingId ? 'bg-slate-50 text-slate-400 cursor-not-allowed border-slate-200' : roleErrors.code ? 'border-red-400' : 'border-slate-200'}`}
                />
                {editingId ? (
                  <p className="text-[10px] text-slate-400 mt-1">
                    System role code is immutable once created.
                  </p>
                ) : (
                  <p className="text-[10px] text-slate-400 mt-1">
                    Use uppercase letters and underscores only.
                  </p>
                )}
                {roleErrors.code && (
                  <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} /> {roleErrors.code}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={roleForm.isActive}
                  onChange={(e) => setRoleForm({ ...roleForm, isActive: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                />
                <label htmlFor="isActive" className="text-sm font-semibold text-slate-700 cursor-pointer">
                  Role is Active
                </label>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => setRoleModalOpen(false)}
                  className="px-4 py-2.5 text-slate-500 hover:text-slate-700 text-sm font-medium border border-slate-200 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingRole}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl active:scale-95 shadow-md shadow-indigo-600/15 disabled:opacity-50 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  {submittingRole && <Loader2 size={14} className="animate-spin" />}
                  {editingId ? 'Save Changes' : 'Create Role'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Permissions Assignment Slide-over */}
      {permPanelOpen && selectedRole && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl border-l border-slate-100 animate-[slideOver_0.22s_ease]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <ShieldCheck className="text-indigo-600" size={19} />
                  Role Permissions
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Set permissions on role: <span className="font-semibold text-slate-600">{selectedRole.name}</span>
                </p>
              </div>
              <button
                onClick={() => setPermPanelOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {loadingPerms ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <Loader2 className="text-indigo-600 animate-spin" size={28} />
                  <span className="text-slate-400 text-xs font-semibold">Loading system permissions...</span>
                </div>
              ) : allPermissions.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                  <ShieldAlert className="mx-auto text-slate-300 mb-2" size={32} />
                  <p className="text-slate-500 text-xs font-semibold">No permissions created yet.</p>
                  <p className="text-slate-400 text-[10px] mt-0.5">Create permissions first before assigning them.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {allPermissions.map((perm) => {
                    const isChecked = selectedPermIds.includes(perm._id);
                    return (
                      <div
                        key={perm._id}
                        onClick={() => handleTogglePermission(perm._id)}
                        className={`flex items-start gap-3.5 p-3.5 rounded-xl border transition-all cursor-pointer select-none
                          ${isChecked
                            ? 'bg-indigo-50/40 border-indigo-200/80 shadow-[0_2px_8px_rgba(79,70,229,0.04)]'
                            : 'bg-white border-slate-100 hover:bg-slate-50/50 hover:border-slate-200'}`}
                      >
                        <div className="mt-0.5 flex-shrink-0 text-indigo-600">
                          {isChecked ? (
                            <CheckSquare size={16} className="fill-indigo-100" />
                          ) : (
                            <Square size={16} className="text-slate-300" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-slate-800 text-sm">{perm.name}</span>
                            <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
                              ({perm.code})
                            </span>
                          </div>
                          {perm.description && (
                            <p className="text-xs text-slate-400 mt-1 leading-normal">{perm.description}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-4">
              <span className="text-xs text-slate-400 font-medium">
                {selectedPermIds.length} of {allPermissions.length} selected
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPermPanelOpen(false)}
                  className="px-4 py-2 text-slate-500 hover:text-slate-700 text-xs font-semibold border border-slate-200 hover:bg-white rounded-lg transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSavePermissions}
                  disabled={savingPermissions}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-md shadow-indigo-600/10 disabled:opacity-50 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  {savingPermissions ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Save size={13} />
                  )}
                  Save Mappings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role Assignment Modal (Assign role to user) */}
      {userModalOpen && selectedRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-[fadeSlide_0.2s_ease]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <UserCheck className="text-indigo-600" size={18} />
                Assign Role to User
              </h3>
              <button
                onClick={() => setUserModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleAssignSubmit} className="p-6 space-y-4">
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Role</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-slate-700 text-sm">{selectedRole.name}</span>
                  <span className="font-mono text-xs text-slate-400 font-bold">({selectedRole.code})</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  User ID (ObjectId)
                </label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="e.g. 6480f7d54fa5a62e08e6471a"
                    value={assignForm.userId}
                    onChange={(e) => setAssignForm({ ...assignForm, userId: e.target.value })}
                    className={`w-full pl-10 pr-3.5 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all
                      ${assignErrors.userId ? 'border-red-400' : 'border-slate-200'}`}
                  />
                </div>
                {assignErrors.userId && (
                  <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} /> {assignErrors.userId}
                  </p>
                )}
                <p className="text-[10px] text-slate-400 mt-1.5">
                  Enter the 24-character hexadecimal database ID of the user you want to assign this role to.
                </p>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => setUserModalOpen(false)}
                  className="px-4 py-2.5 text-slate-500 hover:text-slate-700 text-sm font-medium border border-slate-200 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingAssign}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl active:scale-95 shadow-md shadow-indigo-600/15 disabled:opacity-50 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  {submittingAssign && <Loader2 size={14} className="animate-spin" />}
                  Assign Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roles;
