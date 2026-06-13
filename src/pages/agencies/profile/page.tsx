import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation'; // Optional styles
import Header from '../../../components/feature/Header';
import Footer from '../../../components/feature/Footer';

// Mock Data
const agencyData = {
    name: "VirtuTeams",
    category: "Digital Product Studio",
    rating: 4.9,
    reviews: 128,
    yearsExp: 12,
    avatar: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&w=300&q=80",
    cover: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
    flagshipService: {
        title: "Enterprise AI Ecosystems",
        description: "Specialized in building proprietary LLMs and secure neural networks for Fortune 500 scalability.",
        icon: "ri-brain-line"
    }
};

const portfolioItems = [
    {
        title: "Archin Studio",
        category: "Architecture Design",
        year: "2023",
        image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1200&q=80",
        color: "bg-gradient-to-br from-[#6366f1] to-[#a855f7]"
    },
    {
        title: "Zumar Firm",
        category: "Web Development",
        year: "2024",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
        color: "bg-[#111111]"
    },
    {
        title: "Nexa Finance",
        category: "Fintech Platform",
        year: "2023",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        color: "bg-[#0f172a]"
    }
];

const navigationItems = [
    // { name: "Identity", icon: "ri-information-line", color: "text-blue-600", id: "identity" },
    { name: "Overview", icon: "ri-focus-2-line", color: "text-green-600", id: "overview" },
    { name: "Portfolio", icon: "ri-briefcase-4-line", color: "text-orange-600", id: "portfolio" },
    { name: "Key Clients", icon: "ri-shake-hands-line", color: "text-purple-600", id: "key-clients" },
    { name: "Reviews", icon: "ri-star-smile-line", color: "text-yellow-600", id: "reviews" },
    { name: "Recognition", icon: "ri-award-line", color: "text-teal-600", id: "recognition" },
];

const LeadCaptureModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative animate-fadeIn">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <i className="ri-close-line text-2xl"></i>
                </button>
                <h3 className="text-2xl font-bold font-manrope text-[#1F2853] mb-2">Download Profile</h3>
                <p className="text-gray-600 mb-6 text-sm">Please provide your details to access the full agency credentials.</p>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-lime focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input type="email" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-lime focus:border-transparent outline-none transition-all" placeholder="john@company.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                        <input type="tel" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-lime focus:border-transparent outline-none transition-all" placeholder="+1 (555) 000-0000" />
                    </div>
                    <button type="button" onClick={() => { alert('Downloading...'); onClose(); }} className="w-full bg-brand-lime hover:bg-brand-orange text-[#1F2853] font-bold py-3.5 rounded-xl transition-all duration-300 mt-2">
                        Download Now
                    </button>
                </form>
            </div>
        </div>
    );
};


const AgencyProfilePage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [swiperInstance, setSwiperInstance] = useState<any>(null);

    // Focus Area Mock Data
    const focusOptions = [
        { label: 'No Code Development', pc: 100, tool: 'Webflow', color: '#06b6d4' },
        { label: 'Application Platforms', pc: 85, tool: 'Flutter', color: '#3B82F6' },
        { label: 'User Experience Focus', pc: 90, tool: 'Figma', color: '#F97316' },
        { label: 'Frameworks and CMS', pc: 80, tool: 'React/Next.js', color: '#8B5CF6' },
        { label: 'Influencer Marketing', pc: 75, tool: 'Various', color: '#EF4444' },
        { label: 'Mobile Platforms', pc: 95, tool: 'iOS/Android', color: '#10B981' },
        { label: 'Programming & Scripting', pc: 88, tool: 'TypeScript', color: '#F59E0B' },
        { label: 'Social Media Focus', pc: 70, tool: 'Instagram', color: '#EC4899' },
        { label: 'Mobile Focus', pc: 92, tool: 'React Native', color: '#6366F1' },
    ];
    const [selectedFocus, setSelectedFocus] = useState(focusOptions[0]);
    const [isFocusDropdownOpen, setIsFocusDropdownOpen] = useState(false);

    // Service Lines Data (Mock)
    const serviceLines = [
        { label: 'Mobile & App Marketing', pc: 10, color: '#3B82F6' },
        { label: 'Digital Marketing', pc: 8, color: '#1F2853' },
        { label: 'Web Development', pc: 10, color: '#14a800' },
        { label: 'UX/UI Design', pc: 10, color: '#06b6d4' },
        { label: 'Cloud Services', pc: 10, color: '#3B82F6' },
        { label: 'Content Strategy', pc: 10, color: '#8B5CF6' },
        { label: 'SEO Optimization', pc: 10, color: '#F59E0B' },
        { label: 'Data Analytics', pc: 10, color: '#EC4899' },
        { label: 'Consulting', pc: 22, color: '#0ea5e9' },
    ];
    const [hoveredServiceLine, setHoveredServiceLine] = useState(serviceLines[0]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Header />

            <main className="flex-grow pt-32 pb-12 px-4 sm:px-6 lg:px-8">
                <section id="identity" className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                    {/* Left Column: Identity Card (25-30% width) */}
                    <div className="lg:col-span-4 lg:sticky lg:top-8">
                        <div className="bg-gradient-to-br from-brand-lime/40 to-brand-orange/40 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl min-h-[600px] flex flex-col items-center text-center">
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-lime/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <img src={agencyData.cover} alt={agencyData.name} className="w-full h-full object-cover absolute top-0 left-0 z-0 brightness-[20%]" />

                            {/* Avatar */}
                            <div className="w-32 h-32 rounded-full p-1 bg-white/10 backdrop-blur-sm border border-white/20 mb-6 relative z-10">
                                <img src={agencyData.avatar} alt={agencyData.name} className="w-fukll h-full rounded-full object-cover" />
                            </div>

                            <h1 className="text-3xl font-bold font-manrope mb-2">{agencyData.name}</h1>
                            <div className="inline-block bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-brand-lime uppercase tracking-wider mb-8">
                                #{agencyData.category.replace(/\s/g, '')}
                            </div>

                            {/* Trust Badge (Static) */}
                            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 w-full flex items-center gap-4 mb-8 border border-white/10">
                                <div className="w-12 h-12 rounded-full bg-brand-lime/20 flex items-center justify-center text-brand-lime shrink-0 border border-brand-lime/20">
                                    <i className="ri-shield-check-fill text-xl"></i>
                                </div>
                                <div className="flex-grow">
                                    <div className="text-white font-bold text-sm flex items-center gap-2">
                                        Verified Agency
                                        <i className="ri-checkbox-circle-fill text-brand-lime text-xs"></i>
                                    </div>
                                    <div className="text-white/70 text-xs text-start">Identity & Portfolio Vetted</div>
                                </div>
                            </div>

                            {/* Stats Grid: A+ / 24 */}
                            <div className="grid grid-cols-2 w-full gap-8 border-t border-white/10 pt-8 mb-auto relative z-10">
                                <div>
                                    <div className="text-4xl font-bold mb-1">4.9</div>
                                    <div className="text-xs text-gray-300 uppercase">Rating</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold mb-1">{agencyData.yearsExp}</div>
                                    <div className="text-xs text-gray-300 uppercase">Years Exp</div>
                                </div>
                            </div>

                            {/* Bottom Button */}
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full mt-8 border border-white/30 hover:bg-white hover:text-[#1F2853] text-white py-4 rounded-xl flex items-center justify-center gap-2 transition-all font-medium relative z-10"
                            >
                                <i className="ri-download-line"></i>
                                Download Profile
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Dashboard Layout */}
                    <div className="lg:col-span-8 flex flex-col gap-6">

                        {/* Top Row */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">

                            {/* "Appointments" Card -> Navigation Menu (Approx 60% Width) */}
                            <div id="overview" className="md:col-span-7 bg-white rounded-[2.5rem] p-8 shadow-sm">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h2 className="text-xl font-bold text-[#1F2853] flex items-center gap-2">
                                            Overview
                                            <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">8</span>
                                        </h2>
                                        <p className="text-gray-400 text-xs mt-1">Agency Details</p>
                                    </div>
                                </div>

                                {/* Calendar-like grid for circular indicators */}
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                                    {navigationItems.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex flex-col items-center gap-2 group cursor-pointer"
                                            onClick={() => {
                                                const element = document.getElementById(item.id);
                                                if (element) {
                                                    const headerOffset = 100;
                                                    const elementPosition = element.getBoundingClientRect().top;
                                                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                                                    window.scrollTo({
                                                        top: offsetPosition,
                                                        behavior: "smooth"
                                                    });
                                                }
                                            }}
                                        >
                                            <div className={`w-12 h-16 rounded-2xl bg-gray-100 text-gray-400 group-hover:bg-[#1F2853] group-hover:text-white flex items-center justify-center transition-colors duration-300`}>
                                                <i className={`${item.icon} text-xl`}></i>
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide group-hover:text-[#1F2853] whitespace-nowrap">{item.name}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-brand-lime"></div>
                                            <span className="font-bold text-[#1F2853] text-sm">Response Time</span>
                                        </div>
                                        <span className="font-bold text-[#1F2853] text-sm">2 hrs</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                            <span className="font-bold text-[#1F2853] text-sm">Project Completion</span>
                                        </div>
                                        <span className="font-bold text-[#1F2853] text-sm">98%</span>
                                    </div>
                                </div>
                            </div>

                            {/* "Right Stack" -> Images and Stats (Approx 40% Width) */}
                            <div className="md:col-span-5 flex flex-col gap-4 h-full">
                                <div className="bg-[#1F2853] rounded-[2.5rem] relative overflow-hidden group flex-grow min-h-[300px] md:min-h-0 shadow-lg border border-[#1F2853]/50 flex flex-col justify-between p-8 transition-all hover:shadow-2xl">
                                    {/* Decorative Background Elements */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-lime/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-lime/20 transition-colors duration-500"></div>
                                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                                    <i className="ri-earth-line absolute -right-6 -top-6 text-[140px] text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700 pointer-events-none"></i>

                                    {/* Content */}
                                    <div className="relative z-10">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-md text-green-400 text-xs font-bold mb-6">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                            Accepting New Projects
                                        </div>

                                        <h3 className="text-white text-3xl font-bold font-manrope leading-tight mb-2">
                                            Visit <br /> Website
                                        </h3>
                                        <p className="text-gray-400 text-sm max-w-[150px]">Explore portfolio & case studies.</p>
                                    </div>

                                    {/* CTA Button */}
                                    <a
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative z-10 w-full bg-white hover:bg-brand-lime text-[#1F2853] font-bold py-4 px-6 rounded-xl flex items-center justify-between group/btn transition-all duration-300 shadow-lg mt-auto"
                                    >
                                        <span className="text-base font-bold truncate mr-2">virtuteams.com</span>
                                        <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-white/50 flex items-center justify-center transition-colors shrink-0">
                                            <i className="ri-arrow-right-up-line text-lg group-hover/btn:rotate-45 transition-transform duration-300"></i>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row: Banner (Check full package equivalent) */}
                        {/* Bottom Row: USP / Service Spotlight (Replaces CTA) */}
                        <div className="bg-[#E0E7FF] rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between min-h-[200px] border border-blue-100/50 shadow-md transition-shadow">

                            <div className="relative z-10 max-w-xl">
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#1F2853] text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100 shadow-sm">
                                    <i className="ri-flashlight-fill text-brand-orange"></i>
                                    Flagship Service
                                </span>
                                <h3 className="text-3xl font-bold text-[#1F2853] mb-3 font-manrope leading-tight">
                                    {agencyData.flagshipService.title}
                                </h3>
                                <p className="text-[#1F2853]/70 text-lg leading-relaxed mb-0">
                                    {agencyData.flagshipService.description}
                                </p>
                            </div>

                            {/* Visual Element: Glassmorphism Stack */}
                            <div className="relative mt-8 md:mt-0 md:ml-12 shrink-0 w-40 h-40 flex items-center justify-center">
                                {/* Back Glow */}
                                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>

                                {/* Floating Lenses */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm rounded-full border border-white/20 transform translate-x-4 -translate-y-2"></div>
                                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-brand-lime/20 to-transparent backdrop-blur-md rounded-full border border-white/30 transform -translate-x-2 translate-y-2"></div>

                                {/* Central Hub */}
                                <div className="relative z-10 w-28 h-28 bg-gradient-to-b from-white/40 to-white/10 backdrop-blur-xl rounded-[2rem] border border-white/80 shadow-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                    <div className="w-20 h-20 bg-white rounded-2xl shadow-lg border border-white flex items-center justify-center overflow-hidden">
                                        <img src={agencyData.avatar} alt={agencyData.name} className='w-full h-full object-cover' />
                                    </div>
                                    {/* Shine effect */}
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/40 to-transparent rounded-[2rem] pointer-events-none"></div>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>

                {/* External Rankings Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-7 pt-24 relative">

                    {/* Background Ambience */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-brand-lime/10 via-blue-500/5 to-brand-orange/10 rounded-full blur-[100px] animate-pulse pointer-events-none -z-10"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none -z-10"></div>

                    <div className="relative">
                        {/* Connecting Line (Behind) */}
                        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent -translate-y-1/2 hidden md:block"></div>

                        <div className="relative z-10 flex flex-wrap justify-center items-center gap-8 md:gap-0 md:-space-x-12 mx-auto">

                            {/* GoodFirms */}
                            <div className="w-64 h-64 rounded-full bg-white shadow-[0_15px_40px_rgb(0,0,0,0.06)] border flex flex-col items-center justify-center p-6 text-center transform hover:-translate-y-3 transition-all duration-300 group border-gray-300 relative z-10">
                                <div className="text-3xl font-bold text-gray-400 mb-2 group-hover:text-gray-600 transition-colors">GoodFirms</div>
                                <div className="text-2xl font-manrope font-bold text-[#1F2853]">4.8/5.0</div>
                                <div className="text-sm text-gray-400 uppercase tracking-widest mt-2">Review Rating</div>
                            </div>

                            {/* Clutch (Centerpiece) */}
                            <div className="w-80 h-80 rounded-full bg-white shadow-[0_40px_80px_rgb(31,40,83,0.15)] border-[6px] border-white ring-1 ring-gray-100 flex flex-col items-center justify-center p-10 text-center transform scale-100 hover:scale-105 transition-all duration-300 relative z-20">
                                <span className="absolute -top-5 bg-[#1F2853] text-white text-sm font-bold px-6 py-2 rounded-full uppercase tracking-wider shadow-xl">Top Rated</span>
                                <div className="text-6xl font-black text-[#1F2853] mb-3 font-manrope">Clutch</div>
                                <div className="text-xl text-gray-500 leading-tight">
                                    <span className="block text-3xl font-bold text-[#1F2853] mb-2">Top 50</span>
                                    Global Agencies
                                </div>
                                <div className="mt-5 flex gap-2">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <i key={i} className="ri-star-fill text-brand-orange text-lg"></i>
                                    ))}
                                </div>
                            </div>

                            {/* Upwork */}
                            <div className="w-64 h-64 rounded-full bg-white shadow-[0_15px_40px_rgb(20,168,0,0.1)] border border-gray-100 flex flex-col items-center justify-center p-6 text-center transform hover:-translate-y-3 transition-all duration-300 group border-[#14a800]/30 relative z-10">
                                <div className="text-3xl font-bold text-[#14a800] mb-2">Upwork</div>
                                <div className="text-2xl font-manrope font-bold text-[#1F2853]">98% Success</div>
                                <div className="text-sm text-gray-400 uppercase tracking-widest mt-2">Platinum Rated</div>
                            </div>

                            {/* Behance */}
                            <div className="w-64 h-64 rounded-full bg-white shadow-[0_15px_40px_rgb(23,105,255,0.1)] border border-gray-100 flex flex-col items-center justify-center p-6 text-center transform hover:-translate-y-3 transition-all duration-300 group border-[#1769ff]/30 relative z-0 md:translate-x-[-20%] lg:translate-x-0">
                                <i className="ri-behance-fill text-5xl text-[#1769ff] mb-2"></i>
                                <div className="text-2xl font-manrope font-bold text-[#1F2853]">Top 20</div>
                                <div className="text-sm text-gray-400 uppercase tracking-widest mt-2">Global Team</div>
                            </div>

                        </div>
                    </div>
                </section>
            </main>

            {/* Swiper JS Portfolio Carousel (Modern) */}
            <section id="portfolio" className="relative mt-24 mb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex items-end justify-between">
                    <div>
                        <h2 className="text-5xl font-bold text-[#1F2853] font-manrope mb-2">Featured Works</h2>
                        <p className="text-gray-500">Highlights from our recent collaborations.</p>
                    </div>
                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => swiperInstance?.slidePrev()}
                            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1F2853] hover:text-white hover:border-[#1F2853] transition-colors"
                        >
                            <i className="ri-arrow-left-line text-xl"></i>
                        </button>
                        <button
                            onClick={() => swiperInstance?.slideNext()}
                            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1F2853] hover:text-white hover:border-[#1F2853] transition-colors"
                        >
                            <i className="ri-arrow-right-line text-xl"></i>
                        </button>
                    </div>
                </div>

                <div className="pb-12 px-4">
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        spaceBetween={32}
                        slidesPerView={'auto'}
                        centeredSlides={true}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        onSwiper={(swiper) => setSwiperInstance(swiper)}
                        className="w-full !overflow-visible"
                    >
                        {portfolioItems.map((item, idx) => (
                            <SwiperSlide key={idx} className="!w-[90vw] !md:w-[800px]">
                                <div className={`relative w-full h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden group cursor-grab active:cursor-grabbing ${item.color} transition-transform duration-500`}>
                                    {/* Content */}
                                    <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-between z-20 text-white">
                                        <div className="flex justify-between items-start">
                                            <span className="text-xl font-medium opacity-80">{item.year}</span>
                                            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                                <i className="ri-arrow-right-up-line text-2xl"></i>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-lg font-medium opacity-80 mb-2">{item.category}</div>
                                            <h3 className="text-6xl md:text-8xl font-bold font-manrope leading-none tracking-tight">{item.title}</h3>
                                        </div>
                                    </div>

                                    {/* Image */}
                                    <img src={item.image} alt={item.title} className="absolute right-0 bottom-0 w-3/4 h-3/4 object-cover object-bottom transform translate-y-8 translate-x-8 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-700 z-10" />

                                    {/* Background Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent pointer-events-none"></div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* Key Clients / Partners Section */}
            <section id='key-clients' className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                    {/* Left Content */}
                    <div className="lg:col-span-4">
                        <div className="text-[#3B82F6] font-semibold tracking-wider uppercase mb-4 text-sm">Partners</div>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#1F2853] font-manrope mb-6">Our Valuable Partners</h2>
                        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                            As a user, it is important to have a positive experience when using a website or app. We prioritize partnerships that drive mutual growth.
                        </p>
                        {/* <button className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300">
                            See more customers
                        </button> */}
                    </div>

                    {/* Right Grid (Bento/Masonry) */}
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-3 gap-6">
                            {/* Row 1 */}
                            <div className="col-span-1 bg-white p-8 rounded-[2rem]  border border-gray-100 flex items-center justify-center min-h-[140px] shadow-md transition-shadow group">
                                <i className="ri-shape-2-fill text-4xl text-blue-500 transition-colors"></i>
                            </div>
                            <div className="col-span-2 bg-white p-8 rounded-[2rem]  border border-gray-100 flex items-center justify-center gap-3 min-h-[140px] shadow-md transition-shadow group">
                                <i className="ri-layout-masonry-fill text-4xl text-[#4353FF] transition-colors"></i>
                                <span className="text-2xl font-bold text-[#4353FF] transition-colors">webflow</span>
                            </div>

                            {/* Row 2 */}
                            <div className="col-span-2 bg-white p-8 rounded-[2rem]  border border-gray-100 flex items-center justify-center gap-3 min-h-[140px] shadow-md transition-shadow group">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-red-400/20 flex items-center justify-center group-hover:bg-[#F06A6A]/20 transition-colors">
                                        <div className="w-3 h-3 rounded-full bg-[#F06A6A]"></div>
                                    </div>
                                    <span className="text-2xl font-bold text-[#1F2853] transition-colors">asana</span>
                                </div>
                            </div>
                            <div className="col-span-1 bg-white p-8 rounded-[2rem]  border border-gray-100 flex items-center justify-center min-h-[140px] shadow-md transition-shadow group">
                                <i className="ri-discord-fill text-4xl text-[#5865F2] transition-colors"></i>
                            </div>

                            {/* Row 3 */}
                            <div className="col-span-1 bg-white p-8 rounded-[2rem]  border border-gray-100 flex items-center justify-center min-h-[140px] shadow-md transition-shadow group">
                                <i className="ri-pushpin-fill text-4xl text-[#E60023] transition-colors"></i>
                            </div>
                            <div className="col-span-2 bg-white p-8 rounded-[2rem] border border-gray-100 flex items-center justify-center gap-3 min-h-[140px] shadow-md transition-shadow group">
                                <i className="ri-atlassian-fill text-4xl text-[#0052CC] transition-colors"></i>
                                <span className="text-2xl font-bold text-[#0052CC] transition-colors">ATLASSIAN</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews & Feedback Section */}
            <section id="reviews" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold text-[#1F2853] font-manrope">Review & Comments</h2>
                    <hr className="my-6" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Left Column: Rating & Comments */}
                        <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-10">
                            {/* Overall Rating */}
                            <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-3xl text-center">
                                <div className="text-8xl font-black text-[#1F2853] font-manrope leading-none mb-4">4.9</div>
                                <div className="flex gap-2 mb-3">
                                    {[1, 2, 3, 4].map((star) => (
                                        <i key={star} className="ri-star-fill text-[#FFB800] text-3xl"></i>
                                    ))}
                                    <i className="ri-star-half-fill text-[#FFB800] text-3xl"></i>
                                </div>
                                <p className="text-gray-400 font-medium">(1,297 Reviews)</p>
                            </div>

                            {/* Comments List */}
                            <div>
                                <h3 className="text-xl font-bold text-[#1F2853] mb-6">Most liked comments</h3>
                                <div className="flex flex-col gap-6">
                                    {/* Comment 1 */}
                                    <div className="p-6 border border-gray-300 rounded-3xl bg-white hover:shadow-lg transition-all duration-300">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                                    <i className="ri-user-smile-line text-xl"></i>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-[#1F2853]">Michael Chen</div>
                                                    <div className="text-xs text-gray-400 uppercase tracking-widest">18 Apr 2025</div>
                                                </div>
                                            </div>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <i key={star} className="ri-star-fill text-[#FFB800] text-sm"></i>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-500 text-sm leading-relaxed mb-4">
                                            Exceptional attention to detail. The team at The Web App Pro didn't just build our platform; they optimized our entire workflow. Their AI integration suggestions increased our efficiency by 40%.
                                        </p>
                                        <div className="flex justify-end items-center gap-2 text-blue-500 text-sm font-semibold">
                                            <i className="ri-thumb-up-fill"></i>
                                            <span>298 Liked</span>
                                        </div>
                                    </div>

                                    {/* Comment 2 */}
                                    <div className="p-6 border border-gray-300 rounded-3xl bg-white hover:shadow-lg transition-all duration-300">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                                    <i className="ri-user-smile-line text-xl"></i>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-[#1F2853]">Sarah Jenkins</div>
                                                    <div className="text-xs text-gray-400 uppercase tracking-widest">15 Apr 2025</div>
                                                </div>
                                            </div>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <i key={star} className="ri-star-fill text-[#FFB800] text-sm"></i>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-500 text-sm leading-relaxed mb-4">
                                            Transparent communication from day one. I was impressed by how they handled the complexity of our fintech requirements without compromising on security or UI/UX. Highly recommended!
                                        </p>
                                        <div className="flex justify-end items-center gap-2 text-blue-500 text-sm font-semibold">
                                            <i className="ri-thumb-up-line"></i>
                                            <span>178 Liked</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Element of Evaluation */}
                        <div className="lg:col-span-12 xl:col-span-7">
                            <h3 className="text-xl font-bold text-[#1F2853] mb-8">Element of Evaluation</h3>

                            <div className="grid gap-8 md:p-5 rounded-3xl md:border border-gray-300">
                                {/* Metric 1: Service Lines (Interactive) */}
                                <div className="bg-gray-100 rounded-3xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-end mb-4 font-bold text-[#1F2853]">
                                        <span>Service Lines</span>
                                    </div>
                                    <div className="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden mb-3 flex">
                                        {/* Dynamic Segments */}
                                        {serviceLines.map((service, index) => (
                                            <div
                                                key={index}
                                                className="h-full transition-all duration-300 hover:opacity-80 cursor-pointer relative group"
                                                style={{ width: `${service.pc}%`, backgroundColor: service.color }}
                                                onMouseEnter={() => setHoveredServiceLine(service)}
                                            >
                                                {/* Hover Glow Effect */}
                                                {hoveredServiceLine.label === service.label && (
                                                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-medium h-6">
                                        <div className="w-3 h-3 rounded-sm transition-colors duration-300" style={{ backgroundColor: hoveredServiceLine.color }}></div>
                                        <span className="text-gray-500 transition-all duration-300">{hoveredServiceLine.label}</span>
                                        <span className="ml-auto text-[#1F2853] font-bold transition-all duration-300">: {hoveredServiceLine.pc}%</span>
                                    </div>
                                </div>

                                {/* Metric 2: Focus Area (Interactive) */}
                                <div className="bg-gray-100 rounded-3xl p-5 border border-gray-100 hover:shadow-md transition-shadow relative z-20">
                                    <div className="flex justify-between items-end mb-4 font-bold text-[#1F2853]">
                                        <span>Focus Area</span>

                                        {/* Dropdown */}
                                        <div className="relative">
                                            <button
                                                onClick={() => setIsFocusDropdownOpen(!isFocusDropdownOpen)}
                                                className="text-xs bg-gray-200 px-3 py-1.5 rounded flex items-center gap-2 text-gray-700 hover:bg-gray-300 transition-colors"
                                            >
                                                {selectedFocus.label}
                                                <i className={`ri-arrow-down-s-line transition-transform ${isFocusDropdownOpen ? 'rotate-180' : ''}`}></i>
                                            </button>

                                            {isFocusDropdownOpen && (
                                                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 max-h-60 overflow-y-auto z-30">
                                                    {focusOptions.map((option, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => {
                                                                setSelectedFocus(option);
                                                                setIsFocusDropdownOpen(false);
                                                            }}
                                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition-colors ${selectedFocus.label === option.label ? 'text-blue-600 font-bold bg-blue-50' : 'text-gray-600'}`}
                                                        >
                                                            {option.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden mb-3">
                                        <div
                                            className="absolute top-0 left-0 h-full rounded-full transition-all duration-700 ease-out"
                                            style={{ width: `${selectedFocus.pc}%`, backgroundColor: selectedFocus.color }}
                                        ></div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-medium">
                                        <div className="w-3 h-3 rounded-sm transition-colors duration-300" style={{ backgroundColor: selectedFocus.color }}></div>
                                        <span className="text-gray-500">{selectedFocus.tool}</span>
                                        <span className="ml-auto text-[#1F2853] font-bold transition-all duration-300 relative">
                                            : {selectedFocus.pc}%
                                        </span>
                                    </div>
                                </div>

                                {/* Metric 3: Industry */}
                                <div className="bg-gray-100 rounded-3xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-end mb-4 font-bold text-[#1F2853]">
                                        <span>Industry</span>
                                    </div>
                                    <div className="relative w-full h-4 bg-[#1F2853] rounded-full overflow-hidden mb-3">
                                        <div className="absolute top-0 left-0 h-full w-[70%] bg-[#0ea5e9] rounded-l-full border-r-2 border-white"></div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-medium">
                                        <div className="w-3 h-3 bg-[#0ea5e9] rounded-sm"></div>
                                        <span className="text-gray-500">Advertising & Marketing</span>
                                        <span className="ml-auto text-[#1F2853] font-bold">: 70%</span>
                                    </div>
                                </div>

                                {/* Metric 4: Client Size */}
                                <div className="bg-gray-100 rounded-3xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-end mb-4 font-bold text-[#1F2853]">
                                        <span>Client Size</span>
                                    </div>
                                    <div className="relative w-full h-4 bg-[#1F2853] rounded-full overflow-hidden mb-3">
                                        <div className="absolute top-0 left-0 h-full w-[95%] bg-[#0ea5e9] rounded-l-full border-r-2 border-white"></div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-medium">
                                        <div className="w-3 h-3 bg-[#0ea5e9] rounded-sm"></div>
                                        <span className="text-gray-500">Small Business {'(<$10M)'}</span>
                                        <span className="ml-auto text-[#1F2853] font-bold">: 95%</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Industry Recognition Section (Dark Mode / Spotlight) */}
            <section id="recognition" className="relative w-full py-32 overflow-hidden bg-[#0F1125]">
                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,#4338ca_0%,transparent_50%)] opacity-40"></div>
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,#c026d3_0%,transparent_50%)] opacity-30"></div>

                {/* Spotlight Beam */}
                <div className="absolute top-[-20%] left-[20%] w-[400px] h-[800px] bg-blue-500/20 blur-[100px] rotate-45 transform pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Left: Podium / Visuals (Simplified for CSS) */}
                        <div className="relative h-[400px] flex items-end justify-center">
                            {/* Podium Steps */}
                            <div className="absolute bottom-0 w-64 h-12 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-full shadow-[0_0_50px_rgba(59,130,246,0.5)] z-10"></div>
                            <div className="absolute bottom-6 w-52 h-10 bg-gradient-to-r from-blue-800 to-indigo-800 rounded-full z-20 shadow-lg"></div>
                            <div className="absolute bottom-12 w-40 h-8 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-full z-30 shadow-lg flex items-center justify-center">
                                {/* Glowing Particle Effect */}
                                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-1 h-32 bg-gradient-to-t from-blue-400/50 to-transparent blur-sm"></div>
                            </div>

                            {/* Floating Particles */}
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-pulse opacity-50"></div>
                                <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-70"></div>
                                <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-700 opacity-60"></div>
                            </div>
                        </div>

                        {/* Right: Glass Card */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 text-white overflow-hidden">
                                {/* Card Highlight */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

                                <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold tracking-wider uppercase mb-8">
                                    Global Recognition
                                </div>

                                <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/25 shrink-0">
                                        <i className="ri-medal-fill text-4xl text-white"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-4xl font-bold font-manrope leading-tight mb-2">Clutch Champion <br /> 2025 Winner</h3>
                                        <div className="h-1 w-20 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>

                                <p className="text-gray-300 leading-relaxed text-lg border-l-2 border-white/10 pl-6">
                                    Recognized as a top B2B company for delivering exceptional digital products. We've been honored with over 15+ international awards for our commitment to innovation, code quality, and client success.
                                </p>

                                {/* Decorative Grid overlay */}
                                <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:10px_10px] [mask-image:radial-gradient(ellipse_100%_100%_at_100%_100%,#000_70%,transparent_100%)]"></div>
                            </div>
                        </div>
                    </div>

                    {/* Recognition Grid Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                        {/* Card 1 */}
                        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors group">
                            <div className="text-blue-300 text-xs font-bold tracking-wider uppercase mb-6">Recognition 01</div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-lime to-green-400 flex items-center justify-center text-[#1F2853]">
                                    <i className="ri-checkbox-circle-fill text-2xl"></i>
                                </div>
                                <h4 className="text-xl font-bold text-white font-manrope">Verified Expert</h4>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Officially verified by major platforms for adherence to best practices and high-quality code standards.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors group">
                            <div className="text-purple-300 text-xs font-bold tracking-wider uppercase mb-6">Recognition 02</div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                                    <i className="ri-star-smile-fill text-2xl"></i>
                                </div>
                                <h4 className="text-xl font-bold text-white font-manrope">User Choice</h4>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Voted by clients for exceptional communication, transparency, and timely delivery of projects.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors group">
                            <div className="text-orange-300 text-xs font-bold tracking-wider uppercase mb-6">Recognition 03</div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-orange to-red-400 flex items-center justify-center text-white">
                                    <i className="ri-layout-masonry-fill text-2xl"></i>
                                </div>
                                <h4 className="text-xl font-bold text-white font-manrope">Design Leader</h4>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Celebrated for creating intuitive, user-centric interfaces that drive engagement and conversion.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <LeadCaptureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <Footer />
        </div>
    );
};

export default AgencyProfilePage;
