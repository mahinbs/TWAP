
import { useState } from 'react';

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

export default function NewsGrid() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  const categories = ['All', 'AI & ML', 'App Development', 'Blockchain', 'Cloud Computing', 'Cybersecurity', 'Mobile Tech'];

  const allArticles: NewsArticle[] = [
    {
      id: 1,
      title: "The Rise of No-Code AI: Democratizing Machine Learning for Everyone",
      excerpt: "Explore how no-code platforms are making AI accessible to non-technical users, revolutionizing business automation and decision-making processes.",
      author: "Emily Rodriguez",
      date: "January 19, 2025",
      readTime: "6 min read",
      category: "AI & ML",
      image: "https://readdy.ai/api/search-image?query=No-code%20AI%20platform%20interface%20with%20drag%20and%20drop%20machine%20learning%20tools%2C%20user-friendly%20dashboard%2C%20modern%20software%20design%2C%20professional%20workspace%2C%20blue%20and%20orange%20color%20scheme&width=400&height=250&seq=news-nocode&orientation=landscape",
      tags: ["No-Code", "AI", "Automation", "Business"]
    },
    {
      id: 2,
      title: "Flutter 4.0: What's New for Cross-Platform Mobile Development",
      excerpt: "Discover the latest features and improvements in Flutter 4.0 that are changing the game for mobile app developers worldwide.",
      author: "Marcus Chen",
      date: "January 18, 2025",
      readTime: "7 min read",
      category: "App Development",
      image: "https://readdy.ai/api/search-image?query=Flutter%20mobile%20app%20development%20interface%20with%20cross-platform%20code%20editor%2C%20smartphone%20mockups%2C%20modern%20development%20environment%2C%20clean%20UI%20design%2C%20blue%20and%20orange%20accents&width=400&height=250&seq=news-flutter&orientation=landscape",
      tags: ["Flutter", "Mobile", "Cross-Platform", "Development"]
    },
    {
      id: 3,
      title: "Ethereum 2.0 Staking Rewards Hit All-Time High",
      excerpt: "Ethereum's transition to proof-of-stake continues to show promising results with record-breaking staking rewards and network efficiency.",
      author: "David Park",
      date: "January 17, 2025",
      readTime: "5 min read",
      category: "Blockchain",
      image: "https://readdy.ai/api/search-image?query=Ethereum%20blockchain%20network%20visualization%20with%20staking%20rewards%20dashboard%2C%20cryptocurrency%20trading%20interface%2C%20professional%20fintech%20environment%2C%20blue%20and%20orange%20lighting&width=400&height=250&seq=news-ethereum&orientation=landscape",
      tags: ["Ethereum", "Staking", "Cryptocurrency", "Blockchain"]
    },
    {
      id: 4,
      title: "AWS Announces Revolutionary Serverless Computing Platform",
      excerpt: "Amazon Web Services unveils next-generation serverless architecture that promises 90% cost reduction and instant scaling capabilities.",
      author: "Lisa Thompson",
      date: "January 16, 2025",
      readTime: "8 min read",
      category: "Cloud Computing",
      image: "https://readdy.ai/api/search-image?query=AWS%20serverless%20computing%20architecture%20diagram%20with%20cloud%20infrastructure%20visualization%2C%20modern%20data%20center%2C%20professional%20cloud%20technology%20environment%2C%20blue%20and%20white%20design&width=400&height=250&seq=news-aws&orientation=landscape",
      tags: ["AWS", "Serverless", "Cloud", "Architecture"]
    },
    {
      id: 5,
      title: "Zero-Trust Security: The New Standard for Enterprise Protection",
      excerpt: "How zero-trust architecture is becoming essential for modern businesses to protect against sophisticated cyber threats.",
      author: "Dr. Rachel Kim",
      date: "January 15, 2025",
      readTime: "9 min read",
      category: "Cybersecurity",
      image: "https://readdy.ai/api/search-image?query=Zero-trust%20cybersecurity%20dashboard%20with%20network%20protection%20visualization%2C%20security%20monitoring%20interface%2C%20professional%20IT%20environment%2C%20blue%20and%20orange%20color%20scheme&width=400&height=250&seq=news-security&orientation=landscape",
      tags: ["Security", "Zero-Trust", "Enterprise", "Protection"]
    },
    {
      id: 6,
      title: "5G and Edge Computing: Transforming Mobile App Performance",
      excerpt: "The convergence of 5G networks and edge computing is creating unprecedented opportunities for mobile application developers.",
      author: "Jennifer Walsh",
      date: "January 14, 2025",
      readTime: "6 min read",
      category: "Mobile Tech",
      image: "https://readdy.ai/api/search-image?query=5G%20mobile%20technology%20with%20edge%20computing%20infrastructure%2C%20smartphone%20connectivity%20visualization%2C%20modern%20telecommunications%2C%20professional%20tech%20environment%2C%20blue%20and%20orange%20accents&width=400&height=250&seq=news-5g&orientation=landscape",
      tags: ["5G", "Edge Computing", "Mobile", "Performance"]
    },
    {
      id: 7,
      title: "The Future of Web Development: WebAssembly Goes Mainstream",
      excerpt: "WebAssembly is revolutionizing web performance, enabling near-native speed for complex applications in the browser.",
      author: "Alex Johnson",
      date: "January 13, 2025",
      readTime: "7 min read",
      category: "App Development",
      image: "https://readdy.ai/api/search-image?query=WebAssembly%20web%20development%20interface%20with%20performance%20optimization%20tools%2C%20modern%20code%20editor%2C%20professional%20development%20workspace%2C%20clean%20design&width=400&height=250&seq=news-wasm&orientation=landscape",
      tags: ["WebAssembly", "Web Development", "Performance", "Browser"]
    },
    {
      id: 8,
      title: "AI-Powered Code Review: GitHub Copilot's Latest Update",
      excerpt: "GitHub's AI assistant gets smarter with advanced code review capabilities that can detect bugs and suggest optimizations.",
      author: "Sarah Martinez",
      date: "January 12, 2025",
      readTime: "5 min read",
      category: "AI & ML",
      image: "https://readdy.ai/api/search-image?query=GitHub%20Copilot%20AI%20code%20review%20interface%20with%20intelligent%20suggestions%2C%20modern%20IDE%20environment%2C%20professional%20software%20development%2C%20blue%20and%20orange%20color%20scheme&width=400&height=250&seq=news-copilot&orientation=landscape",
      tags: ["GitHub", "AI", "Code Review", "Development"]
    },
    {
      id: 9,
      title: "Quantum Computing Breakthrough: IBM's 1000-Qubit Processor",
      excerpt: "IBM achieves a major milestone in quantum computing with their latest processor, bringing quantum advantage closer to reality.",
      author: "Dr. Michael Brown",
      date: "January 11, 2025",
      readTime: "10 min read",
      category: "AI & ML",
      image: "https://readdy.ai/api/search-image?query=IBM%20quantum%20computing%20processor%20with%20quantum%20circuits%20visualization%2C%20advanced%20laboratory%20environment%2C%20futuristic%20technology%2C%20professional%20scientific%20setting&width=400&height=250&seq=news-quantum&orientation=landscape",
      tags: ["Quantum", "IBM", "Computing", "Breakthrough"]
    }
  ];

  const filteredArticles = selectedCategory === 'All' 
    ? allArticles 
    : allArticles.filter(article => article.category === selectedCategory);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  return (
    <section className="py-16 bg-gradient-to-br from-[#f7f5ef] to-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2853] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Latest News & Insights
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Stay updated with the latest developments in technology and innovation
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-[#1F2853] text-white shadow-lg'
                  : 'bg-white text-[#1F2853] border border-gray-200 hover:bg-[#ffcee0] hover:border-[#ffcee0] hover:text-white'
              }`}
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentArticles.map((article) => (
            <article 
              key={article.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
            >
              <div className="relative overflow-hidden h-[200px]">
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#f25a1a] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-600 mb-3 space-x-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>By {article.author}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                
                <h3 className="text-lg font-bold text-[#1F2853] mb-3 group-hover:text-[#f25a1a] transition-colors leading-tight line-clamp-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {article.title}
                </h3>
                
                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-[#ffcee0]/20 text-[#1F2853] px-2 py-1 rounded-full text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center text-[#ffcee0] font-medium text-sm hover:text-[#f25a1a] transition-colors cursor-pointer" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Read Article
                  <div className="w-4 h-4 flex items-center justify-center ml-2">
                    <i className="ri-arrow-right-line"></i>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-200 text-[#1F2853] hover:bg-[#ffcee0] hover:border-[#ffcee0] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  currentPage === page
                    ? 'bg-[#1F2853] text-white'
                    : 'border border-gray-200 text-[#1F2853] hover:bg-[#ffcee0] hover:border-[#ffcee0] hover:text-white'
                }`}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-200 text-[#1F2853] hover:bg-[#ffcee0] hover:border-[#ffcee0] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}