import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import RichHtml from '../../components/ui/RichHtml';
import { expertReviewsApi } from '../../lib/api';
import { usePageSeoOverride } from '../../components/seo/SeoContext';

export default function ExpertReviewDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: review, isLoading } = useQuery({
    queryKey: ['expert-review', slug],
    queryFn: () => expertReviewsApi.bySlug(slug!),
    enabled: Boolean(slug),
  });

  usePageSeoOverride(review ? {
    title: `${review.topic ?? 'Review'} — Expert Verdict`,
    description: review.quote,
    image: review.avatar_url,
  } : undefined);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F6F6F6]">
        <Header />
        <div className="flex justify-center items-center h-96 pt-28">
          <div className="w-10 h-10 border-2 border-gray-200 border-t-teal-700 rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!review) {
    return (
      <div className="min-h-screen bg-[#F6F6F6]">
        <Header />
        <main className="pt-28 pb-16 flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-gray-500 mb-4">Expert review not found.</p>
          <Link to="/" className="text-teal-700 underline">← Back to Home</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <Header />
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-teal-700 mb-8">
            <i className="ri-arrow-left-line" /> Back to Home
          </Link>

          {review.badge_text && (
            <span className="inline-block bg-teal-700 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
              {review.badge_text}
            </span>
          )}

          {review.topic && (
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">{review.topic}</h1>
          )}

          <div className="flex items-center gap-4 mb-8 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
            {review.avatar_url && (
              <img src={review.avatar_url} alt={review.name} className="w-16 h-16 rounded-full object-cover" />
            )}
            <div>
              <p className="font-bold text-gray-900">{review.name}</p>
              {review.role && <p className="text-sm text-gray-500">{review.role}</p>}
            </div>
          </div>

          <blockquote className="text-xl text-gray-700 italic border-l-4 border-teal-700 pl-6 mb-8">
            &ldquo;{review.quote}&rdquo;
          </blockquote>

          {review.full_review && review.full_review !== review.quote && (
            <RichHtml html={review.full_review} className="text-gray-700 leading-relaxed prose-lg" />
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
