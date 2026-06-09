import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { everythingAiApi, siteContentApi } from '../../lib/api';

const AITools = () => {
    const { data: section } = useQuery({
        queryKey: ['page-section', 'everything-ai', 'tools'],
        queryFn: () => siteContentApi.section('everything-ai', 'tools'),
    });

    const { data: tools = [] } = useQuery({
        queryKey: ['everything-ai-items', 'tools'],
        queryFn: () => everythingAiApi.items('tools'),
    });

    const c = section?.content as Record<string, string> | undefined;
    const viewDetailsText = c?.view_details_text ?? 'View Details';

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        target.style.setProperty('--mouse-x', `${x}px`);
        target.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <section className="py-24 bg-transparent">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-orange/10 rounded-full blur-[80px] pointer-events-none"></div>
                    <div className="relative z-10">
                        {section?.subtitle && (
                            <span className="inline-block px-4 py-1 rounded-full bg-white border border-gray-100 text-[10px] font-bold text-brand-orange uppercase tracking-[0.2em] mb-4 shadow-sm">
                                {section.subtitle}
                            </span>
                        )}
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
                            {section?.title ?? 'Featured AI Tools'}
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg mb-8">
                            {section?.description ?? 'Tried and tested solutions to upscale your workflow'}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool) => {
                        const extras = (tool.extras ?? {}) as Record<string, string>;
                        const color = extras.color ?? 'bg-gray-100 text-gray-800';
                        const shadow = extras.shadow ?? 'group-hover:shadow-gray-200';
                        const inner = (
                            <>
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(242, 90, 26, 0.05), transparent 60%)`
                                    }}
                                ></div>
                                <div className="relative z-10 flex gap-5">
                                    <div className={`w-20 h-20 rounded-2xl flex-shrink-0 overflow-hidden shadow-sm transition-shadow duration-500 ${shadow} ${color} flex items-center justify-center group-hover:scale-105 transform`}>
                                        {tool.logo_url && (
                                            <img src={tool.logo_url} alt={tool.title} className="w-full h-full object-cover p-0" />
                                        )}
                                    </div>
                                    <div className="flex-grow flex flex-col justify-between py-1">
                                        <div>
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-bold text-xl text-brand-dark group-hover:text-brand-orange transition-colors">
                                                    {tool.title}
                                                </h3>
                                                {tool.rating != null && (
                                                    <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                                                        <i className="ri-star-fill text-[#FDCB58] text-[10px]"></i>
                                                        <span className="text-xs font-bold text-brand-dark">{tool.rating}</span>
                                                    </div>
                                                )}
                                            </div>
                                            {tool.category && (
                                                <div className="text-xs text-gray-400 font-bold tracking-wide text-left mb-3 uppercase">
                                                    {tool.category}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center text-xs font-bold text-gray-500 group-hover:text-brand-dark transition-colors cursor-pointer w-max">
                                            {viewDetailsText}
                                            <i className="ri-arrow-right-line ml-1 transition-transform group-hover:translate-x-1"></i>
                                        </div>
                                    </div>
                                </div>
                            </>
                        );

                        return tool.link_url ? (
                            <Link
                                key={tool.id}
                                to={tool.link_url}
                                onMouseMove={handleMouseMove}
                                className="group relative bg-white rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden block"
                            >
                                {inner}
                            </Link>
                        ) : (
                            <div
                                key={tool.id}
                                onMouseMove={handleMouseMove}
                                className="group relative bg-white rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden"
                            >
                                {inner}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default AITools;
