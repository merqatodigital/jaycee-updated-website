import React from 'react';
import { ArrowUpRight, ArrowUp, Instagram, MapPin } from 'lucide-react';
import { JayCeeLogo } from './JayCeeLogo';
import { LogoClickHandler } from './LogoClickHandler';
import { useSiteContent } from '../context/SiteContentContext';

interface FooterProps {
  onOpenWholesale?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWholesale }) => {
  const { content, openLoginModal, isAdminLoggedIn, openAdminPanel } = useSiteContent();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-white dark:bg-[#121110] border-t border-[#E7E5E4] dark:border-[#262322] text-[#1C1917] dark:text-[#F5F5F4] pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 mb-16">
          {/* Brand Info with 3-click trigger */}
          <div className="md:col-span-4 lg:col-span-4 space-y-4">
            <LogoClickHandler id="footer-brand-logo" className="inline-block">
              <JayCeeLogo size="md" variant="full" className="items-start" />
            </LogoClickHandler>
            <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A8A29E] font-light max-w-xs pt-2 whitespace-pre-line">
              {content.footer?.tagline || 'Quality food. Personal service.\nProudly Palawan.'}
            </p>
            <div className="pt-2">
              <a
                href={content.footer?.instagramUrl || 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs text-[#78716C] dark:text-[#A8A29E] hover:text-[#1C1917] dark:hover:text-white transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#A8A29E] dark:text-[#78716C]" />
                <span>{content.footer?.instagramHandle || '@jaycee.tradingservices'}</span>
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="text-xs font-semibold tracking-wider text-[#1C1917] dark:text-white uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {(content.footer?.exploreLinks || [
                { id: 'f-exp-1', label: 'Products', href: '#selection' },
                { id: 'f-exp-2', label: 'Wholesale', href: '#wholesale' },
                { id: 'f-exp-3', label: 'Our story', href: '#story' },
                { id: 'f-exp-4', label: 'Delivery', href: '#location' },
                { id: 'f-exp-5', label: 'FAQs', href: '#faqs' },
                { id: 'f-exp-6', label: 'Contact', href: '#contact' },
              ]).map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href === '#wholesale' && onOpenWholesale) {
                        e.preventDefault();
                        onOpenWholesale();
                      }
                    }}
                    className="text-xs sm:text-sm text-[#78716C] dark:text-[#A8A29E] hover:text-[#991B1B] dark:hover:text-[#F87171] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Range */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="text-xs font-semibold tracking-wider text-[#1C1917] dark:text-white uppercase mb-4">
              Product range
            </h4>
            <ul className="space-y-2.5">
              {(content.footer?.productRanges || [
                { id: 'f-rng-1', label: 'Meats', href: content.header?.orderOnlineUrl || 'https://jayceetrading.com' },
                { id: 'f-rng-2', label: 'Seafood', href: content.header?.orderOnlineUrl || 'https://jayceetrading.com' },
                { id: 'f-rng-3', label: 'Dairy & Cheese', href: content.header?.orderOnlineUrl || 'https://jayceetrading.com' },
                { id: 'f-rng-4', label: 'Sausages & Cold Cuts', href: content.header?.orderOnlineUrl || 'https://jayceetrading.com' },
                { id: 'f-rng-5', label: 'Frozen & Fries', href: content.header?.orderOnlineUrl || 'https://jayceetrading.com' },
                { id: 'f-rng-6', label: 'Baking & Pantry', href: content.header?.orderOnlineUrl || 'https://jayceetrading.com' },
              ]).map((range) => (
                <li key={range.id}>
                  <a
                    href={range.href || content.header?.orderOnlineUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-[#78716C] dark:text-[#A8A29E] hover:text-[#991B1B] dark:hover:text-[#F87171] transition-colors inline-flex items-center group"
                  >
                    <span>{range.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Come Find Us */}
          <div className="md:col-span-3 lg:col-span-3 space-y-2.5">
            <h4 className="text-xs font-semibold tracking-wider text-[#1C1917] dark:text-white uppercase mb-4">
              Come find us
            </h4>
            <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A8A29E] font-light leading-relaxed">
              {content.footer?.address || 'National Highway, Brgy. San Pedro, Puerto Princesa, Palawan'}
            </p>
            <p className="text-xs sm:text-sm text-[#1C1917] dark:text-[#F5F5F4] font-medium">
              <a href={content.header?.phoneTel || 'tel:+639171234567'} className="hover:text-[#991B1B] dark:hover:text-[#F87171] transition-colors">
                {content.header?.phone || '+63 917 123 4567'}
              </a>
            </p>
            <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A8A29E]">
              <a href={`mailto:${content.footer?.email || 'info@jayceetrading.com'}`} className="hover:text-[#1C1917] dark:hover:text-white">
                {content.footer?.email || 'info@jayceetrading.com'}
              </a>
            </p>
            <div className="pt-1 text-xs text-[#78716C] dark:text-[#A8A29E] font-light">
              <p>{content.footer?.openingHoursWeekday || content.footer?.hours || 'Monday–Saturday 8am–5pm'}</p>
              <p>{content.footer?.openingHoursWeekend || content.footer?.closedDay || 'Closed Sunday'}</p>
            </div>
            <div className="pt-2">
              <a
                href={content.footer?.googleMapsDirectionsUrl || 'https://maps.google.com'}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-get-directions-link"
                className="inline-flex items-center space-x-1.5 text-xs font-medium text-[#1C1917] dark:text-white hover:text-[#991B1B] dark:hover:text-[#F87171] transition-colors"
              >
                <span>Get Directions</span>
                <MapPin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-[#E7E5E4] dark:border-[#262322] flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-[#A8A29E] dark:text-[#78716C] gap-4">
          <p>{content.footer?.copyrightText || '© 2026 JayCee Trading & Services. All rights reserved.'}</p>

          <div className="flex items-center space-x-6">
            <a href="#privacy" className="hover:text-[#57534E] dark:hover:text-[#D6D3D1] transition-colors">
              Privacy
            </a>
            <a href="#terms" className="hover:text-[#57534E] dark:hover:text-[#D6D3D1] transition-colors">
              Terms
            </a>
            {/* Direct discrete admin button for convenient access */}
            <button
              onClick={isAdminLoggedIn ? openAdminPanel : openLoginModal}
              id="footer-admin-access-btn"
              className="text-[#A8A29E] dark:text-[#78716C] hover:text-[#78716C] dark:hover:text-[#A8A29E] transition-colors cursor-pointer text-[10px]"
              title="Admin Portal (Triple-click Logo or click here with passkey 5309)"
            >
              Backoffice
            </button>
            <button
              onClick={scrollToTop}
              id="footer-back-to-top-btn"
              className="inline-flex items-center space-x-1 hover:text-[#1C1917] dark:hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

