import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  testimonial: string;
  outcome: string;
  avatar: string;
  companyLogo: string;
  rating: number;
  serviceType: 'App Submission' | 'Automation Services' | 'Reviews';
}

const AvatarWithFallback = ({ src, name, borderClass }: { src: string, name: string, borderClass: string }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className={`w-12 h-12 rounded-full border-2 ${borderClass} mr-4 shrink-0 flex items-center justify-center bg-gray-100 text-[#1F2853] font-bold text-lg`} style={{ fontFamily: 'Manrope, sans-serif' }}>
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <div className={`w-12 h-12 rounded-full overflow-hidden border-2 ${borderClass} mr-4 shrink-0`}>
      <img
        src={src}
        alt={name}
        className="w-full h-full object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  );
};

const CompanyLogoWithFallback = ({ src, companyName }: { src: string, companyName: string }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className="w-16 h-16 rounded-lg overflow-hidden bg-white shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
        <span className="text-[#1F2853] font-bold text-xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
          {companyName.charAt(0)}
        </span>
      </div>
    );
  }

  return (
    <div className="w-16 h-16 rounded-lg overflow-hidden bg-white shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
      <img
        src={src}
        alt={`${companyName} logo`}
        className="w-12 h-12 object-contain"
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default function TestimonialsSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  // Color mapping based on service type
  const getServiceColors = (serviceType: string) => {
    switch (serviceType) {
      case 'Automation Services':
        return {
          badge: 'bg-green-500',
          badgeText: 'text-white',
          quotes: 'text-green-500',
          resultsBg: 'bg-green-50',
          resultsBorder: 'border-green-200',
          resultsText: 'text-green-700',
          avatarBorder: 'border-green-500'
        };
      case 'Reviews':
        return {
          badge: 'bg-[#ffcee0]',
          badgeText: 'text-[#1F2853]',
          quotes: 'text-pink-500',
          resultsBg: 'bg-[#ffcee0]/20',
          resultsBorder: 'border-pink-300',
          resultsText: 'text-pink-600',
          avatarBorder: 'border-pink-400'
        };
      case 'App Submission':
      default:
        return {
          badge: 'bg-[#f25a1a]',
          badgeText: 'text-white',
          quotes: 'text-[#f25a1a]',
          resultsBg: 'bg-orange-50',
          resultsBorder: 'border-orange-200',
          resultsText: 'text-[#f25a1a]',
          avatarBorder: 'border-orange-200'
        };
    }
  };

  // Duplicate testimonials to ensure smooth infinite loop
  const [testimonials] = useState<Testimonial[]>([
    {
      id: 1,
      name: "Alex Thompson",
      title: "Founder & CEO",
      company: "TaskFlow Pro",
      testimonial: "The app submission process was seamless. Within 2 weeks, TaskFlow Pro was featured on multiple platforms and our downloads increased by 300%. The team's expertise in app store optimization is unmatched.",
      outcome: "300% increase in downloads, Featured placement",
      avatar: "https://readdy.ai/api/search-image?query=Professional%20male%20founder%20headshot%2C%20confident%20tech%20entrepreneur%2C%20modern%20startup%20office%20background%2C%20business%20casual%20attire%2C%20warm%20smile%2C%20clean%20corporate%20portrait%2C%20professional%20lighting%2C%20innovative%20leader&width=200&height=200&seq=testimonial-alex&orientation=squarish",
      companyLogo: "https://readdy.ai/api/search-image?query=Modern%20tech%20company%20logo%20design%20for%20TaskFlow%20Pro%2C%20minimalist%20productivity%20app%20logo%2C%20clean%20geometric%20design%2C%20blue%20and%20orange%20color%20scheme%2C%20professional%20brand%20identity%2C%20simple%20icon%20style&width=120&height=120&seq=logo-taskflow&orientation=squarish",
      rating: 5,
      serviceType: 'App Submission'
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      title: "Operations Director",
      company: "GreenTech Solutions",
      testimonial: "Their AI automation transformed our customer service completely. Response times dropped from hours to minutes, and customer satisfaction scores improved by 45%. The ROI was evident within the first month.",
      outcome: "45% improvement in satisfaction, 80% faster response",
      avatar: "https://readdy.ai/api/search-image?query=Professional%20Hispanic%20female%20executive%20headshot%2C%20confident%20business%20leader%2C%20modern%20corporate%20office%20background%2C%20professional%20attire%2C%20warm%20expression%2C%20clean%20corporate%20photography%2C%20innovative%20director&width=200&height=200&seq=testimonial-maria&orientation=squarish",
      companyLogo: "https://readdy.ai/api/search-image?query=Green%20technology%20company%20logo%20design%20for%20GreenTech%20Solutions%2C%20eco-friendly%20business%20logo%2C%20leaf%20and%20tech%20elements%2C%20green%20and%20blue%20color%20scheme%2C%20professional%20environmental%20brand%2C%20clean%20modern%20design&width=120&height=120&seq=logo-greentech&orientation=squarish",
      rating: 5,
      serviceType: 'Automation Services'
    },
    {
      id: 3,
      name: "David Park",
      title: "Co-founder",
      company: "FinanceAI",
      testimonial: "From concept to app store success in record time. Their submission strategy got FinanceAI into the top 10 finance apps within 3 months. The ongoing support and optimization recommendations have been invaluable.",
      outcome: "Top 10 ranking, 500K+ downloads in 3 months",
      avatar: "https://readdy.ai/api/search-image?query=Professional%20Asian%20male%20co-founder%20headshot%2C%20tech%20entrepreneur%20portrait%2C%20modern%20fintech%20office%20environment%2C%20confident%20expression%2C%20business%20casual%20shirt%2C%20clean%20corporate%20photography%2C%20innovative%20startup%20leader&width=200&height=200&seq=testimonial-david&orientation=squarish",
      companyLogo: "https://readdy.ai/api/search-image?query=Modern%20fintech%20company%20logo%20design%20for%20FinanceAI%2C%20financial%20technology%20logo%2C%20AI%20and%20money%20elements%2C%20blue%20and%20gold%20color%20scheme%2C%20professional%20finance%20brand%2C%20clean%20sophisticated%20design&width=120&height=120&seq=logo-financeai&orientation=squarish",
      rating: 5,
      serviceType: 'App Submission'
    },
  ]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <div key={index} className="w-4 h-4 flex items-center justify-center">
        <i className={`ri-star-${index < rating ? 'fill' : 'line'} text-yellow-400`}></i>
      </div>
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2853] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            What Our Clients Say About Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Real results from founders who trusted us with their app submissions and automation needs
          </p>
        </div>

        <div className="relative px-4">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            className="pb-12"
          >
            {testimonials.concat(testimonials).map((testimonial) => {
              const colors = getServiceColors(testimonial.serviceType);
              return (
                <SwiperSlide key={testimonial.id} className="pb-2 h-auto">
                  <div className="bg-gradient-to-br from-[#f7f5ef] to-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 h-full flex flex-col min-h-[630px]">
                    <div className="p-8 flex flex-col h-full">
                      {/* Service Type Badge */}
                      <div className="flex justify-between items-start mb-6">
                        <span className={`${colors.badge} ${colors.badgeText} px-3 py-1 rounded-full text-sm font-medium`}>
                          {testimonial.serviceType}
                        </span>
                        <div className="flex space-x-1">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>

                      {/* Testimonial Text */}
                      <div className="mb-6 flex-grow">
                        <div className={`w-8 h-8 flex items-center justify-center ${colors.quotes} mb-4`}>
                          <i className="ri-double-quotes-l text-2xl"></i>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          "{testimonial.testimonial}"
                        </p>
                      </div>

                      {/* Outcome */}
                      <div className={`${colors.resultsBg} rounded-lg p-4 mb-6 border ${colors.resultsBorder}`}>
                        <h4 className="text-sm font-semibold text-[#1F2853] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                          Key Results:
                        </h4>
                        <p className={`${colors.resultsText} font-medium text-sm`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {testimonial.outcome}
                        </p>
                      </div>

                      {/* Client Info */}
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                        <div className="flex items-center">
                          <AvatarWithFallback
                            src={testimonial.avatar}
                            name={testimonial.name}
                            borderClass={colors.avatarBorder}
                          />
                          <div>
                            <h3 className="text-[#1F2853] font-bold text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                              {testimonial.name}
                            </h3>
                            <p className="text-gray-600 text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                              {testimonial.title}
                            </p>
                          </div>
                        </div>

                        {/* Company Logo */}
                        <CompanyLogoWithFallback src={testimonial.companyLogo} companyName={testimonial.company} />
                      </div>

                      {/* Company Name */}
                      <div className="mt-3 text-center">
                        <span className="text-gray-500 text-xs font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {testimonial.company}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              className="swiper-button-prev-custom w-12 h-12 rounded-full border border-gray-200 bg-white text-[#1F2853] hover:bg-[#1F2853] hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-md active:scale-95 group cursor-pointer z-10"
              aria-label="Previous testimonial"
            >
              <i className="ri-arrow-left-line text-xl group-hover:scale-110 transition-transform"></i>
            </button>
            <button
              className="swiper-button-next-custom w-12 h-12 rounded-full border border-gray-200 bg-white text-[#1F2853] hover:bg-[#1F2853] hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-md active:scale-95 group cursor-pointer z-10"
              aria-label="Next testimonial"
            >
              <i className="ri-arrow-right-line text-xl group-hover:scale-110 transition-transform"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}