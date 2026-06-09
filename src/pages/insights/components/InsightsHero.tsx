import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi } from '../../../lib/api';

export default function InsightsHero() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const { data: section } = useQuery({
    queryKey: ['page-section', 'insights', 'hero'],
    queryFn: () => siteContentApi.section('insights', 'hero'),
  });

  if (!section) return null;
  const content = (section.content ?? {}) as Record<string, string>;

  const handleSearch = () => {
    if (searchQuery.trim()) navigate(`/resource-centre/blogs?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <section
      className="relative py-24 lg:py-32 mt-16"
      style={section.media_url ? { backgroundImage: `url(${section.media_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
            {section.title}
          </h1>
          {section.description && (
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              {section.description}
            </p>
          )}

          {(section.cta_text || section.cta_text_2) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {section.cta_text && (
                <Link to={section.cta_url ?? '#'} className="bg-[#f25a1a] hover:bg-[#d14815] text-white px-8 py-4 rounded-lg font-medium transition-colors whitespace-nowrap">
                  {section.cta_text}
                </Link>
              )}
              {section.cta_text_2 && (
                <Link to={section.cta_url_2 ?? '#'} className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 px-8 py-4 rounded-lg font-medium transition-all whitespace-nowrap">
                  {section.cta_text_2}
                </Link>
              )}
            </div>
          )}

          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <input
                type="text"
                placeholder={content.search_placeholder ?? 'Search…'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
                className="w-full px-6 py-4 text-lg bg-white/95 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f25a1a] focus:border-transparent pr-16 text-[#1F2853]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#f25a1a] text-white px-4 py-2 rounded-md hover:bg-[#d14815] transition-colors"
              >
                <i className="ri-search-line" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
