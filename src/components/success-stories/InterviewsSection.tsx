import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi, successStoriesApi } from '../../lib/api';

const IS_FALLBACK = {
    title_prefix: 'Epic Conversations,',
    title_highlight: 'Exclusive Insights.',
};

const FALLBACK_INTERVIEWS = [
    {
        title: "Scaling AI Agents",
        guest: "Sarah Chen",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
        slug: '',
    },
    {
        title: "The Death of SaaS",
        guest: "Marcus Cole",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
        slug: '',
    },
    {
        title: "Design for Billions",
        guest: "Priya Patel",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
        slug: '',
    },
    {
        title: "Future of Fintech",
        guest: "Alex Ross",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
        slug: '',
    },
];

const InterviewsSection = () => {
    const { data: section } = useQuery({
        queryKey: ['page-section', 'success-stories', 'interviews'],
        queryFn: () => siteContentApi.section('success-stories', 'interviews'),
    });
    const { data: dbInterviews = [] } = useQuery({
        queryKey: ['success-stories', 'interviews'],
        queryFn: () => successStoriesApi.items('interviews'),
    });

    const c = (section?.content ?? {}) as Record<string, string>;
    const tPre = c.title_prefix    ?? IS_FALLBACK.title_prefix;
    const tHi  = c.title_highlight ?? IS_FALLBACK.title_highlight;

    const interviews = dbInterviews.length > 0
        ? dbInterviews.slice(0, 4).map((item) => ({
            title: item.title,
            guest: item.guest_title ?? item.subtitle ?? 'Guest',
            image: item.image_url ?? '',
            slug: item.slug ?? '',
        }))
        : FALLBACK_INTERVIEWS;

    const heroInterview = dbInterviews[0];

    return (
        <section id="interviews" className="py-24 bg-brand-dark text-white relative overflow-hidden">

            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-[120px]"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div className="relative group">
                        <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl shadow-brand-orange/20">
                            <img
                                src={heroInterview?.image_url ?? "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?auto=format&fit=crop&q=80&w=800"}
                                alt={heroInterview?.title ?? "Founder Interview"}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                            <div className="absolute bottom-10 left-10 right-10 flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                {heroInterview?.slug ? (
                                    <Link to={`/interviews/${heroInterview.slug}`} className="flex items-center gap-4 w-full">
                                        <span className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center hover:scale-110 transition-transform flex-shrink-0">
                                            <i className="ri-play-fill text-white text-2xl"></i>
                                        </span>
                                        <div>
                                            <div className="text-xs text-gray-300 uppercase tracking-widest mb-1">Latest Episode</div>
                                            <div className="font-bold text-white text-sm line-clamp-1">{heroInterview.title}</div>
                                        </div>
                                    </Link>
                                ) : (
                                    <>
                                        <button className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center hover:scale-110 transition-transform flex-shrink-0">
                                            <i className="ri-play-fill text-white text-2xl"></i>
                                        </button>
                                        <div>
                                            <div className="text-xs text-gray-300 uppercase tracking-widest mb-1">Latest Episode</div>
                                            <div className="font-bold text-white text-sm line-clamp-1">Building Unicorns in 2026</div>
                                        </div>
                                    </>
                                )}
                                <div className="ml-auto">
                                    <div className="flex gap-1 items-end h-8">
                                        <div className="w-1 bg-brand-lime animate-music-bar animation-delay-0 rounded-full"></div>
                                        <div className="w-1 bg-brand-lime animate-music-bar animation-delay-200 rounded-full"></div>
                                        <div className="w-1 bg-brand-lime animate-music-bar animation-delay-400 rounded-full"></div>
                                        <div className="w-1 bg-brand-lime animate-music-bar animation-delay-100 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-brand-lime text-xs font-bold uppercase tracking-widest mb-6">
                            <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse"></span>
                            Interviews
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold mb-6 !leading-tight">
                            {tPre} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime to-brand-lime">
                                {tHi}
                            </span>
                        </h2>

                        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                            {section?.description ?? "Join us for exclusive deep-dives with the world's most innovative founders, creators, and disruptors. Unfiltered stories of failure, pivots, and massive success."}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {interviews.map((interview, i) => {
                                const card = (
                                    <div className="group p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-brand-lime/30 transition-all cursor-pointer flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 relative">
                                            {interview.image ? (
                                                <img
                                                    src={interview.image}
                                                    alt={interview.guest}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-white/10" />
                                            )}
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm group-hover:text-brand-lime transition-colors line-clamp-1 mb-1">
                                                {interview.title}
                                            </h4>
                                            <p className="text-xs text-gray-400">with {interview.guest}</p>
                                        </div>
                                    </div>
                                );
                                return interview.slug ? (
                                    <Link key={interview.slug} to={`/interviews/${interview.slug}`}>{card}</Link>
                                ) : (
                                    <div key={i}>{card}</div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default InterviewsSection;
