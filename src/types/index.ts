export interface ProductCategory {
  id: string;
  name: string;
  subTitle: string;
  image: string;
  count?: string;
  tag?: string;
}

export interface FeaturedRange {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  linkText: string;
}

export interface PartnerBrand {
  name: string;
  location?: string;
  type: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface TravelTime {
  origin: string;
  duration: string;
  note?: string;
}
