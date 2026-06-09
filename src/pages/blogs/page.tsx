import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, Twitter, Youtube } from 'lucide-react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import BlogCard from '../../components/feature/BlogCard';
import { blogsApi } from '../../lib/api';

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blogs', 'list'],
    queryFn: () => blogsApi.list({ limit: 50 }),
  });

  // Derive categories from live data
  const categories = ['All', ...Array.from(new Set(posts.map((p: any) => p.category).filter(Boolean)))];

  const filtered = posts.filter((post: any) => {
    const matchCat = activeCategory === 'All' || post.category === activeCategory;
    const matchSearch = !searchTerm ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt ?? '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  // First post is featured hero
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#F8F9FA] text-gray-900 font-sans selection:bg-blue-500 selection:text-white pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Header */}
          <header className="mb-16">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-3 tracking-tight text-gray-900">Discover Nice Articles Here</h1>
                <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
                  All articles are <span className="text-blue-600 font-semibold">updated regularly</span> — find your content quickly and easily.
                </p>
              </div>
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors group">
                  <Twitter className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors group">
                  <Youtube className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="relative w-full md:w-96 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles…"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full bg-white shadow-sm border border-gray-200 focus:border-blue-500 rounded-full py-3 pl-12 pr-4 text-sm text-gray-700 placeholder-gray-400 outline-none transition-all"
                />
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {(categories as string[]).map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 border ${
                      activeCategory === cat
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30'
                        : 'bg-white border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300'
                    }`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </header>

          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center space-x-2 mb-8">
              <div className="h-px w-8 bg-gray-300" />
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">Articles</h2>
              <div className="h-px w-8 bg-gray-300" />
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Featured article */}
              {featured && (
                <section className="mb-20">
                  <Link to={`/blog/${featured.slug}`} className="block relative w-full rounded-[2.5rem] overflow-hidden group shadow-2xl shadow-blue-900/10 cursor-pointer">
                    {featured.hero_image_url
                      ? <img src={featured.hero_image_url} alt={featured.title} className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-105" />
                      : <div className="w-full h-[450px] bg-gradient-to-br from-blue-600 to-indigo-700" />
                    }
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      {featured.category && (
                        <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                          {featured.category}
                        </span>
                      )}
                      <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">{featured.title}</h2>
                      {featured.excerpt && <p className="text-gray-200 text-sm md:text-base max-w-2xl leading-relaxed">{featured.excerpt}</p>}
                    </div>
                  </Link>
                </section>
              )}

              {/* Articles grid */}
              {rest.length > 0 && (
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rest.map((post: any) => (
                    <Link key={post.id} to={`/blog/${post.slug}`}>
                      <BlogCard
                        id={post.id}
                        image={post.hero_image_url ?? ''}
                        authorImage={post.author?.avatar_url ?? ''}
                        authorName={post.author?.name ?? 'TWAP'}
                        title={post.title}
                        description={post.excerpt ?? ''}
                        date={post.published_date ?? ''}
                        views={post.views ?? 0}
                        category={post.category ?? ''}
                      />
                    </Link>
                  ))}
                </section>
              )}

              {filtered.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                  <p className="text-lg font-medium">No articles found</p>
                  <p className="text-sm mt-2">Try a different category or search term</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
