
import { useState } from 'react';

export default function NewsHero() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#1F2853] via-[#2a3a6b] to-[#1F2853] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20technology%20news%20background%20with%20AI%20and%20digital%20innovation%20themes%2C%20futuristic%20tech%20interface%2C%20neural%20networks%2C%20data%20visualization%2C%20professional%20news%20environment%2C%20blue%20and%20orange%20color%20scheme%2C%20minimalist%20design&width=1920&height=800&seq=news-hero&orientation=landscape')`
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1F2853]/90 to-[#2a3a6b]/80" />
      
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Latest in <span className="text-[#ffcee0]">AI & Tech</span> News
          </h1>
          
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Stay ahead of the curve with breaking news, insights, and analysis from the world of artificial intelligence, app development, and emerging technologies.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news articles, topics, or keywords..."
                className="w-full px-6 py-4 pl-14 text-lg bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ffcee0] focus:border-transparent transition-all duration-300"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center">
                <i className="ri-search-line text-gray-300 text-xl"></i>
              </div>
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#f25a1a] to-[#ff7043] text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Search
              </button>
            </div>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#ffcee0] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                500+
              </div>
              <div className="text-gray-200 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Articles Published
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#ffcee0] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                50K+
              </div>
              <div className="text-gray-200 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Monthly Readers
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#ffcee0] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Daily
              </div>
              <div className="text-gray-200 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Fresh Updates
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}