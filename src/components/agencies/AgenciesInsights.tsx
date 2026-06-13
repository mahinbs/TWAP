import React from 'react';

const insights = [
    {
        category: "FINANCING",
        title: "The Scaling Blueprint: Helping Regional Banks Prepare for the Future?",
        image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        link: "#"
    },
    {
        category: "HEALTHCARE",
        title: "Healthcare Private Equity Market 2024: Year in Review and Outlook",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        link: "#"
    },
];

const clients = [
    { name: "HEX Fund", font: "font-serif" },
    { name: "MTGox", font: "font-sans font-black tracking-tighter" },
    { name: "Sauex Bank", font: "font-serif italic" },
    { name: "KONSTRUKTION", font: "font-mono" },
    { name: "Coinbase", font: "font-sans font-bold" },
    { name: "Meta Max", font: "font-serif" },
];

export default function AgenciesInsights() {
    return (
        <section className="py-24 bg-[#FAFAFA] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">
                        Insights
                    </span>
                    <h2 className="text-4xl font-bold text-[#1A1B20] mb-4">Our Latest Insights</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Proprietary data, expert analysis and bold thinking for leaders who want to achieve the extraordinary.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {insights.map((item, index) => (
                        <div key={index} className={`rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6 items-start ${index === 1 ? 'bg-[#56122D]' : 'bg-white'}`}>
                            <div className="w-full sm:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="flex-1 py-2">
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{item.category}</div>
                                <h3 className={`text-xl font-bold mb-6 leading-snug ${index === 1 ? 'text-white' : 'text-[#1A1B20]'}`}>
                                    {item.title}
                                </h3>
                                <div className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-all cursor-pointer ${index === 1 ? 'text-gray-400 hover:bg-white hover:text-[#1A1B20] hover:border-transparent' : 'text-gray-400 hover:bg-[#f25a1a] hover:text-white hover:border-transparent'}`}>
                                    <i className="ri-arrow-right-up-line"></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <button className="bg-[#f25a1a] hover:bg-[#d14815] text-white px-8 py-3 rounded-full font-semibold transition-all cursor-pointer">
                        More Insights
                    </button>
                </div>

                {/* Client Logos Strip - Animated Slider */}
                <div className="mt-24 pt-12 border-t border-gray-200 relative">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest w-full text-center mb-8">Empowering Our Clients</h3>

                    <div className="relative w-full overflow-hidden">
                        {/* Gradient Masks */}
                        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none"></div>

                        <div className="flex w-max animate-scroll hover:pause items-center">
                            {/* Triple the list for seamless loop (33.33% translation) */}
                            {[...clients, ...clients, ...clients].map((client, index) => (
                                <div key={index} className="mx-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-300 cursor-default">
                                    <span className={`text-2xl ${client.font} whitespace-nowrap`}>{client.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
