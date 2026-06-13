
import { useState } from 'react';

export default function InsightsHero() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  return (
    <section 
      className="relative py-24 lg:py-32 mt-16"
      style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20business%20conference%20room%20with%20entrepreneurs%20and%20startup%20founders%20discussing%20strategies%2C%20professional%20meeting%20environment%2C%20glass%20walls%2C%20natural%20lighting%2C%20collaborative%20workspace%2C%20innovation%20hub%20atmosphere&width=1920&height=800&seq=insights-hero&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
            Insights from Industry Leaders
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Discover the stories behind successful apps and the founders who built them. Learn from real experiences and proven strategies.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-[#f25a1a] hover:bg-[#d14815] text-white px-8 py-4 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
              Watch Founder Interviews
            </button>
            <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 hover:border-white/50 px-8 py-4 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap">
              Read Success Stories
            </button>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <input
                type="text"
                placeholder="Search founder stories, testimonials, or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 text-lg bg-white/95 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f25a1a] focus:border-transparent pr-16 text-[#1F2853]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#f25a1a] text-white px-4 py-2 rounded-md hover:bg-[#d14815] cursor-pointer transition-colors"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-search-line"></i>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
