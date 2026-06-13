import { useState } from 'react';
import { Link } from 'react-router-dom';

const menuCategories = [
    {
        id: 'trending',
        label: 'Trending Apps',
        content: [
            { title: 'AI Copywriter', desc: 'Generate marketing copy in seconds.', image: 'https://images.unsplash.com/photo-1664575602554-2087b04935a5?auto=format&fit=crop&q=80&w=400' },
            { title: 'TaskMaster Pro', desc: 'Organize your team workflow efficiently.', image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=400' },
        ]
    },
    {
        id: 'top-ai',
        label: 'Top AI Tools & Apps',
        content: [{ title: 'MidJourney Guide', desc: 'Master the art of AI image generation.', image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&q=80&w=400' }],

    },
    {
        id: 'stories',
        label: 'Interviews & Success Stories',
        content: [
            { title: 'TechFlow Growth', desc: 'How TechFlow increased their user retention by 40% with AI.', image: 'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=400' },
            { title: 'DesignHive', desc: 'Scaling from 0 to 10k users: The DesignHive growth story.', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=400' }
        ]
    },
    {
        id: 'agency',
        label: 'Agency Feature',
        link: '/agencies',
        content: []
    },
    {
        id: 'resource',
        label: 'Resource Centre',
        content: [
            { title: 'Blogs', desc: 'Latest insights and trends in the tech world.', image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=400', link: '/resource-centre/blogs' },
            { title: 'Opinion Pieces', desc: 'Expert perspectives on the future of AI and development.', image: 'https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?auto=format&fit=crop&q=80&w=400', link: '/resource-centre/opinion-pieces' },
            { title: 'AI in Use', desc: 'Real-world applications and case studies of AI integration.', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=400', link: '/resource-centre/ai-in-use' },
            { title: 'Opportunities', desc: 'Career growth, job openings, and partnership programs.', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=400', link: '/resource-centre/opportunities' }
        ]
    }
];

interface RichMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RichMenu({ isOpen, onClose }: RichMenuProps) {
    const [activeCategory, setActiveCategory] = useState('trending');

    if (!isOpen) return null;

    return (
        <div className="flex fixed inset-0 z-40 items-start justify-center pt-24 pb-10 px-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative z-50 w-full max-w-5xl bg-[#1a1b20]/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200" style={{ height: 'min(600px, 80vh)' }}>
                <div className="flex flex-col md:flex-row h-full">
                    {/* Left Sidebar - Categories */}
                    <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/5 bg-[#131418]/50 p-6 overflow-y-auto max-h-[40%] md:max-h-full">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 px-4">Menu</h3>
                        <div className="space-y-2">
                            {menuCategories.map((category) => (
                                (category as any).link ? (
                                    <Link
                                        key={category.id}
                                        to={(category as any).link}
                                        onClick={onClose}
                                        className="w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-['Manrope'] font-medium text-base flex items-center justify-between group text-gray-400 hover:text-white hover:bg-white/5"
                                    >
                                        {category.label}
                                    </Link>
                                ) : (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-['Manrope'] font-medium text-base flex items-center justify-between group ${activeCategory === category.id
                                            ? 'bg-[#f25a1a]/10 text-white'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {category.label}
                                        {activeCategory === category.id && (
                                            <i className="ri-arrow-right-s-line text-[#f25a1a]"></i>
                                        )}
                                    </button>
                                )
                            ))}
                        </div>
                    </div>

                    {/* Right Content - Cards */}
                    <div className="w-full md:w-2/3 p-8 overflow-y-auto bg-gradient-to-br from-[#1a1b20]/50 to-[#131418]/50">
                        {activeCategory === 'top-ai' ? (
                            <div className="w-full h-full relative rounded-2xl overflow-hidden group cursor-pointer border border-white/10">
                                <img
                                    src={menuCategories.find(c => c.id === 'top-ai')?.content[0].image}
                                    alt={menuCategories.find(c => c.id === 'top-ai')?.content[0].title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                                    <div className="absolute bottom-0 left-0 p-8 w-full">
                                        <h4 className="text-white font-bold text-xl mb-2">{menuCategories.find(c => c.id === 'top-ai')?.content[0].title}</h4>
                                        <p className="text-gray-300 mb-6 text-sm leading-relaxed max-w-md">{menuCategories.find(c => c.id === 'top-ai')?.content[0].desc}</p>
                                        <Link to='/tools' className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all">
                                            Learn more
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-white mb-2">{menuCategories.find(c => c.id === activeCategory)?.label}</h3>
                                    <p className="text-gray-400">Discover the best in {menuCategories.find(c => c.id === activeCategory)?.label.toLowerCase()}.</p>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                                    {menuCategories.find(c => c.id === activeCategory)?.content.map((item: any, index) => {
                                        const CardContent = () => (
                                            <>
                                                <div className="relative aspect-video rounded-xl overflow-hidden mb-3 border border-white/5">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300"></div>
                                                </div>
                                                <h4 className="text-white font-semibold text-lg mb-1 group-hover:text-[#f25a1a] transition-colors">{item.title}</h4>
                                                <p className="text-sm text-gray-400 line-clamp-2">{item.desc}</p>
                                            </>
                                        );

                                        return item.link ? (
                                            <Link
                                                key={index}
                                                to={item.link}
                                                className="group cursor-pointer block"
                                                onClick={onClose}
                                            >
                                                <CardContent />
                                            </Link>
                                        ) : (
                                            <div key={index} className="group cursor-pointer">
                                                <CardContent />
                                            </div>
                                        );
                                    })}
                                </div>

                                {activeCategory === 'stories' && (
                                    <div className="mt-8 pt-8 border-t border-white/5 flex justify-end">
                                        <Link
                                            to="/interviews-success-stories"
                                            className="flex items-center space-x-2 text-sm text-[#f25a1a] hover:text-[#ff7043] font-medium transition-colors"
                                            onClick={onClose}
                                        >
                                            <span>Read More Stories</span>
                                            <i className="ri-arrow-right-line"></i>
                                        </Link>
                                    </div>
                                )}
                            </>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
