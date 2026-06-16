
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { blogsApi, siteContentApi } from '../../../lib/api';

const FALLBACK_SECTION = {
  title: 'Featured Story',
  description: 'The most important tech story of the week',
};

const FALLBACK_ARTICLE = {
  slug: '',
  title: 'OpenAI Announces GPT-5: Revolutionary Breakthrough in AI Reasoning',
  excerpt: 'The latest iteration promises unprecedented capabilities in logical reasoning, code generation, and multimodal understanding, setting new benchmarks for artificial intelligence.',
  content: "OpenAI's GPT-5 represents a quantum leap in artificial intelligence capabilities, featuring enhanced reasoning abilities that surpass human-level performance in complex problem-solving tasks. The model demonstrates remarkable improvements in code generation, mathematical reasoning, and creative writing, while maintaining ethical guidelines and safety protocols.",
  author: 'Dr. Sarah Chen',
  date: 'January 20, 2025',
  readTime: '8 min read',
  category: 'AI Breakthrough',
  image: 'https://readdy.ai/api/search-image?query=OpenAI%20GPT-5%20announcement&width=800&height=500&seq=featured-gpt5&orientation=landscape',
  tags: ['OpenAI', 'GPT-5', 'AI', 'Machine Learning', 'Technology'],
};

export default function FeaturedNews() {
  const { data: section } = useQuery({
    queryKey: ['page-section', 'news', 'featured'],
    queryFn: () => siteContentApi.section('news', 'featured'),
  });
  const { data: posts = [] } = useQuery({
    queryKey: ['blogs', 'news-featured'],
    queryFn: () => blogsApi.list({ limit: 1 }),
  });

  const sTitle = section?.title ?? FALLBACK_SECTION.title;
  const sDesc  = section?.description ?? FALLBACK_SECTION.description;

  const top = posts[0];
  const article = top ? {
    slug: top.slug,
    title: top.title,
    excerpt: top.excerpt ?? '',
    content: top.excerpt ?? '',
    author: top.author?.name ?? 'TWAP',
    date: top.published_date ? new Date(top.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '',
    readTime: top.read_time_minutes ? `${top.read_time_minutes} min read` : '',
    category: top.category ?? '',
    image: top.hero_image_url ?? '',
    tags: top.tags ?? [],
  } : FALLBACK_ARTICLE;

  return (
    <section className="py-16 bg-gradient-to-br from-[#f7f5ef] to-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2853] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {sTitle}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {sDesc}
          </p>
        </div>

        <article className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="relative overflow-hidden h-[300px] lg:h-[500px]">
              {article.image
                ? <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                : <div className="w-full h-full bg-gradient-to-br from-[#1F2853] to-[#f25a1a]" />
              }
              {article.category && (
                <div className="absolute top-6 left-6">
                  <span className="bg-[#f25a1a] text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {article.category}
                  </span>
                </div>
              )}
              {article.tags.length > 0 && (
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-white/90 text-[#1F2853] px-3 py-1 rounded-full text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center text-sm text-gray-600 mb-4 space-x-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {article.date && <span>{article.date}</span>}
                {article.author && <><span>•</span><span>By {article.author}</span></>}
                {article.readTime && <><span>•</span><span>{article.readTime}</span></>}
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-[#1F2853] mb-4 group-hover:text-[#f25a1a] transition-colors leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {article.title}
              </h3>

              <p className="text-gray-700 text-lg leading-relaxed mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {article.excerpt}
              </p>

              {article.content && (
                <p className="text-gray-600 leading-relaxed mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {article.content}
                </p>
              )}

              <div className="flex items-center space-x-4">
                <Link to={article.slug ? `/blog/${article.slug}` : '/resource-centre/blogs'} className="inline-flex items-center bg-gradient-to-r from-[#1F2853] to-[#2a3a6b] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Read Full Article
                  <div className="w-4 h-4 inline-flex items-center justify-center ml-2">
                    <i className="ri-arrow-right-line"></i>
                  </div>
                </Link>

                <button className="flex items-center space-x-2 text-gray-600 hover:text-[#f25a1a] transition-colors">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-share-line"></i>
                  </div>
                  <span className="font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>Share</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
