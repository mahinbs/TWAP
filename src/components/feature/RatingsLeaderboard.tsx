import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import { appsApi, categoriesApi, siteContentApi } from '../../lib/api';
import type { App } from '../../lib/api';

export default function RatingsLeaderboard() {
  const [activeTab, setActiveTab] = useState('All');

  const { data: section } = useQuery({
    queryKey: ['page-section', 'home', 'stats'],
    queryFn: () => siteContentApi.section('home', 'stats'),
  });
  const c = section?.content as Record<string, string> | undefined;

  const { data: categories = [] } = useQuery({
    queryKey: ['categories', 'apps'],
    queryFn: () => categoriesApi.list('apps'),
  });

  const { data: apps = [], isLoading } = useQuery({
    queryKey: ['apps', 'leaderboard', activeTab],
    queryFn: () => activeTab === 'All'
      ? appsApi.list({ sort: 'rating', limit: 6 })
      : appsApi.list({ category: activeTab, sort: 'rating', limit: 6 }),
  });

  const tabs = ['All', ...(categories as any[]).map((c: any) => c.name).slice(0, 5)];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left — leaderboard */}
          <div className="lg:col-span-7">
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1F2853] font-['Manrope']">
                  {section?.title ?? 'The Web App Pro Ratings Leaderboard'}
                </h2>
                <p className="text-gray-400 text-sm mt-1">{section?.subtitle ?? 'Top-rated tools, updated in real time'}</p>
              </div>
            </div>

            {/* Category tabs */}
            <div className="flex gap-2 flex-wrap mb-6">
              {tabs.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    activeTab === tab
                      ? 'bg-[#1F2853] text-white border-[#1F2853]'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                  }`}>
                  {tab}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="space-y-3">
              {isLoading
                ? [...Array(5)].map((_, i) => <div key={i} className="h-16 bg-gray-100 rounded-2xl animate-pulse" />)
                : (apps as App[]).map((app, i) => (
                  <Link key={app.id} to={`/products/${app.slug}`}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-[#1F2853]/20 hover:bg-[#1F2853]/[0.02] transition-all group">
                    <span className="text-xl font-black text-gray-200 w-7 text-center shrink-0">{i + 1}</span>
                    <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center shrink-0">
                      {app.logo_url
                        ? <img src={app.logo_url} alt={app.name} className="w-full h-full object-cover" />
                        : <span className="font-bold text-[#1F2853]">{app.name[0]}</span>
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#1F2853] text-sm group-hover:text-[#f25a1a] transition-colors truncate">{app.name}</p>
                      {app.tagline && <p className="text-xs text-gray-400 truncate">{app.tagline}</p>}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-bold text-gray-700">{app.rating?.toFixed(1)}</span>
                    </div>
                    <span className="text-xs text-gray-400 hidden sm:block shrink-0 max-w-[100px] truncate">{app.category}</span>
                  </Link>
                ))
              }
              {!isLoading && apps.length === 0 && (
                <p className="text-center text-gray-400 py-10 text-sm">No apps yet — add some from the CMS.</p>
              )}
            </div>

            <div className="mt-6">
              <Link to={section?.cta_url ?? '/directory'}
                className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:border-[#1F2853] hover:text-[#1F2853] transition-colors">
                {section?.cta_text ?? 'View All App Ratings'} <i className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>

          {/* Right — promote CTA */}
          <div className="lg:col-span-5">
            <div className="bg-[#1F2853] rounded-3xl p-8 text-white h-full flex flex-col justify-between min-h-[360px]">
              <div>
                <h3 className="text-xl font-bold mb-2">{c?.sidebar_title ?? 'Promote Your App with Us'}</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {c?.sidebar_body ?? 'Get featured on the homepage, in our newsletter, and at the top of your category.'}
                </p>
              </div>
              <div>
                {section?.media_url && (
                  <div className="rounded-2xl overflow-hidden mb-6 aspect-video bg-white/5">
                    <img
                      src={section.media_url}
                      alt={c?.sidebar_title ?? 'Promote'}
                      className="w-full h-full object-cover opacity-60"
                    />
                  </div>
                )}
                <Link to={c?.sidebar_cta_url ?? '/promote'}
                  className="block w-full bg-[#c6f135] text-[#1F2853] text-center py-3.5 rounded-xl font-bold hover:bg-[#d4f545] transition-colors">
                  {c?.sidebar_cta_text ?? 'Promote My App'}
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
