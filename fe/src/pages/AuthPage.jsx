import React from 'react'

const AuthPage = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            {/* LEFT SIDE */}
            <div className='w-1/2 bg-[#fefefe] h-full'>
                <div className="w-full h-full flex justify-center items-center">
                    <img src="/BookMountain.png" alt="BookMountain" className='object-center w-full h-full' />
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className='w-1/2 bg-[#60b8e8] h-full flex justify-center items-center flex-col gap-3'>
                <div className="w-[62%] h-10 bg-gray-300 rounded-[7px] flex justify-between items-center text-[18px] font-semibold overflow-hidden">
                    <button
                        className={`w-1/2 py-2 transition-all duration-300 bg-white text-gray-900 shadow-md`}
                    >
                        Login
                    </button>
                    <button
                        className={`w-1/2 py-2 transition-all duration-300 bg-transparent text-gray-600`}
                    >
                        Register
                    </button>
                </div>

                <div className="flex flex-col gap-3 items-center w-[62%] h-[75%] bg-white py-4 rounded-2xl ">
                    <div className="image">
                        <img src="/BookLogo.png" alt="book" className='w-12 h-12' />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AuthPage;
