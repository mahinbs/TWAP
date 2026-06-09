import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import { appsApi, categoriesApi, siteContentApi } from '../../lib/api';
import type { App } from '../../lib/api';

function AppCard({ app }: { app: App }) {
  return (
    <Link to={`/products/${app.slug}`}
      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-3 group">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gray-50 overflow-hidden border border-gray-100 flex items-center justify-center shrink-0">
          {app.logo_url
            ? <img src={app.logo_url} alt={app.name} className="w-full h-full object-cover" />
            : <span className="text-lg font-bold text-[#1F2853]">{app.name[0]}</span>
          }
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-[#1F2853] text-sm truncate group-hover:text-[#f25a1a] transition-colors">{app.name}</h3>
          {app.category && <p className="text-xs text-gray-400 truncate">{app.category}</p>}
        </div>
        {app.editors_choice && (
          <span className="ml-auto text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-bold shrink-0">Editor's Pick</span>
        )}
      </div>
      {app.tagline && <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{app.tagline}</p>}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-semibold text-gray-700">{app.rating?.toFixed(1) ?? '—'}</span>
          {app.review_count ? <span className="text-xs text-gray-400">({app.review_count.toLocaleString()})</span> : null}
        </div>
        {app.pricing && (
          <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium capitalize">{app.pricing}</span>
        )}
      </div>
    </Link>
  );
}

export default function FeaturedApps() {
  const [activeCategory, setActiveCategory] = useState('All');

  const { data: section } = useQuery({
    queryKey: ['page-section', 'home', 'featured'],
    queryFn: () => siteContentApi.section('home', 'featured'),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories', 'apps'],
    queryFn: () => categoriesApi.list('apps'),
  });

  const { data: apps = [], isLoading } = useQuery({
    queryKey: ['apps', 'featured-section', activeCategory],
    queryFn: () => activeCategory === 'All'
      ? appsApi.list({ sort: 'rating', limit: 12 })
      : appsApi.list({ category: activeCategory, sort: 'rating', limit: 12 }),
  });

  const tabCategories = ['All', ...(categories as any[]).map((c: any) => c.name).slice(0, 6)];

  return (
    <section className="py-20 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2853] font-['Manrope']">
              {section?.title ?? 'Featured Apps & Tools'}
            </h2>
            {section?.subtitle && <p className="text-gray-500 mt-2">{section.subtitle}</p>}
          </div>
          <Link to={section?.cta_url ?? '/directory'} className="text-sm font-semibold text-[#f25a1a] hover:underline shrink-0">
            {section?.cta_text ?? 'See All Apps →'}
          </Link>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {tabCategories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                activeCategory === cat
                  ? 'bg-[#1F2853] text-white border-[#1F2853]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => <div key={i} className="h-36 bg-gray-100 rounded-2xl animate-pulse" />)}
          </div>
        ) : apps.length === 0 ? (
          <p className="text-center text-gray-400 py-16">No apps in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(apps as App[]).map(app => <AppCard key={app.id} app={app} />)}
          </div>
        )}
      </div>
    </section>
  );
}
