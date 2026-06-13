import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi } from '../../lib/api';
import type { Testimonial } from '../../lib/api';

const FALLBACK_TITLE = 'What Our Clients Say About Us';
const FALLBACK_DESC  = 'Real results from founders who trusted us with their app submissions and automation needs';
const FALLBACK_AVATAR = 'https://readdy.ai/api/search-image?query=Professional%20portrait%20headshot%2C%20confident%20business%20expression%2C%20clean%20corporate%20photography%2C%20warm%20smile%2C%20professional%20attire&width=200&height=200&seq=fallback-avatar&orientation=squarish';

interface TestimonialsSectionProps { page?: string }

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, index) => (
    <div key={index} className="w-4 h-4 flex items-center justify-center">
      <i className={`ri-star-${index < rating ? 'fill' : 'line'} text-yellow-400`}></i>
    </div>
  ));
}

export default function TestimonialsSection({ page = 'home' }: TestimonialsSectionProps) {
  const { data: section } = useQuery({
    queryKey: ['page-section', page, 'testimonials'],
    queryFn: () => siteContentApi.section(page, 'testimonials'),
  });

  const { data: testimonials = [] } = useQuery({
    queryKey: ['testimonials'],
    queryFn: siteContentApi.testimonials,
  });

  if (testimonials.length === 0) return null;

  const c = (section?.content ?? {}) as Record<string, string>;
  const title = section?.title ?? FALLBACK_TITLE;
  const description = section?.description ?? FALLBACK_DESC;
  const ctaTitle = c.cta_title ?? 'Ready to Join Our Success Stories?';
  const ctaDesc  = c.cta_description ?? 'Let us help you achieve similar results with your app or automation project';
  const cta1Text = section?.cta_text ?? 'Submit Your App';
  const cta1Url  = section?.cta_url ?? '/promote';
  const cta2Text = section?.cta_text_2 ?? 'Get Automation Quote';
  const cta2Url  = section?.cta_url_2 ?? '/services';

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2853] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {(testimonials as Testimonial[]).slice(0, 6).map((t) => {
            const extras = (t as Testimonial & { outcome?: string; service_type?: string; company_logo_url?: string }).outcome
              ? t as Testimonial & { outcome?: string; service_type?: string; company_logo_url?: string }
              : t as Testimonial;
            const outcome = (extras as { outcome?: string }).outcome ?? '';
            const serviceType = (extras as { service_type?: string }).service_type ?? 'App Submission';
            const companyLogo = (extras as { company_logo_url?: string }).company_logo_url;
            return (
              <div key={t.id} className="bg-gradient-to-br from-[#f7f5ef] to-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="p-8">
                  {/* Service Type Badge */}
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-[#f25a1a] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {serviceType}
                    </span>
                    <div className="flex space-x-1">
                      {renderStars(t.rating ?? 5)}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <div className="mb-6">
                    <div className="w-8 h-8 flex items-center justify-center text-[#f25a1a] mb-4">
                      <i className="ri-double-quotes-l text-2xl"></i>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {t.quote}
                    </p>
                  </div>

                  {/* Outcome */}
                  {outcome && (
                    <div className="bg-white/80 rounded-lg p-4 mb-6 border border-[#f25a1a]/20">
                      <h4 className="text-sm font-semibold text-[#1F2853] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Key Results:
                      </h4>
                      <p className="text-[#f25a1a] font-medium text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {outcome}
                      </p>
                    </div>
                  )}

                  {/* Client Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#f25a1a] mr-4">
                        <img
                          src={t.avatar_url ?? FALLBACK_AVATAR}
                          alt={t.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-[#1F2853] font-bold text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                          {t.name}
                        </h3>
                        <p className="text-gray-600 text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {t.role}
                        </p>
                      </div>
                    </div>

                    {/* Company Logo */}
                    {companyLogo && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                        <img
                          src={companyLogo}
                          alt={`${t.company} logo`}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                    )}
                  </div>

                  {/* Company Name */}
                  {t.company && (
                    <div className="mt-3 text-center">
                      <span className="text-gray-500 text-xs font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {t.company}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-[#1F2853] to-[#2a3a6b] rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              {ctaTitle}
            </h3>
            <p className="text-lg mb-6 opacity-90" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {ctaDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={cta1Url}
                className="bg-[#f25a1a] hover:bg-[#d14815] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap text-center"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {cta1Text}
              </Link>
              <Link
                to={cta2Url}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap text-center"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {cta2Text}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
