import React from 'react'
import { HeartIcon, Search, SearchIcon, ShoppingCart } from 'lucide-react'
import { useNavigate } from 'react-router'

const Sidebar = () => {

  const navigate = useNavigate();
  
  const menuItems = [
    { name: 'Home', link: '/' },
    { name: 'Books', link: '/books' },
    { name: 'Categories', link: '/categories' },
    { name: 'Author', link: '/author' },
    { name: 'Contact', link: '/contact' },
  ];


  return (
    <header>
      <nav className='w-screen p-4 border-0 border-b-black flex justify-between items-center px-20 '>
        <div className='font-bold text-2xl'>
           <img src="/BookNestLogo.png" alt="BookNest Logo" className='w-30 object-center' />
        </div>
        <ul className='flex gap-6 text-black/70 font-semibold'>
          {menuItems.map((item) => (
            <li key={item.name} className='transition-colors duration-200 cursor-pointer ease-in-out hover:text-blue-400' onClick={() => navigate(item.link)}>
              {item.name}
            </li>
          ))}
        </ul>
        <div className='flex gap-3 '>
          <span className='text-black/70 hover:text-black/100 transition-colors duration-200 ease-in-out cursor-pointer'><SearchIcon /></span>
          <span className='text-black/70 hover:text-black/100 transition-colors duration-200 ease-in-out cursor-pointer'><HeartIcon /></span>
          <span className='text-black/70 hover:text-black/100 transition-colors duration-200 ease-in-out cursor-pointer'><ShoppingCart /></span>
        </div>
      </nav>
    </header>
  )
}

export default Sidebar
