import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

export const CustomSectionsRenderer: React.FC = () => {
  const { content } = useSiteContent();

  const enabledSections = (content.customSections || []).filter((s) => s.enabled);

  if (enabledSections.length === 0) return null;

  return (
    <div className="w-full">
      {enabledSections.map((section, idx) => {
        const isImageRight = section.imagePosition !== 'left';
        const isBgImage = section.imagePosition === 'background';

        if (isBgImage && section.imageUrl?.trim()) {
          return (
            <section
              key={section.id}
              id={`custom-section-${section.id}`}
              className="relative py-24 md:py-32 w-full bg-[#141212] text-white overflow-hidden"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={section.imageUrl}
                  alt={section.title}
                  className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
                {section.eyebrow && (
                  <span className="text-xs font-semibold tracking-[0.2em] text-[#D6D3D1] uppercase block mb-3">
                    {section.eyebrow}
                  </span>
                )}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-6">
                  {section.title}
                </h2>
                <p className="text-base text-stone-300 leading-relaxed font-light mb-8">
                  {section.content}
                </p>
                {section.ctaText && (
                  <a
                    href={section.ctaUrl || '#'}
                    style={{ backgroundColor: content.theme.primaryColor }}
                    className="inline-flex items-center space-x-2 text-white px-6 py-3.5 rounded-md font-medium text-sm transition-all shadow-md active:scale-95"
                  >
                    <span>{section.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                  </a>
                )}
              </div>
            </section>
          );
        }

        return (
          <section
            key={section.id}
            id={`custom-section-${section.id}`}
            className="py-16 md:py-24 bg-white dark:bg-[#141212] border-t border-stone-100 dark:border-[#262322] transition-colors"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${
                  !isImageRight ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={isImageRight ? 'order-1' : 'order-2 md:order-1'}>
                  {section.eyebrow && (
                    <span className="text-xs font-semibold tracking-[0.2em] text-[#78716C] dark:text-[#A8A29E] uppercase block mb-3">
                      {section.eyebrow}
                    </span>
                  )}
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 dark:text-white leading-tight mb-4">
                    {section.title}
                  </h2>
                  <p className="text-sm sm:text-base text-stone-600 dark:text-[#D6D3D1] leading-relaxed mb-6 font-light">
                    {section.content}
                  </p>
                  {section.ctaText && (
                    <a
                      href={section.ctaUrl || '#'}
                      style={{ backgroundColor: content.theme.primaryColor }}
                      className="inline-flex items-center space-x-2 text-white px-5 py-3 rounded-md text-sm font-medium transition-all shadow-sm active:scale-95"
                    >
                      <span>{section.ctaText}</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                    </a>
                  )}
                </div>

                {/* Image */}
                {section.imageUrl?.trim() ? (
                  <div
                    className={`${
                      isImageRight ? 'order-2' : 'order-1 md:order-2'
                    } relative aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800 shadow-xs`}
                  >
                    <img
                      src={section.imageUrl}
                      alt={section.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};
