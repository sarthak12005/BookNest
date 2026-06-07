import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import { addToCart, addToWishList } from '../../lib/api';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating || 5);
  return (
    <div className="flex items-center gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < fullStars ? 'currentColor' : 'none'}
          className={i < fullStars ? 'text-amber-400' : 'text-slate-200'}
        />
      ))}
    </div>
  );
};

const BookCard = ({ book, coverAspect = 'aspect-[3/4]', className = '' }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [wishlisted, setWishlisted] = useState(book.wishlisted || false);
  const navigate = useNavigate();

  // Price formatting
  const formattedPrice = book.price ? `₹${book.price.toFixed(2)}` : '';
  const formattedDiscountPrice = book.discountPrice ? `₹${book.discountPrice.toFixed(2)}` : '';

  // Determine badges
  const isBestSeller = book.totalReviews > 15000 || book.isFeatured;
  const isInStock = book.stock > 0;

  const handleCardClick = () => {
    navigate(`/books/${book._id}`);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    try {
      await addToCart(book._id);
    } catch (error) {
      // Errors are toasted inside API helper
    }
  };

  const handleWishlist = async (e) => {
    e.stopPropagation();
    try {
      const res = await addToWishList(book._id);
      if (res?.status === 200) {
        toast.success(res?.data?.message || 'Wishlist updated');
        setWishlisted(res?.data?.data?.wishlisted ?? !wishlisted);
      }
    } catch (error) {
      console.error('Wishlist error:', error);
      toast.error(error?.response?.data?.message || 'Failed to update wishlist');
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group bg-white rounded-3xl p-4 flex flex-col cursor-pointer transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100/50 hover:border-slate-200/50 ${className}`}
    >
      {/* Cover Image Container */}
      <div className={`relative ${coverAspect} w-full rounded-2xl bg-[#f8fafd] overflow-hidden flex items-center justify-center p-3 shadow-inner`}>
        {/* Badges Stacked Vertically */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {isBestSeller && (
            <span className="bg-[#e11d48]/10 text-[#e11d48] text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-md backdrop-blur-sm border border-[#e11d48]/20">
              BEST SELLER
            </span>
          )}
          {isInStock ? (
            <span className="bg-[#0284c7]/10 text-[#0284c7] text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-md backdrop-blur-sm border border-[#0284c7]/20">
              IN STOCK
            </span>
          ) : (
            <span className="bg-slate-100 text-slate-500 text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-md border border-slate-200">
              OUT OF STOCK
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`
            absolute top-3 right-3 z-10
            w-8 h-8
            flex items-center justify-center
            rounded-full
            backdrop-blur-sm
            transition-all duration-200
            shadow-sm border border-slate-100/50 cursor-pointer active:scale-90
            ${
              wishlisted
                ? 'bg-red-50 text-red-500 hover:bg-red-100'
                : 'bg-white/80 text-slate-400 hover:bg-red-50 hover:text-red-500'
            }
          `}
        >
          <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Skeleton placeholder */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 animate-pulse" />
        )}

        {/* Book Cover */}
        <img
          src={book.coverImages?.[0] || book.image || book.thumbnail || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500'}
          alt={book.title}
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            setImgLoaded(true);
            e.target.src = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500';
          }}
          className={`h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-transform duration-500 group-hover:scale-[1.04] ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Book Metadata */}
      <div className="mt-4 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-semibold text-slate-800 text-sm leading-snug line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
          {book.title}
        </h3>

        {/* Author */}
        <p className="text-xs text-slate-400 mt-1 font-medium">{book.author}</p>

        {/* Ratings and reviews */}
        <div className="flex items-center gap-1.5 mt-2">
          <StarRating rating={book.averageRating} />
          <span className="text-[11px] text-slate-400 font-medium mt-0.5">
            ({book.totalReviews ? book.totalReviews.toLocaleString() : '0'})
          </span>
        </div>

        {/* Price and discount */}
        <div className="flex items-baseline gap-2 mt-3 pt-2 border-t border-slate-100/60">
          <span className="text-sm font-bold text-blue-600">
            {formattedDiscountPrice || formattedPrice}
          </span>
          {formattedDiscountPrice && formattedPrice && (
            <span className="text-xs text-slate-300 line-through">
              {formattedPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!isInStock}
          className={`
            mt-4 w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center gap-1.5
            ${
              isInStock
                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-[0_4px_12px_rgba(37,99,235,0.2)]'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-100'
            }
          `}
        >
          <ShoppingCart size={13} />
          {isInStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
