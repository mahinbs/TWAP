import { useQuery } from '@tanstack/react-query';
import { siteContentApi, toolsApi } from '../../lib/api';

const FALLBACK = [
  { title: 'Trending', subtitle: 'Most Popular', gradient: 'from-transparent via-brand-dark/70 to-brand-dark', icon: 'ri-fire-fill', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=100', active: false, center_badge: '' },
  { title: "Editor's Choice", subtitle: 'Highly Rated', gradient: 'from-brand-orange/40 via-brand-dark/80 to-brand-dark', icon: 'ri-star-fill', image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=800&q=100', active: true, center_badge: 'Monthly Selection' },
  { title: 'New Arrivals', subtitle: 'Just Added', gradient: 'from-brand-lime/20 via-brand-dark/80 to-brand-dark', icon: 'ri-time-fill', image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=800&q=100', active: false, center_badge: '' },
];

export default function TopProductsHero() {
  const { data: section } = useQuery({
    queryKey: ['page-section', 'tools', 'hero'],
    queryFn: () => siteContentApi.section('tools', 'hero'),
  });

  const { data: items = [] } = useQuery({
    queryKey: ['tools-items', 'highlights'],
    queryFn: () => toolsApi.items('highlights'),
  });

  const heading = section?.title ?? 'Top Products';

  const categories = items.length > 0
    ? items.map(item => {
        const ex = (item.extras ?? {}) as Record<string, string | boolean>;
        return {
          id: item.id,
          title: item.title,
          subtitle: item.subtitle ?? '',
          gradient: (ex.gradient as string) ?? 'from-transparent via-brand-dark/70 to-brand-dark',
          icon: item.icon ?? 'ri-star-fill',
          image: item.image_url ?? '',
          active: Boolean(ex.active),
          center_badge: (ex.center_badge as string) ?? '',
          link_url: item.link_url,
        };
      })
    : FALLBACK.map((c, i) => ({ ...c, id: String(i), link_url: undefined }));

  return (
    <section className="relative bg-white py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(#f0f0f0_1px,transparent_1px),linear-gradient(90deg,#f0f0f0_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-[#1F2853] mb-20 tracking-tight">
          {heading}
        </h1>

        <div className="flex flex-col md:flex-row justify-center items-center mt-12 min-h-[450px] [perspective:1000px] gap-5 md:gap-0">
          {categories.map((cat, index) => {
            const isCenter = cat.active || index === 1;
            const cardClass = `
                  relative rounded-[2.5rem] p-8 flex flex-col justify-end text-white overflow-hidden shadow-2xl transition-all duration-500 hover:z-30 ease-out group
                  ${isCenter
                    ? 'w-full md:w-[380px] h-[460px] z-20 scale-100 md:scale-110 translate-y-0 shadow-brand-orange/20 mt-0'
                    : 'w-full md:w-[320px] h-[380px] z-10 scale-95 md:opacity-90 hover:opacity-100 hover:scale-105 cursor-pointer grayscale-[30%] hover:grayscale-0 md:mt-5'}
                  ${index === 2 ? 'md:-ml-10' : ''}
                  ${index === 0 ? 'md:-mr-10' : ''}
                  ${index === 0 && !isCenter ? 'md:rotate-[-6deg] md:translate-y-5' : ''}
                  ${index === 2 && !isCenter ? 'md:rotate-[6deg] md:translate-y-5' : ''}
                  bg-gradient-to-t cursor-pointer ${cat.gradient}
                `;
            const inner = (
              <>
                <div className="absolute inset-0 z-0">
                  {cat.image && (
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover mix-blend-overlay group-hover:scale-110 transition-transform duration-700"
                    />
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-b ${cat.gradient} opacity-90`} />
                </div>

                <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10" />

                <div className="absolute top-6 right-6 z-20">
                  <i className="ri-arrow-right-up-line text-4xl opacity-50" />
                </div>

                <div className="relative z-20">
                  <div className="mb-4 opacity-80 uppercase tracking-widest text-xs font-semibold">
                    {cat.subtitle}
                  </div>
                  <h3 className="text-4xl font-bold mb-2">{cat.title}</h3>
                  {isCenter && cat.center_badge && (
                    <div className="flex items-center gap-2 mt-4">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                        <i className={`${cat.icon} text-sm`} />
                      </div>
                      <span className="text-sm font-medium">{cat.center_badge}</span>
                    </div>
                  )}
                </div>
              </>
            );

            return cat.link_url ? (
              <a key={cat.id} href={cat.link_url} className={cardClass}>{inner}</a>
            ) : (
              <div key={cat.id} className={cardClass}>{inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
