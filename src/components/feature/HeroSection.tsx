import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { siteContentApi } from '../../lib/api';

const FALLBACK = {
  title:              'Discover the Best AI Tools & Apps –\nCurated, Reviewed & Ranked',
  subtitle:           'We review the best AI Apps so you dont have to.',
  search_placeholder: 'Search AI tools...',
  btn1_text: 'Browse Apps',   btn1_url: '/directory',
  btn2_text: 'Submit Your App', btn2_url: '/promote',
  btn3_text: 'Get AI Automation Help', btn3_url: '/services',
  tagline: 'Compare, explore, and promote AI-powered tools that matter',
};

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const { data: section } = useQuery({
    queryKey: ['page-section', 'home', 'hero'],
    queryFn: () => siteContentApi.section('home', 'hero'),
  });

  const c = section?.content as Record<string, string> | undefined;
  const title   = section?.title       ?? FALLBACK.title;
  const subtitle = section?.subtitle   ?? FALLBACK.subtitle;
  const tagline  = c?.tagline ?? section?.description ?? FALLBACK.tagline;
  const searchPlaceholder = c?.search_placeholder ?? FALLBACK.search_placeholder;
  const btn1Text = c?.btn1_text ?? FALLBACK.btn1_text;
  const btn1Url  = c?.btn1_url  ?? FALLBACK.btn1_url;
  const btn2Text = c?.btn2_text ?? FALLBACK.btn2_text;
  const btn2Url  = c?.btn2_url  ?? FALLBACK.btn2_url;
  const btn3Text = c?.btn3_text ?? FALLBACK.btn3_text;
  const btn3Url  = c?.btn3_url  ?? FALLBACK.btn3_url;

  const handleSearch = () => {
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const gradientFrom = c?.gradient_from ?? '#1B1B36';
  const gradientTo   = c?.gradient_to   ?? '#56122D';

  return (
    <section
      className="relative py-14 md:py-20 lg:py-32 min-h-screen flex items-center justify-center"
      style={{ background: `linear-gradient(to bottom, ${gradientFrom} 45%, ${gradientTo})` }}
    >
      <div className="absolute inset-0 bg-black/20" />
      {section?.media_url && (
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${section.media_url})` }} />
      )}
      <div className="relative max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 pt-10">
        <div className="text-center reveal-stagger">
          {section?.badge_text && (
            <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
              {section.badge_text}
            </div>
          )}
          <h1 className="reveal-child text-3xl sm:text-4xl md:text-6xl font-medium text-white mb-4 md:mb-8 whitespace-pre-line" style={{ fontFamily: 'Inter, sans-serif' }}>
            {title}
          </h1>

          <p className="reveal-child text-base sm:text-lg md:text-xl text-white/70 mb-8 md:mb-12 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            {subtitle}
          </p>

          {/* Search Bar */}
          <div className="reveal-child max-w-3xl mx-auto mb-6 md:mb-8 rounded-full" style={{ boxShadow: '0 20px 90px 15px rgba(86, 18, 45, 0.8)' }}>
            <div className="relative flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg bg-transparent rounded-full outline-none pr-14 text-white placeholder-white/50"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#f25a1a] text-white p-3 rounded-full hover:bg-[#d14815] transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="reveal-child flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 md:mb-8">
            <Link to={btn1Url} className="bg-[#f25a1a] hover:bg-[#d14815] text-white px-5 sm:px-6 py-3 rounded-full font-medium transition-colors whitespace-nowrap text-center">
              {btn1Text}
            </Link>
            <Link to={btn2Url} className="bg-[#1F2853] hover:bg-[#162040] text-white px-5 sm:px-6 py-3 rounded-full font-medium transition-colors whitespace-nowrap text-center">
              {btn2Text}
            </Link>
            <Link to={btn3Url} className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 hover:border-white/50 px-5 sm:px-6 py-3 rounded-full font-medium transition-all whitespace-nowrap text-center">
              {btn3Text}
            </Link>
          </div>

          <p className="reveal-child text-lg text-white/80 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            {tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
