import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi, successStoriesApi } from '../../lib/api';

const FALLBACK = [
  { title: 'From $0 to $1M ARR in 6 Months', category: 'SaaS Scaling', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800', stats: '1M+ REV', badge_color: 'bg-brand-orange' },
  { title: 'Revolutionizing Logistics with AI', category: 'Enterprise AI', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800', stats: '300% ROI', badge_color: 'bg-brand-orange' },
  { title: 'The Future of EdTech', category: 'Education', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800', stats: '5M Users', badge_color: 'bg-brand-orange' },
  { title: 'Fintech Trust & Security', category: 'Finance', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800', stats: 'Zero Fraud', badge_color: 'bg-brand-orange' },
];

const StoriesGrid = () => {
  const { data: section } = useQuery({
    queryKey: ['page-section', 'success_stories', 'stories'],
    queryFn: () => siteContentApi.section('success_stories', 'stories'),
  });

  const { data: items = [] } = useQuery({
    queryKey: ['success-stories-items', 'stories'],
    queryFn: () => successStoriesApi.items('stories'),
  });

  const content = (section?.content ?? {}) as Record<string, string>;
  const stories = items.length > 0
    ? items.map(item => {
        const ex = (item.extras ?? {}) as Record<string, string>;
        return {
          title: item.title,
          category: ex.category ?? '',
          image: item.image_url ?? '',
          stats: ex.stats ?? '',
          badge_color: ex.badge_color ?? 'bg-brand-orange',
          link: item.link_url ?? '#',
        };
      })
    : FALLBACK.map(s => ({ ...s, link: '#' }));

  const titleParts = (section?.title ?? 'Success Stories that Inspire Growth').split(content.title_highlight ?? 'Inspire Growth');
  const eyebrow = section?.subtitle ?? 'Real Results';
  const highlight = content.title_highlight ?? 'Inspire Growth';

  return (
    <section id="success-stories" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-brand-orange font-bold text-xs tracking-widest uppercase mb-2 block">{eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark">
              {titleParts[0]}<br />
              <span className="text-brand-orange">{highlight}</span>
              {titleParts[1] ?? ''}
            </h2>
          </div>
          <Link to={section?.cta_url ?? '#'} className="px-6 py-3 rounded-full border border-gray-200 hover:border-brand-orange hover:text-brand-orange transition-all font-bold text-gray-500 flex items-center gap-2 group">
            {section?.cta_text ?? 'View All Stories'}
            <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stories.map((story, index) => (
            <Link key={index} to={story.link} className="group relative rounded-3xl overflow-hidden cursor-pointer bg-gray-50 hover:-translate-y-2 transition-transform duration-500 shadow-lg">
              <div className="relative h-64 overflow-hidden">
                {story.image && (
                  <img src={story.image} alt={story.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider ${story.badge_color}`}>
                  {story.category}
                </span>
              </div>
              <div className="p-6 relative">
                <div className="absolute -top-10 right-6 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <i className="ri-arrow-right-up-line text-xl text-brand-dark" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-orange transition-colors leading-tight">{story.title}</h3>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                  <i className="ri-bar-chart-fill text-gray-400" />
                  <span className="text-sm font-bold text-gray-500">{story.stats}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesGrid;
