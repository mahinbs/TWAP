import { useEffect, useRef } from 'react';

export default function DirectoryHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Canvas Particle Animation Logic from AIHero
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles: Particle[] = [];
    const particleCount = 100;
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
        const colors = ['#f25a1a', '#B9ED2A', '#1B1B36', '#ffffff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
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

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className="inline-block px-4 py-2 rounded-full border border-gray-700 bg-white/5 backdrop-blur-sm text-gray-300 text-sm mb-6 tracking-widest uppercase">
          Discovery Hub
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
          App <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-white to-brand-lime">Directory</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          Discover the best AI-powered tools and applications. <br className="hidden md:block" /> 
          Compare features, read reviews, and find the perfect solution.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center items-center">
          {[
            { icon: "ri-apps-line", label: "500+ Apps Listed", color: "text-brand-orange" },
            { icon: "ri-star-line", label: "10,000+ Reviews", color: "text-brand-lime" },
            { icon: "ri-user-line", label: "50,000+ Users", color: "text-white" }
          ].map((stat, i) => (
            <div key={i} className="group bg-white/5 backdrop-blur-md rounded-2xl px-6 py-4 border border-gray-700 hover:border-gray-500 transition-all hover:-translate-y-1">
              <span className="flex items-center gap-3 text-white font-bold text-sm">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/10 group-hover:bg-white/20 transition-colors`}>
                    <i className={`${stat.icon} ${stat.color} text-lg`}></i>
                </div>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
