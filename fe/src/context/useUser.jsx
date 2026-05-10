import { useState, useEffect, createContext, useContext } from 'react';
import axiosInstance from '../lib/axiosInstance';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ important
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get('/auth/me');

      if (res.status === 200) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.error('Error fetching user', error);

      const status = error?.response?.status;

      // ✅ handle properly
      if (status === 401) {
        setUser(null);
      } else if (status === 429) {
        toast.error('Too many requests');
      } else {
        console.error('Unexpected error');
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
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }

  return context;
};

export { useUser, UserProvider };
