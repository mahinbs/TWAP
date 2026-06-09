import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Header from '../../../components/feature/Header';
import Footer from '../../../components/feature/Footer';
import { agenciesApi } from '../../../lib/api';
import { usePageSeoOverride } from '../../../components/seo/SeoContext';

export default function AgencyProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: agency, isLoading } = useQuery({
    queryKey: ['agency', slug],
    queryFn: () => agenciesApi.bySlug(slug!),
    enabled: Boolean(slug),
  });

  usePageSeoOverride(agency ? {
    title: (agency as { meta_title?: string }).meta_title || agency.name,
    description: (agency as { meta_description?: string }).meta_description || agency.tagline,
    image: (agency as { og_image_url?: string }).og_image_url || agency.logo_url,
    noindex: (agency as { noindex?: boolean }).noindex,
  } : undefined);

  if (isLoading) return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      <div className="flex justify-center items-center flex-1">
        <div className="w-10 h-10 border-2 border-gray-200 border-t-[#1F2853] rounded-full animate-spin" />
      </div>
      <Footer />
    </div>
  );

  if (!agency) return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-lg">Agency not found.</p>
        <Link to="/agencies" className="text-[#f25a1a] underline">← Browse Agencies</Link>
      </div>
      <Footer />
    </div>
  );

  const portfolio  = (agency as any).portfolio  ?? [];
  const reviews    = (agency as any).reviews    ?? [];
  const clients    = (agency as any).clients    ?? [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      <main className="flex-grow pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Left — Identity Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-8">
            <div className="rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl min-h-[500px] flex flex-col items-center text-center"
              style={{ background: 'linear-gradient(135deg, #1F2853 0%, #111827 100%)' }}>
              {agency.cover_url && (
                <img src={agency.cover_url} alt="" className="w-full h-full object-cover absolute top-0 left-0 z-0 opacity-20" />
              )}
              <div className="w-28 h-28 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-5 relative z-10 overflow-hidden">
                {agency.avatar_url
                  ? <img src={agency.avatar_url} alt={agency.name} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white">{agency.name[0]}</div>
                }
              </div>
              <h1 className="text-2xl font-bold mb-1 relative z-10">{agency.name}</h1>
              {agency.category && (
                <div className="inline-block bg-white/10 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 relative z-10">
                  #{(agency.category as string).replace(/\s/g, '')}
                </div>
              )}
              {agency.verified && (
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 w-full flex items-center gap-3 mb-6 border border-white/10 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                    <i className="ri-shield-check-fill text-green-400 text-lg" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Verified Agency</p>
                    <p className="text-white/60 text-xs text-left">Identity &amp; Portfolio Vetted</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 w-full gap-6 border-t border-white/10 pt-6 relative z-10">
                <div>
                  <div className="text-3xl font-bold">{agency.rating?.toFixed(1) ?? '—'}</div>
                  <div className="text-xs text-gray-300 uppercase mt-0.5">Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">{agency.years_experience ?? '—'}</div>
                  <div className="text-xs text-gray-300 uppercase mt-0.5">Years Exp</div>
                </div>
              </div>
              {agency.website_url && (
                <a href={agency.website_url} target="_blank" rel="noopener noreferrer"
                  className="w-full mt-6 border border-white/30 hover:bg-white hover:text-[#1F2853] text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all font-medium relative z-10 text-sm">
                  <i className="ri-external-link-line" /> Visit Website
                </a>
              )}
              <button onClick={() => setIsModalOpen(true)}
                className="w-full mt-2 border border-white/20 hover:bg-white hover:text-[#1F2853] text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all font-medium relative z-10 text-sm">
                <i className="ri-download-line" /> Download Profile
              </button>
            </div>
          </div>

          {/* Right — Details */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {agency.description && (
              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm">
                <h2 className="text-xl font-bold text-[#1F2853] mb-4">About {agency.name}</h2>
                <p className="text-gray-600 leading-relaxed">{agency.description}</p>
              </div>
            )}

            {/* Flagship Service */}
            {(agency as any).flagship_service?.title && (
              <div className="bg-[#E0E7FF] rounded-[2.5rem] p-8 relative overflow-hidden">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#1F2853] text-xs font-bold uppercase mb-4">
                  <i className="ri-flashlight-fill text-[#f25a1a]" /> Flagship Service
                </span>
                <h3 className="text-2xl font-bold text-[#1F2853] mb-2">{(agency as any).flagship_service.title}</h3>
                <p className="text-[#1F2853]/70 leading-relaxed">{(agency as any).flagship_service.description}</p>
              </div>
            )}

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Review Count', value: agency.review_count },
                { label: 'Response Time', value: agency.response_time },
                { label: 'Completion Rate', value: agency.project_completion_rate ? `${agency.project_completion_rate}%` : null },
              ].filter(s => s.value).map(stat => (
                <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm text-center border border-gray-100">
                  <div className="text-2xl font-bold text-[#1F2853]">{String(stat.value)}</div>
                  <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio */}
        {portfolio.length > 0 && (
          <section className="relative mt-24 mb-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex items-end justify-between">
              <div>
                <h2 className="text-4xl font-bold text-[#1F2853]">Featured Works</h2>
                <p className="text-gray-500 mt-1">Highlights from recent collaborations</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => swiperInstance?.slidePrev()} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1F2853] hover:text-white hover:border-[#1F2853] transition-colors">
                  <i className="ri-arrow-left-line text-xl" />
                </button>
                <button onClick={() => swiperInstance?.slideNext()} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1F2853] hover:text-white hover:border-[#1F2853] transition-colors">
                  <i className="ri-arrow-right-line text-xl" />
                </button>
              </div>
            </div>
            <Swiper modules={[Autoplay, Navigation]} spaceBetween={32} slidesPerView="auto" centeredSlides loop autoplay={{ delay: 4000 }} onSwiper={setSwiperInstance} className="!overflow-visible px-4">
              {portfolio.map((item: any, i: number) => (
                <SwiperSlide key={i} className="!w-[80vw] !max-w-[700px]">
                  <div className="relative h-[400px] rounded-[2.5rem] overflow-hidden bg-gray-900 group cursor-grab">
                    {item.image_url && <img src={item.image_url} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />}
                    <div className="absolute inset-0 p-10 flex flex-col justify-between text-white">
                      <span className="text-lg font-medium opacity-70">{item.year}</span>
                      <div>
                        <p className="text-base font-medium opacity-70 mb-1">{item.category}</p>
                        <h3 className="text-4xl font-bold">{item.title}</h3>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}

        {/* Reviews */}
        {reviews.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <h2 className="text-3xl font-bold text-[#1F2853] mb-8">Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((rev: any) => (
                <div key={rev.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                      {rev.reviewer_avatar ? <img src={rev.reviewer_avatar} alt={rev.reviewer_name} className="w-full h-full object-cover" /> : null}
                    </div>
                    <div>
                      <p className="font-bold text-[#1F2853] text-sm">{rev.reviewer_name}</p>
                      {rev.reviewer_company && <p className="text-xs text-gray-400">{rev.reviewer_company}</p>}
                    </div>
                  </div>
                  {rev.comment && <p className="text-gray-600 text-sm leading-relaxed">"{rev.comment}"</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Lead Capture Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <i className="ri-close-line text-2xl" />
            </button>
            <h3 className="text-xl font-bold text-[#1F2853] mb-2">Download Profile</h3>
            <p className="text-gray-500 text-sm mb-6">Please provide your details to access the full agency credentials.</p>
            <form className="space-y-4">
              <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#1F2853]" placeholder="Full Name" />
              <input type="email" className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#1F2853]" placeholder="Email Address" />
              <button type="button" onClick={() => setIsModalOpen(false)}
                className="w-full bg-[#1F2853] hover:bg-[#2a3570] text-white font-bold py-3.5 rounded-xl transition-all">
                Download Now
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
