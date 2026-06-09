import { useQuery } from '@tanstack/react-query';
import { siteContentApi, agenciesPageApi } from '../../lib/api';

const FALLBACK = [
  { layout: 'image', badge: 'Strategy', title: 'Strategic Alliances', subtitle: 'Driving Innovation', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800' },
  { layout: 'stat', badge: 'Success Story', title: 'Unlock Potential Through Shared Vision', stat_value: '1.6x', stat_description: 'net synergies realized above the initial target.', bg_color: '#B9ED2A', title_muted: 'Shared Vision' },
  { layout: 'image', badge: 'Global', title: 'Global Impact', subtitle: 'Scaling Success', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800' },
];

export default function AgenciesGrid() {
  const { data: section } = useQuery({
    queryKey: ['page-section', 'agencies', 'collaborations'],
    queryFn: () => siteContentApi.section('agencies', 'collaborations'),
  });

  const { data: items = [] } = useQuery({
    queryKey: ['agencies-items', 'collaborations'],
    queryFn: () => agenciesPageApi.items('collaborations'),
  });

  const content = (section?.content ?? {}) as Record<string, string>;
  const badge = section?.subtitle ?? 'Collaborations';
  const title = section?.title ?? 'Partnerships that';
  const highlight = content.title_highlight ?? 'Inspired Growth';

  const cards = items.length > 0
    ? items.map(item => {
        const ex = (item.extras ?? {}) as Record<string, string>;
        return {
          layout: ex.layout ?? 'image',
          badge: ex.badge ?? '',
          title: item.title,
          subtitle: item.subtitle ?? '',
          image: item.image_url ?? '',
          stat_value: ex.stat_value ?? '',
          stat_description: ex.stat_description ?? '',
          bg_color: ex.bg_color ?? '#B9ED2A',
          title_muted: ex.title_muted ?? '',
        };
      })
    : FALLBACK;

  return (
    <section className="bg-white px-6 lg:px-8 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center md:text-left">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#f25a1a]/10 border border-[#f25a1a]/20 text-sm font-bold text-[#f25a1a] mb-4 uppercase tracking-wider">
            {badge}
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1B20]">
            {title} <span className="text-[#f25a1a]">{highlight}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[500px]">
          {cards.map((card, index) => {
            if (card.layout === 'stat') {
              const parts = card.title.split(card.title_muted || 'Shared Vision');
              return (
                <div
                  key={index}
                  className="rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between group text-[#1A1B20] hover:shadow-2xl hover:shadow-lime-500/20 transition-all duration-300"
                  style={{ backgroundColor: card.bg_color }}
                >
                  <div className="absolute inset-0 bg-white/20 pointer-events-none" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 100% 40%)' }} />
                  <div className="absolute inset-0 bg-white/10 pointer-events-none" style={{ clipPath: 'polygon(100% 0, 100% 100%, 50% 100%)' }} />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-auto">
                      <span className="text-xs font-bold text-[#1A1B20] uppercase tracking-wider border border-[#1A1B20]/20 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">{card.badge}</span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold leading-tight mb-8">
                      {parts[0]}<br />
                      {card.title_muted && <span className="opacity-70">{card.title_muted}</span>}
                    </h3>
                    <div className="mt-auto">
                      <div className="text-6xl font-black mb-2 tracking-tighter">{card.stat_value}</div>
                      <p className="text-sm font-medium opacity-80 max-w-[200px] leading-snug">{card.stat_description}</p>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={index} className="bg-[#F9FAFB] rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider border border-gray-200 px-3 py-1 rounded-full bg-white">{card.badge}</span>
                </div>
                <div className="relative z-10 mt-8 mb-auto">
                  <h3 className="text-3xl font-medium text-[#1A1B20] leading-tight group-hover:text-[#f25a1a] transition-colors">
                    {card.title} <br />
                    {card.subtitle && <span className="text-gray-400 group-hover:text-[#f25a1a]/70 transition-colors">{card.subtitle}</span>}
                  </h3>
                </div>
                {card.image && (
                  <div className="w-full h-64 mt-8 rounded-2xl overflow-hidden relative">
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1B20]/50 to-transparent" />
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
