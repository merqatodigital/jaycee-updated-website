import type { ProductCategory, FeaturedRange, FAQItem, TravelTime } from '../types';

export const ORDER_ONLINE_URL = 'https://jaycee.palawancollective.com/';
export const PHONE_NUMBER = '0977 116 7555';
export const PHONE_TEL = 'tel:09771167555';
export const STORE_ADDRESS = 'Osmeña Ave., B.M. Road, Puerto Princesa City, Palawan';
export const GOOGLE_MAPS_DIRECTIONS_URL = 'https://www.google.com/maps/dir/?api=1&destination=JayCee+Trading+and+Services+B.M.+Road+Puerto+Princesa+Palawan';

export const CATEGORIES: ProductCategory[] = [
  {
    id: 'meats',
    name: 'Meats',
    subTitle: 'Beef · Pork · Specialty cuts',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80',
    count: '32 items',
  },
  {
    id: 'seafood',
    name: 'Seafood',
    subTitle: 'Fish fillets · Shellfish',
    image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=800&q=80',
    count: '24 items',
  },
  {
    id: 'dairy',
    name: 'Dairy & Cheese',
    subTitle: 'Milk · Cream · Yogurt · Cheese',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=80',
    count: '18 items',
  },
  {
    id: 'sausages',
    name: 'Sausages & Cold Cuts',
    subTitle: 'Deli meats · Bacon · Sausages',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
    count: '20 items',
  },
  {
    id: 'frozen',
    name: 'Frozen & Fries',
    subTitle: 'Fries · Hash browns · Appetizers',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
    count: '15 items',
  },
];

export const FEATURED_RANGES: FeaturedRange[] = [
  {
    id: 'range-meats',
    badge: 'SELECTED CUTS',
    title: 'Imported & specialty meats',
    subtitle: 'Wagyu, Angus, pork cuts & artisanal poultry curated for high-temperature sear and unmatched tenderness.',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=1200&q=80',
    linkText: 'Explore the range',
  },
  {
    id: 'range-seafood',
    badge: 'FROM THE SEA',
    title: 'Frozen seafood',
    subtitle: 'Flash-frozen salmon, seabass, prawns and scallops preserving cold-ocean flavor and texture.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80',
    linkText: 'Explore the range',
  },
  {
    id: 'range-dairy',
    badge: 'KITCHEN FAVOURITES',
    title: 'Dairy & cheese',
    subtitle: 'Imported cheddar, gouda, mozzarella, whipping creams and European cultured butters.',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=1200&q=80',
    linkText: 'Explore the range',
  },
];

export const PARTNER_BRANDS = [
  { name: 'Best Western PLUS', logoText: 'BEST WESTERN PLUS', accent: '#D97706' },
  { name: 'ASTORIA PALAWAN', logoText: 'ASTORIA PALAWAN', accent: '#059669' },
  { name: 'ROBINSONS PLACE PALAWAN', logoText: 'ROBINSONS PLACE PALAWAN', accent: '#DC2626' },
  { name: 'NCCC SUPERMARKET', logoText: 'NCCC SUPERMARKET', accent: '#2563EB' },
  { name: 'SEDA', logoText: 'SEDA HOTELS', accent: '#4B5563' },
  { name: 'EL NIDO RESORTS', logoText: 'EL NIDO RESORTS', accent: '#0D9488' },
  { name: 'THE FUNNY LION', logoText: 'THE FUNNY LION', accent: '#B45309' },
  { name: 'HUE HOTELS & RESORTS', logoText: 'HUE HOTELS & RESORTS', accent: '#7C3AED' },
];

export const EVERYDAY_ESSENTIALS = [
  {
    id: 'ess-1',
    title: 'Sausages & cold cuts',
    subTitle: 'Deli meats · Bacon · Sausages',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ess-2',
    title: 'Frozen essentials',
    subTitle: 'Fries · Hash browns · Appetizers',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ess-3',
    title: 'Baking & pantry',
    subTitle: 'Baking essentials · Canned goods',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
  },
];

export const TRAVEL_TIMES: TravelTime[] = [
  { origin: 'City Proper', duration: '15–20 min', note: 'Approximate travel time via B.M. Road.' },
  { origin: 'Airport', duration: '10–15 min' },
  { origin: 'San Pedro', duration: '5–10 min' },
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Do you deliver outside Puerto Princesa?',
    answer:
      'Yes! While our primary direct delivery route covers Puerto Princesa proper and adjacent barangays, we regularly arrange refrigerated freight and transport partnerships for El Nido, San Vicente, Coron, and southern Palawan municipalities. Contact our logistics team to discuss minimum orders and schedules.',
  },
  {
    id: 'faq-2',
    question: 'Can I order in bulk for my restaurant or resort?',
    answer:
      'Absolutely. We are the trusted wholesale food distributor for leading resorts, boutique hotels, and restaurants across the island. We offer tiered wholesale pricing, recurring delivery schedules, and dedicated account management. Submit our Wholesale Enquiry form or call us to open an account.',
  },
  {
    id: 'faq-3',
    question: 'How do I place an order?',
    answer:
      'You can place retail orders directly through our JayCee Online Store (https://jaycee.palawancollective.com/), call or text our hotline at 0977 116 7555, or visit our retail store on B.M. Road. For institutional wholesale inquiries, reach out through our Wholesale Enquiry portal.',
  },
  {
    id: 'faq-4',
    question: 'What payment methods do you accept?',
    answer:
      'We accept Cash on Delivery/Pickup, GCash, Bank Transfer (BDO, BPI), and major debit/credit cards for online orders and in-store purchases. Corporate 15/30-day billing terms are available for approved wholesale accounts.',
  },
  {
    id: 'faq-5',
    question: 'How do you ensure product freshness?',
    answer:
      'We maintain an unbroken cold-chain from cold-shipping port reception to our temperature-controlled freezer and chiller warehouse on B.M. Road. Products are monitored at optimal sub-zero temperatures and transported in insulated, chilled containers to ensure restaurant-grade freshness.',
  },
  {
    id: 'faq-6',
    question: 'Can I schedule regular deliveries?',
    answer:
      'Yes, resort, hotel, and restaurant partners can set up scheduled weekly or bi-weekly standing delivery runs to keep their commercial kitchens smoothly provisioned without unexpected stock-outs.',
  },
];

export const RIBBON_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=600&q=80',
    alt: 'Prime marbled steak cuts',
  },
  {
    url: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80',
    alt: 'Artisan cheeses and milk pitcher',
  },
  {
    url: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=600&q=80',
    alt: 'Sizzling deli sausages in pan',
  },
  {
    url: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=600&q=80',
    alt: 'Gourmet plated seafood fish dish',
  },
  {
    url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
    alt: 'Golden crispy french fries',
  },
  {
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    alt: 'Baking pastry dough and flour',
  },
];
