import React from 'react'

const Layout = ({ children }) => {
    return (
        <div className='w-full h-full flex flex-col'>

            {children}

        </div>
    )
}

export default Layout
