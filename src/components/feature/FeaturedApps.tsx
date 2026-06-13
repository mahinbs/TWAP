import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { appsApi, categoriesApi, siteContentApi } from '../../lib/api';

const FALLBACK_CATEGORIES = [
  { id: 'marketing', name: 'Marketing' },
  { id: 'productivity', name: 'Productivity' },
  { id: 'finance', name: 'Finance' },
  { id: 'design', name: 'Design' },
];

export default function FeaturedApps() {
  const [activeCategory, setActiveCategory] = useState('marketing');
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 3;

  const { data: section } = useQuery({
    queryKey: ['page-section', 'home', 'featured'],
    queryFn: () => siteContentApi.section('home', 'featured'),
  });

  const { data: categoryRows = [] } = useQuery({
    queryKey: ['categories', 'apps'],
    queryFn: () => categoriesApi.list('apps'),
  });

  const { data: currentApps = [] } = useQuery({
    queryKey: ['apps', 'featured', activeCategory],
    queryFn: () => appsApi.byCategory(activeCategory, 24),
  });

  const categories = categoryRows.length > 0
    ? categoryRows.slice(0, 6).map((c: { id: string; name: string }) => ({ id: c.name.toLowerCase(), name: c.name }))
    : FALLBACK_CATEGORIES;

  const sectionTitle = section?.title ?? 'Top App Reviews – Handpicked for You';
  const sectionDesc  = section?.description ?? 'Discover the most popular and highly-rated AI applications';
  const viewAllLabel = section?.cta_text ?? 'View All Apps';
  const viewAllUrl   = section?.cta_url ?? '/directory';

  const totalSlides = Math.max(1, Math.ceil(currentApps.length / cardsPerView));

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  const goToSlide = (index: number) => setCurrentIndex(index);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentIndex(0);
  };

  return (
    <div className="bg-[#f7f5ef] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2853] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            {sectionTitle}
          </h2>
          <p className="text-lg text-gray-600">
            {sectionDesc}
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-[#f25a1a] text-white shadow-md'
                  : 'bg-[#f7f5ef] text-[#1F2853] hover:bg-[#f25a1a] hover:text-white'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-[#1F2853]/80 backdrop-blur-sm text-white p-3 rounded-full hover:bg-[#1F2853] transition-all cursor-pointer"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-arrow-left-line text-xl"></i>
            </div>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-[#1F2853]/80 backdrop-blur-sm text-white p-3 rounded-full hover:bg-[#1F2853] transition-all cursor-pointer"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-arrow-right-line text-xl"></i>
            </div>
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {currentApps
                      .slice(slideIndex * cardsPerView, (slideIndex + 1) * cardsPerView)
                      .map((app, index) => (
                        <div
                          key={app.id}
                          className="bg-white/90 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/95 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: '0 8px 32px rgba(31, 40, 83, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
                          }}
                        >
                          {/* Featured Badge */}
                          {slideIndex === 0 && index < 2 && (
                            <div className="inline-block bg-[#b9ed2a] text-[#1F2853] px-3 py-1 rounded-full text-sm font-medium mb-4">
                              Featured
                            </div>
                          )}

                          {/* App Logo and Info */}
                          <div className="flex items-start gap-4 mb-4">
                            {app.logo_url && (
                              <img
                                src={app.logo_url}
                                alt={`${app.name} logo`}
                                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                              />
                            )}
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 mb-1">{app.name}</h3>
                              <p className="text-[#1F2853] text-sm font-medium mb-2">{app.category}</p>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <div key={i} className="w-4 h-4 flex items-center justify-center">
                                      <i className={`ri-star-${i < Math.floor(app.rating ?? 0) ? 'fill' : i < (app.rating ?? 0) ? 'half-fill' : 'line'} text-yellow-400 text-sm`}></i>
                                    </div>
                                  ))}
                                </div>
                                <span className="text-gray-900 text-sm font-medium">{(app.rating ?? 0).toFixed(1)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                            {app.tagline ?? app.description ?? ''}
                          </p>

                          {/* View Details Button */}
                          <Link
                            to={`/products/${app.slug}`}
                            className="block text-center w-full bg-[#b9ed2a] hover:bg-[#a5d426] text-[#1F2853] py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap"
                          >
                            View Details
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                  index === currentIndex
                    ? 'bg-[#1F2853] scale-125'
                    : 'bg-gray-400 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            to={viewAllUrl}
            className="inline-block bg-[#f25a1a] hover:bg-[#d14815] text-white px-8 py-3 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap"
          >
            {viewAllLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
