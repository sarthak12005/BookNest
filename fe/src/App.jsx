import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Books from './pages/Books';
import Categories from './pages/Categories';
import AuthPage from './pages/AuthPage';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';
import Contact from './pages/Contact';
import About from './pages/About';
import { useUser } from './context/useUser';
import SingleBookPage from './pages/SingleBookPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user, loading } = useUser();

    if (loading)
      return (
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="border-t-2 border-l-2 border-red-600 animate-spin w-14 h-14 rounded-full"></div>
        </div>
      );

    if (!user) {
      return <Navigate to="/auth" replace />;
    }

    return children;
  };

  const routes = [
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout>
            <Home />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/books',
      element: (
        <ProtectedRoute>
          <Layout>
            <Books />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/categories',
      element: (
        <ProtectedRoute>
          <Layout>
            <Categories />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/contact',
      element: (
        <ProtectedRoute>
          <Layout>
            <Contact />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/about',
      element: (
        <ProtectedRoute>
          <Layout>
            <About />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/books/:bookId',
      element: (
        <ProtectedRoute>
          <Layout>
            <SingleBookPage />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/cart',
      element: (
        <ProtectedRoute>
          <Layout>
            <CartPage />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/wishlist',
      element: (
        <ProtectedRoute>
          <Layout>
            <WishlistPage />
          </Layout>
        </ProtectedRoute>
      ),
    },
  ];

  return (
    <>
      <div className="max-w-screen">
        {/* initializing the Routes */}
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route path={'/auth'} element={<AuthPage />} />
        </Routes>

        {/* initializing the toaster  */}
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </>
  );
}

export default App;
