import { useMemo, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, Eye, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "../../components/feature/Header";
import Footer from "../../components/feature/Footer";
import RichHtml from "../../components/ui/RichHtml";
import { useQuery } from "@tanstack/react-query";
import { blogsApi, type BlogPost } from "../../lib/api";
import { usePageSeoOverride } from "../../components/seo/SeoContext";

const formatDate = (d?: string) =>
  d ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "";

const formatViews = (views: number) => {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(views >= 10_000 ? 0 : 1).replace(/\.0$/, "")}K`;
  return String(views);
};

/** Rough read time when the admin has not set one. */
const estimateReadTime = (post: BlogPost) => {
  const text = [post.intro_paragraph, post.conclusion, post.body_content, ...(post.what_you_learn ?? []).map((p) => `${p.title} ${p.description}`)]
    .filter(Boolean)
    .join(" ")
    .replace(/<[^>]+>/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const carouselRef = useRef<HTMLDivElement>(null);

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => (slug ? blogsApi.bySlug(slug) : Promise.resolve(null)),
    enabled: !!slug,
  });

  const { data: related = [] } = useQuery({
    queryKey: ["blog-related", post?.id, post?.category],
    queryFn: async () => {
      if (!post) return [];
      const sameCategory = post.category
        ? await blogsApi.list({ category: post.category, excludeId: post.id, limit: 8 })
        : [];
      if (sameCategory.length >= 4) return sameCategory;
      const latest = await blogsApi.list({ excludeId: post.id, limit: 8 });
      const seen = new Set(sameCategory.map((p) => p.id));
      return [...sameCategory, ...latest.filter((p) => !seen.has(p.id))].slice(0, 8);
    },
    enabled: !!post,
  });

  const seo = useMemo(
    () =>
      post
        ? {
            title: post.meta_title || post.title,
            description: post.meta_description || post.excerpt || undefined,
            image: post.og_image_url || post.hero_image_url || undefined,
            noindex: post.noindex ?? false,
          }
        : undefined,
    [post],
  );
  usePageSeoOverride(seo);

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollAmount = (320 + 16) * (direction === "left" ? -1 : 1);
    container.scrollTo({ left: Math.max(0, container.scrollLeft + scrollAmount), behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#F6F6F6] pt-28 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto animate-pulse" aria-busy="true">
            <div className="h-4 w-40 bg-gray-200 rounded mb-6" />
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/60">
              <div className="h-9 w-3/4 bg-gray-200 rounded mb-4" />
              <div className="h-5 w-2/3 bg-gray-100 rounded mb-6" />
              <div className="aspect-video w-full bg-gray-200 rounded-xl" />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#F6F6F6] pt-28 pb-16 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <p className="text-5xl font-black text-gray-200 mb-4">404</p>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Blog post not found</h1>
            <p className="text-gray-500 mb-8">This article may have been moved, unpublished, or the link is incorrect.</p>
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 bg-[#f25a1a] hover:bg-[#d94e16] text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Browse all articles
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const authorName = post.author?.name ?? post.author_name ?? "TWAP Editorial";
  const readTime = post.read_time_minutes ?? estimateReadTime(post);
  const learningPoints = post.what_you_learn ?? [];
  const intro = post.intro_paragraph ?? "";
  const hasNarrative = Boolean(intro || learningPoints.length || post.conclusion || post.body_content);

  return (
    <div className="min-h-screen bg-[#F6F6F6] font-sans text-gray-800">
      <Header />
      <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <article className="max-w-5xl mx-auto">
          {/* Breadcrumb + meta */}
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
            <Link to="/blogs" className="inline-flex items-center gap-1.5 hover:text-[#f25a1a] transition-colors">
              <ArrowLeft className="w-4 h-4" /> All articles
            </Link>
            {post.category && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f25a1a]/10 text-[#f25a1a] border border-[#f25a1a]/20">
                {post.category}
              </span>
            )}
            {post.published_date && (
              <span className="inline-flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatDate(post.published_date)}</span>
            )}
            <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" />{readTime} min read</span>
            {typeof post.views === "number" && post.views > 0 && (
              <span className="inline-flex items-center gap-1.5"><Eye className="w-4 h-4" />{formatViews(post.views)} views</span>
            )}
          </div>

          {/* Hero block */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-10 border border-gray-200/60 shadow-sm">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
                {post.excerpt}
              </p>
            )}

            <div className="flex items-center gap-3 mb-6">
              {post.author?.avatar_url ? (
                <img src={post.author.avatar_url} alt={authorName} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
              ) : (
                <span className="w-10 h-10 rounded-full bg-[#f25a1a] text-white flex items-center justify-center text-sm font-bold">
                  {authorName.charAt(0).toUpperCase()}
                </span>
              )}
              <div>
                <p className="text-sm font-semibold text-gray-900">{authorName}</p>
                {post.author?.bio && <p className="text-xs text-gray-500 line-clamp-1">{post.author.bio}</p>}
              </div>
            </div>

            {post.hero_image_url && (
              <div className="rounded-lg sm:rounded-xl overflow-hidden shadow-md bg-gray-100">
                <img
                  src={post.hero_image_url}
                  alt={post.title}
                  className="w-full h-auto object-cover aspect-video"
                />
              </div>
            )}
          </div>

          {/* Main content */}
          <div className="space-y-8">
            {post.subheading && (
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">{post.subheading}</h2>
            )}
            {intro && (
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg whitespace-pre-line">{intro}</p>
            )}

            {learningPoints.length > 0 && (
              <section>
                <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">What You'll Learn:</h3>
                <div className="space-y-6">
                  {learningPoints.map((point, index) => (
                    <div key={`${point.title}-${index}`} className="space-y-1">
                      <h4 className="font-bold text-gray-900 text-base sm:text-lg">{point.title}{point.title.endsWith(":") ? "" : ":"}</h4>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{point.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {post.body_content && (
              <RichHtml html={post.body_content} className="prose prose-lg max-w-none text-gray-700" />
            )}

            {post.conclusion && (
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg whitespace-pre-line">{post.conclusion}</p>
            )}

            {!hasNarrative && post.excerpt && (
              <p className="text-gray-500 text-sm italic">Full article coming soon.</p>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-600">#{tag}</span>
                ))}
              </div>
            )}
          </div>

          {/* Separator */}
          <div className="flex justify-center my-12">
            <div className="w-2.5 h-2.5 rounded-full bg-[#f25a1a]" />
          </div>

          {/* Read Our Next Article */}
          {related.length > 0 && (
            <section className="mt-12" aria-label="Related articles">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Read Our Next Article</h2>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => scrollCarousel("left")}
                    className="w-10 h-10 rounded-full bg-[#f25a1a] hover:bg-[#d94e16] text-white flex items-center justify-center transition-colors shadow-md"
                    aria-label="Previous articles"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollCarousel("right")}
                    className="w-10 h-10 rounded-full bg-[#f25a1a] hover:bg-[#d94e16] text-white flex items-center justify-center transition-colors shadow-md"
                    aria-label="Next articles"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div
                ref={carouselRef}
                className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 scroll-smooth"
                style={{ scrollbarWidth: "thin" }}
              >
                {related.map((article) => (
                  <Link
                    key={article.id}
                    to={`/blog/${article.slug}`}
                    className="flex-shrink-0 w-[280px] sm:w-[320px] group"
                  >
                    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full">
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                        {article.hero_image_url ? (
                          <img
                            src={article.hero_image_url}
                            alt={article.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#1F2853] to-[#f25a1a]/70" />
                        )}
                        {article.category && (
                          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#f25a1a] text-white shadow-sm">
                            {article.category}
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 group-hover:text-[#f25a1a] transition-colors">
                          {article.title}
                        </h3>
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
