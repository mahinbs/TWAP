import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import { appsApi } from '../../lib/api';
import { usePageSeoOverride } from '../../components/seo/SeoContext';

const FALLBACK_ICON = '/assets/product_spotlight.png';

function Collapsible({ title, open, onToggle, children, compact = false }: {
  title: string; open: boolean; onToggle: () => void; children: React.ReactNode; compact?: boolean;
}) {
  return (
    <div className={`bg-white shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 ${compact ? 'rounded-2xl p-4' : 'rounded-3xl p-6 sm:p-8'}`}>
      <button type="button" className="w-full flex items-center justify-between cursor-pointer group text-left" onClick={onToggle} aria-expanded={open}>
        {compact
          ? <span className="font-bold text-[#1F2853]">{title}</span>
          : <h2 className="text-xl font-bold text-[#1F2853] font-['Manrope']">{title}</h2>}
        <i className={`ri-arrow-down-s-line ${compact ? 'text-gray-500' : 'text-2xl text-gray-400 group-hover:text-[#f25a1a]'} transition-transform duration-300 ${open ? 'rotate-180' : ''}`}></i>
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${open ? `grid-rows-[1fr] opacity-100 ${compact ? 'mt-3' : 'mt-4'}` : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: product, isLoading } = useQuery({
    queryKey: ['app', slug],
    queryFn: () => (slug ? appsApi.bySlug(slug) : Promise.resolve(null)),
    enabled: !!slug,
  });

  const { data: spotlight } = useQuery({
    queryKey: ['apps', 'spotlight', product?.id],
    queryFn: async () => {
      const featured = await appsApi.featured(4);
      return featured.find((a) => a.id !== product?.id) ?? null;
    },
    enabled: !!product,
  });

  usePageSeoOverride(product ? {
    title: `${product.name} Review`,
    description: product.tagline ?? product.description?.slice(0, 160),
    image: product.hero_image_url ?? product.logo_url,
  } : undefined);

  const [isMoreOpen, setIsMoreOpen] = useState(true);
  const [isTableContentOpen, setIsTableContentOpen] = useState(true);
  const [isRecentTopicsOpen, setIsRecentTopicsOpen] = useState(true);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fffbf5] font-['Poppins']">
        <Header />
        <main className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse" aria-busy="true">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 mb-8 flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-gray-200" />
              <div className="space-y-3"><div className="h-7 w-48 bg-gray-200 rounded" /><div className="h-4 w-32 bg-gray-100 rounded" /></div>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-gray-100 h-64" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#fffbf5] font-['Poppins']">
        <Header />
        <main className="pt-32 pb-20 flex items-center justify-center px-4 min-h-[70vh]">
          <div className="text-center max-w-md">
            <p className="text-5xl font-black text-gray-200 mb-4">404</p>
            <h1 className="text-2xl font-bold text-[#1F2853] mb-2">Product not found</h1>
            <p className="text-gray-500 mb-8">This product may have been unpublished or the link is incorrect.</p>
            <Link to="/directory" className="inline-flex items-center gap-2 bg-[#f25a1a] hover:bg-[#d94e16] text-white px-6 py-3 rounded-full font-semibold transition-colors">
              <i className="ri-arrow-left-line"></i> Browse the directory
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const rating = Number(product.rating ?? 0);
  const pros = product.pros ?? [];
  const cons = product.cons ?? [];
  const tableOfContent = product.table_of_content ?? [];
  const recentTopics = product.recent_topics ?? [];
  const websiteUrl = product.website_url && product.website_url !== '#' ? product.website_url : null;

  return (
    <div className="min-h-screen bg-[#fffbf5] font-['Poppins']">
      <Header />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-gray-500 flex items-center gap-2" aria-label="Breadcrumb">
            <Link to="/directory" className="hover:text-[#f25a1a] transition-colors">Directory</Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            {product.category && (
              <>
                <span>{product.category}</span>
                <i className="ri-arrow-right-s-line text-gray-400"></i>
              </>
            )}
            <span className="text-[#1F2853] font-medium">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left Column - Main Content */}
            <div className="lg:col-span-8">
              {/* Product Header */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-orange-50 flex items-center justify-center p-2 overflow-hidden shrink-0">
                      <img
                        src={product.logo_url || FALLBACK_ICON}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2853] font-['Manrope'] mb-2">
                        {product.name}
                      </h1>
                      {product.tagline && <p className="text-sm text-gray-500 mb-2">{product.tagline}</p>}
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex text-[#FFD700] text-lg" aria-label={`Rated ${rating} out of 5`}>
                          {[0, 1, 2, 3, 4].map((i) => (
                            <i
                              key={i}
                              className={i < Math.floor(rating) ? 'ri-star-fill' : (i < rating ? 'ri-star-half-fill' : 'ri-star-line')}
                            ></i>
                          ))}
                        </div>
                        <span className="font-semibold text-gray-700">{rating.toFixed(1)}</span>
                        {typeof product.review_count === 'number' && product.review_count > 0 && (
                          <span className="text-sm text-gray-400">({product.review_count.toLocaleString()} reviews)</span>
                        )}
                        {product.pricing && (
                          <span className="ml-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#f25a1a]/10 text-[#f25a1a] border border-[#f25a1a]/20">{product.pricing}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {websiteUrl ? (
                    <a
                      href={websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-[#E50914] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#c40812] transition-colors text-center shadow-lg shadow-red-200"
                    >
                      Visit Website
                    </a>
                  ) : (
                    <Link
                      to="/promote"
                      className="w-full sm:w-auto bg-[#E50914] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#c40812] transition-colors text-center shadow-lg shadow-red-200"
                    >
                      Claim this listing
                    </Link>
                  )}
                </div>
                {(product.badges?.length || product.tags?.length) ? (
                  <div className="flex flex-wrap gap-2 mt-6">
                    {(product.tags ?? []).map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-50 border border-gray-200 text-gray-600">#{tag}</span>
                    ))}
                  </div>
                ) : null}
              </div>

              {/* Pros & Cons */}
              {(pros.length > 0 || cons.length > 0) && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8">
                  <h2 className="text-xl font-bold text-[#1F2853] mb-6 font-['Manrope']">Pros & Cons</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="bg-[#E8F5E9] px-4 py-2 rounded-t-lg border-l-4 border-[#4CAF50] mb-4">
                        <span className="font-bold text-[#2E7D32]">Pros</span>
                      </div>
                      <ul className="space-y-4">
                        {pros.map((pro, index) => (
                          <li key={`${pro}-${index}`} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full border border-[#4CAF50] flex items-center justify-center mt-0.5 flex-shrink-0 text-[#4CAF50]">
                              <i className="ri-thumb-up-fill text-xs"></i>
                            </div>
                            <span className="text-sm text-gray-600 leading-relaxed">{pro}</span>
                          </li>
                        ))}
                        {pros.length === 0 && <li className="text-sm text-gray-400 italic">No pros listed yet.</li>}
                      </ul>
                    </div>

                    <div>
                      <div className="bg-[#FFEBEE] px-4 py-2 rounded-t-lg border-l-4 border-[#EF5350] mb-4">
                        <span className="font-bold text-[#C62828]">Cons</span>
                      </div>
                      <ul className="space-y-4">
                        {cons.map((con, index) => (
                          <li key={`${con}-${index}`} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full border border-[#EF5350] flex items-center justify-center mt-0.5 flex-shrink-0 text-[#EF5350]">
                              <i className="ri-thumb-down-fill text-xs"></i>
                            </div>
                            <span className="text-sm text-gray-600 leading-relaxed">{con}</span>
                          </li>
                        ))}
                        {cons.length === 0 && <li className="text-sm text-gray-400 italic">No cons listed yet.</li>}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Why You'll Love It */}
              {product.why_you_love_it && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8">
                  <h2 className="text-xl font-bold text-[#1F2853] mb-4 font-['Manrope']">Why You'll Love It</h2>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                    {product.why_you_love_it}
                  </p>
                </div>
              )}

              {/* More about product */}
              {product.description && (
                <Collapsible title="More about product" open={isMoreOpen} onToggle={() => setIsMoreOpen((v) => !v)}>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                    {product.description}
                  </p>
                </Collapsible>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {tableOfContent.length > 0 && (
                <Collapsible compact title="Table of Content" open={isTableContentOpen} onToggle={() => setIsTableContentOpen((v) => !v)}>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {tableOfContent.map((item, index) => (
                      <li key={`${item}-${index}`} className="hover:text-[#f25a1a] transition-colors flex items-center gap-2">
                        <i className="ri-arrow-right-s-line text-xs text-gray-400"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Collapsible>
              )}

              {recentTopics.length > 0 && (
                <Collapsible compact title="Recent Topics" open={isRecentTopicsOpen} onToggle={() => setIsRecentTopicsOpen((v) => !v)}>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {recentTopics.map((topic, index) => (
                      <li key={`${topic}-${index}`} className="hover:text-[#f25a1a] transition-colors flex items-center gap-2">
                        <i className="ri-hashtag text-xs text-gray-400"></i>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </Collapsible>
              )}

              {/* Quick facts */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <span className="font-bold text-[#1F2853]">Quick facts</span>
                <dl className="mt-3 space-y-2 text-sm">
                  {product.category && (<div className="flex justify-between gap-4"><dt className="text-gray-500">Category</dt><dd className="text-gray-800 font-medium text-right">{product.category}</dd></div>)}
                  {product.pricing && (<div className="flex justify-between gap-4"><dt className="text-gray-500">Pricing</dt><dd className="text-gray-800 font-medium text-right">{product.pricing}{product.price_detail ? ` · ${product.price_detail}` : ''}</dd></div>)}
                  {product.downloads_ios && (<div className="flex justify-between gap-4"><dt className="text-gray-500">iOS downloads</dt><dd className="text-gray-800 font-medium text-right">{product.downloads_ios}</dd></div>)}
                  {product.downloads_android && (<div className="flex justify-between gap-4"><dt className="text-gray-500">Android downloads</dt><dd className="text-gray-800 font-medium text-right">{product.downloads_android}</dd></div>)}
                </dl>
              </div>

              {/* Product of the Month Banner */}
              {spotlight && (
                <Link to={`/products/${spotlight.slug}`} className="block rounded-3xl overflow-hidden relative aspect-square group cursor-pointer shadow-md bg-[#1F2853]">
                  <img
                    src={spotlight.hero_image_url || spotlight.logo_url || FALLBACK_ICON}
                    alt={spotlight.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                    <div className="bg-white/20 backdrop-blur-md self-start px-3 py-1 rounded-lg text-xs font-bold mb-2 border border-white/30 transform -rotate-2">
                      FEATURED PRODUCT
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{spotlight.name}</h3>
                    {spotlight.tagline && <p className="text-sm text-white/80 mb-4 line-clamp-2">{spotlight.tagline}</p>}
                    <span className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm w-fit flex items-center gap-2 group-hover:bg-gray-100 transition-colors">
                      Know More
                      <i className="ri-arrow-right-line"></i>
                    </span>
                  </div>
                </Link>
              )}

              {/* Feature Your Product CTA */}
              <Link to="/promote" className="block text-center w-full bg-[#E50914] text-white py-4 rounded-2xl font-bold hover:bg-[#c40812] transition-colors shadow-lg shadow-red-200 hover:shadow-xl hover:scale-[1.02] duration-300">
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
