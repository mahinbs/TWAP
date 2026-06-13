import { useRef, useEffect, useState } from 'react';

const insights = [
    {
        title: "AI in Transportation: The Trillion-Dollar Pilot Behind Smarter Transports",
        excerpt: "Autonomous fleets are reshaping logistics, cutting costs by 40% while improving safety records across the board.",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800",
        tag: "LOGISTICS",
        readTime: "5 min read",
        colSpan: "md:col-span-2",
        rowSpan: "md:row-span-1"
    },
    {
        title: "Generative AI Security: Business Threats",
        excerpt: "Deepfakes and phantom data: The new frontier of corporate espionage.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
        tag: "SECURITY",
        readTime: "4 min read",
        colSpan: "md:col-span-1",
        rowSpan: "md:row-span-1"
    },
    {
        title: "AI in Retail: Modernizing Operations with Intelligent Automation",
        excerpt: "From smart shelves to predictive inventory, how AI is saving retail giants from extinction.",
        image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=600",
        tag: "RETAIL",
        readTime: "6 min read",
        large: true,
        colSpan: "md:col-span-1",
        rowSpan: "md:row-span-2"
    },
    {
        title: "Is Soul AI Safe? The Untold Truth",
        excerpt: "We dived deep into the privacy policies that no one reads.",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600",
        tag: "ETHICS",
        readTime: "3 min read",
        colSpan: "md:col-span-1",
        rowSpan: "md:row-span-1"
    },
    {
        title: "What is AIoT? The Intelligence Revolution",
        excerpt: "When IoT meets AI: The birth of truly smart cities.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
        tag: "IOT",
        readTime: "7 min read",
        colSpan: "md:col-span-1",
        rowSpan: "md:row-span-1"
    },
    {
        title: "Humanoid Robots: 2026 Predictions",
        excerpt: "From Tesla's Optimus to Figure 01: Why this is the year of the android.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600",
        tag: "ROBOTICS",
        readTime: "4 min read",
        colSpan: "md:col-span-1",
        rowSpan: "md:row-span-1"
    }
];

const AIInsights = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.15 });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="py-24 bg-transparent relative" ref={sectionRef}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping"></span>
                            <span className="text-brand-orange font-bold text-xs tracking-widest uppercase">Latest Intel</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-dark max-w-lg mb-4 leading-tight">
                            Catch Up with <span className="underline decoration-brand-lime decoration-4 underline-offset-4">AI Insights</span>
                        </h2>
                        <p className="text-gray-500 max-w-xl text-lg">
                            Deep dives into the technology shaping our future. Stay ahead of the curve.
                        </p>
                    </div>

                    <button className={`px-8 py-3 rounded-full bg-white border border-gray-200 hover:bg-brand-dark hover:text-white transition-all font-bold text-brand-dark flex items-center gap-2 group shadow-sm transform duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        View All Articles
                        <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                    </button>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">

                    {insights.map((item, index) => (
                        <div
                            key={index}
                            className={`group relative rounded-[2rem] overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-2xl ${item.colSpan} ${item.rowSpan} transform transition-all duration-700 ease-out`}
                            style={{
                                transitionDelay: `${index * 100}ms`,
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(40px)'
                            }}
                        >

                            {/* Image Background with Scale Effect */}
                            <div className="absolute inset-0 w-full h-full">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-85"></div>
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold tracking-widest uppercase">
                                        {item.tag}
                                    </span>
                                    <span className="text-gray-300 text-xs font-medium flex items-center gap-1">
                                        <i className="ri-time-line"></i> {item.readTime}
                                    </span>
                                </div>

                                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className={`font-bold text-white mb-3 hover:text-brand-lime transition-colors leading-tight ${item.large ? 'text-3xl' : 'text-xl'}`}>
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-200 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                        {item.excerpt}
                                    </p>
                                </div>
                            </div>

                            {/* Corner Arrow */}
                            <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white text-brand-dark flex items-center justify-center translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                <i className="ri-arrow-right-up-line"></i>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default AIInsights;
