import React, { useState, useEffect, useRef } from 'react';

const stats = [
    { label: "Satisfied Clients", value: 600, suffix: "+" },
    { label: "Saved for Clients Annually", prefix: "$", value: 5, suffix: "bn" },
    { label: "We Worked of the Global 500", value: 80, suffix: "%" },
    { label: "Repeat Clients or Referrals", prefix: ">", value: 90 },
];

const industries = [
    {
        title: "Automotive",
        content: "We accelerate digital transformation in the automotive sector, from connected car solutions to smart manufacturing and supply chain optimization."
    },
    {
        title: "Defense, Security & Justice",
        content: "Providing secure, compliant, and mission-critical software solutions that enhance operational efficiency and national safety."
    },
    {
        title: "Energy & Chemicals",
        content: "Driving sustainability and efficiency through IoT, data analytics, and automation in the energy and chemical processing industries."
    },
    {
        title: "Health Care",
        content: "Revolutionizing patient care with telemedicine platforms, electronic health records, and AI-driven diagnostic tools."
    },
    {
        title: "Investment Management",
        content: "Empowering financial institutions with robust trading platforms, risk management systems, and personalized customer experiences."
    },
    {
        title: "Telecommunications",
        content: "Enabling next-gen connectivity with 5G solutions, network virtualization, and customer-centric digital services."
    }
];

const Counter = ({ end, duration = 2000, prefix = "", suffix = "" }: { end: number, duration?: number, prefix?: string, suffix?: string }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.5 }); // Trigger when 50% visible

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number | null = null;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Ease out quart
            const ease = 1 - Math.pow(1 - percentage, 4);

            setCount(Math.floor(end * ease));

            if (progress < duration) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end); // Ensure exact final number
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [isVisible, end, duration]);

    return (
        <span ref={countRef}>
            {prefix}{count}{suffix}
        </span>
    );
};

export default function AgenciesStats() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-[#F9FAFB] py-20 text-[#1A1B20] font-sans">
            {/* Top Stats Bar */}
            <div className="border-b border-gray-200 pb-12 mb-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
                    {stats.map((stat, index) => (
                        <div key={index}>
                            <div className="text-[#f25a1a] text-3xl lg:text-4xl font-bold mb-1">
                                <Counter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                            </div>
                            <div className="text-xs uppercase tracking-widest text-gray-500">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="relative rounded-3xl overflow-hidden min-h-[500px] flex items-end p-8 md:p-12 shadow-xl shadow-gray-200/50">
                    <img
                        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070"
                        alt="Strategic Team Collaboration"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                    <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-end gap-6 text-white">
                        <div>
                            <div className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center mb-4">
                                <i className="ri-bar-chart-groupped-fill text-white"></i>
                            </div>
                            <h3 className="text-2xl md:text-4xl font-bold max-w-xl mb-2 drop-shadow-lg">
                                Helping Fast-moving Innovators Scale With Purpose
                            </h3>
                        </div>
                        <button className="bg-[#f25a1a] hover:bg-[#d14815] text-white px-6 py-3 rounded-full font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2">
                            Set an Appointment
                            <i className="ri-arrow-right-up-line"></i>
                        </button>
                    </div>
                </div>

                <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div className="sticky top-8">
                        {/* Animated Radial Graph */}
                        <div className="aspect-square bg-white rounded-3xl flex flex-col items-center justify-center p-8 max-w-md mx-auto border border-gray-100 shadow-2xl shadow-gray-200/50 relative overflow-hidden">
                            {/* Title */}
                            <div className="absolute top-8 left-0 right-0 text-center z-10">
                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Performance Metrics</h4>
                            </div>

                            <div className="relative w-full h-full flex items-center justify-center mt-4">
                                {/* Grid Circles */}
                                <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-20">
                                    <circle cx="100" cy="100" r="30" fill="none" stroke="#1A1B20" strokeWidth="1" strokeDasharray="4 4" />
                                    <circle cx="100" cy="100" r="60" fill="none" stroke="#1A1B20" strokeWidth="1" strokeDasharray="4 4" />
                                    <circle cx="100" cy="100" r="90" fill="none" stroke="#1A1B20" strokeWidth="1" />
                                    {/* Axis Lines */}
                                    <line x1="100" y1="10" x2="100" y2="190" stroke="#1A1B20" strokeWidth="0.5" />
                                    <line x1="10" y1="100" x2="190" y2="100" stroke="#1A1B20" strokeWidth="0.5" />
                                    <line x1="36" y1="36" x2="164" y2="164" stroke="#1A1B20" strokeWidth="0.5" />
                                    <line x1="36" y1="164" x2="164" y2="36" stroke="#1A1B20" strokeWidth="0.5" />
                                </svg>

                                {/* Animated Blobs */}
                                <svg viewBox="0 0 200 200" className="relative w-full h-full overflow-visible mix-blend-multiply">
                                   

                                    {/* Blob 2: Brand Burgundy */}
                                    <path fill="#56122D" fillOpacity="0.9">
                                        <animate
                                            attributeName="d"
                                            dur="7s"
                                            repeatCount="indefinite"
                                            values="M100,25 Q130,50 150,100 T120,170 T50,140 T30,80 T100,25;
                                                    M100,15 Q145,45 155,110 T110,160 T60,150 T35,70 T100,15;
                                                    M100,25 Q130,50 150,100 T120,170 T50,140 T30,80 T100,25"
                                        />
                                    </path>

                                    {/* Blob 3: Mixed Lime */}
                                    <path fill="#B9ED2A" fillOpacity="0.9">
                                        <animate
                                            attributeName="d"
                                            dur="9s"
                                            repeatCount="indefinite"
                                            values="M100,40 Q130,60 140,90 T130,160 T60,130 T40,70 T100,40;
                                                    M100,30 Q145,55 160,100 T120,150 T50,140 T35,80 T100,30;
                                                    M100,40 Q130,60 140,90 T130,160 T60,130 T40,70 T100,40"
                                        />
                                    </path>
                                </svg>
                            </div>

                            {/* Legend */}
                            <div className="absolute bottom-6 flex gap-6 text-xs font-semibold">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#1A1B20] opacity-70"></span>
                                    <span>Efficiency</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#f25a1a] opacity-80"></span>
                                    <span>Growth</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-[#1A1B20]/5 text-[#1A1B20] text-xs font-semibold uppercase tracking-wider mb-6">Industries</span>
                        <h2 className="text-3xl md:text-5xl font-medium mb-10 leading-tight text-[#1A1B20]">
                            Our Experience Spans Every Industry and Challenge
                        </h2>

                        <div className="space-y-4">
                            {industries.map((item, index) => (
                                <div key={index} className="border-b border-gray-200 pb-4">
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="w-full flex justify-between items-center group cursor-pointer py-2 focus:outline-none"
                                    >
                                        <span className={`text-lg font-medium transition-colors ${openIndex === index ? 'text-[#f25a1a]' : 'text-[#1A1B20] hover:text-[#f25a1a]'}`}>
                                            {item.title}
                                        </span>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index ? 'bg-[#f25a1a] text-white rotate-180' : 'bg-gray-100 text-gray-500 group-hover:bg-[#f25a1a] group-hover:text-white'}`}>
                                            <i className="ri-arrow-down-s-line text-xl"></i>
                                        </div>
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
                                    >
                                        <p className="text-gray-500 leading-relaxed text-sm lg:text-base pr-8">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10">
                            <button className="bg-[#f25a1a] text-white px-8 py-3 rounded-full font-bold hover:bg-[#d14815] transition-colors cursor-pointer shadow-lg shadow-orange-500/20">
                                Discover More Industry Solutions
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
