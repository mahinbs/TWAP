import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import { siteContentApi } from '../../lib/api';
import type { ExpertReview } from '../../lib/api';
import RichHtml from '../ui/RichHtml';

function ReviewCard({ review }: { review: ExpertReview }) {
  const inner = (
    <div className="bg-[#f7f5ef] p-8 min-h-[320px] flex flex-col justify-center group-hover:bg-[#f0ede5] transition-colors">
      {review.badge_text && (
        <div className="inline-block bg-[#1F2853] text-white px-4 py-2 rounded-md text-sm font-medium mb-6 w-fit">
          {review.badge_text}
        </div>
      )}
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0">
          {review.avatar_url
            ? <img src={review.avatar_url} alt={review.name} className="w-full h-full object-cover" />
            : <div className="w-full h-full bg-[#1F2853] flex items-center justify-center text-white font-bold text-xl">{review.name?.[0]}</div>
          }
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-[#1F2853] mb-0.5 group-hover:text-[#f25a1a] transition-colors">{review.name}</h3>
          <p className="text-sm text-gray-600 mb-1">{review.role}</p>
          {review.topic && (
            <p className="text-sm text-[#f25a1a] font-medium mb-3">Reviewing: {review.topic}</p>
          )}
          <RichHtml html={review.quote} className="text-gray-700 text-sm leading-relaxed italic" />
          {review.slug && (
            <p className="mt-3 text-xs font-semibold text-[#f25a1a] flex items-center gap-1">
              Read full review <i className="ri-arrow-right-line" />
            </p>
          )}
        </div>
      </div>
    </div>
  );

  if (review.slug) {
    return (
      <Link to={`/expert-reviews/${review.slug}`} className="block group rounded-2xl overflow-hidden">
        {inner}
      </Link>
    );
  }
  return inner;
}

export default function ExpertVerdict() {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  const { data: section } = useQuery({
    queryKey: ['page-section', 'home', 'expert_verdict'],
    queryFn: () => siteContentApi.section('home', 'expert_verdict'),
  });

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['expert-reviews'],
    queryFn: siteContentApi.expertReviews,
  });

  const title = section?.title ?? 'Our Verdict: We Test AI Tools';
  const description = section?.description ?? 'Our expert team rigorously tests every AI tool to provide you with honest, unbiased reviews that help you make informed decisions.';

  if (!isLoading && reviews.length === 0) return null;

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1F2853] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
              {title}
            </h2>
            <p className="text-lg text-gray-600 mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {description}
            </p>
          </div>

          <div className="relative">
            {isLoading ? (
              <div className="bg-[#f7f5ef] rounded-2xl p-8 h-[320px] animate-pulse" />
            ) : (
              <>
                <Swiper
                  modules={[Autoplay, Navigation]}
                  spaceBetween={30}
                  slidesPerView={1}
                  loop={reviews.length > 1}
                  autoplay={{ delay: 4000, disableOnInteraction: false }}
                  navigation={{ prevEl, nextEl }}
                  className="rounded-2xl shadow-xl"
                >
                  {reviews.map((review) => (
                    <SwiperSlide key={review.id}>
                      <ReviewCard review={review} />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <button ref={node => setPrevEl(node)}
                  className="absolute top-1/2 -left-5 z-10 -translate-y-1/2 bg-white text-[#1F2853] p-3 rounded-full shadow-lg hover:bg-[#f25a1a] hover:text-white transition-all disabled:opacity-50">
                  <ChevronLeft size={24} />
                </button>
                <button ref={node => setNextEl(node)}
                  className="absolute top-1/2 -right-5 z-10 -translate-y-1/2 bg-white text-[#1F2853] p-3 rounded-full shadow-lg hover:bg-[#f25a1a] hover:text-white transition-all disabled:opacity-50">
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
