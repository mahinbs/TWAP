import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

const MethodologyHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const coreRef = useRef<HTMLDivElement>(null);
    const ringsRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context((self) => {
            if (!self.selector) return;

            // 1. Initial Reveal
            const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

            tl.set(".hero-ring", { scale: 0, opacity: 0, rotationX: 90 })
                .set(".hero-core", { scale: 0, opacity: 0 })
                .set(".satellite-item", { scale: 0, opacity: 0 })
                .set(".glitch-text", { y: 20, opacity: 0 });

            tl.to(".hero-core", { duration: 1.5, scale: 1, opacity: 1, ease: "back.out(1.2)" })
                .to(".hero-ring", { duration: 2, scale: 1, opacity: 0.6, rotationX: 0, stagger: 0.1 }, "-=1.2")
                .to(".glitch-text", { duration: 1, y: 0, opacity: 1, stagger: 0.1 }, "-=1.5")
                .to(".satellite-item", { duration: 0.8, scale: 1, opacity: 1, stagger: 0.1 }, "-=1");

            // 2. Idle Animations (The "Singularity")
            // Rings Rotating constantly
            gsap.to(".ring-1", { duration: 20, rotationZ: 360, repeat: -1, ease: "none" });
            gsap.to(".ring-2", { duration: 25, rotationZ: -360, repeat: -1, ease: "none" });
            gsap.to(".ring-3", { duration: 30, rotationX: 360, rotationY: 360, repeat: -1, ease: "none" });

            // Satellites Floating
            gsap.to(".satellite-item", {
                y: "random(-20, 20)",
                x: "random(-20, 20)",
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: { from: "random", amount: 2 }
            });

            // "Digital Rain" opacity pulse
            gsap.to(".matrix-line", {
                opacity: "random(0.1, 0.5)",
                height: "random(100, 300)",
                duration: 2,
                repeat: -1,
                yoyo: true,
                stagger: 0.1
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;

        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const xPos = (clientX / innerWidth - 0.5) * 2;
        const yPos = (clientY / innerHeight - 0.5) * 2;

        gsap.to(ringsRef.current, {
            rotationY: xPos * 20,
            rotationX: -yPos * 20,
            duration: 1,
            ease: "power2.out"
        });

        gsap.to(coreRef.current, {
            x: xPos * 30,
            y: yPos * 30,
            duration: 1,
            ease: "power2.out"
        });
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex items-center justify-center bg-[#030014] overflow-hidden pt-20 perspective-[1000px]"
        >
            {/* Background Nebula & Grid */}
            <div className="absolute inset-0 bg-[#030014]">
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-brand-orange/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-[#6d28d9]/10 rounded-full blur-[120px]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"></div>
            </div>

            {/* Matrix Data Rain (Abstract) */}
            <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="matrix-line absolute w-px bg-gradient-to-b from-transparent via-brand-orange to-transparent"
                        style={{
                            left: `${(i + 1) * 8}%`,
                            top: '-20%',
                            height: '20%',
                            animation: `fall ${Math.random() * 3 + 2}s linear infinite`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* Main 3D Container */}
            <div ref={ringsRef} className="relative w-full max-w-[800px] aspect-square flex items-center justify-center transform-style-3d">

                {/* Ring 1 - Outer Dotted */}
                <div className="hero-ring ring-1 absolute w-[90%] h-[90%] border-2 border-brand-orange/20 rounded-full border-dashed"></div>

                {/* Ring 2 - Middle Solid */}
                <div className="hero-ring ring-2 absolute w-[70%] h-[70%] border border-brand-lime/30 rounded-full">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-lime rounded-full shadow-[0_0_10px_#84cc16]"></div>
                </div>

                {/* Ring 3 - Inner Gyroscope */}
                <div className="hero-ring ring-3 absolute w-[50%] h-[50%] border-4 border-white/5 rounded-full border-t-white/30 border-r-brand-orange/50"></div>

                {/* Orbiting Tech Satellites */}
                {/* Top: AI Analysis */}
                <div className="satellite-item absolute top-[10%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
                    <div className="w-12 h-12 bg-[#0a0a0b] border border-red-500/50 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                        <i className="ri-brain-line text-red-500 text-xl"></i>
                    </div>
                    <span className="text-[10px] text-red-400 font-mono tracking-widest uppercase bg-black/50 px-2 py-1 rounded backdrop-blur-sm">AI Analysis</span>
                </div>

                {/* Right: Security */}
                <div className="satellite-item absolute top-1/2 right-[5%] -translate-y-1/2 flex flex-col items-center gap-2 z-20">
                    <div className="w-12 h-12 bg-[#0a0a0b] border border-brand-lime/50 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(132,204,22,0.3)]">
                        <i className="ri-shield-keyhole-line text-brand-lime text-xl"></i>
                    </div>
                    <span className="text-[10px] text-brand-lime/80 font-mono tracking-widest uppercase bg-black/50 px-2 py-1 rounded backdrop-blur-sm">Security</span>
                </div>

                {/* Bottom: Velocity */}
                <div className="satellite-item absolute bottom-[10%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
                    <span className="text-[10px] text-brand-orange/80 font-mono tracking-widest uppercase bg-black/50 px-2 py-1 rounded backdrop-blur-sm">Velocity</span>
                    <div className="w-12 h-12 bg-[#0a0a0b] border border-brand-orange/50 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(242,90,26,0.3)]">
                        <i className="ri-flashlight-line text-brand-orange text-xl"></i>
                    </div>
                </div>

                {/* Left: Scalability */}
                <div className="satellite-item absolute top-1/2 left-[5%] -translate-y-1/2 flex flex-col items-center gap-2 z-20">
                    <div className="w-12 h-12 bg-[#0a0a0b] border border-cyan-500/50 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                        <i className="ri-stack-line text-cyan-500 text-xl"></i>
                    </div>
                    <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase bg-black/50 px-2 py-1 rounded backdrop-blur-sm">Scale</span>
                </div>

                {/* CORE CONTENT */}
                <div ref={coreRef} className="hero-core absolute z-30 flex flex-col items-center justify-center text-center">
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-brand-orange blur-[40px] opacity-20 animate-pulse"></div>
                        <div className="glitch-text text-sm md:text-base font-bold text-brand-orange tracking-[0.3em] uppercase border border-brand-orange/30 px-6 py-2 rounded-full bg-black/40 backdrop-blur-md">
                            System: Online
                        </div>
                    </div>

                    <h1 className="glitch-text text-6xl md:text-9xl font-bold text-white tracking-tighter mb-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                        THE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500">METHOD</span>
                    </h1>

                    <div className="glitch-text flex items-center gap-4 mt-4">
                        <div className="h-px w-12 bg-gray-700"></div>
                        <p className="text-gray-400 font-mono text-xs md:text-sm tracking-widest">
                            &lt; OPTIMIZING_DIGITAL_REALITY /&gt;
                        </p>
                        <div className="h-px w-12 bg-gray-700"></div>
                    </div>

                    {/* CTA Button */}
                    {/* <button className="glitch-text mt-12 group relative px-8 py-3 bg-brand-orange text-white font-bold tracking-widest uppercase text-sm overflow-hidden rounded-sm transition-all hover:shadow-[0_0_40px_rgba(242,90,26,0.6)]">
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                        Explore Logic
                    </button> */}
                </div>

            </div>

            {/* CSS for specific animations not in Tailwind config yet */}
            <style>{`
                @keyframes fall {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(1000%); }
                }
                .transform-style-3d {
                    transform-style: preserve-3d;
                }
            `}</style>

        </section>
    );
};

export default MethodologyHero;
