import { useState } from 'react';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  return (
    <section
      className="relative py-14 md:py-20 lg:py-32 min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1B1B36_45%] to-[#56122D]"
      style={{
        // backgroundImage: `url('https://static.readdy.ai/image/19a52a0e7cd11d182286c46a940c9855/d888d3e6c6140bd2ef82a28fa63739fe.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 pt-10">
        <div className="text-center reveal-stagger">
          <h1 className="reveal-child text-3xl sm:text-4xl md:text-6xl font-medium text-white mb-4 md:mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
            Discover the Best AI Tools & Apps –<br />
            <span className="text-white">Curated, Reviewed & Ranked</span>
          </h1>

          <p className="reveal-child text-base sm:text-lg md:text-xl text-white/70 mb-8 md:mb-12 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            We review the best AI Apps so you dont have to.
          </p>

          {/* Search Bar */}
          <div className="reveal-child max-w-3xl mx-auto mb-6 md:mb-8 rounded-full" style={{ boxShadow: '0 20px 90px 15px rgba(86, 18, 45, 0.8)' }}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search AI tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg bg-transparent rounded-full outline-none focus:border-transparent pr-12 sm:pr-16 text-white"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#f25a1a] text-white px-3 py-3 rounded-full hover:bg-[#d14815] cursor-pointer transition-colors"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-search-line"></i>
                </div>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="reveal-child flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 md:mb-8">
            <button className="bg-[#f25a1a] hover:bg-[#d14815] text-white px-5 sm:px-6 py-3 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap">
              Browse Apps
            </button>
            <button className="bg-[#1F2853] hover:bg-[#162040] text-white px-5 sm:px-6 py-3 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap">
              Submit Your App
            </button>
            <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 hover:border-white/50 px-5 sm:px-6 py-3 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap">
              Get AI Automation Help
            </button>
          </div>

          {/* Moved text below buttons */}
          <p className="reveal-child text-lg text-white/80 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Compare, explore, and promote AI-powered tools that matter
          </p>
        </div>
      </div>
    </section>
  );
}
