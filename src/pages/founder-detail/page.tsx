import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import MediaPlayer from '../../components/ui/MediaPlayer';
import RichHtml from '../../components/ui/RichHtml';
import { founderStoriesApi } from '../../lib/api';
import { usePageSeoOverride } from '../../components/seo/SeoContext';

export default function FounderDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: founder, isLoading } = useQuery({
    queryKey: ['founder', slug],
    queryFn: () => founderStoriesApi.bySlug(slug!),
    enabled: Boolean(slug),
  });

  usePageSeoOverride(founder ? {
    title: `${founder.name} — Founder Story`,
    description: founder.bio ?? founder.answer,
    image: founder.avatar_url,
  } : undefined);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f7f5ef] via-white to-[#f7f5ef]">
        <Header />
        <div className="flex justify-center items-center h-96 pt-28">
          <div className="w-10 h-10 border-2 border-gray-200 border-t-[#f25a1a] rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!founder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f7f5ef] via-white to-[#f7f5ef]">
        <Header />
        <main className="pt-28 pb-16 flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-gray-500 mb-4">Founder story not found.</p>
          <Link to="/" className="text-[#f25a1a] underline">← Back to Home</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const gradient = founder.card_gradient ?? 'linear-gradient(150deg, #ecffbf 0%, #e1f97b 100%)';
  const hasMedia = Boolean(founder.youtube_id || founder.video_url || founder.audio_url);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f5ef] via-white to-[#f7f5ef]">
      <Header />
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#f25a1a] mb-8">
            <i className="ri-arrow-left-line" /> Back to Home
          </Link>

          <div className="rounded-[36px] p-8 sm:p-10 shadow-lg border border-white/60 mb-10" style={{ background: gradient }}>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {founder.avatar_url && (
                <img src={founder.avatar_url} alt={founder.name} className="w-28 h-28 rounded-2xl object-cover shadow-md" />
              )}
              <div>
                {founder.company && (
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase bg-[#1F2853]/10 text-[#1F2853] mb-2">
                    {founder.company}
                  </span>
                )}
                <h1 className="text-3xl sm:text-4xl font-bold text-[#1F2853] mb-1">{founder.name}</h1>
                {founder.title && <p className="text-gray-700">{founder.title}</p>}
                {founder.product_name && <p className="text-lg font-semibold text-[#1F2853] mt-2">{founder.product_name}</p>}
              </div>
            </div>
          </div>

          {hasMedia && (
            <div className="mb-10">
              <MediaPlayer
                youtubeId={founder.youtube_id}
                videoUrl={founder.video_url}
                audioUrl={founder.audio_url}
                poster={founder.avatar_url}
                title={founder.name}
              />
            </div>
          )}

          {founder.question && (
            <blockquote className="text-xl text-gray-700 italic border-l-4 border-[#f25a1a] pl-6 mb-8">
              &ldquo;{founder.question}&rdquo;
            </blockquote>
          )}

          {(founder.bio || founder.answer) && (
            <RichHtml html={founder.bio ?? founder.answer} className="text-gray-700 text-lg leading-relaxed mb-10" />
          )}

          {founder.transcript && (
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-[#1F2853] mb-4">Full Transcript</h2>
              <div className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 max-h-[500px] overflow-y-auto">
                <RichHtml html={founder.transcript} className="text-gray-700 leading-relaxed" />
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
