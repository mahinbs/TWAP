import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { siteContentApi } from '../../lib/api';
import type { Testimonial } from '../../lib/api';

export default function TestimonialsSection({ page = 'home' }: { page?: string }) {
  const swiperRef = useRef<SwiperType | null>(null);

  const { data: section } = useQuery({
    queryKey: ['page-section', page, 'testimonials'],
    queryFn: () => siteContentApi.section(page, 'testimonials'),
  });

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: siteContentApi.testimonials,
  });

  if (isLoading) return (
    <section className="py-20 bg-[#1F2853]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          {[...Array(3)].map((_, i) => <div key={i} className="min-w-[320px] h-52 bg-white/10 rounded-3xl animate-pulse" />)}
        </div>
      </div>
    </section>
  );

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-[#1F2853] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            {section?.subtitle && (
              <p className="text-[#c6f135] text-sm font-semibold uppercase tracking-wider mb-2">{section.subtitle}</p>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-white font-['Manrope']">
              {section?.title ?? 'Loved by Teams Worldwide'}
            </h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => swiperRef.current?.slidePrev()}
              className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => swiperRef.current?.slideNext()}
              className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView="auto"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          onSwiper={swiper => { swiperRef.current = swiper; }}
        >
          {(testimonials as Testimonial[]).map(t => (
            <SwiperSlide key={t.id} className="!w-[340px]">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-7 h-full flex flex-col">
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-[#c6f135]/40 mb-4 shrink-0" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < (t.rating ?? 5) ? 'fill-amber-400 text-amber-400' : 'text-white/20'}`} />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-white/70 text-sm leading-relaxed flex-1">"{t.quote}"</p>

                {/* Author */}
                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden shrink-0">
                    {t.avatar_url
                      ? <img src={t.avatar_url} alt={t.name} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm">{t.name[0]}</div>
                    }
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">
                      {[t.role, t.company].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
