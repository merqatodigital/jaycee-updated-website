import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

export const FeaturedRanges: React.FC = () => {
  const { content } = useSiteContent();

  return (
    <section id="featured-ranges" className="w-full bg-[#FAFAFA] dark:bg-[#121110] pb-16 md:pb-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {(content.featuredRanges || []).map((item, index) => (
            <a
              key={item.id}
              href={item.url || content.header.orderOnlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              id={`featured-card-${index}`}
              className="group relative h-[380px] sm:h-[420px] lg:h-[460px] rounded-lg overflow-hidden block bg-black shadow-xs hover:shadow-md transition-shadow"
            >
              {/* Background Image with Hover Zoom */}
              {item.image?.trim() ? (
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center opacity-90 group-hover:scale-105 group-hover:opacity-95 transition-all duration-700 ease-out"
                />
              ) : null}

              {/* Dark Gradient Overlay for optimal legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

              {/* Card Content at bottom */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 text-white flex flex-col justify-end">
                <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#E7E5E4] uppercase mb-1.5 block">
                  {item.badge}
                </span>

                <h3
                  className="text-xl sm:text-2xl font-medium text-white mb-2 leading-tight"
                  style={{ fontFamily: 'var(--dynamic-heading-font)' }}
                >
                  {item.title}
                </h3>

                <div className="inline-flex items-center text-xs font-medium text-white/90 group-hover:text-white transition-colors">
                  <span className="underline decoration-white/40 underline-offset-4 group-hover:decoration-white">
                    {item.linkText}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

