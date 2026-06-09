import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import DirectoryHero from './components/DirectoryHero';
import DirectoryFilters from './components/DirectoryFilters';
import DirectoryGrid from './components/DirectoryGrid';
import { appsApi, categoriesApi, siteContentApi } from '../../lib/api';
import type { App } from '../../lib/api';

export default function DirectoryPage() {
  const [searchTerm, setSearchTerm]         = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPricing, setSelectedPricing]   = useState('All');
  const [sortBy, setSortBy]                 = useState('rating');
  const [viewMode, setViewMode]             = useState<'grid' | 'list'>('grid');

  // Fetch all published apps
  const { data: rawApps = [], isLoading } = useQuery({
    queryKey: ['apps', 'directory'],
    queryFn: () => appsApi.list({ sort: 'rating', limit: 100 }),
  });

  // Fetch categories for filter tabs
  const { data: categoryRows = [] } = useQuery({
    queryKey: ['categories', 'apps'],
    queryFn: () => categoriesApi.list('apps'),
  });

  const { data: filtersSection } = useQuery({
    queryKey: ['page-section', 'directory', 'filters'],
    queryFn: () => siteContentApi.section('directory', 'filters'),
  });

  const { data: gridSection } = useQuery({
    queryKey: ['page-section', 'directory', 'grid'],
    queryFn: () => siteContentApi.section('directory', 'grid'),
  });

  const filterContent = filtersSection?.content as Record<string, string> | undefined;

  // Build category list from DB + "All" prefix
  const dbCategories = categoryRows.map((c: any) => c.name);
  // Fallback: extract unique categories from apps if DB has none
  const appCategories = [...new Set(rawApps.map((a: App) => a.category).filter(Boolean))];
  const categories = ['All', ...(dbCategories.length ? dbCategories : appCategories)];
  const pricingOptions = ['All', 'Free', 'Freemium', 'Paid'];

  // Filter + sort client-side (data is already fetched)
  const filteredApps = rawApps
    .filter((app: App) => {
      const matchSearch =
        !searchTerm ||
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (app.description ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (app.tags ?? []).some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchCategory = selectedCategory === 'All' || app.category === selectedCategory;
      const matchPricing  = selectedPricing === 'All' || (app.pricing ?? '').toLowerCase() === selectedPricing.toLowerCase();
      return matchSearch && matchCategory && matchPricing;
    })
    .sort((a: App, b: App) => {
      if (sortBy === 'rating')   return (b.rating ?? 0) - (a.rating ?? 0);
      if (sortBy === 'reviews')  return (b.review_count ?? 0) - (a.review_count ?? 0);
      if (sortBy === 'name')     return a.name.localeCompare(b.name);
      if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      return 0;
    });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="overflow-x-hidden">
        <DirectoryHero />
        <DirectoryFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedPricing={selectedPricing}
          setSelectedPricing={setSelectedPricing}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          categories={categories}
          pricingOptions={pricingOptions}
          totalResults={filteredApps.length}
        />
        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-[#f25a1a] rounded-full animate-spin" />
          </div>
        ) : (
          <DirectoryGrid
            apps={filteredApps}
            viewMode={viewMode}
            viewDetailsText={filterContent?.view_details_text ?? 'View Details'}
            gridTitle={gridSection?.title}
            gridDescription={gridSection?.description}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
