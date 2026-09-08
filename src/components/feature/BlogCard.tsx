import { Calendar, Eye, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogCardProps {
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

const formatViews = (views: number) => {
    if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(views >= 10_000 ? 0 : 1).replace(/\.0$/, '')}K`;
    return String(views);
};

const BlogCard = ({
    slug,
    image,
    authorImage,
    authorName,
    title,
    description,
    date,
    views,
    category,
}: BlogCardProps) => {
    const href = slug ? `/blog/${slug}` : '/resource-centre/blogs';
    return (
        <article className="bg-white/70 backdrop-blur-xl rounded-3xl overflow-hidden flex flex-col group hover:transform hover:scale-[1.02] transition-all duration-300 border border-white/40 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-[#f25a1a]/10">
            <Link to={href} className="relative h-64 overflow-hidden block bg-gray-100" aria-label={title}>
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1F2853] via-[#2d3a6b] to-[#f25a1a]/70" />
                )}
                <div className="absolute top-4 right-4 bg-white/30 backdrop-blur-md p-2 rounded-full border border-white/20 shadow-sm">
                    <Flame className="w-5 h-5 text-[#FF5B29]" fill="#FF5B29" />
                </div>

                <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-white/90 backdrop-blur-sm pr-4 p-1 rounded-full shadow-lg">
                    {authorImage ? (
                        <img src={authorImage} alt={authorName} className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                        <span className="w-8 h-8 rounded-full bg-[#f25a1a] text-white flex items-center justify-center text-xs font-bold">
                            {(authorName || 'T').charAt(0).toUpperCase()}
                        </span>
                    )}
                    <span className="text-gray-900 text-sm font-medium">{authorName}</span>
                </div>
            </Link>

            <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f25a1a]/10 text-[#f25a1a] border border-[#f25a1a]/20">
                        {category}
                    </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-[#f25a1a] transition-colors">
                    <Link to={href}>{title}</Link>
                </h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">
                    {description}
                </p>

                <div className="flex items-center gap-6 border-t border-gray-100 pt-4 mb-6">
                    {date && (
                        <div className="flex items-center gap-2 text-gray-400 text-xs">
                            <Calendar className="w-4 h-4" />
                            <span>{date}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <Eye className="w-4 h-4" />
                        <span>{formatViews(views)} Viewers</span>
                    </div>
                </div>

                <Link to={href} className="w-full py-3 rounded-full border border-gray-200 text-gray-700 bg-white/50 hover:bg-[#f25a1a] hover:text-white hover:border-transparent transition-all duration-300 text-sm font-semibold flex items-center justify-center gap-2 group/btn shadow-sm">
                    Read More
                </Link>
            </div>
        </article>
    );
};

export default BlogCard;
