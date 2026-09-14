import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import type { CategoryItem } from '../types/siteContent';

interface CategorySelectionProps {
  onSelectCategory?: (category: CategoryItem) => void;
}

export const CategorySelection: React.FC<CategorySelectionProps> = ({ onSelectCategory }) => {
  const { content } = useSiteContent();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="selection" className="py-16 md:py-20 bg-white dark:bg-[#141212] border-b border-[#F5F5F4] dark:border-[#262322] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Nav Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-12">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#78716C] dark:text-[#A8A29E] uppercase block mb-2">
              THE JAYCEE SELECTION
            </span>
            <h2
              className="text-3xl sm:text-4xl text-[#1C1917] dark:text-white tracking-tight"
              style={{ fontFamily: 'var(--dynamic-heading-font)' }}
            >
              Everything your kitchen needs.
            </h2>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <a
              href={content.header.orderOnlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="view-selection-top-link"
              className="inline-flex items-center text-xs sm:text-sm font-medium text-[#78716C] dark:text-[#A8A29E] hover:text-[#991B1B] dark:hover:text-[#F87171] transition-colors"
            >
              <span>View selection</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </a>

            {/* Slider arrows */}
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => scroll('left')}
                id="category-prev-btn"
                aria-label="Previous categories"
                className="w-8 h-8 rounded-full border border-[#E7E5E4] dark:border-[#383330] flex items-center justify-center text-[#57534E] dark:text-[#D6D3D1] hover:border-[#1C1917] dark:hover:border-white hover:text-[#1C1917] dark:hover:text-white transition-colors bg-white dark:bg-[#23201F] cursor-pointer shadow-xs active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                id="category-next-btn"
                aria-label="Next categories"
                className="w-8 h-8 rounded-full border border-[#E7E5E4] dark:border-[#383330] flex items-center justify-center text-[#57534E] dark:text-[#D6D3D1] hover:border-[#1C1917] dark:hover:border-white hover:text-[#1C1917] dark:hover:text-white transition-colors bg-white dark:bg-[#23201F] cursor-pointer shadow-xs active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Categories Row */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 sm:space-x-5 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {(content.categories || []).map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory?.(cat)}
              className="group flex-shrink-0 w-[240px] sm:w-[260px] md:w-[228px] lg:w-[228px] snap-start cursor-pointer focus:outline-none"
            >
              {/* Card Image Container */}
              <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-[#F5F5F4] dark:bg-[#23201F] mb-3">
                {cat.image?.trim() ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                ) : null}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Card Details */}
              <h3 className="text-base font-semibold text-[#1C1917] dark:text-white group-hover:text-[#991B1B] dark:group-hover:text-[#F87171] transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-[#78716C] dark:text-[#A8A29E] mt-1 line-clamp-1">
                {cat.subTitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

