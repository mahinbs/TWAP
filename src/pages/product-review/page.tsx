import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

export default function ProductReviewPage() {
  const product = {
    name: "Seat Maker",
    category: "Lifestyle",
    type: "app", // 'app' | 'website'
    rating: 5.0,
    designRating: "A+",
    functionalityRating: 4.5,
    icon: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Brave_lion_icon.svg", // Placeholder
    image: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1200&q=80",
    reviewTitle: "Seat Maker Review | Is This the ONLY Seat Chart App You'll Ever Need?",
    content: [
      "While planning an event, be it a wedding, a summit, or even a big group dinner with friends, the most dreaded part of the planning is often the seating chart. It's often the last, most frustrating puzzle piece, turning celebration into a headache. I have experienced this firsthand, supervising an event planner for our annual party. We have spent so much effort on spreadsheets, trying to avoid putting rivals at the same table, and this was no less than a nightmare!",
      "While searching for \"easy ways to overcome the seating chart problem,\" I came across the Seat Maker app and decided to use it. For this annual party with over 300 attendees, what used to take me hours, I managed in a fraction of the time, all from my iPad. The drag-and-drop felt like magic, transforming the most stressful part of event planning.",
      "If you've ever wrestled with seating assignments, you're in the right place. In this Seat Maker app review, we're diving deep to see if it can finally end your seating chart struggles!"
    ],
    pros: [
      "Effortless design with drag-and-drop functionality for guests and tables",
      "Supports round, square, or rectangular tables and allows for customization of table names, colors, and seating styles",
      "Supports an unlimited number of tables and guests, suitable for events of any size",
      "Works completely offline with no account, login, or internet connection required, ensuring data privacy",
      "Features an option to shuffle seating arrangements as per the users' convenience",
      "Seating plans can be easily shared via QR code, Messages, or email"
    ],
    cons: [
      "Currently available only on iPhone (iOS), limiting access for Android users or those who prefer desktop",
      "No mention of integration with other event management platforms or guest list software, which might require manual data entry"
    ],
    metadata: {
      version: "2.4.0",
      size: "45 MB",
      lastUpdate: "2 days ago",
      license: "Free"
    },
    standoutFeatures: [
      {
        title: "1. Intuitive Drag-and-Drop Interface",
        description: "This feature is where the magic of easy event planning truly begins. Forget complex software or endless manual adjustments; Seat Maker allows you to effortlessly design your event space. You can visually drag and drop tables and guests into position directly on your screen."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#fffdfb] font-['Poppins']">
      <Header />
      <main className="pt-44 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top Header Section */}
          {/* New Hero Section - Dashboard Style */}
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

              {/* Left Column: Profile Card */}
              <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center relative overflow-hidden h-full min-h-[500px]">
                {/* Decorative Background */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-orange/5 via-white to-white z-0" />
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-orange/20 to-transparent" />

                {/* Content Container */}
                <div className="relative z-10 w-full flex flex-col h-full">

                  {/* Top Section */}
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-[2rem] p-1.5 bg-white shadow-xl shadow-brand-dark/5 mb-6 border border-gray-100 relative group cursor-pointer">
                      <div className="w-full h-full rounded-[1.7rem] overflow-hidden bg-gray-50 relative">
                        <img src={product.icon} alt={product.name} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-brand-lime border-4 border-white rounded-full flex items-center justify-center shadow-sm">
                        <i className="ri-check-line text-white text-sm font-bold"></i>
                      </div>
                    </div>

                    <h1 className="text-3xl font-extrabold text-brand-dark font-['Manrope'] mb-2 tracking-tight">{product.name}</h1>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dark/5 border border-brand-dark/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse"></span>
                      <span className="text-xs font-bold text-brand-dark/60 uppercase tracking-widest">{product.category}</span>
                    </div>
                  </div>

                  {/* Middle Section (Stats) */}
                  <div className="flex-1 flex items-center justify-center w-full py-8">
                    <div className="grid grid-cols-2 gap-8 w-full">
                      <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 border border-gray-100 group hover:border-brand-orange/20 transition-colors">
                        <span className="text-3xl font-extrabold text-brand-dark mb-1 group-hover:text-brand-orange transition-colors">{product.designRating}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Design</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 border border-gray-100 group hover:border-brand-orange/20 transition-colors">
                        <span className="text-3xl font-extrabold text-brand-dark mb-1 group-hover:text-brand-orange transition-colors">{product.functionalityRating}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Functionality</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section (Action or Metadata) */}
                  <div className="mt-auto w-full">
                    {product.type === 'website' ? (
                      <div className="space-y-3">
                        <button className="w-full bg-brand-dark text-white py-4 rounded-2xl font-bold text-sm hover:bg-black transition-all shadow-lg shadow-brand-dark/10 flex items-center justify-center gap-2 group">
                          <span>Visit Website</span>
                          <i className="ri-arrow-right-up-line group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
                        </button>
                        <p className="text-[10px] text-gray-400 font-medium">Locked & Secure Connection</p>
                      </div>
                    ) : (
                      <div className="w-full bg-gray-50 rounded-2xl p-4 border border-gray-100">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Version</span>
                            <span className="block text-sm font-bold text-brand-dark">{product.metadata.version}</span>
                          </div>
                          <div className="text-center border-l border-gray-200">
                            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Size</span>
                            <span className="block text-sm font-bold text-brand-dark">{product.metadata.size}</span>
                          </div>
                          <div className="text-center border-t border-gray-200 pt-3">
                            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Last Update</span>
                            <span className="block text-sm font-bold text-brand-dark">{product.metadata.lastUpdate}</span>
                          </div>
                          <div className="text-center border-t border-l border-gray-200 pt-3">
                            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">License</span>
                            <span className="block text-sm font-bold text-brand-dark">{product.metadata.license}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>


              {/* Right Column: Content Grid */}
              <div className="lg:col-span-8 flex flex-col gap-6">

                {/* Top Row: Ratings & Downloads */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Rating Card */}
                  <div className={`bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center relative overflow-hidden group ${product.type !== 'app' ? 'md:col-span-2' : ''}`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-lime/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    <h3 className="text-xl font-bold text-brand-dark font-['Manrope'] mb-1">TheWebAppPro</h3>
                    <div className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.2em] mb-6 border-b border-brand-orange/20 pb-1">Certified Rating</div>

                    <div className="flex items-baseline justify-center gap-2 mb-3">
                      <span className="text-5xl font-extrabold text-brand-dark tracking-tighter">4.1</span>
                      <span className="text-lg text-gray-400 font-medium font-['Manrope']">/ 5</span>
                    </div>

                    <div className="flex gap-1.5 mb-8">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="relative">
                          <i className="ri-star-fill text-brand-orange text-xl drop-shadow-sm"></i>
                        </div>
                      ))}
                      <i className="ri-star-fill text-gray-200 text-xl"></i>
                    </div>

                    <div className="w-full bg-gray-50 rounded-xl p-3 flex items-center justify-center gap-4 border border-gray-100">
                      <div className="flex items-center gap-1.5 opacity-50 grayscale hover:grayscale-0 transition-all cursor-help">
                        <i className="ri-android-fill text-brand-dark"></i>
                        <span className="text-xs font-bold text-brand-dark">Android</span>
                      </div>
                      <div className="w-px h-4 bg-gray-200"></div>
                      <div className="flex items-center gap-1.5 opacity-50 grayscale hover:grayscale-0 transition-all cursor-help">
                        <i className="ri-apple-fill text-brand-dark"></i>
                        <span className="text-xs font-bold text-brand-dark">iOS</span>
                      </div>
                    </div>
                  </div>

                  {/* Download Buttons Stack - Conditionally Rendered */}
                  {product.type === 'app' && (
                    <div className="flex flex-col gap-4">
                      <a href="#" className="flex-1 bg-white border border-gray-100 rounded-[2.5rem] p-6 flex items-center justify-between group hover:border-brand-dark/10 hover:shadow-lg hover:shadow-brand-dark/5 transition-all relative overflow-hidden">
                        <div className="relative z-10 flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-brand-dark text-white flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform duration-500">
                            <i className="ri-apple-fill"></i>
                          </div>
                          <div className="text-left">
                            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Download on</span>
                            <span className="block text-xl font-extrabold text-brand-dark font-['Manrope']">App Store</span>
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-brand-dark group-hover:border-brand-dark group-hover:text-white transition-all">
                          <i className="ri-arrow-right-line"></i>
                        </div>
                      </a>

                      <a href="#" className="flex-1 bg-white border border-gray-100 rounded-[2.5rem] p-6 flex items-center justify-between group hover:border-brand-dark/10 hover:shadow-lg hover:shadow-brand-dark/5 transition-all relative overflow-hidden">
                        <div className="relative z-10 flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-brand-dark text-white flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform duration-500">
                            <i className="ri-google-play-fill"></i>
                          </div>
                          <div className="text-left">
                            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Get it on</span>
                            <span className="block text-xl font-extrabold text-brand-dark font-['Manrope']">Google Play</span>
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-brand-dark group-hover:border-brand-dark group-hover:text-white transition-all">
                          <i className="ri-arrow-right-line"></i>
                        </div>
                      </a>
                    </div>
                  )}
                </div>

                {/* Bottom Row: Index List */}
                <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center text-xl">
                      <i className="ri-list-check"></i>
                    </div>
                    <h3 className="text-xl font-extrabold text-brand-dark font-['Manrope']">In this Article</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Pros and Cons of Seat Maker",
                      "Seat Maker App's Standout Features",
                      "Who is the Seat Maker App Designed For?",
                      "Seat Maker App in the Spotlight | Awards & Recognitions",
                      "What can the Users Expect in the Future from the Seat Maker App?"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-transparent hover:border-brand-orange/20 hover:bg-white hover:shadow-sm transition-all group cursor-pointer">
                        <span className="text-lg font-black text-gray-200 group-hover:text-brand-orange transition-colors font-['Manrope']">0{idx + 1}</span>
                        <span className="text-sm font-bold text-gray-600 group-hover:text-brand-dark transition-colors line-clamp-1">{item}</span>
                        <i className="ri-arrow-right-s-line ml-auto text-gray-300 group-hover:text-brand-orange transition-colors"></i>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Key Features Card */}
            <div>
              <h4 className="font-extrabold text-gray-400 uppercase tracking-widest text-[10px] mb-4 pl-1">Key Features</h4>
              <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col h-full group hover:border-brand-lime/30 transition-colors">
                <div className="absolute left-0 top-8 bottom-8 w-1.5 bg-brand-lime rounded-r-full group-hover:bg-brand-orange transition-colors duration-500"></div>

                <div className="flex items-start gap-4 mb-6 pl-2">
                  <div className="w-12 h-12 rounded-2xl bg-brand-lime/10 text-brand-lime flex items-center justify-center text-2xl group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-colors duration-500">
                    <i className="ri-magic-line"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-dark font-['Manrope'] mb-1">Smart Seat Generator</h3>
                    <p className="text-sm text-gray-500 font-medium">Instantly organize complex guest lists into perfect layouts.</p>
                  </div>
                </div>

                <div className="space-y-3 pl-2 mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-lime/20 text-brand-lime flex items-center justify-center text-xs group-hover:bg-brand-orange/20 group-hover:text-brand-orange transition-colors duration-500">
                      <i className="ri-add-line font-bold"></i>
                    </div>
                    <span className="text-sm font-bold text-gray-600">Drag-and-drop guest placement</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-lime/20 text-brand-lime flex items-center justify-center text-xs group-hover:bg-brand-orange/20 group-hover:text-brand-orange transition-colors duration-500">
                      <i className="ri-add-line font-bold"></i>
                    </div>
                    <span className="text-sm font-bold text-gray-600">Offline privacy mode</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verdict Card */}
            <div>
              <h4 className="font-extrabold text-gray-400 uppercase tracking-widest text-[10px] mb-4 pl-1">Provision Breakdown</h4>
              <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm h-full grid grid-cols-2 gap-8 relative overflow-hidden">

                {/* Best For */}
                <div className="relative z-10">
                  <h5 className="font-extrabold text-brand-dark uppercase tracking-wider text-[10px] mb-4">Best For:</h5>
                  <div className="flex -space-x-3 mb-3">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Planner" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Couple" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                  </div>
                  <p className="text-xs font-bold text-gray-500 leading-relaxed">Event Planners, Wedding <br /> Couples</p>
                </div>

                {/* Not Ideal For */}
                <div className="relative z-10 border-l border-gray-100 pl-8">
                  <h5 className="font-extrabold text-brand-dark uppercase tracking-wider text-[10px] mb-4">Not Ideal For:</h5>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border-2 border-white">
                      <i className="ri-android-fill text-lg"></i>
                    </div>
                    <span className="text-gray-300 font-bold">—</span>
                  </div>
                  <p className="text-xs font-bold text-gray-500 leading-relaxed">Android Users <br /> (Currently)</p>
                </div>

              </div>
            </div>
          </div>

          {/* Dos & Don'ts (Pros & Cons) Reimagined */}
          <div className="mb-20 pt-10">
            <div className="flex items-center gap-4 mb-10 justify-center opacity-80">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-gray-300"></span>
              <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] font-['Manrope']">The Honest Verdict</span>
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-gray-300"></span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Dos (Pros) */}
              <div className="relative group perspective">
                {/* Glassmorphic Card */}
                <div className="bg-white/60 backdrop-blur-2xl border border-white/60 rounded-[3rem] p-10 shadow-2xl shadow-brand-dark/5 relative overflow-hidden h-full z-10 transition-all duration-700">
                  {/* Header Glow */}
                  <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#4CAF50]/10 via-[#4CAF50]/5 to-transparent"></div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#4CAF50]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                  <div className="relative z-10 flex flex-col items-center text-center mb-10">
                    <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-tr from-[#4CAF50] to-[#81C784] shadow-lg shadow-[#4CAF50]/20 flex items-center justify-center text-white text-3xl mb-5 border-4 border-white/80 ring-1 ring-[#4CAF50]/20 transform group-hover:rotate-6 transition-transform duration-500">
                      <i className="ri-thumb-up-fill"></i>
                    </div>
                    <h4 className="text-2xl font-extrabold text-brand-dark font-['Manrope'] mb-1">The Good</h4>
                    <p className="text-xs font-bold text-[#4CAF50] uppercase tracking-widest bg-[#4CAF50]/10 px-3 py-1 rounded-full">Reasons to Buy</p>
                  </div>

                  <ul className="space-y-5 relative z-10">
                    {product.pros.map((pro, idx) => (
                      <li key={idx} className="flex gap-4 items-start text-left group/item p-2 rounded-xl hover:bg-[#4CAF50]/5 transition-colors">
                        <div className="w-6 h-6 rounded-full bg-[#4CAF50]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#4CAF50] group-hover/item:text-white transition-all duration-300">
                          <i className="ri-check-line text-xs font-bold text-[#4CAF50] group-hover/item:text-white"></i>
                        </div>
                        <span className="text-sm font-bold text-gray-600 leading-relaxed group-hover/item:text-brand-dark transition-colors">{pro}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Bottom Bar */}
                  <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#4CAF50]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
              </div>

              {/* Don'ts (Cons) */}
              <div className="relative group perspective">
                {/* Glassmorphic Card */}
                <div className="bg-white/60 backdrop-blur-2xl border border-white/60 rounded-[3rem] p-10 shadow-2xl shadow-brand-dark/5 relative overflow-hidden h-full z-10 transition-all duration-700">
                  {/* Header Glow */}
                  <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#FF5252]/10 via-[#FF5252]/5 to-transparent"></div>
                  <div className="absolute top-0 left-0 w-64 h-64 bg-[#FF5252]/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>

                  <div className="relative z-10 flex flex-col items-center text-center mb-10">
                    <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-tr from-[#FF5252] to-[#FF8A80] shadow-lg shadow-[#FF5252]/20 flex items-center justify-center text-white text-3xl mb-5 border-4 border-white/80 ring-1 ring-[#FF5252]/20 transform group-hover:-rotate-6 transition-transform duration-500">
                      <i className="ri-thumb-down-fill"></i>
                    </div>
                    <h4 className="text-2xl font-extrabold text-brand-dark font-['Manrope'] mb-1">The Bad</h4>
                    <p className="text-xs font-bold text-[#FF5252] uppercase tracking-widest bg-[#FF5252]/10 px-3 py-1 rounded-full">Things to Consider</p>
                  </div>

                  <ul className="space-y-5 relative z-10">
                    {product.cons.map((con, idx) => (
                      <li key={idx} className="flex gap-4 items-start text-left group/item p-2 rounded-xl hover:bg-[#FF5252]/5 transition-colors">
                        <div className="w-6 h-6 rounded-full bg-[#FF5252]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#FF5252] group-hover/item:text-white transition-all duration-300">
                          <i className="ri-close-line text-xs font-bold text-[#FF5252] group-hover/item:text-white"></i>
                        </div>
                        <span className="text-sm font-bold text-gray-600 leading-relaxed group-hover/item:text-brand-dark transition-colors">{con}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Bottom Bar */}
                  <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#FF5252]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Slider Section */}
          <div className="mb-20">
            <FeatureSlider />
          </div>

          {/* Decision Accelerator Section */}
          <div className="mb-24">
            <DecisionAccelerator />
          </div>

          {/* Trust Section */}
          <div className="mb-24">
            <TrustSection />
          </div>

          {/* Testimonials */}
          <div className="mb-24">
            <ReviewsSlider />
          </div>

          {/* FAQ Section */}
          <div className="mb-24">
            <FAQSection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// ... existing FeatureSlider code ...

function DecisionAccelerator() {
  return (
    <div className='py-10 border-y'>
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest font-['Manrope'] mb-8">DECISION ACCELERATOR</h3>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">

        {/* TWAP Approved Badge - Absolute Positioned */}
        <div className="absolute -top-12 right-0 z-20 hidden lg:block">
          <div className="w-24 h-24 rounded-full border-4 border-white flex items-center justify-center bg-brand-orange shadow-xl rotate-12 transform hover:scale-105 transition-transform">
            <div className="text-center">
              <span className="text-[10px] font-black text-white leading-tight uppercase">TWAP<br />Approved</span>
            </div>
          </div>
        </div>

        {/* Left Column: Verdict Card */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-brand-dark/50 border border-gray-100 h-full flex flex-col justify-between relative overflow-hidden">
            <div>
              <h4 className="text-2xl font-bold text-brand-dark font-['Manrope'] mb-4">The Web App Pro Verdict</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8 opacity-80">
                Ate viror titn App Rnttavit is hee prae siroxt a yorin sluee. Verpinitst ian saelip greo alicii puitre.
              </p>
            </div>

            <div className="space-y-6">
              {/* Progress Bar 1 */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-brand-dark">UI/UX</span>
                  <span className="text-sm font-bold text-brand-dark">4.5</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-orange w-[90%] rounded-full"></div>
                </div>
              </div>
              {/* Progress Bar 2 */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-brand-dark">Performance</span>
                  <span className="text-sm font-bold text-brand-dark">4.2</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-orange w-[84%] rounded-full"></div>
                </div>
              </div>
              {/* Progress Bar 3 */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-brand-dark">Features</span>
                  <span className="text-sm font-bold text-brand-dark">4.7</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-orange w-[94%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Rating Breakdown */}
        <div className="lg:col-span-8 pl-0 lg:pl-10">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest font-['Manrope'] mb-8">RATING BREAKDOWN</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Card 1: Personal */}
            <div className="bg-white rounded-[2rem] p-8 shadow-lg shadow-brand-orange/10 border-2 border-brand-orange relative flex flex-col items-center text-center h-64 justify-center">
              <h5 className="text-lg font-bold text-brand-dark mb-2">Personal</h5>
              <div className="mb-8">
                <span className="text-2xl font-bold text-brand-dark">$12.49</span>
                <span className="text-sm font-bold text-gray-400">/mo</span>
                <p className="text-xs text-brand-orange mt-1 font-bold">(Billed Yearly)</p>
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-brand-orange">
                <i className="ri-user-3-line text-sm"></i>
              </div>
            </div>

            {/* Card 2: Free */}
            <div className="bg-white rounded-[2rem] p-8 shadow-md border border-gray-100 relative flex flex-col items-center text-center h-64 justify-center">
              <span className="absolute -top-4 bg-brand-burgundy text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg shadow-brand-burgundy/30">BEST VALUE</span>
              <div className="mb-8">
                <h5 className="text-2xl font-bold text-brand-dark mb-1">Free</h5>
                <p className="text-xs text-gray-400 font-medium">Billed Yearly</p>
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400">
                <i className="ri-price-tag-3-line text-sm"></i>
              </div>
            </div>

            {/* Card 3: Team */}
            <div className="bg-white rounded-[2rem] p-8 shadow-md border border-gray-100 relative flex flex-col items-center text-center h-64 justify-center">
              <h5 className="text-lg font-bold text-brand-dark mb-2">Team</h5>
              <div className="mb-8">
                <span className="text-2xl font-bold text-brand-dark">4.6/5.0</span>
                <div className="flex justify-center gap-1 text-brand-lime text-sm mt-2">
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-half-fill"></i>
                </div>
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400">
                <i className="ri-team-line text-sm"></i>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

// ... existing DecisionAccelerator ...

function TrustSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start py-12 border-b border-gray-100">

      {/* Left Column: Heading & CTA */}
      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 font-['Manrope']">START WITH US</h4>
        <h2 className="text-4xl lg:text-5xl font-['Manrope'] font-bold text-brand-dark mb-8 leading-tight">
          Why Trust <br /> <span className="text-brand-orange">TheWebAppPro?</span>
        </h2>
      </div>

      {/* Right Column: Description */}
      <div className="space-y-6 text-gray-600 font-medium leading-relaxed text-lg">
        <p>
          At TheWebAppPro, we believe in providing clear and transparent software reviews that you can trust. Our experienced team is committed to offering personalized recommendations, whether you're looking for complex enterprise solutions or simple productivity tools.
        </p>
        <p>
          We simplify the decision-making process, making it easy to understand and navigate the crowded software market. Our team ensures that every recommendation is backed by rigorous testing and real-world usage scenarios.
        </p>
      </div>

    </div>
  );
}


function ReviewsSlider() {
  const swiperRef = useRef<any>(null);

  return (
    <div className="py-10">
      <div className="text-center mb-16">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 font-['Manrope']">Testimonial</h4>
        <h2 className="text-3xl lg:text-4xl font-['Manrope'] font-bold text-brand-dark">Transformative Client Experiences</h2>
      </div>

      <Swiper
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        loop={true}
        spaceBetween={32}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        pagination={{ clickable: true }}
        className="pb-12 px-4"
      >
        {[
          {
            quote: "Impressed by the professionalism and attention to detail.",
            name: "Guy Hawkins",
            handle: "@guyhawkins",
            image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80"
          },
          {
            quote: "A seamless experience from start to finish. Highly recommend!",
            name: "Karla Lynn",
            handle: "@karlynn98",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
          },
          {
            quote: "Reliable and trustworthy. Made my life so much easier!",
            name: "Jane Cooper",
            handle: "@janecooper",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
          },
          {
            quote: "The best investment for our event planning business.",
            name: "Robert Fox",
            handle: "@robertfox",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
          }
        ].map((testimonial, idx) => (
          <SwiperSlide key={idx} className="h-auto">
            <div className="flex flex-col h-full px-2 bg-gray-200 py-3 rounded-[2rem]">
              {/* Speech Bubble Card */}
              <div className="bg-gray-50 rounded-[2rem] p-8 relative mb-6 min-h-[200px] flex flex-col justify-center">
                <i className="ri-double-quotes-l text-4xl text-gray-300 mb-4"></i>
                <p className="text-lg font-medium text-brand-dark leading-relaxed font-['Manrope']">
                  {testimonial.quote}
                </p>
                {/* Tail */}
                <div className="absolute -bottom-4 left-10 w-8 h-8 bg-gray-50 transform rotate-45"></div>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-4 pl-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                <div>
                  <h5 className="text-sm font-bold text-brand-dark font-['Manrope']">{testimonial.name}</h5>
                  <p className="text-xs text-gray-400 font-medium">{testimonial.handle}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-brand-orange hover:text-brand-orange hover:bg-white shadow-sm transition-all group"
          aria-label="Previous Slide"
        >
          <i className="ri-arrow-left-line text-xl group-hover:-translate-x-0.5 transition-transform"></i>
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-brand-orange hover:text-brand-orange hover:bg-white shadow-sm transition-all group"
          aria-label="Next Slide"
        >
          <i className="ri-arrow-right-line text-xl group-hover:translate-x-0.5 transition-transform"></i>
        </button>
      </div>
    </div>
  );
}


function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is TheWebAppPro?",
      answer: "TheWebAppPro is your trusted source for in-depth software reviews, comparisons, and expert insights. We help you make informed decisions about the tools you use for your business."
    },
    {
      question: "How does TheWebAppPro work?",
      answer: "We rigorously test and analyze various software solutions across different categories. Our team provides unbiased ratings based on UI/UX, performance, features, and value for money."
    },
    {
      question: "Is TheWebAppPro ratings unbiased?",
      answer: "Yes! Our reviews are based on strict testing protocols and real-world usage. We do not accept payment for favorable ratings, ensuring you get honest and reliable information."
    },
    {
      question: "Can I request specific software reviews?",
      answer: "Absolutely. We value our community's feedback. If there's a specific tool you'd like us to review, simply reach out to our team, and we'll add it to our testing queue."
    }
  ];

  return (
    <div className="pt-20 border-t border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column */}
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 bg-[#F4F4F6] px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest font-['Manrope']">Frequently asked questions</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-['Manrope'] font-bold text-brand-dark mb-6 leading-tight">
            Frequently asked <br /> <span className="text-brand-orange">questions</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed mb-8">
            Choose a plan that fits your business needs and budget. No hidden fees, no surprises—just straightforward pricing for powerful software insights.
          </p>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-[#F9FAFB] rounded-[20px] p-6 transition-all duration-300 ${activeIndex === index ? 'shadow-lg shadow-gray-200/50' : 'hover:bg-gray-100'}`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between text-left group"
              >
                <span className={`text-lg font-bold font-['Manrope'] transition-colors ${activeIndex === index ? 'text-brand-dark' : 'text-gray-700'}`}>
                  {faq.question}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${activeIndex === index ? 'bg-brand-orange text-white rotate-180' : 'bg-white text-gray-400 border border-gray-200 group-hover:border-brand-orange group-hover:text-brand-orange'}`}>
                  <i className="ri-arrow-down-s-line text-xl"></i>
                </div>
              </button>
              <div className={`grid transition-all duration-300 ease-in-out ${activeIndex === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <p className="text-gray-500 leading-relaxed pr-8">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Sub-component for the Slider to keep things clean
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'; // Import pagination styles
import { useState, useRef } from 'react';
// ... rest of the file ...

function FeatureSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const slides = [
    {
      title: "Smart Guest List Management",
      subtitle: "Effortlessly import and organize your attendees.",
      description: "Stop juggling multiple spreadsheets and messy notes. Our smart import tool allows you to bring in your guest list from contacts, Excel, or CSV files in seconds. Automatically categorize guests by relationship, dietary needs, or VIP status.",
      description2: "Once imported, simple drag-and-drop actions let you group families and friends together visually, ensuring no one is left stranded at a table of strangers.",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80"
    },
    {
      title: "Intelligent Seating Algorithm",
      subtitle: "Let AI solve the puzzle of who sits where.",
      description: "Avoid potential conflicts and ensure harmonious tables with our intelligent algorithm. Simply set your rules—like 'keep X away from Y' or 'mix singles with couples'—and let the system generate an optimized seating plan for you.",
      description2: "Review the suggestions and make manual tweaks as needed. It’s like having a professional event planner right in your pocket, saving you hours of frustration.",
      image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1600&q=80"
    },
    {
      title: "Real-time Collaboration",
      subtitle: "Plan together with your partner or team.",
      description: "Planning a wedding or large event takes a village. Invite your partner, parents, or event planner to collaborate on the seating chart in real-time. Changes are synced instantly across all devices, so everyone stays on the same page.",
      description2: "Leave comments on specific tables, assignments, or guests to communicate decisions without endless back-and-forth text messages.",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80"
    },
    {
      title: "Export & Print Ready",
      subtitle: "From screen to venue in one click.",
      description: "When you’re ready, export your final plan in professional layouts suitable for vendors and venue staff. Generate alphabetical guest lists for check-in and visual floor plans for the catering team.",
      description2: " Supports various formats including PDF and high-resolution images, ensuring your physical setup matches your digital vision perfectly.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80"
    }
  ];

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handlePrev = () => {
    if (swiperRef.current && (swiperRef.current as any).swiper) {
      (swiperRef.current as any).swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && (swiperRef.current as any).swiper) {
      (swiperRef.current as any).swiper.slideNext();
    }
  };

  const activeSlide = slides[activeIndex];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

      {/* Left Column: Content & Navigation */}
      <div className="lg:col-span-5 flex flex-col justify-center h-full">

        {/* Animated Content Container */}
        <div className="mb-12 transition-all duration-500 ease-in-out">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[#1F2853] mb-4 font-['Manrope'] leading-tight animate-in fade-in slide-in-from-bottom-4 duration-500 key={activeIndex}">
            {activeSlide.title}
          </h1>
          <h2 className="text-xl font-bold text-brand-orange mb-8 font-['Manrope'] animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100 key={activeIndex + 'subtitle'}">
            {activeSlide.subtitle}
          </h2>

          <div className="space-y-6 text-gray-600 text-sm leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200 key={activeIndex + 'desc'}">
            <p>{activeSlide.description}</p>
            <p>{activeSlide.description2}</p>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="grid grid-cols-2 gap-8 mt-auto border-t border-gray-100 pt-8">
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className={`text-left group transition-all ${activeIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:opacity-80'}`}
          >
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 group-hover:translate-x-1 transition-transform">Previous</span>
            <span className="block text-lg font-extrabold text-[#1F2853] font-['Manrope']">Feature</span>
          </button>

          <button
            onClick={handleNext}
            disabled={activeIndex === slides.length - 1}
            className={`text-right group transition-all ${activeIndex === slides.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:opacity-80'}`}
          >
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 group-hover:-translate-x-1 transition-transform">Next</span>
            <span className="block text-lg font-extrabold text-[#1F2853] font-['Manrope']">Features</span>
          </button>
        </div>
      </div>

      {/* Right Column: Slider */}
      <div className="lg:col-span-7 h-full min-h-[500px]">
        <div className="rounded-[3rem] overflow-hidden shadow-2xl shadow-brand-dark/10 h-full relative">
          <div className="absolute inset-0 bg-brand-dark/5 z-0"></div>
          <Swiper
            ref={swiperRef}
            spaceBetween={30}
            slidesPerView={1}
            onSlideChange={handleSlideChange}
            className="w-full h-full min-h-[500px]"
          >
            {slides.map((slide, idx) => (
              <SwiperSlide key={idx} className="relative w-full h-full bg-white">
                <div className="w-full h-full relative">
                  <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
                  {/* Gradient Overlay for style */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F2853]/50 to-transparent mix-blend-multiply" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

    </div>
  );
}

