import React from 'react';
import { useSiteContent } from '../context/SiteContentContext';

export const TopBar: React.FC = () => {
  const { content } = useSiteContent();

  return (
    <div
      id="top-utility-bar"
      className="w-full bg-[#F5F5F4] dark:bg-[#181615] border-b border-[#E7E5E4] dark:border-[#262322] text-[11px] md:text-xs text-[#57534E] dark:text-[#A8A29E] py-1.5 px-4 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Location badge */}
        <div className="flex items-center space-x-1.5">
          <span className="font-normal text-[#44403C] dark:text-[#D6D3D1]">{content.header.topBarText}</span>
        </div>

        {/* Center motto */}
        <div className="hidden sm:block text-center text-[#78716C] dark:text-[#A8A29E]">
          {content.header.topBarMotto}
        </div>

        {/* Right direct hotline */}
        <div className="flex items-center space-x-1">
          <span className="text-[#78716C] dark:text-[#A8A29E] hidden md:inline">Orders & enquiries ·</span>
          <a
            href={content.header.phoneTel}
            id="top-hotline-link"
            className="font-medium text-[#1C1917] dark:text-[#F5F5F4] hover:text-[#991B1B] dark:hover:text-[#F87171] transition-colors inline-flex items-center"
          >
            {content.header.phone}
          </a>
        </div>
      </div>
    </div>
  );
};

