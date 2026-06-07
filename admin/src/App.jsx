import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminUserProvider, useAdminUser } from './context/useAdminUser';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import Roles from './pages/Roles';
import Permissions from './pages/Permissions';
import Auth from './pages/Auth';
import { Toaster } from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAdminUser();

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-slate-950">
        <div className="border-t-2 border-l-2 border-indigo-600 animate-spin w-14 h-14 rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <AdminLayout>{children}</AdminLayout>;
};

function App() {
  return (
    <AdminUserProvider>
      <div className="min-h-screen bg-slate-50 font-sans">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/roles"
            element={
              <ProtectedRoute>
                <Roles />
              </ProtectedRoute>
            }
          />
          <Route
            path="/permissions"
            element={
              <ProtectedRoute>
                <Permissions />
              </ProtectedRoute>
            }
          />
          
          {/* Scaffolds for other sidebar routes */}
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm text-center py-20 max-w-4xl mx-auto mt-6">
                  <h2 className="text-xl font-bold text-slate-800">Books Management</h2>
                  <p className="text-slate-500 text-sm mt-2">Book catalog controls and stock management is coming soon.</p>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm text-center py-20 max-w-4xl mx-auto mt-6">
                  <h2 className="text-xl font-bold text-slate-800">Categories Settings</h2>
                  <p className="text-slate-500 text-sm mt-2">Category tags and configuration panels are coming soon.</p>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm text-center py-20 max-w-4xl mx-auto mt-6">
                  <h2 className="text-xl font-bold text-slate-800">Users Directory</h2>
                  <p className="text-slate-500 text-sm mt-2">Browse registered users, audit profiles, and inspect activity logs.</p>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm text-center py-20 max-w-4xl mx-auto mt-6">
                  <h2 className="text-xl font-bold text-slate-800">Orders & Invoices</h2>
                  <p className="text-slate-500 text-sm mt-2">Track order fulfillment, process refunds, and view transactions.</p>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reviews"
            element={
              <ProtectedRoute>
                <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm text-center py-20 max-w-4xl mx-auto mt-6">
                  <h2 className="text-xl font-bold text-slate-800">Reviews & Ratings Moderation</h2>
                  <p className="text-slate-500 text-sm mt-2">Approve, flag, or inspect customer ratings and written reviews.</p>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm text-center py-20 max-w-4xl mx-auto mt-6">
                  <h2 className="text-xl font-bold text-slate-800">Sales Analytics & Reports</h2>
                  <p className="text-slate-500 text-sm mt-2">Track daily sales data, top selling genres, and revenue metrics.</p>
                </div>
              </ProtectedRoute>
            }
          />

          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </AdminUserProvider>
  );
}

export default App;
