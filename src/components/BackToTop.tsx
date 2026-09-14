import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Find the hero section to measure scroll past it
      const heroElement = document.getElementById('hero');
      let threshold = 500; // fallback threshold in px

      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        // When the bottom of the hero section has scrolled above the viewport (or close to it)
        threshold = heroElement.offsetHeight * 0.85;
      }

      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount in case already scrolled
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 sm:bottom-8 sm:right-8 transition-all duration-300 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <button
        type="button"
        id="floating-back-to-top-btn"
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
        className="group flex items-center justify-center w-12 h-12 rounded-full bg-[#1C1917] hover:bg-[#8B1D24] text-white shadow-lg shadow-black/20 hover:shadow-xl border border-white/10 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#8B1D24] focus:ring-offset-2 cursor-pointer"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200 stroke-[2.2]" />
      </button>
    </div>
  );
};
