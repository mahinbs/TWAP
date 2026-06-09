import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import { appsApi } from '../../lib/api';
import { usePageSeoOverride } from '../../components/seo/SeoContext';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex text-[#FFD700] text-lg">
      {[...Array(5)].map((_, i) => (
        <i key={i} className={
          i < Math.floor(rating) ? 'ri-star-fill' :
          i < rating ? 'ri-star-half-fill' : 'ri-star-line'
        } />
      ))}
    </div>
  );
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [isMoreOpen, setIsMoreOpen] = useState(true);
  const [isTocOpen, setIsTocOpen] = useState(true);
  const [isTopicsOpen, setIsTopicsOpen] = useState(true);

  const { data: product, isLoading } = useQuery({
    queryKey: ['app', slug],
    queryFn: () => appsApi.bySlug(slug!),
    enabled: Boolean(slug),
  });

  usePageSeoOverride(product ? {
    title: (product as { meta_title?: string }).meta_title || product.name,
    description: (product as { meta_description?: string }).meta_description || product.tagline,
    image: (product as { og_image_url?: string }).og_image_url || product.logo_url,
    noindex: (product as { noindex?: boolean }).noindex,
  } : undefined);

  if (isLoading) return (
    <div className="min-h-screen bg-[#fffbf5] font-['Poppins']">
      <Header />
      <div className="flex justify-center items-center h-96">
        <div className="w-10 h-10 border-2 border-gray-200 border-t-[#f25a1a] rounded-full animate-spin" />
      </div>
      <Footer />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-[#fffbf5] font-['Poppins']">
      <Header />
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <p className="text-gray-500 text-lg">App not found.</p>
        <Link to="/directory" className="text-[#f25a1a] underline">Browse the Directory</Link>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fffbf5] font-['Poppins']">
      <Header />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left — Main Content */}
            <div className="lg:col-span-8">
              {/* Header card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-orange-50 flex items-center justify-center p-2 overflow-hidden">
                      {product.logo_url
                        ? <img src={product.logo_url} alt={product.name} className="w-full h-full object-contain" />
                        : <span className="text-2xl font-bold text-[#f25a1a]">{product.name[0]}</span>
                      }
                    </div>
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2853] font-['Manrope'] mb-2">{product.name}</h1>
                      {product.tagline && <p className="text-sm text-gray-500 mb-2">{product.tagline}</p>}
                      <div className="flex items-center gap-2">
                        <StarRating rating={product.rating ?? 0} />
                        <span className="font-semibold text-gray-700">{product.rating?.toFixed(1) ?? '—'}</span>
                        {product.review_count ? <span className="text-xs text-gray-400">({product.review_count.toLocaleString()} reviews)</span> : null}
                      </div>
                    </div>
                  </div>
                  {product.website_url && (
                    <a href={product.website_url} target="_blank" rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-[#E50914] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#c40812] transition-colors text-center shadow-lg shadow-red-200">
                      Visit Website
                    </a>
                  )}
                </div>
              </div>

              {/* Pros & Cons */}
              {((product.pros ?? []).length > 0 || (product.cons ?? []).length > 0) && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8">
                  <h2 className="text-xl font-bold text-[#1F2853] mb-6 font-['Manrope']">Pros &amp; Cons</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="bg-[#E8F5E9] px-4 py-2 rounded-t-lg border-l-4 border-[#4CAF50] mb-4">
                        <span className="font-bold text-[#2E7D32]">Pros</span>
                      </div>
                      <ul className="space-y-4">
                        {(product.pros ?? []).map((pro, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full border border-[#4CAF50] flex items-center justify-center mt-0.5 flex-shrink-0 text-[#4CAF50]">
                              <i className="ri-thumb-up-fill text-xs" />
                            </div>
                            <span className="text-sm text-gray-600 leading-relaxed">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="bg-[#FFEBEE] px-4 py-2 rounded-t-lg border-l-4 border-[#EF5350] mb-4">
                        <span className="font-bold text-[#C62828]">Cons</span>
                      </div>
                      <ul className="space-y-4">
                        {(product.cons ?? []).map((con, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full border border-[#EF5350] flex items-center justify-center mt-0.5 flex-shrink-0 text-[#EF5350]">
                              <i className="ri-thumb-down-fill text-xs" />
                            </div>
                            <span className="text-sm text-gray-600 leading-relaxed">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Why You'll Love It */}
              {product.why_you_love_it && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8">
                  <h2 className="text-xl font-bold text-[#1F2853] mb-4 font-['Manrope']">Why You'll Love It</h2>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{product.why_you_love_it}</p>
                </div>
              )}

              {/* Description — collapsible */}
              {product.description && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 overflow-hidden">
                  <div className="flex items-center justify-between cursor-pointer group" onClick={() => setIsMoreOpen(o => !o)}>
                    <h2 className="text-xl font-bold text-[#1F2853] font-['Manrope']">More about {product.name}</h2>
                    <i className={`ri-arrow-down-s-line text-2xl text-gray-400 group-hover:text-[#f25a1a] transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`} />
                  </div>
                  <div className={`grid transition-all duration-300 ease-in-out ${isMoreOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                    <div className="overflow-hidden">
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{product.description}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right — Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Table of Contents */}
              {(product.table_of_content ?? []).length > 0 && (
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 overflow-hidden">
                  <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsTocOpen(o => !o)}>
                    <span className="font-bold text-[#1F2853]">Table of Content</span>
                    <i className={`ri-arrow-down-s-line text-gray-500 transition-transform duration-300 ${isTocOpen ? 'rotate-180' : ''}`} />
                  </div>
                  <div className={`grid transition-all duration-300 ease-in-out ${isTocOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                    <div className="overflow-hidden">
                      <ul className="space-y-2 text-sm text-gray-600">
                        {(product.table_of_content ?? []).map((item, i) => (
                          <li key={i} className="hover:text-[#f25a1a] cursor-pointer transition-colors flex items-center gap-2">
                            <i className="ri-arrow-right-s-line text-xs text-gray-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Topics */}
              {(product.recent_topics ?? []).length > 0 && (
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 overflow-hidden">
                  <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsTopicsOpen(o => !o)}>
                    <span className="font-bold text-[#1F2853]">Recent Topics</span>
                    <i className={`ri-arrow-down-s-line text-gray-500 transition-transform duration-300 ${isTopicsOpen ? 'rotate-180' : ''}`} />
                  </div>
                  <div className={`grid transition-all duration-300 ease-in-out ${isTopicsOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                    <div className="overflow-hidden">
                      <ul className="space-y-2 text-sm text-gray-600">
                        {(product.recent_topics ?? []).map((topic, i) => (
                          <li key={i} className="hover:text-[#f25a1a] cursor-pointer transition-colors flex items-center gap-2">
                            <i className="ri-hashtag text-xs text-gray-400" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Download buttons */}
              {(product.downloads_ios || product.downloads_android) && (
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-2">
                  <p className="font-bold text-[#1F2853] mb-3">Download</p>
                  {product.downloads_ios && (
                    <a href={product.downloads_ios} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl hover:bg-black transition-colors w-full font-medium text-sm">
                      <i className="ri-apple-fill text-lg" /> App Store
                    </a>
                  )}
                  {product.downloads_android && (
                    <a href={product.downloads_android} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl hover:bg-black transition-colors w-full font-medium text-sm">
                      <i className="ri-google-play-fill text-lg" /> Google Play
                    </a>
                  )}
                </div>
              )}

              {/* Feature Your Product CTA */}
              <Link to="/promote"
                className="block w-full bg-[#E50914] text-white py-4 rounded-2xl font-bold hover:bg-[#c40812] transition-colors shadow-lg shadow-red-200 hover:shadow-xl hover:scale-[1.02] duration-300 text-center">
                Feature Your Product
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
