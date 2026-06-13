import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi } from '../../lib/api';

const FALLBACK_BG = "url('https://static.readdy.ai/image/19a52a0e7cd11d182286c46a940c9855/d888d3e6c6140bd2ef82a28fa63739fe.jpeg')";
const FALLBACK = {
  title_line1: 'Discover the Best AI Tools & Apps –',
  title_line2: 'Curated, Reviewed & Ranked',
  subtitle: 'We review the best AI Apps so you dont have to.',
  tagline: 'Compare, explore, and promote AI-powered tools that matter',
  search_placeholder: 'Search AI tools...',
  btn1_text: 'Browse Apps', btn1_url: '/directory',
  btn2_text: 'Submit Your App', btn2_url: '/promote',
  btn3_text: 'Get AI Automation Help', btn3_url: '/services',
};

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const { data: section } = useQuery({
    queryKey: ['page-section', 'home', 'hero'],
    queryFn: () => siteContentApi.section('home', 'hero'),
  });

  const c = (section?.content ?? {}) as Record<string, string>;

  // Title can be split (line1 + line2) OR one string with \n
  const titleRaw = section?.title ?? '';
  const [t1, t2] = titleRaw.includes('\n')
    ? titleRaw.split('\n')
    : [c.title_line1 ?? FALLBACK.title_line1, c.title_line2 ?? FALLBACK.title_line2];

  const subtitle = section?.subtitle ?? c.subtitle ?? FALLBACK.subtitle;
  const tagline  = c.tagline ?? section?.description ?? FALLBACK.tagline;
  const searchPlaceholder = c.search_placeholder ?? FALLBACK.search_placeholder;
  const btn1Text = c.btn1_text ?? FALLBACK.btn1_text;
  const btn1Url  = c.btn1_url  ?? FALLBACK.btn1_url;
  const btn2Text = c.btn2_text ?? FALLBACK.btn2_text;
  const btn2Url  = c.btn2_url  ?? FALLBACK.btn2_url;
  const btn3Text = c.btn3_text ?? FALLBACK.btn3_text;
  const btn3Url  = c.btn3_url  ?? FALLBACK.btn3_url;

  const handleSearch = () => {
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const bgImage = section?.media_url ? `url('${section.media_url}')` : FALLBACK_BG;

  return (
    <section
      className="relative py-20 lg:py-32 mt-16"
      style={{
        backgroundImage: bgImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
            {t1}<br />
            <span className="text-white">{t2}</span>
          </h1>

          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            {subtitle}
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
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

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to={btn1Url} className="bg-[#f25a1a] hover:bg-[#d14815] text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap text-center">
              {btn1Text}
            </Link>
            <Link to={btn2Url} className="bg-[#1F2853] hover:bg-[#162040] text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap text-center">
              {btn2Text}
            </Link>
            <Link to={btn3Url} className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 hover:border-white/50 px-6 py-3 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap text-center">
              {btn3Text}
            </Link>
          </div>

          {/* Moved text below buttons */}
          <p className="text-lg text-white/80 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            {tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
