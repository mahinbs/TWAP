
import { useState } from 'react';

interface AppRating {
  rank: number;
  name: string;
  description: string;
  shortDescription: string;
  rating: number;
  category: string;
  logo: string;
}

// Import apps from FeaturedApps data structure
const allApps = {
  marketing: [
    {
      name: 'Jasper AI',
      category: 'Content Writing',
      rating: 4.4,
      shortDescription: 'AI-powered content creation for marketers and writers.',
      description: 'AI-powered content creation platform that helps marketers and writers generate high-quality copy, blogs, and marketing materials at scale.',
      logo: 'https://readdy.ai/api/search-image?query=AI%20writing%20tool%20logo%2C%20modern%20text%20editor%20icon%2C%20purple%20and%20white%20color%20scheme%2C%20content%20creation%20symbols%2C%20professional%20writing%20software%20branding%2C%20app%20icon%20style&width=64&height=64&seq=jasper-logo&orientation=squarish'
    },
    {
      name: 'HubSpot AI',
      category: 'Marketing Automation',
      rating: 4.5,
      shortDescription: 'All-in-one marketing platform with AI-powered CRM.',
      description: 'Comprehensive marketing platform with AI-powered lead generation, email marketing, and customer relationship management tools.',
      logo: 'https://readdy.ai/api/search-image?query=Marketing%20automation%20logo%2C%20CRM%20software%20icon%2C%20orange%20and%20blue%20branding%2C%20business%20growth%20symbols%2C%20professional%20marketing%20tools%2C%20app%20icon%20style&width=64&height=64&seq=hubspot-logo&orientation=squarish'
    },
    {
      name: 'Mailchimp AI',
      category: 'Email Marketing',
      rating: 4.3,
      shortDescription: 'AI-enhanced email marketing with automated optimization.',
      description: 'AI-enhanced email marketing platform that optimizes campaigns, personalizes content, and improves engagement rates automatically.',
      logo: 'https://readdy.ai/api/search-image?query=Email%20marketing%20logo%2C%20chimp%20mascot%20icon%2C%20yellow%20and%20blue%20branding%2C%20email%20symbols%2C%20marketing%20automation%20tools%2C%20app%20icon%20style&width=64&height=64&seq=mailchimp-logo&orientation=squarish'
    },
    {
      name: 'Hootsuite AI',
      category: 'Social Media',
      rating: 4.2,
      shortDescription: 'Social media management with AI scheduling and analytics.',
      description: 'Social media management platform with AI-powered content scheduling, analytics, and engagement optimization across multiple platforms.',
      logo: 'https://readdy.ai/api/search-image?query=Social%20media%20management%20logo%2C%20owl%20mascot%20icon%2C%20blue%20and%20orange%20branding%2C%20social%20network%20symbols%2C%20digital%20marketing%20tools%2C%20app%20icon%20style&width=64&height=64&seq=hootsuite-logo&orientation=squarish'
    },
    {
      name: 'Canva AI',
      category: 'Design Marketing',
      rating: 4.4,
      shortDescription: 'AI-powered design tool for marketing graphics and content.',
      description: 'AI-powered design platform that makes creating professional marketing graphics, presentations, and social media content effortless.',
      logo: 'https://readdy.ai/api/search-image?query=Design%20platform%20logo%2C%20creative%20tool%20icon%2C%20colorful%20modern%20branding%2C%20design%20symbols%2C%20user-friendly%20interface%2C%20app%20icon%20style&width=64&height=64&seq=canva-marketing-logo&orientation=squarish'
    },
    {
      name: 'Copy.ai',
      category: 'Copywriting',
      rating: 4.1,
      shortDescription: 'AI copywriting assistant for marketing content generation.',
      description: 'AI copywriting assistant that generates marketing copy, product descriptions, and advertising content for various marketing channels.',
      logo: 'https://readdy.ai/api/search-image?query=AI%20copywriting%20logo%2C%20modern%20text%20icon%2C%20purple%20and%20white%20design%2C%20writing%20symbols%2C%20marketing%20content%20tools%2C%20app%20icon%20style&width=64&height=64&seq=copyai-logo&orientation=squarish'
    }
  ],
  productivity: [
    {
      name: 'Notion AI',
      category: 'Productivity',
      rating: 4.5,
      shortDescription: 'AI-powered workspace for notes, tasks, and team collaboration.',
      description: 'Intelligent workspace that combines notes, tasks, wikis, and databases with AI-powered writing and organization capabilities for teams.',
      logo: 'https://readdy.ai/api/search-image?query=Productivity%20app%20logo%2C%20clean%20modern%20icon%2C%20black%20and%20white%20design%2C%20minimalist%20branding%2C%20workspace%20symbols%2C%20professional%20software%20logo%2C%20app%20icon%20style&width=64&height=64&seq=notion-logo&orientation=squarish'
    },
    {
      name: 'Todoist AI',
      category: 'Task Management',
      rating: 4.3,
      shortDescription: 'AI-powered task manager with project planning and insights.',
      description: 'Smart task manager with AI-powered project planning, deadline suggestions, and productivity insights to optimize your workflow.',
      logo: 'https://readdy.ai/api/search-image?query=Task%20management%20logo%2C%20checklist%20icon%2C%20red%20and%20white%20branding%2C%20productivity%20symbols%2C%20organization%20tools%2C%20app%20icon%20style&width=64&height=64&seq=todoist-logo&orientation=squarish'
    },
    {
      name: 'Calendly AI',
      category: 'Scheduling',
      rating: 4.4,
      shortDescription: 'AI-enhanced scheduling for seamless meeting coordination.',
      description: 'AI-enhanced scheduling platform that automatically finds optimal meeting times and manages calendar coordination effortlessly.',
      logo: 'https://readdy.ai/api/search-image?query=Calendar%20scheduling%20logo%2C%20modern%20calendar%20icon%2C%20blue%20and%20white%20design%2C%20time%20management%20symbols%2C%20appointment%20booking%20tools%2C%20app%20icon%20style&width=64&height=64&seq=calendly-logo&orientation=squarish'
    },
    {
      name: 'Grammarly AI',
      category: 'Writing',
      rating: 4.5,
      shortDescription: 'AI writing assistant for grammar, clarity, and tone improvement.',
      description: 'AI writing assistant that helps improve grammar, clarity, and tone across all your writing platforms with real-time suggestions.',
      logo: 'https://readdy.ai/api/search-image?query=Writing%20tool%20logo%2C%20grammar%20checker%20icon%2C%20green%20and%20white%20design%2C%20text%20editing%20symbols%2C%20professional%20writing%20software%2C%20app%20icon%20style&width=64&height=64&seq=grammarly-logo&orientation=squarish'
    },
    {
      name: 'Slack AI',
      category: 'Communication',
      rating: 4.2,
      shortDescription: 'Team communication with AI message summaries and automation.',
      description: 'Team communication platform enhanced with AI features for message summarization, smart notifications, and workflow automation.',
      logo: 'https://readdy.ai/api/search-image?query=Team%20communication%20logo%2C%20chat%20bubble%20icon%2C%20purple%20and%20white%20branding%2C%20collaboration%20symbols%2C%20workplace%20messaging%20tools%2C%20app%20icon%20style&width=64&height=64&seq=slack-logo&orientation=squarish'
    },
    {
      name: 'Zoom AI',
      category: 'Video Conferencing',
      rating: 4.1,
      shortDescription: 'Video conferencing with AI transcription and smart scheduling.',
      description: 'Video conferencing platform with AI-powered meeting transcription, smart scheduling, and automated follow-up features.',
      logo: 'https://readdy.ai/api/search-image?query=Video%20conferencing%20logo%2C%20camera%20icon%2C%20blue%20and%20white%20design%2C%20meeting%20symbols%2C%20remote%20work%20tools%2C%20app%20icon%20style&width=64&height=64&seq=zoom-logo&orientation=squarish'
    }
  ],
  finance: [
    {
      name: 'QuickBooks AI',
      category: 'Accounting',
      rating: 4.3,
      shortDescription: 'AI-powered accounting software for small business automation.',
      description: 'AI-powered accounting software that automates bookkeeping, expense tracking, and financial reporting for small businesses.',
      logo: 'https://readdy.ai/api/search-image?query=Accounting%20software%20logo%2C%20calculator%20icon%2C%20blue%20and%20green%20branding%2C%20financial%20symbols%2C%20business%20accounting%20tools%2C%20app%20icon%20style&width=64&height=64&seq=quickbooks-logo&orientation=squarish'
    },
    {
      name: 'Mint AI',
      category: 'Personal Finance',
      rating: 4.2,
      shortDescription: 'Personal finance app with AI budgeting and savings insights.',
      description: 'Personal finance management app with AI-driven budgeting insights, spending analysis, and automated savings recommendations.',
      logo: 'https://readdy.ai/api/search-image?query=Personal%20finance%20logo%2C%20money%20management%20icon%2C%20green%20and%20white%20design%2C%20financial%20planning%20symbols%2C%20budgeting%20tools%2C%20app%20icon%20style&width=64&height=64&seq=mint-logo&orientation=squarish'
    },
    {
      name: 'Robinhood AI',
      category: 'Investment',
      rating: 4.1,
      shortDescription: 'Investment platform with AI market analysis and portfolio management.',
      description: 'Investment platform with AI-powered market analysis, automated portfolio management, and intelligent trading recommendations.',
      logo: 'https://readdy.ai/api/search-image?query=Investment%20app%20logo%2C%20stock%20market%20icon%2C%20green%20and%20black%20branding%2C%20trading%20symbols%2C%20financial%20investment%20tools%2C%20app%20icon%20style&width=64&height=64&seq=robinhood-logo&orientation=squarish'
    },
    {
      name: 'Xero AI',
      category: 'Business Finance',
      rating: 4.4,
      shortDescription: 'Cloud-based accounting with AI invoice processing and forecasting.',
      description: 'Cloud-based accounting platform with AI features for automated invoice processing, expense categorization, and financial forecasting.',
      logo: 'https://readdy.ai/api/search-image?query=Business%20accounting%20logo%2C%20modern%20finance%20icon%2C%20blue%20and%20white%20design%2C%20accounting%20symbols%2C%20cloud%20software%20tools%2C%20app%20icon%20style&width=64&height=64&seq=xero-logo&orientation=squarish'
    },
    {
      name: 'PayPal AI',
      category: 'Payments',
      rating: 4.0,
      shortDescription: 'Digital payment platform with AI fraud detection and automation.',
      description: 'Digital payment platform enhanced with AI fraud detection, smart transaction categorization, and automated payment processing.',
      logo: 'https://readdy.ai/api/search-image?query=Digital%20payment%20logo%2C%20PayPal%20icon%2C%20blue%20and%20white%20branding%2C%20payment%20symbols%2C%20financial%20transaction%20tools%2C%20app%20icon%20style&width=64&height=64&seq=paypal-logo&orientation=squarish'
    },
    {
      name: 'TurboTax AI',
      category: 'Tax Preparation',
      rating: 4.2,
      shortDescription: 'AI-enhanced tax software with automated deductions and optimization.',
      description: 'AI-enhanced tax preparation software that automatically finds deductions, optimizes returns, and simplifies tax filing process.',
      logo: 'https://readdy.ai/api/search-image?query=Tax%20preparation%20logo%2C%20tax%20document%20icon%2C%20red%20and%20blue%20branding%2C%20tax%20symbols%2C%20financial%20software%20tools%2C%20app%20icon%20style&width=64&height=64&seq=turbotax-logo&orientation=squarish'
    }
  ],
  design: [
    {
      name: 'Figma AI',
      category: 'Design',
      rating: 4.3,
      shortDescription: 'Collaborative design platform with AI-powered design suggestions.',
      description: 'Collaborative design platform enhanced with AI features for automated design suggestions and intelligent layout optimization for teams.',
      logo: 'https://readdy.ai/api/search-image?query=Design%20tool%20logo%2C%20creative%20software%20icon%2C%20colorful%20modern%20branding%2C%20design%20symbols%2C%20collaborative%20platform%20logo%2C%20geometric%20shapes%2C%20app%20icon%20style&width=64&height=64&seq=figma-logo&orientation=squarish'
    },
    {
      name: 'Adobe AI',
      category: 'Creative Suite',
      rating: 4.6,
      shortDescription: 'Comprehensive creative suite with AI-powered design and editing.',
      description: 'Comprehensive creative suite with AI-powered design tools, automated editing features, and intelligent content generation capabilities.',
      logo: 'https://readdy.ai/api/search-image?query=Adobe%20creative%20logo%2C%20modern%20design%20icon%2C%20red%20and%20black%20branding%2C%20creative%20symbols%2C%20professional%20design%20software%2C%20app%20icon%20style&width=64&height=64&seq=adobe-logo&orientation=squarish'
    },
    {
      name: 'Sketch AI',
      category: 'UI Design',
      rating: 4.2,
      shortDescription: 'Vector-based design tool with AI-enhanced UI/UX features.',
      description: 'Vector-based design tool with AI-enhanced features for UI/UX design, prototyping, and collaborative design workflows.',
      logo: 'https://readdy.ai/api/search-image?query=UI%20design%20tool%20logo%2C%20sketch%20icon%2C%20yellow%20and%20black%20branding%2C%20design%20symbols%2C%20interface%20design%20tools%2C%20app%20icon%20style&width=64&height=64&seq=sketch-logo&orientation=squarish'
    },
    {
      name: 'Midjourney',
      category: 'AI Art',
      rating: 4.6,
      shortDescription: 'AI image generator that creates artwork from text prompts.',
      description: 'Revolutionary AI image generator that creates stunning artwork and designs from text prompts with incredible detail and artistic creativity.',
      logo: 'https://readdy.ai/api/search-image?query=AI%20image%20generation%20tool%20logo%2C%20creative%20artistic%20icon%2C%20colorful%20gradient%20design%2C%20modern%20tech%20branding%2C%20digital%20art%20symbols%2C%20vibrant%20colors%2C%20app%20icon%20style&width=64&height=64&seq=midjourney-design-logo&orientation=squarish'
    },
    {
      name: 'Framer AI',
      category: 'Web Design',
      rating: 4.1,
      shortDescription: 'AI-powered web design platform for responsive websites and prototypes.',
      description: 'AI-powered web design platform that generates responsive websites, interactive prototypes, and modern web experiences from simple inputs.',
      logo: 'https://readdy.ai/api/search-image?query=Web%20design%20tool%20logo%2C%20modern%20website%20icon%2C%20purple%20and%20white%20branding%2C%20web%20development%20symbols%2C%20design%20platform%20tools%2C%20app%20icon%20style&width=64&height=64&seq=framer-logo&orientation=squarish'
    },
    {
      name: 'Canva Pro',
      category: 'Graphic Design',
      rating: 4.4,
      shortDescription: 'Professional design platform with AI graphics and presentations.',
      description: 'Professional design platform with advanced AI features for creating stunning graphics, presentations, and marketing materials.',
      logo: 'https://readdy.ai/api/search-image?query=Graphic%20design%20logo%2C%20creative%20platform%20icon%2C%20colorful%20modern%20branding%2C%20design%20symbols%2C%20professional%20design%20tools%2C%20app%20icon%20style&width=64&height=64&seq=canva-pro-logo&orientation=squarish'
    }
  ]
};

// Flatten all apps and sort by rating (highest first), then add ranks
const getAllApps = (): AppRating[] => {
  const allAppsArray = [
    ...allApps.marketing,
    ...allApps.productivity,
    ...allApps.finance,
    ...allApps.design
  ];

  // Sort by rating (highest first)
  const sortedApps = allAppsArray.sort((a, b) => b.rating - a.rating);

  // Add rank to each app
  return sortedApps.map((app, index) => ({
    rank: index + 1,
    name: app.name,
    description: app.description,
    shortDescription: app.shortDescription,
    rating: app.rating,
    category: app.category,
    logo: app.logo
  }));
};

const mockRatings: AppRating[] = getAllApps();

export default function RatingsLeaderboard() {
  const [showAll, setShowAll] = useState(false);
  const displayedRatings = showAll ? mockRatings : mockRatings.slice(0, 3);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5 sm:gap-1 flex-wrap">
        {[...Array(fullStars)].map((_, i) => (
          <i key={`full-${i}`} className="ri-star-fill text-yellow-400 text-xs sm:text-sm"></i>
        ))}
        {hasHalfStar && <i className="ri-star-half-fill text-yellow-400 text-xs sm:text-sm"></i>}
        {[...Array(emptyStars)].map((_, i) => (
          <i key={`empty-${i}`} className="ri-star-line text-gray-300 text-xs sm:text-sm"></i>
        ))}
        <span className="text-xs sm:text-sm text-gray-600 ml-1 font-medium">{rating}</span>
      </div>
    );
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Leaderboard */}
          <div className="lg:col-span-2 reveal-slide-right">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 h-full">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 font-manrope">
                The Web App Pro Ratings Leaderboard
              </h2>

              <div className="space-y-4 sm:space-y-6">
                {displayedRatings.slice(0, 6).map((app) => (
                  <div key={app.rank} className="flex items-start gap-3 sm:gap-4 lg:gap-6 p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <img
                        src={app.logo}
                        alt={`${app.name} logo`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base sm:text-lg text-gray-900 font-manrope truncate">{app.name}</h3>
                        <p className="text-gray-600 text-xs sm:text-sm font-poppins line-clamp-2 mt-0.5 sm:mt-1">{app.shortDescription}</p>
                      </div>

                      <div className="text-left sm:text-right flex-shrink-0">
                        {renderStars(app.rating)}
                        <span className="text-xs text-gray-500 font-poppins block mt-0.5 sm:mt-1">{app.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 sm:mt-8 text-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors whitespace-nowrap font-poppins text-sm sm:text-base"
                >
                  {showAll ? 'Show Less' : 'View All App Ratings'}
                </button>
              </div>
            </div>
          </div>

          {/* Promote Your App */}
          <div className="mt-6 lg:mt-0 lg:aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden reveal-slide-left">
            <div
              className="rounded-xl sm:rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300 lg:h-full flex flex-col relative p-4 sm:p-5"
              style={{
                background: 'linear-gradient(135deg, rgba(31, 40, 83, 0.95) 0%, rgba(31, 40, 83, 0.85) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 font-manrope">
                Promote Your App with Us
              </h3>
              <p className="text-white/80 text-sm sm:text-base mb-4 sm:mb-6 font-poppins">
                Get featured on the homepage, in our newsletter, and at the top of your category.
              </p>

              {/* 16:9 Image Placeholder */}
              <div className="flex-1 min-h-[180px] sm:min-h-[200px] lg:min-h-[250px] mb-4 sm:mb-3">
                <img
                  src="https://static.readdy.ai/image/19a52a0e7cd11d182286c46a940c9855/3a498c2854159ba8aef56ee2066bbcd2.jpeg"
                  alt="Promote your app"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="mt-auto w-full">
                <button
                  className="w-full text-[#1F2853] py-3 sm:py-4 px-5 sm:px-6 rounded-full font-semibold transition-all duration-300 whitespace-nowrap font-poppins hover:-translate-y-1 hover:shadow-lg text-sm sm:text-base"
                  style={{
                    background: 'linear-gradient(135deg, #b9ed2a 0%, #a5d426 50%, #91bb22 100%)',
                    boxShadow: '0 4px 15px rgba(185, 237, 42, 0.3)'
                  }}
                >
                  Promote My App
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
