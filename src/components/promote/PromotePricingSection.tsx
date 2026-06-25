type PricingPlan = {
  name: string;
  subtitle: string;
  price: string;
  features: string[];
  ctaText: string;
  ctaUrl?: string;
  highlighted?: boolean;
  badgeText?: string;
};

export type PromotePricingSectionProps = {
  accentColor: string;
  eyebrow: string;
  headingHtml: string;
  introText: string;
  plans: PricingPlan[];
};

export default function PromotePricingSection({
  accentColor,
  eyebrow,
  headingHtml,
  introText,
  plans,
}: PromotePricingSectionProps) {
  return (
    <section className="bg-[#f2f2f1] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase" style={{ color: accentColor }}>
            {eyebrow}
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-black leading-tight text-[#111111]">
            <span dangerouslySetInnerHTML={{ __html: headingHtml }} />
          </h2>
          <p className="mt-5 max-w-3xl mx-auto text-[#666666] text-sm sm:text-base leading-relaxed">{introText}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative rounded-3xl border p-5 sm:p-6 ${
                plan.highlighted
                  ? 'bg-[#0b0b0b] border-[#1f1f1f] text-white shadow-[0_15px_35px_rgba(0,0,0,0.35)]'
                  : 'bg-[#f7f7f6] border-[#e5e5e5] text-[#111111]'
              }`}
            >
              {plan.highlighted && plan.badgeText && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-bold px-4 py-1 rounded-full text-white"
                  style={{ backgroundColor: accentColor }}
                >
                  {plan.badgeText}
                </span>
              )}

              <h3 className="text-2xl font-black leading-tight">{plan.name}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${plan.highlighted ? 'text-white/65' : 'text-[#666666]'}`}>
                {plan.subtitle}
              </p>

              <div className="mt-4 flex items-end gap-1">
                <span className={`text-base ${plan.highlighted ? 'text-white/75' : 'text-[#555]'}`}>$</span>
                <span className="text-6xl font-black leading-none">{plan.price}</span>
              </div>

              <div className={`mt-4 border-t ${plan.highlighted ? 'border-white/10' : 'border-[#e5e5e5]'}`}></div>
              <ul className="mt-4 space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <span
                      className={`mt-[2px] text-xs ${plan.highlighted ? 'text-white' : ''}`}
                      style={!plan.highlighted ? { color: accentColor } : undefined}
                    >
                      ✓
                    </span>
                    <span className={`text-sm leading-relaxed ${plan.highlighted ? 'text-white/85' : 'text-[#555]'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.ctaUrl ?? '#promote-submit-form'}
                className={`mt-6 w-full rounded-xl py-3 text-sm font-semibold transition-colors block text-center ${
                  plan.highlighted ? 'text-white' : 'text-[#222] border border-[#e2e2e2] bg-white hover:bg-[#f5f5f5]'
                }`}
                style={plan.highlighted ? { backgroundColor: accentColor } : undefined}
              >
                {plan.ctaText}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
