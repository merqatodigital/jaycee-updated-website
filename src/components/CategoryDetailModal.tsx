import React from 'react';
import { X, ArrowUpRight, Check } from 'lucide-react';
import type { ProductCategory } from '../types';
import { ORDER_ONLINE_URL } from '../data/jayceeData';

interface CategoryDetailModalProps {
  category: ProductCategory | null;
  onClose: () => void;
}

export const CategoryDetailModal: React.FC<CategoryDetailModalProps> = ({ category, onClose }) => {
  if (!category) return null;

  const categoryDetails: Record<string, { items: string[]; description: string }> = {
    meats: {
      items: [
        'Australian Black Angus Ribeye',
        'USDA Prime Striploin',
        'T-Bone & Porterhouse Steaks',
        'Japanese Wagyu A5 Ribcap',
        'Specialty Pork Chops & Tenderloin',
        'Lamb Racks & Shanks',
      ],
      description:
        'Sourced from certified export feedlots and temperature-controlled throughout transit to Palawan. Ideal for searing, roasting, and steakhouse menus.',
    },
    seafood: {
      items: [
        'Norwegian Atlantic Salmon Fillets',
        'Chilean Seabass / Patagonian Toothfish',
        'Black Tiger Prawns (Head-on & Peeled)',
        'Hokkaido Sea Scallops',
        'Yellowfin Tuna Steaks',
        'Squid Rings & Calamari Tubes',
      ],
      description:
        'Individually quick frozen (IQF) at the harvest source to lock in peak sweetness, oceanic brine, and delicate flake.',
    },
    dairy: {
      items: [
        'Aged English & New Zealand Cheddar',
        'Dutch Gouda & Edam Wheels',
        'Italian Shredded & Block Mozzarella',
        'French Whipping Cream 35%',
        'Cultured European Butter (Salted & Unsalted)',
        'Greek & Plain Culinary Yogurts',
      ],
      description:
        'Premium dairy staples for pastry kitchens, breakfast buffets, and artisan pizzerias.',
    },
    sausages: {
      items: [
        'Traditional German Bratwurst',
        'Italian Pork & Herb Sausage',
        'Smoked Honey Cured Bacon',
        'Pastrami & Black Forest Ham',
        'Spanish Chorizo & Pepperoni',
        'Breakfast Cocktail Frankfurters',
      ],
      description:
        'Handcrafted artisanal charcuterie and deli cold cuts made with authentic spices and natural casings.',
    },
    frozen: {
      items: [
        'Crinkle Cut & Straight Cut Golden Fries',
        'Crispy Hash Brown Patties',
        'Potato Wedges & Seasoned Twisters',
        'Mozzarella Cheese Sticks',
        'Onion Rings & Tempura Bites',
        'Frozen Edamame & Green Peas',
      ],
      description:
        'Consistent fry performance and exceptional crunch retention for casual dining, bars, and family platters.',
    },
  };

  const currentDetails = categoryDetails[category.id] || {
    items: ['Specialty Cut 1', 'Specialty Cut 2', 'Specialty Cut 3'],
    description: 'High-grade commercial and retail provisions selected for Palawan culinary standards.',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white dark:bg-[#1C1917] rounded-xl shadow-2xl overflow-hidden text-[#1C1917] dark:text-[#F5F5F4] border border-transparent dark:border-[#2E2B29]"
        role="dialog"
        aria-modal="true"
      >
        <div className="relative h-48 sm:h-56 bg-stone-900">
          {category.image?.trim() ? (
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover opacity-80"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[10px] uppercase font-semibold tracking-widest text-[#E7E5E4] block mb-1">
              THE JAYCEE SELECTION
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif">{category.name}</h3>
            <p className="text-xs text-[#D6D3D1] font-light mt-0.5">{category.subTitle}</p>
          </div>
        </div>

        <div className="p-6 sm:p-7 space-y-5">
          <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#D6D3D1] leading-relaxed font-light">
            {currentDetails.description}
          </p>

          <div>
            <span className="text-xs font-semibold tracking-wider text-[#1C1917] dark:text-white uppercase block mb-2.5">
              Available Cuts & Varieties
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentDetails.items.map((item) => (
                <div key={item} className="flex items-center space-x-2 text-xs text-[#44403C] dark:text-[#D6D3D1]">
                  <Check className="w-3.5 h-3.5 text-[#991B1B] dark:text-[#F87171] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#E7E5E4] dark:border-[#2E2B29] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-[#78716C] dark:text-[#A8A29E] text-center sm:text-left">
              Current stock and live pricing available online
            </span>
            <a
              href={ORDER_ONLINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#8B1D24] hover:bg-[#74151B] text-white px-5 py-2.5 rounded-md text-xs sm:text-sm font-medium transition-colors"
            >
              <span>Order in Online Store</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
