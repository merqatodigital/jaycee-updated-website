export interface ThemeConfig {
  primaryColor: string; // e.g. #8B1D24
  primaryHoverColor: string; // e.g. #74151B
  accentColor: string; // e.g. #991B1B
  fontFamilyHeading: 'Cormorant Garamond' | 'Playfair Display' | 'Cinzel' | 'Plus Jakarta Sans' | 'System Serif';
  fontFamilyBody: 'Plus Jakarta Sans' | 'Inter' | 'System Sans' | 'Roboto';
}

export interface HeaderConfig {
  topBarText: string;
  topBarMotto: string;
  phone: string;
  phoneTel: string;
  orderOnlineUrl: string;
  orderOnlineButtonText: string;
  navLinks: Array<{ id: string; label: string; href: string }>;
}

export interface HeroConfig {
  eyebrow: string;
  headlinePart1: string;
  headlinePart2: string;
  headlineItalic: string;
  subtext: string;
  exploreBtnText: string;
  wholesaleBtnText: string;
  bgImageUrl: string;
  statusBarLeft: string;
  statusBarRight: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  subTitle: string;
  image: string;
  count?: string;
  tag?: string;
}

export interface FeaturedRangeItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  linkText: string;
  url?: string;
}

export interface PartnerBrandItem {
  id: string;
  name: string;
  logoText: string;
  accent: string;
  type?: string;
}

export interface EditorialStoryItem {
  id: string;
  stepNumber: string;
  title: string;
  headline: string;
  description: string;
  ctaText: string;
  ctaType: 'link' | 'wholesale' | 'phone';
  ctaUrl?: string;
  image: string;
  imageOnRight: boolean;
}

export interface EssentialItem {
  id: string;
  title: string;
  subTitle: string;
  image: string;
  linkUrl?: string;
}

export interface PillarItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
}

export interface CompanyStoryConfig {
  eyebrow: string;
  year: string;
  yearLabel: string;
  brandHeading: string;
  title: string;
  paragraph: string;
  tagline: string;
  pillars: PillarItem[];
}

export interface LocationConfig {
  eyebrow: string;
  title: string;
  subtitle: string;
  address: string;
  addressNote: string;
  storefrontImage: string;
  storefrontTag: string;
  travelTimes: Array<{ origin: string; duration: string; note?: string }>;
  travelNote: string;
  googleMapsUrl: string;
  bannerEyebrow: string;
  bannerTitle: string;
  bannerAddress: string;
  storeHours: string;
  pickupInfo: string;
  nearbyLandmarks: string;
}

export interface FaqConfigItem {
  id: string;
  question: string;
  answer: string;
}

export interface OnlineStoreBannerConfig {
  eyebrow: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonUrl: string;
}

export interface RibbonImageItem {
  id: string;
  url: string;
  alt: string;
}

export interface PreFooterConfig {
  eyebrow: string;
  title: string;
  titleItalic: string;
  buttonText: string;
  buttonUrl: string;
}

export interface FooterLinkItem {
  id: string;
  label: string;
  href: string;
}

export interface FooterConfig {
  tagline: string;
  instagramHandle: string;
  instagramUrl: string;
  email: string;
  phone: string;
  phoneTel: string;
  address: string;
  hours: string;
  closedDay: string;
  openingHoursWeekday?: string;
  openingHoursWeekend?: string;
  googleMapsDirectionsUrl?: string;
  copyrightText: string;
  privacyText: string;
  termsText: string;
  exploreLinks?: FooterLinkItem[];
  productRanges?: FooterLinkItem[];
}

export interface CustomSectionItem {
  id: string;
  enabled: boolean;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  content: string;
  imageUrl?: string;
  imagePosition?: 'left' | 'right' | 'top' | 'background';
  backgroundColor?: string;
  textColor?: string;
  ctaText?: string;
  ctaUrl?: string;
}

export interface SiteContentState {
  theme: ThemeConfig;
  header: HeaderConfig;
  hero: HeroConfig;
  categories: CategoryItem[];
  featuredRanges: FeaturedRangeItem[];
  partners: PartnerBrandItem[];
  editorialStories: EditorialStoryItem[];
  essentials: EssentialItem[];
  companyStory: CompanyStoryConfig;
  location: LocationConfig;
  faqs: FaqConfigItem[];
  onlineStoreBanner: OnlineStoreBannerConfig;
  ribbonImages: RibbonImageItem[];
  preFooter: PreFooterConfig;
  footer: FooterConfig;
  customSections: CustomSectionItem[];
}
