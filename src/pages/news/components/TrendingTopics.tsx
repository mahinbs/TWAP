import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { blogsApi, categoriesApi, siteContentApi } from '../../../lib/api';
import type { BlogPost } from '../../../lib/api';

export default function TrendingTopics() {
  // Derive trending topics from blog post tags (most frequent)
  const { data: posts = [] } = useQuery({
    queryKey: ['blogs', 'all-for-trending'],
    queryFn: () => blogsApi.list({ limit: 200 }),
  });

  const { data: categoryRows = [] } = useQuery({
    queryKey: ['categories', 'blogs'],
    queryFn: () => categoriesApi.list('blogs'),
  });

  const { data: section } = useQuery({
    queryKey: ['page-section', 'news', 'trending'],
    queryFn: () => siteContentApi.section('news', 'trending'),
  });

  // Count tag occurrences across all posts → top 8
  const tagCounts: Record<string, number> = {};
  (posts as BlogPost[]).forEach(p => (p.tags ?? []).forEach(t => { tagCounts[t] = (tagCounts[t] ?? 0) + 1; }));
  const trending = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, count]) => ({ name, count }));

  if (trending.length === 0 && categoryRows.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2853] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {section?.title ?? 'Trending Topics'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {section?.description ?? "What's hot in the tech world right now"}
          </p>
        </div>

        {trending.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trending.map((topic, index) => (
              <Link
                to={`/resource-centre/blogs?tag=${encodeURIComponent(topic.name)}`}
                key={topic.name}
                className="bg-gradient-to-br from-[#f7f5ef] to-white p-6 rounded-xl border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 bg-[#ffcee0]/20 rounded-lg flex items-center justify-center">
                    <span className="text-[#1F2853] font-bold text-sm">#{index + 1}</span>
                  </div>
                  <i className="ri-arrow-up-line text-green-500" />
                </div>
                <h3 className="text-lg font-bold text-[#1F2853] mb-2 group-hover:text-[#f25a1a] transition-colors" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {topic.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {topic.count} article{topic.count === 1 ? '' : 's'}
                  </span>
                  <i className="ri-arrow-right-line text-gray-400 group-hover:text-[#f25a1a] transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {categoryRows.length > 0 && (
          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold text-[#1F2853] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Browse by Category
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {(categoryRows as Array<{ name: string; slug: string }>).map(cat => (
                <Link
                  to={`/resource-centre/blogs?category=${encodeURIComponent(cat.name)}`}
                  key={cat.slug}
                  className="bg-white border border-gray-200 text-[#1F2853] px-4 py-2 rounded-full font-medium hover:bg-[#ffcee0] hover:border-[#ffcee0] hover:text-white transition-all duration-300 whitespace-nowrap"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
