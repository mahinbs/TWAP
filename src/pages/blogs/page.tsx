import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import BlogCard from '../../components/feature/BlogCard';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import { blogsApi, siteContentApi, type BlogPost } from '../../lib/api';

const BLOGS_FALLBACK = {
  title: 'Discover Nice Articles Here',
  description:
    'All the articles and content on the site are updated regularly so you can find the insights you need quickly and without any problems.',
};

const PAGE_SIZE = 9;
const ROTATE_MS = 6000;

const formatDate = (d?: string) =>
  d ? new Date(d).toLocaleDateString('en-CA').replace(/-/g, '/') : '';

/** Map a DB post to the props BlogCard expects. */
const toCard = (post: BlogPost) => ({
  id: post.id,
  slug: post.slug,
  image: post.hero_image_url ?? '',
  authorImage: post.author?.avatar_url ?? '',
  authorName: post.author?.name ?? post.author_name ?? 'TWAP Editorial',
  title: post.title,
  description: post.excerpt ?? '',
  date: formatDate(post.published_date),
  views: post.views ?? 0,
  category: post.category ?? 'Article',
});

const BlogsPage = () => {
  const { data: section } = useQuery({
    queryKey: ['page-section', 'blogs', 'hero'],
    queryFn: () => siteContentApi.section('blogs', 'hero'),
  });
  const blogsTitle = section?.title ?? BLOGS_FALLBACK.title;
  const blogsDesc = section?.description ?? BLOGS_FALLBACK.description;

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blogs', 'all-articles'],
    queryFn: () => blogsApi.list({ blogOnly: true, limit: 200 }),
  });

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [slide, setSlide] = useState(0);

  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => { if (p.category) set.add(p.category); });
    return ['All', ...Array.from(set).sort()];
  }, [posts]);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return posts.filter((p) => {
      const inCategory = activeCategory === 'All' || p.category === activeCategory;
      if (!inCategory) return false;
      if (!term) return true;
      return (
        p.title.toLowerCase().includes(term) ||
        (p.excerpt ?? '').toLowerCase().includes(term) ||
        (p.tags ?? []).some((t) => t.toLowerCase().includes(term))
      );
    });
  }, [posts, activeCategory, searchTerm]);

  // Featured carousel: admin-flagged posts first, otherwise the most-viewed three.
  const featured = useMemo(() => {
    const flagged = posts.filter((p) => p.featured);
    if (flagged.length > 0) return flagged.slice(0, 5);
    return [...posts].sort((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, 3);
  }, [posts]);

  useEffect(() => { setVisible(PAGE_SIZE); }, [activeCategory, searchTerm]);
  useEffect(() => { setSlide(0); }, [featured.length]);

  useEffect(() => {
    if (featured.length < 2) return;
    const id = window.setInterval(() => setSlide((s) => (s + 1) % featured.length), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [featured.length]);

  const hero = featured[slide] ?? featured[0];
  const heroAuthor = hero?.author?.name ?? hero?.author_name ?? 'TWAP Editorial';
  const shown = filtered.slice(0, visible);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#F8F9FA] text-gray-900 font-sans selection:bg-[#f25a1a] selection:text-white pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Header Section */}
          <header className="mb-12 sm:mb-16">
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight text-gray-900">{blogsTitle}</h1>
              <p className="text-gray-500 text-sm max-w-xl leading-relaxed">{blogsDesc}</p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="relative w-full md:w-96 group">
                <div className="absolute inset-0 bg-[#f25a1a]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-20" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search articles..."
                  aria-label="Search articles"
                  className="w-full bg-white shadow-sm border border-gray-200 focus:border-[#f25a1a] rounded-full py-3 pl-12 pr-4 text-sm text-gray-700 placeholder-gray-400 outline-none transition-all relative z-10"
                />
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 border ${activeCategory === cat
                      ? 'bg-[#f25a1a] border-[#f25a1a] text-white shadow-lg shadow-[#f25a1a]/30'
                      : 'bg-white border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </header>

          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center space-x-2">
              <div className="h-px w-8 bg-gray-300" />
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">Articles</h2>
              <div className="h-px w-8 bg-gray-300" />
            </div>
          </div>

          {/* Featured Article carousel */}
          {hero && !searchTerm && activeCategory === 'All' && (
            <section className="mb-16 sm:mb-20" aria-label="Featured articles">
              <div className="relative w-full rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden group shadow-2xl shadow-orange-900/10 bg-gray-900">
                {hero.hero_image_url && (
                  <img
                    key={hero.id}
                    src={hero.hero_image_url}
                    alt={hero.title}
                    className="w-full h-[420px] sm:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                {!hero.hero_image_url && <div className="w-full h-[420px] sm:h-[450px] bg-gradient-to-br from-[#1F2853] to-[#f25a1a]" />}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center text-center px-6 sm:px-10 z-20">
                  <div className="w-full max-w-4xl">
                    <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md pr-5 pl-1.5 py-1.5 rounded-full mb-6 sm:mb-8 shadow-lg">
                      {hero.author?.avatar_url
                        ? <img src={hero.author.avatar_url} alt={heroAuthor} className="w-9 h-9 rounded-full object-cover border-2 border-white" />
                        : <span className="w-9 h-9 rounded-full bg-[#f25a1a] text-white flex items-center justify-center text-sm font-bold">{heroAuthor.charAt(0)}</span>}
                      <span className="text-gray-900 font-bold text-sm">{heroAuthor}</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 sm:mb-6 drop-shadow-lg leading-tight line-clamp-3">
                      {hero.title}
                    </h2>

                    {hero.excerpt && (
                      <p className="text-gray-200 font-medium text-sm md:text-lg max-w-2xl mx-auto leading-relaxed mb-6 line-clamp-3">
                        {hero.excerpt}
                      </p>
                    )}

                    <Link
                      to={`/blog/${hero.slug}`}
                      className="bg-[#f25a1a] hover:bg-[#d94e16] text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-[#f25a1a]/50 inline-flex items-center gap-2"
                    >
                      Read Story <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {featured.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous featured article"
                      onClick={() => setSlide((s) => (s - 1 + featured.length) % featured.length)}
                      className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur text-white flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next featured article"
                      onClick={() => setSlide((s) => (s + 1) % featured.length)}
                      className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur text-white flex items-center justify-center transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {featured.length > 1 && (
                <div className="flex justify-center gap-2 mt-6 sm:mt-8">
                  {featured.map((f, i) => (
                    <button
                      key={f.id}
                      type="button"
                      aria-label={`Show featured article ${i + 1}`}
                      onClick={() => setSlide(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all hover:scale-125 ${i === slide ? 'bg-[#f25a1a]' : 'bg-gray-300 hover:bg-gray-400'}`}
                    />
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Articles Grid */}
          {isLoading ? (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" aria-busy="true">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
                  <div className="h-64 bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 w-24 bg-gray-200 rounded-full" />
                    <div className="h-6 w-3/4 bg-gray-200 rounded" />
                    <div className="h-4 w-full bg-gray-100 rounded" />
                    <div className="h-4 w-5/6 bg-gray-100 rounded" />
                  </div>
                </div>
              ))}
            </section>
          ) : shown.length > 0 ? (
            <>
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {shown.map((post) => (
                  <BlogCard key={post.id} {...toCard(post)} />
                ))}
              </section>
              {visible < filtered.length && (
                <div className="flex justify-center mt-12">
                  <button
                    type="button"
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    className="px-8 py-3 rounded-full border border-gray-200 bg-white text-gray-700 font-semibold text-sm hover:bg-[#f25a1a] hover:text-white hover:border-transparent transition-all shadow-sm"
                  >
                    Load more articles ({filtered.length - visible} remaining)
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
              <p className="text-gray-900 text-lg font-semibold mb-2">No articles found</p>
              <p className="text-gray-500 text-sm mb-6">
                {posts.length === 0
                  ? 'New articles are on the way. Check back soon.'
                  : 'Try a different search term or category.'}
              </p>
              {(searchTerm || activeCategory !== 'All') && (
                <button
                  type="button"
                  onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                  className="px-6 py-2.5 rounded-full bg-[#f25a1a] text-white text-sm font-semibold hover:bg-[#d94e16] transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogsPage;
