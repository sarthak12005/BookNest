import { Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { addToCart } from '../../lib/api';

const BuyCard = ({ book }) => {
  const [qty, setQty] = useState('1');
  const [added, setAdded] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      await addToCart(book._id, Number(qty));
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (error) {
      // Handled inside helper
    } finally {
      setAdding(false);
    }
  };

  const handleBuyNow = async () => {
    try {
      await addToCart(book._id, Number(qty));
      toast.success('Redirecting to checkout...');
    } catch (error) {}
  };



  return (
    <div className="lg:col-span-3 lg:sticky lg:top-24 space-y-5">
      {/* Purchase card */}
      <div className="bg-white rounded-3xl p-7 shadow-xl shadow-blue-100/60 border border-blue-50 space-y-5">
        {/* Price summary */}
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-extrabold text-slate-900">₹{book.discountPrice * qty}</span>
          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md">
            Free Delivery
          </span>
        </div>

        {/* Quantity */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
            Quantity
          </label>
          <select
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          >
            {['1', '2', '3', '4'].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </div>

        {/* CTAs */}
        <div className="space-y-3">
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className={`w-full py-3.5 rounded-2xl border-2 font-bold text-sm transition-all duration-200 active:scale-95 disabled:opacity-60 ${added ? 'border-green-500 text-green-600 bg-green-50' : 'border-blue-600 text-blue-600 hover:bg-blue-50'}`}
          >
            {adding ? 'Adding...' : added ? '✓ Added to Cart!' : 'Add to Cart'}
          </button>
          <button
            onClick={handleBuyNow}
            className="w-full py-3.5 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all duration-200 active:scale-95"
          >
            Buy Now
          </button>
        </div>

        {/* Trust badges */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          {[
            { icon: Truck, text: 'Free Express Delivery' },
            { icon: RotateCcw, text: '7-day Hassle-free Returns' },
            { icon: ShieldCheck, text: 'Secure Encrypted Payment' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 text-xs text-slate-500">
              <Icon className="w-4 h-4 text-blue-600" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Author card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">
        <div className="flex items-center gap-3">
          <img
            src={book.author.image}
            alt={book.author.name}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-100"
          />
          <div>
            <h4 className="font-bold text-slate-900 text-sm">{book.author.name}</h4>
            <p className="text-xs text-slate-500">Bestselling Author</p>
          </div>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">{book.author.bio}</p>
        <button className="w-full py-2 rounded-xl bg-slate-100 text-slate-600 font-semibold text-sm hover:bg-blue-600 hover:text-white transition-all duration-200">
          View all books
        </button>
      </div>
    </div>
  );
};

export default BuyCard;
