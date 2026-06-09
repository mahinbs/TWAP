import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi } from '../../../lib/api';

export default function InsightsStats() {
  const { data: section } = useQuery({
    queryKey: ['page-section', 'insights', 'stats'],
    queryFn: () => siteContentApi.section('insights', 'stats'),
  });

  const { data: cta } = useQuery({
    queryKey: ['page-section', 'insights', 'cta'],
    queryFn: () => siteContentApi.section('insights', 'cta'),
  });

  const { data: stats = [] } = useQuery({
    queryKey: ['stats', 'insights'],
    queryFn: () => siteContentApi.stats('insights'),
  });

  if (!section && stats.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-br from-[#f7f5ef] to-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {section && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2853] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              {section.title}
            </h2>
            {section.description && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {section.description}
              </p>
            )}
          </div>
        )}

        {stats.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.slice(0, 4).map((stat) => (
              <div key={stat.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center group border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#f25a1a] to-[#ff7043] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <i className={`${stat.icon ?? 'ri-star-line'} text-2xl text-white`} />
                </div>
                <div className="text-4xl font-bold text-[#1F2853] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {stat.value}
                </div>
                <h3 className="text-xl font-semibold text-[#1F2853] mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {stat.label}
                </h3>
              </div>
            ))}
          </div>
        )}

        {cta && (
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-[#1F2853] to-[#2a3a6b] rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {cta.title}
              </h3>
              {cta.description && (
                <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {cta.description}
                </p>
              )}
              {(cta.cta_text || cta.cta_text_2) && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {cta.cta_text && (
                    <Link to={cta.cta_url ?? '#'} className="bg-[#f25a1a] hover:bg-[#d14815] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {cta.cta_text}
                    </Link>
                  )}
                  {cta.cta_text_2 && (
                    <Link to={cta.cta_url_2 ?? '#'} className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {cta.cta_text_2}
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
