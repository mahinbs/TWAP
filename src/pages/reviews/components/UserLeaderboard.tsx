import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { appsApi } from '../../../lib/api';
import type { App } from '../../../lib/api';

export default function UserLeaderboard() {
  const [showAll, setShowAll] = useState(false);

  const { data: apps = [] } = useQuery({
    queryKey: ['apps', 'user-leaderboard'],
    queryFn: () => appsApi.list({ sort: 'review_count', limit: 10 }),
  });

  const list = (apps as App[]).slice(0, showAll ? 10 : 3);
  if (list.length === 0) return null;

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;
    const empty = 5 - full - (half ? 1 : 0);
    return (
      <div className="flex items-center gap-1">
        {[...Array(full)].map((_, i) => <i key={`f-${i}`} className="ri-star-fill text-yellow-400 text-sm" />)}
        {half && <i className="ri-star-half-fill text-yellow-400 text-sm" />}
        {[...Array(empty)].map((_, i) => <i key={`e-${i}`} className="ri-star-line text-gray-300 text-sm" />)}
        <span className="text-sm text-gray-600 ml-1 font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const rankColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800';
    if (rank === 3) return 'bg-gradient-to-r from-orange-300 to-orange-400 text-orange-900';
    return 'bg-blue-100 text-blue-600';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-[#ffcee0] rounded-full flex items-center justify-center">
          <i className="ri-user-star-line text-2xl text-[#1F2853]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#1F2853]" style={{ fontFamily: 'Manrope, sans-serif' }}>
            User Favorites
          </h2>
          <p className="text-gray-600 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Voted by users, for users
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {list.map((app, idx) => {
          const rank = idx + 1;
          return (
            <Link
              key={app.id}
              to={`/products/${app.slug}`}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100"
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${rankColor(rank)}`}>
                #{rank}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 truncate" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {app.name}
                  </h3>
                  {app.featured && (
                    <span className="px-2 py-1 bg-[#ffcee0] text-[#1F2853] text-xs font-medium rounded-full whitespace-nowrap">
                      Most Loved
                    </span>
                  )}
                </div>
                {app.tagline && (
                  <p className="text-gray-600 text-sm truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {app.tagline}
                  </p>
                )}
                <div className="flex items-center gap-4 mt-2">
                  {renderStars(app.rating ?? 0)}
                  {app.review_count !== undefined && (
                    <span className="text-xs text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {app.review_count.toLocaleString()} reviews
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                {app.category && (
                  <span className="text-xs text-gray-500 block" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {app.category}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => setShowAll(s => !s)}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors whitespace-nowrap"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {showAll ? 'Show Less' : 'View All User Favorites'}
        </button>
      </div>
    </div>
  );
}
