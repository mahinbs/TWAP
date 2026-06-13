import { useRef, useEffect } from 'react';

const experts = [
    {
        name: "AI Superior",
        desc: "AI Superior was established in 2019 in Darmstadt, Germany, by a group of AI scientists...",
        logo: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=100",
        tags: ["Artificial Intelligence"]
    },
    {
        name: "DataRoot Labs",
        desc: "DataRoot Labs is a leading AI and data science company specializing in developing cutting-edge...",
        logo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100",
        tags: ["Artificial Intelligence"]
    },
    {
        name: "SunTec.ai",
        desc: "SunTec.ai is a full-stack enterprise AI services company helping businesses implement...",
        logo: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=100",
        tags: ["Artificial Intelligence"]
    },
    {
        name: "Vaidik AI",
        desc: "Vaidik AI specializes in delivering high-quality, ethically sourced, and scalable datasets...",
        logo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=100",
        tags: ["Artificial Intelligence"]
    },
    {
        name: "Scikit.AI",
        desc: "Pioneering the future of machine learning infrastructure for modern enterprises...",
        logo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=100",
        tags: ["Machine Learning"]
    }
];

const AIExperts = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Infinite Auto-Scroll Logic
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationFrameId: number;

        const scroll = () => {
            if (scrollContainer) {
                if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                    scrollContainer.scrollLeft = 0;
                } else {
                    scrollContainer.scrollLeft += 0.5; // Slow smooth scroll
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <section className="py-24 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-12">
                <h2 className="text-4xl font-bold text-brand-dark mb-4">
                    Featured AI Experts
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg mb-8">
                    Some genius brains and brawns that are helping businesses leverage AI
                </p>
            </div>

            <div className="relative w-full">
                {/* Fading Edges - Updated for light theme */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#f7f5ef] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#f7f5ef] to-transparent z-10 pointer-events-none"></div>

                <div
                    ref={scrollRef}
                    className="flex overflow-x-hidden no-scrollbar w-full group/track py-12"
                >
                    {/* Double the list for infinite loop */}
                    {[...experts, ...experts, ...experts].map((expert, index) => (
                        <div key={index} className="w-[350px] mx-4 flex-shrink-0">
                            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm transition-all duration-500 h-full flex flex-col items-start text-left group-hover/track:scale-95 
                                hover:!scale-105 hover:!opacity-100 hover:!blur-none hover:!shadow-2xl hover:z-10 hover:border-brand-orange/30 relative">

                                <div className="w-12 h-12 mb-4 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100">
                                    <img src={expert.logo} alt={expert.name} className="w-full h-full object-cover" />
                                </div>

                                <div className="flex items-center gap-2 mb-3">
                                    <h3 className="font-bold text-lg text-brand-dark">{expert.name}</h3>
                                    <i className="ri-checkbox-circle-fill text-brand-orange"></i>
                                </div>

                                <p className="text-sm text-gray-500 mb-6 leading-relaxed line-clamp-3">
                                    {expert.desc}
                                </p>

                                <div className="mt-auto w-full">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {expert.tags.map((tag, i) => (
                                            <span key={i} className="text-[10px] font-bold uppercase tracking-wider text-gray-400 border border-gray-100 px-2 py-1 rounded-md">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AIExperts;
