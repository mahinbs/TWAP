import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { categoriesApi, siteContentApi } from '../../lib/api';

export default function CategoryTabs() {
  const { data: section } = useQuery({
    queryKey: ['page-section', 'home', 'categories'],
    queryFn: () => siteContentApi.section('home', 'categories'),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories', 'apps-tabs'],
    queryFn: () => categoriesApi.list('apps'),
  });

  const [activeCategory, setActiveCategory] = useState<string>('');

  useEffect(() => {
    if (!activeCategory && categories.length > 0) {
      const first = (categories as Array<{ slug: string }>)[0];
      setActiveCategory(first.slug);
    }
  }, [categories, activeCategory]);

  if (categories.length === 0) return null;
  const cats = categories as Array<{ slug: string; name: string }>;

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2853] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            {section?.title ?? 'Browse by Category'}
          </h2>
          {section?.description && (
            <p className="text-[#1F2853]/70 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              {section.description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {cats.slice(0, 8).map(c => (
            <button
              key={c.slug}
              onClick={() => setActiveCategory(c.slug)}
              className={`px-6 py-3 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === c.slug
                  ? 'bg-[#f25a1a] text-white shadow-md'
                  : 'bg-[#f7f5ef] text-[#1F2853] hover:bg-[#f25a1a] hover:text-white'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="text-center py-8">
          <p className="text-[#1F2853]/60 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
            Showing {cats.find(c => c.slug === activeCategory)?.name} apps
          </p>
        </div>
      </div>
    </section>
  );
}
