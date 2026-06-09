import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { everythingAiApi, siteContentApi } from '../../lib/api';

const AIInsights = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    const { data: section } = useQuery({
        queryKey: ['page-section', 'everything-ai', 'insights'],
        queryFn: () => siteContentApi.section('everything-ai', 'insights'),
    });

    const { data: insights = [] } = useQuery({
        queryKey: ['everything-ai-items', 'insights'],
        queryFn: () => everythingAiApi.items('insights'),
    });

    const c = section?.content as Record<string, string> | undefined;
    const titleHighlight = c?.title_highlight ?? 'AI Insights';

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
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {section?.subtitle && (
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping"></span>
                                <span className="text-brand-orange font-bold text-xs tracking-widest uppercase">{section.subtitle}</span>
                            </div>
                        )}
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-dark max-w-lg mb-4 leading-tight">
                            Catch Up with <span className="underline decoration-brand-lime decoration-4 underline-offset-4">{titleHighlight}</span>
                        </h2>
                        <p className="text-gray-500 max-w-xl text-lg">
                            {section?.description ?? 'Deep dives into the technology shaping our future. Stay ahead of the curve.'}
                        </p>
                    </div>

                    {section?.cta_text && (
                        <Link
                            to={section.cta_url ?? '/resource-centre/blogs'}
                            className={`px-8 py-3 rounded-full bg-white border border-gray-200 hover:bg-brand-dark hover:text-white transition-all font-bold text-brand-dark flex items-center gap-2 group shadow-sm transform duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        >
                            {section.cta_text}
                            <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                        </Link>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                    {insights.map((item, index) => {
                        const extras = (item.extras ?? {}) as Record<string, unknown>;
                        const colSpan = (extras.col_span as string) ?? 'md:col-span-1';
                        const rowSpan = (extras.row_span as string) ?? 'md:row-span-1';
                        const isLarge = Boolean(extras.large);

                        const card = (
                            <div
                                className={`group relative rounded-[2rem] overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-2xl ${colSpan} ${rowSpan} transform transition-all duration-700 ease-out`}
                                style={{
                                    transitionDelay: `${index * 100}ms`,
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(40px)'
                                }}
                            >
                                <div className="absolute inset-0 w-full h-full">
                                    {item.image_url && (
                                        <img
                                            src={item.image_url}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-90"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-85"></div>
                                </div>

                                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        {item.category && (
                                            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold tracking-widest uppercase">
                                                {item.category}
                                            </span>
                                        )}
                                        {item.read_time && (
                                            <span className="text-gray-300 text-xs font-medium flex items-center gap-1">
                                                <i className="ri-time-line"></i> {item.read_time}
                                            </span>
                                        )}
                                    </div>

                                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className={`font-bold text-white mb-3 hover:text-brand-lime transition-colors leading-tight ${isLarge ? 'text-3xl' : 'text-xl'}`}>
                                            {item.title}
                                        </h3>
                                        {item.description && (
                                            <p className="text-gray-200 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white text-brand-dark flex items-center justify-center translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <i className="ri-arrow-right-up-line"></i>
                                </div>
                            </div>
                        );

                        return item.link_url ? (
                            <Link key={item.id} to={item.link_url} className="block">{card}</Link>
                        ) : (
                            <div key={item.id}>{card}</div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default AIInsights;
