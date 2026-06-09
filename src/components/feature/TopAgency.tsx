import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Star, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { agenciesApi, siteContentApi } from '../../lib/api';
import type { Agency } from '../../lib/api';

export default function TopAgency() {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);

  const { data: section } = useQuery({
    queryKey: ['page-section', 'home', 'top_agency'],
    queryFn: () => siteContentApi.section('home', 'top_agency'),
  });

  const { data: agencies = [], isLoading } = useQuery({
    queryKey: ['agencies', 'top'],
    queryFn: () => agenciesApi.list({ limit: 8 }),
  });

  if (isLoading) return (
    <section className="py-20 bg-[#1F2853]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          {[...Array(3)].map((_, i) => <div key={i} className="min-w-[350px] h-72 bg-white/10 rounded-3xl animate-pulse" />)}
        </div>
      </div>
    </section>
  );

  if ((agencies as Agency[]).length === 0) return null;

  return (
    <section className="py-20 bg-[#1F2853] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            {section?.subtitle && (
              <p className="text-[#f25a1a] text-sm font-semibold uppercase tracking-wider mb-2">{section.subtitle}</p>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-white font-['Manrope']">
              {section?.title ?? 'Top Digital Agencies'}
            </h2>
            {section?.description && <p className="text-white/50 mt-2">{section.description}</p>}
          </div>
          <div className="flex gap-2">
            <button onClick={() => swiperRef?.slidePrev()}
              className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => swiperRef?.slideNext()}
              className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView="auto"
          onSwiper={setSwiperRef}
        >
          {(agencies as Agency[]).map(agency => (
            <SwiperSlide key={agency.id} className="!w-[320px]">
              <Link to={`/agencies/${agency.slug}`}
                className="block bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl p-6 transition-all duration-300 group h-full">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 overflow-hidden flex items-center justify-center border border-white/20 shrink-0">
                    {agency.avatar_url
                      ? <img src={agency.avatar_url} alt={agency.name} className="w-full h-full object-cover" />
                      : <span className="text-2xl font-bold text-white">{agency.name[0]}</span>
                    }
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-white truncate group-hover:text-[#f25a1a] transition-colors">{agency.name}</h3>
                      {agency.verified && <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />}
                    </div>
                    {agency.category && <p className="text-xs text-white/40 truncate">{agency.category}</p>}
                  </div>
                </div>

                {agency.tagline ? (
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-3 mb-5">{agency.tagline}</p>
                ) : agency.description ? (
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-3 mb-5">{agency.description}</p>
                ) : null}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(agency.rating ?? 0) ? 'fill-amber-400 text-amber-400' : 'text-white/20'}`} />
                    ))}
                    <span className="text-xs text-white/50 ml-1">{agency.rating?.toFixed(1)}</span>
                  </div>
                  {agency.years_experience ? (
                    <span className="text-xs text-white/40">{agency.years_experience}y exp</span>
                  ) : null}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-10">
          <Link to={section?.cta_url ?? '/agencies'} className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#1F2853] transition-colors">
            {section?.cta_text ?? 'Browse All Agencies'} <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </div>
    </section>
  );
}
