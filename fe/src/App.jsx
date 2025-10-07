import { Routes, Route } from 'react-router'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import Books from './pages/Books'
import Categories from './pages/Categories'
import AuthPage from './pages/AuthPage'
import toast, { Toaster } from 'react-hot-toast';
import './App.css'
import Contact from './pages/Contact'
import Author from './pages/Author'

function App() {

   const routes = [
      {
         path: '/', element: <Layout><Home/></Layout>
      },
      {
         path: '/books', element: <Layout><Books/></Layout>
      },
      {
         path: '/categories', element: <Layout><Categories/></Layout>
      },
      {
         path: '/auth', element: <AuthPage/>
      },
      {
         path: '/contact', element: <Layout><Contact/></Layout>
      },
      {
         path: '/author', element: <Layout><Author/></Layout>
      }
   ]

   return (
      <>
         <div >
            {/* initializing the Routes */}
            <Routes>
              {routes.map((route,index) => (
                   <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>

            {/* initializing the toaster  */}
            <Toaster position='top-right' reverseOrder={false} />
         </div>
      </>
   );
}

export default App
