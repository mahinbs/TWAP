

const SuccessStoriesHero = () => {

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-screen bg-brand-dark text-white overflow-hidden flex flex-col items-center justify-center py-20">

            {/* Background Gradients using Brand Colors */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0F0F1A] via-[#1B1B36] to-[#2D0F1E]"></div>

                {/* Space/Star dust effects */}
                <div className="absolute top-0 left-0 w-full h-full opacity-30"
                    style={{ backgroundImage: 'radial-gradient(circle at center, white 0.20px, transparent 1px)', backgroundSize: '50px 50px' }}>
                </div>

                {/* Glows */}
                <div className="absolute top-[-20%] left-1/4 w-[600px] h-[600px] bg-brand-burgundy/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-0 w-[800px] h-[800px] bg-brand-orange/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full flex flex-col items-center pt-14">

                {/* Main Headline */}
                <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 leading-tight max-w-4xl mx-auto">
                    Unlock the Secrets of
                    <span className="text-brand-orange"> Success</span>
                </h1>

                {/* Subheadline */}
                <p className="text-gray-400 text-lg md:text-xl text-center max-w-2xl mx-auto mb-10 font-light">
                    Dive deep into exclusive interviews, case studies, and success notes <br />
                    from industry leaders transforming the digital landscape.
                </p>

                {/* Floating Icons (Decorative) */}
                <div className="absolute top-32 left-10 md:left-20 animate-float-large hidden lg:block">
                    <div className="">
                        <i className="ri-rocket-2-fill text-4xl text-brand-orange"></i>
                    </div>
                </div>

                <div className="absolute bottom-40 right-10 md:right-20 animate-float-large animation-delay-2000 hidden lg:block">
                    <div className="">
                        <i className="ri-bar-chart-box-fill text-5xl text-brand-orange"></i>
                    </div>
                </div>

                {/* Service Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                    {/* Card 1: Success Stories */}
                    <div
                        onClick={() => scrollToSection('success-stories')}
                        className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors group cursor-pointer"
                    >
                        <div className="w-12 h-12 bg-brand-orange/20 rounded-xl flex items-center justify-center mb-6 text-brand-orange">
                            <i className="ri-trophy-line text-2xl"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Success Stories</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Explore in-depth case studies of businesses achieving massive ROI and growth.
                        </p>
                        <div className="flex items-center text-sm font-bold text-white group-hover:gap-2 transition-all">
                            Read Stories <i className="ri-arrow-right-line ml-1"></i>
                        </div>
                    </div>

                    {/* Card 2: Interviews */}
                    <div
                        onClick={() => scrollToSection('interviews')}
                        className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors group cursor-pointer"
                    >
                        <div className="w-12 h-12 bg-brand-orange/20 rounded-xl flex items-center justify-center mb-6 text-brand-orange">
                            <i className="ri-mic-line text-2xl"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Interviews</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Exclusive conversations with founders and experts sharing their playbooks.
                        </p>
                        <div className="flex items-center text-sm font-bold text-white group-hover:gap-2 transition-all">
                            Watch Interviews <i className="ri-arrow-right-line ml-1"></i>
                        </div>
                    </div>

                    {/* Card 3: Success Notes */}
                    <div
                        onClick={() => scrollToSection('success-notes')}
                        className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors group cursor-pointer"
                    >
                        <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-6 text-pink-500">
                            <i className="ri-sticky-note-line text-2xl"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Success Notes</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Curated takeaways, strategies, and actionable insights for your business.
                        </p>
                        <div className="flex items-center text-sm font-bold text-white group-hover:gap-2 transition-all">
                            View Notes <i className="ri-arrow-right-line ml-1"></i>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SuccessStoriesHero;
