import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchBooks, fetchCategory } from '../lib/api';
import BookCard from '../components/Books/BookCard';
import FilterSidebar from '../components/Books/FilterSidebar';
import Pagination from '../components/Books/Pagination';
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

const Books = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // States
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 8,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false
  });

  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(1000);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedFormats, setSelectedFormats] = useState([]);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Mobile drawer state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync with search param if navigated from home/elsewhere
  useEffect(() => {
    const catParam = searchParams.get('category');
    setSelectedCategory(catParam || 'all');
    setCurrentPage(1);
  }, [searchParams]);

  // Load categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      const cats = await fetchCategory(1, 100);
      setCategories(cats);
    };
    loadCategories();
  }, []);

  // Fetch books when query parameters change
  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      try {
        const filters = {
          page: currentPage,
          limit: 8,
          sortBy,
          sortOrder,
          minPrice: 0,
          maxPrice: priceRange
        };

        if (selectedCategory !== 'all') {
          filters.category = selectedCategory;
        }

        if (selectedRating > 0) {
          filters.minRating = selectedRating;
        }

        // Get search parameter from URL
        const searchQuery = searchParams.get('search') || '';
        if (searchQuery) {
          filters.search = searchQuery;
        }

        const result = await fetchBooks(filters);
        
        // Stabilize formats client-side for high-fidelity filtering demo
        const processedBooks = (result.books || []).map(b => ({
          ...b,
          format: b.title.length % 2 === 0 ? 'Hardcover' : 'Paperback'
        }));

        // Apply client-side format filter if active
        let finalBooks = processedBooks;
        if (selectedFormats.length > 0) {
          finalBooks = processedBooks.filter(b => selectedFormats.includes(b.format));
        }

        setBooks(finalBooks);
        setPagination(result.pagination || {
          total: finalBooks.length,
          page: currentPage,
          limit: 8,
          totalPages: Math.max(1, Math.ceil(finalBooks.length / 8)),
          hasNextPage: false,
          hasPrevPage: false
        });
      } catch (error) {
        console.error('Failed to load books:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [selectedCategory, priceRange, selectedRating, selectedFormats, sortBy, sortOrder, currentPage, searchParams]);

  const handleSelectCategory = (catId) => {
    const nextCat = selectedCategory === catId ? 'all' : catId;
    setSelectedCategory(nextCat);
    setCurrentPage(1);
    
    // Clear search query when selecting a category to reset search state cleanly
    searchParams.delete('search');
    
    if (nextCat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', nextCat);
    }
    setSearchParams(searchParams);
  };

  const handlePriceChange = (val) => {
    setPriceRange(val);
    setCurrentPage(1);
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    setCurrentPage(1);
  };

  const handleFormatChange = (format) => {
    setSelectedFormats(prev =>
      prev.includes(format) ? prev.filter(f => f !== format) : [...prev, format]
    );
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    if (value === 'newest') {
      setSortBy('createdAt');
      setSortOrder('desc');
    } else if (value === 'price_asc') {
      setSortBy('price');
      setSortOrder('asc');
    } else if (value === 'price_desc') {
      setSortBy('price');
      setSortOrder('desc');
    } else if (value === 'rating') {
      setSortBy('averageRating');
      setSortOrder('desc');
    }
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange(1000);
    setSelectedRating(0);
    setSelectedFormats([]);
    setSortBy('createdAt');
    setSortOrder('desc');
    setCurrentPage(1);
    searchParams.delete('category');
    searchParams.delete('search');
    setSearchParams(searchParams);
  };

  // Find category name for title display
  const currentCategoryObj = categories.find(c => c._id === selectedCategory);
  const searchQuery = searchParams.get('search') || '';
  const pageTitle = searchQuery
    ? `Search Results for "${searchQuery}"`
    : (currentCategoryObj ? currentCategoryObj.name : 'All Books');

  return (
    <div className="bg-[#fcfdff] min-h-screen text-slate-800 font-sans">
      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* LEFT: Filters sidebar (Desktop) / Sliding drawer (Mobile) */}
          <aside className="lg:w-64 flex-shrink-0">
            {/* Backdrop for mobile drawer */}
            {isMobileFilterOpen && (
              <div
                onClick={() => setIsMobileFilterOpen(false)}
                className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden transition-opacity duration-300"
              />
            )}
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
              priceRange={priceRange}
              onPriceRangeChange={handlePriceChange}
              selectedRating={selectedRating}
              onSelectRating={handleRatingChange}
              selectedFormats={selectedFormats}
              onFormatChange={handleFormatChange}
              isOpen={isMobileFilterOpen}
              onClose={() => setIsMobileFilterOpen(false)}
            />
          </aside>

          {/* RIGHT: Grid & Controls */}
          <section className="flex-1">
            
            {/* Catalog Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-8">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3 flex-wrap">
                  {pageTitle}
                  {searchQuery && (
                    <button
                      onClick={() => {
                        searchParams.delete('search');
                        setSearchParams(searchParams);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
                    >
                      <X size={12} />
                      Clear Search
                    </button>
                  )}
                </h1>
                <p className="text-sm font-medium text-slate-400 mt-1">
                  Showing {loading ? '...' : pagination.total.toLocaleString()} results from our curated collection
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-600 font-semibold text-sm hover:bg-slate-100 transition-colors"
                >
                  <SlidersHorizontal size={16} />
                  Filters
                </button>

                {/* Sort dropdown */}
                <div className="flex items-center gap-2 bg-[#f0f4fc]/80 hover:bg-[#e1ecfc]/80 transition-colors rounded-2xl px-4 py-2 border border-slate-100/50">
                  <span className="text-xs font-bold text-slate-400 whitespace-nowrap">Sort By:</span>
                  <select
                    onChange={handleSortChange}
                    value={`${sortBy}_${sortOrder}` === 'price_asc' ? 'price_asc' : `${sortBy}_${sortOrder}` === 'price_desc' ? 'price_desc' : sortBy === 'averageRating' ? 'rating' : 'newest'}
                    className="bg-transparent border-none text-slate-700 font-semibold text-xs focus:ring-0 focus:outline-none cursor-pointer pr-1"
                  >
                    <option value="newest">Newest</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Books Display */}
            {loading ? (
              // Skeleton Loader Grid
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-3xl p-4 border border-slate-100 animate-pulse space-y-4">
                    <div className="aspect-[3/4] rounded-2xl bg-slate-100" />
                    <div className="h-4 bg-slate-100 rounded w-3/4" />
                    <div className="h-3 bg-slate-100 rounded w-1/2" />
                    <div className="h-3 bg-slate-100 rounded w-1/3" />
                    <div className="h-6 bg-slate-100 rounded w-1/4 pt-2" />
                  </div>
                ))}
              </div>
            ) : books.length === 0 ? (
              // Empty State
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                <SlidersHorizontal size={40} className="text-slate-300 mb-4 animate-bounce" />
                <h3 className="font-bold text-slate-800 text-lg">No books found</h3>
                <p className="text-sm text-slate-400 mt-1 max-w-xs text-center">
                  Try adjusting your filters or clearing them to find what you are looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-[0_4px_12px_rgba(37,99,235,0.2)]"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              // Books Grid
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  {books.map((book) => (
                    <BookCard key={book._id} book={book} />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  page={currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={setCurrentPage}
                  hasNextPage={pagination.hasNextPage}
                  hasPrevPage={pagination.hasPrevPage}
                />
              </>
            )}

          </section>

        </div>
      </main>
    </div>
  );
};

export default Books;
