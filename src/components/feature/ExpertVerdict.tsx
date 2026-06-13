import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';

const reviews = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Lead Product Reviewer",
    topic: "ChatGPT Plus",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    text: "ChatGPT Plus delivers exceptional performance with faster response times and priority access. The advanced reasoning capabilities make it worth the subscription for professionals who rely on AI for complex tasks."
  },
  {
    id: 2,
    name: "David Chen",
    role: "AI Ethics Researcher",
    topic: "Claude 3 Opus",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    text: "Claude 3 Opus demonstrates remarkable nuance and safety awareness. Its ability to handle large context windows while maintaining coherence sets a new standard for long-form content generation and analysis."
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Tech Journalist",
    topic: "Midjourney v6",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    text: "The photorealism in Midjourney v6 is simply breathtaking. It has effectively bridged the gap between AI generation and professional photography, offering creators unprecedented visual control."
  }
];

export default function ExpertVerdict() {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1F2853] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Our Verdict: We Test AI Tools
            </h2>

            <p className="text-lg text-gray-600 mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Our expert team rigorously tests every AI tool to provide you with honest,
              unbiased reviews that help you make informed decisions.
            </p>
          </div>

          {/* Right Content - Carousel */}
          <div className="relative">
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={30}
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
              className="rounded-2xl shadow-xl"
            >
              {reviews.map((review) => (
                <SwiperSlide key={review.id}>
                  <div className="bg-[#f7f5ef] p-8 h-full min-h-[320px] flex flex-col justify-center">
                    <div className="inline-block bg-[#1F2853] text-white px-4 py-2 rounded-md text-sm font-medium mb-6 w-fit">
                      Editor's Pick
                    </div>

                    <div className="flex items-start gap-4">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-[#1F2853] mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                          {review.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {review.role}
                        </p>
                        <p className="text-sm text-[#f25a1a] font-medium mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Reviewing: {review.topic}
                        </p>
                        <p className="text-gray-700 text-sm leading-relaxed italic" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          "{review.text}"
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button
              ref={(node) => setPrevEl(node)}
              className="absolute top-1/2 -left-5 z-10 -translate-y-1/2 bg-white text-[#1F2853] p-3 rounded-full shadow-lg hover:bg-[#f25a1a] hover:text-white transition-all duration-300 disabled:opacity-50"
              aria-label="Previous review"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              ref={(node) => setNextEl(node)}
              className="absolute top-1/2 -right-5 z-10 -translate-y-1/2 bg-white text-[#1F2853] p-3 rounded-full shadow-lg hover:bg-[#f25a1a] hover:text-white transition-all duration-300 disabled:opacity-50"
              aria-label="Next review"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
