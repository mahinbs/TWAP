import { useQuery } from '@tanstack/react-query';
import { siteContentApi, successStoriesApi } from '../../lib/api';

const FALLBACK_CARDS = [
  { title: 'Success Stories', description: 'Explore in-depth case studies of businesses achieving massive ROI and growth.', icon: 'ri-trophy-line', link_text: 'Read Stories', scroll_target: 'success-stories', icon_bg: 'bg-brand-orange/20', icon_color: 'text-brand-orange' },
  { title: 'Interviews', description: 'Exclusive conversations with founders and experts sharing their playbooks.', icon: 'ri-mic-line', link_text: 'Watch Interviews', scroll_target: 'interviews', icon_bg: 'bg-brand-orange/20', icon_color: 'text-brand-orange' },
  { title: 'Success Notes', description: 'Curated takeaways, strategies, and actionable insights for your business.', icon: 'ri-sticky-note-line', link_text: 'View Notes', scroll_target: 'success-notes', icon_bg: 'bg-pink-500/20', icon_color: 'text-pink-500' },
];

const SuccessStoriesHero = () => {
  const { data: section } = useQuery({
    queryKey: ['page-section', 'success_stories', 'hero'],
    queryFn: () => siteContentApi.section('success_stories', 'hero'),
  });

  const { data: cards = [] } = useQuery({
    queryKey: ['success-stories-items', 'hero_cards'],
    queryFn: () => successStoriesApi.items('hero_cards'),
  });

  const content = (section?.content ?? {}) as Record<string, string>;
  const highlight = content.title_highlight ?? 'Success';
  const titleBase = section?.title?.replace(highlight, '').trim() ?? 'Unlock the Secrets of';
  const description = section?.description ?? 'Dive deep into exclusive interviews, case studies, and success notes from industry leaders transforming the digital landscape.';

  const heroCards = cards.length > 0
    ? cards.map(c => {
        const ex = (c.extras ?? {}) as Record<string, string>;
        return {
          title: c.title,
          description: c.description ?? '',
          icon: ex.icon ?? 'ri-star-line',
          link_text: ex.link_text ?? 'Learn more',
          scroll_target: ex.scroll_target ?? '',
          icon_bg: ex.icon_bg ?? 'bg-brand-orange/20',
          icon_color: ex.icon_color ?? 'text-brand-orange',
        };
      })
    : FALLBACK_CARDS;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-brand-dark text-white overflow-hidden flex flex-col items-center justify-center py-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0F0F1A] via-[#1B1B36] to-[#2D0F1E]" />
        <div className="absolute top-0 left-0 w-full h-full opacity-30"
          style={{ backgroundImage: 'radial-gradient(circle at center, white 0.20px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="absolute top-[-20%] left-1/4 w-[600px] h-[600px] bg-brand-burgundy/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-0 w-[800px] h-[800px] bg-brand-orange/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full flex flex-col items-center pt-14">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 leading-tight max-w-4xl mx-auto">
          {titleBase}
          <span className="text-brand-orange"> {highlight}</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl text-center max-w-2xl mx-auto mb-10 font-light">
          {description}
        </p>

        <div className="absolute top-32 left-10 md:left-20 animate-float-large hidden lg:block">
          <i className="ri-rocket-2-fill text-4xl text-brand-orange" />
        </div>
        <div className="absolute bottom-40 right-10 md:right-20 animate-float-large animation-delay-2000 hidden lg:block">
          <i className="ri-bar-chart-box-fill text-5xl text-brand-orange" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {heroCards.map((card) => (
            <div
              key={card.title}
              onClick={() => card.scroll_target && scrollToSection(card.scroll_target)}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors group cursor-pointer"
            >
              <div className={`w-12 h-12 ${card.icon_bg} rounded-xl flex items-center justify-center mb-6 ${card.icon_color}`}>
                <i className={`${card.icon} text-2xl`} />
              </div>
              <h3 className="text-xl font-bold mb-3">{card.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{card.description}</p>
              <div className="flex items-center text-sm font-bold text-white group-hover:gap-2 transition-all">
                {card.link_text} <i className="ri-arrow-right-line ml-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesHero;
