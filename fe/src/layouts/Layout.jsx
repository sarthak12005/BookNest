import React from 'react'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

const Layout = ({ children }) => {
    return (
        <>
            <Sidebar />
            <div>
                {children}
            </div>
            <Footer />
        </>
    )
}

export default Layout
