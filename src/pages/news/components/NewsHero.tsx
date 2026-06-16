
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi } from '../../../lib/api';

const FALLBACK = {
  bg: 'https://readdy.ai/api/search-image?query=Modern%20technology%20news%20background%20with%20AI%20and%20digital%20innovation%20themes%2C%20futuristic%20tech%20interface%2C%20neural%20networks%2C%20data%20visualization%2C%20professional%20news%20environment%2C%20blue%20and%20orange%20color%20scheme%2C%20minimalist%20design&width=1920&height=800&seq=news-hero&orientation=landscape',
  title_line1: 'Latest in ',
  title_highlight: 'AI & Tech',
  title_line2: ' News',
  description: 'Stay ahead of the curve with breaking news, insights, and analysis from the world of artificial intelligence, app development, and emerging technologies.',
  search_placeholder: 'Search news articles, topics, or keywords...',
  search_button: 'Search',
  stats: [
    { value: '500+',  label: 'Articles Published' },
    { value: '50K+',  label: 'Monthly Readers' },
    { value: 'Daily', label: 'Fresh Updates' },
  ],
};

export default function NewsHero() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const { data: section } = useQuery({
    queryKey: ['page-section', 'news', 'hero'],
    queryFn: () => siteContentApi.section('news', 'hero'),
  });
  const { data: dbStats = [] } = useQuery({
    queryKey: ['site-stats', 'news'],
    queryFn: () => siteContentApi.stats('news'),
  });

  const c = (section?.content ?? {}) as Record<string, string>;
  const bg = section?.media_url ?? FALLBACK.bg;
  const titleLine1     = c.title_line1 ?? FALLBACK.title_line1;
  const titleHighlight = c.title_highlight ?? FALLBACK.title_highlight;
  const titleLine2     = c.title_line2 ?? FALLBACK.title_line2;
  const description    = section?.description ?? FALLBACK.description;
  const searchPlaceholder = c.search_placeholder ?? FALLBACK.search_placeholder;
  const searchButton      = c.search_button      ?? FALLBACK.search_button;
  const stats = dbStats.length > 0
    ? dbStats.slice(0, 3).map(s => ({ value: s.value, label: s.label }))
    : FALLBACK.stats;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/resource-centre/blogs?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#1F2853] via-[#2a3a6b] to-[#1F2853] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url('${bg}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1F2853]/90 to-[#2a3a6b]/80" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {titleLine1}<span className="text-[#ffcee0]">{titleHighlight}</span>{titleLine2}
          </h1>

          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {description}
          </p>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full px-6 py-4 pl-14 text-lg bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ffcee0] focus:border-transparent transition-all duration-300"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center">
                <i className="ri-search-line text-gray-300 text-xl"></i>
              </div>
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#f25a1a] to-[#ff7043] text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {searchButton}
              </button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#ffcee0] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {stat.value}
                </div>
                <div className="text-gray-200 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
