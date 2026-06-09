import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteContentApi } from '../../lib/api';

gsap.registerPlugin(ScrollTrigger);

const MethodologyIntro = () => {
    const sectionRef = useRef(null);
    const textRefs = useRef<HTMLElement[]>([]);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const { data: section } = useQuery({
        queryKey: ['page-section', 'methodology', 'intro'],
        queryFn: () => siteContentApi.section('methodology', 'intro'),
    });

    const c = section?.content as Record<string, unknown> | undefined;
    const paragraphs = (Array.isArray(c?.paragraphs) ? c.paragraphs : [
        "Our mission at The Web App Pro is to engineer scalable, future-proof digital ecosystems that empower your business to dominate its market.",
        "Precision is our hallmark. From initial concept to final deployment, we adhere to rigorous coding standards and architectural best practices.",
        "But we go beyond standard development. Our cutting-edge expertise in AI Integration, Cloud Native Tech, and Real-time Systems defines the new standard for digital excellence.",
        "Now, let's explore how our methodology transforms complex challenges into elegant, high-impact solutions.",
    ]) as string[];

    useEffect(() => {
        const ctx = gsap.context(() => {
            textRefs.current.forEach((text, index) => {
                if (!text) return;
                gsap.fromTo(text,
                    { opacity: 0, y: 50, filter: 'blur(10px)' },
                    {
                        opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out',
                        scrollTrigger: { trigger: text, start: 'top 85%', toggleActions: 'play none none reverse' },
                        delay: index * 0.1
                    }
                );
            });
            const highlights = gsap.utils.toArray('.highlight-text');
            highlights.forEach((highlight: unknown) => {
                gsap.fromTo(highlight as Element,
                    { backgroundSize: "0% 100%" },
                    { backgroundSize: "100% 100%", scrollTrigger: { trigger: highlight as Element, start: "top 80%", end: "top 20%", scrub: true } }
                );
            });
            if (buttonRef.current) {
                gsap.fromTo(buttonRef.current,
                    { scale: 0.8, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)', scrollTrigger: { trigger: buttonRef.current, start: 'top 90%' } }
                );
            }
        }, sectionRef);
        return () => ctx.revert();
    }, [paragraphs.length]);

    const addToRefs = (el: HTMLElement | null) => {
        if (el && !textRefs.current.includes(el)) textRefs.current.push(el);
    };

    return (
        <section ref={sectionRef} className="bg-white py-24 lg:pt-40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-orange/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="space-y-16 text-lg lg:text-2xl leading-relaxed text-gray-600 font-normal">
                    {paragraphs.map((para, i) => (
                        <p key={i} ref={addToRefs} className="relative">{para}</p>
                    ))}
                </div>
                {section?.cta_text && (
                    <div className="mt-24 flex flex-col items-end">
                        <button ref={buttonRef} type="button" className="group relative inline-flex items-center gap-4 px-10 py-5 bg-black text-white rounded-full overflow-hidden transition-all hover:bg-brand-orange hover:shadow-2xl hover:shadow-brand-orange/30 hover:-translate-y-1">
                            <span className="relative z-10 font-bold tracking-[0.2em] text-sm uppercase">{section.cta_text}</span>
                            <span className="relative z-10 flex items-center justify-center w-8 h-8 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                                <i className="ri-arrow-down-line text-lg group-hover:translate-y-1 transition-transform"></i>
                            </span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MethodologyIntro;
