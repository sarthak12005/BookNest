import React, { useState, useEffect } from 'react';
import { fetchPermissions, createPermission, updatePermission, deletePermission } from '../lib/api';
import { Key, Plus, Edit2, Trash2, Search, X, Loader2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Permissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Modal / Form state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', code: '', description: '' });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const loadPermissions = async () => {
    setLoading(true);
    try {
      const res = await fetchPermissions({ page, limit, search });
      setPermissions(res.data || []);
      setTotalPages(res.pagination?.totalPages || 1);
      setTotal(res.pagination?.total || 0);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load permissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPermissions();
  }, [page, search]);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ name: '', code: '', description: '' });
    setFormErrors({});
    setModalOpen(true);
  };

  const handleOpenEdit = (perm) => {
    setEditingId(perm._id);
    setFormData({ name: perm.name, code: perm.code, description: perm.description || '' });
    setFormErrors({});
    setModalOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!editingId && !formData.code.trim()) {
      errors.code = 'Code is required';
    } else if (!editingId && !/^[A-Z][A-Z0-9_]*$/.test(formData.code)) {
      errors.code = 'Code must be SCREAMING_SNAKE_CASE (e.g. READ_BOOKS)';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      if (editingId) {
        // Only update name & description (code is immutable)
        await updatePermission(editingId, {
          name: formData.name.trim(),
          description: formData.description.trim(),
        });
      } else {
        await createPermission({
          name: formData.name.trim(),
          code: formData.code.trim().toUpperCase(),
          description: formData.description.trim(),
        });
      }
      setModalOpen(false);
      loadPermissions();
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Action failed';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this permission? This cannot be undone.')) return;

    try {
      await deletePermission(id);
      loadPermissions();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to delete permission');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Key className="text-indigo-600" size={24} />
            Permissions Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Configure system-wide actions and security permissions.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-indigo-600/20 active:scale-95 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 text-sm self-start sm:self-auto"
        >
          <Plus size={16} />
          Create Permission
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search permissions by name or code..."
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
          Total: <span className="font-semibold text-slate-700">{total}</span> permissions
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="text-indigo-600 animate-spin" size={36} />
            <span className="text-slate-400 text-sm font-medium">Loading permissions...</span>
          </div>
        ) : permissions.length === 0 ? (
          <div className="text-center py-16 px-6">
            <Key className="mx-auto text-slate-300 mb-4 opacity-40" size={48} />
            <h3 className="font-bold text-slate-800 text-lg">No Permissions Found</h3>
            <p className="text-slate-400 text-sm mt-1 max-w-sm mx-auto">
              {search
                ? 'No permissions matched your query. Try a different search term.'
                : 'Get started by creating your first system permission.'}
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
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Permission Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">System Code</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {permissions.map((perm) => (
                  <tr key={perm._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4.5 whitespace-nowrap">
                      <div className="font-semibold text-slate-800 text-sm">{perm.name}</div>
                    </td>
                    <td className="px-6 py-4.5 whitespace-nowrap">
                      <span className="inline-flex items-center font-mono text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100/60 px-2.5 py-1 rounded-md">
                        {perm.code}
                      </span>
                    </td>
                    <td className="px-6 py-4.5">
                      <p className="text-xs text-slate-500 line-clamp-1 max-w-xs md:max-w-md">
                        {perm.description || '—'}
                      </p>
                    </td>
                    <td className="px-6 py-4.5 whitespace-nowrap text-right text-xs font-medium">
                      <div className="flex items-center justify-end gap-2.5">
                        <button
                          onClick={() => handleOpenEdit(perm)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all cursor-pointer"
                          title="Edit Permission"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(perm._id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-100 hover:bg-red-50/30 transition-all cursor-pointer"
                          title="Delete Permission"
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

      {/* Slide-over or Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-[fadeSlide_0.2s_ease]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <Key className="text-indigo-600" size={18} />
                {editingId ? 'Edit Permission' : 'Create Permission'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Permission Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Read Books"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3.5 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all
                    ${formErrors.name ? 'border-red-400' : 'border-slate-200'}`}
                />
                {formErrors.name && (
                  <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} /> {formErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  System Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. READ_BOOKS"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  disabled={!!editingId}
                  className={`w-full px-3.5 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all font-mono uppercase
                    ${editingId ? 'bg-slate-50 text-slate-400 cursor-not-allowed border-slate-200' : formErrors.code ? 'border-red-400' : 'border-slate-200'}`}
                />
                {editingId && (
                  <p className="text-[10px] text-slate-400 mt-1">
                    System code is unique and immutable once created.
                  </p>
                )}
                {formErrors.code && (
                  <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} /> {formErrors.code}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Description (Optional)
                </label>
                <textarea
                  placeholder="Describe what this permission allows..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all resize-none"
                />
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
                  {editingId ? 'Save Changes' : 'Create Permission'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Permissions;
