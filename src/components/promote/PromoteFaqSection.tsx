import { useState } from 'react';

type FaqItem = {
  question: string;
  answer: string;
};

export type PromoteFaqSectionProps = {
  accentColor: string;
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  items: FaqItem[];
};

export default function PromoteFaqSection({
  accentColor,
  eyebrow,
  headingPrefix,
  headingHighlight,
  items,
}: PromoteFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase" style={{ color: accentColor }}>
            {eyebrow}
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-black leading-tight text-[#111111]">
            {headingPrefix}{' '}
            <span style={{ color: accentColor }}>
              {headingHighlight}
            </span>
          </h2>
        </div>

        <div className="border-t border-[#d8d8d8]">
          {items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={`${item.question}-${index}`} className="border-b border-[#d8d8d8]">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 text-left py-5"
                >
                  <span className="text-[#111111] text-base sm:text-[1.05rem] font-medium leading-relaxed">
                    {item.question}
                  </span>
                  <span className="text-2xl leading-none shrink-0" style={{ color: accentColor }}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-5 pr-2 sm:pr-10 text-[#555555] text-sm sm:text-base leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
