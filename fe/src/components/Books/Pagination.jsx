import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({
  page,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPrevPage
}) => {
  if (totalPages <= 1) return null;

  // Logic to build page numbers array with ellipses
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 3;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show page 1
      pages.push(1);

      if (page > 3) {
        pages.push('...');
      }

      // Show neighbors of current page
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        // Prevent duplicate page 1 or totalPages
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (page < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2.5 mt-12 py-4">
      {/* Prev Arrow */}
      <button
        onClick={() => hasPrevPage && onPageChange(page - 1)}
        disabled={!hasPrevPage}
        className={`
          w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200 border border-slate-100/50
          ${
            hasPrevPage
              ? 'bg-[#f0f4fc] hover:bg-[#e1ecfc] text-slate-600 cursor-pointer active:scale-95'
              : 'bg-slate-50 text-slate-300 cursor-not-allowed opacity-60'
          }
        `}
      >
        <ChevronLeft size={16} strokeWidth={2.5} />
      </button>

      {/* Pages */}
      {pageNumbers.map((p, idx) => {
        if (p === '...') {
          return (
            <span key={`ell-${idx}`} className="w-9 h-9 flex items-center justify-center text-slate-400 font-bold select-none">
              ...
            </span>
          );
        }

        const isActive = p === page;

        return (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`
              w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-200 border
              ${
                isActive
                  ? 'bg-blue-600 border-blue-600 text-white shadow-[0_6px_20px_rgba(37,99,235,0.25)]'
                  : 'bg-[#f0f4fc] border-slate-100/50 hover:bg-[#e1ecfc] text-slate-600 cursor-pointer active:scale-95'
              }
            `}
          >
            {p}
          </button>
        );
      })}

      {/* Next Arrow */}
      <button
        onClick={() => hasNextPage && onPageChange(page + 1)}
        disabled={!hasNextPage}
        className={`
          w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200 border border-slate-100/50
          ${
            hasNextPage
              ? 'bg-[#f0f4fc] hover:bg-[#e1ecfc] text-slate-600 cursor-pointer active:scale-95'
              : 'bg-slate-50 text-slate-300 cursor-not-allowed opacity-60'
          }
        `}
      >
        <ChevronRight size={16} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default Pagination;
