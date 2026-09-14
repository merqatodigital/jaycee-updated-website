import React, { useState } from 'react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { FAQS, PHONE_TEL } from '../data/jayceeData';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-20 md:py-28 bg-[#FAFAFA] dark:bg-[#121110] border-t border-[#F5F5F4] dark:border-[#262322] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Heading & Contact link */}
          <div className="lg:col-span-4">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#78716C] dark:text-[#A8A29E] uppercase block mb-3">
              A LITTLE LOCAL KNOWLEDGE
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1C1917] dark:text-white tracking-tight leading-tight mb-4">
              Good questions. <br />
              <span className="italic">Simple answers.</span>
            </h2>
            <a
              href={PHONE_TEL}
              id="faq-ask-team-link"
              className="inline-flex items-center space-x-1 text-sm font-medium text-[#78716C] dark:text-[#A8A29E] hover:text-[#991B1B] dark:hover:text-[#F87171] transition-colors"
            >
              <span>Ask our team</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Right Column: Interactive Accordion */}
          <div className="lg:col-span-8 divide-y divide-[#E7E5E4] dark:divide-[#262322] border-y border-[#E7E5E4] dark:border-[#262322]">
            {FAQS.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id} className="py-4 sm:py-5">
                  <button
                    type="button"
                    onClick={() => toggle(faq.id)}
                    id={`faq-btn-${faq.id}`}
                    className="w-full flex items-center justify-between text-left group focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-medium text-[#1C1917] dark:text-white group-hover:text-[#991B1B] dark:group-hover:text-[#F87171] transition-colors pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#78716C] dark:text-[#A8A29E] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#991B1B] dark:text-[#F87171]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${faq.id}`}
                      className="mt-3 text-xs sm:text-sm text-[#57534E] dark:text-[#D6D3D1] leading-relaxed font-light pr-6 animate-in fade-in duration-200"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
