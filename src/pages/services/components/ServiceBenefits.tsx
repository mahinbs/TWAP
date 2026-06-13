import React from 'react';

const ServiceBenefits: React.FC = () => {
    const benefits = [
        {
            icon: "ri-trophy-line",
            title: "Certified Expert Engineering",
            description: "Work with a team represented by top 1% talent in the industry committed to your digital success."
        },
        {
            icon: "ri-shield-check-line",
            title: "Enterprise-Grade Security",
            description: "Your data and intellectual property are protected by state-of-the-art security protocols from day one."
        },
        {
            icon: "ri-rocket-line",
            title: "Scalable Architecture",
            description: "We build systems designed to grow effortlessly with your user base, ensuring zero downtime at scale."
        },
        {
            icon: "ri-shake-hands-line",
            title: "Dedicated Partnership",
            description: "We don't just build software; we partner with you to analyze, strategize, and execute for long-term growth."
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Content & Video Placeholder */}
                    <div className="relative">
                        <div className="mb-8">
                            <span className="inline-block py-1 px-3 rounded-full bg-brand-lime text-[#1F2853] text-xs font-bold tracking-wider mb-4 uppercase">
                                Why Choose Us?
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F2853] font-manrope leading-tight">
                                Why Choose Us for Your Digital Evolution?
                            </h2>
                        </div>

                        <div className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer aspect-[4/3]">
                            {/* Background Image Placeholder */}
                            <div className="absolute inset-0 bg-[#1F2853]">
                                <img
                                    src="/assets/services/web_design.png"
                                    alt="Team collaboration"
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-500"
                                />
                            </div>

                            {/* Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform duration-300">
                                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                                        <i className="ri-play-fill text-3xl text-brand-orange ml-1"></i>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                                    <p className="text-white text-sm font-medium font-poppins">
                                        "The Web App Pro transformed our business logic into a scalable masterpiece."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Benefits List */}
                    <div className="space-y-6">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start hover:shadow-md transition-shadow duration-300">
                                <div className="w-12 h-12 rounded-full bg-brand-lime flex items-center justify-center shrink-0 mr-5 mt-1">
                                    <i className={`${benefit.icon} text-xl text-[#1F2853]`}></i>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#1F2853] mb-2 font-manrope">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm font-poppins leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ServiceBenefits;
