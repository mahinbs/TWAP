import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Clock, ArrowRight } from 'lucide-react';
import { blogsApi, siteContentApi } from '../../lib/api';
import type { BlogPost } from '../../lib/api';

export default function NewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: section } = useQuery({
    queryKey: ['page-section', 'home', 'news'],
    queryFn: () => siteContentApi.section('home', 'news'),
  });

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['blogs', 'news-section'],
    queryFn: () => blogsApi.list({ limit: 6 }),
  });

  if (isLoading) return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => <div key={i} className="h-64 bg-gray-200 rounded-3xl animate-pulse" />)}
        </div>
      </div>
    </section>
  );

  if (articles.length === 0) return null;

  const featured = (articles as BlogPost[])[currentIndex];
  const rest = (articles as BlogPost[]).filter((_, i) => i !== currentIndex).slice(0, 2);

  const prev = () => setCurrentIndex(i => (i - 1 + articles.length) % articles.length);
  const next = () => setCurrentIndex(i => (i + 1) % articles.length);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2853] font-['Manrope']">
              {section?.title ?? 'Latest News & Insights'}
            </h2>
            {section?.subtitle && <p className="text-gray-400 mt-2 text-sm">{section.subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={prev}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-[#1F2853] hover:text-white hover:border-[#1F2853] transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={next}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-[#1F2853] hover:text-white hover:border-[#1F2853] transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Featured article */}
          <div className="lg:col-span-7">
            <Link to={`/blog/${featured.slug}`} className="block group h-full">
              <div className="relative rounded-3xl overflow-hidden aspect-[16/9] mb-5 bg-gray-200">
                {featured.hero_image_url
                  ? <img src={featured.hero_image_url} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  : <div className="w-full h-full bg-gradient-to-br from-[#1F2853] to-[#f25a1a]" />
                }
                {featured.category && (
                  <span className="absolute top-4 left-4 bg-[#f25a1a] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {featured.category}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-[#1F2853] group-hover:text-[#f25a1a] transition-colors mb-2 leading-snug font-['Manrope']">
                {featured.title}
              </h3>
              {featured.excerpt && (
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{featured.excerpt}</p>
              )}
              <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                {featured.published_date && (
                  <span>{new Date(featured.published_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                )}
                {featured.read_time_minutes && (
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.read_time_minutes} min</span>
                )}
              </div>
            </Link>
          </div>

          {/* Side articles */}
          <div className="lg:col-span-5 space-y-5">
            {rest.map((article: BlogPost) => (
              <Link key={article.id} to={`/blog/${article.slug}`} className="flex gap-4 group">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-200 shrink-0">
                  {article.hero_image_url
                    ? <img src={article.hero_image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    : <div className="w-full h-full bg-gradient-to-br from-[#1F2853]/20 to-[#f25a1a]/20" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  {article.category && (
                    <span className="text-[10px] font-bold text-[#f25a1a] uppercase tracking-wider">{article.category}</span>
                  )}
                  <h4 className="font-bold text-[#1F2853] text-sm group-hover:text-[#f25a1a] transition-colors line-clamp-2 mt-0.5 leading-snug">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                    {article.published_date && (
                      <span>{new Date(article.published_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    )}
                    {article.read_time_minutes && (
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.read_time_minutes}m</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}

            <Link to="/resource-centre/blogs"
              className="flex items-center gap-2 text-sm font-semibold text-[#1F2853] hover:text-[#f25a1a] transition-colors pt-2">
              View All Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
