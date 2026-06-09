import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { siteContentApi, toolsApi } from "../../lib/api";

const FALLBACK_AVATARS = [
  { src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80", position: "top-[15%] left-[10%] md:left-[15%]", size: "w-12 h-12 md:w-16 md:h-16" },
  { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80", position: "top-[25%] left-[5%] md:left-[8%]", size: "w-10 h-10 md:w-14 md:h-14" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80", position: "bottom-[30%] left-[8%] md:left-[12%]", size: "w-14 h-14 md:w-20 md:h-20" },
  { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80", position: "bottom-[15%] left-[15%] md:left-[20%]", size: "w-10 h-10 md:w-12 md:h-12" },
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80", position: "top-[12%] right-[10%] md:right-[15%]", size: "w-12 h-12 md:w-16 md:h-16" },
  { src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&h=100&q=80", position: "top-[30%] right-[5%] md:right-[8%]", size: "w-10 h-10 md:w-12 md:h-12" },
  { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80", position: "bottom-[35%] right-[10%] md:right-[15%]", size: "w-14 h-14 md:w-18 md:h-18" },
  { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80", position: "bottom-[15%] right-[15%] md:right-[20%]", size: "w-12 h-12 md:w-16 md:h-16" },
];

export default function ReadyToStartCta() {
  const { data: ctaSection } = useQuery({
    queryKey: ['page-section', 'tools', 'cta'],
    queryFn: () => siteContentApi.section('tools', 'cta'),
  });

  const { data: avatarItems = [] } = useQuery({
    queryKey: ['tools-items', 'cta_avatars'],
    queryFn: () => toolsApi.items('cta_avatars'),
  });

  const heading = ctaSection?.title ?? 'Ready to get started?';
  const description = ctaSection?.description ?? 'Join thousands of developers and designers who are already building the future with our top-rated tools and resources.';
  const ctaText = ctaSection?.cta_text ?? 'Get Started';
  const ctaUrl = ctaSection?.cta_url ?? '/promote';

  const avatars = avatarItems.length > 0
    ? avatarItems.map(item => {
        const ex = (item.extras ?? {}) as Record<string, string>;
        return {
          src: item.image_url ?? '',
          position: ex.position ?? '',
          size: ex.size ?? 'w-12 h-12',
        };
      })
    : FALLBACK_AVATARS;

  return (
    <section className="relative bg-gray-50 py-32 overflow-hidden">
      {avatars.map((avatar, index) => (
        <div key={index} className={`absolute ${avatar.position} rounded-full overflow-hidden border-2 border-white shadow-sm hover:scale-110 transition-transform duration-300 z-10 block md:opacity-100 opacity-50`}>
          {avatar.src && <img src={avatar.src} alt="User" className={`${avatar.size} object-cover`} />}
        </div>
      ))}

      <div className="max-w-3xl mx-auto px-4 relative z-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6 tracking-tight">
          {heading}
        </h2>
        <p className="text-gray-600 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>

        <Link
          to={ctaUrl}
          className="inline-flex items-center gap-2 px-8 py-4 bg-brand-dark text-white text-sm font-bold rounded-xl hover:bg-brand-orange transition-all hover:gap-3 shadow-lg hover:shadow-xl"
        >
          {ctaText} <i className="ri-arrow-right-line" />
        </Link>
      </div>
    </section>
  );
}
