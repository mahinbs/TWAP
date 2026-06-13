
import { useState } from 'react';

interface NewsArticle {
  id: number;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  fullContent: string;
  image: string;
  category: string;
  readTime: string;
}

export default function NewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const [articles] = useState<NewsArticle[]>([
    {
      id: 1,
      title: "UX Pilot AI Releases GPT-5: What This Means for Developers",
      date: "January 15, 2025",
      author: "Alex Thompson",
      excerpt: "The latest breakthrough promises enhanced reasoning capabilities and better integration options for developers worldwide.",
      fullContent: "OpenAI's latest release brings unprecedented capabilities to the development community. With improved reasoning, better code understanding, and enhanced API integration, GPT-5 is set to revolutionize how developers approach AI-powered applications. Early beta testers report 40% faster development cycles and significantly improved code quality suggestions.",
      image: "https://readdy.ai/api/search-image?query=Modern%20AI%20technology%20interface%20with%20GPT-5%20branding%2C%20futuristic%20neural%20network%20visualization%2C%20clean%20tech%20background%2C%20professional%20software%20development%20environment%2C%20blue%20and%20orange%20color%20scheme%2C%20minimalist%20design&width=600&height=400&seq=news-gpt5&orientation=landscape",
      category: "AI Technology",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Top 10 AI Automation Tools for Small Businesses",
      date: "January 12, 2025",
      author: "Lisa Rodriguez",
      excerpt: "Discover cost-effective AI solutions that can streamline operations and boost productivity for growing businesses.",
      fullContent: "Small businesses are increasingly turning to AI automation to compete with larger enterprises. From customer service chatbots to inventory management systems, these tools are leveling the playing field and driving unprecedented growth.",
      image: "https://readdy.ai/api/search-image?query=Small%20business%20automation%20dashboard%20with%20AI%20tools%2C%20modern%20office%20workspace%2C%20productivity%20charts%20and%20graphs%2C%20professional%20business%20environment%2C%20clean%20interface%20design%2C%20blue%20and%20white%20color%20scheme&width=400&height=250&seq=news-automation&orientation=landscape",
      category: "Business Tools",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "The Future of AI in Mobile App Development",
      date: "January 10, 2025",
      author: "David Park",
      excerpt: "Exploring how artificial intelligence is reshaping mobile development practices and user experiences.",
      fullContent: "Mobile app development is undergoing a transformation with AI integration becoming standard practice. From predictive user interfaces to automated testing, AI is making apps smarter and development faster.",
      image: "https://readdy.ai/api/search-image?query=Mobile%20app%20development%20with%20AI%20integration%2C%20smartphone%20interface%20design%2C%20modern%20coding%20environment%2C%20futuristic%20mobile%20technology%2C%20clean%20professional%20workspace%2C%20blue%20and%20orange%20accents&width=400&height=250&seq=news-mobile&orientation=landscape",
      category: "Mobile Development",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Machine Learning Models: Performance Optimization Strategies",
      date: "January 8, 2025",
      author: "Dr. Rachel Kim",
      excerpt: "Advanced techniques for improving ML model efficiency and reducing computational costs in production environments.",
      fullContent: "As machine learning models become more complex, optimization becomes crucial for production deployment. This comprehensive guide covers the latest strategies for improving model performance while reducing costs.",
      image: "https://readdy.ai/api/search-image?query=Machine%20learning%20optimization%20dashboard%20with%20performance%20metrics%2C%20neural%20network%20diagrams%2C%20computational%20graphs%2C%20professional%20data%20science%20environment%2C%20modern%20tech%20interface%2C%20blue%20and%20orange%20color%20scheme&width=400&height=250&seq=news-ml&orientation=landscape",
      category: "Machine Learning",
      readTime: "8 min read"
    },
    {
      id: 5,
      title: "Blockchain Integration in Modern Web Applications",
      date: "January 5, 2025",
      author: "Michael Chen",
      excerpt: "How blockchain technology is being seamlessly integrated into everyday web applications for enhanced security and transparency.",
      fullContent: "Blockchain technology is moving beyond cryptocurrency into mainstream web applications. From secure authentication to transparent data management, developers are finding innovative ways to leverage blockchain.",
      image: "https://readdy.ai/api/search-image?query=Blockchain%20technology%20integration%20in%20web%20applications%2C%20modern%20cryptocurrency%20interface%2C%20secure%20digital%20transactions%2C%20professional%20fintech%20environment%2C%20clean%20blockchain%20visualization%2C%20blue%20and%20orange%20accents&width=400&height=250&seq=news-blockchain&orientation=landscape",
      category: "Blockchain",
      readTime: "9 min read"
    },
    {
      id: 6,
      title: "Cloud Computing Trends: Serverless Architecture Revolution",
      date: "January 3, 2025",
      author: "Jennifer Walsh",
      excerpt: "The shift towards serverless computing is transforming how developers build and deploy scalable applications.",
      fullContent: "Serverless architecture is revolutionizing cloud computing by eliminating server management overhead. Developers can now focus purely on code while cloud providers handle infrastructure scaling automatically.",
      image: "https://readdy.ai/api/search-image?query=Serverless%20cloud%20computing%20architecture%20diagram%2C%20modern%20cloud%20infrastructure%20visualization%2C%20scalable%20application%20deployment%2C%20professional%20cloud%20technology%20environment%2C%20clean%20interface%20design%2C%20blue%20and%20white%20color%20scheme&width=400&height=250&seq=news-serverless&orientation=landscape",
      category: "Cloud Computing",
      readTime: "6 min read"
    }
  ]);

  const featuredArticle = articles[currentIndex];
  const sideArticles = articles.slice(currentIndex + 1, currentIndex + 3).concat(
    articles.slice(0, Math.max(0, (currentIndex + 3) - articles.length))
  );

  const handleTransition = (newIndex: number) => {
    if (newIndex === currentIndex || isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 150);
  };

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? articles.length - 1 : currentIndex - 1;
    handleTransition(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex === articles.length - 1 ? 0 : currentIndex + 1;
    handleTransition(newIndex);
  };

  const handleSideArticleClick = (article: NewsArticle) => {
    const newIndex = articles.findIndex(a => a.id === article.id);
    if (newIndex !== -1) {
      handleTransition(newIndex);
    }
  };

  return (
    <section className="py-12 bg-gradient-to-br from-[#f7f5ef] to-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2853] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Latest in AI & App Development
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Left Navigation Button */}
          <button 
            onClick={handlePrevious}
            disabled={isTransitioning}
            className="absolute left-[-80px] top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-[#1F2853] text-white rounded-full flex items-center justify-center hover:bg-[#f25a1a] transition-all duration-300 shadow-lg disabled:opacity-50"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-arrow-left-line text-lg"></i>
            </div>
          </button>

          {/* Right Navigation Button */}
          <button 
            onClick={handleNext}
            disabled={isTransitioning}
            className="absolute right-[-80px] top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-[#1F2853] text-white rounded-full flex items-center justify-center hover:bg-[#f25a1a] transition-all duration-300 shadow-lg disabled:opacity-50"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-arrow-right-line text-lg"></i>
            </div>
          </button>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[380px]">
            {/* Featured Article - Left Column (2/3 width) */}
            <div className="lg:col-span-2">
              <article className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer h-full ${isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                <div className="relative overflow-hidden h-[200px]">
                  <img 
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#f25a1a] text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 text-[#1F2853] px-3 py-1 rounded-full text-sm font-medium">
                      {featuredArticle.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 h-[180px] flex flex-col justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1F2853] mb-2 group-hover:text-[#f25a1a] transition-colors leading-tight line-clamp-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {featuredArticle.title}
                    </h3>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-2 space-x-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      <span>{featuredArticle.date}</span>
                      <span>•</span>
                      <span>By {featuredArticle.author}</span>
                      <span>•</span>
                      <span>{featuredArticle.readTime}</span>
                    </div>
                    
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {featuredArticle.excerpt}
                    </p>
                  </div>
                  
                  <div className="flex items-center text-[#ffcee0] font-medium text-sm hover:text-[#f25a1a] transition-colors cursor-pointer" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Read Full Article
                    <div className="w-4 h-4 flex items-center justify-center ml-2">
                      <i className="ri-arrow-right-line"></i>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            {/* Side Articles - Right Column (1/3 width) */}
            <div className="lg:col-span-1 flex flex-col gap-4 h-full">
              {sideArticles.map((article) => (
                <article 
                  key={article.id} 
                  onClick={() => handleSideArticleClick(article)}
                  className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer h-[180px] ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}
                >
                  <div className="h-full flex flex-col">
                    <div className="relative overflow-hidden h-[90px]">
                      <img 
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-[#f25a1a] text-white px-2 py-1 rounded-full text-xs font-medium">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 h-[90px] flex flex-col justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-[#1F2853] mb-1 group-hover:text-[#f25a1a] transition-colors leading-tight line-clamp-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                          {article.title}
                        </h4>
                        
                        <div className="flex items-center text-xs text-gray-600 mb-1 space-x-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          <span>{article.date}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-[#ffcee0] font-medium text-xs hover:text-[#f25a1a] transition-colors cursor-pointer" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Read More
                        <div className="w-3 h-3 flex items-center justify-center ml-1">
                          <i className="ri-arrow-right-line"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
              
              {/* View All Articles Button */}
              <div className="mt-2">
                <button className="w-full bg-gradient-to-r from-[#1F2853] to-[#2a3a6b] text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  View All Articles
                  <div className="w-4 h-4 inline-flex items-center justify-center ml-2">
                    <i className="ri-external-link-line"></i>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Article Navigation Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {articles.map((_, index) => (
              <button
                key={index}
                onClick={() => handleTransition(index)}
                disabled={isTransitioning}
                className={`w-3 h-3 rounded-full transition-all duration-300 disabled:opacity-50 ${
                  index === currentIndex 
                    ? 'bg-[#f25a1a] scale-110' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
