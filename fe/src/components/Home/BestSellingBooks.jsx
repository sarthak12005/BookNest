import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { addToWishList, fetchBestsellingBooks } from '../../lib/api';
import { calculateDiscount } from '../../lib/helper';

// ── API helper ────────────────────────────────────────────────────────────────
const TAB_TYPES = {
  Bestsellers: 'bestselling',
  Trending: 'top',
  "Editor's Picks": 'editor_choice',
};

const DUMMY_BOOKS = [
  {
    _id: '1',
    title: 'The Blue Horizon',
    author: 'Sarah Mitchell',
    image: 'https://covers.openlibrary.org/b/id/8739161-L.jpg',
    price: 599,
    originalPrice: 749,
    rating: 4,
    reviewCount: 1200,
    badge: 'sale',
  },
  {
    _id: '2',
    title: 'Learning React the Fun Way',
    author: 'Alex Thompson',
    image: 'https://covers.openlibrary.org/b/id/8091016-L.jpg',
    price: 1299,
    originalPrice: null,
    rating: 4,
    reviewCount: 858,
    badge: 'new',
  },
  {
    _id: '3',
    title: 'Midnight Library',
    author: 'Matt Haig',
    image: 'https://covers.openlibrary.org/b/id/10527843-L.jpg',
    price: 449,
    originalPrice: null,
    rating: 4,
    reviewCount: 2300,
    badge: 'hot',
  },
  {
    _id: '4',
    title: 'Designing with Motion',
    author: 'Rachel Nabors',
    image: 'https://covers.openlibrary.org/b/id/8228571-L.jpg',
    price: 899,
    originalPrice: null,
    rating: 4,
    reviewCount: 843,
    badge: null,
  },
  {
    _id: '5',
    title: 'Atomic Habits',
    author: 'James Clear',
    image: 'https://covers.openlibrary.org/b/id/10130531-L.jpg',
    price: 509,
    originalPrice: 599,
    rating: 5,
    reviewCount: 3400,
    badge: 'sale',
  },
  {
    _id: '6',
    title: 'Good Strategy Bad Strategy',
    author: 'Richard Rumelt',
    image: 'https://covers.openlibrary.org/b/id/7984916-L.jpg',
    price: 799,
    originalPrice: null,
    rating: 3,
    reviewCount: 312,
    badge: null,
  },
  {
    _id: '7',
    title: 'The Starless Crown',
    author: 'James Rollins',
    image: 'https://covers.openlibrary.org/b/id/12385525-L.jpg',
    price: 699,
    originalPrice: null,
    rating: 4,
    reviewCount: 1800,
    badge: 'new',
  },
  {
    _id: '8',
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    image: 'https://covers.openlibrary.org/b/id/8267396-L.jpg',
    price: 374,
    originalPrice: 449,
    rating: 5,
    reviewCount: 2700,
    badge: 'sale',
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const BadgeLabel = ({ type }) => {
  const config = {
    sale: { label: 'Sale', classes: 'bg-red-500 text-white' },
    new: { label: 'New', classes: 'bg-emerald-500 text-white' },
    hot: { label: 'Hot', classes: 'bg-orange-500 text-white' },
  };
  if (!type || !config[type]) return null;
  const { label, classes } = config[type];
  return (
    <span
      className={`absolute top-2 left-2 z-10 text-[10px] font-bold px-1.5 py-0.5 rounded ${classes}`}
    >
      {label}
    </span>
  );
};

const BookCard = ({ book, onAddToCart }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [adding, setAdding] = useState(false);
  const [wishlisted, setWishlisted] = useState(
  book?.wishlisted || false
);

  const handleAdd = async () => {
    setAdding(true);
    await onAddToCart(book);
    setAdding(false);
  };

  // const discount =
  //   book.discountPrice && book.price
  //     ? Math.round(((book.price - book.discountPrice) / book.price) * 100)
  //     : null;

  const discount = calculateDiscount(book.price, book.discountPrice);

  const handleWishlist = async (bookId) => {
    try {
      const res = await addToWishList(bookId);

      // success
      if (res?.status === 200) {
        toast.success(res?.data?.message);
        // update local UI state
        setWishlisted(res?.data?.data?.wishlisted);

        console.log(res.data.wishlisted);
      }
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || 'Failed to update wishlist');
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Badge */}
      <BadgeLabel type={book?.badge || 'sale'} />

      {/* Wishlist */}
      <button
        onClick={() => handleWishlist(book._id)}
        className={`
    absolute top-2 right-2 z-10
    w-7 h-7
    flex items-center justify-center
    rounded-full
    backdrop-blur-sm
    transition-all duration-200
    shadow-sm

    ${
      wishlisted
        ? 'bg-red-100 text-red-500 hover:bg-red-200'
        : 'bg-white/80 text-gray-400 hover:bg-red-50 hover:text-red-500'
    }
  `}
      >
        <svg
          className="w-4 h-4"
          fill={book?.wishlisted ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      {/* Cover image */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 aspect-[4/3]">
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%]" />
        )}
        <img
          src={book.image || book.coverImages[0] || book.thumbnail}
          alt={book.title}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Discount badge */}
        {discount && (
          <span className="absolute bottom-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            {discount}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
            {book.title}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{book.author}</p>
        </div>

        <div className="flex items-center gap-1.5">
          <StarRating rating={book.averageRating} />
          <span className="text-[11px] text-gray-400">
            (
            {book.totalReviews >= 1000
              ? `${(book.totalReviews / 1000).toFixed(1)}k`
              : book.totalReviews}
            )
          </span>
        </div>

        <div className="flex items-center gap-2 mt-auto">
          <span className="text-base font-bold text-gray-900">
            ₹{book.discountPrice?.toLocaleString('en-IN')}
          </span>
          {book.price && (
            <span className="text-xs text-gray-400 line-through">
              ₹{book.price?.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        <button
          onClick={handleAdd}
          disabled={adding}
          className="mt-1 w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-semibold tracking-wide transition-all duration-150"
        >
          {adding ? (
            <span className="flex items-center justify-center gap-1.5">
              <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Adding...
            </span>
          ) : (
            'Add to Cart'
          )}
        </button>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse flex flex-col">
    <div className="aspect-[4/3] bg-slate-200" />
    <div className="p-3 flex flex-col gap-2 flex-1">
      <div className="h-3.5 bg-slate-200 rounded w-4/5" />
      <div className="h-3 bg-slate-200 rounded w-2/5" />
      <div className="h-3 bg-slate-200 rounded w-1/3" />
      <div className="h-4 bg-slate-200 rounded w-1/4 mt-auto" />
      <div className="h-8 bg-slate-200 rounded-lg mt-1" />
    </div>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────

const BestsellingBooks = () => {
  const [activeTab, setActiveTab] = useState('Bestsellers');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef(null);

  // TODO: fix this after the api is completed
  const loadBooks = async (tab) => {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    try {
      const type = TAB_TYPES[tab];
      const data = await fetchBestsellingBooks(type);
      setBooks(Array.isArray(data) ? data : (data.data ?? []));
    } catch (err) {
      if (err.name !== 'AbortError') {
        toast.error('Failed to load books. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadBooks(activeTab);
    return () => abortRef.current?.abort();
  }, [activeTab]);

  const handleAddToCart = async (book) => {
    try {
      // Replace with your actual add-to-cart API call
      // await addToCart(book._id);
      toast.success(`"${book.title}" added to cart!`);
    } catch {
      toast.error('Could not add to cart. Try again.');
    }
  };

  const tabs = Object.keys(TAB_TYPES);

  return (
    <section className="w-full bg-[#eef3fb] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Bestselling Books</h2>

          {/* Tab switcher */}
          <div className="flex items-center gap-1 bg-white rounded-full p-1 shadow-sm border border-gray-100 self-start sm:self-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : books
                .slice(0, 8)
                .map((book) => (
                  <BookCard
                    key={book._id ?? book.id ?? book.isbn}
                    book={book}
                    onAddToCart={handleAddToCart}
                  />
                ))}
        </div>

        {/* View All */}
        {!loading && (
          <div className="mt-8 flex justify-center">
            <button className="px-6 py-2.5 rounded-full border-2 border-blue-600 text-blue-600 font-semibold text-sm hover:bg-blue-600 hover:text-white active:scale-95 transition-all duration-200">
              View All Bestsellers
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BestsellingBooks;
