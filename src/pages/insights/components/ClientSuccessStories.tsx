import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { successStoriesApi, siteContentApi } from '../../../lib/api';

const FALLBACK_TITLE = 'Client Success Stories';
const FALLBACK_DESC = "Discover how we've helped businesses transform their operations, boost growth, and achieve remarkable results through innovative technology solutions.";

interface StoryExtras {
  client_name?: string;
  client_title?: string;
  company?: string;
  industry?: string;
  story?: string;
  results?: string[];
  before?: string;
  after?: string;
  avatar_url?: string;
  company_logo?: string;
  rating?: number;
  project_duration?: string;
}

export default function ClientSuccessStories() {
  const { data: section } = useQuery({
    queryKey: ['page-section', 'insights', 'success_stories'],
    queryFn: () => siteContentApi.section('insights', 'success_stories'),
  });

  const { data: items = [] } = useQuery({
    queryKey: ['success-stories-items', 'client_stories'],
    queryFn: () => successStoriesApi.items('client_stories' as never),
  });

  const c = (section?.content ?? {}) as Record<string, string>;
  const title = section?.title ?? FALLBACK_TITLE;
  const description = section?.description ?? FALLBACK_DESC;
  const ctaText = c.bottom_cta_text ?? section?.cta_text ?? 'Start Your Success Story';
  const ctaUrl  = c.bottom_cta_url ?? section?.cta_url ?? '/promote';
  const cardCtaText = c.card_cta_text ?? 'Read Full Case Study';

  if (items.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-br from-[#f7f5ef] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1F2853] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {items.map((item) => {
            const ex = (item.extras ?? {}) as StoryExtras;
            const clientName = ex.client_name ?? item.title;
            const clientTitle = ex.client_title ?? item.subtitle ?? '';
            const company = ex.company ?? '';
            const industry = ex.industry ?? '';
            const story = ex.story ?? item.description ?? '';
            const results = ex.results ?? [];
            const before = ex.before ?? '';
            const after = ex.after ?? '';
            const avatar = ex.avatar_url ?? item.image_url ?? '';
            const companyLogo = ex.company_logo;
            const rating = ex.rating ?? 5;
            const duration = ex.project_duration ?? '';

            return (
              <div key={item.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#1F2853] to-[#2a3a6b] p-6 text-white">
                  <div className="flex items-center space-x-4 mb-4">
                    {avatar && (
                      <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-white">
                        <img src={avatar} alt={clientName} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {clientName}
                      </h3>
                      <p className="text-[#ffcee0] text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {clientTitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {companyLogo && (
                        <img src={companyLogo} alt={company} className="w-8 h-8 object-contain bg-white rounded p-1" />
                      )}
                      <div>
                        <div className="font-semibold text-sm">{company}</div>
                        <div className="text-xs text-[#ffcee0]">{industry}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex space-x-1 mb-1">
                        {[1,2,3,4,5].map((star) => (
                          <div key={star} className="w-4 h-4 flex items-center justify-center text-yellow-400">
                            <i className={`ri-star-${star <= rating ? 'fill' : 'line'} text-sm`}></i>
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-[#ffcee0]">{duration}</div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Story */}
                  {story && (
                    <div>
                      <h4 className="text-lg font-bold text-[#1F2853] mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Success Story
                      </h4>
                      <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        "{story}"
                      </p>
                    </div>
                  )}

                  {/* Before & After */}
                  {(before || after) && (
                    <div className="space-y-3">
                      <h4 className="text-lg font-bold text-[#1F2853]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Transformation
                      </h4>
                      {before && (
                        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                          <h5 className="font-semibold text-red-800 mb-2 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            Before
                          </h5>
                          <p className="text-red-700 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {before}
                          </p>
                        </div>
                      )}
                      {after && (
                        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                          <h5 className="font-semibold text-green-800 mb-2 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            After
                          </h5>
                          <p className="text-green-700 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {after}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Results */}
                  {results.length > 0 && (
                    <div>
                      <h4 className="text-lg font-bold text-[#1F2853] mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Key Results
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {results.map((result, index) => (
                          <div key={index} className="bg-gradient-to-r from-[#f25a1a]/10 to-[#ff7043]/10 p-3 rounded-lg border border-[#f25a1a]/20">
                            <div className="text-[#f25a1a] font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                              {result}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <button className="w-full bg-gradient-to-r from-[#f25a1a] to-[#ff7043] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 group-hover:scale-105 cursor-pointer whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {cardCtaText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link to={ctaUrl} className="inline-block bg-gradient-to-r from-[#1F2853] to-[#2a3a6b] text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
