import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import './App.css'

function App() {
    return (
      <>
         <div >
           <Routes>
              <Route path='/' element={<Home />} />
           </Routes>
         </div>
      </>
    );
}

export default App
