interface EditorsPick {
  id: number;
  name: string;
  description: string;
  rating: number;
  category: string;
  reviewer: string;
  reviewExcerpt: string;
  image: string;
  badge: string;
  pros: string[];
  cons: string[];
}

const editorsPicks: EditorsPick[] = [
  {
    id: 1,
    name: "ChatGPT Plus",
    description: "The most advanced conversational AI with enhanced capabilities",
    rating: 4.8,
    category: "AI Tools",
    reviewer: "Sarah Mitchell",
    reviewExcerpt: "ChatGPT Plus sets the gold standard for conversational AI. The improved response times, priority access, and advanced reasoning capabilities make it an essential tool for professionals.",
    image: "https://readdy.ai/api/search-image?query=ChatGPT%20interface%20screenshot%2C%20modern%20AI%20chat%20application%2C%20clean%20user%20interface%2C%20professional%20design%2C%20conversation%20bubbles%2C%20AI%20assistant%20branding%2C%20technology%20product%20showcase&width=400&height=300&seq=chatgpt-review&orientation=landscape",
    badge: "Editor's Choice",
    pros: ["Lightning-fast responses", "Advanced reasoning", "Priority access", "Excellent for complex tasks"],
    cons: ["Subscription required", "Usage limits during peak times"]
  },
  {
    id: 2,
    name: "Midjourney",
    description: "Revolutionary AI image generation with artistic excellence",
    rating: 4.7,
    category: "Design",
    reviewer: "Alex Chen",
    reviewExcerpt: "Midjourney continues to lead in AI image generation with stunning artistic quality and intuitive prompting. The latest updates have significantly improved consistency and control.",
    image: "https://readdy.ai/api/search-image?query=AI%20generated%20artwork%20showcase%2C%20digital%20art%20creation%20interface%2C%20creative%20design%20tools%2C%20artistic%20image%20generation%2C%20professional%20design%20software%2C%20modern%20creative%20workspace&width=400&height=300&seq=midjourney-review&orientation=landscape",
    badge: "Best Creative Tool",
    pros: ["Exceptional image quality", "Artistic style variety", "Active community", "Regular updates"],
    cons: ["Discord-based interface", "Learning curve for beginners"]
  },
  {
    id: 3,
    name: "Notion AI",
    description: "Smart workspace that transforms how teams collaborate",
    rating: 4.6,
    category: "Productivity",
    reviewer: "Maria Rodriguez",
    reviewExcerpt: "Notion AI seamlessly integrates powerful AI capabilities into an already excellent workspace platform. It's particularly strong for content creation and data analysis.",
    image: "https://readdy.ai/api/search-image?query=Notion%20workspace%20interface%2C%20productivity%20dashboard%2C%20team%20collaboration%20tools%2C%20organized%20digital%20workspace%2C%20modern%20project%20management%2C%20clean%20interface%20design&width=400&height=300&seq=notion-review&orientation=landscape",
    badge: "Best Productivity",
    pros: ["Seamless AI integration", "Versatile workspace", "Great for teams", "Excellent templates"],
    cons: ["Can be overwhelming initially", "AI features require subscription"]
  }
];

export default function EditorsPickSection() {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <i key={`full-${i}`} className="ri-star-fill text-yellow-400 text-lg"></i>
        ))}
        {hasHalfStar && <i className="ri-star-half-fill text-yellow-400 text-lg"></i>}
        {[...Array(emptyStars)].map((_, i) => (
          <i key={`empty-${i}`} className="ri-star-line text-gray-300 text-lg"></i>
        ))}
        <span className="text-lg text-gray-700 ml-2 font-semibold">{rating}</span>
      </div>
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1F2853] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Editor's Pick Reviews
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
            In-depth reviews of the most innovative and impactful apps, handpicked by our expert editorial team
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {editorsPicks.map((app) => (
            <div key={app.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Badge */}
              <div className="relative">
                <img 
                  src={app.image}
                  alt={app.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#1F2853] text-white text-sm font-medium rounded-full">
                    {app.badge}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1F2853] mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {app.name}
                    </h3>
                    <p className="text-gray-600 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {app.category}
                    </p>
                  </div>
                  <div className="text-right">
                    {renderStars(app.rating)}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {app.description}
                </p>

                {/* Review Excerpt */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 text-sm italic mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    "{app.reviewExcerpt}"
                  </p>
                  <p className="text-xs text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    — {app.reviewer}, Lead Reviewer
                  </p>
                </div>

                {/* Pros and Cons */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-green-600 mb-2 flex items-center gap-1">
                      <i className="ri-check-line"></i>
                      Pros
                    </h4>
                    <ul className="space-y-1">
                      {app.pros.slice(0, 2).map((pro, index) => (
                        <li key={index} className="text-xs text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          • {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-red-500 mb-2 flex items-center gap-1">
                      <i className="ri-close-line"></i>
                      Cons
                    </h4>
                    <ul className="space-y-1">
                      {app.cons.slice(0, 2).map((con, index) => (
                        <li key={index} className="text-xs text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          • {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Button */}
                <button 
                  className="w-full py-3 px-4 bg-[#1F2853] hover:bg-[#2a3a6b] text-white rounded-lg font-medium transition-colors whitespace-nowrap"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Read Full Review
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button 
            className="px-8 py-4 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap hover:scale-105 hover:shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #b9ed2a 0%, #a5d426 50%, #91bb22 100%)',
              color: '#1F2853',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            View All Editor Reviews
          </button>
        </div>
      </div>
    </section>
  );
}