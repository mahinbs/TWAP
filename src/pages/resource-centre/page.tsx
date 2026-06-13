import { useState } from 'react';
import { Search, ArrowRight, Layout, MessageSquare, Briefcase, Cpu } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogCard from '../../components/feature/BlogCard';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

const ResourceCentrePage = () => {
    const { tab } = useParams<{ tab: string }>();
    const navigate = useNavigate();
    const activeTab = tab || 'blogs';
    const [searchTerm, setSearchTerm] = useState('');

    const tabs = [
        { id: 'blogs', label: 'Blogs', icon: Layout, description: 'Latest insights and trends in the tech world.' },
        { id: 'opinion-pieces', label: 'Opinion Pieces', icon: MessageSquare, description: 'Expert perspectives on the future of AI and development.' },
        { id: 'ai-in-use', label: 'AI in Use', icon: Cpu, description: 'Real-world applications and case studies of AI integration.' },
        { id: 'opportunities', label: 'Opportunities', icon: Briefcase, description: 'Career growth, job openings, and partnership programs.' },
    ];

    const currentTabInfo = tabs.find(t => t.id === activeTab) || tabs[0];

    const handleTabChange = (tabId: string) => {
        navigate(`/resource-centre/${tabId}`);
    };

    const midPageContent = {
        blogs: {
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
            title: "Breaking Into Product Design: Advice from Untitled Founder",
            description: "Let's get one thing out of the way: you don't need a fancy Bachelor's Degree to get into Product Design. We sat down with Frankie Sullivan to talk about gatekeeping.",
        },
        'opinion-pieces': {
            image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop",
            title: "Ethics in AI Development",
            description: "Why we need stricter guidelines for AI deployment in public sectors.",

        },
        'ai-in-use': {
            image: "https://images.unsplash.com/photo-1535378437327-b7128063da5f?q=80&w=2070&auto=format&fit=crop",
            title: "AI in Modern Agriculture",
            description: "Smart farming solutions powered by machine learning algorithms.",

        },
        'opportunities': {
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
            title: "We Are Hiring!",
            description: "Join our team of innovators and builders. Open positions available.",

        }
    };

    const currentMidPageContent = midPageContent[activeTab as keyof typeof midPageContent] || midPageContent.blogs;

    // Mock data - In a real app, this would be fetched based on the tab
    const allArticles = {
        blogs: [
            {
                id: 2,
                image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
                authorImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop",
                authorName: "Leslie Alexander",
                title: "New Intelligent Robots Are Able To Become Musicians",
                description: "Robots Equipped With Advanced AI Tech Will Be Able To Generate And Perform Original Music In A Live Performance Customized To Real-Time ...",
                date: "2022/09/23",
                views: 98000,
                category: "Technology"
            },
            {
                id: 3,
                image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
                authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
                authorName: "Robert Foxsman",
                title: "Maggie, A Home Robot For Your Children To Play And Entertain",
                description: "In 2021, A Company In The Netherlands Claimed To Have Developed A Robot That Can Entertain Children And Help Them Spend Their Free ...",
                date: "2022/09/23",
                views: 10000,
                category: "Technology"
            },
            {
                id: 10,
                image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
                authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
                authorName: "Emily Chen",
                title: "The Rise of Quantum Computing",
                description: "Quantum computing is set to revolutionize the way we solve complex problems. Here's what you need to know.",
                date: "2023/01/15",
                views: 15000,
                category: "Technology"
            },
            {
                id: 11,
                image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
                authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
                authorName: "Michael Brown",
                title: "Blockchain Beyond Cryptocurrency",
                description: "Discover how blockchain technology is transforming industries beyond finance, from supply chain to healthcare.",
                date: "2023/02/10",
                views: 12000,
                category: "Technology"
            },
            {
                id: 12,
                image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?q=80&w=2070&auto=format&fit=crop",
                authorImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
                authorName: "David Lee",
                title: "The Future of Augmented Reality",
                description: "Augmented Reality (AR) is blurring the lines between the digital and physical worlds.",
                date: "2023/03/05",
                views: 18000,
                category: "Technology"
            }
        ],
        'opinion-pieces': [
            {
                id: 4,
                image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2070&auto=format&fit=crop",
                authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop",
                authorName: "James Carter",
                title: "The Ethical Dilemmas of AI in Healthcare",
                description: "As AI becomes more integrated into patient diagnosis and treatment, we must ask ourselves: where do we draw the line between efficiency and empathy?",
                date: "2023/10/15",
                views: 15400,
                category: "Healthcare"
            },
            {
                id: 5,
                image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
                authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
                authorName: "Sarah Jenkins",
                title: "Why Remote Work Is Here to Stay",
                description: "Despite calls to return to the office, the benefits of remote work for both productivity and mental health are undeniable. Here is why the shift is permanent.",
                date: "2023/11/02",
                views: 12300,
                category: "Work Culture"
            },
            {
                id: 13,
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
                authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
                authorName: "Mark Wilson",
                title: "The Case for Universal Basic Income",
                description: "A compelling argument for UBI as a solution to economic inequality and the changing nature of work.",
                date: "2023/12/05",
                views: 9500,
                category: "Economics"
            },
            {
                id: 14,
                image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069&auto=format&fit=crop",
                authorImage: "https://images.unsplash.com/photo-1554151228-14d9def656ec?q=80&w=1886&auto=format&fit=crop",
                authorName: "Linda Davis",
                title: "Rethinking Education in the Digital Age",
                description: "Traditional education systems are struggling to keep up with the pace of technological change. It's time for a fundamental rethink.",
                date: "2024/01/12",
                views: 11000,
                category: "Education"
            }
        ],
        'ai-in-use': [
            {
                id: 6,
                image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2006&auto=format&fit=crop",
                authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
                authorName: "David Lee",
                title: "How AI is Revolutionizing Supply Chain Management",
                description: "From predictive analytics to autonomous warehouses, see how major corporations are using AI to optimize their supply chains and reduce costs.",
                date: "2023/08/10",
                views: 8900,
                category: "Logistics"
            },
            {
                id: 7,
                image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
                authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
                authorName: "Emily Chen",
                title: "AI-Powered Cybersecurity: The New Defense Standard",
                description: "With cyber threats becoming more sophisticated, traditional security measures are no longer enough. AI is stepping in to detect and neutralize threats in real-time.",
                date: "2023/09/05",
                views: 11200,
                category: "Security"
            },
            {
                id: 15,
                image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
                authorImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop",
                authorName: "Robert Taylor",
                title: "AI in Medical Imaging: A New Era",
                description: "Advanced algorithms are helping radiologist detect anomalies with unprecedented accuracy.",
                date: "2023/10/22",
                views: 13500,
                category: "Healthcare"
            },
            {
                id: 16,
                image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
                authorImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop",
                authorName: "John Smith",
                title: "Chatbots in Customer Service",
                description: "Real-world examples of how chatbots are improving customer satisfaction and reducing support costs.",
                date: "2023/11/18",
                views: 10200,
                category: "Business"
            }
        ],
        'opportunities': [
            {
                id: 8,
                image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop",
                authorImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop",
                authorName: "HR Team",
                title: "Senior React Developer - Join Our Team",
                description: "We are looking for an experienced React developer to help build the next generation of our web applications. Competitive salary and remote work options available.",
                date: "2023/12/01",
                views: 5600,
                category: "Job Opening"
            },
            {
                id: 9,
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
                authorImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop",
                authorName: "Partnership Lead",
                title: "Call for Strategic Partners: AI Integration Program",
                description: "Are you an AI startup looking to scale? Join our strategic partnership program and gain access to our extensive network of potential clients and investors.",
                date: "2023/11/20",
                views: 4500,
                category: "Partnership"
            },
            {
                id: 17,
                image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
                authorImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1887&auto=format&fit=crop",
                authorName: "Recruiting Manager",
                title: "Product Designer - Remote",
                description: "Design intuitive and beautiful user experiences for our global user base.",
                date: "2024/01/05",
                views: 6700,
                category: "Job Opening"
            },
            {
                id: 18,
                image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
                authorImage: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1887&auto=format&fit=crop",
                authorName: "Sales Director",
                title: "Enterprise Account Executive",
                description: "Drive revenue growth by closing large enterprise deals. High commission potential.",
                date: "2024/01/15",
                views: 5200,
                category: "Job Opening"
            }
        ]
    };

    const currentArticles = allArticles[activeTab as keyof typeof allArticles] || allArticles.blogs;

    const filteredArticles = currentArticles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const firstRowArticles = filteredArticles.slice(0, 3);
    const remainingArticles = filteredArticles.slice(3);

    const featuredContent = {
        blogs: {
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2664&auto=format&fit=crop",
            authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop",
            authorName: "Saraji Kolhyseg",
            title: "Artificial Intelligence Beyond Imaginations",
            description: "Artificial Intelligence Has Been Advancing Beyond What Humans Have Imagined For Decades And Will Dominate Humans In The Coming Years...",
            highlight: "What Humans Have Imagined",
            buttonText: "Read Story"
        },
        'opinion-pieces': {
            image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2070&auto=format&fit=crop",
            authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop",
            authorName: "James Carter",
            title: "The Ethical Dilemmas of AI in Healthcare",
            description: "As AI becomes more integrated into patient diagnosis and treatment, we must ask ourselves: where do we draw the line between efficiency and empathy?",
            highlight: "efficiency and empathy",
            buttonText: "Read Opinion"
        },
        'ai-in-use': {
            image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2006&auto=format&fit=crop",
            authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
            authorName: "David Lee",
            title: "How AI is Revolutionizing Supply Chain Management",
            description: "From predictive analytics to autonomous warehouses, see how major corporations are using AI to optimize their supply chains and reduce costs.",
            highlight: "optimize their supply chains",
            buttonText: "Read Case Study"
        },
        'opportunities': {
            image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop",
            authorImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop",
            authorName: "HR Team",
            title: "Join The Future of Web Development",
            description: "We are constantly looking for talented individuals to join our growing team. Check out our latest openings and be part of something great.",
            highlight: "talented individuals",
            buttonText: "View Openings"
        }
    };

    const currentFeatured = featuredContent[activeTab as keyof typeof featuredContent] || featuredContent.blogs;

    return (
        <>
            <Header />
            <div className="min-h-screen bg-[#F8F9FA] text-gray-900 font-sans selection:bg-[#f25a1a] selection:text-white pt-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Header Section */}
                    <header className="mb-12">
                        <h1 className="text-4xl font-bold mb-3 tracking-tight text-gray-900">Resource Centre</h1>
                        <p className="text-gray-500 text-sm max-w-xl leading-relaxed mb-8">
                            Discover the best in resource centre. {currentTabInfo.description}
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
                            <div className="h-px w-8 bg-gray-300"></div>
                            <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">{currentTabInfo.label}</h2>
                            <div className="h-px w-8 bg-gray-300"></div>
                        </div>
                    </div>

                    {/* Featured Article */}
                    <section className="mb-20">
                        <div className="relative w-full rounded-[2.5rem] overflow-hidden group shadow-2xl shadow-orange-900/10">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#f25a1a]/10 to-purple-600/10 mix-blend-overlay z-10 pointer-events-none" />
                            <img
                                src={currentFeatured.image}
                                alt={currentFeatured.title}
                                className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-4xl px-4 z-20">
                                <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md pr-6 pl-2 py-1.5 rounded-full mb-8 shadow-lg">
                                    <img src={currentFeatured.authorImage} alt={currentFeatured.authorName} className="w-10 h-10 rounded-full object-cover border-2 border-white" />
                                    <span className="text-gray-900 font-bold text-sm">{currentFeatured.authorName}</span>
                                </div>

                                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-lg leading-tight">
                                    {currentFeatured.title}
                                </h2>

                                <p className="text-gray-200 font-medium text-sm md:text-lg max-w-2xl mx-auto leading-relaxed mb-6">
                                    {currentFeatured.description.split(currentFeatured.highlight)[0]}
                                    <span className="text-[#ff7043] font-bold">{currentFeatured.highlight}</span>
                                    {currentFeatured.description.split(currentFeatured.highlight)[1]}
                                </p>

                                <button className="bg-[#f25a1a] hover:bg-[#d94e16] text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-[#f25a1a]/50 flex items-center gap-2 mx-auto">
                                    {currentFeatured.buttonText} <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Articles Grid - Part 1 (First 3 items) */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {firstRowArticles.map(article => (
                            <BlogCard key={article.id} {...article} />
                        ))}
                    </section>

                    {/* Mid-Page Banner */}
                    <section className="mb-20">
                        <div className="relative w-full rounded-2xl overflow-hidden group shadow-xl">
                            <img
                                src={currentMidPageContent.image}
                                alt={currentMidPageContent.title}
                                className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                            {/* Content Aligned Left similar to image */}
                            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3 text-white">
                                <span className="uppercase tracking-widest text-sm font-semibold mb-3 block opacity-80">Featured</span>
                                <h3 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{currentMidPageContent.title}</h3>
                                <p className="text-base md:text-lg opacity-90 mb-8 max-w-xl leading-relaxed">{currentMidPageContent.description}</p>
                            </div>
                            {/* Right Arrow (Visual cue) */}
                            <div className="absolute top-1/2 right-8 -translate-y-1/2 hidden md:block">
                                <ArrowRight className="w-12 h-12 text-white/50" />
                            </div>
                        </div>
                    </section>

                    {/* Articles Grid - Part 2 (Remaining items) */}
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


                    {/* Bottom CTA Section */}
                    <section className="mt-24 mb-20">
                        <div className="rounded-[2.5rem] bg-[#111827] text-white p-12 md:p-20 text-center relative overflow-hidden">
                            {/* Background decoration */}
                            <div className="absolute top-0 transform -translate-x-1/2 left-1/2 w-[600px] h-[300px] bg-[#f25a1a]/20 blur-[100px] rounded-full pointer-events-none" />

                            <div className="relative z-10 max-w-3xl mx-auto">
                                <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
                                    Ready to Supercharge <br />
                                    <span className="text-[#f25a1a]">Your Workflow?</span>
                                </h2>
                                <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
                                    Discover the best AI tools and apps curated for developers and businesses. Don't miss out on the next big thing.
                                </p>
                                <button className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                    Explore Top Products
                                </button>
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
