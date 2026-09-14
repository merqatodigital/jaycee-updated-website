import React from 'react';
import { ArrowUpRight, ArrowRight, ArrowDown } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

interface HeroProps {
  onExploreProducts?: () => void;
  onWholesaleEnquiry?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProducts, onWholesaleEnquiry }) => {
  const { content } = useSiteContent();

  const scrollToSelection = () => {
    if (onExploreProducts) {
      onExploreProducts();
      return;
    }
    const section = document.getElementById('selection');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[580px] lg:min-h-[660px] w-full bg-[#141212] text-white overflow-hidden flex flex-col justify-between">
      {/* Background imagery with balanced photographic lighting */}
      <div className="absolute inset-0 z-0">
        {content.hero.bgImageUrl?.trim() ? (
          <img
            src={content.hero.bgImageUrl}
            alt="Culinary meat cuts and preparation"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 brightness-100 contrast-105"
          />
        ) : null}
        {/* Directional scrim: darker on left behind text, transparent on right so culinary imagery is clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent md:from-black/75 md:via-black/25 md:to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141212]/75 via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 w-full my-auto">
        <div className="max-w-2xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center space-x-2 border-b border-white/25 pb-1 mb-6">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#D6D3D1] uppercase">
              {content.hero.eyebrow}
            </span>
          </div>

          {/* Heading with italic highlight */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.08] text-white"
            style={{ fontFamily: 'var(--dynamic-heading-font)' }}
          >
            {content.hero.headlinePart1} <br />
            {content.hero.headlinePart2} <br />
            <span className="italic font-normal text-[#F5F5F4]">
              {content.hero.headlineItalic}
            </span>
          </h1>

          {/* Subtext description */}
          <p className="mt-6 text-base sm:text-lg text-[#D6D3D1] font-light leading-relaxed max-w-xl">
            {content.hero.subtext}
          </p>

          {/* Call-to-actions */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <button
              id="hero-explore-products-btn"
              onClick={scrollToSelection}
              style={{ backgroundColor: content.theme.primaryColor }}
              className="inline-flex items-center space-x-2 text-white px-6 py-3.5 rounded-md font-medium text-sm transition-all shadow-lg active:scale-[0.98] cursor-pointer"
            >
              <span>{content.hero.exploreBtnText}</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
            </button>

            <button
              id="hero-wholesale-enquiry-btn"
              onClick={onWholesaleEnquiry}
              className="inline-flex items-center space-x-2 border border-white/40 hover:border-white hover:bg-white/10 text-white px-6 py-3.5 rounded-md font-medium text-sm transition-all cursor-pointer"
            >
              <span>{content.hero.wholesaleBtnText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar in Hero */}
      <div className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-sm py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-[#A8A29E]">
          <div className="font-light tracking-wide">
            {content.hero.statusBarLeft}
          </div>

          <button
            onClick={scrollToSelection}
            id="hero-scroll-indicator-btn"
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll to selection"
          >
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>

          <div className="font-light tracking-wide text-right">
            {content.hero.statusBarRight}
          </div>
        </div>
      </div>
    </section>
  );
};

