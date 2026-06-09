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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2853] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Latest Articles
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Stay updated with the latest tech news, insights, and trends
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-[#f25a1a] text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-[#1F2853] hover:text-white border border-gray-200'
              }`}
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {cat}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {visible.map(post => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer block">
                  <div className="relative overflow-hidden h-48">
                    {post.hero_image_url
                      ? <img src={post.hero_image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      : <div className="w-full h-full bg-gradient-to-br from-[#1F2853] to-[#f25a1a]" />
                    }
                    {post.category && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#f25a1a] text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {post.category}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-xs text-gray-500 mb-3 space-x-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {post.published_date && (
                        <span>{new Date(post.published_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      )}
                      {post.read_time_minutes && <><span>•</span><span>{post.read_time_minutes} min read</span></>}
                    </div>
                    <h3 className="text-lg font-bold text-[#1F2853] mb-3 group-hover:text-[#f25a1a] transition-colors leading-tight line-clamp-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {post.excerpt}
                      </p>
                    )}
                    {(post.tags ?? []).length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {(post.tags ?? []).slice(0, 3).map((tag, i) => (
                          <span key={i} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">#{tag}</span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {post.author?.name ?? 'TWAP'}
                      </span>
                      <span className="text-[#f25a1a] font-semibold text-sm">Read More →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      currentPage === page
                        ? 'bg-[#f25a1a] text-white shadow-lg'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50"
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
