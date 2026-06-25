import { Link } from "react-router-dom";
import Header from "../../components/feature/Header";
import Footer from "../../components/feature/Footer";
import TopProductsGrid from "../../components/feature/TopProductsGrid";
import ProductReviewSection from "../../components/feature/ProductReviewSection";
import ReadyToStartCta from "../../components/feature/ReadyToStartCta";
import StatsSection from "../../components/feature/StatsSection";
import { useQuery } from '@tanstack/react-query';
import { siteContentApi, toolsApi } from '../../lib/api';

const TP_HERO_FALLBACK_TITLE = 'Top Products';

const FALLBACK_HIGHLIGHTS = [
  {
    id: 'fallback-1',
    title: 'Trending',
    subtitle: 'Most Popular',
    gradient: 'from-transparent via-brand-dark/70 to-brand-dark',
    icon: 'ri-fire-fill',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=100',
    active: false,
    center_badge: '',
    link_url: '',
  },
  {
    id: 'fallback-2',
    title: "Editor's Choice",
    subtitle: 'Highly Rated',
    gradient: 'from-brand-orange/40 via-brand-dark/80 to-brand-dark',
    icon: 'ri-star-fill',
    active: true,
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=800&q=100',
    center_badge: 'Monthly Selection',
    link_url: '',
  },
  {
    id: 'fallback-3',
    title: 'New Arrivals',
    subtitle: 'Just Added',
    gradient: 'from-brand-lime/20 via-brand-dark/80 to-brand-dark',
    icon: 'ri-time-fill',
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=800&q=100',
    active: false,
    center_badge: '',
    link_url: '',
  },
];

export default function TopProductsPage() {
  const { data: heroSection } = useQuery({
    queryKey: ['page-section', 'top-products', 'hero'],
    queryFn: () => siteContentApi.section('top-products', 'hero'),
  });
  const { data: toolsHeroSection } = useQuery({
    queryKey: ['page-section', 'tools', 'hero'],
    queryFn: () => siteContentApi.section('tools', 'hero'),
  });
  const { data: highlights = [] } = useQuery({
    queryKey: ['tools-items', 'highlights'],
    queryFn: () => toolsApi.items('highlights'),
  });

  const heroTitle = heroSection?.title ?? toolsHeroSection?.title ?? TP_HERO_FALLBACK_TITLE;

  const topCategories = highlights.length > 0
    ? highlights.map((h) => {
        const ex = (h.extras ?? {}) as Record<string, unknown>;
        return {
          id: h.id ?? h.title,
          title: h.title,
          subtitle: h.subtitle ?? '',
          gradient: String(ex.gradient ?? 'from-transparent via-brand-dark/70 to-brand-dark'),
          icon: h.icon ?? 'ri-star-fill',
          image: h.image_url ?? '',
          active: Boolean(ex.active),
          center_badge: String(ex.center_badge ?? ''),
          link_url: h.link_url ?? '',
        };
      })
    : FALLBACK_HIGHLIGHTS;

  return (
    <div className="min-h-screen bg-white font-['Manrope']">
      <Header />
      <main>
        <section className="relative bg-white py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(#f0f0f0_1px,transparent_1px),linear-gradient(90deg,#f0f0f0_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-[#1F2853] mb-20 tracking-tight">
              {heroTitle}
            </h1>

            <div className="flex flex-col md:flex-row justify-center items-center mt-12 min-h-[450px] [perspective:1000px] gap-5 md:gap-0">
              {topCategories.map((cat, index) => {
                const isCenter = Boolean(cat.active) || index === 1;
                const cardInner = (
                  <>
                    <div className="absolute inset-0 z-0">
                      {cat.image && (
                        <img
                          src={cat.image}
                          alt={cat.title}
                          className="w-full h-full object-cover mix-blend-overlay group-hover:scale-110 transition-transform duration-700"
                        />
                      )}
                      <div className={`absolute inset-0 bg-gradient-to-b ${cat.gradient} opacity-90`}></div>
                    </div>

                    <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10"></div>

                    <div className="absolute top-6 right-6 z-20">
                      <i className="ri-arrow-right-up-line text-4xl opacity-50"></i>
                    </div>

                    <div className="relative z-20">
                      <div className="mb-4 opacity-80 uppercase tracking-widest text-xs font-semibold">
                        {cat.subtitle}
                      </div>
                      <h3 className="text-4xl font-bold mb-2">{cat.title}</h3>
                      {cat.center_badge && (
                        <div className="flex items-center gap-2 mt-4">
                          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                            <i className={`${cat.icon} text-sm`}></i>
                          </div>
                          <span className="text-sm font-medium">{cat.center_badge}</span>
                        </div>
                      )}
                    </div>
                  </>
                );

                const cardClass = `
                  relative rounded-[2.5rem] p-8 flex flex-col justify-end text-white overflow-hidden shadow-2xl transition-all duration-500 hover:z-30 ease-out group
                  ${isCenter
                    ? 'w-full md:w-[380px] h-[460px] z-20 scale-100 md:scale-110 translate-y-0 shadow-brand-orange/20 mt-0'
                    : 'w-full md:w-[320px] h-[380px] z-10 scale-95 md:opacity-90 hover:opacity-100 hover:scale-105 cursor-pointer grayscale-[30%] hover:grayscale-0 md:mt-5'
                  }
                  ${index === 2 ? 'md:-ml-10' : ''}
                  ${index === 0 ? 'md:-mr-10' : ''}
                  bg-gradient-to-t cursor-pointer ${cat.gradient}
                `;

                return cat.link_url ? (
                  <Link key={String(cat.id)} to={cat.link_url} className={cardClass}>
                    {cardInner}
                  </Link>
                ) : (
                  <div key={String(cat.id)} className={cardClass}>
                    {cardInner}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <TopProductsGrid />
        <ProductReviewSection />
        <ReadyToStartCta />
        <StatsSection />
      </main>
      <Footer />
      <style>{`
         @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
         }
         .animate-infinite-scroll {
            animation: scroll 20s linear infinite;
         }
         .animate-spin-slow {
            animation: spin 3s linear infinite;
         }
         @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
         }
      `}</style>
    </div>
  );
}
