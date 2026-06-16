import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi } from '../../../lib/api';

const FALLBACK = {
  bg: 'https://readdy.ai/api/search-image?query=Modern%20technology%20review%20platform%20background&width=1920&height=800&seq=reviews-hero&orientation=landscape',
  title: 'App Reviews & Rankings',
  description: 'Discover the best apps through comprehensive reviews from both users and our expert team',
  cta1: { text: 'Submit Your Review', url: '/promote' },
  cta2: { text: 'Browse All Reviews', url: '/directory' },
};

export default function ReviewsHero() {
  const { data: section } = useQuery({
    queryKey: ['page-section', 'reviews', 'hero'],
    queryFn: () => siteContentApi.section('reviews', 'hero'),
  });
  const bg = section?.media_url ?? FALLBACK.bg;
  const title = section?.title ?? FALLBACK.title;
  const description = section?.description ?? FALLBACK.description;
  const cta1Text = section?.cta_text ?? FALLBACK.cta1.text;
  const cta1Url  = section?.cta_url  ?? FALLBACK.cta1.url;
  const cta2Text = section?.cta_text_2 ?? FALLBACK.cta2.text;
  const cta2Url  = section?.cta_url_2  ?? FALLBACK.cta2.url;

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#1F2853]/90 to-[#1F2853]/70"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {title}
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to={cta1Url}
              className="px-8 py-4 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap hover:scale-105 hover:shadow-lg text-center"
              style={{
                background: 'linear-gradient(135deg, #b9ed2a 0%, #a5d426 50%, #91bb22 100%)',
                color: '#1F2853',
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              {cta1Text}
            </Link>
            <Link
              to={cta2Url}
              className="px-8 py-4 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap backdrop-blur-md border border-white/30 text-center"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              {cta2Text}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
