
import React from 'react';
import { Calendar, Eye, Flame, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogCardProps {
    image: string;
    authorImage: string;
    authorName: string;
    title: string;
    description: string;
    date: string;
    views: number;
    category: string;
}

const BlogCard = ({
    image,
    authorImage,
    authorName,
    title,
    description,
    date,
    views,
    category,
}: BlogCardProps) => {
    return (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl overflow-hidden flex flex-col group hover:transform hover:scale-[1.02] transition-all duration-300 border border-white/40 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-[#f25a1a]/10">
            <div className="relative h-64 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/30 backdrop-blur-md p-2 rounded-full border border-white/20 shadow-sm">
                    <Flame className="w-5 h-5 text-[#FF5B29]" fill="#FF5B29" />
                </div>

                <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-white/90 backdrop-blur-sm pr-4 p-1 rounded-full shadow-lg">
                    <img src={authorImage} alt={authorName} className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-gray-900 text-sm font-medium">{authorName}</span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f25a1a]/10 text-[#f25a1a] border border-[#f25a1a]/20">
                        {category}
                    </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-[#f25a1a] transition-colors">
                    {title}
                </h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">
                    {description}
                </p>

                <div className="flex items-center gap-6 border-t border-gray-100 pt-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <Calendar className="w-4 h-4" />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <Eye className="w-4 h-4" />
                        <span>{views >= 1000 ? `${(views / 1000).toFixed(0)}K` : views} Viewers</span>
                    </div>
                </div>

                <Link to={`/blog/financial-news-roundup`} className="w-full py-3 rounded-full border border-gray-200 text-gray-700 bg-white/50 hover:bg-[#f25a1a] hover:text-white hover:border-transparent transition-all duration-300 text-sm font-semibold flex items-center justify-center gap-2 group/btn shadow-sm">
                    Read More
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
