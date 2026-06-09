import { useRef, useEffect, useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { methodologyApi, siteContentApi } from '../../lib/api';
import type { MethodologyItem } from '../../lib/api';

import 'swiper/css';
import 'swiper/css/navigation';

gsap.registerPlugin(ScrollTrigger);

type RankStep = { label: string; points: number; color: string; description: string; highlight: string };

function toRankSteps(items: MethodologyItem[]): RankStep[] {
    return items.map(item => {
        const e = item.extras ?? {};
        return {
            label: item.title,
            points: Number(e.points) || 0,
            color: String(e.color ?? 'bg-brand-orange'),
            description: item.description ?? '',
            highlight: String(e.highlight ?? ''),
        };
    });
}

const MethodologyProcess = () => {
    const [activeRankIndex, setActiveRankIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);

    const { data: rankingSection } = useQuery({
        queryKey: ['page-section', 'methodology', 'ranking'],
        queryFn: () => siteContentApi.section('methodology', 'ranking'),
    });
    const { data: testingSection } = useQuery({
        queryKey: ['page-section', 'methodology', 'testing'],
        queryFn: () => siteContentApi.section('methodology', 'testing'),
    });
    const { data: editorialSection } = useQuery({
        queryKey: ['page-section', 'methodology', 'editorial'],
        queryFn: () => siteContentApi.section('methodology', 'editorial'),
    });
    const { data: editorsSection } = useQuery({
        queryKey: ['page-section', 'methodology', 'editors'],
        queryFn: () => siteContentApi.section('methodology', 'editors'),
    });

    const { data: rankingItems = [] } = useQuery({
        queryKey: ['methodology-items', 'ranking'],
        queryFn: () => methodologyApi.items('ranking'),
    });
    const { data: processItems = [] } = useQuery({
        queryKey: ['methodology-items', 'process'],
        queryFn: () => methodologyApi.items('process'),
    });
    const { data: sourceItems = [] } = useQuery({
        queryKey: ['methodology-items', 'sources'],
        queryFn: () => methodologyApi.items('sources'),
    });
    const { data: reviewItems = [] } = useQuery({
        queryKey: ['methodology-items', 'review'],
        queryFn: () => methodologyApi.items('review'),
    });
    const { data: ratingItems = [] } = useQuery({
        queryKey: ['methodology-items', 'rating'],
        queryFn: () => methodologyApi.items('rating'),
    });
    const { data: standardItems = [] } = useQuery({
        queryKey: ['methodology-items', 'standards'],
        queryFn: () => methodologyApi.items('standards'),
    });
    const { data: editorItems = [] } = useQuery({
        queryKey: ['methodology-items', 'editors'],
        queryFn: () => methodologyApi.items('editors'),
    });

    const rankingSteps = useMemo(() => toRankSteps(rankingItems), [rankingItems]);

    const rankC = (rankingSection?.content ?? {}) as Record<string, string>;
    const testC = (testingSection?.content ?? {}) as Record<string, string>;
    const editC = (editorialSection?.content ?? {}) as Record<string, string>;

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Chapter 1: Header & Ranking
            gsap.from(".c1-title", {
                scrollTrigger: { trigger: ".c1-title", start: "top 85%" },
                y: 50, opacity: 0, duration: 1, ease: "power3.out"
            });
            gsap.from(".c1-rank-list > div", {
                scrollTrigger: { trigger: ".c1-rank-list", start: "top 80%" },
                x: -30, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power2.out"
            });
            gsap.from(".c1-process-card", {
                scrollTrigger: { trigger: ".c1-process-section", start: "top 75%" },
                y: 50, opacity: 0, stagger: 0.2, duration: 0.8, ease: "back.out(1.7)"
            });

            // Chapter 2: Test & Review
            gsap.from(".c2-banner", {
                scrollTrigger: { trigger: ".c2-banner", start: "top 85%" },
                scaleX: 0, transformOrigin: "left", duration: 1, ease: "expo.out"
            });
            gsap.from(".c2-list-item", {
                scrollTrigger: { trigger: ".c2-list", start: "top 80%" },
                x: -20, opacity: 0, stagger: 0.1, duration: 0.6
            });
            gsap.from(".c2-grid-item", {
                scrollTrigger: { trigger: ".c2-grid", start: "top 80%" },
                scale: 0.8, opacity: 0, stagger: 0.05, duration: 0.5, ease: "back.out(1.2)"
            });

            // Chapter 3: Standards
            gsap.from(".c3-standard", {
                scrollTrigger: { trigger: ".c3-standards-list", start: "top 75%" },
                x: -30, opacity: 0, stagger: 0.15, duration: 0.8, ease: "power2.out"
            });

            // Chapter 4: Editors
            gsap.from(".c4-content", {
                scrollTrigger: { trigger: ".c4-section", start: "top 70%" },
                y: 50, opacity: 0, duration: 1, ease: "power2.out"
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative bg-[#050505] text-white">

            {/* 01. Selection Algorithm (Brand Orange) */}
            {/* 01. Selection Algorithm (Brand Orange) */}
            <div className="relative min-h-screen flex flex-col md:flex-row border-y">
                {/* Sticky Header */}
                <div className="w-full md:w-1/2 p-10 md:p-20 bg-brand-dark cursor-default md:sticky md:top-0 md:h-screen z-10 flex flex-col justify-center relative shadow-2xl overflow-hidden">
                    {/* Background Accent */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute -top-[20%] -right-[20%] w-[80%] h-[80%] bg-brand-orange rounded-full blur-[120px] opacity-20"></div>
                    </div>

                    <div className="text-xl font-bold tracking-widest border-t-2 border-brand-orange/50 pt-4 text-brand-orange mb-12 relative z-10 w-fit">{rankingSection?.subtitle ?? '01'}</div>

                    <h2 className="c1-title text-5xl md:text-7xl font-bold leading-tight mb-8 relative z-10 text-white">
                        {rankingSection?.title?.replace(rankC.title_highlight ?? 'Rank Solutions?', '') ?? 'How Do We'}<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-orange">{rankC.title_highlight ?? 'Rank Solutions?'}</span>
                    </h2>

                    <p className="chapter-1-text text-gray-400 text-lg leading-relaxed max-w-md mb-12 relative z-10">
                        {rankingSection?.description ?? "Our selection isn't just about picking popular stacks. It's a rigorous filtration process powered by data science and engineering expertise to identify the perfect architectural fit for your business."}
                    </p>

                    <div className="chapter-1-process-section border-t border-brand-orange/30 pt-8 relative z-10">
                        <div className="chapter-1-process text-brand-orange font-bold uppercase tracking-widest mb-2">{rankC.footer_brand ?? 'The Web App Pro'}</div>
                        <div className="chapter-1-process text-gray-500 text-base">{rankC.footer_sub ?? 'Algorithm to Feature Solutions'}</div>
                    </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 p-10 md:p-20 bg-white flex flex-col justify-center min-h-screen relative border-l border-gray-100">

                    <div className="grid grid-cols-1 gap-16">
                        {/* Intro Text */}
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-6">{rankC.algorithm_heading ?? 'How Our Algorithm Ranks Tech Stacks (Out of 100 Points)'}</h3>

                            {/* Ranking List */}
                            <div className="chapter-1-rank-list space-y-4">
                                {rankingSteps.map((step, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setActiveRankIndex(index)}
                                        className={`chapter-1-item flex items-center justify-between border-b pb-3 group cursor-pointer transition-colors ${activeRankIndex === index
                                            ? 'border-brand-orange'
                                            : 'border-gray-200 hover:border-gray-400'
                                            }`}
                                    >
                                        <span className={`text-base font-bold uppercase tracking-wider transition-colors ${activeRankIndex === index ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'
                                            }`}>
                                            {step.label}
                                        </span>
                                        <span className={`px-3 py-1 text-black text-base font-bold rounded-full transition-all ${activeRankIndex === index ? step.color : 'bg-gray-800 text-gray-400'
                                            }`}>
                                            {step.points} points
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Interactive Wheel */}
                        <div className="relative w-full aspect-square max-w-[400px] mx-auto bg-gray-50 rounded-3xl border border-gray-200 p-8 flex flex-col items-center justify-center transition-all duration-500 shadow-sm">
                            {/* Grid BG */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px] opacity-40 rounded-3xl pointer-events-none"></div>

                            <div className="relative w-64 h-64 flex items-center justify-center">
                                {/* Outer Ring */}
                                <div className="absolute inset-0 rounded-full border-[6px] border-gray-200"></div>

                                {/* Dynamic Progress Ring */}
                                <svg className="absolute inset-0 w-full h-full -rotate-90 transform">
                                    <circle
                                        cx="128"
                                        cy="128"
                                        r="125" // Radius adjusted for border width
                                        fill="transparent"
                                        strokeWidth="6"
                                        strokeDasharray={2 * Math.PI * 125}
                                        strokeDashoffset={(2 * Math.PI * 125) - ((2 * Math.PI * 125) *
                                            rankingSteps.slice(0, activeRankIndex + 1).reduce((acc, step) => acc + step.points, 0)

                                        ) / 100}
                                        strokeLinecap="round"
                                        className="transition-[stroke-dashoffset] duration-1000 ease-out"
                                        style={{ stroke: activeRankIndex % 2 === 0 ? '#f97316' : '#84cc16' }} // Toggle Orange/Lime based on index for variety or stick to step definition
                                    />
                                </svg>

                                {rankingSteps[activeRankIndex] && (
                                <div className="text-center z-10 flex flex-col items-center animate-[fadeIn_0.5s_ease-out]" key={activeRankIndex}>
                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">{activeRankIndex + 1} of {rankingSteps.length}</span>
                                    <span className="text-base font-bold text-gray-900 uppercase tracking-widest mb-3 max-w-[150px] leading-tight">{rankingSteps[activeRankIndex].label}</span>
                                    <span className={`px-4 py-1.5 text-black text-base font-bold rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)] ${rankingSteps[activeRankIndex].color}`}>
                                        {rankingSteps.slice(0, activeRankIndex + 1).reduce((acc, step) => acc + step.points, 0)} points
                                    </span>
                                </div>
                                )}
                            </div>

                            {rankingSteps[activeRankIndex] && (
                            <p className="text-center text-base text-gray-600 mt-8 max-w-[250px] leading-relaxed relative z-10 min-h-[60px]">
                                {rankingSteps[activeRankIndex].description}
                                <br />
                                <span className={`mt-1 block font-bold ${activeRankIndex % 2 === 0 ? 'text-brand-orange' : 'text-brand-lime'}`}>
                                    {rankingSteps[activeRankIndex].highlight}
                                </span>
                            </p>
                            )}

                            {/* Nav Buttons */}
                            <div className="flex gap-4 mt-6 relative z-10">
                                <button
                                    onClick={() => setActiveRankIndex(prev => prev === 0 ? rankingSteps.length - 1 : prev - 1)}
                                    className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 hover:text-black transition-colors"
                                >
                                    <i className="ri-arrow-left-line"></i>
                                </button>
                                <button
                                    onClick={() => setActiveRankIndex(prev => prev === rankingSteps.length - 1 ? 0 : prev + 1)}
                                    className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 hover:text-black transition-colors"
                                >
                                    <i className="ri-arrow-right-line"></i>
                                </button>
                            </div>
                        </div>

                        {/* Tiebreaker Card */}
                        {/* <div className="w-full bg-gradient-to-r from-brand-orange via-brand-orange to-brand-orange p-[1px] rounded-xl overflow-hidden">
                            <div className="bg-gradient-to-r from-brand-orange/90 to-brand-orange/90 p-8 flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-6">
                                <span className="px-3 py-1 bg-white/20 text-white font-bold uppercase tracking-widest rounded-full whitespace-nowrap">Tiebreaker Rule</span>
                                <p className="text-white font-bold text-lg leading-tight">
                                    If two frameworks score the same,<br />the stack with the <span className="text-black">higher community support</span> ranks higher.
                                </p>
                            </div>
                        </div> */}



                        {/* Process Flow Visual - Connected via Lines */}
                        <div className="mt-12 relative">
                            {/* Connector Lines */}
                            {/* <div className="flex justify-center mb-8">
                                <svg width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 0 V40 C100 40 100 60 50 80 H20" stroke="#374151" strokeWidth="1" />
                                    <path d="M100 0 V40 C100 40 100 60 150 80 H180" stroke="#374151" strokeWidth="1" />
                                    <rect x="80" y="20" width="40" height="20" rx="10" fill="#0a0a0b" stroke="#374151" />
                                    <text x="100" y="34" fill="#6b7280" fontSize="8" textAnchor="middle">Flow</text>
                                </svg>
                            </div> */}

                            {/* Banner */}
                            <div className="flex justify-center mb-16 relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-px bg-gray-200 -z-10"></div>
                                <div className="bg-brand-orange font-bold px-12 py-4 rounded-full shadow-[0_4px_20px_rgba(220,38,38,0.4)] border border-white/10">
                                    {rankC.process_banner ?? "Here's how the process looks!"}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                                {processItems.map((step, i) => {
                                    const stepLabel = (step.extras?.step_label as string) ?? `Step - ${i + 1}`;
                                    return (
                                        <div key={step.id} className={`${i === 0 || i === 3 ? 'c1-process-card border border-gray-100 shadow-xl shadow-gray-200/50' : ''} bg-white p-6 rounded-2xl group hover:-translate-y-2 transition-transform duration-300`}>
                                            <span className="inline-block px-3 py-1 bg-yellow-400 text-black font-bold rounded-full mb-4">{stepLabel}</span>
                                            <h4 className="text-black font-bold text-lg leading-tight mb-3">{step.title}</h4>
                                            {step.description && <p className="text-gray-500 text-base leading-relaxed">{step.description}</p>}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 02. QA & Testing (Brand Lime) */}
            <div className="relative min-h-screen flex flex-col md:flex-row border-b">
                {/* Sticky Header */}
                <div className="w-full md:w-1/2 p-10 md:p-20 bg-brand-lime text-brand-dark flex flex-col justify-between md:sticky md:top-0 md:h-screen z-10">
                    <div className="text-xl font-bold tracking-widest border-t border-brand-dark/30 pt-4">{testingSection?.subtitle ?? '02'}</div>
                    <h2 className="text-5xl md:text-7xl font-bold leading-tight mt-10">
                        {(testingSection?.title ?? 'How Do We Test and Review Digital Products?').includes(' and ')
                            ? (() => {
                                const [a, ...rest] = (testingSection?.title ?? 'How Do We Test and Review Digital Products?').split(' and ');
                                return <>{a}<br />and {rest.join(' and ')}</>;
                            })()
                            : (testingSection?.title ?? 'How Do We Test and Review Digital Products?')}
                    </h2>
                    <div className="mt-10 border-t border-brand-dark/30 pt-4 w-20"></div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 bg-white flex flex-col min-h-screen">

                    {/* Intro Section */}
                    <div className="p-10 md:p-20 border-b border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">{testC.intro_heading ?? 'Each product featured on The Web App Pro is tested.'}</h3>
                        <p className="text-gray-600 mb-6">{testC.intro_lead ?? "But before we tell you about how we test featured products, here's how we find them!"}</p>

                        <div className="space-y-4">
                            <h4 className="text-gray-900 font-bold">{testC.sources_heading ?? 'Our sources to find top digital products include:'}</h4>
                            <ul className="c2-list space-y-3">
                                {sourceItems.map((item) => (
                                    <li key={item.id} className="c2-list-item flex gap-3 text-base text-gray-600 items-start">
                                        <div className="w-4 h-4 rounded-full bg-brand-orange flex-shrink-0 flex items-center justify-center mt-0.5">
                                            <i className="ri-check-line text-white"></i>
                                        </div>
                                        {item.title}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-500 mt-4">{testC.sources_closing ?? 'We explore the vast universe of data and statistics to find out which digital products are being talked about the most.'}</p>
                        </div>
                    </div>

                    {/* Red Banner */}
                    <div className="c2-banner bg-gradient-to-r from-brand-orange to-brand-orange p-10 md:p-20">
                        <h3 className="text-2xl font-bold text-white mb-4">{testC.banner_title ?? "But...We Don't Just Focus on What's Popular"}</h3>
                        <p className="text-gray-200 leading-relaxed whitespace-pre-line">
                            {testC.banner_body ?? "While we keep tracking trending and award-winning apps, our space remains open for underrated or newly launched products as well."}
                        </p>
                    </div>

                    <div className="p-10 md:p-20 space-y-12 border-b border-gray-200">
                        {reviewItems.map((item, idx) => {
                            const bullets = (item.extras?.bullets as string[]) ?? [];
                            const intro = item.extras?.intro as string | undefined;
                            return (
                                <div key={item.id}>
                                    {idx > 0 && <div className={`h-px w-full mb-12 ${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-200'}`}></div>}
                                    <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-8">
                                        <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
                                        <div className="text-base text-gray-600 space-y-4">
                                            {item.description && <p>{item.description}</p>}
                                            {bullets.length > 0 && (
                                                <div>
                                                    {intro && <p className="font-bold text-gray-800 mb-2">{intro}</p>}
                                                    <ul className="list-disc pl-4 space-y-1 text-base">
                                                        {bullets.map((b, i) => <li key={i}>{b}</li>)}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Golden Rating System */}
                    <div className="p-10 md:p-20">
                        <h4 className="text-xl font-bold text-brand-dark text-center mb-10">{testC.rating_system_title ?? 'Our Golden Rating System'}</h4>

                        <div className="c2-grid grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 border border-gray-200">
                            {ratingItems.filter(r => (r.extras?.layout as string) === 'large').map(item => (
                                <div key={item.id} className="c2-grid-item bg-gray-50 p-8 flex flex-col items-center justify-center text-center md:aspect-square md:row-span-2 hover:bg-brand-orange hover:text-black transition-colors duration-300 group">
                                    <div className="text-brand-orange group-hover:text-brand-lime text-lg mb-2 tracking-widest">{'★'.repeat(Number(item.extras?.stars) || 5)}</div>
                                    <div className="font-semibold text-gray-900 group-hover:text-black">{item.title}</div>
                                </div>
                            ))}
                            {ratingItems.filter(r => (r.extras?.layout as string) === 'medium' && Number(r.extras?.stars) === 4).map(item => (
                                <div key={item.id} className="c2-grid-item bg-gray-50 p-8 flex flex-col items-center justify-center text-center md:aspect-square h-full hover:bg-brand-orange hover:text-black transition-colors duration-300 group">
                                    <div className="text-brand-orange group-hover:text-brand-lime text-lg mb-2 tracking-widest">★★★★</div>
                                    <div className="font-semibold text-gray-900 group-hover:text-black">{item.title}</div>
                                </div>
                            ))}
                            <div className="c2-grid-item bg-gray-50 grid grid-cols-1 md:grid-cols-10 md:aspect-video md:col-span-2">
                                <div className="border-r border-gray-200 flex flex-col md:col-span-5">
                                    {ratingItems.filter(r => (r.extras?.layout as string) === 'small').map(item => (
                                        <div key={item.id} className="flex-1 flex flex-col items-center justify-center border-b border-gray-200 last:border-0 p-8 md:p-2 hover:bg-brand-orange hover:text-black transition-colors duration-300 group">
                                            <div className="text-brand-orange group-hover:text-brand-lime text-lg mb-1">{'★'.repeat(Number(item.extras?.stars) || 1)}</div>
                                            <div className="leading-tight text-center font-semibold text-gray-900 group-hover:text-black">{item.title}</div>
                                        </div>
                                    ))}
                                </div>
                                {ratingItems.filter(r => (r.extras?.layout as string) === 'medium' && Number(r.extras?.stars) === 3).map(item => (
                                    <div key={item.id} className="flex flex-col items-center justify-center p-8 md:p-2 text-center md:col-span-5 hover:bg-brand-orange hover:text-black transition-colors duration-300 group">
                                        <div className="text-brand-orange group-hover:text-brand-lime text-lg mb-2 tracking-widest">★★★</div>
                                        <div className="leading-tight font-semibold text-gray-900 group-hover:text-black">{item.title}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 03. Editorial Standards (Brand Burgundy) */}
            <div className="relative min-h-screen flex flex-col md:flex-row border-b">
                {/* Sticky Header */}
                <div className="w-full md:w-1/2 p-10 md:p-20 bg-brand-burgundy text-white flex flex-col justify-between md:sticky md:top-0 md:h-screen z-10">
                    <div className="text-xl font-bold tracking-widest border-t border-white/30 pt-4">{editorialSection?.subtitle ?? '03'}</div>
                    <div className="mt-10">
                        <h2 className="text-5xl md:text-7xl font-bold leading-tight relative">
                            {(editorialSection?.title ?? "The Web App Pro's Editorial Standards").includes("'s ")
                                ? (() => {
                                    const [a, b] = (editorialSection?.title ?? "The Web App Pro's Editorial Standards").split("'s ");
                                    return <>{a}'s<br />{b}</>;
                                })()
                                : editorialSection?.title}
                            {/* Decorative Diamond Pattern */}
                            <div className="hidden xl:block absolute -right-32 top-1/2 -translate-y-1/2 w-40 h-80 opacity-20 pointer-events-none">
                                <div className="w-full h-1/2 bg-white transform -skew-y-12 mb-4"></div>
                                <div className="w-full h-1/2 bg-white transform skew-y-12"></div>
                            </div>
                        </h2>
                    </div>
                    <div className="mt-10 border-t border-white/30 pt-4 w-20"></div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 p-10 md:p-20 bg-white flex flex-col justify-center min-h-screen">
                    <div className="c3-standards-list space-y-16">

                        {/* Intro */}
                        <div className="border-b border-gray-200 pb-12">
                            {editC.intro_paragraph && (
                                <p className="text-gray-600 leading-relaxed mb-8">{editC.intro_paragraph}</p>
                            )}
                            {editC.intro_heading && (
                                <h4 className="text-gray-900 font-bold text-lg">{editC.intro_heading}</h4>
                            )}
                        </div>

                        {standardItems.map((std, idx) => {
                            const bullets = (std.extras?.bullets as string[]) ?? [];
                            return (
                                <div key={std.id} className="c3-standard group">
                                    <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-4">
                                        <span className="text-gray-700 font-black text-3xl group-hover:text-brand-burgundy transition-colors">{String(idx + 1).padStart(2, '0')}.</span>
                                        {std.title}
                                    </h4>
                                    {std.description && (
                                        <p className="text-gray-600 text-base leading-relaxed pl-12">{std.description}</p>
                                    )}
                                    {bullets.length > 0 && (
                                        <ul className="space-y-3 pl-12 mt-3">
                                            {bullets.map((b, i) => (
                                                <li key={i} className="text-gray-600 text-base leading-relaxed flex items-start gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-burgundy mt-2 shrink-0"></span>
                                                    <span>{b}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            );
                        })}

                    </div>
                </div>
            </div>

            {/* 04. Expert Team (Brand Cyan/Teal) */}
            <div className="c4-section relative min-h-screen flex flex-col md:flex-row border-b">
                {/* Sticky Header */}
                <div className="w-full md:w-1/2 p-10 md:p-20 bg-[#06b6d4] text-brand-dark flex flex-col justify-between md:sticky md:top-0 md:h-screen z-10 overflow-hidden relative">
                    {/* Decorative Circles */}
                    <div className="absolute -right-20 top-20 w-80 h-80 bg-white rounded-full"></div>
                    <div className="absolute -right-20 top-[60%] w-80 h-80 bg-white rounded-full"></div>
                    <div className="absolute right-40 -top-20 w-80 h-80 bg-white rounded-full"></div>
                    <div className="absolute right-40 top-[40%] w-80 h-80 bg-white rounded-full"></div>

                    <div className="text-xl font-bold tracking-widest border-t border-brand-dark/30 pt-4 relative z-10">{editorsSection?.subtitle ?? '04'}</div>
                    <h2 className="text-5xl md:text-7xl font-bold leading-tight mt-10 relative z-10">
                        {(editorsSection?.title ?? 'The Web App Pro Editors').includes(' Editors')
                            ? (() => {
                                const t = editorsSection?.title ?? 'The Web App Pro Editors';
                                return <>{t.replace(' Editors', '')}<br />Editors</>;
                            })()
                            : editorsSection?.title}
                    </h2>
                    <div className="mt-10 border-t border-brand-dark/30 pt-4 w-20 relative z-10"></div>
                </div>

                {/* Content - Carousel */}
                <div className="c4-content w-full md:w-1/2 p-6 md:p-10 bg-white flex flex-col justify-center min-h-screen relative">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        onBeforeInit={(swiper) => {
                            // @ts-ignore
                            swiper.params.navigation.prevEl = prevRef.current;
                            // @ts-ignore
                            swiper.params.navigation.nextEl = nextRef.current;
                        }}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        loop={true}
                        autoplay={{ delay: 5000 }}
                        className="w-full !pb-10"
                    >
                        {editorItems.map((editor, index) => {
                            const articles = (editor.extras?.articles as string[]) ?? [];
                            return (
                            <SwiperSlide key={editor.id}>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-12 h-full">
                                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col h-full shadow-md">
                                        <div className="flex items-center gap-4 mb-4">
                                            {editor.image_url && (
                                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                                    <img src={editor.image_url} alt={editor.title} className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                        </div>
                                        <h4 className="text-xl font-bold text-black">{editor.title}</h4>
                                        {editor.subtitle && (
                                            <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-md mb-4 w-fit text-sm">{editor.subtitle}</span>
                                        )}
                                        {editor.description && (
                                            <p className="text-gray-600 leading-relaxed text-sm">{editor.description}</p>
                                        )}
                                    </div>
                                    <div className="bg-gray-800 rounded-2xl overflow-hidden relative h-[400px] md:h-auto">
                                        {(editor.media_url || editor.image_url) && (
                                            <img src={editor.media_url ?? editor.image_url} alt="Video Cover" className="w-full h-full object-cover opacity-80" />
                                        )}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                                                <i className="ri-play-fill text-black text-2xl"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-2xl p-6 flex flex-col h-full">
                                        <h4 className="text-black font-bold mb-4">Reviewed Articles</h4>
                                        <div className="space-y-4 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                                            {articles.map((title, i) => (
                                                <div key={i} className="flex gap-3 items-start border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                                                    <div className="w-10 h-10 bg-gray-100 rounded-md shrink-0 overflow-hidden">
                                                        <img src={`https://source.unsplash.com/random/100x100?tech&sig=${index * 10 + i}`} alt="Article" className="w-full h-full object-cover" />
                                                    </div>
                                                    <span className="text-gray-700 font-medium line-clamp-2 hover:text-brand-orange cursor-pointer transition-colors max-w-[120px] text-sm">{title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            );
                        })}

                    </Swiper>

                    {/* Navigation Buttons */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-10 md:bottom-20 flex gap-2 z-20">
                        <div ref={prevRef} className="w-12 h-12 swiper-button-prev-custom cursor-pointer flex items-center justify-center bg-gray-100 rounded-full shadow-lg hover:scale-110 transition-transform">
                            <i className="ri-arrow-left-line text-black"></i>
                        </div>
                        <div ref={nextRef} className="w-12 h-12 swiper-button-next-custom cursor-pointer flex items-center justify-center bg-gray-100 rounded-full shadow-lg hover:scale-110 transition-transform">
                            <i className="ri-arrow-right-line text-black"></i>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default MethodologyProcess;
