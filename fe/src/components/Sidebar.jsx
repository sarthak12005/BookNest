import React from 'react';
import { HeartIcon, LogOut, Search, SearchIcon, ShoppingCart, User, Trash2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useUser } from '../context/useUser';
import { logout } from '../lib/api';

// ─── DUMMY CART DATA (replace with real API later) ────────────────────────────
const DUMMY_CART_ITEMS = [
  {
    _id: '1',
    title: 'Atomic Habits',
    author: 'James Clear',
    coverImages: ['https://images-na.ssl-images-amazon.com/images/I/81wgcld4wxL.jpg'],
    discountPrice: 349,
    price: 499,
    quantity: 1,
  },
  {
    _id: '2',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverImages: ['https://images-na.ssl-images-amazon.com/images/I/71FTb9X6wsL.jpg'],
    discountPrice: null,
    price: 299,
    quantity: 2,
  },
  {
    _id: '3',
    title: 'Harry Potter & The Sorcerer\'s Stone',
    author: 'J.K. Rowling',
    coverImages: ['https://images-na.ssl-images-amazon.com/images/I/81YOuOGFCJL.jpg'],
    discountPrice: 449,
    price: 599,
    quantity: 1,
  },
];

const Sidebar = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems] = useState(DUMMY_CART_ITEMS);
  const profileRef = useRef();
  const cartRef = useRef();
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close cart dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setOpenCart(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close search on outside click
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
      localStorage.removeItem('token');
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

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + (item.discountPrice || item.price) * item.quantity,
    0
  );

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <nav className="max-w-screen p-4 flex justify-between items-center px-10 lg:px-20">
        {/* Logo */}
        <div className="font-bold text-2xl cursor-pointer" onClick={() => navigate('/')}>
          <img src="/BookNestLogo.png" alt="BookNest Logo" className="w-30 object-center" />
        </div>

        {/* Nav Links */}
        <ul className="hidden md:flex gap-6 text-black/70 font-semibold">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className="transition-colors duration-200 cursor-pointer ease-in-out hover:text-blue-500 relative group"
              onClick={() => navigate(item.link)}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 rounded-full transition-all duration-300 group-hover:w-full" />
            </li>
          ))}
        </ul>

        {/* Right side icons */}
        <div className="flex items-center gap-4 relative">
          {/* Search */}
          <div className="relative flex items-center search-container">
            <span
              onClick={() => setOpenSearch(true)}
              className="w-9 h-9 flex items-center justify-center text-black/60 hover:text-blue-500 hover:bg-blue-50 rounded-full cursor-pointer transition-all duration-200"
            >
              <SearchIcon size={19} />
            </span>

            <div
              className={`absolute right-0 flex items-center bg-white border border-slate-200 rounded-full shadow-md overflow-hidden transition-all duration-300
    ${openSearch ? 'w-64 px-3 py-1 opacity-100' : 'w-0 px-0 py-0 opacity-0'}`}
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

          {/* Wishlist Heart */}
          <span
            onClick={() => navigate('/wishlist')}
            className="w-9 h-9 flex items-center justify-center text-black/60 hover:text-rose-500 hover:bg-rose-50 rounded-full cursor-pointer transition-all duration-200"
            title="Wishlist"
          >
            <HeartIcon size={19} />
          </span>

          {/* Cart Icon with Dropdown */}
          <div ref={cartRef} className="relative">
            <button
              onClick={() => setOpenCart((prev) => !prev)}
              className="w-9 h-9 flex items-center justify-center text-black/60 hover:text-blue-500 hover:bg-blue-50 rounded-full cursor-pointer transition-all duration-200 relative"
              title="Cart"
            >
              <ShoppingCart size={19} />
              {/* Cart Item Count Badge */}
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* ─── MINI CART DROPDOWN ─── */}
            {openCart && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-[fadeSlide_0.18s_ease]">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <ShoppingCart size={16} className="text-blue-600" />
                    <span className="font-semibold text-slate-800 text-sm">
                      My Cart ({cartItems.length})
                    </span>
                  </div>
                  <button
                    onClick={() => setOpenCart(false)}
                    className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Cart Items List */}
                <div className="max-h-72 overflow-y-auto">
                  {cartItems.length === 0 ? (
                    <div className="py-10 text-center text-slate-400 text-sm">
                      <ShoppingCart size={32} className="mx-auto mb-2 opacity-30" />
                      Your cart is empty
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-b-0"
                      >
                        {/* Book thumbnail */}
                        <div className="w-10 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 shadow-sm">
                          <img
                            src={item.coverImages?.[0]}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200';
                            }}
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-800 leading-snug line-clamp-1">
                            {item.title}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{item.author}</p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-xs font-bold text-blue-600">
                              ₹{(item.discountPrice || item.price).toFixed(0)}
                            </span>
                            {item.discountPrice && (
                              <span className="text-[10px] text-slate-300 line-through">
                                ₹{item.price.toFixed(0)}
                              </span>
                            )}
                            <span className="text-[10px] text-slate-400">× {item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                  <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-slate-500 font-medium">Total</span>
                      <span className="text-sm font-bold text-slate-800">
                        ₹{cartTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        navigate('/cart');
                        setOpenCart(false);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2.5 rounded-xl transition-all duration-200 hover:shadow-[0_4px_12px_rgba(37,99,235,0.3)] active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={14} />
                      View Cart
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ✅ PROFILE ICON */}
          <div ref={profileRef} className="relative">
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

            {/* Profile Dropdown */}
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
                    <p className="text-[11px] text-slate-400">{user?.email ?? 'john@example.com'}</p>
                  </div>
                </div>

                {/* Profile */}
                <button
                  onClick={() => {
                    navigate('/profile');
                    setOpenProfile(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-[13.5px] text-slate-700 
                   rounded-xl hover:bg-slate-50 transition-colors duration-150"
                >
                  <User size={15} className="opacity-60" />
                  Profile
                </button>

                <div className="h-px bg-slate-100 my-1 mx-1" />

                {/* Logout */}
                <button
                  onClick={handleLogout}
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
