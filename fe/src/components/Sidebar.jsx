import React from 'react'

const Sidebar = () => {
  return (
    <div>
       <nav className='w-screen p-4 border-0 border-b-black flex justify-evenly '>
          <div className=''>
              Logo
          </div>
          <ul className='flex gap-3 text-black'>
              <li className='transition-colors duration-200 cursor-pointer ease-in-out hover:text-blue-400'>one </li>
              <li>two </li>
              <li>three </li>
          </ul>
          <div className=''>
              last Hello
          </div>
       </nav>
    </div>
  )
}

export default Sidebar
