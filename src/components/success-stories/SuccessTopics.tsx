import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const topics = [
    {
        title: "AI Revolutions: The Next Wave",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400",
        type: "Podcast"
    },
    {
        title: "Marketing in the Metaverse",
        image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=400",
        type: "Article"
    },
    {
        title: "The Zero-Click Future",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400",
        type: "Interview"
    },
    {
        title: "Data Privacy & Trust",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400",
        type: "Podcast"
    },
    {
        title: "Crypto: Beyond the Hype",
        image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=400",
        type: "Interview"
    },
    {
        title: "Remote Culture 2.0",
        image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&q=80&w=400",
        type: "Case Study"
    }
];

const animation = { duration: 15000, easing: (t: number) => t };

const SuccessTopics = () => {
    const [sliderRef, internalSlider] = useKeenSlider<HTMLDivElement>({
        loop: true,
        renderMode: "performance",
        drag: true,
        slides: {
            perView: 1.2,
            spacing: 20,
        },
        breakpoints: {
            "(min-width: 640px)": {
                slides: { perView: 2.2, spacing: 24 },
            },
            "(min-width: 1024px)": {
                slides: { perView: 3.5, spacing: 32 },
            },
            "(min-width: 1280px)": {
                slides: { perView: 4, spacing: 32 },
            },
        },
        created(s) {
            s.moveToIdx(5, true, animation);
        },
        updated(s) {
            s.moveToIdx(s.track.details.abs + 5, true, animation);
        },
        animationEnded(s) {
            s.moveToIdx(s.track.details.abs + 5, true, animation);
        },
    });

    const handleMouseEnter = () => {
        internalSlider.current?.animator.stop();
    };

    const handleMouseLeave = () => {
        internalSlider.current?.moveToIdx(
            internalSlider.current.track.details.abs + 5,
            true,
            animation
        );
    };

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4 !leading-tight">
                        Tap into Trending Topics:<br />
                        <span className="text-brand-burgundy">Latest Insights, Always On</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Stay ahead of the curve with our curated selection of hot topics and emerging trends in the digital landscape.
                    </p>
                </div>
            </div>

            {/* Carousel Container */}
            <div 
                className="px-4"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div ref={sliderRef} className="keen-slider">
                    {topics.map((topic, index) => (
                        <div key={index} className="keen-slider__slide">
                            <div className="group relative rounded-[2.5rem] overflow-hidden aspect-[4/5] cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-brand-orange/20 transition-all duration-500 mx-2">
                                {/* Image Background */}
                                <img
                                    src={topic.image}
                                    alt={topic.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                                {/* Category Badge */}
                                <div className="absolute top-6 left-6">
                                    <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white uppercase tracking-widest hover:bg-brand-orange/80 transition-colors">
                                        {topic.type}
                                    </span>
                                </div>

                                {/* Center Play Button (Animated) */}
                                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-brand-orange hover:border-brand-orange hover:scale-110 transition-all duration-300 shadow-2xl">
                                    <i className="ri-play-fill text-3xl ml-1"></i>
                                </div>

                                {/* Bottom Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="font-bold text-white text-xl md:text-2xl mb-3 leading-tight group-hover:text-brand-orange transition-colors">
                                        {topic.title}
                                    </h3>

                                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 text-gray-300 text-sm font-medium">
                                        <div className="w-8 h-[1px] bg-brand-orange"></div>
                                        <span>Watch Episode</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessTopics;

