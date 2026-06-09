import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import { appsApi, siteContentApi } from '../../lib/api';
import type { App } from '../../lib/api';

export default function ProductReviewsSlider() {
    const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

    const { data: section } = useQuery({
        queryKey: ['page-section', 'tools', 'product_review'],
        queryFn: () => siteContentApi.section('tools', 'product_review'),
    });

    const { data: apps = [] } = useQuery({
        queryKey: ['apps', 'product-review-slider'],
        queryFn: () => appsApi.list({ sort: 'rating', limit: 12 }),
    });

    const reviews = (apps as App[]).map(a => ({
        id: a.id,
        slug: a.slug,
        name: a.name,
        category: a.category ?? '',
        rating: a.rating ?? 0,
        image: a.logo_url ?? '',
    }));

    if (reviews.length === 0) return null;

    return (
        <section className="py-16 bg-[#fffbf5]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-3xl font-bold text-black font-['Manrope']">
                        {section?.title ?? 'Product Review'}
                    </h2>
                    <Link to={section?.cta_url ?? '/directory'} className="text-[#f25a1a] font-bold hover:underline flex items-center gap-1 text-sm md:text-base">
                        {section?.cta_text ?? 'Explore More Products Review'} <i className="ri-arrow-right-up-line" />
                    </Link>
                </div>

                <div className="relative group">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={24}
                        slidesPerView={1}
                        loop={reviews.length > 4}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        navigation={{ prevEl, nextEl }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                        className="!pb-12"
                    >
                        {reviews.map((review) => (
                            <SwiperSlide key={review.id}>
                                <Link to={`/products/${review.slug}`} className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    {review.image ? (
                                        <img src={review.image} alt={review.name} className="w-16 h-16 rounded-xl object-cover bg-gray-50" />
                                    ) : (
                                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1F2853] to-[#f25a1a] flex items-center justify-center text-white font-bold text-xl">{review.name[0]}</div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        {review.category && (
                                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-gray-100 text-gray-500 mb-1 border border-gray-200">
                                                {review.category}
                                            </span>
                                        )}
                                        <h3 className="font-bold text-gray-900 text-lg truncate font-['Manrope'] mb-1">
                                            {review.name}
                                        </h3>
                                        <div className="flex items-center gap-1">
                                            <div className="flex text-yellow-400 text-xs">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={12}
                                                        fill={i < Math.floor(review.rating) ? 'currentColor' : 'none'}
                                                        strokeWidth={3}
                                                        className={i < Math.floor(review.rating) ? '' : 'text-gray-300'}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-xs font-bold text-gray-600 mt-0.5">{review.rating.toFixed(1)}</span>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <button
                        ref={setPrevEl}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:text-[#f25a1a] transition-colors border border-gray-100"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={20} strokeWidth={2.5} />
                    </button>
                    <button
                        ref={setNextEl}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:text-[#f25a1a] transition-colors border border-gray-100"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={20} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </section>
    );
}
