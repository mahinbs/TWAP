
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MethodologyIntro = () => {
    const sectionRef = useRef(null);
    const textRefs = useRef([]);
    const buttonRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text Reveal Animation
            textRefs.current.forEach((text, index) => {
                gsap.fromTo(text,
                    {
                        opacity: 0,
                        y: 50,
                        filter: 'blur(10px)'
                    },
                    {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: text,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        },
                        delay: index * 0.1
                    }
                );
            });

            // Highlight word animation (width expansion)
            const highlights = gsap.utils.toArray('.highlight-text');
            highlights.forEach((highlight: any) => {
                gsap.fromTo(highlight,
                    { backgroundSize: "0% 100%" },
                    {
                        backgroundSize: "100% 100%",
                        scrollTrigger: {
                            trigger: highlight,
                            start: "top 80%",
                            end: "top 20%",
                            scrub: true
                        }
                    }
                );
            });

            // Button Entrance
            gsap.fromTo(buttonRef.current,
                { scale: 0.8, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.5)',
                    scrollTrigger: {
                        trigger: buttonRef.current,
                        start: 'top 90%'
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el: any) => {
        if (el && !textRefs.current.includes(el)) {
            textRefs.current.push(el);
        }
    };

    return (
        <section ref={sectionRef} className="bg-white py-24 lg:pt-40 relative overflow-hidden">
            {/* Parallax Background Element */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-orange/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">

                {/* Mission Text */}
                <div className="space-y-16 text-lg lg:text-2xl leading-relaxed text-gray-600 font-normal">
                    <p ref={addToRefs} className="relative">
                        Our mission at <strong className="text-black font-bold highlight-text bg-gradient-to-r from-brand-orange/20 to-brand-orange/20 bg-no-repeat bg-left-bottom pb-1" style={{ backgroundSize: '0% 100%' }}>The Web App Pro</strong> is to engineer scalable, future-proof digital ecosystems that empower your business to dominate its market. We don't just build software; we craft intelligent web applications that drive growth, streamline operations, and deliver unparalleled user experiences.
                    </p>

                    <p ref={addToRefs}>
                        Precision is our hallmark. From initial concept to final deployment, we adhere to rigorous coding standards and architectural best practices. This ensures every <span className="text-black font-medium">enterprise solution</span> we deliver is robust, secure, and optimized for peak performance.
                    </p>

                    <p ref={addToRefs}>
                        But we go beyond standard development. Our <span className="highlight-text bg-gradient-to-r from-brand-orange/20 to-brand-orange/20 bg-no-repeat bg-left-bottom pb-1 text-black font-medium">cutting-edge expertise</span> in <span className="highlight-text bg-gradient-to-r from-brand-orange/20 to-brand-orange/20 bg-no-repeat bg-left-bottom pb-1 text-black font-medium">AI Integration</span>, <span className="highlight-text bg-gradient-to-r from-brand-orange/20 to-brand-orange/20 bg-no-repeat bg-left-bottom pb-1 text-black font-medium">Cloud Native Tech</span>, and <span className="highlight-text bg-gradient-to-r from-brand-orange/20 to-brand-orange/20 bg-no-repeat bg-left-bottom pb-1 text-black font-medium">Real-time Systems</span> defines the new standard for digital excellence.
                    </p>

                    <p ref={addToRefs}>
                        Now, let's explore how our methodology transforms complex challenges into elegant, high-impact solutions.
                    </p>
                </div>

                {/* CTA Button and Line */}
                <div className="mt-24 flex flex-col items-end">

                    <button ref={buttonRef} className="group relative inline-flex items-center gap-4 px-10 py-5 bg-black text-white rounded-full overflow-hidden transition-all hover:bg-brand-orange hover:shadow-2xl hover:shadow-brand-orange/30 hover:-translate-y-1">
                        <span className="relative z-10 font-bold tracking-[0.2em] text-sm uppercase">Let's Have a Look</span>
                        <span className="relative z-10 flex items-center justify-center w-8 h-8 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                            <i className="ri-arrow-down-line text-lg group-hover:translate-y-1 transition-transform"></i>
                        </span>
                    </button>

                    {/* <div className="w-full h-px bg-gray-200 mt-16 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-brand-orange transform -translate-x-full animate-[shimmer_3s_infinite]"></div>
                    </div> */}
                </div>

            </div>
        </section>
    );
};

export default MethodologyIntro;
