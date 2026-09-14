import React from 'react';
import { RIBBON_IMAGES } from '../data/jayceeData';
import { useSiteContent } from '../context/SiteContentContext';

export const FoodRibbon: React.FC = () => {
  const { content } = useSiteContent();
  const images = (content.ribbonImages && content.ribbonImages.length > 0) ? content.ribbonImages : RIBBON_IMAGES;

  return (
    <section aria-label="Culinary gallery preview" className="w-full overflow-hidden bg-black">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0.5">
        {images.map((img, idx) => (
          <a
            key={idx}
            href={content.header.orderOnlineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square block overflow-hidden bg-neutral-900"
            title={img.alt}
          >
            {img.url?.trim() ? (
              <img
                src={img.url}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            ) : null}
            <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors" />
          </a>
        ))}
      </div>
    </section>
  );
};
