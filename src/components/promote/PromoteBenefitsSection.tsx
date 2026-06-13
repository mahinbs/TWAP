type BenefitItem = {
  title: string;
  description: string;
};

type PreviewCard = {
  icon: string;
  iconBg: string;
  iconColor: string;
  name: string;
  meta: string;
  badge: string;
  badgeColor: string;
};

export type PromoteBenefitsSectionProps = {
  accentColor: string;
  eyebrow: string;
  headingHtml: string;
  introText: string;
  firstCardTitle: string;
  firstCardDescription: string;
  secondCardTitle: string;
  secondCardDescription: string;
  previewCard: PreviewCard;
  directoryBenefits: BenefitItem[];
  reviewBenefits: BenefitItem[];
};

export default function PromoteBenefitsSection({
  accentColor,
  eyebrow,
  headingHtml,
  introText,
  firstCardTitle,
  firstCardDescription,
  secondCardTitle,
  secondCardDescription,
  previewCard,
  directoryBenefits,
  reviewBenefits,
}: PromoteBenefitsSectionProps) {
  return (
    <section className="bg-[#f2f2f1] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase" style={{ color: accentColor }}>
            {eyebrow}
          </p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-black leading-tight text-[#111111]">
            <span dangerouslySetInnerHTML={{ __html: headingHtml }} />
          </h2>
          <p className="mt-5 max-w-3xl mx-auto text-[#6a6a6a] text-sm sm:text-base leading-relaxed">{introText}</p>
        </div>

        <div className="space-y-8">
          <article className="rounded-3xl border border-[#e7e7e7] bg-[#f7f7f6] p-6 sm:p-8 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <div className="rounded-2xl bg-[#ececeb] border border-[#e1e1e1] p-5 sm:p-7">
                <div className="rounded-xl border border-[#dddddd] bg-[#f8f8f7] p-4 sm:p-5 mb-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: previewCard.iconBg, color: previewCard.iconColor }}
                    >
                      <i className={`${previewCard.icon} text-lg`}></i>
                    </div>
                    <div>
                      <p className="text-[#222] font-bold text-base">{previewCard.name}</p>
                      <p className="text-[#8a8a8a] text-xs">{previewCard.meta}</p>
                      <p className="text-[11px] font-semibold mt-1" style={{ color: previewCard.badgeColor }}>
                        {previewCard.badge}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 rounded bg-[#dfdfde] w-full"></div>
                  <div className="h-2 rounded bg-[#e3e3e2] w-11/12"></div>
                  <div className="h-2 rounded bg-[#e6e6e5] w-4/5"></div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-black leading-tight text-[#111111]">{firstCardTitle}</h3>
              <p className="mt-4 text-[#666666] leading-relaxed">{firstCardDescription}</p>

              <div className="mt-6 divide-y divide-[#e4e4e4]">
                {directoryBenefits.map((item) => (
                  <div key={item.title} className="py-4">
                    <div className="flex items-start gap-3">
                      <span
                        className="mt-0.5 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center shrink-0"
                        style={{ backgroundColor: accentColor }}
                      >
                        ✓
                      </span>
                      <div>
                        <p className="text-[#171717] font-bold">{item.title}</p>
                        <p className="mt-1 text-[#666666] text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-[#e7e7e7] bg-[#f7f7f6] p-6 sm:p-8 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-black leading-tight text-[#111111]">{secondCardTitle}</h3>
              <p className="mt-4 text-[#666666] leading-relaxed">{secondCardDescription}</p>

              <div className="mt-6 divide-y divide-[#e4e4e4]">
                {reviewBenefits.map((item) => (
                  <div key={item.title} className="py-4">
                    <div className="flex items-start gap-3">
                      <span
                        className="mt-0.5 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center shrink-0"
                        style={{ backgroundColor: accentColor }}
                      >
                        ✓
                      </span>
                      <div>
                        <p className="text-[#171717] font-bold">{item.title}</p>
                        <p className="mt-1 text-[#666666] text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="rounded-2xl bg-[#ececeb] border border-[#e1e1e1] p-5 sm:p-7">
                <div className="rounded-xl overflow-hidden border border-[#dbdbdb] bg-[#f8f8f7]">
                  <div className="h-9 bg-[#131313] flex items-center justify-between px-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#ff5f57]"></span>
                      <span className="w-2 h-2 rounded-full bg-[#ffbd2e]"></span>
                      <span className="w-2 h-2 rounded-full bg-[#28c840]"></span>
                    </div>
                    <div className="h-3 w-28 rounded bg-white/15"></div>
                  </div>
                  <div className="p-4 sm:p-5 space-y-3">
                    <div className="h-2.5 rounded bg-[#dbdbda] w-full"></div>
                    <div className="h-2.5 rounded bg-[#dddddc] w-10/12"></div>
                    <div className="h-2.5 rounded bg-[#e0e0df] w-11/12"></div>
                    <div className="h-2.5 rounded bg-[#e2e2e1] w-9/12"></div>
                    <div className="h-2.5 rounded bg-[#e5e5e4] w-8/12"></div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
