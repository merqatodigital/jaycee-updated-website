import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { EVERYDAY_ESSENTIALS, ORDER_ONLINE_URL } from '../data/jayceeData';

export const EssentialsGrid: React.FC = () => {
  return (
    <section id="essentials" className="py-16 md:py-24 bg-white dark:bg-[#141212] border-t border-[#F5F5F4] dark:border-[#262322] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-12">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#78716C] dark:text-[#A8A29E] uppercase block mb-2">
              KEEP YOUR KITCHEN READY
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1C1917] dark:text-white tracking-tight">
              The everyday essentials.
            </h2>
          </div>

          <a
            href={ORDER_ONLINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="essentials-explore-all-link"
            className="mt-4 sm:mt-0 inline-flex items-center text-xs sm:text-sm font-medium text-[#78716C] dark:text-[#A8A29E] hover:text-[#991B1B] dark:hover:text-[#F87171] transition-colors"
          >
            <span>Explore all products</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>

        {/* 3 Column Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {EVERYDAY_ESSENTIALS.map((item, idx) => (
            <a
              key={item.id}
              href={ORDER_ONLINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              id={`essential-card-${idx}`}
              className="group block focus:outline-none"
            >
              <div className="relative aspect-[16/10] rounded-md overflow-hidden bg-[#F5F5F4] dark:bg-[#23201F] mb-3.5">
                {item.image?.trim() ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                ) : null}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
              </div>

              <h3 className="text-lg font-semibold text-[#1C1917] dark:text-white group-hover:text-[#991B1B] dark:group-hover:text-[#F87171] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#78716C] dark:text-[#A8A29E] mt-1">
                {item.subTitle}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
