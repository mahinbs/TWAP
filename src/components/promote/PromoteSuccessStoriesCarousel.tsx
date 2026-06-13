import { useKeenSlider } from 'keen-slider/react';
import { useState } from 'react';
import 'keen-slider/keen-slider.min.css';

type SuccessMetric = {
  value: string;
  label: string;
};

type SuccessSlide = {
  appName: string;
  appType: string;
  quote: string;
  metrics: SuccessMetric[];
  mockBg: string;
  mockCard: string;
  icon: string;
};

export type PromoteSuccessStoriesCarouselProps = {
  accentColor: string;
  eyebrow: string;
  headingHtml: string;
  introText: string;
  slides: SuccessSlide[];
};

export default function PromoteSuccessStoriesCarousel({
  accentColor,
  eyebrow,
  headingHtml,
  introText,
  slides,
}: PromoteSuccessStoriesCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    renderMode: 'performance',
    slides: { perView: 1, spacing: 16 },
  });

  return (
    <section className="bg-[#f2f2f1] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase" style={{ color: accentColor }}>
            {eyebrow}
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-black leading-tight text-[#111111]">
            <span dangerouslySetInnerHTML={{ __html: headingHtml }} />
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-[#666666] text-sm sm:text-base leading-relaxed">{introText}</p>
        </div>

        <div ref={sliderRef} className="keen-slider">
          {slides.map((slide) => (
            <div key={slide.appName} className="keen-slider__slide">
              <article className="rounded-3xl border border-[#e5e5e5] bg-[#f7f7f6] overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 sm:p-10 flex items-center justify-center" style={{ backgroundColor: slide.mockBg }}>
                  <div className="w-full max-w-md rounded-2xl p-5 sm:p-6 shadow-[0_20px_40px_rgba(0,0,0,0.18)]" style={{ backgroundColor: slide.mockCard }}>
                    <div className="h-4 rounded-full bg-white/20 w-3/4 mb-4"></div>
                    <div className="space-y-3 mb-5">
                      <div className="h-2.5 rounded bg-white/15 w-11/12"></div>
                      <div className="h-2.5 rounded bg-white/15 w-9/12"></div>
                      <div className="h-2.5 rounded bg-white/15 w-10/12"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="h-16 rounded-xl bg-white/10"></div>
                      <div className="h-16 rounded-xl bg-white/10"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2.5 rounded bg-white/15 w-4/5"></div>
                      <div className="h-2.5 rounded bg-white/15 w-3/5"></div>
                    </div>
                  </div>
                </div>

                <div className="p-8 sm:p-10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm" style={{ backgroundColor: `${accentColor}1A`, color: accentColor }}>
                      <i className={slide.icon}></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-[#111111]">{slide.appName}</h3>
                      <p className="text-sm text-[#777]">{slide.appType}</p>
                    </div>
                  </div>

                  <p className="mt-6 text-[#555] italic leading-relaxed">{slide.quote}</p>

                  <div className="mt-6">
                    <p className="text-xs font-bold tracking-wide text-[#111] uppercase">results</p>
                    <div className="mt-3 space-y-4">
                      {slide.metrics.map((metric) => (
                        <div key={metric.value + metric.label}>
                          <p className="text-3xl font-black leading-none" style={{ color: accentColor }}>
                            {metric.value}
                          </p>
                          <p className="text-sm text-[#666] mt-1">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className="w-3 h-1.5 rounded-full transition-colors"
              style={{ backgroundColor: currentSlide === idx ? accentColor : '#ddd' }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
