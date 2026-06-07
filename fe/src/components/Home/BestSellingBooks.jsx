import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { fetchBestsellingBooks } from '../../lib/api';
import BookCard from '../Books/BookCard';

const TAB_TYPES = {
  Bestsellers: 'bestselling',
  Trending: 'top',
  "Editor's Picks": 'editor_choice',
};

const SkeletonCard = () => (
  <div className="bg-white rounded-3xl p-4 border border-slate-100/50 animate-pulse flex flex-col gap-4">
    <div className="aspect-[3/4] rounded-2xl bg-slate-100" />
    <div className="h-4 bg-slate-100 rounded w-3/4" />
    <div className="h-3 bg-slate-100 rounded w-1/2" />
    <div className="h-3 bg-slate-100 rounded w-1/3" />
    <div className="h-6 bg-slate-100 rounded w-1/4 pt-2" />
  </div>
);

const BestsellingBooks = () => {
  const [activeTab, setActiveTab] = useState('Bestsellers');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef(null);

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

  const tabs = Object.keys(TAB_TYPES);

  return (
    <section className="w-full bg-[#eef3fb] py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Bestselling Books</h2>

          {/* Tab switcher */}
          <div className="flex items-center gap-1 bg-white rounded-full p-1 shadow-sm border border-slate-100 self-start sm:self-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : books
                .slice(0, 8)
                .map((book) => (
                  <BookCard
                    key={book._id}
                    book={book}
                    coverAspect="aspect-[4/5]"
                  />
                ))}
        </div>

        {/* View All */}
        {!loading && (
          <div className="mt-10 flex justify-center">
            <button className="px-6 py-2.5 rounded-full border-2 border-blue-600 text-blue-600 font-bold text-sm hover:bg-blue-600 hover:text-white active:scale-95 transition-all duration-200 cursor-pointer">
              View All Bestsellers
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BestsellingBooks;
