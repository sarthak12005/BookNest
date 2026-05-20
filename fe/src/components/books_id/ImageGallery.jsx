import { Heart } from 'lucide-react';
import { useState } from 'react';
import { calculateDiscount } from '../../lib/helper';

const ImageGallery = ({ images, title, price, discountPrice, heart = false}) => {
  const [active, setActive] = useState(0);
  const [wishlisted, setWishlisted] = useState(heart);

  return (
    <div className="lg:col-span-4 flex gap-3">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2.5">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-14 h-[72px] rounded-lg overflow-hidden border-2 transition-all ${i === active ? 'border-blue-600 shadow-md shadow-blue-100' : 'border-slate-200 hover:border-blue-300'}`}
          >
            <img
              src={src}
              alt={`${title} thumbnail ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative flex-1 bg-white rounded-2xl p-5 shadow-lg shadow-blue-50 border border-slate-100 overflow-hidden group">
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow">
            {calculateDiscount(price, discountPrice)}% OFF
          </span>
        </div>
        <button
          onClick={() => setWishlisted((w) => !w)}
          className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow transition-transform hover:scale-110"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              wishlisted ? 'text-red-500 fill-red-500' : 'text-slate-300'
            }`}
          />
        </button>
        <img
          src={images[active]}
          alt={title}
          className="w-full aspect-[3/4] object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    </div>
  );
};

export default ImageGallery;
