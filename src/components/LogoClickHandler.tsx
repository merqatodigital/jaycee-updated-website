import React, { useRef } from 'react';
import { useSiteContent } from '../context/SiteContentContext';

interface LogoClickHandlerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const LogoClickHandler: React.FC<LogoClickHandlerProps> = ({
  children,
  className = '',
  id = 'logo-click-wrapper',
}) => {
  const { openLoginModal, isAdminLoggedIn, openAdminPanel } = useSiteContent();
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogoClick = (e: React.MouseEvent) => {
    // Prevent normal jump if clicking 3 times
    clickCountRef.current += 1;

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    if (clickCountRef.current >= 3) {
      e.preventDefault();
      e.stopPropagation();
      clickCountRef.current = 0;

      if (isAdminLoggedIn) {
        openAdminPanel();
      } else {
        openLoginModal();
      }
      return;
    }

    // Reset counter if clicks take longer than 1200ms
    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 1200);
  };

  return (
    <div
      id={id}
      onClick={handleLogoClick}
      className={`cursor-pointer ${className}`}
      title="JayCee Trading & Services (Triple-click for Admin Access)"
    >
      {children}
    </div>
  );
};
