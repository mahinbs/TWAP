import type { App } from '../types';

interface AppCardProps {
  app: App;
  viewMode: 'grid' | 'list';
}

export default function AppCard({ app, viewMode }: AppCardProps) {
  const renderStars = (rating: number) => {
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
        <span className="text-sm text-gray-600 ml-1 font-medium font-poppins">{rating}</span>
      </div>
    );
  };

  const getPricingColor = (pricing: string) => {
    switch (pricing) {
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

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 md:p-6 border border-gray-100 hover:border-gray-200 cursor-pointer">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          {/* App Logo */}
          <div className="flex-shrink-0">
            <img
              src={app.logo}
              alt={`${app.name} logo`}
              className="w-16 h-16 rounded-xl object-cover border border-gray-200"
            />
          </div>

          {/* App Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-manrope">{app.name}</h3>
                {app.featured && (
                  <span className="bg-gradient-to-r from-[#ffcee0] to-[#ff9ec7] text-[#8b1538] px-2 py-1 rounded-full text-xs font-semibold font-poppins">
                    Featured
                  </span>
                )}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold font-poppins w-fit ${getPricingColor(app.pricing)}`}>
                {app.pricing}
              </span>
            </div>

            <p className="text-gray-600 mb-3 line-clamp-2 font-poppins">{app.description}</p>

            <div className="flex flex-col gap-3 sm:gap-2">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {renderStars(app.rating)}
                <span className="text-sm text-gray-500 font-poppins">({app.reviews.toLocaleString()} reviews)</span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="text-sm text-gray-500 font-poppins">{app.category}</span>
                <button className="w-full sm:w-auto bg-[#1F2853] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2a3a6b] transition-colors whitespace-nowrap font-poppins">
                  View Details
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {app.tags.slice(0, 3).map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium font-poppins">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 md:p-6 border border-gray-100 hover:border-gray-200 cursor-pointer group">
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
        <img
          src={app.logo}
          alt={`${app.name} logo`}
          className="w-16 h-16 rounded-xl object-cover border border-gray-200 group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* App Info */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 font-manrope">{app.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-3 font-poppins">{app.description}</p>
      </div>

      {/* Rating and Reviews */}
      <div className="flex items-center justify-center mb-4">
        {renderStars(app.rating)}
      </div>
      <div className="text-center mb-4">
        <span className="text-sm text-gray-500 font-poppins">({app.reviews.toLocaleString()} reviews)</span>
      </div>

      {/* Category and Pricing */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500 font-poppins">{app.category}</span>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold font-poppins ${getPricingColor(app.pricing)}`}>
          {app.pricing}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4 justify-center">
        {app.tags.slice(0, 2).map(tag => (
          <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium font-poppins">
            {tag}
          </span>
        ))}
      </div>

      {/* Action Button */}
      <button className="w-full bg-[#1F2853] text-white py-3 rounded-lg font-medium hover:bg-[#2a3a6b] transition-colors group-hover:scale-105 duration-300 whitespace-nowrap font-poppins">
        View Details
      </button>
    </div>
  );
}