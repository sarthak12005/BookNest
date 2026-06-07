import React, { useState } from 'react';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Tag,
  Truck,
  ShoppingBag,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ─── DUMMY DATA (replace with real cart API later) ───────────────────────────
const INITIAL_CART = [
  {
    _id: '1',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Self-Help',
    coverImage: 'https://images-na.ssl-images-amazon.com/images/I/81wgcld4wxL.jpg',
    price: 499,
    discountPrice: 349,
    quantity: 1,
    stock: 10,
  },
  {
    _id: '2',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Fiction',
    coverImage: 'https://images-na.ssl-images-amazon.com/images/I/71FTb9X6wsL.jpg',
    price: 299,
    discountPrice: null,
    quantity: 2,
    stock: 5,
  },
  {
    _id: '3',
    title: "Harry Potter & The Sorcerer's Stone",
    author: 'J.K. Rowling',
    category: 'Fantasy',
    coverImage: 'https://images-na.ssl-images-amazon.com/images/I/81YOuOGFCJL.jpg',
    price: 599,
    discountPrice: 449,
    quantity: 1,
    stock: 8,
  },
];

const CATEGORY_COLORS = {
  'Self-Help': 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Fiction: 'bg-blue-50 text-blue-700 border-blue-100',
  Fantasy: 'bg-purple-50 text-purple-700 border-purple-100',
  Biography: 'bg-amber-50 text-amber-700 border-amber-100',
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState(INITIAL_CART);
  const navigate = useNavigate();

  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, Math.min(item.stock, item.quantity + delta)) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  // ─── Price calculations ───
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discount = cartItems.reduce(
    (sum, i) => sum + (i.discountPrice ? (i.price - i.discountPrice) * i.quantity : 0),
    0
  );
  const total = subtotal - discount;

  const fmt = (n) =>
    n.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  return (
    <div className="min-h-screen bg-[#f9f9ff] pb-20">
      {/* ─── BREADCRUMB ─── */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center gap-1.5 text-sm text-slate-400">
          <span
            className="hover:text-blue-600 cursor-pointer transition-colors"
            onClick={() => navigate('/')}
          >
            Home
          </span>
          <ChevronRight size={14} />
          <span className="text-slate-700 font-medium">My Cart</span>
        </nav>
      </div>

      {/* ─── PAGE HEADING ─── */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <ShoppingCart size={20} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Cart</h1>
            <p className="text-sm text-slate-400 mt-0.5">{cartItems.length} items in your cart</p>
          </div>
        </div>
      </div>

      {/* ─── EMPTY STATE ─── */}
      {cartItems.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-24 px-6">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={36} className="text-slate-300" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
          <p className="text-slate-400 text-sm mb-6">
            Looks like you haven't added any books to your cart yet.
          </p>
          <button
            onClick={() => navigate('/books')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-[0_4px_14px_rgba(37,99,235,0.3)] active:scale-95 cursor-pointer"
          >
            Explore Books
          </button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8 items-start">
            {/* ─── LEFT — CART ITEMS ─── */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(30,41,59,0.06)] overflow-hidden">
                {/* Column Header */}
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
                  <h2 className="font-semibold text-slate-700 text-sm uppercase tracking-wider">
                    Cart Items ({cartItems.length})
                  </h2>
                </div>

                {/* Items list */}
                <div className="divide-y divide-slate-100/80">
                  {cartItems.map((item) => {
                    const effectivePrice = item.discountPrice || item.price;
                    const catColor =
                      CATEGORY_COLORS[item.category] || 'bg-slate-50 text-slate-600 border-slate-100';

                    return (
                      <div
                        key={item._id}
                        className="flex items-center gap-5 px-6 py-5 hover:bg-slate-50/40 transition-colors duration-150 group"
                      >
                        {/* Book Cover */}
                        <div className="w-16 h-22 flex-shrink-0 rounded-xl overflow-hidden shadow-md border border-slate-100 bg-slate-50">
                          <img
                            src={item.coverImage}
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
                          <div className="flex items-start gap-2 mb-1">
                            <h3
                              className="font-semibold text-slate-800 text-sm leading-snug line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors"
                              onClick={() => navigate(`/books/${item._id}`)}
                            >
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-xs text-slate-400 mb-2">{item.author}</p>
                          <span
                            className={`inline-flex text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${catColor}`}
                          >
                            {item.category}
                          </span>

                          {/* Price */}
                          <div className="flex items-baseline gap-2 mt-2.5">
                            <span className="text-base font-bold text-blue-600">
                              {fmt(effectivePrice)}
                            </span>
                            {item.discountPrice && (
                              <>
                                <span className="text-xs text-slate-300 line-through">
                                  {fmt(item.price)}
                                </span>
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                                  {Math.round(((item.price - item.discountPrice) / item.price) * 100)}% OFF
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Quantity + Remove */}
                        <div className="flex flex-col items-end gap-3 flex-shrink-0">
                          {/* Qty selector */}
                          <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
                            <button
                              onClick={() => updateQty(item._id, -1)}
                              disabled={item.quantity <= 1}
                              className="w-7 h-7 flex items-center justify-center rounded-lg bg-white shadow-sm text-slate-500 hover:text-blue-600 hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="w-7 text-center text-sm font-bold text-slate-700">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQty(item._id, 1)}
                              disabled={item.quantity >= item.stock}
                              className="w-7 h-7 flex items-center justify-center rounded-lg bg-white shadow-sm text-slate-500 hover:text-blue-600 hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer"
                            >
                              <Plus size={13} />
                            </button>
                          </div>

                          {/* Item total */}
                          <span className="text-sm font-bold text-slate-700">
                            {fmt(effectivePrice * item.quantity)}
                          </span>

                          {/* Remove */}
                          <button
                            onClick={() => removeItem(item._id)}
                            className="flex items-center gap-1 text-xs text-slate-300 hover:text-red-500 transition-colors duration-150 cursor-pointer group/del"
                          >
                            <Trash2 size={13} className="group-hover/del:scale-110 transition-transform" />
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Continue Shopping */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/40">
                  <button
                    onClick={() => navigate('/books')}
                    className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors cursor-pointer group"
                  >
                    <ArrowRight
                      size={15}
                      className="rotate-180 group-hover:-translate-x-1 transition-transform"
                    />
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>

            {/* ─── RIGHT — ORDER SUMMARY ─── */}
            <div className="w-80 flex-shrink-0">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(30,41,59,0.06)] overflow-hidden sticky top-24">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
                  <h2 className="font-semibold text-slate-700 text-sm uppercase tracking-wider">
                    Order Summary
                  </h2>
                </div>

                <div className="px-6 py-5 space-y-3">
                  {/* Subtotal */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">
                      Subtotal ({cartItems.reduce((sum, i) => sum + i.quantity, 0)} items)
                    </span>
                    <span className="text-sm font-semibold text-slate-800">{fmt(subtotal)}</span>
                  </div>

                  {/* Discount */}
                  {discount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500 flex items-center gap-1.5">
                        <Tag size={13} />
                        Discount
                      </span>
                      <span className="text-sm font-semibold text-emerald-600">
                        − {fmt(discount)}
                      </span>
                    </div>
                  )}

                  {/* Delivery */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500 flex items-center gap-1.5">
                      <Truck size={13} />
                      Delivery
                    </span>
                    <span className="text-sm font-semibold text-emerald-600">Free</span>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-slate-100 pt-3 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-bold text-slate-800">Total</span>
                      <span className="text-xl font-extrabold text-slate-900">{fmt(total)}</span>
                    </div>
                    {discount > 0 && (
                      <p className="text-[11px] text-emerald-600 mt-1 text-right">
                        You save {fmt(discount)} on this order! 🎉
                      </p>
                    )}
                  </div>

                  {/* Checkout button */}
                  <button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)] active:scale-[0.98] cursor-pointer">
                    Proceed to Checkout
                    <ArrowRight size={16} />
                  </button>

                  {/* Secure badge */}
                  <div className="flex items-center justify-center gap-1.5 pt-1">
                    <ShieldCheck size={13} className="text-slate-300" />
                    <span className="text-[11px] text-slate-400">
                      Secure & encrypted checkout
                    </span>
                  </div>
                </div>

                {/* Promo code */}
                <div className="px-6 pb-5">
                  <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-1 border border-slate-100">
                    <Tag size={14} className="text-slate-400 ml-2 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Apply promo code..."
                      className="flex-1 bg-transparent text-xs outline-none text-slate-600 placeholder-slate-400 py-2"
                    />
                    <button className="text-xs font-bold text-blue-600 hover:text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
