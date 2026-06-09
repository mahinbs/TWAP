import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { everythingAiApi, siteContentApi } from '../../lib/api';

const AIDirectories = () => {
    const { data: section } = useQuery({
        queryKey: ['page-section', 'everything-ai', 'directories'],
        queryFn: () => siteContentApi.section('everything-ai', 'directories'),
    });

    const { data: directories = [] } = useQuery({
        queryKey: ['everything-ai-items', 'directories'],
        queryFn: () => everythingAiApi.items('directories'),
    });

    const c = section?.content as Record<string, string> | undefined;
    const titleLine1 = c?.title_line1 ?? 'Verified AI Service';
    const titleLine2 = c?.title_line2 ?? 'Providers Directory';
    const eyebrow = section?.subtitle ?? 'Exclusive Intel';

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    };

    return (
        <section className="py-28 bg-transparent relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="h-[1px] w-8 bg-brand-orange"></span>
                            <span className="text-sm font-bold tracking-[0.2em] uppercase text-brand-dark">{eyebrow}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-dark leading-tight">
                            {titleLine1} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-burgundy">{titleLine2}</span>
                        </h2>
                    </div>

                    <div className="flex gap-4">
                        <button type="button" className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-brand-dark hover:text-white transition-colors">
                            <i className="ri-arrow-left-line text-xl"></i>
                        </button>
                        <button type="button" className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-brand-dark hover:text-white transition-colors">
                            <i className="ri-arrow-right-line text-xl"></i>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-container" style={{ perspective: '2000px' }}>
                    {directories.map((item) => {
                        const card = (
                            <div
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                className="group relative h-[450px] rounded-[2rem] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-200 ease-out preserve-3d"
                                style={{
                                    perspective: '1000px',
                                    transformStyle: 'preserve-3d',
                                    transition: 'transform 0.1s ease-out, box-shadow 0.3s ease'
                                }}
                            >
                                <div className="absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden bg-white shadow-sm border border-gray-100">
                                    <div className="absolute inset-0 w-full h-full">
                                        <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                        {item.image_url && (
                                            <img
                                                src={item.image_url}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-500"></div>
                                    </div>

                                    <div className="absolute inset-4 rounded-3xl border border-white/20 z-20 transition-all duration-500 group-hover:inset-0 group-hover:rounded-[2rem] group-hover:border-white/0"></div>
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-orange to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-30"></div>

                                    {item.icon && (
                                        <div className="absolute top-8 right-8 z-30 transform transition-transform duration-500 group-hover:translate-z-10 group-hover:scale-110" style={{ transform: 'translateZ(20px)' }}>
                                            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-brand-orange group-hover:border-brand-orange transition-colors duration-300">
                                                <i className={`${item.icon} text-2xl`}></i>
                                            </div>
                                        </div>
                                    )}

                                    <div className="absolute bottom-0 left-0 w-full p-8 z-30" style={{ transform: 'translateZ(30px)' }}>
                                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                            {item.title}
                                        </h3>
                                        {item.description && (
                                            <p className="text-gray-300 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                                                {item.description}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between pt-4 border-t border-white/10 group-hover:border-white/30 transition-colors">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Agencies</span>
                                                <span className="text-lg font-bold text-white">{item.agency_count}</span>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-brand-lime flex items-center justify-center text-black group-hover:bg-white transition-colors">
                                                <i className="ri-arrow-right-up-line"></i>
                                            </div>
                                        </div>
                                    </div>
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

export default AIDirectories;
