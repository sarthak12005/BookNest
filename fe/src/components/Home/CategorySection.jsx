  import React, { useRef, useState } from "react";
  import { ChevronLeft, ChevronRight } from "lucide-react";

  const CategorySection = ({ categories }) => {
    const scrollRef = useRef(null);
    const [index, setIndex] = useState(0);

    const visibleItems = 4;
    const total = categories?.length || 0;

    // Right arrow click
    const handleNext = () => {
      if (index < total - visibleItems) {
        scrollRef.current.scrollBy({ left: 290, behavior: "smooth" });
        setIndex(prev => prev + 1);
      }
    };

    // Left arrow click
    const handlePrev = () => {
      if (index > 0) {
        scrollRef.current.scrollBy({ left: -290, behavior: "smooth" });
        setIndex(prev => prev - 1);
      }
    };

    return (
      <section className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Explore by Category</h2>
            <p className="text-lg text-gray-600 mt-2">
              Discover your next great read across our curated collections
            </p>
          </div>

          {/* Slider wrapper */}
          <div className="relative">

            {/* Left Arrow */}
            {total > visibleItems && (
              <button
                onClick={handlePrev}
                disabled={index === 0}
                className={`absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-md hover:scale-110 transition ${
                  index === 0 ? "opacity-30 cursor-not-allowed" : ""
                }`}
              >
                <ChevronLeft size={28} />
              </button>
            )}

            {/* Right Arrow */}
            {total > visibleItems && (
              <button
                onClick={handleNext}
                disabled={index >= total - visibleItems}
                className={`absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-md hover:scale-110 transition ${
                  index >= total - visibleItems ? "opacity-30 cursor-not-allowed" : ""
                }`}
              >
                <ChevronRight size={28} />
              </button>
            )}

            {/* Scrollable row */}
            <div
              ref={scrollRef}
              className="flex gap-11 overflow-hidden scroll-smooth"
            >
              {categories.map((cat, i) => (
                <div
                  key={i}
                  className="min-w-[270px] h-[230px] rounded-2xl relative overflow-hidden shadow-lg cursor-pointer"
                  style={{
                    backgroundImage: `url(${cat.bg_image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30 p-6 flex flex-col justify-end text-white">
                    <h3 className="text-2xl font-semibold">{cat.title}</h3>
                    <p className="text-sm">{cat.subTitle}</p>
                    <p className="mt-3 text-sm underline flex items-center gap-1">
                      Shop now →
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default CategorySection;
