import { useQuery } from '@tanstack/react-query';
import { siteContentApi } from '../../../lib/api';

interface StatItem { icon: string; label: string }

const FALLBACK_BG = 'https://readdy.ai/api/search-image?query=modern%20technology%20workspace%20with%20multiple%20screens%20showing%20various%20software%20applications%20and%20tools%2C%20professional%20office%20environment%20with%20clean%20design%2C%20blue%20and%20purple%20lighting%2C%20futuristic%20digital%20interface%20elements%2C%20high-tech%20atmosphere&width=1920&height=600&seq=directory1&orientation=landscape';

const DEFAULT_STATS: StatItem[] = [
  { icon: 'ri-apps-line', label: '500+ Apps Listed' },
  { icon: 'ri-star-line', label: '10,000+ Reviews' },
  { icon: 'ri-user-line', label: '50,000+ Users' },
];

export default function DirectoryHero() {
  const { data: section } = useQuery({
    queryKey: ['page-section', 'directory', 'hero'],
    queryFn: () => siteContentApi.section('directory', 'hero'),
  });

  const c = (section?.content ?? {}) as Record<string, unknown>;
  const title = section?.title ?? 'App Directory';
  const description = section?.description ?? 'Discover the best AI-powered tools and applications. Compare features, read reviews, and find the perfect solution for your needs.';
  const bg = section?.media_url ?? FALLBACK_BG;
  const stats = (Array.isArray(c.stats) ? c.stats : DEFAULT_STATS) as StatItem[];

  return (
    <section
      className="relative py-20 bg-gradient-to-br from-[#1F2853] via-[#2a3a6b] to-[#1F2853] overflow-hidden"
      style={{
        backgroundImage: `url('${bg}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="absolute inset-0 bg-[#1F2853]/80"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-manrope">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-poppins">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
              <span className="text-white/80 text-sm font-medium font-poppins">
                <i className={`${stat.icon} mr-2`}></i>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
