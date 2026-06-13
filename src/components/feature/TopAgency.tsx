import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { agenciesApi, siteContentApi } from '../../lib/api';

const FALLBACK_LOGO = 'https://readdy.ai/api/search-image?query=Modern%20minimalist%20AI%20technology%20company%20logo%20design%20with%20geometric%20shapes%2C%20clean%20lines%2C%20professional%20corporate%20branding%2C%20blue%20and%20white%20color%20scheme%2C%20simple%20abstract%20symbol%20representing%20artificial%20intelligence%20and%20innovation%2C%20high-tech%20aesthetic%2C%20vector%20style%20logo%20on%20transparent%20background&width=96&height=96&seq=agency-logo-001&orientation=squarish';
const FALLBACK_AGENCY = {
  name: 'AI Innovations Studio',
  slug: '',
  description: 'Leading AI development agency specializing in custom automation solutions for enterprise clients. 50+ successful AI implementations.',
};

export default function TopAgency() {
  const { data: section } = useQuery({
    queryKey: ['page-section', 'home', 'top_agency'],
    queryFn: () => siteContentApi.section('home', 'top_agency'),
  });

  const { data: agencies = [] } = useQuery({
    queryKey: ['agencies', 'top'],
    queryFn: () => agenciesApi.list({ featured: true, limit: 1 }),
  });

  const title = section?.title ?? 'Top Agency Of The Month';
  const ctaText = section?.cta_text ?? 'Visit Agency Profile';

  const agency = agencies[0];
  const agencyName = agency?.name ?? FALLBACK_AGENCY.name;
  const agencyDesc = agency?.description ?? FALLBACK_AGENCY.description;
  const agencyLogo = agency?.avatar_url ?? FALLBACK_LOGO;
  const agencyHref = agency ? `/agencies/${agency.slug}` : '/agencies';

  return (
    <section className="py-16 bg-[#f7f5ef]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#1F2853] mb-12 font-['Manrope']">
          {title}
        </h2>

        <div className="relative bg-gradient-to-br from-[#1F2853] to-[#162040] rounded-3xl p-12 text-center overflow-hidden">
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>

          <div className="relative max-w-2xl mx-auto">
            {/* Agency Logo */}
            <div className="w-24 h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-lg overflow-hidden">
              <img
                src={agencyLogo}
                alt={`${agencyName} Logo`}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-3xl font-bold text-white mb-4 font-['Manrope']">
              {agencyName}
            </h3>

            <p className="text-white/90 text-lg mb-8 leading-relaxed font-['Poppins']">
              {agencyDesc}
            </p>

            <Link
              to={agencyHref}
              className="inline-block bg-gradient-to-r from-[#f25a1a] to-[#ff7043] hover:shadow-xl text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap font-['Poppins'] cursor-pointer"
            >
              {ctaText}
            </Link>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#f25a1a]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f25a1a]/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
}
