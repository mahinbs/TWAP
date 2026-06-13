import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi } from '../../lib/api';
import type { FounderStory } from '../../lib/api';

const FALLBACK_TITLE = 'Founder Stories';
const FALLBACK_DESC  = 'Straight from the minds behind the apps';

export default function FounderStories() {
  const { data: section } = useQuery({
    queryKey: ['page-section', 'home', 'founder'],
    queryFn: () => siteContentApi.section('home', 'founder'),
  });

  const { data: founders = [] } = useQuery({
    queryKey: ['founder-stories'],
    queryFn: siteContentApi.founderStories,
  });

  if (founders.length === 0) return null;

  const c = (section?.content ?? {}) as Record<string, string>;
  const title = section?.title ?? FALLBACK_TITLE;
  const description = section?.description ?? FALLBACK_DESC;
  const ctaText = c.cta_button_text ?? section?.cta_text ?? 'Share Your Story';
  const ctaUrl  = c.cta_button_url ?? section?.cta_url ?? '/promote';

  return (
    <section className="py-16 bg-gradient-to-br from-[#f7f5ef] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2853] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {title}
          </h2>
          <p className="text-lg text-gray-600 mb-12" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {(founders as FounderStory[]).map((founder) => {
            const detailUrl = founder.slug ? `/founders/${founder.slug}` : undefined;
            const wrapperProps = detailUrl
              ? { as: 'link' as const, to: detailUrl }
              : { as: 'div' as const };
            const Card = (
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                {/* Video Thumbnail */}
                {founder.video_thumbnail_url && (
                  <div className="relative overflow-hidden">
                    <img
                      src={founder.video_thumbnail_url}
                      alt={`${founder.product_name ?? founder.name} demo`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer">
                        <div className="w-6 h-6 flex items-center justify-center text-[#f25a1a]">
                          <i className="ri-play-fill text-xl"></i>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#f25a1a] text-white px-3 py-1 rounded-full text-sm font-medium">
                        Interview
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {/* Founder Info */}
                  <div className="flex items-center mb-4">
                    {founder.avatar_url && (
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#f25a1a] mr-4">
                        <img
                          src={founder.avatar_url}
                          alt={founder.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-[#1F2853]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {founder.name}
                      </h3>
                      {founder.title && (
                        <p className="text-sm text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {founder.title}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Product Name */}
                  {founder.product_name && (
                    <div className="mb-4">
                      <span className="text-[#f25a1a] font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {founder.product_name}
                      </span>
                    </div>
                  )}

                  {/* Interview Question */}
                  <div className="mb-4">
                    {founder.question && (
                      <h4 className="text-[#1F2853] font-semibold mb-2 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        "{founder.question}"
                      </h4>
                    )}

                    {founder.answer && (
                      <p className="text-gray-700 text-sm leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {founder.answer}
                      </p>
                    )}
                  </div>

                  {/* Company Badge */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {founder.company}
                    </span>
                    <div className="flex items-center text-[#f25a1a] text-xs font-medium cursor-pointer hover:text-[#d14815] transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Watch Full Interview
                      <div className="w-3 h-3 flex items-center justify-center ml-1">
                        <i className="ri-external-link-line"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
            return wrapperProps.as === 'link' ? (
              <Link key={founder.id} to={wrapperProps.to}>{Card}</Link>
            ) : (
              <div key={founder.id}>{Card}</div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to={ctaUrl}
            className="inline-block bg-gradient-to-r from-[#f25a1a] to-[#ff7043] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
