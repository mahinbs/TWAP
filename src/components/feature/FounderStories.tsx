import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { siteContentApi } from "../../lib/api";
import type { FounderStory } from "../../lib/api";

const DEFAULT_GRADIENTS = [
  "linear-gradient(150deg, #ecffbf 0%, #e1f97b 100%)",
  "linear-gradient(150deg, #ffe8f2 0%, #fdd7ed 100%)",
  "linear-gradient(150deg, #f6f1ff 0%, #e9ddff 100%)",
];

export default function FounderStories() {
  const { data: section } = useQuery({
    queryKey: ['page-section', 'home', 'founder'],
    queryFn: () => siteContentApi.section('home', 'founder'),
  });

  const { data: founders = [], isLoading } = useQuery({
    queryKey: ['founder-stories'],
    queryFn: siteContentApi.founderStories,
  });

  const c = section?.content as Record<string, string> | undefined;

  if (!isLoading && founders.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[#f7f5ef] via-white to-[#f7f5ef] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#f25a1a]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#1F2853]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center lg:text-left mb-12 lg:mb-16 max-w-4xl">
          {section?.subtitle && (
            <div className="inline-block mb-6">
              <span
                className="px-6 py-2 bg-gradient-to-r from-[#ffcee0]/20 to-[#ffb3d6]/20 backdrop-blur-sm border border-[#ffcee0]/30 rounded-full text-[#f25a1a] text-sm font-semibold"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {section.subtitle}
              </span>
            </div>
          )}
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1F2853] mb-4 leading-tight"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {section?.title ?? 'Founder visibility that looks and feels editorial'}
          </h2>
          {section?.description && (
            <p className="text-xl sm:text-2xl text-gray-700 mb-4 max-w-3xl" style={{ fontFamily: "Poppins, sans-serif" }}>
              {section.description}
            </p>
          )}
          {c?.extra_description && (
            <p className="text-lg text-gray-600 max-w-2xl" style={{ fontFamily: "Poppins, sans-serif" }}>
              {c.extra_description}
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-96 bg-gray-100 rounded-[36px] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {(founders as FounderStory[]).map((founder, index) => {
              const background = founder.card_gradient ?? DEFAULT_GRADIENTS[index % DEFAULT_GRADIENTS.length];
              const card = (
                <div
                  className="rounded-[36px] p-6 sm:p-7 flex flex-col justify-between shadow-lg border border-white/60 h-full"
                  style={{ background }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-[#1F2853]/10 text-[#1F2853]"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {founder.company}
                    </span>
                    {founder.is_prime_feature !== false && (
                      <span className="flex items-center gap-1 text-sm text-gray-800 font-semibold">
                        <i className="ri-star-fill text-[#f25a1a]" />
                        Prime Feature
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-[#1F2853]" style={{ fontFamily: "Manrope, sans-serif" }}>
                      {founder.name}
                    </h3>
                    {founder.title && (
                      <p className="text-sm text-gray-800 mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
                        {founder.title}
                      </p>
                    )}
                    {founder.product_name && (
                      <h4 className="text-lg font-semibold mb-2 text-[#1F2853]" style={{ fontFamily: "Manrope, sans-serif" }}>
                        {founder.product_name}
                      </h4>
                    )}
                    {founder.question && (
                      <p className="text-sm text-gray-700 leading-relaxed mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
                        &ldquo;{founder.question}&rdquo;
                      </p>
                    )}
                    {founder.answer && (
                      <p className="text-sm text-gray-800 leading-relaxed" style={{ fontFamily: "Poppins, sans-serif" }}>
                        {founder.answer}
                      </p>
                    )}
                  </div>

                  {founder.avatar_url && (
                    <div className="mt-6">
                      <div className="rounded-[26px] overflow-hidden shadow-inner border border-white/70">
                        <img src={founder.avatar_url} alt={founder.name} className="w-full aspect-square object-cover" />
                      </div>
                    </div>
                  )}
                </div>
              );

              return founder.slug ? (
                <Link key={founder.id} to={`/founders/${founder.slug}`} className="block hover:scale-[1.02] transition-transform">
                  {card}
                </Link>
              ) : (
                <div key={founder.id}>{card}</div>
              );
            })}
          </div>
        )}

        {(c?.cta_title || c?.cta_button_text) && (
          <div
            className="text-center rounded-3xl p-8 lg:p-12 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(31, 40, 83, 0.08) 0%, rgba(22, 32, 64, 0.12) 100%)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-transparent pointer-events-none" />
            <div className="relative z-10">
              {c?.cta_title && (
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F2853] mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
                  {c.cta_title}
                </h3>
              )}
              {c?.cta_description && (
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {c.cta_description}
                </p>
              )}
              {c?.cta_button_text && (
                <Link
                  to={c?.cta_button_url ?? '/promote'}
                  className="inline-flex bg-gradient-to-r from-[#f25a1a] to-[#ff7043] text-white px-8 lg:px-10 py-4 lg:py-5 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 whitespace-nowrap text-base lg:text-lg"
                  style={{ fontFamily: "Poppins, sans-serif", boxShadow: "0 10px 30px rgba(242, 90, 26, 0.4)" }}
                >
                  <span className="flex items-center gap-2">
                    {c.cta_button_text}
                    <i className="ri-arrow-right-line" />
                  </span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
