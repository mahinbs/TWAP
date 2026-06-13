import { useEffect, useRef } from 'react';

const AIHero = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Canvas Particle Animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        let particles: Particle[] = [];
        const particleCount = 100; // Adjust for density
        const connectionDistance = 150;


        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                // Randomly pick brand colors
                const colors = ['#f25a1a', '#B9ED2A', '#1B1B36', '#ffffff'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p, index) => {
                p.update();
                p.draw();

                // Connect particles
                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / connectionDistance})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }

                // Mouse interaction
                // const dx = mouse.x - p.x;
                // const dy = mouse.y - p.y;
                // const dist = Math.sqrt(dx*dx + dy*dy);
                // if (dist < mouseDistance) {
                //      const angle = Math.atan2(dy, dx);
                //      const force = (mouseDistance - dist) / mouseDistance;
                //      const pushX = Math.cos(angle) * force;
                //      const pushY = Math.sin(angle) * force;
                //      p.vx -= pushX * 0.05;
                //      p.vy -= pushY * 0.05;
                // }

            });

            requestAnimationFrame(animate);
        };

        init();
        animate();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            init();
        };

        // const handleMouseMove = (e: MouseEvent) => {
        //     mouse.x = e.clientX;
        //     mouse.y = e.clientY;
        // }

        window.addEventListener('resize', handleResize);
        // window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            // window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center">
            {/* Canvas Background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full z-0 opacity-40 pointer-events-none"
            />

            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-brand-burgundy/30 rounded-full blur-[120px] animate-blob"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-dark/40 rounded-full blur-[120px] animate-blob-reverse animation-delay-2000"></div>
                <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-brand-orange/20 rounded-full blur-[80px] animate-float-large animation-delay-4000"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <span className="inline-block px-4 py-2 rounded-full border border-gray-700 bg-white/5 backdrop-blur-sm text-gray-300 text-sm mb-6 tracking-widest uppercase">
                    The Future is Now
                </span>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
                    Scale Up For The <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-white to-brand-lime">
                        Future With AI
                    </span>
                </h1>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                    We've battled buggy bots and chased AI chaos to build your survival kit.
                    Our blogs blend sharp insights, expert takes, and enough knowledge to keep you one step ahead of the machines.
                </p>

                {/* Particle Ring Animation - Enhanced */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] -z-10 opacity-60 pointer-events-none">
                    {/* Using SVG/CSS to create the particle sphere look */}
                    <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_10s_linear_infinite]"></div>
                    <div className="absolute inset-8 rounded-full border border-brand-orange/10 animate-[spin_15s_linear_infinite_reverse]"></div>
                    <div className="absolute inset-16 rounded-full border border-brand-lime/5 animate-[spin_20s_linear_infinite]"></div>
                    <div className="absolute inset-24 rounded-full border border-brand-burgundy/10 animate-[spin_25s_linear_infinite_reverse]"></div>

                    {/* Central Glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-burgundy/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
                </div>
            </div>

        </section>
    );
};

export default AIHero;
