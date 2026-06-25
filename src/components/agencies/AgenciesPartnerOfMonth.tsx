import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { agenciesApi, siteContentApi } from '../../lib/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const APOM_FALLBACK = {
    badge: 'Spotlight',
    title: 'Partner of The Month',
};

const MAX_PARTNERS = 5;

export default function AgenciesPartnerOfMonth() {
    const { data: section } = useQuery({
        queryKey: ['page-section', 'agencies', 'partner_of_month'],
        queryFn: () => siteContentApi.section('agencies', 'partner_of_month'),
    });
    const { data: featuredAgencies = [] } = useQuery({
        queryKey: ['agencies', 'partner-of-month', MAX_PARTNERS],
        queryFn: () => agenciesApi.featured(MAX_PARTNERS),
    });

    const sBadge = section?.badge_text ?? APOM_FALLBACK.badge;
    const sTitle = section?.title      ?? APOM_FALLBACK.title;

    const partners = featuredAgencies.length > 0
        ? featuredAgencies
        : [{
            id: 'fallback',
            slug: '',
            name: 'Crebos International',
            tagline: 'UX/UI | AI Agents & Web/App Development',
            category: '',
            description: "We're Crebos International, a strategy-led custom software and design partner. We help ambitious companies design, build, and scale digital products that define categories.",
            avatar_url: '',
            website_url: '',
            verified: false,
        } as any];

    return (
        <section className="pb-16 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#f25a1a]/10 border border-[#f25a1a]/20 text-sm font-bold text-[#f25a1a] mb-4 uppercase tracking-wider">
                        {sBadge}
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1B20]">{sTitle}</h2>
                </div>

                <div className="relative">
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#f25a1a]/20 rounded-full blur-3xl -z-10"></div>
                    <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#f25a1a]/10 rounded-full blur-3xl -z-10"></div>

                    <Swiper
                        modules={[Navigation, Autoplay]}
                        slidesPerView={1}
                        spaceBetween={24}
                        navigation={partners.length > 1}
                        autoplay={partners.length > 1 ? { delay: 6000, disableOnInteraction: false } : false}
                        loop={partners.length > 1}
                        className="partner-swiper"
                    >
                        {partners.map((partner: any) => {
                            const profileLink = partner.slug ? `/agencies/${partner.slug}` : '/agencies/profile';
                            return (
                                <SwiperSlide key={partner.id ?? partner.slug}>
                                    <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-2 md:p-4 border border-white/50 shadow-2xl shadow-orange-500/5 flex flex-col lg:flex-row overflow-hidden relative z-10">
                                        <div className="flex-1 p-6 md:p-10">
                                            <div className="flex flex-col md:flex-row gap-6 items-start mb-6">
                                                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#1A1B20] to-black flex items-center justify-center flex-shrink-0 shadow-lg shadow-gray-200 overflow-hidden">
                                                    {partner.avatar_url ? (
                                                        <img src={partner.avatar_url} alt={partner.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="text-white font-bold text-xs">{partner.name?.slice(0, 6)}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                        <h3 className="text-2xl font-bold text-[#1A1B20]">{partner.name}</h3>
                                                        {partner.verified && <i className="ri-checkbox-circle-fill text-[#f25a1a] text-xl"></i>}
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                                        {partner.tagline ?? partner.category ?? ''}
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                                                {partner.description ?? partner.tagline ?? ''}
                                            </p>

                                            <div className="flex flex-wrap gap-4 items-center mb-8">
                                                {partner.category && (
                                                    <span className="px-4 py-2 rounded-lg bg-white/50 text-gray-600 text-sm font-medium border border-gray-100 backdrop-blur-sm">
                                                        {partner.category}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex flex-wrap gap-4">
                                                <Link to={profileLink} className="px-8 py-3 rounded-xl border border-[#f25a1a]/30 text-[#f25a1a] font-bold hover:bg-[#f25a1a] hover:text-white transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:shadow-orange-500/20 bg-white/50 backdrop-blur-sm">
                                                    <i className="ri-user-smile-line"></i>
                                                    View Profile
                                                </Link>
                                                {partner.website_url ? (
                                                    <a href={partner.website_url} target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#f25a1a] to-[#d14815] text-white font-bold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 flex items-center gap-2">
                                                        <i className="ri-global-line"></i>
                                                        Visit Website
                                                    </a>
                                                ) : (
                                                    <Link to={profileLink} className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#f25a1a] to-[#d14815] text-white font-bold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 flex items-center gap-2">
                                                        <i className="ri-global-line"></i>
                                                        Visit Website
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
