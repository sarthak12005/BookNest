import React, { useState, useEffect, useMemo } from 'react';
import {
  Heart,
  ShoppingCart,
  Star,
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
  BookOpen,
  Frown,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addToCart, addToWishList } from '../lib/api';
import toast from 'react-hot-toast';

// ─── DUMMY WISHLIST DATA (replace with real API later) ───────────────────────
const DUMMY_WISHLIST = [
  {
    _id: 'w1',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Self-Help',
    coverImages: ['https://images-na.ssl-images-amazon.com/images/I/81wgcld4wxL.jpg'],
    price: 499,
    discountPrice: 349,
    averageRating: 4.8,
    totalReviews: 24563,
    stock: 12,
    wishlisted: true,
  },
  {
    _id: 'w2',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    category: 'Fiction',
    coverImages: ['https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg'],
    price: 349,
    discountPrice: 279,
    averageRating: 4.6,
    totalReviews: 18920,
    stock: 5,
    wishlisted: true,
  },
  {
    _id: 'w3',
    title: 'Dune',
    author: 'Frank Herbert',
    category: 'Fantasy',
    coverImages: ['https://images-na.ssl-images-amazon.com/images/I/81ym3QUd3KL.jpg'],
    price: 599,
    discountPrice: null,
    averageRating: 4.7,
    totalReviews: 31200,
    stock: 0,
    wishlisted: true,
  },
  {
    _id: 'w4',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    category: 'Non-Fiction',
    coverImages: ['https://images-na.ssl-images-amazon.com/images/I/71g2ednj0JL.jpg'],
    price: 449,
    discountPrice: 359,
    averageRating: 4.9,
    totalReviews: 12840,
    stock: 20,
    wishlisted: true,
  },
  {
    _id: 'w5',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    category: 'Non-Fiction',
    coverImages: ['https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg'],
    price: 599,
    discountPrice: 449,
    averageRating: 4.5,
    totalReviews: 9200,
    stock: 7,
    wishlisted: true,
  },
  {
    _id: 'w6',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    category: 'Fiction',
    coverImages: ['https://images-na.ssl-images-amazon.com/images/I/71L2GzWNlCL.jpg'],
    price: 399,
    discountPrice: 299,
    averageRating: 4.4,
    totalReviews: 7650,
    stock: 15,
    wishlisted: true,
  },
];

const CATEGORIES = ['All', 'Fiction', 'Non-Fiction', 'Fantasy', 'Self-Help', 'Biography', 'Science'];
const SORT_OPTIONS = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'title', label: 'Title A–Z' },
];

// ─── STAR RATING ─────────────────────────────────────────────────────────────
const StarRating = ({ rating, reviews }) => (
  <div className="flex items-center gap-1.5">
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          fill={i < Math.floor(rating) ? '#f59e0b' : 'none'}
          className={i < Math.floor(rating) ? 'text-amber-400' : 'text-slate-200'}
        />
      ))}
    </div>
    <span className="text-[11px] text-slate-400">({reviews?.toLocaleString()})</span>
  </div>
);

// ─── WISHLIST BOOK CARD ───────────────────────────────────────────────────────
const WishlistCard = ({ book, onRemove }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const navigate = useNavigate();
  const isInStock = book.stock > 0;
  const effectivePrice = book.discountPrice || book.price;
  const discountPct = book.discountPrice
    ? Math.round(((book.price - book.discountPrice) / book.price) * 100)
    : 0;

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!isInStock) return;
    setAddingToCart(true);
    try {
      await addToCart(book._id);
    } catch (_) {
      /* error toast handled in api.js */
    } finally {
      setAddingToCart(false);
    }
  };

  const handleRemove = async (e) => {
    e.stopPropagation();
    onRemove(book._id);
    try {
      await addToWishList(book._id); // toggle = remove
    } catch (_) {}
  };

  return (
    <div
      className="group bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(30,41,59,0.05)] hover:shadow-[0_10px_30px_rgba(30,41,59,0.1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
      onClick={() => navigate(`/books/${book._id}`)}
    >
      {/* Cover */}
      <div className="relative aspect-[3/4] bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 animate-pulse" />
        )}
        <img
          src={book.coverImages?.[0]}
          alt={book.title}
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            setImgLoaded(true);
            e.target.src =
              'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300';
          }}
          className={`w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Discount badge */}
        {discountPct > 0 && (
          <div className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
            {discountPct}% OFF
          </div>
        )}

        {/* Out of stock overlay */}
        {!isInStock && (
          <div className="absolute inset-0 bg-slate-900/40 flex items-end justify-center pb-4">
            <span className="bg-white/90 text-slate-700 text-xs font-bold px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}

        {/* Heart / Remove button */}
        <button
          onClick={handleRemove}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md border border-white/60 hover:bg-red-50 hover:border-red-100 transition-all duration-200 active:scale-90 z-10"
          title="Remove from wishlist"
        >
          <Heart size={15} fill="#ef4444" className="text-red-500" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-slate-800 text-sm leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 mb-1">
          {book.title}
        </h3>
        <p className="text-xs text-slate-400 mb-2">{book.author}</p>

        <StarRating rating={book.averageRating} reviews={book.totalReviews} />

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-3 pt-2.5 border-t border-slate-100/80">
          <span className="text-base font-bold text-blue-600">
            ₹{effectivePrice}
          </span>
          {book.discountPrice && (
            <span className="text-xs text-slate-300 line-through">₹{book.price}</span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={!isInStock || addingToCart}
          className={`mt-3 w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 cursor-pointer
            ${
              isInStock
                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-[0_4px_14px_rgba(37,99,235,0.25)]'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
        >
          {addingToCart ? (
            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <ShoppingCart size={13} />
          )}
          {isInStock ? (addingToCart ? 'Adding...' : 'Add to Cart') : 'Out of Stock'}
        </button>

        {/* Remove link */}
        <button
          onClick={handleRemove}
          className="mt-2 text-[11px] text-slate-300 hover:text-red-400 transition-colors text-center cursor-pointer"
        >
          Remove from Wishlist
        </button>
      </div>
    </div>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
const WishlistPage = () => {
  const [books, setBooks] = useState(DUMMY_WISHLIST);
  const [loading] = useState(false);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showInStock, setShowInStock] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [openSort, setOpenSort] = useState(false);
  const navigate = useNavigate();

  const handleRemove = (id) => {
    toast.success('Removed from wishlist');
    setBooks((prev) => prev.filter((b) => b._id !== id));
  };

  // ─── Filtering + Sorting ──────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...books];

    if (search.trim()) {
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      list = list.filter((b) => b.category === selectedCategory);
    }

    if (showInStock) {
      list = list.filter((b) => b.stock > 0);
    }

    list = list.filter((b) => {
      const p = b.discountPrice || b.price;
      return p >= priceRange[0] && p <= priceRange[1];
    });

    switch (sortBy) {
      case 'price_asc':
        list.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price_desc':
        list.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'rating':
        list.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case 'title':
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return list;
  }, [books, search, sortBy, selectedCategory, showInStock, priceRange]);

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label;

  return (
    <div className="min-h-screen bg-[#f9f9ff]">
      {/* ─── HERO BANNER ─── */}
      <div className="bg-gradient-to-br from-[#dce8ff] via-[#eef3ff] to-[#f9f9ff] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
                  <Heart size={22} fill="#ef4444" className="text-red-500" />
                </div>
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    My Wishlist
                  </h1>
                  <p className="text-slate-500 text-sm mt-0.5">Books you love, saved for later</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                <BookOpen size={12} />
                {books.length} book{books.length !== 1 ? 's' : ''} saved
              </span>
            </div>

            {/* Search inside hero */}
            <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 px-4 py-2.5 shadow-sm w-72">
              <Search size={16} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search your wishlist..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 text-sm outline-none text-slate-700 placeholder-slate-400 bg-transparent"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-slate-300 hover:text-slate-500">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── MAIN LAYOUT ─── */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-7 items-start">
        {/* ─── SIDEBAR ─── */}
        <aside className="w-64 flex-shrink-0 sticky top-24">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(30,41,59,0.06)] overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
              <SlidersHorizontal size={15} className="text-blue-600" />
              <span className="font-semibold text-slate-700 text-sm">Filter & Sort</span>
            </div>

            <div className="p-5 space-y-6">
              {/* Sort by */}
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                  Sort by
                </p>
                <div className="relative">
                  <button
                    onClick={() => setOpenSort((p) => !p)}
                    className="w-full flex items-center justify-between px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium hover:border-blue-300 transition-colors cursor-pointer"
                  >
                    <span>{currentSortLabel}</span>
                    <ChevronDown
                      size={14}
                      className={`text-slate-400 transition-transform ${openSort ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openSort && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-10 overflow-hidden">
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setSortBy(opt.value);
                            setOpenSort(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 text-sm transition-colors cursor-pointer hover:bg-blue-50 hover:text-blue-600
                            ${sortBy === opt.value ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-600'}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Availability */}
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                  Availability
                </p>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={showInStock}
                    onChange={(e) => setShowInStock(e.target.checked)}
                    className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                  />
                  <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                    In Stock only
                  </span>
                </label>
              </div>

              {/* Price Range */}
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                  Price Range
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400">₹</span>
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Math.min(+e.target.value, priceRange[1]), priceRange[1]])
                      }
                      placeholder="Min"
                      className="w-full pl-6 pr-2 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>
                  <span className="text-slate-300 text-sm">–</span>
                  <div className="flex-1 relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400">₹</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Math.max(+e.target.value, priceRange[0])])
                      }
                      placeholder="Max"
                      className="w-full pl-6 pr-2 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1000}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>₹0</span>
                  <span>₹1,000</span>
                </div>
              </div>

              {/* Category */}
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                  Category
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-150 cursor-pointer
                        ${
                          selectedCategory === cat
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                            : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-600'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset */}
              {(selectedCategory !== 'All' || showInStock || search || sortBy !== 'recent') && (
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setShowInStock(false);
                    setSearch('');
                    setSortBy('recent');
                    setPriceRange([0, 1000]);
                  }}
                  className="w-full text-xs text-red-400 hover:text-red-600 font-semibold py-2 border border-red-100 hover:border-red-200 rounded-xl transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* ─── BOOK GRID ─── */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-slate-500">
              Showing <span className="font-semibold text-slate-700">{filtered.length}</span> of{' '}
              <span className="font-semibold text-slate-700">{books.length}</span> books
            </p>
            {filtered.length !== books.length && (
              <span className="text-xs bg-blue-50 text-blue-600 font-semibold px-2.5 py-1 rounded-full">
                Filtered
              </span>
            )}
          </div>

          {loading ? (
            /* Skeleton */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-100">
                  <div className="aspect-[3/4] bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 animate-pulse" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-slate-100 rounded animate-pulse w-3/4" />
                    <div className="h-2 bg-slate-100 rounded animate-pulse w-1/2" />
                    <div className="h-8 bg-slate-100 rounded-xl animate-pulse mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            /* Empty state */
            <div className="text-center py-24 px-6">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                {books.length === 0 ? (
                  <Heart size={32} className="text-slate-300" />
                ) : (
                  <Frown size={32} className="text-slate-300" />
                )}
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">
                {books.length === 0
                  ? 'Your wishlist is empty'
                  : 'No books match your filters'}
              </h2>
              <p className="text-slate-400 text-sm mb-6">
                {books.length === 0
                  ? 'Start adding books you love to your wishlist!'
                  : 'Try adjusting your filters or search query.'}
              </p>
              <button
                onClick={() =>
                  books.length === 0 ? navigate('/books') : setSelectedCategory('All')
                }
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-[0_4px_14px_rgba(37,99,235,0.3)] active:scale-95 cursor-pointer"
              >
                {books.length === 0 ? 'Explore Books' : 'Clear Filters'}
                <ArrowRight size={15} />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((book) => (
                <WishlistCard key={book._id} book={book} onRemove={handleRemove} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
