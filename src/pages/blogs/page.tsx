
import React, { useState } from 'react';
import { Search, Twitter, Youtube, ArrowRight } from 'lucide-react';
import BlogCard from '../../components/feature/BlogCard';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

const BlogsPage = () => {
    const [activeCategory, setActiveCategory] = useState("Technology");

    const categories = [
        "All",
        "Manufacturing",
        "Technology",
        "Sport",
        "Design",
        "Programming",
        "Engineering"
    ];

    const articles = [
      
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
        }
    ];

    return (
        <>
            <Header />
            <div className="min-h-screen bg-[#F8F9FA] text-gray-900 font-sans selection:bg-blue-500 selection:text-white pt-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Header Section */}
                    <header className="mb-16">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h1 className="text-4xl font-bold mb-3 tracking-tight text-gray-900">Discover Nice Articles Here</h1>
                                <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
                                    All The Articles And Contents Of The Site Have Been <span className="text-blue-600 font-semibold">Updated Today</span> And You Can Find Your <span className="text-blue-600 font-semibold">Articles And Contents</span> Quickly And Without Any Problems.
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
                                <div className="absolute inset-0 bg-blue-200/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full bg-white shadow-sm border border-gray-200 focus:border-blue-500 rounded-full py-3 pl-12 pr-4 text-sm text-gray-700 placeholder-gray-400 outline-none transition-all relative z-10"
                                />
                            </div>

                            <div className="flex flex-wrap gap-2 justify-center">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 border ${activeCategory === cat
                                                ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30'
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
                        <div className="inline-flex items-center justify-center space-x-2 mb-8">
                            <div className="h-px w-8 bg-gray-300"></div>
                            <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">Articles</h2>
                            <div className="h-px w-8 bg-gray-300"></div>
                        </div>
                    </div>

                    {/* Featured Article */}
                    <section className="mb-20">
                        <div className="relative w-full rounded-[2.5rem] overflow-hidden group shadow-2xl shadow-blue-900/10">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 mix-blend-overlay z-10 pointer-events-none" />
                            <img
                                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2664&auto=format&fit=crop"
                                alt="AI Technology"
                                className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-4xl px-4 z-20">
                                <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md pr-6 pl-2 py-1.5 rounded-full mb-8 shadow-lg">
                                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop" alt="Saraji" className="w-10 h-10 rounded-full object-cover border-2 border-white" />
                                    <span className="text-gray-900 font-bold text-sm">Saraji Kolhyseg</span>
                                </div>

                                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-lg leading-tight">
                                    Artificial Intelligence Beyond Imaginations
                                </h2>

                                <p className="text-gray-200 font-medium text-sm md:text-lg max-w-2xl mx-auto leading-relaxed mb-6">
                                    Artificial Intelligence Has Been Advancing Beyond <span className="text-blue-400 font-bold">What Humans Have Imagined</span> For Decades And Will Dominate Humans In The Coming Years...
                                </p>

                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-blue-500/50 flex items-center gap-2 mx-auto">
                                    Read Story <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-center gap-2 mt-8">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-600 transition-all hover:scale-125 cursor-pointer"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-gray-300 transition-all hover:scale-125 cursor-pointer hover:bg-gray-400"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-gray-300 transition-all hover:scale-125 cursor-pointer hover:bg-gray-400"></div>
                        </div>
                    </section>

                    {/* Articles Grid */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map(article => (
                            <BlogCard key={article.id} {...article} />
                        ))}
                    </section>

                </div>
            </div>
            <Footer />
        </>
    );
};

export default BlogsPage;
