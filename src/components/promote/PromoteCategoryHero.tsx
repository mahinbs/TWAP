export type PromoteCategoryTheme = {
  key: string;
  viewingLabel: string;
  viewingPrefix: string;
  switchCategoryText: string;
  topBarBg: string;
  accent: string;
  accentSoft: string;
  badgeText: string;
  title: string;
  description: string;
  heroImageUrl?: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
};

type Metric = {
  value: string;
  label: string;
};

interface PromoteCategoryHeroProps {
  theme: PromoteCategoryTheme;
  metrics: Metric[];
}

export default function PromoteCategoryHero({ theme, metrics }: PromoteCategoryHeroProps) {
  return (
    <main className="pt-[6.5rem] sm:pt-[5.5rem] min-h-screen flex flex-col justify-center relative">
      <div
        className="absolute inset-0 opacity-30 w-1/2 h-1/2 rounded-full blur-[120px] z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundColor: theme.topBarBg }}
      />

      <section className="px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className={`max-w-5xl mx-auto text-center ${theme.heroImageUrl ? 'lg:grid lg:grid-cols-2 lg:gap-12 lg:text-left lg:items-center' : ''}`}>
          {theme.heroImageUrl && (
            <div className="hidden lg:block order-2">
              <img src={theme.heroImageUrl} alt="" className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]" />
            </div>
          )}
          <div className={theme.heroImageUrl ? 'order-1' : ''}>
          <span
            className="inline-flex rounded-full border px-4 py-1.5 text-[10px] sm:text-xs uppercase tracking-wide font-semibold"
            style={{
              color: theme.accent,
              borderColor: theme.accentSoft,
              backgroundColor: theme.accentSoft,
            }}
          >
            {theme.badgeText}
          </span>

          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black !leading-[1.1]">
            <span dangerouslySetInnerHTML={{ __html: theme.title }} />
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-white/60 leading-relaxed">
            {theme.description}
          </p>

          <div className="mt-7 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 max-w-3xl mx-auto">
            {metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black !tracking-normal">{metric.value}</div>
                <div className="text-[11px] sm:text-xs text-white/45 mt-1">{metric.label}</div>
              </div>
            ))}
          </div>

          <div className={`mt-10 flex flex-col sm:flex-row items-center gap-3 ${theme.heroImageUrl ? 'lg:justify-start' : 'justify-center'}`}>
            <a
              href={theme.primaryCtaUrl}
              className="w-full sm:w-auto rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 text-center"
              style={{ backgroundColor: theme.topBarBg }}
            >
              {theme.primaryCtaText} <i className="ri-arrow-right-line ml-1"></i>
            </a>
            <a
              href={theme.secondaryCtaUrl}
              className="w-full sm:w-auto rounded-full px-6 py-3 text-sm font-semibold border border-white/20 text-white hover:bg-white/5 transition-colors text-center"
            >
              {theme.secondaryCtaText}
            </a>
          </div>
          </div>
        </div>
      </section>
    </main>
  );
}
