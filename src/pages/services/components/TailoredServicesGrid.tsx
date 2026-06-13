import React, { useState } from 'react';

const TailoredServicesGrid: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(1); // Default to 2nd item active

    const services = [
        {
            title: "Web App Development",
            description: "Custom-built scalable web applications tailored to your business needs.",
            icon: "ri-window-line",
            image: "/assets/services/web_design.png",
        },
        {
            title: "App Development",
            description: "Native and cross-platform mobile apps that deliver exceptional user experiences.",
            icon: "ri-smartphone-line",
            image: "/assets/services/app_dev.png",
        },
        {
            title: "AI Automation",
            description: "Intelligent automation solutions to streamline operations and cut costs.",
            icon: "ri-brain-line",
            image: "/assets/services/ai_dev.png",
        },
        {
            title: "UI/UX Design",
            description: "User-centric designs that drive engagement and boost conversion rates.",
            icon: "ri-palette-line",
            image: "/assets/services/ui_ux.png",
        },
        {
            title: "Cloud Solutions",
            description: "Secure and scalable cloud infrastructure for seamless business growth.",
            icon: "ri-cloud-line",
            image: "/assets/services/cloud_services.png",
        },
        {
            title: "Cyber Security",
            description: "Robust security protocols to protect your digital assets and user data.",
            icon: "ri-shield-keyhole-line",
            image: "/assets/services/cyber_security.png",
        },
        {
            title: "Data Analytics",
            description: "Actionable insights derived from your data to drive strategic decisions.",
            icon: "ri-bar-chart-grouped-line",
            image: "/assets/services/data_analytics.png",
        },
        {
            title: "Digital Strategy",
            description: "Comprehensive digital roadmaps to navigate the complex tech landscape.",
            icon: "ri-compass-3-line",
            image: "/assets/services/digital_strategy.png",
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-20">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-brand-lime text-[#1F2853] text-xs font-bold tracking-wider mb-6 uppercase">
                        Our Expertise
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#1F2853] font-manrope leading-tight">
                        Tailored Services to Grow & <br className="hidden md:block" /> Protect Your Business
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => setActiveIndex(index)}
                            className={`relative h-[480px] rounded-[2.5rem] p-8 flex flex-col justify-between transition-all duration-500 group overflow-hidden cursor-pointer ${activeIndex === index
                                ? 'bg-brand-lime shadow-2xl scale-[1.02] z-10'
                                : 'bg-white border border-gray-100 hover:shadow-xl hover:border-brand-lime/30'
                                }`}
                        >
                            {/* Top Content */}
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300 ${activeIndex === index
                                        ? 'bg-[#1F2853] text-brand-lime'
                                        : 'bg-brand-lime text-[#1F2853]'
                                        }`}>
                                        <i className={`${service.icon} text-2xl`}></i>
                                    </div>

                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${activeIndex === index
                                        ? 'bg-[#1F2853] text-white'
                                        : 'bg-gray-50 text-gray-400'
                                        }`}>
                                        <i className={`ri-arrow-right-up-line text-lg transform transition-transform duration-300 ${activeIndex === index ? 'rotate-45' : 'group-hover:rotate-45'}`}></i>
                                    </div>
                                </div>

                                <h3 className={`text-2xl font-bold font-manrope mb-4 leading-tight ${activeIndex === index ? 'text-[#1F2853]' : 'text-[#1F2853]'}`}>
                                    {service.title}
                                </h3>
                                <p className={`text-sm font-poppins leading-relaxed pr-2 ${activeIndex === index ? 'text-[#1F2853]/80' : 'text-gray-500'}`}>
                                    {service.description}
                                </p>
                            </div>

                            {/* Bottom Image */}
                            <div className="absolute -bottom-2 left-0 right-0 h-56 w-full overflow-hidden rounded-b-[2.5rem]">
                                <div className={`absolute inset-0 z-10 transition-colors duration-500 ${activeIndex === index
                                    ? 'bg-gradient-to-t from-brand-lime via-brand-lime/20 to-transparent'
                                    : 'bg-gradient-to-t from-white via-white/40 to-transparent'
                                    }`}></div>

                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TailoredServicesGrid;
