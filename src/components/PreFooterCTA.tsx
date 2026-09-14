import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ORDER_ONLINE_URL } from '../data/jayceeData';

export const PreFooterCTA: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-white dark:bg-[#141212] border-t border-[#E7E5E4] dark:border-[#262322] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#78716C] dark:text-[#A8A29E] uppercase block mb-2">
              YOUR NEXT ORDER STARTS HERE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1917] dark:text-white tracking-tight leading-tight">
              Let&apos;s keep your <span className="italic font-normal">kitchen supplied.</span>
            </h2>
          </div>

          <div className="shrink-0">
            <a
              href={ORDER_ONLINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="prefooter-order-online-btn"
              className="inline-flex items-center space-x-2 bg-[#8B1D24] hover:bg-[#74151B] text-white px-6 py-3.5 rounded-md text-sm font-medium transition-all shadow-sm active:scale-[0.98]"
            >
              <span>Order Online</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
