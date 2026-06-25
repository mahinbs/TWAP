import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi } from '../../lib/api';
import { readSectionGradient } from '../../lib/sectionGradient';

const FALLBACK = {
  title_line1: 'Discover the Best AI Tools & Apps –',
  title_line2: 'Curated, Reviewed & Ranked',
  description: 'We review the best AI Apps so you dont have to.',
  tagline: 'Compare, explore, and promote AI-powered tools that matter',
  search_placeholder: 'Search AI tools...',
  cta1: { text: 'Browse Apps', url: '/directory' },
  cta2: { text: 'Submit Your App', url: '/promote' },
  cta3: { text: 'Get AI Automation Help', url: '/services' },
};

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const { data: section } = useQuery({
    queryKey: ['page-section', 'home', 'hero'],
    queryFn: () => siteContentApi.section('home', 'hero'),
  });

  const c = (section?.content ?? {}) as Record<string, string>;
  const titleLine1 = section?.title ?? FALLBACK.title_line1;
  const titleLine2 = section?.subtitle ?? FALLBACK.title_line2;
  const description = section?.description ?? FALLBACK.description;
  const tagline = c.tagline ?? FALLBACK.tagline;
  const searchPlaceholder = c.search_placeholder ?? FALLBACK.search_placeholder;
  const cta1Text = section?.cta_text ?? FALLBACK.cta1.text;
  const cta1Url  = section?.cta_url  ?? FALLBACK.cta1.url;
  const cta2Text = section?.cta_text_2 ?? FALLBACK.cta2.text;
  const cta2Url  = section?.cta_url_2  ?? FALLBACK.cta2.url;
  const cta3Text = c.cta_3_text ?? FALLBACK.cta3.text;
  const cta3Url  = c.cta_3_url  ?? FALLBACK.cta3.url;
  const { from: gradientFrom, to: gradientTo } = readSectionGradient(c, {
    defaultFrom: '#1B1B36',
    defaultTo: '#56122D',
  });

  const handleSearch = () => {
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <section
      className="relative py-14 md:py-20 lg:py-32 min-h-screen flex items-center justify-center"
      style={{
        background: `linear-gradient(to bottom, ${gradientFrom} 45%, ${gradientTo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 pt-10">
        <div className="text-center reveal-stagger">
          <h1 className="reveal-child text-3xl sm:text-4xl md:text-6xl font-medium text-white mb-4 md:mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
            {titleLine1}<br />
            <span className="text-white">{titleLine2}</span>
          </h1>

          <p className="reveal-child text-base sm:text-lg md:text-xl text-white/70 mb-8 md:mb-12 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            {description}
          </p>

          {/* Search Bar */}
          <div className="reveal-child max-w-3xl mx-auto mb-6 md:mb-8 rounded-full" style={{ boxShadow: '0 20px 90px 15px rgba(86, 18, 45, 0.8)' }}>
            <div className="relative">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg bg-transparent rounded-full outline-none focus:border-transparent pr-12 sm:pr-16 text-white"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#f25a1a] text-white px-3 py-3 rounded-full hover:bg-[#d14815] cursor-pointer transition-colors"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-search-line"></i>
                </div>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="reveal-child flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 md:mb-8">
            <Link to={cta1Url} className="bg-[#f25a1a] hover:bg-[#d14815] text-white px-5 sm:px-6 py-3 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap">
              {cta1Text}
            </Link>
            <Link to={cta2Url} className="bg-[#1F2853] hover:bg-[#162040] text-white px-5 sm:px-6 py-3 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap">
              {cta2Text}
            </Link>
            <Link to={cta3Url} className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 hover:border-white/50 px-5 sm:px-6 py-3 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap">
              {cta3Text}
            </Link>
          </div>

          {/* Moved text below buttons */}
          <p className="reveal-child text-lg text-white/80 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            {tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
