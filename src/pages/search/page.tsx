import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import { searchApi } from '../../lib/api';
import { usePageSeoOverride } from '../../components/seo/SeoContext';

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const [draft, setDraft] = useState(q);

  const { data: config } = useQuery({
    queryKey: ['search-config-public'],
    queryFn: searchApi.config,
  });

  const minLen = config?.minQueryLength ?? 2;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['search', q, config?.enabledSources],
    queryFn: () => searchApi.query(q),
    enabled: q.trim().length >= minLen,
  });

  usePageSeoOverride({ title: q ? `Search: ${q}` : 'Search', description: 'Search apps, blogs, and agencies on TWAP' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = draft.trim();
    if (term) setParams({ q: term });
    else setParams({});
  };

  const total = (data?.apps.length ?? 0) + (data?.blogs.length ?? 0) + (data?.agencies.length ?? 0);
  const busy = isLoading || isFetching;

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <Header />
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Search TWAP</h1>

          <form onSubmit={handleSubmit} className="flex gap-3 mb-10">
            <input
              value={draft}
              onChange={e => setDraft(e.target.value)}
              placeholder={config?.placeholder ?? 'Search apps, blogs, agencies…'}
              className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-700/30 focus:border-teal-700"
            />
            <button type="submit" className="px-6 py-3 bg-teal-700 text-white rounded-xl font-semibold hover:bg-teal-800 transition-colors">
              Search
            </button>
          </form>

          {q.trim().length < minLen && (
            <p className="text-gray-500">Enter at least {minLen} characters to search.</p>
          )}

          {q.trim().length >= minLen && busy && (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-gray-200 border-t-teal-700 rounded-full animate-spin" />
            </div>
          )}

          {q.trim().length >= minLen && !busy && data && (
            <>
              <p className="text-sm text-gray-500 mb-8">{total} result{total !== 1 ? 's' : ''} for &ldquo;{q}&rdquo;</p>

              {data.apps.length > 0 && (
                <section className="mb-10">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Apps</h2>
                  <ul className="space-y-2">
                    {data.apps.map(app => (
                      <li key={app.id}>
                        <Link to={`/products/${app.slug}`} className="flex items-center gap-3 p-3 bg-white rounded-xl border hover:shadow-sm">
                          {app.logo_url && <img src={app.logo_url} alt="" className="w-10 h-10 rounded-lg object-contain" />}
                          <div>
                            <p className="font-semibold text-gray-900">{app.name}</p>
                            {app.tagline && <p className="text-sm text-gray-500">{app.tagline}</p>}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {data.blogs.length > 0 && (
                <section className="mb-10">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Blog posts</h2>
                  <ul className="space-y-2">
                    {data.blogs.map(post => (
                      <li key={post.id}>
                        <Link to={`/blog/${post.slug}`} className="block p-3 bg-white rounded-xl border hover:shadow-sm">
                          <p className="font-semibold text-gray-900">{post.title}</p>
                          {post.excerpt && <p className="text-sm text-gray-500 line-clamp-1">{post.excerpt}</p>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {data.agencies.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Agencies</h2>
                  <ul className="space-y-2">
                    {data.agencies.map(agency => (
                      <li key={agency.id}>
                        <Link to={`/agencies/${agency.slug}`} className="flex items-center gap-3 p-3 bg-white rounded-xl border hover:shadow-sm">
                          {agency.avatar_url && <img src={agency.avatar_url} alt="" className="w-10 h-10 rounded-full object-cover" />}
                          <div>
                            <p className="font-semibold text-gray-900">{agency.name}</p>
                            {agency.tagline && <p className="text-sm text-gray-500">{agency.tagline}</p>}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {total === 0 && <p className="text-gray-500">No results found. Try different keywords.</p>}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
