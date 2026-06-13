import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { blogsApi, categoriesApi } from '../../../lib/api';
import type { BlogPost } from '../../../lib/api';

export default function NewsGrid() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blogs', 'news-grid', selectedCategory],
    queryFn: () => selectedCategory === 'All'
      ? blogsApi.list({ limit: 60 })
      : blogsApi.list({ category: selectedCategory, limit: 60 }),
  });

  const { data: categoryRows = [] } = useQuery({
    queryKey: ['categories', 'blogs'],
    queryFn: () => categoriesApi.list('blogs'),
  });

  const categories = ['All', ...(categoryRows as Array<{ name: string }>).map(c => c.name)];

  const start = (currentPage - 1) * articlesPerPage;
  const visible = (posts as BlogPost[]).slice(start, start + articlesPerPage);
  const totalPages = Math.max(1, Math.ceil(posts.length / articlesPerPage));

  return (
    <section className="py-16 bg-gradient-to-br from-[#f7f5ef] to-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2853] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Latest News & Insights
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Stay updated with the latest developments in technology and innovation
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => { setSelectedCategory(category); setCurrentPage(1); }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-[#1F2853] text-white shadow-lg'
                  : 'bg-white text-[#1F2853] border border-gray-200 hover:bg-[#ffcee0] hover:border-[#ffcee0] hover:text-white'
              }`}
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {category}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-[#f25a1a] rounded-full animate-spin" />
          </div>
        ) : visible.length === 0 ? (
          <p className="text-center text-gray-400 py-16">No articles in this category yet.</p>
        ) : (
          <>
            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {visible.map((article) => (
                <Link
                  key={article.id}
                  to={`/blog/${article.slug}`}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer block"
                >
                  <div className="relative overflow-hidden h-[200px]">
                    {article.hero_image_url ? (
                      <img
                        src={article.hero_image_url}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#1F2853] to-[#f25a1a]" />
                    )}
                    {article.category && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#f25a1a] text-white px-3 py-1 rounded-full text-sm font-medium">
                          {article.category}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-600 mb-3 space-x-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {article.published_date && (
                        <span>{new Date(article.published_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      )}
                      {article.author?.name && <><span>•</span><span>By {article.author.name}</span></>}
                      {article.read_time_minutes && <><span>•</span><span>{article.read_time_minutes} min read</span></>}
                    </div>

                    <h3 className="text-lg font-bold text-[#1F2853] mb-3 group-hover:text-[#f25a1a] transition-colors leading-tight line-clamp-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {article.title}
                    </h3>

                    {article.excerpt && (
                      <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {article.excerpt}
                      </p>
                    )}

                    {(article.tags ?? []).length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {(article.tags ?? []).slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="bg-[#ffcee0]/20 text-[#1F2853] px-2 py-1 rounded-full text-xs font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center text-[#ffcee0] font-medium text-sm hover:text-[#f25a1a] transition-colors cursor-pointer" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Read Article
                      <div className="w-4 h-4 flex items-center justify-center ml-2">
                        <i className="ri-arrow-right-line"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-[#1F2853] hover:bg-[#ffcee0] hover:border-[#ffcee0] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      currentPage === page
                        ? 'bg-[#1F2853] text-white'
                        : 'border border-gray-200 text-[#1F2853] hover:bg-[#ffcee0] hover:border-[#ffcee0] hover:text-white'
                    }`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-[#1F2853] hover:bg-[#ffcee0] hover:border-[#ffcee0] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
