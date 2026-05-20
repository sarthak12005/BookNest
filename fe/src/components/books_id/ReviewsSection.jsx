import StarRating from "./StartRating";

const ReviewsSection = ({ book }) => (
  <section className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8">
    {/* Left: aggregate */}
    <div className="lg:col-span-4 space-y-6">
      <h3 className="text-2xl font-bold text-slate-900">Customer Reviews</h3>
      <div className="flex items-center gap-4">
        <span className="text-6xl font-extrabold text-slate-900">{book.averageRating}</span>
        <div>
          <StarRating rating={book.averageRating} size="text-xl" />
          <p className="text-xs text-slate-500 mt-1">Global Rating</p>
        </div>
      </div>
      <div className="space-y-2.5">
        {book.ratingBreakdown?.map(({ stars, pct }) => (
          <div key={stars} className="flex items-center gap-3 text-xs">
            <span className="w-10 text-slate-500 text-right">{stars} star</span>
            <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
            </div>
            <span className="w-8 text-slate-500">{pct}%</span>
          </div>
        ))}
      </div>
    </div>

    {/* Right: individual reviews */}
    <div className="lg:col-span-8 space-y-5">
      {book?.reviews?.map((r) => (
        <div key={r.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${r.color} flex items-center justify-center font-bold text-sm`}>{r.initials}</div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{r.name}</p>
                <div className="flex items-center gap-2">
                  <StarRating rating={r.rating} size="text-sm" />
                  {r.verified && <span className="text-[10px] text-green-600 font-bold">Verified Purchase</span>}
                </div>
              </div>
            </div>
            <span className="text-xs text-slate-400">{r.date}</span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{r.text}</p>
        </div>
      ))}
      <button className="w-full py-3 rounded-2xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors">
        See All {book.totalReviews.toLocaleString()} Reviews
      </button>
    </div>
  </section>
);


export default ReviewsSection;