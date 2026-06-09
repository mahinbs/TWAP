import { useQuery } from '@tanstack/react-query';
import { servicesApi, siteContentApi } from '../../../lib/api';
import type { ServicesItem } from '../../../lib/api';

const LAYOUT_CLASS: Record<string, string> = {
    tall: 'md:col-span-4 md:row-span-2',
    wide_dark: 'md:col-span-8',
    small: 'md:col-span-3',
    horizontal: 'md:col-span-5',
};

function BentoCard({ item }: { item: ServicesItem }) {
    const layout = (item.extras?.layout as string) ?? 'small';
    const titleHighlight = item.extras?.title_highlight as string | undefined;
    const gridClass = LAYOUT_CLASS[layout] ?? 'md:col-span-4';

    if (layout === 'tall') {
        return (
            <div className={`${gridClass} relative group overflow-hidden rounded-3xl bg-brand-lime/10 reveal-child flex flex-col justify-center`}>
                {item.image_url && (
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover object-left absolute inset-0 opacity-20" />
                )}
                <div className="absolute top-0 translate-x-1/3 translate-y-1/2 right-0 bg-brand-lime w-full h-full rotate-[30deg] opacity-100"></div>
                <div className="p-8 relative z-10">
                    {item.image_url && (
                        <div className="h-64 md:h-80 w-full mb-6 mx-auto relative">
                            <img src={item.image_url} alt={item.title} className="w-full h-full object-cover rounded-2xl shadow-lg object-[50%_30%]" />
                        </div>
                    )}
                </div>
                <div className="p-8 pt-0 relative z-10">
                    <h3 className="text-2xl font-bold text-[#1F2853] mb-4 font-manrope">{item.title}</h3>
                    {item.description && <p className="text-gray-600 mb-8 text-sm md:text-base font-poppins">{item.description}</p>}
                </div>
            </div>
        );
    }

    if (layout === 'wide_dark') {
        const titleParts = titleHighlight
            ? item.title.split(titleHighlight)
            : [item.title, ''];
        return (
            <div className={`${gridClass} relative group overflow-hidden rounded-[2rem] bg-[#1F2853] reveal-child min-h-[300px] flex items-center`}>
                {item.image_url && (
                    <div className="absolute inset-0 opacity-40 mix-blend-overlay">
                        <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1F2853] via-[#1F2853]/90 to-transparent"></div>
                <div className="relative z-10 p-10 md:p-14 max-w-xl">
                    {item.badge_text && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-brand-lime text-xs font-bold tracking-wider mb-6 uppercase border border-white/20">
                            <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse"></span>
                            {item.badge_text}
                        </div>
                    )}
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-manrope leading-tight">
                        {titleHighlight ? (
                            <>
                                {titleParts[0]}<br />
                                <span className="text-brand-lime">{titleHighlight}</span>
                                {titleParts[1]}
                            </>
                        ) : (
                            item.title
                        )}
                    </h3>
                    {item.description && (
                        <p className="text-gray-300 text-base font-poppins mb-8 max-w-sm">{item.description}</p>
                    )}
                </div>
            </div>
        );
    }

    if (layout === 'horizontal') {
        return (
            <div className={`${gridClass} relative group overflow-hidden rounded-3xl bg-gray-50 reveal-child min-h-[300px] flex flex-col-reverse md:flex-row`}>
                <div className="p-8 flex flex-col justify-center md:w-1/2 relative z-10">
                    <h3 className="text-2xl font-bold text-[#1F2853] mb-4 font-manrope">{item.title}</h3>
                    {item.description && <p className="text-gray-600 mb-6 text-sm font-poppins">{item.description}</p>}
                </div>
                {item.image_url && (
                    <div className="md:w-1/2 relative min-h-[200px] md:min-h-full">
                        <img src={item.image_url} alt={item.title} className="absolute inset-0 w-full h-full object-cover object-center" />
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent to-gray-50 opacity-100"></div>
                    </div>
                )}
            </div>
        );
    }

    // small (default)
    return (
        <div className={`${gridClass} relative group overflow-hidden rounded-3xl bg-brand-dark/5 border border-gray-100 shadow-sm p-8 flex flex-col justify-center reveal-child min-h-[250px]`}>
            {item.icon && (
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:bg-[#1F2853] group-hover:text-white transition-all duration-300">
                    <i className={`${item.icon} text-2xl`}></i>
                </div>
            )}
            <h3 className="text-xl font-bold text-[#1F2853] mb-2 font-manrope">{item.title}</h3>
            {item.description && <p className="text-gray-500 text-sm font-poppins">{item.description}</p>}
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[#B9ED2A]/20 to-transparent rounded-tl-3xl"></div>
        </div>
    );
}

const ServicesBentoGrid = () => {
    const { data: section } = useQuery({
        queryKey: ['page-section', 'services', 'bento'],
        queryFn: () => siteContentApi.section('services', 'bento'),
    });

    const { data: cards = [] } = useQuery({
        queryKey: ['services-items', 'bento'],
        queryFn: () => servicesApi.items('bento'),
    });

    const c = section?.content as Record<string, string> | undefined;
    const titleLine2 = c?.title_line2 ?? 'The Web App Pro';
    const titleMain = section?.title?.replace(titleLine2, '').trim() ?? 'Why innovators choose';

    return (
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 reveal-fade-up">
                    {section?.subtitle && (
                        <span className="inline-block py-1 px-3 rounded-full bg-brand-lime text-[#1F2853] text-xs font-bold tracking-wider mb-6 uppercase">
                            {section.subtitle}
                        </span>
                    )}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#1F2853] mb-6 tracking-tight font-manrope">
                        {titleMain} <br /> {titleLine2}
                    </h1>
                    {section?.description && (
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-poppins">{section.description}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)] reveal-stagger">
                    {cards.map(item => (
                        <BentoCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesBentoGrid;
