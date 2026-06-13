import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const notes = [
    {
        quote: "This agency transformed our entire digital presence. The ROI we've seen in just 3 months is absolutely insane.",
        author: "Sarah Jenkins",
        role: "CMO at FinTech Co",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
    },
    {
        quote: "Finally, a team that understands data AND creativity. Their campaigns don't just look good, they convert like crazy.",
        author: "Michael Chang",
        role: "Founder, ScaleUp",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
    },
    {
        quote: "The strategic insights from their 'Success Notes' newsletter literally saved us from a $50k mistake. Worth every penny.",
        author: "Elena Rodriguez",
        role: "Director of Marketing",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150"
    },
    {
        quote: "Their team became an extension of ours. The best agency partnership we've ever experienced.",
        author: "David Kim",
        role: "CEO, TechFlow",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    }
];

const SuccessNotes = () => {
    return (
        <section id="success-notes" className="py-24 bg-gray-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                <div className="text-center mb-16 px-4">
                    <span className="text-brand-orange font-bold text-xs tracking-widest uppercase mb-4 block">Proven Strategies</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4 !leading-tight">
                        Shine Bright, Speak Loud:<br />
                        <span className="bg-gradient-to-r from-brand-orange to-brand-orange text-transparent bg-clip-text">Success Notes Take Flight</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        Real feedback, real results. See what industry leaders are saying about our success methodologies.
                    </p>
                </div>

                {/* Slider Container */}
                <div className="relative w-full">

                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        centeredSlides={true}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                        className="pb-12"
                    >
                        {notes.concat(notes).map((note, index) => (
                            <SwiperSlide key={index} className="h-auto mb-10">
                                <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-100 transition-all duration-300 border border-gray-100 group cursor-pointer hover:border-brand-orange/30 h-full flex flex-col hover:-translate-y-1 !min-h-[22rem]">

                                    <div className="mb-6">
                                        <i className="ri-double-quotes-l text-4xl text-brand-orange/20"></i>
                                    </div>

                                    <p className="text-gray-600 text-lg leading-relaxed mb-8 font-medium flex-grow">
                                        "{note.quote}"
                                    </p>

                                    <div className="flex items-center gap-4 border-t border-gray-100 pt-6 mt-auto">
                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                                            <img src={note.image} alt={note.author} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-brand-dark">{note.author}</h4>
                                            <p className="text-xs text-gray-400 uppercase tracking-wide font-bold">{note.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </div>

            {/* Custom Styles for Pagination */}
            <style>{`
                .swiper-pagination-bullet-active {
                    background-color: #F25A1A !important;
                }
            `}</style>
        </section>
    );
};

export default SuccessNotes;
