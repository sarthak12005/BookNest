import React, { useState, useEffect } from 'react';
import { BarChart3, BookOpen, Users, ShoppingCart, TrendingUp, ShieldCheck, Key, ArrowRight, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchRoles, fetchPermissions } from '../lib/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [roleCount, setRoleCount] = useState(0);
  const [permCount, setPermCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const [rolesRes, permsRes] = await Promise.all([
          fetchRoles({ limit: 1 }),
          fetchPermissions({ limit: 1 }),
        ]);
        setRoleCount(rolesRes.pagination?.total || 0);
        setPermCount(permsRes.pagination?.total || 0);
      } catch (err) {
        console.error('Failed to load dashboard summary stats:', err);
      } finally {
        setLoading(false);
      }
    };
    loadSummary();
  }, []);

  const stats = [
    { label: 'Total Roles', value: loading ? '...' : roleCount, icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-100/60', path: '/roles' },
    { label: 'Total Permissions', value: loading ? '...' : permCount, icon: Key, color: 'text-sky-600', bg: 'bg-sky-50 border-sky-100/60', path: '/permissions' },
    { label: 'Total Books', value: '1,248', icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100/60', path: '/books' },
    { label: 'Total Sales Revenue', value: '₹48,930', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100/60', path: '/analytics' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight font-sans">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Welcome to the BookNest admin panel. Monitor system metrics and manage access control lists.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ label, value, icon: Icon, color, bg, path }) => (
          <div
            key={label}
            onClick={() => navigate(path)}
            className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(30,41,59,0.04)] hover:shadow-[0_12px_24px_rgba(30,41,59,0.08)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-center justify-between"
          >
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">{label}</span>
              <span className="text-2xl font-extrabold text-slate-800 block">{value}</span>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110 ${bg} ${color}`}>
              <Icon size={22} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions Panel */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(30,41,59,0.04)] overflow-hidden lg:col-span-1">
          <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
            <h2 className="font-bold text-slate-800 text-base">Quick Access Management</h2>
          </div>
          <div className="p-6 space-y-3">
            <button
              onClick={() => navigate('/roles')}
              className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-100 rounded-xl transition-all group cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <span className="font-bold text-slate-700 text-sm block">Roles Management</span>
                  <span className="text-[10px] text-slate-400">Manage levels and authorization</span>
                </div>
              </div>
              <ArrowRight size={16} className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
            </button>

            <button
              onClick={() => navigate('/permissions')}
              className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-sky-50 border border-slate-100 hover:border-sky-100 rounded-xl transition-all group cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 flex items-center justify-center">
                  <Key size={16} />
                </div>
                <div>
                  <span className="font-bold text-slate-700 text-sm block">System Permissions</span>
                  <span className="text-[10px] text-slate-400">View and update API action codes</span>
                </div>
              </div>
              <ArrowRight size={16} className="text-slate-400 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>
        </div>

        {/* Analytics placeholder */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(30,41,59,0.04)] overflow-hidden lg:col-span-2 flex flex-col justify-between">
          <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <h2 className="font-bold text-slate-800 text-base">Platform Activity</h2>
            <span className="inline-flex text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md uppercase tracking-wider border border-indigo-100">Live</span>
          </div>

          <div className="p-8 flex flex-col items-center justify-center text-center flex-1 my-10 space-y-4">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 text-slate-400">
              <BarChart3 size={32} className="animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">Activity Logs and Analytics</h3>
              <p className="text-slate-500 text-xs mt-1.5 max-w-sm mx-auto">Real-time charts, user logs, and system diagnostics are processing. Configure your third-party reporting tool integration.</p>
            </div>
            
            <div className="w-48 bg-slate-100 h-2.5 rounded-full overflow-hidden relative">
              <div className="absolute top-0 bottom-0 left-0 bg-indigo-500 rounded-full animate-[loadingProgress_2s_infinite_ease-in-out]" style={{ width: '60%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
