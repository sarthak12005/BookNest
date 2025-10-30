import React from 'react'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

const Layout = ({ children }) => {
    return (
        <div className='w-full h-full flex flex-col'>
            <Sidebar />
            {children}
            {/* <Footer /> */}
        </div>
    )
}

export default Layout
