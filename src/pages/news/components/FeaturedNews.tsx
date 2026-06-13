
export default function FeaturedNews() {
  const featuredArticle = {
    id: 1,
    title: "OpenAI Announces GPT-5: Revolutionary Breakthrough in AI Reasoning",
    excerpt: "The latest iteration promises unprecedented capabilities in logical reasoning, code generation, and multimodal understanding, setting new benchmarks for artificial intelligence.",
    content: "OpenAI's GPT-5 represents a quantum leap in artificial intelligence capabilities, featuring enhanced reasoning abilities that surpass human-level performance in complex problem-solving tasks. The model demonstrates remarkable improvements in code generation, mathematical reasoning, and creative writing, while maintaining ethical guidelines and safety protocols.",
    author: "Dr. Sarah Chen",
    date: "January 20, 2025",
    readTime: "8 min read",
    category: "AI Breakthrough",
    image: "https://readdy.ai/api/search-image?query=OpenAI%20GPT-5%20announcement%20with%20futuristic%20AI%20interface%2C%20neural%20network%20visualization%2C%20advanced%20technology%20laboratory%2C%20professional%20tech%20presentation%2C%20blue%20and%20orange%20lighting%2C%20modern%20minimalist%20design&width=800&height=500&seq=featured-gpt5&orientation=landscape",
    tags: ["OpenAI", "GPT-5", "AI", "Machine Learning", "Technology"]
  };

  return (
    <section className="py-16 bg-gradient-to-br from-[#f7f5ef] to-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2853] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Featured Story
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
            The most important tech story of the week
          </p>
        </div>

        <article className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative overflow-hidden h-[300px] lg:h-[500px]">
              <img 
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-6 left-6">
                <span className="bg-[#f25a1a] text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {featuredArticle.category}
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-wrap gap-2">
                  {featuredArticle.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-white/90 text-[#1F2853] px-3 py-1 rounded-full text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center text-sm text-gray-600 mb-4 space-x-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <span>{featuredArticle.date}</span>
                <span>•</span>
                <span>By {featuredArticle.author}</span>
                <span>•</span>
                <span>{featuredArticle.readTime}</span>
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-[#1F2853] mb-4 group-hover:text-[#f25a1a] transition-colors leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {featuredArticle.title}
              </h3>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {featuredArticle.excerpt}
              </p>

              <p className="text-gray-600 leading-relaxed mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {featuredArticle.content}
              </p>
              
              <div className="flex items-center space-x-4">
                <button className="bg-gradient-to-r from-[#1F2853] to-[#2a3a6b] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Read Full Article
                  <div className="w-4 h-4 inline-flex items-center justify-center ml-2">
                    <i className="ri-arrow-right-line"></i>
                  </div>
                </button>
                
                <button className="flex items-center space-x-2 text-gray-600 hover:text-[#f25a1a] transition-colors">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-share-line"></i>
                  </div>
                  <span className="font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>Share</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}