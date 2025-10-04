import React from 'react'
import { Search, SearchIcon, ShoppingCart } from 'lucide-react'

const Sidebar = () => {
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
          Logo
        </div>
        <ul className='flex gap-6 text-black/70 font-semibold'>
          {menuItems.map((item) => (
            <li key={item.name} className='transition-colors duration-200 cursor-pointer ease-in-out hover:text-blue-400'>
              {item.name}
            </li>
          ))}
        </ul>
        <div className='flex gap-3 '>
          <span className='text-black/70 hover:text-black/100 transition-colors duration-200 ease-in-out cursor-pointer'><SearchIcon /></span>
          <span className='text-black/70 hover:text-black/100 transition-colors duration-200 ease-in-out cursor-pointer'><ShoppingCart /></span>
        </div>
      </nav>
    </header>
  )
}

export default Sidebar
