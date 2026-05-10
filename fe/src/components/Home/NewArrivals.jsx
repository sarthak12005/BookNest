import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { fetchNewArrivals } from "../../lib/api";

// ── Dummy data (remove when API is ready) ─────────────────────────────────────
const DUMMY_BOOKS = [
  { _id: "1", title: "The Seven Moons of Maali Almeida", author: "Shehan Karunatilaka", image: "https://covers.openlibrary.org/b/id/12716583-L.jpg", price: 649, rating: 4, reviewCount: 234 },
  { _id: "2", title: "JavaScript: The Definitive Guide", author: "David Flanagan", image: "https://covers.openlibrary.org/b/id/8739161-L.jpg", price: 1449, rating: 5, reviewCount: 567 },
  { _id: "3", title: "Deep Work", author: "Cal Newport", image: "https://covers.openlibrary.org/b/id/10130531-L.jpg", price: 549, rating: 5, reviewCount: 891 },
  { _id: "4", title: "The Infinite Game", author: "Simon Sinek", image: "https://covers.openlibrary.org/b/id/8091016-L.jpg", price: 699, rating: 4, reviewCount: 445 },
  { _id: "5", title: "House of Earth and Blood", author: "Sarah J. Maas", image: "https://covers.openlibrary.org/b/id/12385525-L.jpg", price: 799, rating: 4, reviewCount: 1200 },
  { _id: "6", title: "Atomic Habits", author: "James Clear", image: "https://covers.openlibrary.org/b/id/10527843-L.jpg", price: 509, rating: 5, reviewCount: 3400 },
  { _id: "7", title: "The Midnight Library", author: "Matt Haig", image: "https://covers.openlibrary.org/b/id/8267396-L.jpg", price: 449, rating: 4, reviewCount: 2100 },
  { _id: "8", title: "Designing with Motion", author: "Rachel Nabors", image: "https://covers.openlibrary.org/b/id/8228571-L.jpg", price: 899, rating: 4, reviewCount: 312 },
  { _id: "9", title: "The Power of Now", author: "Eckhart Tolle", image: "https://covers.openlibrary.org/b/id/7984916-L.jpg", price: 374, rating: 5, reviewCount: 980 },
  { _id: "10", title: "Good Strategy Bad Strategy", author: "Richard Rumelt", image: "https://covers.openlibrary.org/b/id/8739161-L.jpg", price: 799, rating: 3, reviewCount: 290 },
];

// ── StarRating ────────────────────────────────────────────────────────────────
const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg key={s} className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

// ── BookCard ──────────────────────────────────────────────────────────────────
const BookCard = ({ book, onAddToCart }) => {
  const [adding, setAdding] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleAdd = async () => {
    setAdding(true);
    await onAddToCart(book);
    setAdding(false);
  };

  const reviewLabel =
    book.reviewCount >= 1000
      ? `${(book.reviewCount / 1000).toFixed(1)}k`
      : book.reviewCount;

  return (
    <div className="flex-shrink-0 w-60 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
      {/* Cover */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden group">
        {/* New badge */}
        <span className="absolute top-2 left-2 z-10 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          New
        </span>

        {/* Wishlist */}
        <button className="absolute top-2 right-2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white/80 hover:bg-red-50 hover:text-red-400 text-gray-400 transition-colors duration-150 shadow-sm">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Skeleton */}
        {!imgLoaded && <div className="absolute inset-0 animate-pulse bg-slate-200" />}

        <img
          src={book.image || book.coverImage || book.thumbnail}
          alt={book.title}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1 flex-1">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
          {book.title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-1">{book.author}</p>

        <div className="flex items-center gap-1 mt-0.5">
          <StarRating rating={book.rating} />
          <span className="text-[11px] text-gray-400">({reviewLabel})</span>
        </div>

        <p className="text-sm font-bold text-gray-900 mt-1">
          ₹{book.price?.toLocaleString("en-IN")}
        </p>

        <button
          onClick={handleAdd}
          disabled={adding}
          className="mt-auto w-full py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-semibold transition-all duration-150"
        >
          {adding ? (
            <span className="flex items-center justify-center gap-1">
              <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Adding...
            </span>
          ) : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

// ── Skeleton ──────────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="flex-shrink-0 w-60 bg-white rounded-xl overflow-hidden shadow-sm animate-pulse flex flex-col">
    <div className="aspect-[4/3] bg-slate-200" />
    <div className="p-3 flex flex-col gap-2">
      <div className="h-3.5 bg-slate-200 rounded w-4/5" />
      <div className="h-3 bg-slate-200 rounded w-3/5" />
      <div className="h-3 bg-slate-200 rounded w-2/5" />
      <div className="h-4 bg-slate-200 rounded w-1/3 mt-1" />
      <div className="h-7 bg-slate-200 rounded-lg mt-1" />
    </div>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const NewArrivals = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // TODO: remove dummy data and uncomment below when API is ready
        // await new Promise((r) => setTimeout(r, 600));
        // setBooks(DUMMY_BOOKS);

        const data = await fetchNewArrivals();
        setBooks(Array.isArray(data) ? data : data.data ?? []);
      } catch {
        toast.error("Failed to load new arrivals.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleAddToCart = async (book) => {
    try {
      // await addToCart(book._id);
      toast.success(`"${book.title}" added to cart!`);
    } catch {
      toast.error("Could not add to cart.");
    }
  };

  return (
    <section className="w-full bg-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">New Arrivals</h2>
            <p className="text-sm text-gray-500 mt-1">Fresh releases just added to our collection</p>
          </div>
          <a href="/new-arrivals" className="text-sm text-blue-600 hover:underline font-medium flex items-center gap-1 mt-1 whitespace-nowrap">
            See all new arrivals
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
            : books.map((book) => (
                <BookCard
                  key={book._id ?? book.id}
                  book={book}
                  onAddToCart={handleAddToCart}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;