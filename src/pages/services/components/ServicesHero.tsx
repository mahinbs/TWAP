import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi } from '../../../lib/api';

const ServicesHero: React.FC = () => {
  const { data: section } = useQuery({
    queryKey: ['page-section', 'services', 'hero'],
    queryFn: () => siteContentApi.section('services', 'hero'),
  });

  if (!section) return null;

  return (
    <section
      className="relative pt-32 pb-24 overflow-hidden"
      style={section.media_url ? { backgroundImage: `url(${section.media_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1F2853]/95 via-[#1F2853]/90 to-[#1F2853]/85" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {section.badge_text && (
            <div className="inline-block px-6 py-2 bg-[#ffcee0]/20 backdrop-blur-sm rounded-full border border-[#ffcee0]/30 mb-6">
              <span className="text-[#ffcee0] font-semibold text-sm">{section.badge_text}</span>
            </div>
          )}

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-['Poppins']">
            {section.title}
          </h1>

          {section.description && (
            <p className="text-xl text-gray-200 mb-8 leading-relaxed font-['Manrope']">
              {section.description}
            </p>
          )}

          {(section.cta_text || section.cta_text_2) && (
            <div className="flex flex-wrap gap-4 justify-center">
              {section.cta_text && (
                <a
                  href={section.cta_url ?? '#'}
                  className="px-8 py-4 bg-[#f25a1a] text-white rounded-full font-semibold hover:bg-[#d94d15] transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
                >
                  {section.cta_text}
                </a>
              )}
              {section.cta_text_2 && (
                <a
                  href={section.cta_url_2 ?? '#'}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/30 whitespace-nowrap"
                >
                  {section.cta_text_2}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
