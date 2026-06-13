import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { appsApi, siteContentApi } from '../../lib/api';
import type { App } from '../../lib/api';

const FALLBACK_PROMOTE_IMG = 'https://static.readdy.ai/image/19a52a0e7cd11d182286c46a940c9855/3a498c2854159ba8aef56ee2066bbcd2.jpeg';

function renderStars(rating: number) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <i key={`full-${i}`} className="ri-star-fill text-yellow-400 text-sm"></i>
      ))}
      {hasHalfStar && <i className="ri-star-half-fill text-yellow-400 text-sm"></i>}
      {[...Array(emptyStars)].map((_, i) => (
        <i key={`empty-${i}`} className="ri-star-line text-gray-300 text-sm"></i>
      ))}
      <span className="text-sm text-gray-600 ml-1 font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function RatingsLeaderboard() {
  const [showAll, setShowAll] = useState(false);

  const { data: section } = useQuery({
    queryKey: ['page-section', 'home', 'stats'],
    queryFn: () => siteContentApi.section('home', 'stats'),
  });

  const { data: apps = [] } = useQuery({
    queryKey: ['apps', 'leaderboard'],
    queryFn: () => appsApi.list({ sort: 'rating', limit: 10 }),
  });

  const c = (section?.content ?? {}) as Record<string, string>;
  const title = section?.title ?? 'The Web App Pro Ratings Leaderboard';
  const sidebarTitle = c.sidebar_title ?? 'Promote Your App with Us';
  const sidebarBody = c.sidebar_body ?? 'Get featured on the homepage, in our newsletter, and at the top of your category.';
  const sidebarCtaText = c.sidebar_cta_text ?? 'Promote My App';
  const sidebarCtaUrl = c.sidebar_cta_url ?? '/promote';
  const seePricingText = c.see_pricing_text ?? 'See Pricing';
  const seePricingUrl = c.see_pricing_url ?? '/promote';
  const sidebarImage = section?.media_url ?? FALLBACK_PROMOTE_IMG;
  const viewAllLabel = c.view_all_label ?? 'View All App Ratings';
  const showLessLabel = c.show_less_label ?? 'Show Less';

  const ratings = (apps as App[]).map((app, i) => ({
    id: app.id,
    rank: i + 1,
    name: app.name,
    slug: app.slug,
    description: app.tagline ?? '',
    rating: app.rating ?? 0,
    category: app.category ?? '',
  }));

  const displayedRatings = showAll ? ratings : ratings.slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Leaderboard */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 font-manrope">
                {title}
              </h2>

              <div className="space-y-6">
                {displayedRatings.map((app) => (
                  <Link
                    key={app.id}
                    to={`/products/${app.slug}`}
                    className="flex items-center gap-6 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full font-bold text-lg font-poppins">
                      #{app.rank}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 font-manrope">{app.name}</h3>
                      <p className="text-gray-600 text-sm font-poppins">{app.description}</p>
                    </div>

                    <div className="text-right">
                      {renderStars(app.rating)}
                      <span className="text-xs text-gray-500 mt-1 block font-poppins">{app.category}</span>
                    </div>
                  </Link>
                ))}
              </div>

              {ratings.length > 3 && (
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors whitespace-nowrap font-poppins"
                  >
                    {showAll ? showLessLabel : viewAllLabel}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Promote Your App */}
          <div className="lg:col-span-1">
            <div
              className="rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300 h-full flex flex-col"
              style={{
                background: 'linear-gradient(135deg, rgba(31, 40, 83, 0.95) 0%, rgba(31, 40, 83, 0.85) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-4 font-manrope">
                {sidebarTitle}
              </h3>
              <p className="text-white/80 mb-6 font-poppins">
                {sidebarBody}
              </p>

              {/* 16:9 Image Placeholder */}
              <div className="mb-6 flex-1 min-h-[200px]">
                <img
                  src={sidebarImage}
                  alt="Promote your app"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="mt-auto">
                <Link
                  to={sidebarCtaUrl}
                  className="block text-center w-full text-[#1F2853] py-4 px-6 rounded-lg font-semibold transition-all duration-300 mb-4 whitespace-nowrap font-poppins hover:scale-105 hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #b9ed2a 0%, #a5d426 50%, #91bb22 100%)',
                    boxShadow: '0 4px 15px rgba(185, 237, 42, 0.3)'
                  }}
                >
                  {sidebarCtaText}
                </Link>

                <Link
                  to={seePricingUrl}
                  className="block text-center w-full text-[#b9ed2a] hover:text-white py-2 font-medium transition-colors whitespace-nowrap font-poppins"
                >
                  {seePricingText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
