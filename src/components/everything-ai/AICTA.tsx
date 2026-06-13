import { useState } from 'react';

const AICTA = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        setMousePos({
            x: (clientX - centerX) / 20, // Adjust sensitivity
            y: (clientY - centerY) / 20
        });
    };

    return (
        <section
            className="py-10 relative overflow-hidden bg-transparent"
            onMouseMove={handleMouseMove}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="relative rounded-[3rem] p-12 md:p-12 text-center overflow-hidden group shadow-2xl border border-gray-100 bg-white">

                    {/* Light Premium Background */}
                    <div className="absolute inset-0 bg-white transition-all duration-500">
                        {/* Animated Mesh Grid */}
                        <div className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.1) 1px, transparent 0)`,
                                backgroundSize: '40px 40px',
                                transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`
                            }}
                        ></div>

                        {/* Glowing Orbs - Light Version */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[100px] animate-pulse"
                            style={{ transform: `translate(calc(-50% + ${mousePos.x * -0.5}px), calc(-50% + ${mousePos.y * -0.5}px))` }}></div>
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-lime/10 rounded-full blur-[80px]"
                            style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * -0.5}px)` }}></div>
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-burgundy/5 rounded-full blur-[80px]"
                            style={{ transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * 0.3}px)` }}></div>
                    </div>

                    {/* Decorative Rings */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-black/5 rounded-full animate-[spin_20s_linear_infinite]"
                        style={{ transform: `translate(calc(-50% + ${mousePos.x * -0.8}px), calc(-50% + ${mousePos.y * -0.8}px)) rotate(0deg)` }}></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-black/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"
                        style={{ transform: `translate(calc(-50% + ${mousePos.x * 0.8}px), calc(-50% + ${mousePos.y * 0.8}px)) rotate(0deg)` }}></div>

                    {/* Content */}
                    <div className="relative z-10 max-w-4xl mx-auto"
                        style={{ transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px)` }}>
                        <div className="inline-block mb-6">
                            <span className="py-2 px-6 rounded-full border border-gray-100 bg-white text-brand-orange font-mono text-sm tracking-widest uppercase shadow-sm">
                                System Status: Ready to Launch
                            </span>
                        </div>

                        <h2 className="text-5xl md:text-7xl font-bold text-brand-dark mb-8 tracking-tighter leading-none">
                            Unlock the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-dark to-brand-lime animate-gradient bg-300%">
                                Next Dimension
                            </span>
                        </h2>

                        <p className="text-gray-500 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                            Don't just adapt to the future. <span className="text-brand-dark font-medium">Create it.</span><br />
                            Join the elite circle of AI-native enterprises today.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <button className="px-10 py-5 rounded-full bg-brand-orange text-white font-bold hover:bg-brand-dark transition-all flex items-center gap-3 group shadow-xl shadow-brand-orange/20 hover:scale-105">
                                Start Transformation
                                <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                            </button>
                        </div>
                    </div>

                    {/* Floating Abstract Elements */}
                    <div className="absolute top-20 left-20 w-16 h-16 border border-gray-100 rounded-xl rotate-12 bg-white/50 backdrop-blur-sm animate-bounce duration-[3000ms]"
                        style={{ transform: `translate(${mousePos.x * 1.2}px, ${mousePos.y * 0.8}px) rotate(12deg)` }}></div>
                    <div className="absolute bottom-20 right-20 w-24 h-24 border border-brand-orange/10 rounded-full bg-brand-orange/5 backdrop-blur-sm animate-pulse"
                        style={{ transform: `translate(${mousePos.x * -1}px, ${mousePos.y * -1.2}px)` }}></div>

                </div>
            </div>
        </section>
    );
};

export default AICTA;
