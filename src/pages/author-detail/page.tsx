import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import RichHtml from '../../components/ui/RichHtml';
import { authorsApi } from '../../lib/api';
import { usePageSeoOverride } from '../../components/seo/SeoContext';

export default function AuthorDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: author, isLoading } = useQuery({
    queryKey: ['author', slug],
    queryFn: () => authorsApi.bySlug(slug!),
    enabled: Boolean(slug),
  });

  const { data: posts = [] } = useQuery({
    queryKey: ['author-posts', author?.id],
    queryFn: () => authorsApi.posts(author!.id),
    enabled: Boolean(author?.id),
  });

  usePageSeoOverride(author ? {
    title: `${author.name} — Author`,
    description: author.bio ?? `Articles by ${author.name}`,
    image: author.avatar_url,
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

  if (!author) {
    return (
      <div className="min-h-screen bg-[#F6F6F6]">
        <Header />
        <main className="pt-28 pb-16 flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-gray-500 mb-4">Author not found.</p>
          <Link to="/resource-centre/blogs" className="text-teal-700 underline">← Back to Blog</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <Header />
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Link to="/resource-centre/blogs" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-teal-700 mb-8">
            <i className="ri-arrow-left-line" /> Back to Blog
          </Link>

          <div className="flex items-center gap-6 mb-12 p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
            {author.avatar_url ? (
              <img src={author.avatar_url} alt={author.name} className="w-24 h-24 rounded-full object-cover" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center text-3xl font-bold text-teal-700">
                {author.name[0]}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{author.name}</h1>
              {author.bio && <RichHtml html={author.bio} className="mt-2 text-gray-600 max-w-xl" />}
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Articles by {author.name}</h2>

          {posts.length === 0 ? (
            <p className="text-gray-500">No published articles yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map(post => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {post.hero_image_url && (
                    <img src={post.hero_image_url} alt="" className="w-full aspect-video object-cover group-hover:scale-[1.02] transition-transform" />
                  )}
                  <div className="p-5">
                    {post.category && (
                      <span className="text-xs font-bold text-teal-700 uppercase">{post.category}</span>
                    )}
                    <h3 className="font-bold text-gray-900 mt-1 group-hover:text-teal-700 transition-colors">{post.title}</h3>
                    {post.excerpt && <p className="text-sm text-gray-500 mt-2 line-clamp-2">{post.excerpt}</p>}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
