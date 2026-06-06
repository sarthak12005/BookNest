import React from 'react';
import { HeartIcon, LogOut, Search, SearchIcon, ShoppingCart, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useUser } from '../context/useUser';
import { logout } from '../lib/api';

const Sidebar = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileRef = useRef();
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('.search-container')) {
        setOpenSearch(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      localStorage.removeItem('token'); // if you also store token
      navigate('/auth');
    } catch (error) {}
  };

  const menuItems = [
    { name: 'Home', link: '/' },
    { name: 'Books', link: '/books' },
    { name: 'Categories', link: '/categories' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' },
  ];

  return (
    <header>
      <nav className="max-w-screen p-4 border-0 border-b-black flex justify-between items-center px-20 ">
        <div className="font-bold text-2xl">
          <img src="/BookNestLogo.png" alt="BookNest Logo" className="w-30 object-center" />
        </div>
        <ul className="flex gap-6 text-black/70 font-semibold">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className="transition-colors duration-200 cursor-pointer ease-in-out hover:text-blue-400"
              onClick={() => navigate(item.link)}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-5 relative">
          <div className="relative flex items-center search-container">
            <span
              onClick={() => setOpenSearch(true)}
              className="w-9 h-9 flex items-center justify-center text-black/70 hover:text-blue-400 cursor-pointer"
            >
              <SearchIcon size={20} />
            </span>

            {/* 🔎 SEARCH INPUT */}
            <div
              className={`absolute right-0 flex items-center bg-white border border-slate-200 rounded-full shadow-md overflow-hidden transition-all duration-300
    ${openSearch ? 'w-64 px-3 py-1 opacity-100' : 'w-0 px-0 py-0 opacity-0'}
    `}
            >
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/books?search=${searchQuery}`);
                    setOpenSearch(false);
                  }
                }}
                className="w-full outline-none text-sm bg-transparent"
              />

              <button
                onClick={() => {
                  navigate(`/books?search=${searchQuery}`);
                  setOpenSearch(false);
                }}
                className="text-blue-500 hover:text-blue-600"
              >
                <SearchIcon size={18} />
              </button>
            </div>
          </div>

          <span className="w-9 h-9 flex items-center justify-center text-black/70 hover:text-blue-400 cursor-pointer">
            <HeartIcon size={20} />
          </span>

          <span className="w-9 h-9 flex items-center justify-center text-black/70 hover:text-blue-400 cursor-pointer">
            <ShoppingCart size={20} />
          </span>

          {/* ✅ PROFILE ICON */}
          <div ref={profileRef} className="relative">
            {/* Avatar Button — swap initials for <img> once you have user photo */}
            <button
              onClick={() => setOpenProfile(!openProfile)}
              className="w-9 h-9 rounded-full border-2 border-slate-200 bg-gradient-to-br from-indigo-400 to-purple-500 
               flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-200
               hover:border-indigo-400 hover:shadow-[0_0_0_3px_rgba(99,102,241,0.2)] outline-none"
            >
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-white text-xs font-semibold tracking-wide">
                  {user?.username?.slice(0, 2).toUpperCase() ?? 'JD'}
                </span>
              )}
            </button>

            {/* Dropdown */}
            {openProfile && (
              <div
                className="absolute right-0 mt-2.5 w-52 bg-white rounded-2xl shadow-xl border border-black/5 p-1.5 z-50
                    animate-[fadeSlide_0.18s_ease]"
              >
                {/* User info header */}
                <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-slate-100 mb-1">
                  <div
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 
                        flex items-center justify-center flex-shrink-0 overflow-hidden"
                  >
                    {user?.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt="avatar"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-white text-[11px] font-semibold">
                        {user?.username?.slice(0, 2).toUpperCase() ?? 'JD'}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 leading-tight">
                      {user?.username ?? 'John Doe'}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {user?.email ?? 'john@example.com'}
                    </p>
                  </div>
                </div>

                {/* Profile */}
                <button
                  // onClick={() => navigate("/profile")}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-[13.5px] text-slate-700 
                   rounded-xl hover:bg-slate-50 transition-colors duration-150"
                >
                  <User size={15} className="opacity-60" />
                  Profile
                </button>

                <div className="h-px bg-slate-100 my-1 mx-1" />

                {/* Logout */}
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-[13.5px] text-red-500 
                   rounded-xl hover:bg-red-50 transition-colors duration-150"
                >
                  <LogOut size={15} className="opacity-80" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Sidebar;
