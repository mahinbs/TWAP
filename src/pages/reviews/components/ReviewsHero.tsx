import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi } from '../../../lib/api';

export default function ReviewsHero() {
  const { data: section } = useQuery({
    queryKey: ['page-section', 'reviews', 'hero'],
    queryFn: () => siteContentApi.section('reviews', 'hero'),
  });

  if (!section) return null;

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={section.media_url ? {
        backgroundImage: `url(${section.media_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      } : undefined}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#1F2853]/90 to-[#1F2853]/70" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {section.title ?? ''}
          </h1>
          {section.description && (
            <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {section.description}
            </p>
          )}

          {(section.cta_text || section.cta_text_2) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {section.cta_text && (
                <Link
                  to={section.cta_url ?? '#'}
                  className="px-8 py-4 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap hover:scale-105 hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #b9ed2a 0%, #a5d426 50%, #91bb22 100%)',
                    color: '#1F2853',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  {section.cta_text}
                </Link>
              )}
              {section.cta_text_2 && (
                <Link
                  to={section.cta_url_2 ?? '#'}
                  className="px-8 py-4 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap backdrop-blur-md border border-white/30"
                  style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white', fontFamily: 'Poppins, sans-serif' }}
                >
                  {section.cta_text_2}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
