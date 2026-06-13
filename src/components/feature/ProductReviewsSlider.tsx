import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';

const reviews = [
    {
        id: 1,
        name: "Perchance",
        category: "Artificial Intelligence",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=100&q=80" // Robot/AI
    },
    {
        id: 2,
        name: "ServiceChannel",
        category: "Business",
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&w=100&q=80" // Office/Business
    },
    {
        id: 3,
        name: "myBillBook",
        category: "Finance",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=100&q=80" // Money/Finance
    },
    {
        id: 4,
        name: "Talbica",
        category: "Education",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=100&q=80" // Education/Pencil
    },
];

export default function ProductReviewsSlider() {
    const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

    return (
        <section className="py-16 bg-[#fffbf5]"> {/* Creamy background as per image */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-3xl font-bold text-black font-['Manrope']">
                        Product Review
                    </h2>
                    <a href="#" className="text-[#f25a1a] font-bold hover:underline flex items-center gap-1 text-sm md:text-base">
                        Explore More Products Review <i className="ri-arrow-right-up-line"></i>
                    </a>
                </div>

                <div className="relative group">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={24}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        navigation={{
                            prevEl,
                            nextEl,
                        }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                        className="!pb-12"
                    >
                        {reviews.concat(reviews).map((review, index) => (
                            <SwiperSlide key={`${review.id}-${index}`}>
                                <div className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <img
                                        src={review.image}
                                        alt={review.name}
                                        className="w-16 h-16 rounded-xl object-cover bg-gray-50"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-gray-100 text-gray-500 mb-1 border border-gray-200">
                                            {review.category}
                                        </span>
                                        <h3 className="font-bold text-gray-900 text-lg truncate font-['Manrope'] mb-1">
                                            {review.name}
                                        </h3>
                                        <div className="flex items-center gap-1">
                                            <div className="flex text-yellow-400 text-xs">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={12}
                                                        fill={i < Math.floor(review.rating) ? "currentColor" : "none"}
                                                        strokeWidth={3}
                                                        className={i < Math.floor(review.rating) ? "" : "text-gray-300"}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-xs font-bold text-gray-600 mt-0.5">{review.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <button
                        ref={setPrevEl}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:text-[#f25a1a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-100"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={20} strokeWidth={2.5} />
                    </button>
                    <button
                        ref={setNextEl}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:text-[#f25a1a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-100"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={20} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </section>
    );
}
