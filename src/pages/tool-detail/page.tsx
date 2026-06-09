import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import RichHtml from '../../components/ui/RichHtml';
import { toolsApi } from '../../lib/api';
import { usePageSeoOverride } from '../../components/seo/SeoContext';

export default function ToolDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: tool, isLoading } = useQuery({
    queryKey: ['tool', slug],
    queryFn: () => toolsApi.bySlug(slug!),
    enabled: Boolean(slug),
  });

  usePageSeoOverride(tool ? {
    title: `${tool.title} — Top Tool`,
    description: tool.description ?? tool.subtitle,
    image: tool.image_url,
  } : undefined);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-dark text-white">
        <Header />
        <div className="flex justify-center items-center h-96 pt-28">
          <div className="w-10 h-10 border-2 border-white/20 border-t-brand-orange rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-brand-dark text-white">
        <Header />
        <main className="pt-28 pb-16 flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-gray-400 mb-4">Tool not found.</p>
          <Link to="/tools" className="text-brand-orange underline">← Back to Tools</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const extras = (tool.extras ?? {}) as Record<string, string>;
  const productLink = tool.link_url?.startsWith('/') ? tool.link_url : `/products/${slug}`;

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <Header />
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto">
          <Link to="/tools" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-brand-orange mb-8">
            <i className="ri-arrow-left-line" /> Back to Top Tools
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {tool.image_url && (
              <img src={tool.image_url} alt={tool.title} className="w-full rounded-2xl aspect-video object-cover shadow-2xl" />
            )}
            <div>
              {tool.subtitle && (
                <span className="inline-block px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange text-xs font-bold uppercase mb-4">
                  {tool.subtitle}
                </span>
              )}
              <h1 className="text-4xl font-bold mb-4">{tool.title}</h1>
              {tool.description && (
                <RichHtml html={tool.description} className="text-gray-300 leading-relaxed mb-6" />
              )}
              {extras.rating && (
                <p className="text-brand-lime font-bold mb-6">★ {extras.rating}</p>
              )}
              {tool.link_url && (
                <Link
                  to={productLink}
                  className="inline-flex items-center gap-2 bg-brand-orange text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-orange/90 transition-colors"
                >
                  View full review <i className="ri-arrow-right-line" />
                </Link>
              )}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
