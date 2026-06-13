import { Link } from 'react-router-dom';
import type { App } from '../../../lib/api';

interface AppCardProps {
  app: App;
  viewMode: 'grid' | 'list';
  viewDetailsText?: string;
}

function formatPricing(pricing?: string) {
  if (!pricing) return 'Free';
  return pricing.charAt(0).toUpperCase() + pricing.slice(1);
}

export default function AppCard({ app, viewMode, viewDetailsText = 'View Details' }: AppCardProps) {
  const rating = app.rating ?? 0;
  const reviewCount = app.review_count ?? 0;
  const logo = app.logo_url;
  const description = app.tagline ?? app.description ?? '';
  const pricing = formatPricing(app.pricing);
  const tags = app.tags ?? [];

  const renderStars = (value: number) => {
    const fullStars = Math.floor(value);
    const hasHalfStar = value % 1 !== 0;
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
        <span className="text-sm text-gray-600 ml-1 font-medium font-poppins">{value.toFixed(1)}</span>
      </div>
    );
  };

  const getPricingColor = (label: string) => {
    switch (label) {
      case 'Free':
        return 'bg-green-100 text-green-800';
      case 'Freemium':
        return 'bg-blue-100 text-blue-800';
      case 'Paid':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const reviewsLabel = reviewCount > 0
    ? `(${reviewCount.toLocaleString()} reviews)`
    : '(No reviews yet)';

  if (viewMode === 'list') {
    return (
      <Link to={`/products/${app.slug}`} className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200 cursor-pointer">
        <div className="flex items-start gap-6">
          {/* App Logo */}
          <div className="flex-shrink-0">
            {logo ? (
              <img src={logo} alt={`${app.name} logo`} className="w-16 h-16 rounded-xl object-cover border border-gray-200" />
            ) : (
              <div className="w-16 h-16 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center font-bold text-[#1F2853]">
                {app.name[0]}
              </div>
            )}
          </div>

          {/* App Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-gray-900 font-manrope">{app.name}</h3>
                {app.featured && (
                  <span className="bg-gradient-to-r from-[#ffcee0] to-[#ff9ec7] text-[#8b1538] px-2 py-1 rounded-full text-xs font-semibold font-poppins">
                    Featured
                  </span>
                )}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold font-poppins ${getPricingColor(pricing)}`}>
                {pricing}
              </span>
            </div>

            {description && <p className="text-gray-600 mb-3 line-clamp-2 font-poppins">{description}</p>}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {renderStars(rating)}
                <span className="text-sm text-gray-500 font-poppins">{reviewsLabel}</span>
              </div>

              <div className="flex items-center gap-2">
                {app.category && <span className="text-sm text-gray-500 font-poppins">{app.category}</span>}
                <span className="bg-[#1F2853] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2a3a6b] transition-colors whitespace-nowrap font-poppins">
                  {viewDetailsText}
                </span>
              </div>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.slice(0, 3).map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium font-poppins">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/products/${app.slug}`} className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200 cursor-pointer group">
      {/* Featured Badge */}
      {app.featured && (
        <div className="mb-4">
          <span className="bg-gradient-to-r from-[#ffcee0] to-[#ff9ec7] text-[#8b1538] px-3 py-1 rounded-full text-xs font-semibold font-poppins">
            Featured
          </span>
        </div>
      )}

      {/* App Logo */}
      <div className="flex items-center justify-center mb-4">
        {logo ? (
          <img src={logo} alt={`${app.name} logo`} className="w-16 h-16 rounded-xl object-cover border border-gray-200 group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-16 h-16 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center font-bold text-xl text-[#1F2853]">
            {app.name[0]}
          </div>
        )}
      </div>

      {/* App Info */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 font-manrope">{app.name}</h3>
        {description && <p className="text-gray-600 text-sm line-clamp-3 font-poppins">{description}</p>}
      </div>

      {/* Rating and Reviews */}
      <div className="flex items-center justify-center mb-4">
        {renderStars(rating)}
      </div>
      <div className="text-center mb-4">
        <span className="text-sm text-gray-500 font-poppins">{reviewsLabel}</span>
      </div>

      {/* Category and Pricing */}
      <div className="flex items-center justify-between mb-4">
        {app.category ? <span className="text-sm text-gray-500 font-poppins">{app.category}</span> : <span />}
        <span className={`px-2 py-1 rounded-full text-xs font-semibold font-poppins ${getPricingColor(pricing)}`}>
          {pricing}
        </span>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4 justify-center">
          {tags.slice(0, 2).map(tag => (
            <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium font-poppins">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Action Button */}
      <span className="block w-full text-center bg-[#1F2853] text-white py-3 rounded-lg font-medium hover:bg-[#2a3a6b] transition-colors group-hover:scale-105 duration-300 whitespace-nowrap font-poppins">
        {viewDetailsText}
      </span>
    </Link>
  );
}
