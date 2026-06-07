// Admin Layout — sidebar + main content wrapper
import React from 'react';
import AdminSidebar from '../components/AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="main-content">{children}</main>
    </div>
  );
};

export default AdminLayout;
