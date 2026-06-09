import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { appsApi, siteContentApi } from '../../../lib/api';
import type { App } from '../../../lib/api';

export default function EditorsPickSection() {
  const { data: apps = [] } = useQuery({
    queryKey: ['apps', 'editors-pick'],
    queryFn: () => appsApi.list({ sort: 'rating', limit: 50 }),
  });

  const { data: section } = useQuery({
    queryKey: ['page-section', 'reviews', 'editors_pick'],
    queryFn: () => siteContentApi.section('reviews', 'editors_pick'),
  });

  const picks = (apps as App[]).filter(a => a.editors_choice).slice(0, 3);
  if (picks.length === 0) return null;

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;
    const empty = 5 - full - (half ? 1 : 0);
    return (
      <div className="flex items-center gap-1">
        {[...Array(full)].map((_, i) => <i key={`f-${i}`} className="ri-star-fill text-yellow-400 text-lg" />)}
        {half && <i className="ri-star-half-fill text-yellow-400 text-lg" />}
        {[...Array(empty)].map((_, i) => <i key={`e-${i}`} className="ri-star-line text-gray-300 text-lg" />)}
        <span className="text-lg text-gray-700 ml-2 font-semibold">{rating}</span>
      </div>
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1F2853] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {section?.title ?? "Editor's Pick Reviews"}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {section?.description ?? 'In-depth reviews of the most innovative and impactful apps, handpicked by our expert editorial team'}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {picks.map((app) => (
            <div key={app.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative">
                {app.logo_url ? (
                  <img src={app.logo_url} alt={app.name} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-[#1F2853] to-[#f25a1a]" />
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#1F2853] text-white text-sm font-medium rounded-full">
                    Editor's Choice
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1F2853] mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {app.name}
                    </h3>
                    {app.category && (
                      <p className="text-gray-600 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>{app.category}</p>
                    )}
                  </div>
                  <div className="text-right">{renderStars(app.rating ?? 0)}</div>
                </div>

                {app.tagline && (
                  <p className="text-gray-700 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>{app.tagline}</p>
                )}

                {app.why_you_love_it && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-gray-700 text-sm italic" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      "{app.why_you_love_it}"
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-green-600 mb-2 flex items-center gap-1">
                      <i className="ri-check-line" /> Pros
                    </h4>
                    <ul className="space-y-1">
                      {(app.pros ?? []).slice(0, 2).map((pro, i) => (
                        <li key={i} className="text-xs text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-red-500 mb-2 flex items-center gap-1">
                      <i className="ri-close-line" /> Cons
                    </h4>
                    <ul className="space-y-1">
                      {(app.cons ?? []).slice(0, 2).map((con, i) => (
                        <li key={i} className="text-xs text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  to={`/products/${app.slug}`}
                  className="block text-center w-full py-3 px-4 bg-[#1F2853] hover:bg-[#2a3a6b] text-white rounded-lg font-medium transition-colors whitespace-nowrap"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Read Full Review
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/directory"
            className="inline-block px-8 py-4 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap hover:scale-105 hover:shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #b9ed2a 0%, #a5d426 50%, #91bb22 100%)',
              color: '#1F2853',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            View All Editor Reviews
          </Link>
        </div>
      </div>
    </section>
  );
}
