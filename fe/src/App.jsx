import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Books from './pages/Books'
import Categories from './pages/Categories'
import AuthPage from './pages/AuthPage'
import toast, {Toaster} from 'react-hot-toast';
import './App.css'

function App() {

    return (
      <>
         <div >

          {/* initializing the Routes */}
           <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/books' element={<Books />} />
              <Route path='/categories' element={<Categories/>} />
              <Route path='/auth' element={<AuthPage/>} />
           </Routes>

           {/* initializing the toaster  */}
           <Toaster position='top-right' reverseOrder={false} />
         </div>
      </>
    );
}

export default App
