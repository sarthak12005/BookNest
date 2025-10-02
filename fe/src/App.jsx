import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Books from './pages/Books'
import Categories from './pages/Categories'
import AuthPage from './pages/AuthPage'
import './App.css'

function App() {
    return (
      <>
         <div >
           <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/books' element={<Books />} />
              <Route path='/categories' element={<Categories/>} />
              <Route path='/auth' element={<AuthPage/>} />
           </Routes>
         </div>
      </>
    );
}

export default App
