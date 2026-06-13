import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { appsApi, siteContentApi } from '../../lib/api';
import type { App } from '../../lib/api';

const FALLBACK_TITLE = 'Most Loved Apps This Week';
const FALLBACK_DESC  = 'Voted by users, for users';
const BADGES = ['🔥 Trending', '⚡ Rising Fast', '🚀 Hot', '⭐ Editor Pick'];

function formatVotes(votes: number) {
  if (votes >= 1000) return `${(votes / 1000).toFixed(1)}k`;
  return votes.toString();
}

export default function MostLovedApps() {
  const [showAll, setShowAll] = useState(false);

  const { data: section } = useQuery({
    queryKey: ['page-section', 'home', 'most_loved'],
    queryFn: () => siteContentApi.section('home', 'most_loved'),
  });

  const { data: apps = [] } = useQuery({
    queryKey: ['apps', 'most-loved'],
    queryFn: () => appsApi.list({ sort: 'review_count', limit: 8 }),
  });

  const c = (section?.content ?? {}) as Record<string, string>;
  const title = section?.title ?? FALLBACK_TITLE;
  const description = section?.description ?? FALLBACK_DESC;
  const showLessLabel = c.show_less_label ?? 'Show Less';
  const viewAllLabel = c.view_all_label ?? 'View All Loved Apps';

  const stat1Value = c.stat1_value ?? '50K+';
  const stat1Label = c.stat1_label ?? 'Total Votes This Week';
  const stat2Value = c.stat2_value ?? String(apps.length || '127');
  const stat2Label = c.stat2_label ?? 'Apps Competing';
  const stat3Value = c.stat3_value ?? '24H';
  const stat3Label = c.stat3_label ?? 'Voting Updates';

  const lovedApps = (apps as App[]).map((app, i) => ({
    id: app.id,
    rank: i + 1,
    name: app.name,
    slug: app.slug,
    description: app.tagline ?? '',
    votes: app.review_count ?? 0,
    category: app.category ?? '',
    weeklyGrowth: Math.max(5, Math.round((app.rating ?? 4) * 5)),
    badge: i < BADGES.length ? BADGES[i] : undefined,
  }));

  const displayedApps = showAll ? lovedApps : lovedApps.slice(0, 4);

  return (
    <section className="py-16" style={{ backgroundColor: '#f7f5ef' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#1F2853', fontFamily: 'Manrope, sans-serif' }}>
            {title}
          </h2>
          <p className="text-xl text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {description}
          </p>
        </div>

        {/* Leaderboard */}
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-2xl p-8 border border-white/20 backdrop-blur-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(31, 40, 83, 0.95) 0%, rgba(31, 40, 83, 0.85) 100%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
          >
            <div className="space-y-6">
              {displayedApps.map((app, index) => (
                <Link
                  key={app.id}
                  to={`/products/${app.slug}`}
                  className="flex items-center gap-6 p-6 rounded-xl transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  {/* Rank */}
                  <div className="flex items-center justify-center w-16 h-16 rounded-full font-bold text-xl relative"
                       style={{
                         background: index < 3
                           ? 'linear-gradient(135deg, #ffcee0 0%, #ffb3d6 100%)'
                           : 'rgba(255, 255, 255, 0.2)',
                         color: index < 3 ? '#1F2853' : '#ffffff'
                       }}>
                    #{app.rank}
                    {index < 3 && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                           style={{ background: '#ffcee0' }}>
                        {index === 0 ? '👑' : index === 1 ? '🥈' : '🥉'}
                      </div>
                    )}
                  </div>

                  {/* App Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-xl text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {app.name}
                      </h3>
                      {app.badge && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium text-white"
                              style={{ background: '#ffcee0', color: '#1F2853' }}>
                          {app.badge}
                        </span>
                      )}
                    </div>
                    {app.description && (
                      <p className="text-white/80 text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {app.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-white/60">
                      <span style={{ fontFamily: 'Poppins, sans-serif' }}>{app.category}</span>
                      <span className="flex items-center gap-1">
                        <i className="ri-arrow-up-line text-green-400"></i>
                        +{app.weeklyGrowth}% this week
                      </span>
                    </div>
                  </div>

                  {/* Votes */}
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <i className="ri-heart-fill text-red-400 text-lg"></i>
                      <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {formatVotes(app.votes)}
                      </span>
                    </div>
                    <p className="text-white/60 text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      votes
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Show More Button */}
            {lovedApps.length > 4 && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="px-8 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #ffcee0 0%, #ffb3d6 100%)',
                    color: '#1F2853',
                    fontFamily: 'Poppins, sans-serif',
                    boxShadow: '0 4px 15px rgba(255, 206, 224, 0.3)'
                  }}
                >
                  {showAll ? showLessLabel : viewAllLabel}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-xl"
               style={{
                 background: 'rgba(255, 255, 255, 0.8)',
                 backdropFilter: 'blur(10px)',
                 border: '1px solid rgba(255, 255, 255, 0.3)'
               }}>
            <div className="text-3xl font-bold mb-2" style={{ color: '#1F2853', fontFamily: 'Manrope, sans-serif' }}>
              {stat1Value}
            </div>
            <p className="text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {stat1Label}
            </p>
          </div>

          <div className="text-center p-6 rounded-xl"
               style={{
                 background: 'rgba(255, 255, 255, 0.8)',
                 backdropFilter: 'blur(10px)',
                 border: '1px solid rgba(255, 255, 255, 0.3)'
               }}>
            <div className="text-3xl font-bold mb-2" style={{ color: '#ffcee0', fontFamily: 'Manrope, sans-serif' }}>
              {stat2Value}
            </div>
            <p className="text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {stat2Label}
            </p>
          </div>

          <div className="text-center p-6 rounded-xl"
               style={{
                 background: 'rgba(255, 255, 255, 0.8)',
                 backdropFilter: 'blur(10px)',
                 border: '1px solid rgba(255, 255, 255, 0.3)'
               }}>
            <div className="text-3xl font-bold mb-2" style={{ color: '#1F2853', fontFamily: 'Manrope, sans-serif' }}>
              {stat3Value}
            </div>
            <p className="text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {stat3Label}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
