import React from 'react';

export default function AgenciesGrid() {
    return (
        <section className="bg-white px-6 lg:px-8 py-24">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center md:text-left">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#f25a1a]/10 border border-[#f25a1a]/20 text-sm font-bold text-[#f25a1a] mb-4 uppercase tracking-wider">
                        Collaborations
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1B20]">
                        Partnerships that <span className="text-[#f25a1a]">Inspired Growth</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[500px]">
                    {/* Card 1: Strategic Alliances */}
                    <div className="bg-[#F9FAFB] rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300 border border-gray-100">
                        <div className="flex justify-between items-start">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider border border-gray-200 px-3 py-1 rounded-full bg-white">Strategy</span>
                        </div>

                        <div className="relative z-10 mt-8 mb-auto">
                            <h3 className="text-3xl font-medium text-[#1A1B20] leading-tight group-hover:text-[#f25a1a] transition-colors">
                                Strategic Alliances <br />
                                <span className="text-gray-400 group-hover:text-[#f25a1a]/70 transition-colors">Driving Innovation</span>
                            </h3>
                        </div>

                        <div className="w-full h-64 mt-8 rounded-2xl overflow-hidden relative">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                                alt="Strategic collaboration"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1B20]/50 to-transparent"></div>
                        </div>
                    </div>

                    {/* Card 2: Main Highlight - Growth (Lime Green) */}
                    <div
                        className="rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between group text-[#1A1B20] hover:shadow-2xl hover:shadow-lime-500/20 transition-all duration-300"
                        style={{ backgroundColor: '#B9ED2A' }}
                    >
                        {/* Diagonal Overlay Effect */}
                        <div
                            className="absolute inset-0 bg-white/20 pointer-events-none"
                            style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 100% 40%)' }}
                        ></div>
                        <div
                            className="absolute inset-0 bg-white/10 pointer-events-none"
                            style={{ clipPath: 'polygon(100% 0, 100% 100%, 50% 100%)' }}
                        ></div>

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-auto">
                                <span className="text-xs font-bold text-[#1A1B20] uppercase tracking-wider border border-[#1A1B20]/20 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">Success Story</span>
                            </div>

                            <h3 className="text-3xl lg:text-4xl font-bold leading-tight mb-8">
                                Unlock Potential <br />
                                Through <br />
                                <span className="opacity-70">Shared Vision</span>
                            </h3>

                            {/* Stat Section imitating the reference image */}
                            <div className="mt-auto">
                                <div className="text-6xl font-black mb-2 tracking-tighter">1.6x</div>
                                <p className="text-sm font-medium opacity-80 max-w-[200px] leading-snug">
                                    net synergies realized above the initial target.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Global Impact */}
                    <div className="bg-[#F9FAFB] rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300 border border-gray-100">
                        <div className="flex justify-between items-start">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider border border-gray-200 px-3 py-1 rounded-full bg-white">Global</span>
                        </div>

                        <div className="relative z-10 mt-8 mb-auto">
                            <h3 className="text-3xl font-medium text-[#1A1B20] leading-tight group-hover:text-[#f25a1a] transition-colors">
                                Global Impact <br />
                                <span className="text-gray-400 group-hover:text-[#f25a1a]/70 transition-colors">Scaling Success</span>
                            </h3>
                        </div>

                        <div className="w-full h-64 mt-8 rounded-2xl overflow-hidden relative">
                            <img
                                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800"
                                alt="Global partnership"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1B20]/50 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
