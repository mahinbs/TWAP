import React from 'react';

const tools = [
    {
        name: "Fliki AI",
        rating: 4.2,
        category: "Artificial Intelligence",
        logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=100", // Pinkish placeholder
        color: "bg-pink-100 text-pink-500",
        shadow: "group-hover:shadow-pink-200"
    },
    {
        name: "Doctrina AI",
        rating: 4.6,
        category: "Education",
        logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=100", // Dark D logo style
        color: "bg-gray-100 text-gray-800",
        shadow: "group-hover:shadow-gray-200"
    },
    {
        name: "Sora AI",
        rating: 3.7,
        category: "Artificial Intelligence",
        logo: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=100", // OpenAI-ish
        color: "bg-black text-white",
        shadow: "group-hover:shadow-gray-400"
    },
    {
        name: "ChatGOT",
        rating: 4.3,
        category: "Artificial Intelligence",
        logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=100", // Blue chat bubble style
        color: "bg-blue-100 text-blue-600",
        shadow: "group-hover:shadow-blue-200"
    },
    {
        name: "Frosting AI",
        rating: 4.4,
        category: "Artificial Intelligence",
        logo: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=100", // Cherry style ?
        color: "bg-red-100 text-red-500",
        shadow: "group-hover:shadow-red-200"
    },
    {
        name: "Koala AI",
        rating: 4.4,
        category: "Artificial Intelligence",
        logo: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=100", // Koala
        color: "bg-gray-800 text-white",
        shadow: "group-hover:shadow-gray-400"
    },
    {
        name: "Midjourney AI",
        rating: 4.1,
        category: "Artificial Intelligence",
        logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=100", // Boat/Sail
        color: "bg-blue-50 text-blue-800",
        shadow: "group-hover:shadow-blue-200"
    },
    {
        name: "Perchance",
        rating: 4.6,
        category: "Artificial Intelligence",
        logo: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&q=80&w=100", // Dice
        color: "bg-gray-100 text-black",
        shadow: "group-hover:shadow-gray-200"
    }
];

const AITools = () => {

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        target.style.setProperty('--mouse-x', `${x}px`);
        target.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <section className="py-24 bg-transparent">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-orange/10 rounded-full blur-[80px] pointer-events-none"></div>
                    <div className="relative z-10">
                        <span className="inline-block px-4 py-1 rounded-full bg-white border border-gray-100 text-[10px] font-bold text-brand-orange uppercase tracking-[0.2em] mb-4 shadow-sm">
                            Handpicked
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
                            Featured AI Tools
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg mb-8">
                            Tried and tested solutions to upscale your workflow
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool, index) => (
                        <div
                            key={index}
                            onMouseMove={handleMouseMove}
                            className="group relative bg-white rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden"
                        >
                            {/* Spotlight Effect Layer - Subtle for light theme */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(242, 90, 26, 0.05), transparent 60%)`
                                }}
                            ></div>

                            <div className="relative z-10 flex gap-5">
                                {/* Logo with sophisticated shadow effect */}
                                <div className={`w-20 h-20 rounded-2xl flex-shrink-0 overflow-hidden shadow-sm transition-shadow duration-500 ${tool.shadow} ${tool.color} flex items-center justify-center group-hover:scale-105 transform`}>
                                    <img src={tool.logo} alt={tool.name} className="w-full h-full object-cover p-0" />
                                </div>

                                <div className="flex-grow flex flex-col justify-between py-1">
                                    <div>
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-xl text-brand-dark group-hover:text-brand-orange transition-colors">
                                                {tool.name}
                                            </h3>
                                            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                                                <i className="ri-star-fill text-[#FDCB58] text-[10px]"></i>
                                                <span className="text-xs font-bold text-brand-dark">{tool.rating}</span>
                                            </div>
                                        </div>

                                        <div className="text-xs text-gray-400 font-bold tracking-wide text-left mb-3 uppercase">
                                            {tool.category}
                                        </div>
                                    </div>

                                    <div className="flex items-center text-xs font-bold text-gray-500 group-hover:text-brand-dark transition-colors cursor-pointer w-max">
                                        View Details
                                        <i className="ri-arrow-right-line ml-1 transition-transform group-hover:translate-x-1"></i>
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

export default AITools;
