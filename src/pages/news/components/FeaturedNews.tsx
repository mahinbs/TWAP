import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { blogsApi, siteContentApi } from '../../../lib/api';

export default function FeaturedNews() {
  // Most recent published blog post = featured story
  const { data: posts = [] } = useQuery({
    queryKey: ['blogs', 'news-featured'],
    queryFn: () => blogsApi.list({ limit: 1 }),
  });

  const { data: section } = useQuery({
    queryKey: ['page-section', 'news', 'featured'],
    queryFn: () => siteContentApi.section('news', 'featured'),
  });

  const featured = posts[0];
  if (!featured) return null;

  const title       = section?.title       ?? 'Featured Story';
  const description = section?.description ?? 'The most important tech story of the week';

  return (
    <section className="py-16 bg-gradient-to-br from-[#f7f5ef] to-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2853] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>{description}</p>
        </div>

        <Link to={`/blog/${featured.slug}`} className="block bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="relative overflow-hidden h-[300px] lg:h-[500px]">
              {featured.hero_image_url
                ? <img src={featured.hero_image_url} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                : <div className="w-full h-full bg-gradient-to-br from-[#1F2853] to-[#f25a1a]" />
              }
              {featured.category && (
                <div className="absolute top-6 left-6">
                  <span className="bg-[#f25a1a] text-white px-4 py-2 rounded-full text-sm font-semibold">{featured.category}</span>
                </div>
              )}
              {(featured.tags ?? []).length > 0 && (
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex flex-wrap gap-2">
                    {(featured.tags ?? []).slice(0, 5).map((tag, i) => (
                      <span key={i} className="bg-white/90 text-[#1F2853] px-3 py-1 rounded-full text-xs font-medium">#{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center text-sm text-gray-600 mb-4 space-x-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {featured.published_date && <span>{new Date(featured.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>}
                {featured.author?.name && <><span>•</span><span>By {featured.author.name}</span></>}
                {featured.read_time_minutes && <><span>•</span><span>{featured.read_time_minutes} min read</span></>}
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-[#1F2853] mb-4 group-hover:text-[#f25a1a] transition-colors leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {featured.title}
              </h3>
              {featured.excerpt && (
                <p className="text-gray-700 text-lg leading-relaxed mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {featured.excerpt}
                </p>
              )}
              <div className="flex items-center space-x-4">
                <span className="bg-gradient-to-r from-[#1F2853] to-[#2a3a6b] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Read Full Article
                  <div className="w-4 h-4 inline-flex items-center justify-center ml-2">
                    <i className="ri-arrow-right-line"></i>
                  </div>
                </span>
                <span className="flex items-center space-x-2 text-gray-600 hover:text-[#f25a1a] transition-colors">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-share-line"></i>
                  </div>
                  <span className="font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>Share</span>
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
