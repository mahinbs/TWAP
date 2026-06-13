import { useState } from "react";
import Header from "../../components/feature/Header";
import Footer from "../../components/feature/Footer";
import { Link } from "react-router-dom";
import ProductReviewsSlider from "../../components/feature/ProductReviewsSlider";

const categories = [
  { name: "All", subCategories: [] },
  {
    name: "Finance",
    subCategories: ["Personal Finance", "Investing", "Budgeting", "Crypto"],
  },
  {
    name: "Artificial Intelligence",
    subCategories: ["Generative AI", "Chatbots", "ML Tools", "Data Analysis"],
  },
  {
    name: "Healthcare",
    subCategories: ["Telemedicine", "Wellness", "Fitness", "Medical Records"],
  },
  {
    name: "Ecommerce",
    subCategories: ["Shopping", "Payments", "Logistics", "Marketing"],
  },
  {
    name: "Social Media",
    subCategories: [
      "Analytics",
      "Management",
      "Content Creation",
      "Networking",
    ],
  },
  {
    name: "Art & Design",
    subCategories: ["Graphic Design", "Video Editing", "3D Modeling", "UI/UX"],
  },
  {
    name: "Education",
    subCategories: [
      "LMS",
      "Language Learning",
      "Study Tools",
      "Online Courses",
    ],
  },
];

const moreCategories = [
  {
    name: "Productivity",
    subCategories: ["Task Management", "Notes", "Calendar"],
  },
  { name: "Developer Tools", subCategories: ["IDEs", "Testing", "Deployment"] },
  {
    name: "Security",
    subCategories: ["Antivirus", "VPN", "Password Managers"],
  },
];

const allProducts = [
  {
    id: 1,
    name: "Jasper AI",
    category: "Artificial Intelligence",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=400&q=80",
    platform: "Web App",
  },
  {
    id: 2,
    name: "Mint",
    category: "Finance",
    image:
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=400&q=80",
    platform: "Mobile App",
  },
  {
    id: 3,
    name: "Shopify",
    category: "Ecommerce",
    image:
      "https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&w=400&q=80",
    platform: "Web App",
  },
  {
    id: 4,
    name: "Headspace",
    category: "Healthcare",
    image:
      "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?auto=format&fit=crop&w=400&q=80",
    platform: "Mobile App",
  },
  {
    id: 5,
    name: "Canva",
    category: "Art & Design",
    image:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=400&q=80",
    platform: "Web App",
  },
  {
    id: 6,
    name: "Duolingo",
    category: "Education",
    image:
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=400&q=80",
    platform: "Mobile App",
  },
  {
    id: 7,
    name: "Notion",
    category: "Productivity",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=400&q=80",
    platform: "Software",
  },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubCategory, setActiveSubCategory] = useState("All");
  const [activePlatform, setActivePlatform] = useState("All");
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const currentCategoryData = [...categories, ...moreCategories].find(
    (c) => c.name === activeCategory
  );
  const subCategories = currentCategoryData
    ? ["All", ...currentCategoryData.subCategories]
    : ["All"];

  const filteredProducts = allProducts.filter((product) => {
    const categoryMatch =
      activeCategory === "All" || product.category === activeCategory;
    // Note: Sub-category filtering logic would go here if products had sub-categories
    const platformMatch =
      activePlatform === "All" || product.platform === activePlatform;
    return categoryMatch && platformMatch;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="">
        {/* Banner Section */}
        <section className="relative bg-gradient-to-r from-[#1B1B36] to-[#56122D] py-20 overflow-hidden">
          {/* Abstract Background Shapes */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            {/* Left Star/Shape */}
            <div className="absolute -left-20 top-1/2 -translate-y-1/2">
              <svg
                className="animate-[spin_12s_linear_infinite] w-96 h-96 text-white/5"
                viewBox="0 0 200 200"
                fill="currentColor"
              >
                <path d="M100 0 L130 70 L200 80 L150 130 L160 200 L100 170 L40 200 L50 130 L0 80 L70 70 Z" />
              </svg>
            </div>
            {/* Right Star/Shape */}
            <div className="absolute -right-20 top-0">
              <svg
                className="animate-[spin_8s_linear_infinite] w-80 h-80 text-white/5 rotate-45"
                viewBox="0 0 200 200"
                fill="currentColor"
              >
                <path d="M100 0 L130 70 L200 80 L150 130 L160 200 L100 170 L40 200 L50 130 L0 80 L70 70 Z" />
              </svg>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white pt-24">
            {/* Breadcrumbs */}
            <div className="flex justify-center items-center gap-2 text-sm font-medium text-white/80 mb-6 font-['Manrope']">
              <span>Home</span>
              <span className="text-xs">›</span>
              <span>Products</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-['Manrope']">
              Premium AI Tools & Software Collection
            </h1>

            {/* Subtitle */}
            <p className="max-w-3xl mx-auto text-base md:text-lg text-white/90 leading-relaxed font-['Poppins']">
              Explore our comprehensive directory of top-rated AI applications
              and web tools. From productivity automation to creative design
              suites, find the perfect software to elevate your digital
              workflow.
            </p>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-[#f8f9fa]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1F2853] mb-8 font-['Manrope']">
              Featured Products
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Product of the Month */}
              <div className="lg:col-span-7 relative group overflow-hidden rounded-3xl bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] text-white shadow-xl min-h-[400px] flex flex-col justify-between p-8 md:p-12">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                  <div className="absolute right-0 top-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute left-0 bottom-0 w-64 h-64 bg-black rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                </div>

                <div className="relative z-10">
                  <div className="inline-block border-4 border-white/20 p-1 mb-6 -rotate-2">
                    <div className="bg-white text-[#4f46e5] px-4 py-1 font-black text-xl md:text-2xl uppercase tracking-tighter font-['Inter'] transform -rotate-1">
                      Product of
                      <br />
                      the Month
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold mb-2 font-['Manrope']">
                    Lumina AI
                  </h3>
                  <p className="text-white/80 max-w-md mb-8">
                    The next generation of creative image synthesis and editing.
                  </p>

                  <button className="bg-white text-[#4f46e5] px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors w-fit group-hover:scale-105 duration-300">
                    <Link to="/product-review" className="flex items-center gap-2">
                      Know More
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </Link>
                  </button>
                </div>

                {/* Phone Mockup Image (Absolute positioned) */}
                <div className="absolute right-[-20px] bottom-[-40px] md:right-0 md:bottom-[-20px] w-1/2 md:w-[45%] transition-transform duration-500 group-hover:translate-y-[-10px]">
                  <img
                    src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=600&q=80"
                    alt="App Screenshot"
                    className="rounded-[2rem] border-[8px] border-gray-900 shadow-2xl rotate-[-5deg]"
                  />
                </div>
              </div>

              {/* Right Column: Product List */}
              <div className="lg:col-span-5 bg-white rounded-3xl shadow-lg border border-gray-100 p-2">
                <div className="flex flex-col h-full">
                  {[
                    {
                      name: "Jasper AI",
                      category: "Content Creation",
                      icon: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=64&h=64&q=80",
                      platforms: ["apple", "android", "web"],
                    },
                    {
                      name: "Midjourney",
                      category: "Art & Design",
                      icon: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=64&h=64&q=80",
                      platforms: ["apple", "android", "web"],
                    },
                    {
                      name: "Notion AI",
                      category: "Productivity",
                      icon: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=64&h=64&q=80",
                      platforms: ["apple", "android", "web"],
                    },
                    {
                      name: "Synthesia",
                      category: "Video Generation",
                      icon: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=64&h=64&q=80",
                      platforms: ["apple", "android", "web"],
                    },
                  ].map((product, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors rounded-xl ${index !== 3 ? "border-b border-gray-100" : ""
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={product.icon}
                          alt={product.name}
                          className="w-12 h-12 rounded-xl object-cover shadow-sm"
                        />
                        <div>
                          <h4 className="font-bold text-[#1F2853] text-lg font-['Manrope']">
                            {product.name}
                          </h4>
                          <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">
                            {product.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-gray-400">
                        <i className="ri-apple-fill text-xl hover:text-black transition-colors cursor-pointer"></i>
                        <i className="ri-android-fill text-xl hover:text-[#3DDC84] transition-colors cursor-pointer"></i>
                        <i className="ri-global-line text-xl hover:text-blue-500 transition-colors cursor-pointer"></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Listing Section */}
        <section className="bg-white pb-20">
          {/* Filter Bar */}
          <div className="bg-black text-white sticky top-24 z-40 h-fit overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-14">
                <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => {
                        setActiveCategory(category.name);
                        setActiveSubCategory("All");
                      }}
                      className={`px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeCategory === category.name
                          ? "border-[#f25a1a] text-white"
                          : "border-transparent text-gray-400 hover:text-white"
                        }`}
                    >
                      {category.name}
                    </button>
                  ))}

                  {/* More Dropdown */}
                  {/* <div
                                        className="relative h-full flex items-center"
                                        onMouseEnter={() => setIsMoreOpen(true)}
                                        onMouseLeave={() => setIsMoreOpen(false)}
                                    >
                                        <button className={`px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 border-transparent text-gray-400 hover:text-white flex items-center gap-1 ${isMoreOpen ? 'text-white' : ''}`}>
                                            More ({moreCategories.length}) <i className="ri-arrow-down-s-fill"></i>
                                        </button>

                                        {isMoreOpen && (
                                            <div className="absolute top-full right-0 w-48 bg-gray-900 rounded-b-lg shadow-xl border-t border-gray-800 py-2 z-50">
                                                {moreCategories.map((category) => (
                                                    <button
                                                        key={category.name}
                                                        onClick={() => {
                                                            setActiveCategory(category.name);
                                                            setActiveSubCategory('All');
                                                            setIsMoreOpen(false);
                                                        }}
                                                        className="block w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800"
                                                    >
                                                        {category.name}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Sub-Filters & Results */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Sub-Categories */}
            <div className="flex flex-wrap gap-2 mb-8">
              {subCategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setActiveSubCategory(sub)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${activeSubCategory === sub
                      ? "bg-[#f25a1a]/10 border-[#f25a1a] text-[#f25a1a]"
                      : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                >
                  {sub}
                </button>
              ))}
            </div>

            {/* Results Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <h3 className="text-xl font-bold text-[#1F2853] font-['Manrope']">
                All Products in {activeCategory}{" "}
                <span className="text-gray-500 font-normal">
                  ({filteredProducts.length} results)
                </span>
              </h3>

              <div className="flex items-center gap-4 text-sm">
                <span className="font-medium text-gray-700">Platforms:</span>
                <div className="flex gap-2">
                  {["All", "Mobile App", "Web App", "Software"].map(
                    (platform) => (
                      <button
                        key={platform}
                        onClick={() => setActivePlatform(platform)}
                        className={`px-3 py-1 rounded transition-colors ${activePlatform === platform
                            ? "text-[#f25a1a] font-bold underline decoration-2 underline-offset-4"
                            : "text-gray-500 hover:text-gray-900"
                          }`}
                      >
                        {platform}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className="relative mb-4 overflow-hidden rounded-xl bg-gray-100"
                    style={{ aspectRatio: "4/3" }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-[#1F2853] shadow-sm">
                      {product.platform}
                    </div>
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-xs font-medium text-[#f25a1a] bg-[#f25a1a]/5 px-2 py-1 rounded mb-2 inline-block">
                        {product.category}
                      </span>
                      <Link to={`/products/${product.id}`}>
                        <h4 className="font-bold text-[#1F2853] text-lg font-['Manrope'] hover:text-[#f25a1a]">
                          {product.name}
                        </h4>
                      </Link>
                    </div>
                  </div>
                  {/* <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                                        Discover how {product.name} can transform your workflow with its advanced AI capabilities.
                                    </p> */}
                </div>
              ))}

              {/* Promo Card */}
              <div className="bg-[#fdf6f3] rounded-2xl p-6 flex flex-col justify-center items-center text-center border border-[#f25a1a]/10">
                <div className="w-16 h-16 bg-[#f25a1a]/10 rounded-full flex items-center justify-center mb-4 text-[#f25a1a]">
                  <i className="ri-award-fill text-3xl"></i>
                </div>
                <h4 className="font-bold text-[#1F2853] text-lg mb-2 font-['Manrope']">
                  Give Your Product The Spotlight It Deserves
                </h4>
                <ul className="text-sm text-gray-600 space-y-2 mb-6 text-left w-full px-4">
                  <li className="flex items-center gap-2">
                    <i className="ri-checkbox-circle-fill text-[#f25a1a]"></i>{" "}
                    Get higher app downloads
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="ri-checkbox-circle-fill text-[#f25a1a]"></i>{" "}
                    Generate product demo leads
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="ri-checkbox-circle-fill text-[#f25a1a]"></i>{" "}
                    Expand brand reach
                  </li>
                </ul>
                <button className="bg-[#1F2853] text-white px-6 py-3 rounded-full font-bold hover:bg-[#162040] transition-colors w-full shadow-lg shadow-[#1F2853]/20">
                  Submit Product
                </button>
              </div>
            </div>
          </div>
        </section>

        <ProductReviewsSlider />

        {/* Get Rewarded Section */}
        <section className="bg-[#fffbf5] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 font-['Manrope']">
                Get rewarded by reviewing!
              </h2>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl">
                Review & rate upto 50 apps a week and get access to premium app
                memberships!
              </p>
              <button className="bg-[#f25a1a] text-white px-8 py-3 rounded-full font-bold hover:bg-[#d94d15] transition-colors shadow-lg">
                Know More
              </button>
            </div>
          </div>
        </section>

        {/* Trust Indicators Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-4 font-['Manrope'] uppercase tracking-tight">
              Why Users Trust Our Reviews
            </h2>
            <p className="text-lg text-gray-600 mb-16 font-['Poppins']">
              Everything you need to choose the right app, in one place.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {[
                { number: "200+", label: "Apps Reviewed" },
                { number: "50+", label: "Founders Trust us" },
                { number: "500+", label: "Hours of Testing" },
                { number: "12+", label: "Categories Available" },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative w-36 h-36 md:w-40 md:h-40 flex items-center justify-center mb-4 group">
                    {/* Outer decorative ring representing laurel/wreath */}
                    <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-[#D4AF37]/40 animate-[spin_10s_linear_infinite]"></div>

                    {/* Main Badge Circle */}
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#FFF9E5] to-[#FFF] border-[3px] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)] flex items-center justify-center transform transition-transform duration-300 group-hover:scale-105">
                      {/* Inner detailed ring */}
                      <div className="absolute inset-1 rounded-full border border-[#D4AF37]/30"></div>

                      <div className="flex flex-col items-center justify-center z-10 px-2">
                        <span className="text-2xl md:text-3xl font-black text-[#1F2853] font-['Manrope'] mb-1">
                          {item.number}
                        </span>
                        <span className="text-xs md:text-sm font-bold text-[#D4AF37] uppercase tracking-tight leading-tight font-['Manrope'] max-w-[100px]">
                          {item.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto text-gray-600 space-y-3 font-['Poppins'] leading-relaxed text-base md:text-lg">
              <p>
                New tools are reviewed and added every week, keeping our library
                always fresh. We re-evaluate top apps monthly to ensure ratings
                stay accurate and relevant
              </p>
              <p>
                Join a growing community with{" "}
                <span className="font-bold text-[#1F2853]">10,000+</span> votes
                cast on favorite AI tools.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
