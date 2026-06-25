type AddOnItem = {
  icon: string;
  title: string;
  description: string;
  price: string;
  unit: string;
};

export type PromoteAddOnsSectionProps = {
  accentColor: string;
  eyebrow: string;
  headingHtml: string;
  introText: string;
  items: AddOnItem[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonUrl?: string;
};

export default function PromoteAddOnsSection({
  accentColor,
  eyebrow,
  headingHtml,
  introText,
  items,
  ctaTitle,
  ctaDescription,
  ctaButtonText,
  ctaButtonUrl,
}: PromoteAddOnsSectionProps) {
  return (
    <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-start mb-8">
          <div>
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase" style={{ color: accentColor }}>
              {eyebrow}
            </p>
            <h2 className="mt-2 text-4xl sm:text-5xl font-black leading-tight text-[#111111]">
              <span dangerouslySetInnerHTML={{ __html: headingHtml }} />
            </h2>
          </div>
          <p className="text-[#666666] text-base leading-relaxed md:pt-10">{introText}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <article key={item.title} className="rounded-2xl border border-[#e3e3e3] p-5">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${accentColor}1A`, color: accentColor }}>
                <i className={item.icon}></i>
              </div>
              <h3 className="text-xl font-black text-[#111111] leading-tight">{item.title}</h3>
              <p className="mt-2 text-sm text-[#666666] leading-relaxed">{item.description}</p>
              <p className="mt-4 text-4xl font-black leading-none" style={{ color: accentColor }}>
                {item.price}
                <span className="text-sm text-[#666] font-medium ml-1">{item.unit}</span>
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-[#0c0c0c] p-6 sm:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h3 className="text-2xl font-black text-white leading-tight">{ctaTitle}</h3>
            <p className="mt-2 text-sm text-white/70 max-w-3xl leading-relaxed">{ctaDescription}</p>
          </div>
          <a
            href={ctaButtonUrl ?? '#promote-submit-form'}
            className="shrink-0 rounded-full border border-white/20 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors inline-block text-center"
          >
            {ctaButtonText}
          </a>
        </div>
      </div>
    </section>
  );
}
