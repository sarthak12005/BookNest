import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { fetchNewArrivals } from '../../lib/api';
import BookCard from '../Books/BookCard';

const SkeletonCard = () => (
  <div className="flex-shrink-0 w-60 bg-white rounded-3xl p-4 border border-slate-100/50 animate-pulse flex flex-col gap-4">
    <div className="aspect-[3/4] rounded-2xl bg-slate-100" />
    <div className="h-4 bg-slate-100 rounded w-3/4" />
    <div className="h-3 bg-slate-100 rounded w-1/2" />
    <div className="h-3 bg-slate-100 rounded w-1/3" />
    <div className="h-6 bg-slate-100 rounded w-1/4 pt-2" />
  </div>
);

const NewArrivals = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchNewArrivals();
        setBooks(Array.isArray(data) ? data : (data.data ?? []));
      } catch (error) {
        console.error('New Arrivals error:', error);
        toast.error('Failed to load new arrivals.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section className="w-full bg-white py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">New Arrivals</h2>
            <p className="text-sm font-medium text-slate-400 mt-1">
              Fresh releases just added to our collection
            </p>
          </div>
          <a
            href="/books"
            className="text-sm text-blue-600 hover:underline font-bold flex items-center gap-1 mt-1 whitespace-nowrap"
          >
            See all new arrivals
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Horizontal scroll */}
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
            : books.map((book) => (
                <div key={book._id} className="flex-shrink-0 w-60">
                  <BookCard book={book} coverAspect="aspect-[4/5]" />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
