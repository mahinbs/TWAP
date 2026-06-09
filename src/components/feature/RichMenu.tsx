import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi } from '../../lib/api';

interface RichMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

interface MenuContentItem { title?: string; desc?: string; image?: string; link?: string }
interface MenuCategoryEntry {
    id: string;
    label: string;
    link?: string;
    content: MenuContentItem[];
}

export default function RichMenu({ isOpen, onClose }: RichMenuProps) {
    const { data: section } = useQuery({
        queryKey: ['page-section', 'global', 'rich_menu'],
        queryFn: () => siteContentApi.section('global', 'rich_menu'),
    });

    const content = (section?.content ?? {}) as Record<string, unknown>;
    const categories = (content.categories as MenuCategoryEntry[] | undefined) ?? [];

    const [activeCategory, setActiveCategory] = useState<string>('');

    useEffect(() => {
        if (!activeCategory && categories.length > 0) {
            const firstTab = categories.find(c => !c.link);
            if (firstTab) setActiveCategory(firstTab.id);
        }
    }, [categories, activeCategory]);

    if (!isOpen) return null;
    if (categories.length === 0) return null;

    const activeCat = categories.find(c => c.id === activeCategory);

    return (
        <div className="flex fixed inset-0 z-40 items-start justify-center pt-24 pb-10 px-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative z-50 w-full max-w-5xl bg-[#1a1b20]/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200" style={{ height: 'min(600px, 80vh)' }}>
                <div className="flex flex-col md:flex-row h-full">
                    {/* Sidebar */}
                    <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/5 bg-[#131418]/50 p-6 overflow-y-auto max-h-[40%] md:max-h-full">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 px-4">
                            {String(content.menu_label ?? 'Menu')}
                        </h3>
                        <div className="space-y-2">
                            {categories.map(cat => cat.link ? (
                                <Link
                                    key={cat.id}
                                    to={cat.link}
                                    onClick={onClose}
                                    className="w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-['Manrope'] font-medium text-base flex items-center justify-between group text-gray-400 hover:text-white hover:bg-white/5 block"
                                >
                                    {cat.label}
                                </Link>
                            ) : (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-['Manrope'] font-medium text-base flex items-center justify-between group ${
                                        activeCategory === cat.id
                                            ? 'bg-[#f25a1a]/10 text-white'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {cat.label}
                                    {activeCategory === cat.id && (
                                        <i className="ri-arrow-right-s-line text-[#f25a1a]" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-2/3 p-8 overflow-y-auto bg-gradient-to-br from-[#1a1b20]/50 to-[#131418]/50">
                        {activeCat && activeCat.content.length > 0 && (
                            <>
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-white mb-2">{activeCat.label}</h3>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                                    {activeCat.content.map((item, index) => {
                                        const Card = (
                                            <>
                                                <div className="relative aspect-video rounded-xl overflow-hidden mb-3 border border-white/5">
                                                    {item.image && (
                                                        <img src={item.image} alt={item.title ?? ''} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                    )}
                                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                                                </div>
                                                <h4 className="text-white font-semibold text-lg mb-1 group-hover:text-[#f25a1a] transition-colors">{item.title}</h4>
                                                {item.desc && <p className="text-sm text-gray-400 line-clamp-2">{item.desc}</p>}
                                            </>
                                        );
                                        return item.link ? (
                                            <Link key={index} to={item.link} className="group cursor-pointer block" onClick={onClose}>
                                                {Card}
                                            </Link>
                                        ) : (
                                            <div key={index} className="group cursor-pointer">{Card}</div>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
