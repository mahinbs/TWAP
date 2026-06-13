const ServicesBentoGrid = () => {
    return (

        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16 reveal-fade-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-brand-lime text-[#1F2853] text-xs font-bold tracking-wider mb-6 uppercase">
                        Our Expertise
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#1F2853] mb-6 tracking-tight font-manrope">
                        Why innovators choose <br /> The Web App Pro
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto font-poppins">
                        Exceptional digital services and unparalleled engineering that
                        set the standard for the future of technology.
                    </p>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)] reveal-stagger">

                    {/* Card 1: App Development (Tall Left) */}
                    <div className="md:col-span-4 md:row-span-2 relative group overflow-hidden rounded-3xl bg-brand-lime/10 reveal-child flex flex-col justify-center">
                        <img
                            src="/assets/services/app_dev.png"
                            alt="App Development"
                            className="w-full h-full object-cover object-left absolute inset-0 opacity-20"
                        />
                        <div className="absolute top-0 translate-x-1/3 translate-y-1/2 right-0 bg-brand-lime w-full h-full rotate-[30deg] opacity-100"></div>
                        <div className="p-8 relative z-10">
                            <div className="h-64 md:h-80 w-full mb-6 mx-auto relative">
                                <img
                                    src="/assets/services/app_dev.png"
                                    alt="App Development"
                                    className="w-full h-full object-cover rounded-2xl shadow-lg object-[50%_30%]"
                                />
                            </div>
                        </div>
                        <div className="p-8 pt-0 relative z-10">
                            <h3 className="text-2xl font-bold text-[#1F2853] mb-4 font-manrope">App Development</h3>
                            <p className="text-gray-600 mb-8 text-sm md:text-base font-poppins">
                                High-performance native and cross-platform apps built with cutting-edge tech for scale and user delight.
                            </p>
                            {/* <button className="flex items-center gap-2 bg-[#1F2853] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#f25a1a] transition-colors duration-300 w-fit group/btn cursor-pointer">
                                Explore Solutions
                                <i className="ri-arrow-right-line group-hover/btn:translate-x-1 transition-transform"></i>
                            </button> */}
                        </div>
                    </div>

                    {/* Card 2: AI Automation Solutions (Wide Top Right) */}
                    <div className="md:col-span-8 relative group overflow-hidden rounded-[2rem] bg-[#1F2853] reveal-child min-h-[300px] flex items-center">
                        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
                            <img
                                src="/assets/services/ai_dev.png"
                                alt="AI Automation"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1F2853] via-[#1F2853]/90 to-transparent"></div>

                        <div className="relative z-10 p-10 md:p-14 max-w-xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-brand-lime text-xs font-bold tracking-wider mb-6 uppercase border border-white/20">
                                <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse"></span>
                                Intelligent Systems
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-manrope leading-tight">
                                AI Automation <br /> <span className="text-brand-lime">Solutions</span>
                            </h3>
                            <p className="text-gray-300 text-base font-poppins mb-8 max-w-sm">
                                Transform your operations with intelligent workflows and custom LLM integrations that scale your business.
                            </p>
                            {/* <a href="/services/ai-automation" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-lime text-[#1F2853] hover:bg-white transition-colors duration-300">
                                <i className="ri-arrow-right-up-line text-xl"></i>
                            </a> */}
                        </div>
                    </div>

                    {/* Card 3: UI/UX Solutions (Small Right Middle) */}
                    <div className="md:col-span-3 relative group overflow-hidden rounded-3xl bg-brand-dark/5 border border-gray-100 shadow-sm p-8 flex flex-col justify-center reveal-child min-h-[250px]">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:bg-[#1F2853] group-hover:text-white transition-all duration-300">
                            <i className="ri-pantone-line text-2xl"></i>
                        </div>
                        <h3 className="text-xl font-bold text-[#1F2853] mb-2 font-manrope">
                            Modern UI/UX
                        </h3>
                        <p className="text-gray-500 text-sm font-poppins">
                            Immersive interfaces and future-proof design systems.
                        </p>
                        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[#B9ED2A]/20 to-transparent rounded-tl-3xl"></div>
                    </div>


                    {/* Card 5: App Promotion & Visibility (Bottom Right Wide) */}
                    <div className="md:col-span-5 relative group overflow-hidden rounded-3xl bg-gray-50 reveal-child min-h-[300px] flex flex-col-reverse md:flex-row">
                        <div className="p-8 flex flex-col justify-center md:w-1/2 relative z-10">
                            <h3 className="text-2xl font-bold text-[#1F2853] mb-4 font-manrope">App Promotion</h3>
                            <p className="text-gray-600 mb-6 text-sm font-poppins">
                                Strategic marketing and ASO that catapults your app to the top of the charts and drives user acquisition.
                            </p>
                            {/* <a href="/services#promotion" className="text-[#f25a1a] font-medium hover:text-[#d14815] inline-flex items-center gap-1 transition-colors">
                                Boost Visibility <i className="ri-arrow-right-line"></i>
                            </a> */}
                        </div>
                        <div className="md:w-1/2 relative min-h-[200px] md:min-h-full">
                            <img
                                src="/assets/services/app_promotion.png"
                                alt="App Promotion"
                                className="absolute inset-0 w-full h-full object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent to-gray-50 opacity-100 md:opacity-100"></div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default ServicesBentoGrid