import type { App } from '../../../lib/api';
import AppCard from './AppCard';

interface DirectoryGridProps {
  apps: App[];
  viewMode: 'grid' | 'list';
  viewDetailsText?: string;
  gridTitle?: string;
  gridDescription?: string;
}

export default function DirectoryGrid({ apps, viewMode, viewDetailsText, gridTitle, gridDescription }: DirectoryGridProps) {
  if (apps.length === 0) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <i className="ri-search-line text-3xl text-gray-400"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-manrope">
              No apps found
            </h3>
            <p className="text-gray-600 font-poppins">
              Try adjusting your search criteria or browse all categories to discover amazing apps.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(gridTitle || gridDescription) && (
          <div className="mb-8 text-center sm:text-left">
            {gridTitle && <h2 className="text-2xl font-bold text-[#1F2853] font-manrope">{gridTitle}</h2>}
            {gridDescription && <p className="text-gray-500 mt-1 font-poppins">{gridDescription}</p>}
          </div>
        )}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {apps.map(app => (
              <AppCard key={app.id} app={app} viewMode="grid" viewDetailsText={viewDetailsText} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {apps.map(app => (
              <AppCard key={app.id} app={app} viewMode="list" viewDetailsText={viewDetailsText} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}