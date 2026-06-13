// import React from 'react';

const SuccessCTA = () => {
    return (
        <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto rounded-[3rem] bg-black relative overflow-hidden text-white p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '30px 30px' }}>
                </div>

                {/* Left Content */}
                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        What Do You Want to Hear Today? <br />
                        <span className="text-brand-orange">Subscribe For The Latest Updates.</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-8">
                        Get exclusive access to our success playbooks, interviews, and strategic notes delivered straight to your inbox.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange transition-colors"
                        />
                        <button className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-100 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* Right Image (Mic) */}
                <div className="relative w-full md:w-1/3 flex justify-center md:justify-end">
                    <div className="relative w-64 h-64 md:w-80 md:h-80">
                        {/* Glow */}
                        <div className="absolute inset-0 bg-brand-orange/20 rounded-full blur-[80px]"></div>

                        {/* Mic Icon/Image Placeholder - Using a high quality image or icon stack */}
                        <div className="relative z-10 transform rotate-12 hover:rotate-6 transition-transform duration-700">
                            <img
                                src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=600"
                                alt="Microphone"
                                className="w-full h-full object-cover rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                                style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SuccessCTA;
