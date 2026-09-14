import React, { useState } from 'react';
import { X, CheckCircle2, Send, Phone } from 'lucide-react';
import { PHONE_NUMBER, PHONE_TEL } from '../data/jayceeData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { WholesaleInquiry } from '../types/database';

interface WholesaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WholesaleModal: React.FC<WholesaleModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<WholesaleInquiry>({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    businessType: 'hotel',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isSupabaseConfigured && supabase) {
        // Ready for direct Supabase table insertion
        await (supabase.from('inquiries') as any).insert([
          {
            ...formData,
            status: 'pending',
          },
        ]);
      }
      // Simulate fast smooth submission
      setTimeout(() => {
        setSubmitting(false);
        setSubmitted(true);
      }, 500);
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[#1C1917] rounded-xl shadow-2xl p-6 sm:p-8 overflow-hidden text-[#1C1917] dark:text-[#F5F5F4] border border-transparent dark:border-[#2E2B29]"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#78716C] dark:text-[#A8A29E] hover:text-[#1C1917] dark:hover:text-white rounded-full hover:bg-[#F5F5F4] dark:hover:bg-[#2A2624] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-serif text-[#1C1917] dark:text-white mb-2">
              Enquiry Received
            </h3>
            <p className="text-sm text-[#57534E] dark:text-[#D6D3D1] mb-6 max-w-sm mx-auto font-light leading-relaxed">
              Thank you for reaching out. Our wholesale logistics team will contact you within 24 hours to arrange sample cuts, volume pricing, and delivery schedules.
            </p>
            <div className="p-3 bg-[#FAFAFA] dark:bg-[#242120] rounded-lg border border-[#E7E5E4] dark:border-[#383330] text-xs text-[#78716C] dark:text-[#A8A29E] mb-6">
              For urgent kitchen orders, you can also reach us directly at{' '}
              <a href={PHONE_TEL} className="font-semibold text-[#991B1B] dark:text-[#F87171] hover:underline">
                {PHONE_NUMBER}
              </a>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="bg-[#1C1917] dark:bg-white text-white dark:text-[#1C1917] px-6 py-2.5 rounded-md text-sm font-medium hover:bg-black dark:hover:bg-neutral-200 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#78716C] dark:text-[#A8A29E] uppercase block mb-1">
              COMMERCIAL INQUIRIES
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#1C1917] dark:text-white mb-2">
              Wholesale Supply Enquiry
            </h3>
            <p className="text-xs text-[#78716C] dark:text-[#A8A29E] mb-6 font-light">
              Supplying Palawan’s premier resorts, hotels, and restaurants with temperature-monitored meats, seafood, and pantry essentials.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#44403C] dark:text-[#D6D3D1] mb-1">
                    Business / Entity Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. El Nido Beach Resort"
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-[#D6D3D1] dark:border-[#44403C] rounded-md focus:outline-none focus:ring-1 focus:ring-[#991B1B] bg-white dark:bg-[#242120] text-[#1C1917] dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#44403C] dark:text-[#D6D3D1] mb-1">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="Head Chef / Purchasing Officer"
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-[#D6D3D1] dark:border-[#44403C] rounded-md focus:outline-none focus:ring-1 focus:ring-[#991B1B] bg-white dark:bg-[#242120] text-[#1C1917] dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#44403C] dark:text-[#D6D3D1] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="purchasing@hospitality.com"
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-[#D6D3D1] dark:border-[#44403C] rounded-md focus:outline-none focus:ring-1 focus:ring-[#991B1B] bg-white dark:bg-[#242120] text-[#1C1917] dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#44403C] dark:text-[#D6D3D1] mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0917 XXX XXXX"
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-[#D6D3D1] dark:border-[#44403C] rounded-md focus:outline-none focus:ring-1 focus:ring-[#991B1B] bg-white dark:bg-[#242120] text-[#1C1917] dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#44403C] dark:text-[#D6D3D1] mb-1">
                  Establishment Type
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      businessType: e.target.value as WholesaleInquiry['businessType'],
                    })
                  }
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-[#D6D3D1] dark:border-[#44403C] rounded-md focus:outline-none focus:ring-1 focus:ring-[#991B1B] bg-white dark:bg-[#242120] text-[#1C1917] dark:text-white"
                >
                  <option value="hotel">Hotel / Boutique Lodge</option>
                  <option value="resort">Island Resort</option>
                  <option value="restaurant">Restaurant / Bistro</option>
                  <option value="supermarket">Supermarket / Grocery Retail</option>
                  <option value="home">Catering / Private Chef</option>
                  <option value="other">Other Commercial Kitchen</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#44403C] dark:text-[#D6D3D1] mb-1">
                  Product Needs & Weekly Volume Requirements
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Specify cuts (e.g. Ribeye, Striploin, Salmon fillets, Dairy block), estimated quantities, and delivery location..."
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-[#D6D3D1] dark:border-[#44403C] rounded-md focus:outline-none focus:ring-1 focus:ring-[#991B1B] bg-white dark:bg-[#242120] text-[#1C1917] dark:text-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href={PHONE_TEL}
                  className="inline-flex items-center text-xs text-[#78716C] dark:text-[#A8A29E] hover:text-[#991B1B] dark:hover:text-[#F87171]"
                >
                  <Phone className="w-3.5 h-3.5 mr-1" />
                  <span>Call directly: {PHONE_NUMBER}</span>
                </a>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center space-x-2 bg-[#8B1D24] hover:bg-[#74151B] text-white px-5 py-2.5 rounded-md text-xs sm:text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Submitting...' : 'Send Enquiry'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
