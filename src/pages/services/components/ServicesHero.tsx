import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi } from '../../../lib/api';

const FALLBACK = {
  bg: 'https://readdy.ai/api/search-image?query=Modern%20digital%20technology%20workspace&width=1920&height=800&seq=services-hero-bg&orientation=landscape',
  badge: 'Premium Services',
  title: 'Elevate Your Digital Presence',
  description: "Choose from our premium services designed to boost your app's visibility and transform your business with cutting-edge AI automation solutions",
  cta1: { text: 'Feature Your App',          url: '#app-promotion' },
  cta2: { text: 'AI Automation Services',    url: '#ai-automation' },
};

const ServicesHero: React.FC = () => {
  const { data: section } = useQuery({
    queryKey: ['page-section', 'services', 'hero'],
    queryFn: () => siteContentApi.section('services', 'hero'),
  });
  const bg = section?.media_url ?? FALLBACK.bg;
  const badge = section?.badge_text ?? FALLBACK.badge;
  const title = section?.title ?? FALLBACK.title;
  const description = section?.description ?? FALLBACK.description;
  const cta1Text = section?.cta_text ?? FALLBACK.cta1.text;
  const cta1Url  = section?.cta_url  ?? FALLBACK.cta1.url;
  const cta2Text = section?.cta_text_2 ?? FALLBACK.cta2.text;
  const cta2Url  = section?.cta_url_2  ?? FALLBACK.cta2.url;

  return (
    <section
      className="relative pt-32 pb-24 overflow-hidden"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1F2853]/95 via-[#1F2853]/90 to-[#1F2853]/85"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-6 py-2 bg-[#ffcee0]/20 backdrop-blur-sm rounded-full border border-[#ffcee0]/30 mb-6">
            <span className="text-[#ffcee0] font-semibold text-sm">{badge}</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-['Poppins']">
            {title}
          </h1>

          <p className="text-xl text-gray-200 mb-8 leading-relaxed font-['Manrope']">
            {description}
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={cta1Url}
              className="px-8 py-4 bg-[#f25a1a] text-white rounded-full font-semibold hover:bg-[#d94d15] transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
            >
              {cta1Text}
            </a>
            <a
              href={cta2Url}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/30 whitespace-nowrap cursor-pointer"
            >
              {cta2Text}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
