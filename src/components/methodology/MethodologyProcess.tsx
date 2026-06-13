import { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import 'swiper/css';
import 'swiper/css/navigation';

gsap.registerPlugin(ScrollTrigger);

const rankingSteps = [
    {
        label: "Service Line",
        points: 50,
        color: "bg-brand-orange",
        description: "We analyze your tech stack concentration. Solutions that focus on specific strengths score higher.",
        highlight: "Specialization = Authority"
    },
    {
        label: "Reviews",
        points: 15,
        color: "bg-brand-lime",
        description: "Verified testimonials from reputable platforms validate your service quality and reliability.",
        highlight: "Trust = Higher Rank"
    },
    {
        label: "Portfolio",
        points: 15,
        color: "bg-brand-orange",
        description: "Diverse, high-quality case studies demonstrate your ability to deliver complex solutions.",
        highlight: "Proven Track Record"
    },
    {
        label: "Awards",
        points: 10,
        color: "bg-brand-lime",
        description: "Industry recognition serves as a third-party validation of your excellence and innovation.",
        highlight: "Credibility Bonus"
    },
    {
        label: "Interviews with TWAP",
        points: 10,
        color: "bg-brand-orange",
        description: "For a higher score, get in touch with The Web App Pro for an interview of the C-suite executive.",
        highlight: "1 interview = 5 points"
    }
];

const MethodologyProcess = () => {
    const [activeRankIndex, setActiveRankIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);

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

                    <div className="text-xl font-bold tracking-widest border-t-2 border-brand-orange/50 pt-4 text-brand-orange mb-12 relative z-10 w-fit">01</div>

                    <h2 className="c1-title text-5xl md:text-7xl font-bold leading-tight mb-8 relative z-10 text-white">
                        How Do We<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-orange">Rank Solutions?</span>
                    </h2>

                    <p className="chapter-1-text text-gray-400 text-lg leading-relaxed max-w-md mb-12 relative z-10">
                        Our selection isn't just about picking popular stacks. It's a rigorous filtration process powered by data science and engineering expertise to identify the perfect architectural fit for your business.
                    </p>

                    <div className="chapter-1-process-section border-t border-brand-orange/30 pt-8 relative z-10">
                        <div className="chapter-1-process text-brand-orange font-bold uppercase tracking-widest mb-2">The Web App Pro</div>
                        <div className="chapter-1-process text-gray-500 text-base">Algorithm to Feature Solutions</div>
                    </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 p-10 md:p-20 bg-white flex flex-col justify-center min-h-screen relative border-l border-gray-100">

                    <div className="grid grid-cols-1 gap-16">
                        {/* Intro Text */}
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-6">How Our Algorithm Ranks<br />Tech Stacks (Out of 100 Points)</h3>

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

                                <div className="text-center z-10 flex flex-col items-center animate-[fadeIn_0.5s_ease-out]" key={activeRankIndex}>
                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">{activeRankIndex + 1} of {rankingSteps.length}</span>
                                    <span className="text-base font-bold text-gray-900 uppercase tracking-widest mb-3 max-w-[150px] leading-tight">{rankingSteps[activeRankIndex].label}</span>
                                    <span className={`px-4 py-1.5 text-black text-base font-bold rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)] ${rankingSteps[activeRankIndex].color}`}>
                                        {rankingSteps.slice(0, activeRankIndex + 1).reduce((acc, step) => acc + step.points, 0)} points
                                    </span>
                                </div>
                            </div>

                            <p className="text-center text-base text-gray-600 mt-8 max-w-[250px] leading-relaxed relative z-10 min-h-[60px]">
                                {rankingSteps[activeRankIndex].description.replace('The Web App Pro', '')}
                                {rankingSteps[activeRankIndex].label === "Interviews with TWAP" && <span className="text-gray-900 font-bold">The Web App Pro</span>}
                                {rankingSteps[activeRankIndex].label === "Interviews with TWAP" && " for an interview of the C-suite executive."}
                                <br />
                                <span className={`mt-1 block font-bold ${activeRankIndex % 2 === 0 ? 'text-brand-orange' : 'text-brand-lime'}`}>
                                    {rankingSteps[activeRankIndex].highlight}
                                </span>
                            </p>

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
                                    Here's how the process looks!
                                </div>
                            </div>

                            {/* Step Cards Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">

                                {/* Step 1 */}
                                <div className="c1-process-card bg-white border border-gray-100 p-6 rounded-2xl group hover:-translate-y-2 transition-transform duration-300 shadow-xl shadow-gray-200/50">
                                    <span className="inline-block px-3 py-1 bg-yellow-400 text-black font-bold rounded-full mb-4">Step - 1</span>
                                    <h4 className="text-black font-bold text-lg leading-tight mb-3">Signal Collection Begins</h4>
                                    <p className="text-gray-500 text-base leading-relaxed">
                                        As soon as a project enters our ecosystem, our algorithm kicks into gear. It begins tracking publicly available data, repository activity, and performance indicators across five core dimensions.
                                    </p>
                                </div>

                                {/* Step 2 */}
                                <div className="bg-white p-6 rounded-2xl group hover:-translate-y-2 transition-transform duration-300 delay-100">
                                    <span className="inline-block px-3 py-1 bg-yellow-400 text-black font-bold rounded-full mb-4">Step - 2</span>
                                    <h4 className="text-black font-bold text-lg leading-tight mb-3">Architectural Analysis</h4>
                                    <p className="text-gray-500 text-base leading-relaxed">
                                        Our system analyzes your code structure and service concentration. Solutions that double down on what they do best score higher. No fluff, no diluted offerings.
                                    </p>
                                </div>

                                {/* Step 3 */}
                                <div className="bg-white p-6 rounded-2xl group hover:-translate-y-2 transition-transform duration-300 delay-200">
                                    <span className="inline-block px-3 py-1 bg-yellow-400 text-black font-bold rounded-full mb-4">Step - 3</span>
                                    <h4 className="text-black font-bold text-lg leading-tight mb-3">Velocity & Impact Check</h4>
                                    <p className="text-gray-500 text-base leading-relaxed">
                                        We don't just count commits; we measure impact. Our algorithm tracks release frequency, issue resolution time, and community engagement to gauge real-world momentum.
                                    </p>
                                </div>

                                <div className="c1-process-card bg-white border border-gray-100 p-6 rounded-2xl group hover:-translate-y-2 transition-transform duration-300 delay-300 shadow-xl shadow-gray-200/50">
                                    <span className="inline-block px-3 py-1 bg-yellow-400 text-black font-bold rounded-full mb-4">Step - 4</span>
                                    <h4 className="text-black font-bold text-lg leading-tight mb-3">Award Recognition</h4>
                                    <p className="text-gray-500 text-base leading-relaxed">
                                        The system scans and validates industry awards, ensuring they're recent and relevant. Our backend allocates credibility-based badges that can't be bought.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 02. QA & Testing (Brand Lime) */}
            <div className="relative min-h-screen flex flex-col md:flex-row border-b">
                {/* Sticky Header */}
                <div className="w-full md:w-1/2 p-10 md:p-20 bg-brand-lime text-brand-dark flex flex-col justify-between md:sticky md:top-0 md:h-screen z-10">
                    <div className="text-xl font-bold tracking-widest border-t border-brand-dark/30 pt-4">02</div>
                    <h2 className="text-5xl md:text-7xl font-bold leading-tight mt-10">
                        How Do We Test<br />and Review Digital Products?
                    </h2>
                    <div className="mt-10 border-t border-brand-dark/30 pt-4 w-20"></div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 bg-white flex flex-col min-h-screen">

                    {/* Intro Section */}
                    <div className="p-10 md:p-20 border-b border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Each product featured on<br />The Web App Pro is tested.</h3>
                        <p className="text-gray-600 mb-6">But before we tell you about how we test featured products, here's how we find them!</p>

                        <div className="space-y-4">
                            <h4 className="text-gray-900 font-bold">Our sources to find top digital products include:</h4>
                            <ul className="c2-list space-y-3">
                                {[
                                    "Stats from sources like Statista, SimilarWeb, etc.",
                                    "Awards and accolades include App Store Award, Google Play's best apps and games, etc.",
                                    "News and release notes are also taken into account.",
                                    "We also let product owners themselves reach out to us and submit their product for a thorough review."
                                ].map((item, i) => (
                                    <li key={i} className="c2-list-item flex gap-3 text-base text-gray-600 items-start">
                                        <div className="w-4 h-4 rounded-full bg-brand-orange flex-shrink-0 flex items-center justify-center mt-0.5">
                                            <i className="ri-check-line text-white"></i>
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-500 mt-4">We explore the vast universe of data and statistics to find out which digital products are being talked about the most.</p>
                        </div>
                    </div>

                    {/* Red Banner */}
                    <div className="c2-banner bg-gradient-to-r from-brand-orange to-brand-orange p-10 md:p-20">
                        <h3 className="text-2xl font-bold text-white mb-4">But...We Don't Just<br />Focus on What's Popular</h3>
                        <p className="text-gray-200 leading-relaxed">
                            While we keep tracking trending and award-winning apps, our space remains open for underrated or newly launched products as well. In short, beyond quality, we also keep an eye out for potential. That is why you find tons of underrated apps, websites, and software reviewed on The Web App Pro.
                            <br /><br />
                            As for the parameters to review digital products, here are a few that we use:
                        </p>
                    </div>

                    {/* Review Parameters List */}
                    <div className="p-10 md:p-20 space-y-12 border-b border-gray-200">

                        {/* User Experience */}
                        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-8">
                            <h4 className="text-lg font-bold text-gray-900">User Experience</h4>
                            <div className="text-base text-gray-600 space-y-4">
                                <p>We take a deep dive into the functionality of the product to identify what the user journey looks like. Our experts explore each product page in detail and test every publicly accessible feature for the intended users.</p>
                                <div>
                                    <p className="font-bold text-gray-800 mb-2">As a part of testing the user experience, we assess:</p>
                                    <ul className="list-disc pl-4 space-y-1 text-base">
                                        <li>Navigation structure and flow</li>
                                        <li>Design consistency, responsiveness, and intuitiveness</li>
                                        <li>Feature usefulness — are they essential or bloated?</li>
                                        <li>User feedback from app stores, online communities, and early testers</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gray-200 w-full"></div>

                        {/* Functional Testing */}
                        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-8">
                            <h4 className="text-lg font-bold text-gray-900">Functional Testing</h4>
                            <div className="text-base text-gray-600 space-y-4">
                                <p>Buggy apps can ruin the whole experience for users, even if the UX is top-notch. Our expert product reviewers are pros at testing functionalities.</p>
                                <div>
                                    <p className="font-bold text-gray-800 mb-2">Our testers actively use the app or software, evaluating:</p>
                                    <ul className="list-disc pl-4 space-y-1 text-base">
                                        <li>Real-time performance</li>
                                        <li>Bugs or lags</li>
                                        <li>Integrations with other tools</li>
                                        <li>Scalability and updates</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gray-800 w-full"></div>

                        {/* Market Fit & Innovation */}
                        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-8">
                            <h4 className="text-lg font-bold text-gray-900">Market Fit & Innovation</h4>
                            <div className="text-base text-gray-600 space-y-4">
                                <p>We are continuously focused on identifying products that solve real-world issues. In our pursuit, we identify if the product:</p>
                                <ul className="list-disc pl-4 space-y-1 text-base">
                                    <li>Solves a real-world issue</li>
                                    <li>Offers USPs</li>
                                    <li>Aligns with the latest trends</li>
                                </ul>
                            </div>
                        </div>

                        <div className="h-px bg-gray-800 w-full"></div>

                        {/* Privacy & Compliance */}
                        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-8">
                            <h4 className="text-lg font-bold text-gray-900">Privacy & Compliance</h4>
                            <div className="text-base text-gray-600 space-y-4">
                                <p>Data security is a critical concern given how fast cyberattackers are adopting new trends. Here's how we judge the security standards of products:</p>
                                <ul className="list-disc pl-4 space-y-1 text-base">
                                    <li>Data collection policies</li>
                                    <li>Security features (encryption, permissions, etc.)</li>
                                    <li>Compliance with GDPR, HIPAA, or other relevant standards</li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    {/* Golden Rating System */}
                    <div className="p-10 md:p-20">
                        <h4 className="text-xl font-bold text-brand-dark text-center mb-10">Our Golden Rating System</h4>

                        <div className="c2-grid grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 border border-gray-200">
                            {/* Box 1 (5 Stars) */}
                            <div className="c2-grid-item bg-gray-50 p-8 flex flex-col items-center justify-center text-center md:aspect-square md:row-span-2 hover:bg-brand-orange hover:text-black transition-colors duration-300 group">
                                <div className="text-brand-orange group-hover:text-brand-lime text-lg mb-2 tracking-widest">★★★★★</div>
                                <div className="font-semibold text-gray-900 group-hover:text-black">A perfectly<br />planned product</div>
                            </div>

                            {/* Box 2 (4 Stars) */}
                            <div className="c2-grid-item bg-gray-50 p-8 flex flex-col items-center justify-center text-center md:aspect-square h-full hover:bg-brand-orange hover:text-black transition-colors duration-300 group">
                                <div className="text-brand-orange group-hover:text-brand-lime text-lg mb-2 tracking-widest">★★★★</div>
                                <div className="font-semibold text-gray-900 group-hover:text-black">Good product, with scope for<br />improvement</div>
                            </div>

                            {/* Box 3 (Split) */}
                            <div className="c2-grid-item bg-gray-50 grid grid-cols-1 md:grid-cols-10 md:aspect-video md:col-span-2">
                                <div className="border-r border-gray-200 flex flex-col md:col-span-5">
                                    <div className="flex-1 flex flex-col items-center justify-center border-b border-gray-200 p-8 md:p-2 hover:bg-brand-orange hover:text-black transition-colors duration-300 group">
                                        <div className="text-brand-orange group-hover:text-brand-lime text-lg mb-1">★</div>
                                        <div className="leading-tight text-center font-semibold text-gray-900 group-hover:text-black">Wouldn't<br />recommend</div>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-2 hover:bg-brand-orange hover:text-black transition-colors duration-300 group">
                                        <div className="text-brand-orange group-hover:text-brand-lime text-lg mb-1">★★</div>
                                        <div className="leading-tight text-center font-semibold text-gray-900 group-hover:text-black">Ignores key<br />improvements</div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-center p-8 md:p-2 text-center md:col-span-5 hover:bg-brand-orange hover:text-black transition-colors duration-300 group">
                                    <div className="text-brand-orange group-hover:text-brand-lime text-lg mb-2 tracking-widest">★★★</div>
                                    <div className="leading-tight font-semibold text-gray-900 group-hover:text-black">Balanced, but easily replaceable</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* 03. Editorial Standards (Brand Burgundy) */}
            <div className="relative min-h-screen flex flex-col md:flex-row border-b">
                {/* Sticky Header */}
                <div className="w-full md:w-1/2 p-10 md:p-20 bg-brand-burgundy text-white flex flex-col justify-between md:sticky md:top-0 md:h-screen z-10">
                    <div className="text-xl font-bold tracking-widest border-t border-white/30 pt-4">03</div>
                    <div className="mt-10">
                        <h2 className="text-5xl md:text-7xl font-bold leading-tight relative">
                            The Web App Pro's<br />Editorial Standards
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
                            <p className="text-gray-600 leading-relaxed mb-8">
                                Our content is diverse and independent. Internally, we have experts assigned on multiple industries and niches. Some folks are doing it all for the SaaS industry, while others are completely focused on publishing high-quality thought leadership blogs.
                            </p>
                            <h4 className="text-gray-900 font-bold text-lg">However, there are certain parameters for every category of the content. For instance,</h4>
                        </div>

                        {/* Standard 1 */}
                        <div className="c3-standard group">
                            <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-4">
                                <span className="text-gray-700 font-black text-3xl group-hover:text-brand-burgundy transition-colors">01.</span>
                                Unbiased and Uninfluenced Information
                            </h4>
                            <ul className="space-y-3 pl-12">
                                <li className="text-gray-600 text-base leading-relaxed flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-burgundy mt-2 shrink-0"></span>
                                    <span>No external organization or party influences our decision-making. If we don't like a product, we simply don't like it.</span>
                                </li>
                                <li className="text-gray-600 text-base leading-relaxed flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-burgundy mt-2 shrink-0"></span>
                                    <span>Our goal remains to publish unbiased information. Therefore, we ensure every opinion we share, whether of an app or a tech, is based on our actual research or experience.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Standard 2 */}
                        <div className="c3-standard group">
                            <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-4">
                                <span className="text-gray-700 font-black text-3xl group-hover:text-brand-burgundy transition-colors">02.</span>
                                Every Detail is Fact-Checked and Peer-Reviewed
                            </h4>
                            <ul className="space-y-3 pl-12">
                                <li className="text-gray-600 text-base leading-relaxed flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-burgundy mt-2 shrink-0"></span>
                                    <span>Everything that goes live on the website has to be factually accurate. Beyond using high-quality data sources and organizing our own research, we have certain editors assigned to maintain quality standards and fact-check every piece of information before it goes live.</span>
                                </li>
                                <li className="text-gray-600 text-base leading-relaxed flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-burgundy mt-2 shrink-0"></span>
                                    <span>Beyond fact-checking, each editorial passes through a two-layer editorial review—first by the primary author, and then by a senior editor who ensures accuracy, consistency, and neutrality.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Standard 3 */}
                        <div className="c3-standard group">
                            <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-4">
                                <span className="text-gray-700 font-black text-3xl group-hover:text-brand-burgundy transition-colors">03.</span>
                                We Hear You, Beyond Search Engines
                            </h4>
                            <p className="text-gray-600 text-base leading-relaxed pl-12">
                                We collab with social media experts to identify what our target audience wants. We prepare additional content around these observed queries.
                            </p>
                        </div>

                        {/* Standard 4 (Corrected Title based on context) */}
                        <div className="c3-standard group">
                            <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-4">
                                <span className="text-gray-700 font-black text-3xl group-hover:text-brand-burgundy transition-colors">04.</span>
                                Our Editorial Voice
                            </h4>
                            <ul className="space-y-3 pl-12">
                                <li className="text-gray-600 text-base leading-relaxed flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-burgundy mt-2 shrink-0"></span>
                                    <span>Our editorial voice is informed, clear, and accessible. The goal remains to simplify complex ideas without influencing the depth of the concept.</span>
                                </li>
                                <li className="text-gray-600 text-base leading-relaxed flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-burgundy mt-2 shrink-0"></span>
                                    <span>We also adapt tone depending on the audience, for example, C-suite content tends to be strategic and direct, while product-focused content remains more technical.</span>
                                </li>
                            </ul>
                        </div>

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

                    <div className="text-xl font-bold tracking-widest border-t border-brand-dark/30 pt-4 relative z-10">04</div>
                    <h2 className="text-5xl md:text-7xl font-bold leading-tight mt-10 relative z-10">
                        The Web App Pro<br />Editors
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
                        {[
                            {
                                name: "Sarah Jenkins",
                                role: "Sr. Content Editor",
                                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
                                bio: "With over nine years of experience in Content Marketing, Sarah has developed a strong expertise in creating, curating, and evaluating content. Her collaborative approach with stakeholders has broadened her knowledge in AI, Fintech, HealthTech, and more.",
                                videoCover: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
                                articles: [
                                    "10 Free AI Chatbots | Our Top Picks After a Week of Robotic Chats",
                                    "How is AI in Mobile App Security Transforming the Digital Landscape?",
                                    "Oply Review: Is It a Worthwhile Home Management Assistant App?",
                                    "My Week on BYDFi | A (Non) Trader's Honest Review",
                                    "How to Build User Friendly AI Products"
                                ]
                            },
                            {
                                name: "David Chen",
                                role: "Tech Lead",
                                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
                                bio: "David brings a developer's perspective to our editorial team. With a background in full-stack engineering, he ensures that our technical reviews are code-accurate and architecturally sound.",
                                videoCover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
                                articles: [
                                    "The State of React Server Components in 2024",
                                    "Micro-Frontends: A Practical Guide for Enterprises",
                                    "Debugging Memory Leaks in Node.js Applications",
                                    "AWS vs Azure vs GCP: A Cost Analysis for Startups",
                                    "Rust for Web Development: Is it Ready?"
                                ]
                            }
                        ].map((editor, index) => (
                            <SwiperSlide key={index}>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-12 h-full">
                                    {/* Left Card: Profile */}
                                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col h-full shadow-md">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                                <img src={editor.image} alt={editor.name} className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                        <h4 className="text-xl font-bold text-black">{editor.name}</h4>
                                        <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-md mb-4 w-fit text-sm">{editor.role}</span>

                                        <p className="text-gray-600 leading-relaxed text-sm">
                                            {editor.bio}
                                        </p>
                                    </div>

                                    {/* Center Card: Video */}
                                    <div className="bg-gray-800 rounded-2xl overflow-hidden relative h-[400px] md:h-auto">
                                        <img src={editor.videoCover} alt="Video Cover" className="w-full h-full object-cover opacity-80" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                                                <i className="ri-play-fill text-black text-2xl"></i>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Card: Articles */}
                                    <div className="bg-white rounded-2xl p-6 flex flex-col h-full">
                                        <h4 className="text-black font-bold mb-4">Reviewed Articles</h4>
                                        <div className="space-y-4 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                                            {editor.articles.map((title, i) => (
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
                        ))}

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
