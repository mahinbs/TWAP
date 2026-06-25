import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import { useQuery } from '@tanstack/react-query';
import { appsApi, siteContentApi } from '../../lib/api';
import { sectionBgStyle } from '../../lib/sectionGradient';
import { fetchListicleSpots, LISTICLE_PAGE } from '../../lib/listicleSpots';
import {
  appToListicleCard,
  appActivityDate,
  buildRecentLaunchesIntro,
  formatTimeAgo,
} from '../../lib/appDisplay';

const LISTICLE_MAX_SPOTS = 12;

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
                        {app.slug ? (
                            <Link to={`/product-review/${app.slug}`} className="text-xl font-bold text-[#1A2E35] font-['Manrope'] mb-0.5 truncate block hover:text-brand-orange transition-colors">{app.name}</Link>
                        ) : (
                            <h3 className="text-xl font-bold text-[#1A2E35] font-['Manrope'] mb-0.5 truncate">{app.name}</h3>
                        )}
                        <p className="text-sm text-[#4A5E65] font-medium text-wrap max-w-[12rem] md:max-w-fit">{app.tagline}</p>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* Desktop Header: Name, Badge, Tagline */}
                    <div className="hidden md:flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                        <div>
                            {app.slug ? (
                                <Link to={`/product-review/${app.slug}`} className="text-2xl font-bold text-[#1A2E35] font-['Manrope'] mb-1 hover:text-brand-orange transition-colors block">{app.name}</Link>
                            ) : (
                                <h3 className="text-2xl font-bold text-[#1A2E35] font-['Manrope'] mb-1 group-hover:text-brand-orange transition-colors">{app.name}</h3>
                            )}
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

    const { data: heroSection } = useQuery({
        queryKey: ['page-section', LISTICLE_PAGE, 'hero'],
        queryFn: () => siteContentApi.section(LISTICLE_PAGE, 'hero'),
    });
    const { data: sidebarSection } = useQuery({
        queryKey: ['page-section', LISTICLE_PAGE, 'sidebar'],
        queryFn: () => siteContentApi.section(LISTICLE_PAGE, 'sidebar'),
    });
    const { data: spotlightSection } = useQuery({
        queryKey: ['page-section', LISTICLE_PAGE, 'spotlight'],
        queryFn: () => siteContentApi.section(LISTICLE_PAGE, 'spotlight'),
    });

    const lc = (heroSection?.content ?? {}) as Record<string, string>;
    const listicleTitlePrefix     = lc.title_prefix    ?? 'The best';
    const listicleTitleHighlight  = lc.title_highlight ?? 'project management';
    const listicleTitleSuffix     = lc.title_suffix    ?? 'softwares of 2026';
    const listicleDescription     = heroSection?.description ?? 'Project management software helps teams and individuals plan, organize, and track projects efficiently. It provides a centralized platform for managing tasks, resources, timelines, and communication within a project.';
    const heroBgStyle = sectionBgStyle(lc, { defaultFrom: '#1B1B36', defaultTo: '#56122D', direction: 'to bottom' });

    const sidebarContent = (sidebarSection?.content ?? {}) as Record<string, unknown>;
    const previewCount = Number(sidebarContent.preview_count ?? 3);
    const expandCount = Number(sidebarContent.expand_count ?? 6);
    const sidebarHeading = sidebarSection?.title ?? 'Recent launches';
    const seeAllButtonText = sidebarSection?.cta_text ?? 'See all recent launches';
    const seeAllButtonUrl = sidebarSection?.cta_url ?? '';

    const { data: recentApps = [] } = useQuery({
        queryKey: ['apps-recent', expandCount],
        queryFn: () => appsApi.recent(expandCount),
    });

    const recentLaunches = recentApps.map(app => ({
        name: app.name,
        tagline: app.tagline ?? '',
        time: formatTimeAgo(appActivityDate(app)),
        logo: app.logo_url ?? '',
        slug: app.slug,
    }));

    const sidebarIntro = sidebarSection?.description?.trim()
        ? sidebarSection.description
        : buildRecentLaunchesIntro(recentApps);

    const spotlightContent = (spotlightSection?.content ?? {}) as Record<string, string>;
    const spotlightAppId = spotlightContent.spotlight_app_id ?? '';
    const { data: spotlightApp } = useQuery({
        queryKey: ['listicle-spotlight-app', spotlightAppId],
        queryFn: () => appsApi.byIds([spotlightAppId]).then(rows => rows[0] ?? null),
        enabled: Boolean(spotlightAppId),
    });

    const spotlightBadge1 = spotlightContent.badge_line1 ?? 'Product of';
    const spotlightBadge2 = spotlightContent.badge_line2 ?? 'The Month';
    const spotlightCtaText = spotlightSection?.cta_text ?? 'Know More';
    const spotlightImage = spotlightSection?.media_url
        ?? spotlightApp?.hero_image_url
        ?? spotlightApp?.logo_url
        ?? 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    const spotlightCtaUrl = spotlightSection?.cta_url
        ?? (spotlightApp ? `/product-review/${spotlightApp.slug}` : '/directory');

    const { data: listicleSpots = [] } = useQuery({
        queryKey: ['listicle-spots'],
        queryFn: fetchListicleSpots,
    });

    const spotIds = listicleSpots.map(s => s.app_id);

    const { data: rankedApps = [] } = useQuery({
        queryKey: ['listicle-ranked-apps', spotIds],
        queryFn: () => (spotIds.length > 0
            ? appsApi.byIds(spotIds)
            : appsApi.topRated(LISTICLE_MAX_SPOTS)),
    });

    const apps = useMemo(() => {
        const cards = new Map(rankedApps.map(app => [app.id, appToListicleCard(app)]));
        if (listicleSpots.length > 0) {
            return listicleSpots
                .map(spot => {
                    const card = cards.get(spot.app_id);
                    return card ? { ...card, rank: spot.rank } : null;
                })
                .filter((app): app is ReturnType<typeof appToListicleCard> & { rank: number } => Boolean(app));
        }
        return rankedApps.map((app, index) => ({ ...appToListicleCard(app), rank: index + 1 }));
    }, [rankedApps, listicleSpots]);

    const logos = [
        { name: "ClickUp", image: "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", style: { top: "10%", left: "70%" }, animation: "animate-float-random-3", delay: "animation-delay-500" },
        { name: "Airtable", image: "https://images.pexels.com/photos/1181438/pexels-photo-1181438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", style: { top: "60%", left: "85%" }, animation: "animate-float-random-2", delay: "animation-delay-4000" },
        { name: "Linear", image: "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", style: { top: "25%", left: "50%" }, animation: "animate-float-random-1", delay: "animation-delay-2000" },
        { name: "Height", image: "https://images.pexels.com/photos/1181373/pexels-photo-1181373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", style: { top: "75%", left: "20%" }, animation: "animate-float-random-3", delay: "animation-delay-1000" },
        { name: "Wrike", image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", style: { top: "15%", left: "25%" }, animation: "animate-float-random-2", delay: "animation-delay-3000" },
        { name: "Basecamp", image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", style: { top: "85%", left: "65%" }, animation: "animate-float-random-1", delay: "animation-delay-500" },
    ];

    return (
        <div className="min-h-screen bg-[#fffdfb] font-['Poppins']">
            <Header />
            <main className="">
                <div className="relative overflow-hidden pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20"
                    style={heroBgStyle}>

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
                                {listicleTitlePrefix} <span className="relative inline-block">{listicleTitleHighlight} </span> {listicleTitleSuffix}
                            </h1>
                            <p className="text-base sm:text-lg text-white/80 font-medium leading-relaxed max-w-xl">
                                {listicleDescription}
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
                            const rank = app.rank ?? (currentPage - 1) * itemsPerPage + index + 1;
                            return (
                                <AppCard key={app.id ?? rank} app={app} rank={rank} id={`app-${rank}`} />
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
                                    {apps.map((app) => (
                                        <button
                                            key={app.id ?? app.rank}
                                            onClick={() => {
                                                const rank = app.rank ?? 1;
                                                const page = Math.floor((rank - 1) / itemsPerPage) + 1;
                                                setCurrentPage(page);

                                                setTimeout(() => {
                                                    const element = document.getElementById(`app-${rank}`);
                                                    if (element) {
                                                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                    }
                                                }, 100);
                                            }}
                                            className="w-full text-left py-2 px-3 rounded-lg text-[#4A5E65] hover:bg-gray-50 hover:text-[#1A2E35] transition-colors text-xs sm:text-sm font-medium truncate flex items-center gap-2 sm:gap-3 min-w-0"
                                        >
                                            <span className="text-gray-400 font-mono text-xs w-4 sm:w-5 shrink-0">{app.rank}.</span>
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
                                <h3 className="font-bold text-[#1A2E35] text-base sm:text-lg">{sidebarHeading}</h3>
                            </div>

                            {sidebarIntro && (
                                <p
                                    className="text-xs sm:text-sm text-[#4A5E65] leading-relaxed mb-6 sm:mb-8"
                                    dangerouslySetInnerHTML={{ __html: sidebarIntro }}
                                />
                            )}

                            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                                {(showAllLaunches ? recentLaunches : recentLaunches.slice(0, previewCount)).map((launch, index) => (
                                    <div key={launch.slug ?? index} className="flex items-start gap-3 sm:gap-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg sm:rounded-xl flex items-center justify-center p-1.5 sm:p-2 shadow-sm flex-shrink-0">
                                            {launch.logo ? (
                                                <img src={launch.logo} alt={launch.name} className="w-full h-full object-cover rounded-md sm:rounded-lg" />
                                            ) : (
                                                <span className="text-xs font-bold text-gray-400">{launch.name.charAt(0)}</span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline gap-2 mb-0.5 sm:mb-1">
                                                {launch.slug ? (
                                                    <Link to={`/product-review/${launch.slug}`} className="font-bold text-[#1A2E35] text-xs sm:text-sm truncate hover:text-brand-orange transition-colors">{launch.name}</Link>
                                                ) : (
                                                    <h4 className="font-bold text-[#1A2E35] text-xs sm:text-sm truncate">{launch.name}</h4>
                                                )}
                                                <span className="text-[10px] sm:text-xs text-[#4A5E65] whitespace-nowrap shrink-0">{launch.time}</span>
                                            </div>
                                            <p className="text-[11px] sm:text-xs text-[#4A5E65] sm:truncate">{launch.tagline}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {!showAllLaunches && recentLaunches.length > previewCount && (
                                seeAllButtonUrl ? (
                                    <a
                                        href={seeAllButtonUrl}
                                        className="block w-full py-2.5 sm:py-3 bg-brand-orange hover:bg-brand-burgundy text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer text-center"
                                    >
                                        {seeAllButtonText}
                                    </a>
                                ) : (
                                    <button
                                        onClick={() => setShowAllLaunches(true)}
                                        className="w-full py-2.5 sm:py-3 bg-brand-orange hover:bg-brand-burgundy text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
                                    >
                                        {seeAllButtonText}
                                    </button>
                                )
                            )}
                        </div>

                        {/* Product of the Month Widget */}
                        <a
                            href={spotlightCtaUrl}
                            className="block rounded-xl sm:rounded-2xl overflow-hidden relative group cursor-pointer shadow-lg shadow-blue-900/20 h-[280px] sm:h-[340px] md:h-[450px]"
                        >
                            <img
                                src={spotlightImage}
                                alt={spotlightBadge2}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                            <div className="relative p-4 sm:p-6 h-full flex flex-col justify-between">
                                <div className="flex justify-between w-full items-start z-10">
                                    <div className="bg-white/90 backdrop-blur-sm px-2.5 py-1 sm:px-3 rounded-md sm:rounded-lg transform -rotate-3 shadow-sm">
                                        <div className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-[#0072FF]">{spotlightBadge1}</div>
                                        <div className="text-base sm:text-xl font-black uppercase text-[#1A2E35] leading-none">{spotlightBadge2}</div>
                                    </div>
                                </div>

                                <div className="z-20">
                                    <span className="inline-flex bg-white text-[#1A2E35] px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm shadow-xl items-center gap-2 hover:bg-gray-50 transition-colors group/btn w-fit">
                                        {spotlightCtaText}
                                        <i className="ri-arrow-right-up-line group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"></i>
                                    </span>
                                </div>
                            </div>
                        </a>

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
