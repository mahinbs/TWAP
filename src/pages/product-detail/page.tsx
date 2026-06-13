import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

interface ProductDetail {
  id: string | number;
  name: string;
  rating: number;
  icon: string;
  websiteUrl: string;
  pros: string[];
  cons: string[];
  whyYouWillLoveIt: string;
  description: string;
  tableOfContent?: string[];
  recentTopics?: string[];
}

const productsData: Record<string, ProductDetail> = {
  "1": {
    id: 1,
    name: "Jasper AI",
    rating: 4.8,
    icon: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=64&h=64&q=80",
    websiteUrl: "#",
    pros: [
      "Generates high-quality marketing copy in seconds",
      "Supports 25+ languages for global reach",
      "Integrates with Surfer SEO for optimized content",
      "Variety of templates for different content types",
      "Brand Voice feature maintains consistency"
    ],
    cons: [
      "Can be expensive for small businesses",
      "Requires fact-checking as AI can hallucinate",
      "Long-form content sometimes gets repetitive",
      "Steep learning curve for advanced features",
      "Limited control over specific phrasing"
    ],
    whyYouWillLoveIt: "Jasper AI isn't just another writing tool; it's your creative partner. Whether you need blog posts, social media captions, or ad copy, Jasper adapts to your brand voice and delivers content that converts. Say goodbye to writer's block and hello to scaling your content production effortlessly.",
    description: "Jasper is an advanced AI content platform designed to help marketing and sales teams create high-quality content faster. With its proprietary AI engine, Jasper can write blog posts, social media updates, marketing emails, and more, all while maintaining your brand's unique tone and style.",
    tableOfContent: ["Overview", "Features", "Pricing", "Comparisons", "FAQ"],
    recentTopics: ["Jasper vs Copy.ai", "How to use Brand Voice", "SEO Writing Guide"]
  },
  "2": {
    id: 2,
    name: "Mint",
    rating: 4.6,
    icon: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=64&h=64&q=80",
    websiteUrl: "#",
    pros: [
      "Comprehensive financial overview in one dashboard",
      "Free to use with robust budgeting tools",
      "Automatic categorization of transactions",
      "Credit score monitoring included",
      "Bill payment reminders prevent late fees"
    ],
    cons: [
      "Ads can be intrusive in the dashboard",
      "Customer support options are limited",
      "Syncing issues with certain banks occasionally",
      "Investment tracking is relatively basic",
      "Data selling concerns for privacy-focused users"
    ],
    whyYouWillLoveIt: "Take control of your finances without the spreadsheet headache. Mint brings all your accounts—banks, credit cards, investments—into one view, automatically categorizing your spending so you can see exactly where your money goes. It's the easiest way to budget, track goals, and build wealth.",
    description: "Mint is a personal financial management website and mobile app for the US and Canada. It allows users to track bank, credit card, investment, and loan balances and transactions through a single user interface, as well as create budgets and set financial goals.",
    tableOfContent: ["Getting Started", "Budgeting 101", "Security", "Mobile App"],
    recentTopics: ["Budgeting for Beginners", "Mint vs YNAB", "Improving Credit Score"]
  },
  "3": {
    id: 3,
    name: "Shopify",
    rating: 4.9,
    icon: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&w=64&h=64&q=80",
    websiteUrl: "#",
    pros: [
      "Extremely user-friendly for beginners",
      "Huge app ecosystem to extend functionality",
      "Beautiful, mobile-responsive themes",
      "Reliable hosting and security included",
      "Excellent 24/7 customer support"
    ],
    cons: [
      "Transaction fees if not using Shopify Payments",
      "Theme customization can require coding (Liquid)",
      "App subscriptions can add up quickly",
      "SEO features are good but have limitations",
      "URL structure is somewhat rigid"
    ],
    whyYouWillLoveIt: "Shopify empowers anyone to start an online business. From your first sale to scaling globally, it provides the tools you need to sell online, in-store, and everywhere in between. With its intuitive interface and powerful backend, you can focus on your brand while Shopify handles the tech.",
    description: "Shopify is a complete commerce platform that lets you start, grow, and manage a business. It allows merchants to build an online store, manage inventory, process payments, and fulfill orders, all from a unified dashboard.",
    tableOfContent: ["Store Setup", "Themes", "Payments", "Shipping", "Apps"],
    recentTopics: ["Dropshipping Guide", "Shopify vs WooCommerce", "Marketing Your Store"]
  },
  "4": {
    id: 4,
    name: "Headspace",
    rating: 4.7,
    icon: "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?auto=format&fit=crop&w=64&h=64&q=80",
    websiteUrl: "#",
    pros: [
      "Wide variety of guided meditations",
      "User-friendly and calming interface",
      "Specific tracks for sleep, focus, and anxiety",
      "Short 'SOS' sessions for emergencies",
      "Scientific approach to mindfulness"
    ],
    cons: [
      "Subscription required for most content",
      "Repetitive for long-term advanced users",
      "Gamification elements might distract some",
      "Limited offline functionality without download",
      "Audio-only focus might not suit everyone"
    ],
    whyYouWillLoveIt: "Find your calm amidst the chaos. Headspace makes meditation simple and accessible, teaching you mindfulness skills in just a few minutes a day. Whether you need to sleep better, stress less, or focus more, Headspace has a guided session tailored for you.",
    description: "Headspace is an English-American online healthcare company, specializing in meditation. It was incorporated in London in May 2010. The company mainly operates through its online platform, which provides sessions of guided meditation to its registered users with the goal of mindfulness.",
    tableOfContent: ["Meditation Basics", "Sleep Sounds", "Focus Music", "Kids Meditation"],
    recentTopics: ["Stress Relief", "Better Sleep Habits", "Mindfulness at Work"]
  },
  "5": {
    id: 5,
    name: "Canva",
    rating: 4.9,
    icon: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=64&h=64&q=80",
    websiteUrl: "#",
    pros: [
      "Incredibly easy to use drag-and-drop interface",
      "Massive library of templates and stock assets",
      "Collaborative features for teams",
      "Brand Kit keeps designs consistent",
      "Magic Resize saves time for social media"
    ],
    cons: [
      "Professional features locked behind Pro plan",
      "Export options can be limited for print",
      "Designs can look generic if templates aren't customized",
      "Mobile app can be fiddly compared to desktop",
      "Limited vector editing capabilities"
    ],
    whyYouWillLoveIt: "Design made simple for everyone. Canva democratizes design, allowing you to create professional-looking graphics, presentations, and videos without any design experience. With thousands of templates and intuitive tools, you can bring your ideas to life in minutes.",
    description: "Canva is an Australian graphic design platform, used to create social media graphics, presentations, posters, documents and other visual content. The app includes templates for users to use. The platform is free to use and offers paid subscriptions like Canva Pro and Canva for Enterprise for additional functionality.",
    tableOfContent: ["Templates", "Design Tools", "Collaboration", "Brand Kit"],
    recentTopics: ["Social Media Design", "Presentation Tips", "Video Editing in Canva"]
  },
  "6": {
    id: 6,
    name: "Duolingo",
    rating: 4.5,
    icon: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=64&h=64&q=80",
    websiteUrl: "#",
    pros: [
      "Gamified learning makes it addictive and fun",
      "Completely free to access all courses",
      "Bite-sized lessons fit into any schedule",
      "Immediate feedback on exercises",
      "Large variety of languages available"
    ],
    cons: [
      "Can feel repetitive at higher levels",
      "Grammar explanations are sometimes lacking",
      "Hearts system can be frustrating for free users",
      "Focuses more on translation than conversation",
      "Text-to-speech audio can sound robotic"
    ],
    whyYouWillLoveIt: "Learning a language has never been this fun. Duolingo turns language learning into a game, keeping you motivated with streaks, rewards, and bite-sized lessons. Whether you're a beginner or looking to brush up, Duolingo makes consistent practice easy and enjoyable.",
    description: "Duolingo is an American educational technology company which produces learning apps and provides language certification. Its main app, Duolingo, offers courses on music, math and over 40 languages, ranging from English, French, and Spanish to less commonly studied languages such as Welsh, Irish, and Swahili.",
    tableOfContent: ["Methodology", "Courses", "Duolingo Plus", "Schools"],
    recentTopics: ["Language Learning Tips", "Travel Preparation", "Daily Practice Routine"]
  },
  "7": {
    id: 7,
    name: "Notion",
    rating: 4.8,
    icon: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=64&h=64&q=80",
    websiteUrl: "#",
    pros: [
      "Extremely flexible all-in-one workspace",
      "Powerful database and organization features",
      "Clean, distraction-free writing interface",
      "Strong community and template ecosystem",
      "Cross-platform synchronization"
    ],
    cons: [
      "Steep learning curve for new users",
      "Mobile app can be slow to load",
      "Offline mode is limited",
      "Search function could be improved",
      "Formatting can be tricky on mobile"
    ],
    whyYouWillLoveIt: "Your all-in-one workspace for everything. Notion blends notes, docs, tasks, and wikis into one customizable platform. Whether you're organizing your personal life or managing a team project, Notion adapts to your workflow, giving you the freedom to build your own systems.",
    description: "Notion is a freemium productivity and note-taking web application developed by Notion Labs Inc. It offers organizational tools including task management, project tracking, to-do lists, bookmarking, and more.",
    tableOfContent: ["Getting Started", "Databases", "Templates", "Team Collaboration"],
    recentTopics: ["Building a Second Brain", "Project Management", "Notion for Students"]
  }
};

// Fallback for unknown IDs (using Brave as the default/fallback example)
const defaultProduct: ProductDetail = {
  id: "0",
  name: "Brave",
  rating: 4.5,
  icon: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Brave_lion_icon.svg",
  websiteUrl: "#",
  pros: [
    "Built-in Leo AI assistant answers queries in real-time",
    "Highly privacy-focused with ad and tracker blocking",
    "Earn crypto rewards for viewing privacy-respecting ads",
    "Fast, lightweight, and open-source",
    "Offers on-device AI processing for better security"
  ],
  cons: [
    "An AI assistant can sometimes feel like a separate add-on",
    "Some features, like Leo Pro, are locked behind a paywall",
    "Crypto integration may feel unnecessary for some users",
    "Fewer extensions are available compared to Chrome or Edge",
    "UI feels restrictive and offers fewer customization options"
  ],
  whyYouWillLoveIt: "Tired of browsers that feel sluggish or make you compromise on your privacy? Brave is different. It's the only browser that bundles a powerful, privacy-preserving AI assistant, Leo, directly into its core. Experience lightning-fast browsing, robust ad blocking, and intelligent web interaction, all without giving up your data. This is how you reclaim your privacy rights.",
  description: "Brave is a free and open-source web browser developed by Brave Software, Inc. based on the Chromium web browser. Brave allows users to navigate to websites, run web applications and display online content. Like other web browsers, it is free to download and use, remembers site authentication information and can block online advertisements from appearing on sites.",
  tableOfContent: ["Privacy Features", "Brave Rewards", "Leo AI", "Comparison"],
  recentTopics: ["Web 3.0 Browsing", "Ad Blocking Guide", "Crypto Wallets"]
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = (id && productsData[id]) ? productsData[id] : defaultProduct;

  // State for collapsible sections
  const [isMoreOpen, setIsMoreOpen] = useState(true);
  const [isTableContentOpen, setIsTableContentOpen] = useState(true);
  const [isRecentTopicsOpen, setIsRecentTopicsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#fffbf5] font-['Poppins']">
      <Header />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column - Main Content */}
            <div className="lg:col-span-8">
              {/* Product Header */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-orange-50 flex items-center justify-center p-2 overflow-hidden">
                      <img 
                        src={product.icon} 
                        alt={product.name} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2853] font-['Manrope'] mb-2">
                        {product.name}
                      </h1>
                      <div className="flex items-center gap-2">
                        <div className="flex text-[#FFD700] text-lg">
                          {[...Array(5)].map((_, i) => (
                            <i 
                              key={i} 
                              className={i < Math.floor(product.rating) ? "ri-star-fill" : (i < product.rating ? "ri-star-half-fill" : "ri-star-line")}
                            ></i>
                          ))}
                        </div>
                        <span className="font-semibold text-gray-700">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                  <a 
                    href={product.websiteUrl}
                    className="w-full sm:w-auto bg-[#E50914] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#c40812] transition-colors text-center shadow-lg shadow-red-200"
                  >
                    Visit Website
                  </a>
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8">
                <h2 className="text-xl font-bold text-[#1F2853] mb-6 font-['Manrope']">Pros & Cons</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Pros */}
                  <div>
                    <div className="bg-[#E8F5E9] px-4 py-2 rounded-t-lg border-l-4 border-[#4CAF50] mb-4">
                      <span className="font-bold text-[#2E7D32]">Pros</span>
                    </div>
                    <ul className="space-y-4">
                      {product.pros.map((pro, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full border border-[#4CAF50] flex items-center justify-center mt-0.5 flex-shrink-0 text-[#4CAF50]">
                            <i className="ri-thumb-up-fill text-xs"></i>
                          </div>
                          <span className="text-sm text-gray-600 leading-relaxed">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
                  <div>
                    <div className="bg-[#FFEBEE] px-4 py-2 rounded-t-lg border-l-4 border-[#EF5350] mb-4">
                      <span className="font-bold text-[#C62828]">Cons</span>
                    </div>
                    <ul className="space-y-4">
                      {product.cons.map((con, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full border border-[#EF5350] flex items-center justify-center mt-0.5 flex-shrink-0 text-[#EF5350]">
                            <i className="ri-thumb-down-fill text-xs"></i>
                          </div>
                          <span className="text-sm text-gray-600 leading-relaxed">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Why You'll Love It */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8">
                <h2 className="text-xl font-bold text-[#1F2853] mb-4 font-['Manrope']">Why You'll Love It</h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {product.whyYouWillLoveIt}
                </p>
              </div>

              {/* More about product - Collapsible */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 overflow-hidden transition-all duration-300">
                <div 
                  className="flex items-center justify-between cursor-pointer group"
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                >
                  <h2 className="text-xl font-bold text-[#1F2853] font-['Manrope']">More about product</h2>
                  <i className={`ri-arrow-down-s-line text-2xl text-gray-400 group-hover:text-[#f25a1a] transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`}></i>
                </div>
                
                <div className={`grid transition-all duration-300 ease-in-out ${isMoreOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                  <div className="overflow-hidden">
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Table of Content Widget - Collapsible */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 overflow-hidden">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setIsTableContentOpen(!isTableContentOpen)}
                >
                  <span className="font-bold text-[#1F2853]">Table of Content</span>
                  <i className={`ri-arrow-down-s-line text-gray-500 transition-transform duration-300 ${isTableContentOpen ? 'rotate-180' : ''}`}></i>
                </div>
                
                <div className={`grid transition-all duration-300 ease-in-out ${isTableContentOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                  <div className="overflow-hidden">
                    <ul className="space-y-2 text-sm text-gray-600">
                      {product.tableOfContent?.map((item, index) => (
                        <li key={index} className="hover:text-[#f25a1a] cursor-pointer transition-colors flex items-center gap-2">
                          <i className="ri-arrow-right-s-line text-xs text-gray-400"></i>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Recent Topics Widget - Collapsible */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 overflow-hidden">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setIsRecentTopicsOpen(!isRecentTopicsOpen)}
                >
                  <span className="font-bold text-[#1F2853]">Recent Topics</span>
                  <i className={`ri-arrow-down-s-line text-gray-500 transition-transform duration-300 ${isRecentTopicsOpen ? 'rotate-180' : ''}`}></i>
                </div>

                <div className={`grid transition-all duration-300 ease-in-out ${isRecentTopicsOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                  <div className="overflow-hidden">
                    <ul className="space-y-2 text-sm text-gray-600">
                      {product.recentTopics?.map((topic, index) => (
                        <li key={index} className="hover:text-[#f25a1a] cursor-pointer transition-colors flex items-center gap-2">
                          <i className="ri-hashtag text-xs text-gray-400"></i>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Product of the Month Banner */}
              <div className="rounded-3xl overflow-hidden relative aspect-square group cursor-pointer shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80" 
                  alt="Product of the Month" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="bg-white/20 backdrop-blur-md self-start px-3 py-1 rounded-lg text-xs font-bold mb-2 border border-white/30 transform -rotate-2">
                    PRODUCT OF THE MONTH
                  </div>
                  <h3 className="text-2xl font-bold mb-4">The Ultimate AI Assistant</h3>
                  <button className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm w-fit flex items-center gap-2 hover:bg-gray-100 transition-colors">
                    Know More
                    <i className="ri-arrow-right-line"></i>
                  </button>
                </div>
              </div>

              {/* Feature Your Product CTA */}
              <button className="w-full bg-[#E50914] text-white py-4 rounded-2xl font-bold hover:bg-[#c40812] transition-colors shadow-lg shadow-red-200 hover:shadow-xl hover:scale-[1.02] duration-300">
                Feature Your Product
              </button>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
