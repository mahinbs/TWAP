import { useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { everythingAiApi, siteContentApi } from '../../lib/api';

const AIExperts = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const { data: section } = useQuery({
        queryKey: ['page-section', 'everything-ai', 'experts'],
        queryFn: () => siteContentApi.section('everything-ai', 'experts'),
    });

    const { data: experts = [] } = useQuery({
        queryKey: ['everything-ai-items', 'experts'],
        queryFn: () => everythingAiApi.items('experts'),
    });

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer || experts.length === 0) return;

        let animationFrameId: number;

        const scroll = () => {
            if (scrollContainer) {
                if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                    scrollContainer.scrollLeft = 0;
                } else {
                    scrollContainer.scrollLeft += 0.5;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(animationFrameId);
    }, [experts.length]);

    const looped = experts.length > 0 ? [...experts, ...experts, ...experts] : [];

    return (
        <section className="py-24 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-12">
                <h2 className="text-4xl font-bold text-brand-dark mb-4">
                    {section?.title ?? 'Featured AI Experts'}
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg mb-8">
                    {section?.description ?? 'Some genius brains and brawns that are helping businesses leverage AI'}
                </p>
            </div>

            <div className="relative w-full">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#f7f5ef] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#f7f5ef] to-transparent z-10 pointer-events-none"></div>

                <div
                    ref={scrollRef}
                    className="flex overflow-x-hidden no-scrollbar w-full group/track py-12"
                >
                    {looped.map((expert, index) => (
                        <div key={`${expert.id}-${index}`} className="w-[350px] mx-4 flex-shrink-0">
                            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm transition-all duration-500 h-full flex flex-col items-start text-left group-hover/track:scale-95 
                                hover:!scale-105 hover:!opacity-100 hover:!blur-none hover:!shadow-2xl hover:z-10 hover:border-brand-orange/30 relative">

                                <div className="w-12 h-12 mb-4 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100">
                                    {expert.logo_url && (
                                        <img src={expert.logo_url} alt={expert.title} className="w-full h-full object-cover" />
                                    )}
                                </div>

                                <div className="flex items-center gap-2 mb-3">
                                    <h3 className="font-bold text-lg text-brand-dark">{expert.title}</h3>
                                    <i className="ri-checkbox-circle-fill text-brand-orange"></i>
                                </div>

                                {expert.description && (
                                    <p className="text-sm text-gray-500 mb-6 leading-relaxed line-clamp-3">
                                        {expert.description}
                                    </p>
                                )}

                                <div className="mt-auto w-full">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {(expert.tags ?? []).map((tag, i) => (
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
