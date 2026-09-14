import React from 'react';
import { Volume2 } from 'lucide-react';
import { PARTNER_BRANDS } from '../data/jayceeData';

export const PartnerLogos: React.FC = () => {
  return (
    <section id="partners" className="py-14 md:py-18 bg-white dark:bg-[#141212] border-y border-[#F5F5F4] dark:border-[#262322] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center relative mb-10">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#78716C] dark:text-[#A8A29E] uppercase block mb-1">
            IN GOOD COMPANY
          </span>
          <h2 className="text-xl sm:text-2xl font-serif text-[#1C1917] dark:text-white font-normal">
            Trusted by Palawan&apos;s leading kitchens.
          </h2>

          {/* Subtle audio / ambient indicator symbol from design */}
          <div className="absolute right-0 top-1 hidden md:block text-[#A8A29E] dark:text-[#78716C]" title="Verified local partner network">
            <Volume2 className="w-4 h-4" />
          </div>
        </div>

        {/* Logos Flex Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 md:gap-8 items-center justify-items-center">
          {PARTNER_BRANDS.map((brand) => (
            <div
              key={brand.name}
              className="w-full flex items-center justify-center p-2 grayscale hover:grayscale-0 opacity-70 dark:opacity-85 hover:opacity-100 transition-all duration-300 group dark:brightness-110"
              title={brand.name}
            >
              <div className="text-center">
                {brand.name === 'Best Western PLUS' && (
                  <div className="flex flex-col items-center">
                    <span className="text-[11px] font-black tracking-tighter text-[#1E3A8A] dark:text-[#60A5FA] leading-none">
                      Best Western
                    </span>
                    <span className="text-[8px] font-bold tracking-widest text-[#B91C1C] dark:text-[#F87171]">
                      PLUS
                    </span>
                  </div>
                )}

                {brand.name === 'ASTORIA PALAWAN' && (
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 text-[#059669] dark:text-[#34D399] mb-0.5">▲</div>
                    <span className="text-[10px] font-bold tracking-widest text-[#059669] dark:text-[#34D399]">
                      ASTORIA
                    </span>
                    <span className="text-[7px] tracking-wider text-[#065F46] dark:text-[#6EE7B7]">
                      PALAWAN
                    </span>
                  </div>
                )}

                {brand.name === 'ROBINSONS PLACE PALAWAN' && (
                  <div className="flex items-center space-x-1">
                    <span className="font-extrabold text-[12px] text-[#DC2626] dark:text-[#EF4444]">R</span>
                    <div className="text-left">
                      <span className="text-[8px] font-bold block leading-tight text-[#1F2937] dark:text-[#E7E5E4]">ROBINSONS</span>
                      <span className="text-[6px] tracking-wider block text-[#DC2626] dark:text-[#EF4444]">PALAWAN</span>
                    </div>
                  </div>
                )}

                {brand.name === 'NCCC SUPERMARKET' && (
                  <div className="flex flex-col items-center">
                    <span className="text-[11px] font-black tracking-widest text-[#2563EB] dark:text-[#60A5FA]">
                      NCCC
                    </span>
                    <span className="text-[7px] font-semibold text-[#1E40AF] dark:text-[#93C5FD]">
                      SUPERMARKET
                    </span>
                  </div>
                )}

                {brand.name === 'SEDA' && (
                  <span className="text-base font-serif italic tracking-widest text-[#374151] dark:text-[#E7E5E4]">
                    seda
                  </span>
                )}

                {brand.name === 'EL NIDO RESORTS' && (
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-serif font-bold tracking-widest text-[#0F766E] dark:text-[#2DD4BF]">
                      EL NIDO
                    </span>
                    <span className="text-[7px] tracking-[0.15em] text-[#115E59] dark:text-[#5EEAD4]">
                      RESORTS
                    </span>
                  </div>
                )}

                {brand.name === 'THE FUNNY LION' && (
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 border border-[#B45309] dark:border-[#F59E0B] rounded-full flex items-center justify-center text-[7px] mb-0.5 text-[#B45309] dark:text-[#F59E0B]">
                      ☼
                    </div>
                    <span className="text-[8px] font-serif tracking-wider text-[#92400E] dark:text-[#FBBF24]">
                      THE FUNNY LION
                    </span>
                  </div>
                )}

                {brand.name === 'HUE HOTELS & RESORTS' && (
                  <div className="flex flex-col items-center">
                    <span className="text-[13px] font-black tracking-widest text-[#6B21A8] dark:text-[#C084FC]">
                      HUE
                    </span>
                    <span className="text-[6px] tracking-widest text-[#581C87] dark:text-[#E9D5FF]">
                      HOTELS & RESORTS
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
