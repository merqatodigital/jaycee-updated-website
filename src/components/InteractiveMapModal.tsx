import React from 'react';
import { X, MapPin, Navigation } from 'lucide-react';
import { STORE_ADDRESS, GOOGLE_MAPS_DIRECTIONS_URL } from '../data/jayceeData';

interface InteractiveMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveMapModal: React.FC<InteractiveMapModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-[#1C1917] rounded-xl shadow-2xl overflow-hidden text-[#1C1917] dark:text-[#F5F5F4] border border-transparent dark:border-[#2E2B29]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E7E5E4] dark:border-[#2E2B29] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-[#991B1B] dark:text-[#F87171]" />
            <div>
              <h3 className="text-base sm:text-lg font-serif font-medium text-[#1C1917] dark:text-white">
                JayCee Trading & Services — B.M. Road Store
              </h3>
              <p className="text-xs text-[#78716C] dark:text-[#A8A29E]">{STORE_ADDRESS}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#78716C] dark:text-[#A8A29E] hover:text-[#1C1917] dark:hover:text-white rounded-full hover:bg-[#F5F5F4] dark:hover:bg-[#2A2624] transition-colors"
            aria-label="Close map"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Embedded Interactive Map View */}
        <div className="w-full h-[400px] bg-stone-100 dark:bg-stone-900 relative">
          <iframe
            title="JayCee Trading and Services Location Map"
            src="https://maps.google.com/maps?q=Puerto%20Princesa%20B.M.%20Road%20JayCee%20Trading&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAFAFA] dark:bg-[#242120] border-t border-[#E7E5E4] dark:border-[#2E2B29] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-[#78716C] dark:text-[#A8A29E]">
            Opening Hours: Mon–Sat 8:00 AM – 5:00 PM (Closed Sun)
          </span>
          <a
            href={GOOGLE_MAPS_DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 bg-[#8B1D24] text-white px-4 py-2 rounded-md font-medium hover:bg-[#74151B] transition-colors"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Open in Google Maps App</span>
          </a>
        </div>
      </div>
    </div>
  );
};
