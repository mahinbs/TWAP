import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi } from '../../lib/api';
import { readSectionGradient } from '../../lib/sectionGradient';

const FALLBACK = {
  badge: 'Strategic Partnerships',
  title_line1: 'Your Trusted',
  title_line2: 'Consulting Partner',
  description: 'Empowering your business with expert guidance, innovative strategies, and sustainable growth solutions designed for the modern era.',
  cta: { text: 'Free Consultation', url: '/promote' },
};

export default function AgenciesHero() {
  const { data: section } = useQuery({
    queryKey: ['page-section', 'agencies', 'hero'],
    queryFn: () => siteContentApi.section('agencies', 'hero'),
  });
  const c = (section?.content ?? {}) as Record<string, string>;
  const badge = section?.badge_text ?? FALLBACK.badge;
  const titleLine1 = c.title_line1 ?? FALLBACK.title_line1;
  const titleLine2 = c.title_line2 ?? FALLBACK.title_line2;
  const description = section?.description ?? FALLBACK.description;
  const ctaText = section?.cta_text ?? FALLBACK.cta.text;
  const ctaUrl  = section?.cta_url  ?? FALLBACK.cta.url;
  const { from: gradientFrom, to: gradientTo } = readSectionGradient(c, {
    defaultFrom: '#1B1B36',
    defaultTo: '#56122D',
  });

  return (
    <section
      className="relative py-14 md:py-20 lg:py-32 min-h-screen flex items-center justify-center"
      style={{ background: `linear-gradient(to bottom, ${gradientFrom} 45%, ${gradientTo})` }}
    >
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="text-center reveal-stagger">
          <div className="reveal-child inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-brand-lime text-xs font-bold tracking-wider mb-6 uppercase border border-white/20">
            <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse"></span>
            {badge}
          </div>

          <h1 className="reveal-child text-5xl md:text-7xl font-medium text-white mb-8 leading-tight tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
            {titleLine1} <br />
            <span className="text-white">{titleLine2}</span>
          </h1>

          <p className="reveal-child text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            {description}
          </p>

          <div className="reveal-child flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={ctaUrl} className="bg-[#f25a1a] hover:bg-[#d14815] text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-xl shadow-[#56122D]/20 border border-[#f25a1a]">
              {ctaText}
              <div className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center">
                <i className="ri-arrow-right-up-line text-sm"></i>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
