import { useMemo, useState } from 'react';
import { Search, ArrowRight, Layout, MessageSquare, Briefcase, Cpu } from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import BlogCard from '../../components/feature/BlogCard';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import { blogsApi, siteContentApi, resourceCentreApi, type BlogPost } from '../../lib/api';

const ICON_MAP = { Layout, MessageSquare, Briefcase, Cpu } as const;

type TabId = 'blogs' | 'opinion-pieces' | 'ai-in-use' | 'opportunities';

interface TabInfo {
    id: string;
    label: string;
    description: string;
    icon: typeof Layout;
}

interface FeaturedContent {
    image: string;
    authorImage: string;
    authorName: string;
    title: string;
    description: string;
    highlight: string;
    buttonText: string;
    linkUrl: string;
}

interface MidBanner {
    image: string;
    title: string;
    description: string;
    badge: string;
    linkUrl: string;
}

interface ArticleCard {
    id: string;
    slug?: string;
    image: string;
    authorImage: string;
    authorName: string;
    title: string;
    description: string;
    date: string;
    views: number;
    category: string;
}

const FALLBACK_TABS: TabInfo[] = [
    { id: 'blogs', label: 'Blogs', icon: Layout, description: 'Latest insights and trends in the tech world.' },
    { id: 'opinion-pieces', label: 'Opinion Pieces', icon: MessageSquare, description: 'Expert perspectives on the future of AI and development.' },
    { id: 'ai-in-use', label: 'AI in Use', icon: Cpu, description: 'Real-world applications and case studies of AI integration.' },
    { id: 'opportunities', label: 'Opportunities', icon: Briefcase, description: 'Career growth, job openings, and partnership programs.' },
];

function formatDate(d?: string) {
    if (!d) return '';
    return d.replace(/-/g, '/');
}

function mapPost(post: BlogPost): ArticleCard {
    return {
        id: post.id,
        slug: post.slug,
        image: post.hero_image_url ?? '',
        authorImage: post.author?.avatar_url ?? '',
        authorName: post.author?.name ?? 'Anonymous',
        title: post.title,
        description: post.excerpt ?? '',
        date: formatDate(post.published_date),
        views: post.views ?? 0,
        category: post.category ?? '',
    };
}

const ResourceCentrePage = () => {
    const { tab } = useParams<{ tab: string }>();
    const navigate = useNavigate();
    const activeTab = (tab || 'blogs') as TabId;
    const [searchTerm, setSearchTerm] = useState('');

    const { data: headerSection } = useQuery({
        queryKey: ['page-section', 'resource_centre', 'header'],
        queryFn: () => siteContentApi.section('resource_centre', 'header'),
    });

    const { data: ctaSection } = useQuery({
        queryKey: ['page-section', 'resource_centre', 'cta'],
        queryFn: () => siteContentApi.section('resource_centre', 'cta'),
    });

    const { data: tabItems = [] } = useQuery({
        queryKey: ['resource-centre-items', 'tabs'],
        queryFn: () => resourceCentreApi.items('tabs'),
    });

    const { data: featuredItems = [] } = useQuery({
        queryKey: ['resource-centre-items', 'featured'],
        queryFn: () => resourceCentreApi.items('featured'),
    });

    const { data: midBannerItems = [] } = useQuery({
        queryKey: ['resource-centre-items', 'mid_banner'],
        queryFn: () => resourceCentreApi.items('mid_banner'),
    });

    const { data: posts = [] } = useQuery({
        queryKey: ['blogs', 'resource-tab', activeTab, searchTerm],
        queryFn: () => blogsApi.byResourceTab(activeTab, { search: searchTerm || undefined, limit: 50 }),
    });

    const tabs: TabInfo[] = useMemo(() => {
        if (tabItems.length === 0) return FALLBACK_TABS;
        return tabItems.map(item => {
            const ex = (item.extras ?? {}) as Record<string, string>;
            const iconKey = (ex.icon ?? 'Layout') as keyof typeof ICON_MAP;
            return {
                id: ex.tab_id ?? item.title.toLowerCase().replace(/\s+/g, '-'),
                label: item.title,
                description: item.description ?? item.subtitle ?? '',
                icon: ICON_MAP[iconKey] ?? Layout,
            };
        });
    }, [tabItems]);

    const currentTabInfo = tabs.find(t => t.id === activeTab) || tabs[0];

    const featuredByTab = useMemo(() => {
        const map = new Map<string, FeaturedContent>();
        for (const item of featuredItems) {
            const ex = (item.extras ?? {}) as Record<string, string>;
            const tabId = ex.tab_id ?? 'blogs';
            map.set(tabId, {
                image: item.image_url ?? '',
                authorImage: ex.author_image ?? '',
                authorName: ex.author_name ?? '',
                title: item.title,
                description: item.description ?? '',
                highlight: ex.highlight ?? '',
                buttonText: ex.button_text ?? 'Read Story',
                linkUrl: item.link_url ?? '#',
            });
        }
        return map;
    }, [featuredItems]);

    const midBannerByTab = useMemo(() => {
        const map = new Map<string, MidBanner>();
        for (const item of midBannerItems) {
            const ex = (item.extras ?? {}) as Record<string, string>;
            const tabId = ex.tab_id ?? 'blogs';
            map.set(tabId, {
                image: item.image_url ?? '',
                title: item.title,
                description: item.description ?? '',
                badge: ex.badge ?? 'Featured',
                linkUrl: item.link_url ?? '#',
            });
        }
        return map;
    }, [midBannerItems]);

    const currentFeatured = featuredByTab.get(activeTab) ?? featuredByTab.get('blogs');
    const currentMidPageContent = midBannerByTab.get(activeTab) ?? midBannerByTab.get('blogs');

    const articles = posts.map(mapPost);
    const filteredArticles = searchTerm
        ? articles.filter(a =>
            a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : articles;

    const firstRowArticles = filteredArticles.slice(0, 3);
    const remainingArticles = filteredArticles.slice(3);

    const pageTitle = headerSection?.title ?? 'Resource Centre';
    const pageIntro = headerSection?.description ?? 'Discover the best in resource centre.';
    const ctaContent = (ctaSection?.content ?? {}) as Record<string, string>;
    const ctaHighlight = ctaContent.title_highlight ?? 'Your Workflow?';

    const handleTabChange = (tabId: string) => {
        navigate(`/resource-centre/${tabId}`);
    };

    const renderHighlight = (text: string, highlight: string) => {
        if (!highlight || !text.includes(highlight)) return text;
        const [before, after] = text.split(highlight);
        return (
            <>
                {before}
                <span className="text-[#ff7043] font-bold">{highlight}</span>
                {after}
            </>
        );
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-[#F8F9FA] text-gray-900 font-sans selection:bg-[#f25a1a] selection:text-white pt-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    <header className="mb-12">
                        <h1 className="text-4xl font-bold mb-3 tracking-tight text-gray-900">{pageTitle}</h1>
                        <p className="text-gray-500 text-sm max-w-xl leading-relaxed mb-8">
                            {pageIntro} {currentTabInfo.description}
                        </p>

                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="relative w-full md:w-96 group">
                                <div className="absolute inset-0 bg-[#f25a1a]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder={`Search ${currentTabInfo.label.toLowerCase()}...`}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-white shadow-sm border border-gray-200 focus:border-[#f25a1a] rounded-full py-3 pl-12 pr-4 text-sm text-gray-700 placeholder-gray-400 outline-none transition-all relative z-10"
                                />
                            </div>

                            <div className="flex flex-wrap gap-2 justify-center">
                                {tabs.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => handleTabChange(t.id)}
                                        className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 border ${activeTab === t.id
                                            ? 'bg-[#f25a1a] border-[#f25a1a] text-white shadow-lg shadow-[#f25a1a]/30'
                                            : 'bg-white border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 hover:shadow-sm'
                                        }`}
                                    >
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </header>

                    <div className="mb-12 text-center">
                        <div className="inline-flex items-center justify-center space-x-2 mb-8">
                            <div className="h-px w-8 bg-gray-300" />
                            <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">{currentTabInfo.label}</h2>
                            <div className="h-px w-8 bg-gray-300" />
                        </div>
                    </div>

                    {currentFeatured && (
                        <section className="mb-20">
                            <div className="relative w-full rounded-[2.5rem] overflow-hidden group shadow-2xl shadow-orange-900/10">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#f25a1a]/10 to-purple-600/10 mix-blend-overlay z-10 pointer-events-none" />
                                {currentFeatured.image && (
                                    <img
                                        src={currentFeatured.image}
                                        alt={currentFeatured.title}
                                        className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />

                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-4xl px-4 z-20">
                                    <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md pr-6 pl-2 py-1.5 rounded-full mb-8 shadow-lg">
                                        {currentFeatured.authorImage && (
                                            <img src={currentFeatured.authorImage} alt={currentFeatured.authorName} className="w-10 h-10 rounded-full object-cover border-2 border-white" />
                                        )}
                                        <span className="text-gray-900 font-bold text-sm">{currentFeatured.authorName}</span>
                                    </div>

                                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-lg leading-tight">
                                        {currentFeatured.title}
                                    </h2>

                                    <p className="text-gray-200 font-medium text-sm md:text-lg max-w-2xl mx-auto leading-relaxed mb-6">
                                        {renderHighlight(currentFeatured.description, currentFeatured.highlight)}
                                    </p>

                                    <Link
                                        to={currentFeatured.linkUrl}
                                        className="bg-[#f25a1a] hover:bg-[#d94e16] text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-[#f25a1a]/50 inline-flex items-center gap-2 mx-auto"
                                    >
                                        {currentFeatured.buttonText} <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </section>
                    )}

                    {firstRowArticles.length > 0 && (
                        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                            {firstRowArticles.map(article => (
                                <BlogCard key={article.id} {...article} />
                            ))}
                        </section>
                    )}

                    {currentMidPageContent && (
                        <section className="mb-20">
                            <div className="relative w-full rounded-2xl overflow-hidden group shadow-xl">
                                {currentMidPageContent.image && (
                                    <img
                                        src={currentMidPageContent.image}
                                        alt={currentMidPageContent.title}
                                        className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3 text-white">
                                    <span className="uppercase tracking-widest text-sm font-semibold mb-3 block opacity-80">{currentMidPageContent.badge}</span>
                                    <h3 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{currentMidPageContent.title}</h3>
                                    <p className="text-base md:text-lg opacity-90 mb-8 max-w-xl leading-relaxed">{currentMidPageContent.description}</p>
                                </div>
                                <div className="absolute top-1/2 right-8 -translate-y-1/2 hidden md:block">
                                    <ArrowRight className="w-12 h-12 text-white/50" />
                                </div>
                            </div>
                        </section>
                    )}

                    {remainingArticles.length > 0 && (
                        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {remainingArticles.map(article => (
                                <BlogCard key={article.id} {...article} />
                            ))}
                        </section>
                    )}

                    {filteredArticles.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">No content found matching your search.</p>
                        </div>
                    )}

                    <section className="mt-24 mb-20">
                        <div className="rounded-[2.5rem] bg-[#111827] text-white p-12 md:p-20 text-center relative overflow-hidden">
                            <div className="absolute top-0 transform -translate-x-1/2 left-1/2 w-[600px] h-[300px] bg-[#f25a1a]/20 blur-[100px] rounded-full pointer-events-none" />

                            <div className="relative z-10 max-w-3xl mx-auto">
                                <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
                                    {ctaSection?.title ?? 'Ready to Supercharge'} <br />
                                    <span className="text-[#f25a1a]">{ctaHighlight}</span>
                                </h2>
                                <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
                                    {ctaSection?.description ?? 'Discover the best AI tools and apps curated for developers and businesses.'}
                                </p>
                                <Link
                                    to={ctaSection?.cta_url ?? '/tools'}
                                    className="inline-block bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    {ctaSection?.cta_text ?? 'Explore Top Products'}
                                </Link>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
            <Footer />
        </>
    );
};

export default ResourceCentrePage;
