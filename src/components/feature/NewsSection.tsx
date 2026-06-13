import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { blogsApi, siteContentApi } from '../../lib/api';
import type { BlogPost } from '../../lib/api';

const FALLBACK_TITLE = 'Latest in AI & App Development';

export default function NewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { data: section } = useQuery({
    queryKey: ['page-section', 'home', 'news'],
    queryFn: () => siteContentApi.section('home', 'news'),
  });

  const { data: articles = [] } = useQuery({
    queryKey: ['blogs', 'news-section'],
    queryFn: () => blogsApi.list({ limit: 6 }),
  });

  const title = section?.title ?? FALLBACK_TITLE;
  const viewAllLabel = section?.cta_text ?? 'View All Articles';
  const viewAllUrl   = section?.cta_url   ?? '/resource-centre/blogs';

  if (articles.length === 0) return null;

  const featuredArticle = (articles as BlogPost[])[currentIndex];
  const sideArticles = (articles as BlogPost[]).slice(currentIndex + 1, currentIndex + 3).concat(
    (articles as BlogPost[]).slice(0, Math.max(0, (currentIndex + 3) - articles.length))
  );

  const handleTransition = (newIndex: number) => {
    if (newIndex === currentIndex || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 150);
  };

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? articles.length - 1 : currentIndex - 1;
    handleTransition(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex === articles.length - 1 ? 0 : currentIndex + 1;
    handleTransition(newIndex);
  };

  const handleSideArticleClick = (article: BlogPost) => {
    const newIndex = (articles as BlogPost[]).findIndex(a => a.id === article.id);
    if (newIndex !== -1) handleTransition(newIndex);
  };

  const formatDate = (d?: string) => d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <section className="py-12 bg-gradient-to-br from-[#f7f5ef] to-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2853] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {title}
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Left Navigation Button */}
          <button
            onClick={handlePrevious}
            disabled={isTransitioning}
            className="absolute left-[-80px] top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-[#1F2853] text-white rounded-full flex items-center justify-center hover:bg-[#f25a1a] transition-all duration-300 shadow-lg disabled:opacity-50"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-arrow-left-line text-lg"></i>
            </div>
          </button>

          {/* Right Navigation Button */}
          <button
            onClick={handleNext}
            disabled={isTransitioning}
            className="absolute right-[-80px] top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-[#1F2853] text-white rounded-full flex items-center justify-center hover:bg-[#f25a1a] transition-all duration-300 shadow-lg disabled:opacity-50"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-arrow-right-line text-lg"></i>
            </div>
          </button>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[380px]">
            {/* Featured Article - Left Column (2/3 width) */}
            <div className="lg:col-span-2">
              <Link to={`/blog/${featuredArticle.slug}`}>
                <article className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer h-full ${isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                  <div className="relative overflow-hidden h-[200px]">
                    {featuredArticle.hero_image_url && (
                      <img
                        src={featuredArticle.hero_image_url}
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#f25a1a] text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                    {featuredArticle.category && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 text-[#1F2853] px-3 py-1 rounded-full text-sm font-medium">
                          {featuredArticle.category}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 h-[180px] flex flex-col justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#1F2853] mb-2 group-hover:text-[#f25a1a] transition-colors leading-tight line-clamp-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {featuredArticle.title}
                      </h3>

                      <div className="flex items-center text-sm text-gray-600 mb-2 space-x-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        <span>{formatDate(featuredArticle.published_date)}</span>
                        {featuredArticle.author?.name && (<><span>•</span><span>By {featuredArticle.author.name}</span></>)}
                        {featuredArticle.read_time_minutes && (<><span>•</span><span>{featuredArticle.read_time_minutes} min read</span></>)}
                      </div>

                      {featuredArticle.excerpt && (
                        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {featuredArticle.excerpt}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center text-[#ffcee0] font-medium text-sm hover:text-[#f25a1a] transition-colors cursor-pointer" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Read Full Article
                      <div className="w-4 h-4 flex items-center justify-center ml-2">
                        <i className="ri-arrow-right-line"></i>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </div>

            {/* Side Articles - Right Column (1/3 width) */}
            <div className="lg:col-span-1 flex flex-col gap-4 h-full">
              {sideArticles.map((article) => (
                <article
                  key={article.id}
                  onClick={() => handleSideArticleClick(article)}
                  className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer h-[180px] ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}
                >
                  <div className="h-full flex flex-col">
                    <div className="relative overflow-hidden h-[90px]">
                      {article.hero_image_url && (
                        <img
                          src={article.hero_image_url}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      {article.category && (
                        <div className="absolute top-2 left-2">
                          <span className="bg-[#f25a1a] text-white px-2 py-1 rounded-full text-xs font-medium">
                            {article.category}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-4 h-[90px] flex flex-col justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-[#1F2853] mb-1 group-hover:text-[#f25a1a] transition-colors leading-tight line-clamp-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                          {article.title}
                        </h4>

                        <div className="flex items-center text-xs text-gray-600 mb-1 space-x-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          <span>{formatDate(article.published_date)}</span>
                          {article.read_time_minutes && (<><span>•</span><span>{article.read_time_minutes} min read</span></>)}
                        </div>
                      </div>

                      <div className="flex items-center text-[#ffcee0] font-medium text-xs hover:text-[#f25a1a] transition-colors cursor-pointer" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Read More
                        <div className="w-4 h-4 flex items-center justify-center ml-1">
                          <i className="ri-arrow-right-line"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              {/* View All Articles Button */}
              <div className="mt-2">
                <Link
                  to={viewAllUrl}
                  className="block text-center w-full bg-gradient-to-r from-[#1F2853] to-[#2a3a6b] text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap text-sm"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {viewAllLabel}
                  <div className="w-4 h-4 inline-flex items-center justify-center ml-2">
                    <i className="ri-external-link-line"></i>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Article Navigation Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {(articles as BlogPost[]).map((_, index) => (
              <button
                key={index}
                onClick={() => handleTransition(index)}
                disabled={isTransitioning}
                className={`w-3 h-3 rounded-full transition-all duration-300 disabled:opacity-50 ${
                  index === currentIndex
                    ? 'bg-[#f25a1a] scale-110'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
