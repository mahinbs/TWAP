import { useState } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

// App Card Component to handle individual state
const AppCard = ({ app, rank, id }: { app: any; rank: number; id?: string }) => {
    const [isProsConsOpen, setIsProsConsOpen] = useState(false);

    return (
        <div id={id} className="bg-white rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-8 flex flex-col gap-4 sm:gap-6 shadow-lg shadow-gray-200/50 hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden group w-full max-w-full">
            {/* Rank Number Background (Large & subtle) */}
            <div className="hidden md:block absolute -right-6 -top-6 text-[120px] font-bold text-gray-50 select-none pointer-events-none group-hover:text-brand-lime/10 transition-colors font-['Manrope']">
                {rank}
            </div>

            <div className="flex flex-col md:flex-row gap-5 md:gap-6 md:items-start relative z-10">
                {/* App Icon */}
                <div className="flex flex-row md:block items-center gap-4">
                    <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-50 rounded-2xl flex items-center justify-center p-3 md:p-4 shadow-inner border border-gray-100">
                            <img src={app.logo} alt={app.name} className="w-full h-full object-cover rounded-xl" />
                        </div>
                        <div className="absolute -top-2 -left-2 md:-top-3 md:-left-3 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-gray-900 text-white font-bold rounded-full text-xs md:text-sm border-2 border-white shadow-md">
                            {rank}
                        </div>
                    </div>

                    {/* Mobile Only: Name & Tagline Next to Logo */}
                    <div className="md:hidden flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-[#1A2E35] font-['Manrope'] mb-0.5 truncate">{app.name}</h3>
                        <p className="text-sm text-[#4A5E65] font-medium text-wrap max-w-[12rem] md:max-w-fit">{app.tagline}</p>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* Desktop Header: Name, Badge, Tagline */}
                    <div className="hidden md:flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                        <div>
                            <h3 className="text-2xl font-bold text-[#1A2E35] font-['Manrope'] mb-1 group-hover:text-brand-orange transition-colors cursor-pointer">{app.name}</h3>
                            <p className="text-[#4A5E65] font-medium">{app.tagline}</p>
                        </div>
                    </div>

                    {/* Badges - Visible on both but styled differently */}
                    <div className="flex flex-wrap gap-2 mb-4 md:mb-3">
                        {app.badges.map((badge: any, idx: number) => (
                            <div key={idx} className="relative group/badge">
                                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-50 flex items-center justify-center ${badge.color} text-lg md:text-xl shadow-sm border border-gray-300 cursor-help hover:bg-gray-100 transition-colors`}>
                                    <i className={badge.icon}></i>
                                </div>
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg opacity-0 invisible group-hover/badge:opacity-100 group-hover/badge:visible transition-all whitespace-nowrap z-20">
                                    {badge.tooltip}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Ratings, Tags, Downloads */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 pt-3 sm:pt-4 border-t border-gray-100 mt-2">
                        <div className="space-y-2 sm:space-y-3 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                <div className="flex text-[#FACC15] text-sm sm:text-base md:text-lg shrink-0">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <i key={star} className={`ri-star-${star <= Math.floor(app.rating) ? 'fill' : 'fill'} ${(star > Math.floor(app.rating) && star <= app.rating + 0.5) ? 'half-fill' : ''}`}></i>
                                    ))}
                                </div>
                                <div className="flex items-baseline gap-1 shrink-0">
                                    <span className="text-sm sm:text-base md:text-lg font-bold text-[#1A2E35]">{app.rating}</span>
                                    <span className="text-[10px] sm:text-xs md:text-sm text-gray-400">/5</span>
                                </div>
                                <span className="text-[10px] sm:text-xs md:text-sm text-[#4A5E65] font-medium px-2 py-0.5 bg-gray-100 rounded-full truncate max-w-[120px] sm:max-w-none">{app.reviews}</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                {app.tags.map((tag: string, idx: number) => (
                                    <span key={idx} className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-brand-burgundy/60 bg-gray-50 px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 md:py-1.5 rounded-md sm:rounded-lg border border-brand-burgundy/20 hover:border-gray-300 transition-colors cursor-default">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto mt-4 md:mt-0">
                            <a href={app.downloads.ios} className="flex-1 min-w-0 sm:flex-none sm:w-fit md:min-w-[120px] flex items-center justify-center gap-2 px-3 py-2.5 sm:px-4 bg-gray-900 text-white rounded-xl hover:bg-black transition-colors shadow-lg shadow-gray-200 hover:shadow-gray-300 active:scale-95 duration-200 text-sm sm:text-base">
                                <i className="ri-apple-fill text-lg sm:text-xl shrink-0"></i>
                                <span className="font-medium truncate">iOS</span>
                            </a>
                            <a href={app.downloads.android} className="flex-1 min-w-0 sm:flex-none sm:w-fit md:min-w-[120px] flex items-center justify-center gap-2 px-3 py-2.5 sm:px-4 bg-gray-900 text-white rounded-xl hover:bg-black transition-colors shadow-lg shadow-gray-200 hover:shadow-gray-300 active:scale-95 duration-200 text-sm sm:text-base">
                                <i className="ri-google-play-fill text-lg sm:text-xl shrink-0"></i>
                                <span className="font-medium truncate">Android</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expandable Sections */}
            <div className="relative z-10 space-y-3 mt-1 md:mt-2">

                {/* Pros & Cons Accordion */}
                <div className="border border-brand-orange/20 rounded-2xl overflow-hidden bg-brand-orange/5">
                    <button
                        onClick={() => setIsProsConsOpen(!isProsConsOpen)}
                        className="w-full flex items-center justify-between p-3 md:p-4 bg-brand-orange/5 hover:bg-brand-orange/10 transition-colors text-left"
                    >
                        <h4 className="font-bold text-[#1A2E35] text-sm md:text-base">Pros & Cons</h4>
                        <i className={`ri-arrow-down-s-line text-xl transition-transform ${isProsConsOpen ? 'rotate-180' : ''}`}></i>
                    </button>

                    {isProsConsOpen && (
                        <div className="p-4 md:p-6 grid md:grid-cols-2 gap-6 md:gap-8 border-t border-brand-burgundy/20">
                            {/* Pros */}
                            <div className="space-y-3">
                                <h5 className="font-bold text-sm text-[#1A2E35] bg-green-200/50 w-fit px-3 py-1 rounded-lg">Pros</h5>
                                <ul className="space-y-2">
                                    {app.pros?.map((pro: string, i: number) => (
                                        <li key={i} className="flex items-start gap-2.5 text-sm text-[#4A5E65]">
                                            <i className="ri-checkbox-circle-fill text-green-600 -mt-1 text-lg"></i>
                                            <span className="leading-snug">{pro}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Cons */}
                            <div className="space-y-3">
                                <h5 className="font-bold text-sm text-[#1A2E35] bg-red-100 w-fit px-3 py-1 rounded-lg">Cons</h5>
                                <ul className="space-y-2">
                                    {app.cons?.map((con: string, i: number) => (
                                        <li key={i} className="flex items-start gap-2.5 text-sm text-[#4A5E65]">
                                            <i className="ri-thumb-down-fill text-red-500 -mt-1 text-lg"></i>
                                            <span className="leading-snug">{con}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function BestProjectManagementSoftwarePage() {
    const [showAllLaunches, setShowAllLaunches] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isTOCOpen, setIsTOCOpen] = useState(false);
    const itemsPerPage = 5;

    const logos = [
        { name: "ClickUp", image: "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", style: { top: "10%", left: "70%" }, animation: "animate-float-random-3", delay: "animation-delay-500" },
        { name: "Airtable", image: "https://images.pexels.com/photos/1181438/pexels-photo-1181438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", style: { top: "60%", left: "85%" }, animation: "animate-float-random-2", delay: "animation-delay-4000" },
        { name: "Linear", image: "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", style: { top: "25%", left: "50%" }, animation: "animate-float-random-1", delay: "animation-delay-2000" },
        { name: "Height", image: "https://images.pexels.com/photos/1181373/pexels-photo-1181373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", style: { top: "75%", left: "20%" }, animation: "animate-float-random-3", delay: "animation-delay-1000" },
        { name: "Wrike", image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", style: { top: "15%", left: "25%" }, animation: "animate-float-random-2", delay: "animation-delay-3000" },
        { name: "Basecamp", image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", style: { top: "85%", left: "65%" }, animation: "animate-float-random-1", delay: "animation-delay-500" },
    ];

    const apps = [
        {
            name: "Notion",
            tagline: "The all-in-one workspace",
            rating: 4.8,
            reviews: "1.3K reviews",
            tags: ["Note and writing apps", "No-code Platforms", "AI notetakers"],
            logo: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            badges: [
                { icon: "ri-trophy-fill", tooltip: "#1 Product of the Month", color: "text-yellow-500" },
                { icon: "ri-medal-fill", tooltip: "Editor's Choice", color: "text-blue-400" }
            ],
            downloads: { android: "#", ios: "#" },
            pros: ["Flexible and customizable", "Great for documentation", "Strong community templates"],
            cons: ["Steep learning curve", "Mobile app can be slow"],

        },
        {
            name: "Monday.com",
            tagline: "A new way of working",
            rating: 4.7,
            reviews: "2.1K reviews",
            tags: ["Project Management", "Collaboration", "CRM"],
            logo: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            badges: [
                { icon: "ri-vip-crown-fill", tooltip: "Most Popular", color: "text-amber-500" }
            ],
            downloads: { android: "#", ios: "#" },
            pros: ["Visual and intuitive interface", "Automation features", "Great integrations"],
            cons: ["Can get expensive", "Limited sub-item features in basic plan"],

        },
        {
            name: "Jira",
            tagline: "The #1 software development tool used by agile teams",
            rating: 4.6,
            reviews: "5K+ reviews",
            tags: ["Issue Tracking", "Agile", "DevOps"],
            logo: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            badges: [
                { icon: "ri-award-fill", tooltip: "Best for Developers", color: "text-purple-500" }
            ],
            downloads: { android: "#", ios: "#" },
            pros: ["Industry standard for Agile", "Powerful reporting", "Extensive ecosystem"],
            cons: ["Complex configuration", "UI can be cluttered"],

        },
        {
            name: "Trello",
            tagline: "Visual collaboration tool",
            rating: 4.5,
            reviews: "3.5K+ reviews",
            tags: ["Kanban", "Task Management", "Org Charts"],
            logo: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            badges: [],
            downloads: { android: "#", ios: "#" },
            pros: ["Simple and easy to use", "Free tier is generous", "Visual Kanban boards"],
            cons: ["Limited functionality for complex projects", "Reporting is basic"],

        },
        {
            name: "Asana",
            tagline: "The easiest way to manage team projects",
            rating: 4.7,
            reviews: "4K+ reviews",
            tags: ["Work Management", "Productivity", "Roadmaps"],
            logo: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            badges: [
                { icon: "ri-star-smile-fill", tooltip: "Best Support", color: "text-green-500" }
            ],
            downloads: { android: "#", ios: "#" },
            pros: ["Beautiful interface", "Multiple project views", "Good for marketing teams"],
            cons: ["Task assignment limitations", "Pricey for premium features"],

        },
        {
            name: "Todoist",
            tagline: "Organize your life and work",
            rating: 4.8,
            reviews: "900+ reviews",
            tags: ["To-Do Lists", "Personal Productivity", "Task Manager"],
            logo: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            badges: [],
            downloads: { android: "#", ios: "#" },
            pros: ["Quick add feature", "Cross-platform support", "Natural language parsing"],
            cons: ["Project features are limited", "No Kanban in free version"],

        },
        {
            name: "ClickUp",
            tagline: "One app to replace them all",
            rating: 4.7,
            reviews: "3.2K reviews",
            tags: ["Project Management", "Docs", "Goals"],
            logo: "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            badges: [
                { icon: "ri-rocket-2-fill", tooltip: "Fastest Growing", color: "text-red-500" }
            ],
            downloads: { android: "#", ios: "#" },
            pros: ["Incredibly feature-rich", "Highly customizable", "Generous free plan"],
            cons: ["Can be overwhelming", "Occasional performance glitches"],

        },
        {
            name: "Linear",
            tagline: "The issue tracking tool you'll enjoy using",
            rating: 4.9,
            reviews: "800+ reviews",
            tags: ["Issue Tracking", "Product Development"],
            logo: "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            badges: [
                { icon: "ri-magic-line", tooltip: "Best UX", color: "text-purple-600" }
            ],
            downloads: { android: "#", ios: "#" },
            pros: ["Fast and performant", "Beautiful keyboard-driven interface", "Opinionated workflow"],
            cons: ["Limited flexibility", "Geared strictly towards software teams"],

        },
        {
            name: "Airtable",
            tagline: "Connect everything. Achieve anything.",
            rating: 4.6,
            reviews: "2.5K reviews",
            tags: ["Low-code", "Database", "Workflows"],
            logo: "https://images.pexels.com/photos/1181438/pexels-photo-1181438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            badges: [],
            downloads: { android: "#", ios: "#" },
            pros: ["Flexible database-spreadsheet hybrid", "Powerful integrations", "Great for data management"],
            cons: ["Learning curve for advanced features", "Can get expensive quickly"],

        },
        {
            name: "Height",
            tagline: "The all-in-one project management tool",
            rating: 4.5,
            reviews: "500+ reviews",
            tags: ["Project Management", "Tasks", "Chat"],
            logo: "https://images.pexels.com/photos/1181373/pexels-photo-1181373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            badges: [],
            downloads: { android: "#", ios: "#" },
            pros: ["Spreadsheet-like flexibility", "Contextual chat", "Automated workflows"],
            cons: ["Newer to the market", "Smaller community"],

        },
        {
            name: "Basecamp",
            tagline: "The all-in-one toolkit for working remotely",
            rating: 4.4,
            reviews: "4.1K reviews",
            tags: ["Remote Work", "Project Management"],
            logo: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            badges: [],
            downloads: { android: "#", ios: "#" },
            pros: ["Flat pricing model", "All-in-one features", "Great for remote teams"],
            cons: ["Limited customization", "No Gantt charts"],

        },
        {
            name: "Wrike",
            tagline: "Versatile & robust project management",
            rating: 4.3,
            reviews: "2K+ reviews",
            tags: ["Enterprise", "Gantt Charts"],
            logo: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            badges: [],
            downloads: { android: "#", ios: "#" },
            pros: ["Robust enterprise features", "Excellent Gantt charts", "Proofing tools"],
            cons: ["Interface can be overwhelming", "Complex pricing"],

        }
    ];

    const recentLaunches = [
        {
            name: "Plane",
            tagline: "AI-native project management",
            time: "3mo ago",
            logo: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            name: "Orchestra",
            tagline: "A chat-centric workspace for builders and modern teams",
            time: "3mo ago",
            logo: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            name: "Korgi",
            tagline: "AI-built project boards powered by your productivity stack",
            time: "1mo ago",
            logo: "https://images.pexels.com/photos/1181243/pexels-photo-1181243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            name: "Linear",
            tagline: "The issue tracking tool you'll enjoy using",
            time: "2mo ago",
            logo: "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            name: "Height",
            tagline: "The all-in-one project management tool",
            time: "1mo ago",
            logo: "https://images.pexels.com/photos/1181373/pexels-photo-1181373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            name: "ClickUp",
            tagline: "One app to replace them all",
            time: "4mo ago",
            logo: "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
    ];

    return (
        <div className="min-h-screen bg-[#fffdfb] font-['Poppins']">
            <Header />
            <main className="">
                <div className="relative overflow-hidden pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20"
                    style={{
                        background: 'linear-gradient(to bottom, #1B1B36 45%, #56122D)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}>

                    {/* Breadcrumbs */}
                    {/* <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8 overflow-x-auto whitespace-nowrap">
                        <span className="hover:text-brand-dark cursor-pointer transition-colors">Home</span>
                        <i className="ri-arrow-right-s-line text-xs"></i>
                        <span className="hover:text-brand-dark cursor-pointer transition-colors">Product categories</span>
                        <i className="ri-arrow-right-s-line text-xs"></i>
                        <span className="hover:text-brand-dark cursor-pointer transition-colors">Productivity</span>
                        <i className="ri-arrow-right-s-line text-xs"></i>
                        <span className="text-brand-dark font-medium">Project management software</span>
                    </nav> */}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center relative z-10 min-h-[380px] sm:min-h-[420px] md:min-h-[500px] rounded-2xl sm:rounded-[3rem] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                        {/* Left Column: Text */}
                        <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
                            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold text-white font-['Manrope'] !leading-tight tracking-tight">
                                The best <span className="relative inline-block">project management </span> softwares of 2026
                            </h1>
                            <p className="text-base sm:text-lg text-white/80 font-medium leading-relaxed max-w-xl">
                                Project management software helps teams and individuals plan, organize, and track projects efficiently. It provides a centralized platform for managing tasks, resources, timelines, and communication within a project.
                            </p>
                        </div>

                        {/* Right Column: Logos (Animated Galaxy) */}
                        <div className="relative h-full min-h-[280px] sm:min-h-[320px] md:min-h-[400px] w-full flex items-center justify-center order-1 lg:order-2">
                            {/* Background Glows */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-orange/20 rounded-full blur-[100px] animate-pulse"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-lime/10 rounded-full blur-[80px] animate-pulse animation-delay-2000"></div>

                            {logos.map((logo, index) => (
                                <div
                                    key={index}
                                    className={`absolute w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20 shadow-2xl flex items-center justify-center p-2 sm:p-3 md:p-4 hover:scale-110 hover:bg-white/20 transition-all duration-300 cursor-pointer group ${logo.animation} ${logo.delay}`}
                                    style={logo.style}
                                >
                                    <div className="w-full h-full rounded-xl overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-black/0 to-white/0 group-hover:from-black/10 transition-colors z-10"></div>
                                        <img src={logo.image} alt={logo.name} className="w-full h-full object-cover" />
                                    </div>
                                    {/* Tooltipish name */}
                                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                        {logo.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-20 flex flex-col-reverse lg:grid grid-cols-1 lg:grid-cols-[65%,1fr] gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
                    {/* App List Section */}
                    <div className="space-y-4 sm:space-y-6 min-w-0">
                        {apps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((app, index) => {
                            // Calculate the actual rank index based on current page
                            const rank = (currentPage - 1) * itemsPerPage + index + 1;
                            return (
                                <AppCard key={index} app={app} rank={rank} id={`app-${rank}`} />
                            );
                        })}

                        {/* Pagination Controls */}
                        {apps.length > itemsPerPage && (
                            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 pt-4 px-1">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors shrink-0 ${currentPage === 1
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-white text-[#1A2E35] hover:bg-gray-100 shadow-sm border border-gray-200 cursor-pointer'
                                        }`}
                                >
                                    <i className="ri-arrow-left-s-line text-lg sm:text-xl"></i>
                                </button>

                                <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                                    {Array.from({ length: Math.ceil(apps.length / itemsPerPage) }, (_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer shrink-0 ${currentPage === i + 1
                                                ? 'bg-[#1A2E35] text-white shadow-md scale-105 sm:scale-110'
                                                : 'bg-white text-[#4A5E65] hover:bg-gray-50 border border-gray-200'
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(apps.length / itemsPerPage)))}
                                    disabled={currentPage === Math.ceil(apps.length / itemsPerPage)}
                                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors shrink-0 ${currentPage === Math.ceil(apps.length / itemsPerPage)
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-white text-[#1A2E35] hover:bg-gray-100 shadow-sm border border-gray-200 cursor-pointer'
                                        }`}
                                >
                                    <i className="ri-arrow-right-s-line text-lg sm:text-xl"></i>
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6 sm:space-y-8 lg:sticky lg:top-24 h-fit">
                        {/* Table of Content Widget */}
                        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md border border-gray-100 transition-all duration-300">
                            <button
                                onClick={() => setIsTOCOpen(!isTOCOpen)}
                                className="w-full flex items-center justify-between text-left"
                            >
                                <h3 className="text-base sm:text-xl font-bold text-[#1A2E35] font-['Manrope']">Table of Content</h3>
                                <i className={`ri-arrow-up-s-fill text-brand-burgundy text-xl sm:text-2xl transition-transform shrink-0 ml-2 ${isTOCOpen ? '' : 'rotate-180'}`}></i>
                            </button>

                            {isTOCOpen && (
                                <div className="max-h-[240px] sm:max-h-[300px] overflow-y-auto pr-2 custom-scrollbar space-y-2 mt-3 sm:mt-4 animate-fadeIn w-full">
                                    {apps.map((app, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                const page = Math.floor(index / itemsPerPage) + 1;
                                                setCurrentPage(page);

                                                // Small timeout to allow React to render the new page
                                                setTimeout(() => {
                                                    const element = document.getElementById(`app-${index + 1}`);
                                                    if (element) {
                                                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                    }
                                                }, 100);
                                            }}
                                            className="w-full text-left py-2 px-3 rounded-lg text-[#4A5E65] hover:bg-gray-50 hover:text-[#1A2E35] transition-colors text-xs sm:text-sm font-medium truncate flex items-center gap-2 sm:gap-3 min-w-0"
                                        >
                                            <span className="text-gray-400 font-mono text-xs w-4 sm:w-5 shrink-0">{index + 1}.</span>
                                            <span className="truncate">{app.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Recent Launches Sidebar */}
                        <div className="bg-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                            <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                <div className="w-2 h-2 rounded-full bg-green-600 shrink-0"></div>
                                <h3 className="font-bold text-[#1A2E35] text-base sm:text-lg">Recent launches</h3>
                            </div>

                            <p className="text-xs sm:text-sm text-[#4A5E65] leading-relaxed mb-6 sm:mb-8">
                                <span className="text-[#CA8A04] font-bold">Plane</span> centers sprints and docs with flexible views, automations, and self-hosting for teams replacing fragmented stacks. <span className="text-[#CA8A04] font-bold">Orchestra</span> fuses chat, tasks, and calls so conversations stay attached to work, with AI summaries and unified search. For rapid setup across Google/Microsoft ecosystems, <span className="text-[#CA8A04] font-bold">Korgi</span> auto-builds project boards, links docs/meetings, and exports organized workspaces, ideal for cross-functional launches and client collaborations.
                            </p>

                            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                                {(showAllLaunches ? recentLaunches : recentLaunches.slice(0, 3)).map((launch, index) => (
                                    <div key={index} className="flex items-start gap-3 sm:gap-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg sm:rounded-xl flex items-center justify-center p-1.5 sm:p-2 shadow-sm flex-shrink-0">
                                            <img src={launch.logo} alt={launch.name} className="w-full h-full object-cover rounded-md sm:rounded-lg" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline gap-2 mb-0.5 sm:mb-1">
                                                <h4 className="font-bold text-[#1A2E35] text-xs sm:text-sm truncate">{launch.name}</h4>
                                                <span className="text-[10px] sm:text-xs text-[#4A5E65] whitespace-nowrap shrink-0">{launch.time}</span>
                                            </div>
                                            <p className="text-[11px] sm:text-xs text-[#4A5E65] sm:truncate">{launch.tagline}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {!showAllLaunches && (
                                <button
                                    onClick={() => setShowAllLaunches(true)}
                                    className="w-full py-2.5 sm:py-3 bg-brand-orange hover:bg-brand-burgundy text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
                                >
                                    See all recent launches
                                </button>
                            )}
                        </div>

                        {/* Product of the Month Widget */}
                        <div className="rounded-xl sm:rounded-2xl overflow-hidden relative group cursor-pointer shadow-lg shadow-blue-900/20 h-[280px] sm:h-[340px] md:h-[450px]">
                            <img
                                src="https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="Product of the Month"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                            <div className="relative p-4 sm:p-6 h-full flex flex-col justify-between">
                                {/* Header */}
                                <div className="flex justify-between w-full items-start z-10">
                                    <div className="bg-white/90 backdrop-blur-sm px-2.5 py-1 sm:px-3 rounded-md sm:rounded-lg transform -rotate-3 shadow-sm">
                                        <div className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-[#0072FF]">Product of</div>
                                        <div className="text-base sm:text-xl font-black uppercase text-[#1A2E35] leading-none">The Month</div>
                                    </div>
                                </div>

                                {/* Know More Button */}
                                <div className="z-20">
                                    <button className="bg-white text-[#1A2E35] px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 hover:bg-gray-50 transition-colors group/btn w-fit">
                                        Know More
                                        <i className="ri-arrow-right-up-line group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Feature Your Product Button */}
                        {/* <button className="w-full py-4 bg-[#D30030] hover:bg-[#B30026] text-white font-bold text-base rounded-2xl shadow-lg shadow-red-900/20 transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 duration-200">
                            Feature Your Product
                        </button> */}
                    </div>
                </div>
            </main>
            <Footer />
        </div >
    );
}
