import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// Mock Data for the Grid (Aligned with reference image style)
const gridProducts = [
    {
        id: 301,
        name: "UX Pilot Alternative",
        description: "Advanced conversational AI with enhanced capabilities",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&h=400&q=80",
        buttonText: "Explore"
    },
    {
        id: 302,
        name: "AI Design Assistant",
        description: "Generate stunning visuals with artificial intelligence",
        image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=600&h=400&q=80",
        buttonText: "Explore"
    },
    {
        id: 303,
        name: "AI Code Helper",
        description: "Boost productivity with intelligent code suggestions",
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=600&h=400&q=80",
        buttonText: "Explore"
    },
    {
        id: 304,
        name: "Smart Analytics",
        description: "AI-powered insights for better decision making",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&h=400&q=80",
        buttonText: "Explore"
    }
];

// Filter Data Structure
const filters = [
    {
        name: "Pricing",
        options: ["Free", "Freemium", "Paid Subscription", "One-time Purchase"]
    },
    {
        name: "Rating",
        options: ["4.5 stars & up", "4.0 stars & up", "3.0 stars & up"]
    },
    {
        name: "Features",
        options: ["API Access", "Mobile App", "Chrome Extension", "No-code"]
    },
    {
        name: "Country",
        options: ["United States", "India", "Europe", "Global"]
    },
    {
        name: "Sort By",
        options: ["Most Popular", "Newest", "Highest Rated"]
    }
];

const categories = ["Gen AI", "Productivity", "Marketing", "Design", "Dev Tools"];

export default function TopProductsGrid() {
    const [activePlatform, setActivePlatform] = useState("All Platforms");
    const [openFilter, setOpenFilter] = useState<string | null>(null);
    const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
    const filterRef = useRef<HTMLDivElement>(null);

    // Close filters when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setOpenFilter(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleFilter = (filterName: string) => {
        setOpenFilter(openFilter === filterName ? null : filterName);
    };

    const selectFilterOption = (filterName: string, option: string) => {
        setActiveFilters(prev => ({
            ...prev,
            [filterName]: prev[filterName] === option ? "" : option // Toggle off if clicked again
        }));
        setOpenFilter(null); // Close dropdown after selection
    };

    return (
        <div className="w-full bg-white font-['Manrope']">

            {/* 1. Filter Bar (Top) */}
            <div className="border-b border-gray-100 py-3 relative z-30" ref={filterRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-wrap pb-2 md:pb-0">
                        {filters.map((filter) => (
                            <div key={filter.name} className="relative">
                                <button
                                    onClick={() => toggleFilter(filter.name)}
                                    className={`flex items-center gap-1 px-4 py-2 border rounded-lg text-xs font-semibold whitespace-nowrap transition-colors
                            ${activeFilters[filter.name]
                                            ? 'bg-[#1F2853] text-white border-[#1F2853]'
                                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}
                        `}
                                >
                                    {activeFilters[filter.name] || filter.name}
                                    <i className={`ri-arrow-down-s-line transition-transform ${openFilter === filter.name ? 'rotate-180' : ''}`}></i>
                                </button>

                                {/* Dropdown Menu */}
                                {openFilter === filter.name && (
                                    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                                        {filter.options.map(option => (
                                            <button
                                                key={option}
                                                onClick={() => selectFilterOption(filter.name, option)}
                                                className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center justify-between
                                        ${activeFilters[filter.name] === option ? 'text-[#f25a1a] font-bold bg-orange-50' : 'text-gray-700'}
                                    `}
                                            >
                                                {option}
                                                {activeFilters[filter.name] === option && <i className="ri-check-line"></i>}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-4 text-xs font-medium text-gray-500 whitespace-nowrap pl-4 border-l border-gray-100 ml-4">
                        {Object.keys(activeFilters).length > 0 && (
                            <span className="flex items-center justify-center w-5 h-5 bg-[#f25a1a] text-white rounded-full">
                                {Object.keys(activeFilters).filter(k => activeFilters[k]).length}
                            </span>
                        )}
                        <button
                            onClick={() => setActiveFilters({})}
                            className="flex items-center gap-1 hover:text-brand-orange hover:underline disabled:opacity-50"
                            disabled={Object.keys(activeFilters).filter(k => activeFilters[k]).length === 0}
                        >
                            Reset filters <i className="ri-refresh-line"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. Category & Platform Bar (Purple) */}
            <div className="bg-[#8b5cf6] py-4 bg-opacity-95 backdrop-blur-sm md:sticky top-[5.4rem] z-20 shadow-sm transition-all">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Left: Real Categories */}
                        <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0 flex-wrap md:flex-nowrap">
                            {categories.map((cat) => (
                                <button key={cat} className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium whitespace-nowrap transition-colors border border-white/10">
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Right: Platform Toggle */}
                        <div className="bg-white rounded-full p-1 flex items-center shadow-lg">
                            {["All Platforms", "Mobile", "Web", "Software"].map((platform) => (
                                <button
                                    key={platform}
                                    onClick={() => setActivePlatform(platform)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activePlatform === platform
                                        ? "bg-brand-dark text-white shadow-md transform scale-105"
                                        : "text-gray-500 hover:text-brand-dark hover:bg-gray-50"
                                        }`}
                                >
                                    {platform}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-2xl font-medium text-[#1F2853] mb-8">
                    All Products in Artificial Intelligence (57 results)
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Product Grid (Left 2 Columns) */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {gridProducts.map((product) => (
                            <div key={product.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all duration-300 group">
                                {/* Image Placeholder Area */}
                                <div className="w-full h-48 bg-gray-100 rounded-lg mb-6 overflow-hidden relative">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                                </div>

                                {/* Content */}
                                <h3 className="font-bold text-lg text-[#1F2853] mb-2">{product.name}</h3>
                                <p className="text-sm text-gray-500 mb-6 min-h-[40px] line-clamp-2">{product.description}</p>

                                <Link to="/top-10-project-management-software-2026" className="block w-full py-3 bg-brand-lime text-brand-dark text-center rounded-lg text-sm font-bold hover:brightness-90 transition-colors shadow-lg hover:shadow-xl translate-y-0 hover:-translate-y-0.5 active:translate-y-0">
                                    {product.buttonText}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Sidebar Promo (Right Column) */}
                    <div className="lg:col-span-1">
                        <div className="group overflow-hidden rounded-[2rem] bg-[#1B1B36] p-8 shadow-2xl h-fit sticky top-36 border border-white/5 transition-all duration-500 hover:shadow-brand-orange/20">
                            {/* Decorative background aura */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-orange/20 transition-all duration-700"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-lime/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange font-black text-[10px] uppercase tracking-widest mb-6 border border-brand-orange/30">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse"></span>
                                    Spotlight
                                </div>
                                
                                <h3 className="font-bold text-2xl text-white mb-6 leading-tight">
                                    Give Your Product <br /> 
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-lime">The Spotlight</span>
                                </h3>

                                {/* Ad Asset */}
                                <div className="w-full aspect-square rounded-2xl mb-8 overflow-hidden relative group cursor-pointer border border-white/10">
                                    <img
                                        src="/assets/product_spotlight.png"
                                        alt="Promote your product"
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B36] via-transparent to-transparent opacity-60"></div>
                                </div>

                                <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                                    Reach thousands of potential customers. <br />
                                    Boost your visibility and drive conversion today.
                                </p>

                                <button className="w-full py-4 bg-brand-orange text-white text-center rounded-xl text-sm font-black uppercase tracking-widest hover:shadow-lg hover:shadow-brand-orange/40 transition-all active:scale-95">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
