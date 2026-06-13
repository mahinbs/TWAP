import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

export default function ShowcasePage() {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    const services = [
        {
            title: "App of the Week",
            description: "Get highlighted as the top app for a full week on our homepage and newsletter.",
            icon: "ri-star-smile-line",
            color: "bg-yellow-100 text-yellow-600",
            features: ["Homepage Feature", "Newsletter Mention", "Social Media Blast", "Permanent Listing"]
        },
        {
            title: "Permanent Listing",
            description: "Secure a permanent spot in our directory with a detailed review and SEO backlinks.",
            icon: "ri-file-list-3-line",
            color: "bg-blue-100 text-blue-600",
            features: ["Detailed Review", "Do-Follow Backlinks", "SEO Optimization", "Permanent Archival"]
        },
        {
            title: "Viral Notification",
            description: "Reach our entire audience through a dedicated push notification and email blast.",
            icon: "ri-broadcast-line",
            color: "bg-purple-100 text-purple-600",
            features: ["Push Notification", "Dedicated Email", "High Conversion", "Instant Traffic"]
        },
        {
            title: "Ranking Booster",
            description: "Boost your app's category ranking with our specialized growth campaigns.",
            icon: "ri-rocket-line",
            color: "bg-red-100 text-red-600",
            features: ["Category Boost", "Keyword Targeting", "Organic Growth", "Performance Report"]
        }
    ];

    const processSteps = [
        { title: "Make an Introduction", desc: "Submit your app details through our simple form." },
        { title: "Review & Approval", desc: "Our team reviews your app for quality and relevance." },
        { title: "Strategy Planning", desc: "We create a custom promotion plan for your product." },
        { title: "Content Creation", desc: "Our experts write engaging reviews and articles." },
        { title: "Launch Campaign", desc: "We publish and promote your app across our network." },
        { title: "Newsletter Blast", desc: "Your app reaches thousands of subscribers instantly." },
        { title: "Social Signals", desc: "We share your story on all major social platforms." },
        { title: "Performance Report", desc: "Receive a detailed report of your campaign's success." }
    ];

    const faqs = [
        { question: "How long does it take to get featured?", answer: "Typically, it takes 2-3 business days from submission to publication, depending on the package." },
        { question: "Do you offer do-follow backlinks?", answer: "Yes, all our permanent listings and reviews include high-quality do-follow backlinks to boost your SEO." },
        { question: "Can I edit my listing later?", answer: "Absolutely. You can request updates to your listing at any time to keep your information current." },
        { question: "What is the 'App of the Week'?", answer: "It is our premium spot on the homepage, reserved for one high-quality app each week for maximum visibility." }
    ];

    return (
        <div className="min-h-screen bg-white font-['Manrope']">
            <Header />
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#f8fafc]">
                <div className="absolute inset-0 bg-white/50"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-left">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0f172a] mb-6 tracking-tight leading-tight">
                                Showcase Your App <br />
                                <span className="text-[#f25a1a]">To The World</span>
                            </h1>
                            <p className="text-lg text-[#334155] mb-8 font-medium">
                                Join the #1 Product Studio. Get your app featured, reviewed, and promoted to millions of tech enthusiasts.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/submit" className="px-8 py-4 bg-[#0f172a] text-white rounded-lg font-bold text-lg hover:bg-[#1e293b] transition-transform hover:scale-105 shadow-xl">
                                    Start Your Campaign
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl skew-y-0 hover:skew-y-1 transition-all duration-500 ring-8 ring-white/50">
                                <img
                                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
                                    alt="App Showcase Mockup"
                                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -z-10 top-1/2 right-1/2 w-72 h-72 bg-[#f25a1a]/10 rounded-full blur-3xl"></div>
                            <div className="absolute -z-10 bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who/What Are We Section */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-200">
                                <img
                                    src="https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=800&q=80"
                                    alt="iPad Pro Showcase"
                                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent mix-blend-overlay"></div>
                            </div>
                            {/* Decorative Purple Glow */}
                            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-500/20 rounded-full blur-3xl"></div>
                        </div>

                        <div>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] mb-8 tracking-tight">
                                What/Who are we?
                            </h2>
                            <div className="space-y-6 text-lg text-[#334155] leading-relaxed font-medium">
                                <p>
                                    Welcome to TheWebAppPro, a gateway that will take you to an eclectic landscape of mobile applications. Dedicated to our mission of elevating your app's visibility in the market we make sure to help your app by offering impartial app reviews.
                                </p>
                                <p>
                                    Our sole objective is to empower and connect you with your target audience effectively while leveraging our comprehensive app insights to identify the most lucrative markets for your product.
                                </p>
                                <p>
                                    Furthermore, we recognize and shed light on your unique offerings by strategically positioning your app to garner the attention it deserves, ensuring it stands out of the box amidst the competition.
                                </p>
                            </div>
                            <div className="mt-10">
                                <Link to="/submit" className="inline-block px-8 py-4 bg-[#0f172a] text-white rounded-lg font-bold text-lg hover:bg-[#1e293b] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                                    Get Your App Featured
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-gray-50 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {[
                            { label: "Apps Featured", value: "1,000+" },
                            { label: "Monthly Views", value: "500k+" },
                            { label: "Detailed Reviews", value: "30k+" },
                            { label: "Newsletter subs", value: "50k+" }
                        ].map((stat, idx) => (
                            <div key={idx} className="p-4">
                                <div className="text-3xl md:text-5xl font-bold text-gray-900 mb-2 font-['Manrope']">{stat.value}</div>
                                <div className="text-gray-500 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* Feature Highlights Section */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#0f172a] mb-6">
                            Here's How Your Brand Will Get <br />
                            <span className="text-[#f25a1a]">Highlighted, Fast!</span>
                        </h2>
                    </div>

                    <div className="space-y-24">
                        {/* Feature 1: Custom Rank */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            <div className="order-2 lg:order-1 relative">
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200 bg-gray-50">
                                    <img
                                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
                                        alt="Custom Rank Report"
                                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Mock UI Overlay */}
                                    <div className="absolute top-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg opacity-90">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 rounded-full bg-green-500"></div>
                                            <div className="h-2 w-24 bg-gray-200 rounded"></div>
                                        </div>
                                        <div className="h-2 w-32 bg-gray-100 rounded"></div>
                                    </div>
                                </div>
                                {/* Decorative Blob */}
                                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#f25a1a]/10 to-transparent rounded-full blur-3xl"></div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <h3 className="text-3xl font-bold text-[#0f172a] mb-4">Custom Rank</h3>
                                <p className="text-lg text-[#334155] mb-8 leading-relaxed">
                                    Getting a custom rank for your product in the top reports relevant to your domain. Stand out where it matters most.
                                </p>
                                {/* <Link to="/products" className="inline-flex items-center text-[#f25a1a] font-bold text-lg hover:gap-2 transition-all">
                                    Explore Listings <i className="ri-arrow-right-line ml-1"></i>
                                </Link> */}
                            </div>
                        </div>

                        {/* Feature 2: Product Reviews */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            <div className="order-1">
                                <h3 className="text-3xl font-bold text-[#0f172a] mb-4">Product Reviews</h3>
                                <p className="text-lg text-[#334155] mb-8 leading-relaxed">
                                    Brand-neutral textual product reviews designed to boost credibility. Honest feedback that builds trust with your future customers.
                                </p>
                                {/* <Link to="/reviews" className="inline-flex items-center text-[#f25a1a] font-bold text-lg hover:gap-2 transition-all">
                                    Open Reviews <i className="ri-arrow-right-line ml-1"></i>
                                </Link> */}
                            </div>
                            <div className="order-2 relative">
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200 bg-gray-50">
                                    <img
                                        src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80"
                                        alt="Product Reviews Interface"
                                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Mock Review Card Overlay */}
                                    <div className="absolute bottom-6 right-6 left-12 bg-white p-4 rounded-xl shadow-lg border-l-4 border-[#f25a1a]">
                                        <div className="flex gap-1 text-yellow-400 mb-2">
                                            <i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i>
                                        </div>
                                        <div className="h-2 w-3/4 bg-gray-200 rounded mb-2"></div>
                                        <div className="h-2 w-1/2 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
                            </div>
                        </div>

                        {/* Feature 3: Expert Opinion */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            <div className="order-2 lg:order-1 relative">
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200 bg-gray-50 aspect-[4/3]">
                                    <img
                                        src="https://www.mobileappdaily.com/public/images/Expert_Opinion_final.webp"
                                        alt="Expert Opinion"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 scale-125"
                                    />
                                </div>
                                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#f25a1a]/10 to-transparent rounded-full blur-3xl"></div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <h3 className="text-3xl font-bold text-[#0f172a] mb-4">Expert Opinion</h3>
                                <p className="text-lg text-[#334155] mb-8 leading-relaxed">
                                    Share your expert opinion as thought leadership- building articles. Position yourself as an authority in your industry.
                                </p>
                                {/* <Link to="/insights" className="inline-flex items-center text-[#f25a1a] font-bold text-lg hover:gap-2 transition-all">
                                    Explore Insights <i className="ri-arrow-right-line ml-1"></i>
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section (New) */}
            <section id="pricing" className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] mb-6 tracking-tight">
                            IT'S FREE TO GET STARTED!
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Join our global community and showcase your product in front of the end users, prospects and potential investors!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Plan 1: Freemium */}
                        <div className="bg-white rounded-3xl border-2 border-red-500 p-8 shadow-xl hover:shadow-2xl transition-shadow relative flex flex-col">
                            <div className="text-center pb-8 border-b border-gray-100">
                                <div className="text-2xl font-bold text-[#0f172a] mb-2">$0</div>
                                <h3 className="text-xl font-bold text-[#0f172a]">Freemium</h3>
                            </div>
                            <div className="py-8 space-y-6 flex-grow">
                                <div className="flex items-start">
                                    <i className="ri-check-line text-red-500 text-xl mr-3 font-bold"></i>
                                    <div>
                                        <div className="font-bold text-[#0f172a]">Permanent</div>
                                        <p className="text-sm text-gray-500 mt-1">Textual App Review No-Follow Backlinks</p>
                                    </div>
                                </div>
                                <div className="flex items-start opacity-50">
                                    <i className="ri-close-line text-red-500 text-xl mr-3 font-bold"></i>
                                    <div>
                                        <div className="font-bold text-[#0f172a]">App of the Week</div>
                                        <p className="text-sm text-gray-500 mt-1">Featured WAM Badge, App Ad</p>
                                    </div>
                                </div>
                                <div className="flex items-start opacity-50">
                                    <i className="ri-close-line text-red-500 text-xl mr-3 font-bold"></i>
                                    <div>
                                        <div className="font-bold text-[#0f172a]">Carousel Post</div>
                                    </div>
                                </div>
                                <div className="flex items-start opacity-50">
                                    <i className="ri-close-line text-red-500 text-xl mr-3 font-bold"></i>
                                    <div>
                                        <div className="font-bold text-[#0f172a]">Ranking boost</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-auto pt-6 text-center">
                                <button className="w-full py-3 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition-colors">
                                    Buy Now
                                </button>
                            </div>
                        </div>

                        {/* Plan 2: App of the Week */}
                        <div className="bg-white rounded-3xl border-2 border-teal-500 p-8 shadow-xl hover:shadow-2xl transition-shadow relative flex flex-col">
                            <div className="text-center pb-8 border-b border-gray-100">
                                <div className="text-2xl font-bold text-[#0f172a] mb-2">$99</div>
                                <h3 className="text-xl font-bold text-[#0f172a]">App of the Week</h3>
                            </div>
                            <div className="py-8 space-y-6 flex-grow">
                                <div className="flex items-start">
                                    <i className="ri-check-line text-teal-500 text-xl mr-3 font-bold"></i>
                                    <div>
                                        <div className="font-bold text-[#0f172a]">Permanent</div>
                                        <p className="text-sm text-gray-500 mt-1">Textual App Review No-Follow Backlinks</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <i className="ri-check-line text-teal-500 text-xl mr-3 font-bold"></i>
                                    <div>
                                        <div className="font-bold text-[#0f172a]">App of the Week</div>
                                        <p className="text-sm text-gray-500 mt-1">Featured WAM Badge, Email 5K, Homepage Ad 15 Days</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <i className="ri-check-line text-teal-500 text-xl mr-3 font-bold"></i>
                                    <div>
                                        <div className="font-bold text-[#0f172a]">Carousel Post</div>
                                        <p className="text-sm text-gray-500 mt-1">2 Linkedin, 2 FB Groups</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <i className="ri-check-line text-teal-500 text-xl mr-3 font-bold"></i>
                                    <div>
                                        <div className="font-bold text-[#0f172a]">Top 5 Addition</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-auto pt-6 text-center">
                                <button className="w-full py-3 bg-teal-500 text-white font-bold rounded-lg shadow-md hover:bg-teal-600 transition-colors">
                                    Buy Now
                                </button>
                            </div>
                        </div>

                        {/* Plan 3: Viral Video */}
                        <div className="bg-white rounded-3xl border-2 border-orange-400 p-8 shadow-xl hover:shadow-2xl transition-shadow relative flex flex-col transform scale-105 z-10">
                            {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide shadow-sm">Most Popular</div> */}
                            <div className="text-center pb-8 border-b border-gray-100">
                                <div className="text-2xl font-bold text-[#0f172a] mb-2">$149</div>
                                <h3 className="text-xl font-bold text-[#0f172a] leading-tight">Viral Video<br />Campaign</h3>
                            </div>
                            <div className="py-8 space-y-6 flex-grow">
                                <div className="flex items-start">
                                    <i className="ri-check-line text-orange-400 text-xl mr-3 font-bold"></i>
                                    <div>
                                        <div className="font-bold text-[#0f172a]">Permanent</div>
                                        <p className="text-sm text-gray-500 mt-1">Textual Review, No-Follow Backlinks</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <i className="ri-check-line text-orange-400 text-xl mr-3 font-bold"></i>
                                    <div>
                                        <div className="font-bold text-[#0f172a]">App of the Week</div>
                                        <p className="text-sm text-gray-500 mt-1">Badge, Email 5K, Ad 25 Days</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <i className="ri-check-line text-orange-400 text-xl mr-3 font-bold"></i>
                                    <div>
                                        <div className="font-bold text-[#0f172a]">45 Sec Video Post</div>
                                        <p className="text-sm text-gray-500 mt-1">10 Linkedin, 10 FB Groups</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <i className="ri-check-line text-orange-400 text-xl mr-3 font-bold"></i>
                                    <div>
                                        <div className="font-bold text-[#0f172a]">Top 3 Addition</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-auto pt-6 text-center">
                                <button className="w-full py-3 bg-orange-400 text-white font-bold rounded-lg shadow-md hover:bg-orange-500 transition-colors">
                                    Buy Now
                                </button>
                            </div>
                        </div>

                        {/* Plan 4: Ranking Booster */}
                        <div className="bg-white rounded-3xl border-2 border-fuchsia-500 p-8 shadow-xl hover:shadow-2xl transition-shadow relative flex flex-col">
                            <div className="text-center pb-8 border-b border-gray-100">
                                <div className="text-2xl font-bold text-[#0f172a] mb-2">$199</div>
                                <h3 className="text-xl font-bold text-[#0f172a]">Ranking Booster</h3>
                            </div>
                            <div className="py-8 space-y-6 flex-grow">
                                <div className="flex items-start">
                                    <i className="ri-check-line text-fuchsia-500 text-xl mr-3 font-bold"></i>
                                    <div>
                                        <div className="font-bold text-[#0f172a]">Permanent</div>
                                        <p className="text-sm text-gray-500 mt-1">Textual Review, No-Follow Backlinks</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <i className="ri-check-line text-fuchsia-500 text-xl mr-3 font-bold"></i>
                                    <div>
                                        <div className="font-bold text-[#0f172a]">App of the Week</div>
                                        <p className="text-sm text-gray-500 mt-1">Badge, Email 5K, Ad 35 Days</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <i className="ri-check-line text-fuchsia-500 text-xl mr-3 font-bold"></i>
                                    <div>
                                        <div className="font-bold text-[#0f172a]">45 Sec Video Post</div>
                                        <p className="text-sm text-gray-500 mt-1">15 Linkedin, 15 FB Groups</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <i className="ri-check-line text-fuchsia-500 text-xl mr-3 font-bold"></i>
                                    <div>
                                        <div className="font-bold text-[#0f172a]">Top 3 Addition</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-auto pt-6 text-center">
                                <button className="w-full py-3 bg-fuchsia-500 text-white font-bold rounded-lg shadow-md hover:bg-fuchsia-600 transition-colors">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trending Apps Section (NEW) */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#0f172a] mb-6">
                            Trending Reviews Apps <span className="text-[#0f172a]">2025</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Motivation App Review 2024",
                                date: "18 March 2024",
                                image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&w=600&q=80",
                                icon: "ri-double-quotes-l",
                                color: "text-white"
                            },
                            {
                                title: "Gratitude Journal App Review 2024",
                                date: "18 March 2024",
                                image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
                                icon: "ri-plant-line",
                                color: "text-white"
                            },
                            {
                                title: "Pidging App Review 2024",
                                date: "18 March 2024",
                                image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80",
                                icon: "ri-bird-line",
                                color: "text-white"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group cursor-pointer">
                                <div className="relative rounded-2xl overflow-hidden bg-black aspect-[4/3] mb-6 shadow-lg">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300"
                                    />
                                    <div className="absolute inset-0 p-8 flex flex-col justify-between">
                                        <div className="bg-white/10 backdrop-blur-md w-12 h-12 rounded-lg flex items-center justify-center text-2xl text-white">
                                            <i className={item.icon}></i>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white leading-tight pr-4">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                                <div className="pl-2">
                                    <div className="flex items-center text-gray-500 text-sm font-medium mb-2">
                                        <i className="ri-time-line mr-2"></i> {item.date}
                                    </div>
                                    <h4 className="text-xl font-bold text-[#0f172a] group-hover:text-[#f25a1a] transition-colors">{item.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* Process Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Level up your app with TWAP. Follow these 8 simple steps.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step, idx) => (
                            <div key={idx} className="relative p-6 rounded-xl bg-gray-50 border border-gray-100">
                                <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#f25a1a] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                                    {idx + 1}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mt-2 mb-2">{step.title}</h3>
                                <p className="text-sm text-gray-600">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            {/* <section className="py-20 bg-gray-50">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <button
                                    onClick={() => toggleAccordion(idx)}
                                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                >
                                    <span className="font-bold text-gray-900">{faq.question}</span>
                                    <i className={`ri-arrow-down-s-line text-2xl text-gray-400 transition-transform ${activeAccordion === idx ? 'rotate-180' : ''}`}></i>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${activeAccordion === idx ? 'max-h-40 p-6 pt-0' : 'max-h-0'}`}
                                >
                                    <p className="text-gray-600 border-t border-gray-100 pt-4">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* Final CTA */}
            <section className="py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-[#f25a1a] rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Go Viral?</h2>
                            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">Join thousands of successful developers who have launched their products with us.</p>
                            <Link to="/submit" className="inline-block px-10 py-4 bg-white text-[#f25a1a] rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
                                Submit Your App Now
                            </Link>
                        </div>
                        {/* Decorative circles */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl"></div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
