import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { everythingAiApi, siteContentApi } from '../../lib/api';

const AIAction = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
    const [isMuted, setIsMuted] = useState(true);

    const { data: section } = useQuery({
        queryKey: ['page-section', 'everything-ai', 'action'],
        queryFn: () => siteContentApi.section('everything-ai', 'action'),
    });

    const { data: videos = [] } = useQuery({
        queryKey: ['everything-ai-items', 'videos'],
        queryFn: () => everythingAiApi.items('videos'),
    });

    const c = section?.content as Record<string, string> | undefined;
    const instagramUrl = c?.instagram_url ?? section?.cta_url ?? 'https://instagram.com';
    const titleHighlight = 'Action';
    const titleBase = section?.title?.replace(/\s*Action\s*/i, ' ')?.trim() ?? 'See AI in';

    return (
        <section className="py-24 bg-transparent text-brand-dark relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-brand-burgundy rounded-full blur-[150px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-dark leading-tight">
                            {titleBase}{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-lime">{titleHighlight}</span>
                        </h2>
                        <p className="text-gray-500 max-w-xl text-lg">
                            {section?.description ?? 'Short, sharp, and smart reviews of the latest AI tools you need to know.'}
                        </p>
                    </div>

                    {section?.cta_text && (
                        <a
                            href={instagramUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-6 md:mt-0 px-8 py-3 rounded-full border border-gray-200 bg-white text-brand-dark font-medium hover:bg-brand-dark hover:text-white transition-all flex items-center gap-2 shadow-sm"
                        >
                            {section.cta_text}
                            <i className="ri-instagram-line text-brand-orange"></i>
                        </a>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[600px]">
                    {videos.map((video, index) => {
                        const isHovered = hoveredIndex === index;
                        const youtubeId = video.youtube_id ?? '';
                        return (
                            <div
                                key={video.id}
                                className={`relative rounded-[2rem] overflow-hidden cursor-pointer bg-white border border-gray-200 transition-all duration-500 ease-out 
                                    ${isHovered ? 'lg:flex-[3.5] bg-gray-900 border-none' : 'lg:flex-[1] hover:flex-[1.2]'} 
                                    h-[400px] lg:h-full group shadow-md hover:shadow-2xl`}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onClick={() => setHoveredIndex(index)}
                            >
                                {youtubeId && (
                                    <img
                                        src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                                        alt={video.title}
                                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 
                                            ${isHovered ? 'scale-105 opacity-40' : 'scale-100 opacity-80 filter grayscale'}`}
                                    />
                                )}

                                <div className={`absolute inset-0 transition-colors duration-500 ${isHovered ? 'bg-black/20' : 'bg-black/50'}`}></div>

                                <div className={`absolute top-8 left-1/2 -translate-x-1/2 w-full text-center transition-all duration-500
                                    ${isHovered ? 'opacity-100 translate-y-0' : 'lg:opacity-100 lg:rotate-90 lg:top-24 lg:tracking-[0.2em] font-black'}`}>
                                    <span className={`text-3xl lg:text-4xl font-black text-white drop-shadow-md uppercase tracking-wider whitespace-nowrap
                                        ${index % 2 === 0 ? 'text-brand-lime' : 'text-white'}`}
                                        style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                                        {video.overlay_text ?? video.title}
                                    </span>
                                </div>

                                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center animate-pulse">
                                        <i className="ri-play-fill text-3xl text-white"></i>
                                    </div>
                                </div>

                                {isHovered && youtubeId && (
                                    <div className="absolute inset-0 w-full h-full bg-black z-10 transition-opacity duration-1000 animate-in fade-in">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=${isMuted ? '1' : '0'}&controls=0&modestbranding=1&loop=1&playlist=${youtubeId}&playsinline=1&rel=0`}
                                            title={video.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            style={{ pointerEvents: 'none' }}
                                            className="w-full h-full object-cover"
                                        ></iframe>
                                    </div>
                                )}

                                <div className={`absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none transition-all duration-500 z-20 
                                    ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-full lg:opacity-0'}`}>
                                    <h3 className="text-3xl font-bold text-white leading-tight drop-shadow-md">
                                        {video.title} <br />
                                        {video.subtitle && (
                                            <span className="font-normal opacity-90 text-xl text-brand-orange">{video.subtitle}</span>
                                        )}
                                    </h3>
                                </div>

                                {isHovered && (
                                    <div className="absolute bottom-6 right-6 z-30 flex gap-2">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsMuted(!isMuted);
                                            }}
                                            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-brand-orange transition-colors"
                                        >
                                            {isMuted ? <i className="ri-volume-mute-fill text-xl"></i> : <i className="ri-volume-up-fill text-xl"></i>}
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default AIAction;
