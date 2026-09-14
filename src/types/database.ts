export interface Product {
  id: string;
  name: string;
  category: 'meats' | 'seafood' | 'dairy' | 'sausages' | 'frozen' | 'baking';
  subCategory?: string;
  description: string;
  tags?: string[];
  imageUrl: string;
  featured?: boolean;
  bestSeller?: boolean;
}

export interface WholesaleInquiry {
  id?: string;
  created_at?: string;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  businessType: 'hotel' | 'resort' | 'restaurant' | 'supermarket' | 'home' | 'other';
  message: string;
  status?: 'pending' | 'contacted' | 'fulfilled';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface Database {
  public: {
    Tables: {
      products: {
        Row: Product;
        Insert: Omit<Product, 'id'>;
        Update: Partial<Omit<Product, 'id'>>;
      };
      inquiries: {
        Row: WholesaleInquiry;
        Insert: Omit<WholesaleInquiry, 'id' | 'created_at'>;
        Update: Partial<WholesaleInquiry>;
      };
      faqs: {
        Row: FAQItem;
        Insert: FAQItem;
        Update: Partial<FAQItem>;
      };
    };
  };
}
