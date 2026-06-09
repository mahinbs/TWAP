import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi, successStoriesApi } from '../../lib/api';
import type { SuccessStoriesItem } from '../../lib/api';

const InterviewsSection = () => {
  const { data: section } = useQuery({
    queryKey: ['page-section', 'success_stories', 'interviews'],
    queryFn: () => siteContentApi.section('success_stories', 'interviews'),
  });

  const { data: items = [] } = useQuery({
    queryKey: ['success-stories-items', 'interviews'],
    queryFn: () => successStoriesApi.items('interviews'),
  });

  const content = (section?.content ?? {}) as Record<string, string>;
  const highlight = content.title_highlight ?? 'Always Fresh.';
  const titleParts = (section?.title ?? 'Epic Conversations, Always Fresh.').split(highlight);

  const latest = items[0] as SuccessStoriesItem | undefined;
  const latestHref = latest?.slug ? `/interviews/${latest.slug}` : undefined;
  const heroImage = latest?.image_url ?? section?.media_url;

  return (
    <section id="interviews" className="py-24 bg-brand-dark text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            {latestHref ? (
              <Link to={latestHref} className="block relative rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl shadow-brand-orange/20">
                {heroImage && (
                  <img
                    src={heroImage}
                    alt={latest?.title ?? 'Founder Interview'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 right-10 flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <span className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center hover:scale-110 transition-transform flex-shrink-0">
                    <i className="ri-play-fill text-white text-2xl" />
                  </span>
                  <div>
                    <div className="text-xs text-gray-300 uppercase tracking-widest mb-1">{content.latest_episode_label ?? 'Latest Episode'}</div>
                    <div className="font-bold text-white text-sm line-clamp-1">{latest?.title ?? content.latest_episode_title ?? 'Latest Interview'}</div>
                  </div>
                  <div className="ml-auto">
                    <div className="flex gap-1 items-end h-8">
                      <div className="w-1 bg-brand-lime animate-music-bar animation-delay-0 rounded-full" />
                      <div className="w-1 bg-brand-lime animate-music-bar animation-delay-200 rounded-full" />
                      <div className="w-1 bg-brand-lime animate-music-bar animation-delay-400 rounded-full" />
                      <div className="w-1 bg-brand-lime animate-music-bar animation-delay-100 rounded-full" />
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl shadow-brand-orange/20 bg-white/5" />
            )}
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-brand-lime text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse" />
              {section?.subtitle ?? 'Interviews'}
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 !leading-tight">
              {titleParts[0]}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime to-brand-lime">{highlight}</span>
              {titleParts[1] ?? ''}
            </h2>

            <p className="text-gray-400 text-lg mb-10 leading-relaxed">{section?.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((interview) => {
                const href = interview.slug ? `/interviews/${interview.slug}` : undefined;
                const guest = interview.subtitle ?? interview.guest_title ?? '';
                const inner = (
                  <>
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 relative">
                      {interview.image_url && (
                        <img src={interview.image_url} alt={guest} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <i className="ri-play-fill text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-white text-sm group-hover:text-brand-lime transition-colors line-clamp-1 mb-1">{interview.title}</h4>
                      <p className="text-xs text-gray-400">with {guest}</p>
                    </div>
                  </>
                );

                return href ? (
                  <Link key={interview.id} to={href} className="group p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-brand-lime/30 transition-all flex items-center gap-4">
                    {inner}
                  </Link>
                ) : (
                  <div key={interview.id} className="group p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4 opacity-60">
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterviewsSection;
