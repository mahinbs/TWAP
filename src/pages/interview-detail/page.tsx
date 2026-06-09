import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import MediaPlayer, { formatDuration } from '../../components/ui/MediaPlayer';
import RichHtml from '../../components/ui/RichHtml';
import { successStoriesApi } from '../../lib/api';
import { usePageSeoOverride } from '../../components/seo/SeoContext';

export default function InterviewDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: interview, isLoading } = useQuery({
    queryKey: ['interview', slug],
    queryFn: () => successStoriesApi.interviewBySlug(slug!),
    enabled: Boolean(slug),
  });

  usePageSeoOverride(interview ? {
    title: `${interview.title} — Founder Interview`,
    description: interview.description ?? `Interview with ${interview.subtitle ?? interview.guest_title ?? 'guest'}`,
    image: interview.image_url,
  } : undefined);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-dark text-white">
        <Header />
        <div className="flex justify-center items-center h-96 pt-28">
          <div className="w-10 h-10 border-2 border-white/20 border-t-brand-lime rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="min-h-screen bg-brand-dark text-white">
        <Header />
        <main className="pt-28 pb-16 flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-gray-400 mb-4">Interview not found.</p>
          <Link to="/interviews-success-stories#interviews" className="text-brand-lime underline">← Back to Interviews</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const guestName = interview.subtitle ?? interview.guest_title ?? '';
  const duration = formatDuration(interview.duration_seconds);
  const hasMedia = Boolean(interview.youtube_id || interview.video_url || interview.audio_url);

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <Header />
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto">
          <Link to="/interviews-success-stories#interviews" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-brand-lime mb-8 transition-colors">
            <i className="ri-arrow-left-line" /> Back to Interviews
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-brand-lime text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse" />
            Founder Interview
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{interview.title}</h1>

          <div className="flex flex-wrap items-center gap-4 mb-10 text-gray-400 text-sm">
            {guestName && (
              <span className="flex items-center gap-2">
                {interview.image_url && (
                  <img src={interview.image_url} alt="" className="w-8 h-8 rounded-full object-cover" />
                )}
                with <strong className="text-white">{guestName}</strong>
              </span>
            )}
            {interview.guest_title && <span>{interview.guest_title}</span>}
            {interview.guest_company && <span>{interview.guest_company}</span>}
            {duration && <span>{duration}</span>}
          </div>

          {hasMedia ? (
            <MediaPlayer
              youtubeId={interview.youtube_id}
              videoUrl={interview.video_url}
              audioUrl={interview.audio_url}
              poster={interview.image_url}
              title={interview.title}
            />
          ) : interview.image_url ? (
            <img src={interview.image_url} alt={guestName} className="w-full rounded-2xl aspect-video object-cover" />
          ) : null}

          {interview.guest_bio && (
            <div className="mt-10 p-6 rounded-2xl bg-white/5 border border-white/10">
              <h2 className="text-lg font-bold text-brand-lime mb-2">About {guestName}</h2>
              <RichHtml html={interview.guest_bio} className="text-gray-300 leading-relaxed" />
            </div>
          )}

          {interview.description && (
            <div className="mt-10">
              <RichHtml html={interview.description} className="text-gray-300 text-lg leading-relaxed" />
            </div>
          )}

          {interview.transcript && (
            <section className="mt-14">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <i className="ri-file-text-line text-brand-lime" />
                Transcript
              </h2>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8 max-h-[600px] overflow-y-auto">
                <RichHtml html={interview.transcript} className="text-gray-300 leading-relaxed space-y-4" />
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
