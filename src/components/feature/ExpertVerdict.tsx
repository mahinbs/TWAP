import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi } from '../../lib/api';

const FALLBACK_TITLE = 'Our Verdict: We Test AI Tools';
const FALLBACK_DESC  = 'Our expert team rigorously tests every AI tool to provide you with honest, unbiased reviews that help you make informed decisions.';
const FALLBACK_REVIEW = {
  name: 'Sarah Mitchell',
  role: 'Lead Product Reviewer',
  topic: 'ChatGPT Plus',
  quote: '"ChatGPT Plus delivers exceptional performance with faster response times and priority access. The advanced reasoning capabilities make it worth the subscription for professionals who rely on AI for complex tasks."',
  avatar_url: 'https://readdy.ai/api/search-image?query=Professional%20expert%20headshot%2C%20middle-aged%20technology%20analyst%2C%20confident%20expression%2C%20business%20attire%2C%20clean%20background%2C%20professional%20portrait%20photography%2C%20tech%20industry%20expert%2C%20trustworthy%20appearance&width=80&height=80&seq=expert-profile&orientation=squarish',
  badge_text: "Editor's Pick",
};

export default function ExpertVerdict() {
  const { data: section } = useQuery({
    queryKey: ['page-section', 'home', 'expert_verdict'],
    queryFn: () => siteContentApi.section('home', 'expert_verdict'),
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ['expert-reviews'],
    queryFn: siteContentApi.expertReviews,
  });

  const title = section?.title ?? FALLBACK_TITLE;
  const description = section?.description ?? FALLBACK_DESC;

  const review = reviews[0] ?? FALLBACK_REVIEW;
  const reviewName = review.name;
  const reviewRole = review.role ?? FALLBACK_REVIEW.role;
  const reviewTopic = review.topic;
  const reviewQuote = review.quote ?? FALLBACK_REVIEW.quote;
  const reviewAvatar = review.avatar_url ?? FALLBACK_REVIEW.avatar_url;
  const reviewBadge = review.badge_text ?? FALLBACK_REVIEW.badge_text;
  const reviewSlug = (review as { slug?: string }).slug;

  const content = reviewSlug ? (
    <Link to={`/expert-reviews/${reviewSlug}`} className="bg-[#f7f5ef] rounded-lg p-8 block hover:shadow-md transition-shadow">
      <CardInner badge={reviewBadge} avatar={reviewAvatar} name={reviewName} role={reviewRole} topic={reviewTopic} quote={reviewQuote} />
    </Link>
  ) : (
    <div className="bg-[#f7f5ef] rounded-lg p-8">
      <CardInner badge={reviewBadge} avatar={reviewAvatar} name={reviewName} role={reviewRole} topic={reviewTopic} quote={reviewQuote} />
    </div>
  );

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1F2853] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
              {title}
            </h2>

            <p className="text-lg text-gray-600 mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {description}
            </p>
          </div>

          {/* Right Content - Expert Profile */}
          {content}
        </div>
      </div>
    </section>
  );
}

function CardInner({
  badge, avatar, name, role, topic, quote,
}: { badge?: string; avatar: string; name: string; role: string; topic?: string; quote: string }) {
  return (
    <>
      {badge && (
        <div className="inline-block bg-[#1F2853] text-white px-4 py-2 rounded-md text-sm font-medium mb-6">
          {badge}
        </div>
      )}

      <div className="flex items-start gap-4">
        <img
          src={avatar}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-bold text-[#1F2853] mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {name}
          </h3>
          <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {role}
          </p>
          {topic && (
            <p className="text-sm text-[#f25a1a] font-medium mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Reviewing: {topic}
            </p>
          )}
          <p className="text-gray-700 text-sm leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {quote}
          </p>
        </div>
      </div>
    </>
  );
}
