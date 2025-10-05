import React from 'react'
import Sidebar from '../components/Sidebar'

const Layout = ({ children }) => {
    return (
        <div className='w-full h-full flex flex-col'>
          <Sidebar/>
            {children}
        </div>
    )
}

export default Layout
