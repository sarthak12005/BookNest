import React from 'react';
import { Star, X, SlidersHorizontal } from 'lucide-react';

const StarRow = ({ stars }) => {
  return (
    <div className="flex items-center gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < stars ? 'currentColor' : 'none'}
          className={i < stars ? 'text-amber-400' : 'text-slate-200'}
        />
      ))}
    </div>
  );
};

const FilterSidebar = ({
  categories = [],
  selectedCategory,
  onSelectCategory,
  priceRange,
  onPriceRangeChange,
  selectedRating,
  onSelectRating,
  selectedFormats = [],
  onFormatChange,
  isOpen,
  onClose
}) => {
  return (
    <div
      className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white p-6 shadow-2xl border-r border-slate-100 transition-transform duration-300 transform
        lg:relative lg:transform-none lg:z-0 lg:w-64 lg:p-0 lg:shadow-none lg:border-none lg:bg-transparent
        ${isOpen ? 'translate-x-0' : '-translate-x-0 -translate-x-full lg:translate-x-0'}
      `}
    >
      {/* Mobile Header */}
      <div className="flex items-center justify-between mb-6 lg:hidden">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <SlidersHorizontal size={18} />
          Filters
        </h2>
        <button
          onClick={onClose}
          className="p-1 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-8 lg:space-y-6">
        {/* CATEGORIES SECTION */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
            Categories
          </h4>
          <div className="space-y-2.5">
            {/* All Books Option */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategory === 'all'}
                onChange={() => onSelectCategory('all')}
                className="w-4 h-4 rounded border-slate-200 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
              />
              <span className={`text-sm font-medium transition-colors ${
                selectedCategory === 'all' ? 'text-blue-600 font-semibold' : 'text-slate-500 group-hover:text-slate-800'
              }`}>
                All Books
              </span>
            </label>

            {categories.map((cat) => (
              <label key={cat._id} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedCategory === cat._id}
                  onChange={() => onSelectCategory(cat._id)}
                  className="w-4 h-4 rounded border-slate-200 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
                />
                <span className={`text-sm font-medium transition-colors ${
                  selectedCategory === cat._id ? 'text-blue-600 font-semibold' : 'text-slate-500 group-hover:text-slate-800'
                }`}>
                  {cat.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* PRICE RANGE SECTION */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
              Price Range
            </h4>
            <span className="text-xs font-semibold text-blue-600">
              Max: ₹{priceRange}
            </span>
          </div>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="1000"
              step="50"
              value={priceRange}
              onChange={(e) => onPriceRangeChange(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
            />
            <div className="flex justify-between text-[11px] font-semibold text-slate-400">
              <span>₹0</span>
              <span>₹1000+</span>
            </div>
          </div>
        </div>

        {/* CUSTOMER RATING SECTION */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
            Customer Rating
          </h4>
          <div className="space-y-2">
            {[5, 4].map((rating) => (
              <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="rating"
                  checked={selectedRating === rating}
                  onChange={() => onSelectRating(selectedRating === rating ? 0 : rating)}
                  className="w-4 h-4 rounded-full border-slate-200 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
                />
                <div className="flex items-center gap-1.5">
                  <StarRow stars={rating} />
                  <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-800 transition-colors">
                    & up
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* FORMAT SECTION */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
            Format
          </h4>
          <div className="space-y-2.5">
            {['Hardcover', 'Paperback'].map((format) => (
              <label key={format} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedFormats.includes(format)}
                  onChange={() => onFormatChange(format)}
                  className="w-4 h-4 rounded border-slate-200 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
                />
                <span className={`text-sm font-medium transition-colors ${
                  selectedFormats.includes(format) ? 'text-blue-600 font-semibold' : 'text-slate-500 group-hover:text-slate-800'
                }`}>
                  {format}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
