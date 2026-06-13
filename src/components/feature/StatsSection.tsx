import { useQuery } from '@tanstack/react-query';
import { siteContentApi } from '../../lib/api';

const FALLBACK_STATS = [
  { label: 'AI Tools Listed',   value: '2,500+', icon: 'ri-apps-line' },
  { label: 'Monthly Users',     value: '150K+',  icon: 'ri-user-line' },
  { label: 'Reviews Written',   value: '50K+',   icon: 'ri-star-line' },
  { label: 'User Satisfaction', value: '95%',    icon: 'ri-thumb-up-line' },
];

const FALLBACK_TITLE = 'Trusted by Developers Worldwide';
const FALLBACK_DESC  = 'Join thousands of developers who rely on our curated AI tool directory';

interface StatsSectionProps {
  page?: string;
  sectionKey?: string;
}

export default function StatsSection({ page = 'home', sectionKey }: StatsSectionProps) {
  const resolvedSection = sectionKey ?? (page === 'tools' ? 'stats' : 'measurable');

  const { data: section } = useQuery({
    queryKey: ['page-section', page, resolvedSection],
    queryFn: () => siteContentApi.section(page, resolvedSection),
  });

  const { data: dbStats = [] } = useQuery({
    queryKey: ['stats', page],
    queryFn: () => siteContentApi.stats(page),
  });

  const title = section?.title ?? FALLBACK_TITLE;
  const description = section?.description ?? FALLBACK_DESC;
  const stats = dbStats.length > 0
    ? dbStats.slice(0, 4).map(s => ({ label: s.label, value: s.value, icon: s.icon ?? 'ri-star-line' }))
    : FALLBACK_STATS;

  return (
    <div className="bg-blue-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-blue-100 text-lg">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <i className={`${stat.icon} text-3xl text-orange-400`}></i>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
