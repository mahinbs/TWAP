import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { servicesApi, siteContentApi } from '../../../lib/api';

const TailoredServicesGrid = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(1);

    const { data: section } = useQuery({
        queryKey: ['page-section', 'services', 'tailored'],
        queryFn: () => siteContentApi.section('services', 'tailored'),
    });

    const { data: services = [] } = useQuery({
        queryKey: ['services-items', 'tailored'],
        queryFn: () => servicesApi.items('tailored'),
    });

    const c = section?.content as Record<string, string> | undefined;
    const titleLine1 = section?.title?.split('&')[0]?.trim() ?? 'Tailored Services to Grow &';
    const titleLine2 = c?.title_line2 ?? 'Protect Your Business';

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    {section?.subtitle && (
                        <span className="inline-block py-1.5 px-4 rounded-full bg-brand-lime text-[#1F2853] text-xs font-bold tracking-wider mb-6 uppercase">
                            {section.subtitle}
                        </span>
                    )}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#1F2853] font-manrope leading-tight">
                        {titleLine1} <br className="hidden md:block" /> {titleLine2}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            onMouseEnter={() => setActiveIndex(index)}
                            className={`relative h-[480px] rounded-[2.5rem] p-8 flex flex-col justify-between transition-all duration-500 group overflow-hidden cursor-pointer ${activeIndex === index
                                ? 'bg-brand-lime shadow-2xl scale-[1.02] z-10'
                                : 'bg-white border border-gray-100 hover:shadow-xl hover:border-brand-lime/30'
                                }`}
                        >
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    {service.icon && (
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300 ${activeIndex === index
                                            ? 'bg-[#1F2853] text-brand-lime'
                                            : 'bg-brand-lime text-[#1F2853]'
                                            }`}>
                                            <i className={`${service.icon} text-2xl`}></i>
                                        </div>
                                    )}
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${activeIndex === index
                                        ? 'bg-[#1F2853] text-white'
                                        : 'bg-gray-50 text-gray-400'
                                        }`}>
                                        <i className={`ri-arrow-right-up-line text-lg transform transition-transform duration-300 ${activeIndex === index ? 'rotate-45' : 'group-hover:rotate-45'}`}></i>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold font-manrope mb-4 leading-tight text-[#1F2853]">
                                    {service.title}
                                </h3>
                                {service.description && (
                                    <p className={`text-sm font-poppins leading-relaxed pr-2 ${activeIndex === index ? 'text-[#1F2853]/80' : 'text-gray-500'}`}>
                                        {service.description}
                                    </p>
                                )}
                            </div>

                            {service.image_url && (
                                <div className="absolute -bottom-2 left-0 right-0 h-56 w-full overflow-hidden rounded-b-[2.5rem]">
                                    <div className={`absolute inset-0 z-10 transition-colors duration-500 ${activeIndex === index
                                        ? 'bg-gradient-to-t from-brand-lime via-brand-lime/20 to-transparent'
                                        : 'bg-gradient-to-t from-white via-white/40 to-transparent'
                                        }`}></div>
                                    <img
                                        src={service.image_url}
                                        alt={service.title}
                                        className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TailoredServicesGrid;
