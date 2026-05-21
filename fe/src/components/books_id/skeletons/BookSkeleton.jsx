const BookPageSkeleton = () => (
  <div className="min-h-screen bg-gray-50 p-6">
    <div className="max-w-6xl mx-auto flex gap-6">

      {/* Thumbnails + Main Image */}
      <div className="flex gap-3 flex-shrink-0">
        <div className="flex flex-col gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-14 h-[72px] bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
        <div className="w-48 h-[310px] bg-gray-200 rounded-lg animate-pulse" />
      </div>

      {/* Book Details */}
      <div className="flex-1 flex flex-col gap-4 pt-1">
        <div className="h-9 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-9 bg-gray-200 rounded animate-pulse w-1/2" />
        <div className="h-5 bg-gray-200 rounded animate-pulse w-2/5" />
        <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3" />

        {/* Price row */}
        <div className="flex gap-3 items-center mt-1">
          <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-14 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
        </div>

        {/* Description */}
        <div className="mt-2 flex flex-col gap-2">
          <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-2 mt-1">
          <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 w-20 bg-gray-200 rounded-full animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-56 flex-shrink-0 flex flex-col gap-4 pt-1">

        {/* Purchase Card */}
        <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="h-7 w-16 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-10 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-10 bg-gray-200 rounded-lg animate-pulse" />
          <div className="flex flex-col gap-2 mt-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-3 bg-gray-200 rounded animate-pulse" style={{ width: `${85 + i * 3}%` }} />
            ))}
          </div>
        </div>

        {/* Author Card */}
        <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col gap-3">
          <div className="flex gap-3 items-center">
            <div className="w-11 h-11 rounded-full bg-gray-200 animate-pulse" />
            <div className="flex flex-col gap-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="h-3 bg-gray-200 rounded animate-pulse w-full" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-9 bg-gray-200 rounded-lg animate-pulse w-full" />
        </div>

      </div>
    </div>
  </div>
);

export default BookPageSkeleton;