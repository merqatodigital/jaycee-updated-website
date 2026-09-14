import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Moon, Sun, Phone, ShieldCheck } from 'lucide-react';
import { JayCeeLogo } from './JayCeeLogo';
import { LogoClickHandler } from './LogoClickHandler';
import { useSiteContent } from '../context/SiteContentContext';

interface NavbarProps {
  onOpenWholesale?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWholesale }) => {
  const { content, isAdminLoggedIn, openAdminPanel, isDarkMode, toggleDarkMode } = useSiteContent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Split nav links into left and right groups
  const allLinks = content.header?.navLinks?.length
    ? content.header.navLinks
    : [
        { id: 'nav-1', label: 'Products', href: '#selection' },
        { id: 'nav-2', label: 'Wholesale', href: '#wholesale' },
        { id: 'nav-3', label: 'Our story', href: '#story' },
        { id: 'nav-4', label: 'Delivery', href: '#location' },
        { id: 'nav-5', label: 'FAQs', href: '#faqs' },
        { id: 'nav-6', label: 'Contact', href: '#contact' },
      ];
  const midPoint = Math.ceil(allLinks.length / 2);
  const navLinksLeft = allLinks.slice(0, midPoint);
  const navLinksRight = allLinks.slice(midPoint);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#121110]/95 backdrop-blur-md border-b border-[#E7E5E4] dark:border-[#262322] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Desktop Left Nav Links */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation left">
            {navLinksLeft.map((item) => (
              <a
                key={item.id}
                href={item.href}
                id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={(e) => {
                  if (item.href === '#wholesale' && onOpenWholesale) {
                    e.preventDefault();
                    onOpenWholesale();
                  }
                }}
                className="text-sm font-medium text-[#44403C] dark:text-[#E7E5E4] hover:text-[#991B1B] dark:hover:text-[#F87171] transition-colors py-1 cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Center Brand Identity / Logo with 3-click Admin handler */}
          <LogoClickHandler id="brand-logo-home" className="flex items-center justify-center group focus:outline-none">
            <JayCeeLogo size="md" variant="full" />
          </LogoClickHandler>

          {/* Desktop Right Nav Links & Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-6" aria-label="Main navigation right">
              {navLinksRight.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  id={`nav-link-${item.label.toLowerCase()}`}
                  onClick={(e) => {
                    if (item.href === '#wholesale' && onOpenWholesale) {
                      e.preventDefault();
                      onOpenWholesale();
                    }
                  }}
                  className="text-sm font-medium text-[#44403C] dark:text-[#E7E5E4] hover:text-[#991B1B] dark:hover:text-[#F87171] transition-colors py-1 cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Quick Admin Indicator if logged in */}
            {isAdminLoggedIn && (
              <button
                type="button"
                onClick={openAdminPanel}
                className="inline-flex items-center space-x-1 text-xs bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800 px-2 py-1 rounded hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors"
                title="Open Admin Backoffice"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                <span>Admin</span>
              </button>
            )}

            {/* Dark mode / ambient toggle icon */}
            <button
              id="theme-toggle-btn"
              onClick={toggleDarkMode}
              className="p-2 text-[#78716C] dark:text-[#A8A29E] hover:text-[#1C1917] dark:hover:text-white hover:bg-[#F5F5F4] dark:hover:bg-[#23201F] rounded-full transition-colors cursor-pointer"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Order Online CTA Button */}
            <a
              href={content.header.orderOnlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="header-order-online-btn"
              style={{ backgroundColor: content.theme.primaryColor }}
              className="inline-flex items-center space-x-1.5 text-white text-sm font-medium px-4 py-2.5 rounded-md transition-all shadow-sm active:scale-[0.98]"
            >
              <span>{content.header.orderOnlineButtonText}</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center md:hidden space-x-2">
            <button
              id="mobile-theme-toggle-btn-quick"
              onClick={toggleDarkMode}
              className="p-1.5 text-[#78716C] dark:text-[#A8A29E] hover:text-[#1C1917] dark:hover:text-white rounded-md"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <a
              href={content.header.orderOnlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="mobile-header-order-btn"
              style={{ backgroundColor: content.theme.primaryColor }}
              className="inline-flex items-center space-x-1 text-white text-xs font-medium px-3 py-1.5 rounded-md"
            >
              <span>Order</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#44403C] dark:text-[#E7E5E4] hover:text-black dark:hover:text-white focus:outline-none rounded-md"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-navigation-drawer" className="md:hidden border-t border-[#E7E5E4] dark:border-[#262322] bg-white dark:bg-[#181615] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#F5F5F4] dark:border-[#262322]">
            {allLinks.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (item.href === '#wholesale' && onOpenWholesale) {
                    e.preventDefault();
                    onOpenWholesale();
                  }
                }}
                className="px-3 py-2 text-sm font-medium text-[#44403C] dark:text-[#E7E5E4] hover:text-[#991B1B] dark:hover:text-[#F87171] hover:bg-[#F5F5F4] dark:hover:bg-[#23201F] rounded-md transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1">
            <a
              href={content.header.phoneTel}
              className="flex items-center text-xs text-[#78716C] dark:text-[#A8A29E] hover:text-[#991B1B] dark:hover:text-[#F87171]"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5" />
              <span>{content.header.phone}</span>
            </a>
            {isAdminLoggedIn && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAdminPanel();
                }}
                className="text-xs text-amber-700 dark:text-amber-400 font-semibold px-2 py-1 bg-amber-50 dark:bg-amber-950/50 rounded"
              >
                Admin Panel
              </button>
            )}
            <button
              onClick={toggleDarkMode}
              className="flex items-center text-xs text-[#78716C] dark:text-[#D6D3D1] px-2.5 py-1.5 bg-[#F5F5F4] dark:bg-[#23201F] hover:bg-[#E7E5E4] dark:hover:bg-[#2C2826] rounded transition-colors cursor-pointer"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 mr-1 text-amber-400" /> : <Moon className="w-3.5 h-3.5 mr-1" />}
              <span>{isDarkMode ? 'Light mode' : 'Dark mode'}</span>
            </button>
          </div>

          <a
            href={content.header.orderOnlineUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="mobile-drawer-order-online-btn"
            style={{ backgroundColor: content.theme.primaryColor }}
            className="w-full flex items-center justify-center space-x-2 text-white py-3 rounded-md font-medium text-sm shadow-sm"
          >
            <span>Open Online Store</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
};

