
export default function TrendingTopics() {
  const trendingTopics = [
    { name: "GPT-5", count: 45, trend: "up" },
    { name: "AI Automation", count: 38, trend: "up" },
    { name: "Machine Learning", count: 32, trend: "stable" },
    { name: "App Development", count: 28, trend: "up" },
    { name: "Blockchain", count: 24, trend: "down" },
    { name: "Cloud Computing", count: 22, trend: "up" },
    { name: "Cybersecurity", count: 19, trend: "stable" },
    { name: "Mobile Apps", count: 17, trend: "up" }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <i className="ri-arrow-up-line text-green-500"></i>;
      case 'down':
        return <i className="ri-arrow-down-line text-red-500"></i>;
      default:
        return <i className="ri-subtract-line text-gray-400"></i>;
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2853] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Trending Topics
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
            What's hot in the tech world right now
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingTopics.map((topic, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-[#f7f5ef] to-white p-6 rounded-xl border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 bg-[#ffcee0]/20 rounded-lg flex items-center justify-center">
                  <span className="text-[#1F2853] font-bold text-sm">#{index + 1}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(topic.trend)}
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-[#1F2853] mb-2 group-hover:text-[#f25a1a] transition-colors" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {topic.name}
              </h3>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {topic.count} articles
                </span>
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-arrow-right-line text-gray-400 group-hover:text-[#f25a1a] transition-colors"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Categories */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-[#1F2853] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Browse by Category
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['AI & Machine Learning', 'App Development', 'Blockchain', 'Cloud Computing', 'Cybersecurity', 'Mobile Technology', 'Web Development', 'Startups'].map((category, index) => (
              <button
                key={index}
                className="bg-white border border-gray-200 text-[#1F2853] px-4 py-2 rounded-full font-medium hover:bg-[#ffcee0] hover:border-[#ffcee0] hover:text-white transition-all duration-300 whitespace-nowrap"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}