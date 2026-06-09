import { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import { blogsApi } from '../../lib/api';
import { usePageSeoOverride } from '../../components/seo/SeoContext';

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const carouselRef = useRef<HTMLDivElement>(null);

  const { data: post, isLoading } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => blogsApi.bySlug(slug!),
    enabled: Boolean(slug),
  });

  // Related / recent posts for "Read Next" carousel
  const { data: related = [] } = useQuery({
    queryKey: ['blogs', 'recent'],
    queryFn: () => blogsApi.recent(6),
    enabled: Boolean(post),
  });

  usePageSeoOverride(post ? {
    title: (post as { meta_title?: string }).meta_title || post.title,
    description: (post as { meta_description?: string }).meta_description || post.excerpt,
    image: (post as { og_image_url?: string }).og_image_url || post.hero_image_url,
    noindex: (post as { noindex?: boolean }).noindex,
  } : undefined);

  const scrollCarousel = (dir: 'left' | 'right') => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir === 'left' ? -336 : 336, behavior: 'smooth' });
  };

  if (isLoading) return (
    <div className="min-h-screen bg-[#F6F6F6] font-sans text-gray-800">
      <Header />
      <div className="flex justify-center items-center h-96">
        <div className="w-10 h-10 border-2 border-gray-200 border-t-teal-700 rounded-full animate-spin" />
      </div>
      <Footer />
    </div>
  );

  if (!post) return (
    <div className="min-h-screen bg-[#F6F6F6] font-sans text-gray-800">
      <Header />
      <main className="min-h-screen bg-[#F6F6F6] pt-28 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Blog post not found.</p>
          <Link to="/resource-centre/blogs" className="text-teal-700 underline">← Back to Blog</Link>
        </div>
      </main>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F6F6F6] font-sans text-gray-800">
      <Header />
      <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <article className="max-w-5xl mx-auto">

          {/* Meta */}
          <div className="mb-6">
            {post.category && (
              <span className="inline-block bg-teal-700 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">{post.category}</span>
            )}
            <p className="text-gray-500 text-sm">
              {post.published_date ? new Date(post.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
              {post.read_time_minutes ? ` · ${post.read_time_minutes} min read` : ''}
              {post.author?.name ? ` · by ${post.author.name}` : ''}
            </p>
          </div>

          {/* Hero block */}
          <div className="bg-[#F8F8F8] rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-10 border border-gray-200/60 shadow-sm">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-4">{post.title}</h1>
            {post.excerpt && <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">{post.excerpt}</p>}
            {post.hero_image_url && (
              <div className="rounded-lg sm:rounded-xl overflow-hidden shadow-md">
                <img src={post.hero_image_url} alt={post.title} className="w-full h-auto object-cover aspect-video" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="space-y-8">
            {post.subheading && <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">{post.subheading}</h2>}
            {post.intro_paragraph && <p className="text-gray-700 leading-relaxed text-base sm:text-lg">{post.intro_paragraph}</p>}

            {/* What You'll Learn */}
            {(post.what_you_learn ?? []).length > 0 && (
              <section>
                <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">What You'll Learn:</h3>
                <div className="space-y-6">
                  {(post.what_you_learn ?? []).map((point, i) => (
                    <div key={i} className="space-y-1">
                      <h4 className="font-bold text-gray-900 text-base sm:text-lg">{point.title}:</h4>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base pl-0 sm:pl-1">{point.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Full body HTML */}
            {post.body_content && (
              <div
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: post.body_content }}
              />
            )}

            {post.conclusion && <p className="text-gray-700 leading-relaxed text-base sm:text-lg">{post.conclusion}</p>}
          </div>

          {/* Divider */}
          <div className="flex justify-center my-12">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-800/90" />
          </div>

          {/* Read Next */}
          {related.filter((r: any) => r.slug !== slug).length > 0 && (
            <section className="mt-12">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Read Our Next Article</h2>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => scrollCarousel('left')}
                    className="w-10 h-10 rounded-full bg-teal-700 hover:bg-teal-800 text-white flex items-center justify-center transition-colors shadow-md">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button onClick={() => scrollCarousel('right')}
                    className="w-10 h-10 rounded-full bg-teal-700 hover:bg-teal-800 text-white flex items-center justify-center transition-colors shadow-md">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <div ref={carouselRef} className="flex gap-4 overflow-x-auto pb-2 scroll-smooth" style={{ scrollbarWidth: 'thin' }}>
                {related
                  .filter((r: any) => r.slug !== slug)
                  .map((article: any) => (
                    <Link key={article.slug} to={`/blog/${article.slug}`} className="flex-shrink-0 w-[280px] sm:w-[320px] group">
                      <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        {article.hero_image_url ? (
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <img src={article.hero_image_url} alt={article.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                            {article.category && (
                              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-semibold bg-teal-700 text-white shadow-sm">{article.category}</span>
                            )}
                          </div>
                        ) : (
                          <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-300 text-4xl font-bold">{article.title[0]}</span>
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 group-hover:text-teal-700 transition-colors">{article.title}</h3>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
