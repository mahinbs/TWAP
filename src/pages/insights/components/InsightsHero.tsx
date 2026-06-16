
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi } from '../../../lib/api';

const FALLBACK = {
  bg: 'https://readdy.ai/api/search-image?query=Modern%20business%20conference%20room%20with%20entrepreneurs%20and%20startup%20founders%20discussing%20strategies%2C%20professional%20meeting%20environment%2C%20glass%20walls%2C%20natural%20lighting%2C%20collaborative%20workspace%2C%20innovation%20hub%20atmosphere&width=1920&height=800&seq=insights-hero&orientation=landscape',
  title: 'Insights from Industry Leaders',
  description: 'Discover the stories behind successful apps and the founders who built them. Learn from real experiences and proven strategies.',
  cta1: { text: 'Watch Founder Interviews', url: '/interviews-success-stories' },
  cta2: { text: 'Read Success Stories', url: '/resource-centre/blogs' },
  search_placeholder: 'Search founder stories, testimonials, or companies...',
};

export default function InsightsHero() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const { data: section } = useQuery({
    queryKey: ['page-section', 'insights', 'hero'],
    queryFn: () => siteContentApi.section('insights', 'hero'),
  });

  const c = (section?.content ?? {}) as Record<string, string>;
  const bg = section?.media_url ?? FALLBACK.bg;
  const title = section?.title ?? FALLBACK.title;
  const description = section?.description ?? FALLBACK.description;
  const cta1Text = section?.cta_text ?? FALLBACK.cta1.text;
  const cta1Url  = section?.cta_url  ?? FALLBACK.cta1.url;
  const cta2Text = section?.cta_text_2 ?? FALLBACK.cta2.text;
  const cta2Url  = section?.cta_url_2  ?? FALLBACK.cta2.url;
  const searchPlaceholder = c.search_placeholder ?? FALLBACK.search_placeholder;

  const handleSearch = () => {
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <section
      className="relative py-24 lg:py-32 mt-16"
      style={{
        backgroundImage: `url('${bg}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
            {title}
          </h1>

          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            {description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to={cta1Url} className="bg-[#f25a1a] hover:bg-[#d14815] text-white px-8 py-4 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap text-center">
              {cta1Text}
            </Link>
            <Link to={cta2Url} className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 hover:border-white/50 px-8 py-4 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap text-center">
              {cta2Text}
            </Link>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                className="w-full px-6 py-4 text-lg bg-white/95 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f25a1a] focus:border-transparent pr-16 text-[#1F2853]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#f25a1a] text-white px-4 py-2 rounded-md hover:bg-[#d14815] cursor-pointer transition-colors"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-search-line"></i>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
