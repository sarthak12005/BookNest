// AdminSidebar — uses existing CSS design system classes from index.css
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Tag,
  Users,
  ShieldCheck,
  Key,
  ShoppingCart,
  Star,
  BarChart3,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useAdminUser } from '../context/useAdminUser';
import { logoutAdmin } from '../lib/api';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Books', path: '/books', icon: BookOpen },
  { label: 'Categories', path: '/categories', icon: Tag },
  { label: 'Users', path: '/users', icon: Users },
  { label: 'Orders', path: '/orders', icon: ShoppingCart },
  { label: 'Reviews', path: '/reviews', icon: Star },
  { label: 'Roles', path: '/roles', icon: ShieldCheck },
  { label: 'Permissions', path: '/permissions', icon: Key },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useAdminUser();

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      setUser(null);
      navigate('/auth');
    } catch (_) {
      navigate('/auth');
    }
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <BookOpen size={18} />
        </div>
        <span className="logo-text">BookNest Admin</span>
      </div>

      {/* Navigation */}
      <ul className="sidebar-menu">
        {NAV_ITEMS.map(({ label, path, icon: Icon }) => {
          const isActive =
            location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
          return (
            <li
              key={path}
              className={`menu-item ${isActive ? 'active' : ''}`}
              onClick={() => navigate(path)}
              style={{ cursor: 'pointer' }}
            >
              <Icon size={18} />
              <span>{label}</span>
              {isActive && <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.6 }} />}
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="avatar-placeholder">
          {user?.username?.slice(0, 2).toUpperCase() ?? 'AD'}
        </div>
        <div className="user-info">
          <span className="user-name">{user?.username ?? 'Admin'}</span>
          <span className="user-role">{user?.email ?? 'admin@booknest.com'}</span>
        </div>
        <button
          onClick={handleLogout}
          title="Logout"
          style={{
            marginLeft: 'auto',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--danger)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
