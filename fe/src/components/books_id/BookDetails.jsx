import { ChevronDown, ChevronUp } from 'lucide-react';
import StarRating from './StartRating';
import { calculateDiscount } from '../../lib/helper';
const BookDetails = ({ book, descExpanded, onExpandDesc }) => (
  <div className="lg:col-span-5 space-y-6">
    {/* Title + Author */}
    <div className="space-y-1">
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
        {book.title}
      </h1>
      <p className="text-lg text-slate-500">
        by{' '}
        <a href={book.author.href} className="text-blue-600 hover:underline font-medium">
          {book.author.name}
        </a>
      </p>
    </div>

    {/* Rating row */}
    <div className="flex items-center gap-3 flex-wrap">
      <StarRating rating={book.rating} size="text-lg" />
      <span className="font-bold text-slate-800">{book.rating}</span>
      <span className="text-sm text-slate-500">{book.totalReviews} verified reviews</span>
    </div>

    {/* Price row */}
    <div className="flex items-baseline gap-4 py-4 border-y border-slate-100">
      <span className="text-3xl font-extrabold text-slate-900">₹{book.discountPrice}</span>
      <span className="text-lg text-slate-400 line-through">₹{book.price}</span>
      <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-md">
        SAVE {calculateDiscount(book.price, book.discountPrice)}%
      </span>
    </div>

    {/* Description */}
    <div className="space-y-3">
      <h3 className="text-xl font-bold text-slate-900">Description</h3>
      <p className={`text-sm text-slate-600 leading-relaxed ${descExpanded ? '' : 'line-clamp-4'}`}>
        {book.description}
      </p>
      <button
        onClick={onExpandDesc}
        className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1"
      >
        {descExpanded ? 'Show Less' : 'Read More'}

        {descExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
    </div>

    {/* Specs */}
    <div className="bg-white/25 rounded-2xl p-3">
      {/* Heading */}
      <div className="mb-5">
        <h3 className="text-lg font-bold text-slate-900">Tags</h3>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-3">
        {book?.tags?.map((tag) => (
          <span
            key={tag}
            className="
          px-4 py-2
          rounded-full
          bg-blue-50
          text-blue-700
          text-sm
          font-medium
          border border-blue-100
          hover:bg-blue-100
          transition-colors
        "
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default BookDetails;
