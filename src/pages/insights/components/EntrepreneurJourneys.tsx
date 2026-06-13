import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { successStoriesApi, siteContentApi } from '../../../lib/api';

interface JourneyExtras {
  name?: string;
  title?: string;
  company?: string;
  product_name?: string;
  journey?: string;
  challenge?: string;
  solution?: string;
  avatar_url?: string;
  company_logo?: string;
  product_image?: string;
  rating?: number;
  rating_text?: string;
  metrics_users?: string;
  metrics_revenue?: string;
  metrics_growth?: string;
}

export default function EntrepreneurJourneys() {
  const { data: section } = useQuery({
    queryKey: ['page-section', 'insights', 'entrepreneur_journeys'],
    queryFn: () => siteContentApi.section('insights', 'entrepreneur_journeys'),
  });

  const { data: items = [] } = useQuery({
    queryKey: ['success-stories', 'entrepreneur_journeys'],
    queryFn: () => successStoriesApi.items('entrepreneur_journeys'),
  });

  const entrepreneurs = items.map(i => {
    const ex = (i.extras ?? {}) as JourneyExtras;
    return {
      id: i.id,
      name: ex.name ?? i.title,
      title: ex.title ?? i.subtitle ?? '',
      company: ex.company ?? '',
      productName: ex.product_name ?? '',
      journey: ex.journey ?? i.description ?? '',
      challenge: ex.challenge ?? '',
      solution: ex.solution ?? '',
      avatar: ex.avatar_url ?? i.image_url ?? '',
      companyLogo: ex.company_logo ?? '',
      productImage: ex.product_image ?? '',
      rating: ex.rating ?? 5,
      ratingText: ex.rating_text ?? '4.9/5',
      metrics: {
        users: ex.metrics_users ?? '',
        revenue: ex.metrics_revenue ?? '',
        growth: ex.metrics_growth ?? '',
      },
    };
  });

  if (entrepreneurs.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-br from-white to-[#f7f5ef]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1F2853] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {section?.title ?? 'Entrepreneur Journeys'}
          </h2>
          {section?.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {section.description}
            </p>
          )}
        </div>

        <div className="space-y-16">
          {entrepreneurs.map((e, index) => (
            <div key={e.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4">
                  {e.avatar && (
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#f25a1a]">
                      <img src={e.avatar} alt={e.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#1F2853]" style={{ fontFamily: 'Manrope, sans-serif' }}>{e.name}</h3>
                    <p className="text-[#f25a1a] font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>{e.title}</p>
                    {e.company && (
                      <div className="flex items-center space-x-3 mt-2">
                        {e.companyLogo && <img src={e.companyLogo} alt={e.company} className="w-8 h-8 object-contain" />}
                        <span className="text-gray-600 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>{e.company}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h4 className="text-lg font-bold text-[#1F2853] mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>The Journey</h4>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>"{e.journey}"</p>

                  {(e.challenge || e.solution) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      {e.challenge && (
                        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                          <h5 className="font-semibold text-red-800 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>The Challenge</h5>
                          <p className="text-red-700 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>{e.challenge}</p>
                        </div>
                      )}
                      {e.solution && (
                        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                          <h5 className="font-semibold text-green-800 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>The Solution</h5>
                          <p className="text-green-700 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>{e.solution}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {(e.metrics.users || e.metrics.revenue || e.metrics.growth) && (
                  <div className="grid grid-cols-3 gap-4">
                    {e.metrics.users && (
                      <div className="text-center bg-gradient-to-br from-[#f25a1a] to-[#ff7043] text-white p-4 rounded-lg">
                        <div className="text-2xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>{e.metrics.users}</div>
                        <div className="text-sm opacity-90" style={{ fontFamily: 'Poppins, sans-serif' }}>Active Users</div>
                      </div>
                    )}
                    {e.metrics.revenue && (
                      <div className="text-center bg-gradient-to-br from-[#1F2853] to-[#2a3a6b] text-white p-4 rounded-lg">
                        <div className="text-2xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>{e.metrics.revenue}</div>
                        <div className="text-sm opacity-90" style={{ fontFamily: 'Poppins, sans-serif' }}>Annual Revenue</div>
                      </div>
                    )}
                    {e.metrics.growth && (
                      <div className="text-center bg-gradient-to-br from-[#ffcee0] to-[#ff9ec7] text-[#1F2853] p-4 rounded-lg">
                        <div className="text-2xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>{e.metrics.growth}</div>
                        <div className="text-sm opacity-90" style={{ fontFamily: 'Poppins, sans-serif' }}>Growth Rate</div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Product Preview Side */}
              {(e.productName || e.productImage) && (
                <div className="flex-1">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-[#1F2853] to-[#2a3a6b] p-6 text-white">
                      <h4 className="text-xl font-bold mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {e.productName}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {[1,2,3,4,5].map((star) => (
                            <div key={star} className="w-4 h-4 flex items-center justify-center text-yellow-400">
                              <i className={`ri-star-${star <= e.rating ? 'fill' : 'line'} text-sm`}></i>
                            </div>
                          ))}
                        </div>
                        <span className="text-sm opacity-90">{e.ratingText}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      {e.productImage && (
                        <img
                          src={e.productImage}
                          alt={e.productName}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      )}
                      <button className="w-full bg-[#f25a1a] hover:bg-[#d14815] text-white py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        View Full Case Study
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to={section?.cta_url ?? '/promote'}
            className="inline-block bg-gradient-to-r from-[#f25a1a] to-[#ff7043] text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {section?.cta_text ?? 'Share Your Journey'}
          </Link>
        </div>
      </div>
    </section>
  );
}
