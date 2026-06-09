import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import { categoriesApi, appsApi, blogsApi, agenciesApi } from '../../lib/api';
import { usePageSeoOverride } from '../../components/seo/SeoContext';

export default function CategoryDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: category, isLoading } = useQuery({
    queryKey: ['category', slug],
    queryFn: () => categoriesApi.bySlug(slug!),
    enabled: Boolean(slug),
  });

  const { data: apps = [] } = useQuery({
    queryKey: ['category-apps', category?.name],
    queryFn: () => appsApi.byCategory(category!.name, 24),
    enabled: Boolean(category?.name) && (category?.content_type === 'apps' || category?.content_type === 'all'),
  });

  const { data: blogs = [] } = useQuery({
    queryKey: ['category-blogs', category?.name],
    queryFn: () => blogsApi.list({ category: category!.name, limit: 24 }),
    enabled: Boolean(category?.name) && (category?.content_type === 'blogs' || category?.content_type === 'all'),
  });

  const { data: agencies = [] } = useQuery({
    queryKey: ['category-agencies', category?.name],
    queryFn: () => agenciesApi.list({ category: category!.name, limit: 24 }),
    enabled: Boolean(category?.name) && category?.content_type === 'agencies',
  });

  usePageSeoOverride(category ? {
    title: `${category.name} — Category`,
    description: category.description ?? `Browse ${category.name} on TWAP`,
  } : undefined);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fffbf5]">
        <Header />
        <div className="flex justify-center items-center h-96 pt-28">
          <div className="w-10 h-10 border-2 border-gray-200 border-t-[#f25a1a] rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-[#fffbf5]">
        <Header />
        <main className="pt-28 pb-16 flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-gray-500 mb-4">Category not found.</p>
          <Link to="/directory" className="text-[#f25a1a] underline">← Browse Directory</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffbf5]">
      <Header />
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link to="/directory" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#f25a1a] mb-6">
            <i className="ri-arrow-left-line" /> Back to Directory
          </Link>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">{category.name}</h1>
          {category.description && <p className="text-gray-600 mb-10 max-w-2xl">{category.description}</p>}

          {apps.length > 0 && (
            <section className="mb-14">
              <h2 className="text-2xl font-bold mb-6">Apps</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {apps.map(app => (
                  <Link key={app.id} to={`/products/${app.slug}`} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                    {app.logo_url && <img src={app.logo_url} alt="" className="w-12 h-12 rounded-lg object-contain" />}
                    <div>
                      <p className="font-bold text-gray-900">{app.name}</p>
                      {app.tagline && <p className="text-sm text-gray-500 line-clamp-1">{app.tagline}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {blogs.length > 0 && (
            <section className="mb-14">
              <h2 className="text-2xl font-bold mb-6">Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map(post => (
                  <Link key={post.id} to={`/blog/${post.slug}`} className="bg-white rounded-xl border overflow-hidden hover:shadow-md">
                    {post.hero_image_url && <img src={post.hero_image_url} alt="" className="w-full aspect-video object-cover" />}
                    <div className="p-4">
                      <p className="font-bold text-gray-900">{post.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {agencies.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Agencies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {agencies.map(agency => (
                  <Link key={agency.id} to={`/agencies/${agency.slug}`} className="flex items-center gap-4 p-4 bg-white rounded-xl border hover:shadow-md">
                    {agency.avatar_url && <img src={agency.avatar_url} alt="" className="w-12 h-12 rounded-full object-cover" />}
                    <div>
                      <p className="font-bold">{agency.name}</p>
                      {agency.tagline && <p className="text-sm text-gray-500 line-clamp-1">{agency.tagline}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {apps.length === 0 && blogs.length === 0 && agencies.length === 0 && (
            <p className="text-gray-500">No content in this category yet.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
