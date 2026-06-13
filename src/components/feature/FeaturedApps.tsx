import { useEffect, useState } from 'react';

const categories = [
  { id: 'marketing', name: 'Marketing' },
  { id: 'productivity', name: 'Productivity' },
  { id: 'finance', name: 'Finance' },
  { id: 'design', name: 'Design' }
];

const allApps = {
  marketing: [
    {
      name: 'Jasper AI',
      category: 'Content Writing',
      rating: 4.4,
      description: 'AI-powered content creation platform that helps marketers and writers generate high-quality copy, blogs, and marketing materials at scale.',
      logo: 'https://readdy.ai/api/search-image?query=AI%20writing%20tool%20logo%2C%20modern%20text%20editor%20icon%2C%20purple%20and%20white%20color%20scheme%2C%20content%20creation%20symbols%2C%20professional%20writing%20software%20branding%2C%20app%20icon%20style&width=64&height=64&seq=jasper-logo&orientation=squarish'
    },
    {
      name: 'HubSpot AI',
      category: 'Marketing Automation',
      rating: 4.5,
      description: 'Comprehensive marketing platform with AI-powered lead generation, email marketing, and customer relationship management tools.',
      logo: 'https://readdy.ai/api/search-image?query=Marketing%20automation%20logo%2C%20CRM%20software%20icon%2C%20orange%20and%20blue%20branding%2C%20business%20growth%20symbols%2C%20professional%20marketing%20tools%2C%20app%20icon%20style&width=64&height=64&seq=hubspot-logo&orientation=squarish'
    },
    {
      name: 'Mailchimp AI',
      category: 'Email Marketing',
      rating: 4.3,
      description: 'AI-enhanced email marketing platform that optimizes campaigns, personalizes content, and improves engagement rates automatically.',
      logo: 'https://readdy.ai/api/search-image?query=Email%20marketing%20logo%2C%20chimp%20mascot%20icon%2C%20yellow%20and%20blue%20branding%2C%20email%20symbols%2C%20marketing%20automation%20tools%2C%20app%20icon%20style&width=64&height=64&seq=mailchimp-logo&orientation=squarish'
    },
    {
      name: 'Hootsuite AI',
      category: 'Social Media',
      rating: 4.2,
      description: 'Social media management platform with AI-powered content scheduling, analytics, and engagement optimization across multiple platforms.',
      logo: 'https://readdy.ai/api/search-image?query=Social%20media%20management%20logo%2C%20owl%20mascot%20icon%2C%20blue%20and%20orange%20branding%2C%20social%20network%20symbols%2C%20digital%20marketing%20tools%2C%20app%20icon%20style&width=64&height=64&seq=hootsuite-logo&orientation=squarish'
    },
    {
      name: 'Canva AI',
      category: 'Design Marketing',
      rating: 4.4,
      description: 'AI-powered design platform that makes creating professional marketing graphics, presentations, and social media content effortless.',
      logo: 'https://readdy.ai/api/search-image?query=Design%20platform%20logo%2C%20creative%20tool%20icon%2C%20colorful%20modern%20branding%2C%20design%20symbols%2C%20user-friendly%20interface%2C%20app%20icon%20style&width=64&height=64&seq=canva-marketing-logo&orientation=squarish'
    },
    {
      name: 'Copy.ai',
      category: 'Copywriting',
      rating: 4.1,
      description: 'AI copywriting assistant that generates marketing copy, product descriptions, and advertising content for various marketing channels.',
      logo: 'https://readdy.ai/api/search-image?query=AI%20copywriting%20logo%2C%20modern%20text%20icon%2C%20purple%20and%20white%20design%2C%20writing%20symbols%2C%20marketing%20content%20tools%2C%20app%20icon%20style&width=64&height=64&seq=copyai-logo&orientation=squarish'
    }
  ],
  productivity: [
    {
      name: 'Notion AI',
      category: 'Productivity',
      rating: 4.5,
      description: 'Intelligent workspace that combines notes, tasks, wikis, and databases with AI-powered writing and organization capabilities for teams.',
      logo: 'https://readdy.ai/api/search-image?query=Productivity%20app%20logo%2C%20clean%20modern%20icon%2C%20black%20and%20white%20design%2C%20minimalist%20branding%2C%20workspace%20symbols%2C%20professional%20software%20logo%2C%20app%20icon%20style&width=64&height=64&seq=notion-logo&orientation=squarish'
    },
    {
      name: 'Todoist AI',
      category: 'Task Management',
      rating: 4.3,
      description: 'Smart task manager with AI-powered project planning, deadline suggestions, and productivity insights to optimize your workflow.',
      logo: 'https://readdy.ai/api/search-image?query=Task%20management%20logo%2C%20checklist%20icon%2C%20red%20and%20white%20branding%2C%20productivity%20symbols%2C%20organization%20tools%2C%20app%20icon%20style&width=64&height=64&seq=todoist-logo&orientation=squarish'
    },
    {
      name: 'Calendly AI',
      category: 'Scheduling',
      rating: 4.4,
      description: 'AI-enhanced scheduling platform that automatically finds optimal meeting times and manages calendar coordination effortlessly.',
      logo: 'https://readdy.ai/api/search-image?query=Calendar%20scheduling%20logo%2C%20modern%20calendar%20icon%2C%20blue%20and%20white%20design%2C%20time%20management%20symbols%2C%20appointment%20booking%20tools%2C%20app%20icon%20style&width=64&height=64&seq=calendly-logo&orientation=squarish'
    },
    {
      name: 'Grammarly AI',
      category: 'Writing',
      rating: 4.5,
      description: 'AI writing assistant that helps improve grammar, clarity, and tone across all your writing platforms with real-time suggestions.',
      logo: 'https://readdy.ai/api/search-image?query=Writing%20tool%20logo%2C%20grammar%20checker%20icon%2C%20green%20and%20white%20design%2C%20text%20editing%20symbols%2C%20professional%20writing%20software%2C%20app%20icon%20style&width=64&height=64&seq=grammarly-logo&orientation=squarish'
    },
    {
      name: 'Slack AI',
      category: 'Communication',
      rating: 4.2,
      description: 'Team communication platform enhanced with AI features for message summarization, smart notifications, and workflow automation.',
      logo: 'https://readdy.ai/api/search-image?query=Team%20communication%20logo%2C%20chat%20bubble%20icon%2C%20purple%20and%20white%20branding%2C%20collaboration%20symbols%2C%20workplace%20messaging%20tools%2C%20app%20icon%20style&width=64&height=64&seq=slack-logo&orientation=squarish'
    },
    {
      name: 'Zoom AI',
      category: 'Video Conferencing',
      rating: 4.1,
      description: 'Video conferencing platform with AI-powered meeting transcription, smart scheduling, and automated follow-up features.',
      logo: 'https://readdy.ai/api/search-image?query=Video%20conferencing%20logo%2C%20camera%20icon%2C%20blue%20and%20white%20design%2C%20meeting%20symbols%2C%20remote%20work%20tools%2C%20app%20icon%20style&width=64&height=64&seq=zoom-logo&orientation=squarish'
    }
  ],
  finance: [
    {
      name: 'QuickBooks AI',
      category: 'Accounting',
      rating: 4.3,
      description: 'AI-powered accounting software that automates bookkeeping, expense tracking, and financial reporting for small businesses.',
      logo: 'https://readdy.ai/api/search-image?query=Accounting%20software%20logo%2C%20calculator%20icon%2C%20blue%20and%20green%20branding%2C%20financial%20symbols%2C%20business%20accounting%20tools%2C%20app%20icon%20style&width=64&height=64&seq=quickbooks-logo&orientation=squarish'
    },
    {
      name: 'Mint AI',
      category: 'Personal Finance',
      rating: 4.2,
      description: 'Personal finance management app with AI-driven budgeting insights, spending analysis, and automated savings recommendations.',
      logo: 'https://readdy.ai/api/search-image?query=Personal%20finance%20logo%2C%20money%20management%20icon%2C%20green%20and%20white%20design%2C%20financial%20planning%20symbols%2C%20budgeting%20tools%2C%20app%20icon%20style&width=64&height=64&seq=mint-logo&orientation=squarish'
    },
    {
      name: 'Robinhood AI',
      category: 'Investment',
      rating: 4.1,
      description: 'Investment platform with AI-powered market analysis, automated portfolio management, and intelligent trading recommendations.',
      logo: 'https://readdy.ai/api/search-image?query=Investment%20app%20logo%2C%20stock%20market%20icon%2C%20green%20and%20black%20branding%2C%20trading%20symbols%2C%20financial%20investment%20tools%2C%20app%20icon%20style&width=64&height=64&seq=robinhood-logo&orientation=squarish'
    },
    {
      name: 'Xero AI',
      category: 'Business Finance',
      rating: 4.4,
      description: 'Cloud-based accounting platform with AI features for automated invoice processing, expense categorization, and financial forecasting.',
      logo: 'https://readdy.ai/api/search-image?query=Business%20accounting%20logo%2C%20modern%20finance%20icon%2C%20blue%20and%20white%20design%2C%20accounting%20symbols%2C%20cloud%20software%20tools%2C%20app%20icon%20style&width=64&height=64&seq=xero-logo&orientation=squarish'
    },
    {
      name: 'PayPal AI',
      category: 'Payments',
      rating: 4.0,
      description: 'Digital payment platform enhanced with AI fraud detection, smart transaction categorization, and automated payment processing.',
      logo: 'https://readdy.ai/api/search-image?query=Digital%20payment%20logo%2C%20PayPal%20icon%2C%20blue%20and%20white%20branding%2C%20payment%20symbols%2C%20financial%20transaction%20tools%2C%20app%20icon%20style&width=64&height=64&seq=paypal-logo&orientation=squarish'
    },
    {
      name: 'TurboTax AI',
      category: 'Tax Preparation',
      rating: 4.2,
      description: 'AI-enhanced tax preparation software that automatically finds deductions, optimizes returns, and simplifies tax filing process.',
      logo: 'https://readdy.ai/api/search-image?query=Tax%20preparation%20logo%2C%20tax%20document%20icon%2C%20red%20and%20blue%20branding%2C%20tax%20symbols%2C%20financial%20software%20tools%2C%20app%20icon%20style&width=64&height=64&seq=turbotax-logo&orientation=squarish'
    }
  ],
  design: [
    {
      name: 'Figma AI',
      category: 'Design',
      rating: 4.3,
      description: 'Collaborative design platform enhanced with AI features for automated design suggestions and intelligent layout optimization for teams.',
      logo: 'https://readdy.ai/api/search-image?query=Design%20tool%20logo%2C%20creative%20software%20icon%2C%20colorful%20modern%20branding%2C%20design%20symbols%2C%20collaborative%20platform%20logo%2C%20geometric%20shapes%2C%20app%20icon%20style&width=64&height=64&seq=figma-logo&orientation=squarish'
    },
    {
      name: 'Adobe AI',
      category: 'Creative Suite',
      rating: 4.6,
      description: 'Comprehensive creative suite with AI-powered design tools, automated editing features, and intelligent content generation capabilities.',
      logo: 'https://readdy.ai/api/search-image?query=Adobe%20creative%20logo%2C%20modern%20design%20icon%2C%20red%20and%20black%20branding%2C%20creative%20symbols%2C%20professional%20design%20software%2C%20app%20icon%20style&width=64&height=64&seq=adobe-logo&orientation=squarish'
    },
    {
      name: 'Sketch AI',
      category: 'UI Design',
      rating: 4.2,
      description: 'Vector-based design tool with AI-enhanced features for UI/UX design, prototyping, and collaborative design workflows.',
      logo: 'https://readdy.ai/api/search-image?query=UI%20design%20tool%20logo%2C%20sketch%20icon%2C%20yellow%20and%20black%20branding%2C%20design%20symbols%2C%20interface%20design%20tools%2C%20app%20icon%20style&width=64&height=64&seq=sketch-logo&orientation=squarish'
    },
    {
      name: 'Midjourney',
      category: 'AI Art',
      rating: 4.6,
      description: 'Revolutionary AI image generator that creates stunning artwork and designs from text prompts with incredible detail and artistic creativity.',
      logo: 'https://readdy.ai/api/search-image?query=AI%20image%20generation%20tool%20logo%2C%20creative%20artistic%20icon%2C%20colorful%20gradient%20design%2C%20modern%20tech%20branding%2C%20digital%20art%20symbols%2C%20vibrant%20colors%2C%20app%20icon%20style&width=64&height=64&seq=midjourney-design-logo&orientation=squarish'
    },
    {
      name: 'Framer AI',
      category: 'Web Design',
      rating: 4.1,
      description: 'AI-powered web design platform that generates responsive websites, interactive prototypes, and modern web experiences from simple inputs.',
      logo: 'https://readdy.ai/api/search-image?query=Web%20design%20tool%20logo%2C%20modern%20website%20icon%2C%20purple%20and%20white%20branding%2C%20web%20development%20symbols%2C%20design%20platform%20tools%2C%20app%20icon%20style&width=64&height=64&seq=framer-logo&orientation=squarish'
    },
    {
      name: 'Canva Pro',
      category: 'Graphic Design',
      rating: 4.4,
      description: 'Professional design platform with advanced AI features for creating stunning graphics, presentations, and marketing materials.',
      logo: 'https://readdy.ai/api/search-image?query=Graphic%20design%20logo%2C%20creative%20platform%20icon%2C%20colorful%20modern%20branding%2C%20design%20symbols%2C%20professional%20design%20tools%2C%20app%20icon%20style&width=64&height=64&seq=canva-pro-logo&orientation=squarish'
    }
  ]
};

export default function FeaturedApps() {
  const [activeCategory, setActiveCategory] = useState('marketing');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  // Determine cards per view responsively
  useEffect(() => {
    const getCardsPerView = () => {
      if (typeof window === 'undefined') return 3;
      if (window.innerWidth < 768) return 1; // < md
      if (window.innerWidth < 1024) return 2; // md
      return 3; // lg+
    };
    setCardsPerView(getCardsPerView());
    const onResize = () => setCardsPerView(getCardsPerView());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const currentApps = allApps[activeCategory as keyof typeof allApps];
  const totalSlides = Math.ceil(currentApps.length / cardsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentIndex(0); // Reset to first slide when category changes
  };

  return (
    <div className="bg-[#f7f5ef] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 reveal-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2853] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            Top App Reviews – Handpicked for You
          </h2>
          <p className="text-lg text-gray-600">
            Discover the most popular and highly-rated AI applications
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 reveal-fade-up">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${activeCategory === category.id
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
        <div className="relative reveal-fade">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-[#1F2853]/80 backdrop-blur-sm text-white p-3 rounded-full hover:bg-[#1F2853] transition-all cursor-pointer"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-arrow-left-line text-xl"></i>
            </div>
          </button>

          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-[#1F2853]/80 backdrop-blur-sm text-white p-3 rounded-full hover:bg-[#1F2853] transition-all cursor-pointer"
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {currentApps
                      .slice(slideIndex * cardsPerView, (slideIndex + 1) * cardsPerView)
                      .map((app, index) => (
                        <div
                          key={app.name}
                          className="bg-white/90 backdrop-blur-md border border-white/20 rounded-xl p-5 md:p-6 hover:bg-white/95 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
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
                          <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                            <img
                              src={app.logo}
                              alt={`${app.name} logo`}
                              className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-0.5 md:mb-1">{app.name}</h3>
                              <p className="text-[#1F2853] text-xs md:text-sm font-medium mb-1.5 md:mb-2">{app.category}</p>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <div key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 flex items-center justify-center">
                                      <i className={`ri-star-${i < Math.floor(app.rating) ? 'fill' : i < app.rating ? 'half-fill' : 'line'} text-yellow-400 text-xs md:text-sm`}></i>
                                    </div>
                                  ))}
                                </div>
                                <span className="text-gray-900 text-xs md:text-sm font-medium">{app.rating}</span>
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-600 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed">
                            {app.description}
                          </p>

                          {/* View Details Button */}
                          <button className="w-full bg-[#b9ed2a] hover:bg-[#a5d426] text-[#1F2853] py-2.5 md:py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
                            View Details
                          </button>
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
                className={`w-3 h-3 rounded-full transition-all cursor-pointer ${index === currentIndex
                    ? 'bg-[#1F2853] scale-125'
                    : 'bg-gray-400 hover:bg-gray-500'
                  }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="bg-[#f25a1a] hover:bg-[#d14815] text-white px-8 py-3 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
            View All Apps
          </button>
        </div>
      </div>
    </div>
  );
}
