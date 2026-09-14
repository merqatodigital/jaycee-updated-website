import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

interface EditorialStoryProps {
  onOpenWholesale?: () => void;
}

export const EditorialStory: React.FC<EditorialStoryProps> = ({ onOpenWholesale }) => {
  const { content } = useSiteContent();

  return (
    <section id="story" className="py-20 md:py-28 bg-[#FAFAFA] dark:bg-[#121110] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#78716C] dark:text-[#A8A29E] uppercase block mb-3">
            FROM OUR SHELVES TO YOUR KITCHEN
          </span>
          <h2
            className="text-3xl sm:text-5xl text-[#1C1917] dark:text-white tracking-tight leading-tight"
            style={{ fontFamily: 'var(--dynamic-heading-font)' }}
          >
            Good food. <span className="italic">Great company.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#78716C] dark:text-[#A8A29E] font-light">
            For the everyday. The special occasion. And every service in between.
          </p>
        </div>

        {/* Staggered Editorial Feature Rows from context */}
        <div className="space-y-20 md:space-y-28">
          {(content.editorialStories || []).map((story, idx) => {
            const isImageRight = story.imageOnRight;

            const renderCta = () => {
              if (story.ctaType === 'wholesale') {
                return (
                  <button
                    type="button"
                    id={`story-btn-${idx}`}
                    onClick={onOpenWholesale}
                    className="inline-flex items-center space-x-1.5 text-sm font-semibold text-[#1C1917] dark:text-white hover:text-[#991B1B] dark:hover:text-[#F87171] transition-colors cursor-pointer"
                  >
                    <span>{story.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                );
              }

              if (story.ctaType === 'phone') {
                return (
                  <a
                    href={content.header.phoneTel}
                    id={`story-link-${idx}`}
                    className="inline-flex items-center space-x-1.5 text-sm font-semibold text-[#1C1917] dark:text-white hover:text-[#991B1B] dark:hover:text-[#F87171] transition-colors"
                  >
                    <span>{story.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                );
              }

              return (
                <a
                  href={story.ctaUrl || content.header.orderOnlineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`story-link-${idx}`}
                  className="inline-flex items-center space-x-1.5 text-sm font-semibold text-[#1C1917] dark:text-white hover:text-[#991B1B] dark:hover:text-[#F87171] transition-colors"
                >
                  <span>{story.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              );
            };

            return (
              <div
                key={story.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
              >
                {/* Image Column */}
                <div
                  className={`${
                    isImageRight ? 'order-1 md:order-2' : ''
                  } relative aspect-[4/3] rounded-lg overflow-hidden bg-[#F5F5F4] dark:bg-[#1C1917] shadow-xs`}
                >
                  {story.image?.trim() ? (
                    <img
                      src={story.image}
                      alt={story.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center"
                    />
                  ) : null}
                </div>

                {/* Content Column */}
                <div
                  className={`${
                    isImageRight
                      ? 'order-2 md:order-1 md:pr-4 lg:pr-8'
                      : 'md:pl-4 lg:pl-8'
                  }`}
                >
                  <span className="text-xs font-semibold tracking-[0.2em] text-[#A8A29E] dark:text-[#78716C] uppercase block mb-3">
                    {story.stepNumber}
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl lg:text-4xl text-[#1C1917] dark:text-white leading-tight mb-4 whitespace-pre-line"
                    style={{ fontFamily: 'var(--dynamic-heading-font)' }}
                  >
                    {story.headline}
                  </h3>
                  <p className="text-sm sm:text-base text-[#57534E] dark:text-[#D6D3D1] leading-relaxed mb-6 font-light max-w-md">
                    {story.description}
                  </p>
                  {renderCta()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

