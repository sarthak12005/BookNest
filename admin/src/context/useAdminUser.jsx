// Admin user context — mirrors fe/src/context/useUser.jsx
import { useState, useEffect, createContext, useContext } from 'react';
import { fetchAdminUser } from '../lib/api';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminUserContext = createContext();

export const AdminUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const loadUser = async () => {
    try {
      const userData = await fetchAdminUser();
      setUser(userData);
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        setUser(null);
      } else {
        console.error('Unexpected error loading admin user:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.pathname === '/auth') {
      setLoading(false);
      return;
    }
    loadUser();
  }, []);

  return (
    <AdminUserContext.Provider value={{ user, setUser, loading, loadUser }}>
      {children}
    </AdminUserContext.Provider>
  );
};

export const useAdminUser = () => {
  const ctx = useContext(AdminUserContext);
  if (!ctx) throw new Error('useAdminUser must be used inside AdminUserProvider');
  return ctx;
};
