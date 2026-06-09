import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Flame, TrendingUp, Star } from 'lucide-react';
import { appsApi, siteContentApi } from '../../lib/api';
import type { App } from '../../lib/api';

const badges = ['🔥 Trending', '⚡ Rising Fast', '⭐ Top Rated', '🚀 New'];

export default function MostLovedApps() {
  const { data: section } = useQuery({
    queryKey: ['page-section', 'home', 'most_loved'],
    queryFn: () => siteContentApi.section('home', 'most_loved'),
  });

  const { data: apps = [], isLoading } = useQuery({
    queryKey: ['apps', 'most-loved'],
    queryFn: () => appsApi.list({ sort: 'review_count', limit: 8 }),
  });

  if (isLoading) return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-gray-100 rounded-2xl animate-pulse" />)}
        </div>
      </div>
    </section>
  );

  if (apps.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-[#f25a1a]" />
              <span className="text-sm font-semibold text-[#f25a1a] uppercase tracking-wider">
                {section?.subtitle ?? 'Most Loved'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2853] font-['Manrope']">
              {section?.title ?? "Apps People Can't Stop Using"}
            </h2>
          </div>
          <Link to={section?.cta_url ?? '/directory?sort=reviews'} className="text-sm font-semibold text-[#f25a1a] hover:underline shrink-0">
            {section?.cta_text ?? 'See All →'}
          </Link>
        </div>

        <div className="space-y-3">
          {(apps as App[]).map((app, index) => (
            <Link key={app.id} to={`/products/${app.slug}`}
              className="flex items-center gap-4 bg-gray-50 hover:bg-orange-50 border border-gray-100 hover:border-orange-100 rounded-2xl px-5 py-4 transition-all duration-200 group">

              {/* Rank */}
              <div className="text-2xl font-black text-gray-200 w-8 shrink-0 text-center">{index + 1}</div>

              {/* Logo */}
              <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 overflow-hidden flex items-center justify-center shrink-0">
                {app.logo_url
                  ? <img src={app.logo_url} alt={app.name} className="w-full h-full object-cover" />
                  : <span className="text-lg font-bold text-[#1F2853]">{app.name[0]}</span>
                }
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-[#1F2853] group-hover:text-[#f25a1a] transition-colors truncate">{app.name}</h3>
                  {index < 4 && (
                    <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold shrink-0 hidden sm:inline">
                      {badges[index]}
                    </span>
                  )}
                </div>
                {app.category && <p className="text-xs text-gray-400">{app.category}</p>}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 shrink-0 text-right">
                <div className="hidden sm:flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-500">{app.review_count?.toLocaleString() ?? 0} reviews</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold text-gray-700">{app.rating?.toFixed(1) ?? '—'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
