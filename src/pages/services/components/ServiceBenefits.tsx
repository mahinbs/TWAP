import { useQuery } from '@tanstack/react-query';
import { servicesApi, siteContentApi } from '../../../lib/api';

const ServiceBenefits = () => {
    const { data: section } = useQuery({
        queryKey: ['page-section', 'services', 'benefits'],
        queryFn: () => siteContentApi.section('services', 'benefits'),
    });

    const { data: benefits = [] } = useQuery({
        queryKey: ['services-items', 'benefits'],
        queryFn: () => servicesApi.items('benefits'),
    });

    const c = section?.content as Record<string, string> | undefined;
    const videoQuote = c?.video_quote ?? 'The Web App Pro transformed our business logic into a scalable masterpiece.';
    const mediaUrl = section?.media_url ?? '/assets/services/web_design.png';

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="relative">
                        <div className="mb-8">
                            {section?.subtitle && (
                                <span className="inline-block py-1 px-3 rounded-full bg-brand-lime text-[#1F2853] text-xs font-bold tracking-wider mb-4 uppercase">
                                    {section.subtitle}
                                </span>
                            )}
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F2853] font-manrope leading-tight">
                                {section?.title ?? 'Why Choose Us for Your Digital Evolution?'}
                            </h2>
                        </div>

                        <div className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer aspect-[4/3]">
                            <div className="absolute inset-0 bg-[#1F2853]">
                                <img
                                    src={mediaUrl}
                                    alt="Team collaboration"
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-500"
                                />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform duration-300">
                                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                                        <i className="ri-play-fill text-3xl text-brand-orange ml-1"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                                    <p className="text-white text-sm font-medium font-poppins">"{videoQuote}"</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {benefits.map(benefit => (
                            <div key={benefit.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start hover:shadow-md transition-shadow duration-300">
                                {benefit.icon && (
                                    <div className="w-12 h-12 rounded-full bg-brand-lime flex items-center justify-center shrink-0 mr-5 mt-1">
                                        <i className={`${benefit.icon} text-xl text-[#1F2853]`}></i>
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-lg font-bold text-[#1F2853] mb-2 font-manrope">{benefit.title}</h3>
                                    {benefit.description && (
                                        <p className="text-gray-600 text-sm font-poppins leading-relaxed">{benefit.description}</p>
                                    )}
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
