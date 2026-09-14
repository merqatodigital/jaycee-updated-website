import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ORDER_ONLINE_URL } from '../data/jayceeData';

export const OnlineStoreBanner: React.FC = () => {
  return (
    <section id="online-store" className="py-20 md:py-24 bg-white dark:bg-[#141212] text-center border-t border-[#F5F5F4] dark:border-[#262322] transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-xs font-semibold tracking-[0.2em] text-[#78716C] dark:text-[#A8A29E] uppercase block mb-3">
          ORDER ONLINE
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1917] dark:text-white tracking-tight mb-4">
          Looking for something specific?
        </h2>

        <p className="text-sm sm:text-base text-[#57534E] dark:text-[#D6D3D1] font-light max-w-lg mx-auto mb-8">
          See our current product selection and availability in the JayCee online store.
        </p>

        <a
          href={ORDER_ONLINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          id="banner-open-online-store-btn"
          className="inline-flex items-center space-x-2 bg-[#8B1D24] hover:bg-[#74151B] text-white px-6 py-3.5 rounded-md text-sm font-medium transition-all shadow-sm active:scale-[0.98]"
        >
          <span>Open Online Store</span>
          <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
        </a>
      </div>
    </section>
  );
};
