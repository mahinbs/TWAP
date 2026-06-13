import { useState } from 'react';

interface UserReview {
  rank: number;
  name: string;
  description: string;
  rating: number;
  userRating: number;
  reviewCount: number;
  category: string;
  badge?: string;
}

const userReviews: UserReview[] = [
  {
    rank: 1,
    name: "ChatGPT Plus",
    description: "Advanced AI conversational assistant",
    rating: 4.8,
    userRating: 4.9,
    reviewCount: 12847,
    category: "AI Tools",
    badge: "Most Loved"
  },
  {
    rank: 2,
    name: "Notion AI",
    description: "Smart workspace with AI features",
    rating: 4.6,
    userRating: 4.7,
    reviewCount: 8934,
    category: "Productivity"
  },
  {
    rank: 3,
    name: "Midjourney",
    description: "AI-powered image generation",
    rating: 4.7,
    userRating: 4.6,
    reviewCount: 7652,
    category: "Design",
    badge: "Trending"
  },
  {
    rank: 4,
    name: "Figma AI",
    description: "Design collaboration with AI",
    rating: 4.5,
    userRating: 4.5,
    reviewCount: 6234,
    category: "Design"
  },
  {
    rank: 5,
    name: "Grammarly",
    description: "AI writing assistant",
    rating: 4.4,
    userRating: 4.4,
    reviewCount: 5891,
    category: "Writing"
  }
];

export default function UserLeaderboard() {
  const [showAll, setShowAll] = useState(false);
  const displayedReviews = showAll ? userReviews : userReviews.slice(0, 3);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <i key={`full-${i}`} className="ri-star-fill text-yellow-400 text-sm"></i>
        ))}
        {hasHalfStar && <i className="ri-star-half-fill text-yellow-400 text-sm"></i>}
        {[...Array(emptyStars)].map((_, i) => (
          <i key={`empty-${i}`} className="ri-star-line text-gray-300 text-sm"></i>
        ))}
        <span className="text-sm text-gray-600 ml-1 font-medium">{rating}</span>
      </div>
    );
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800';
    if (rank === 3) return 'bg-gradient-to-r from-orange-300 to-orange-400 text-orange-900';
    return 'bg-blue-100 text-blue-600';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-[#ffcee0] rounded-full flex items-center justify-center">
          <i className="ri-user-star-line text-2xl text-[#1F2853]"></i>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#1F2853]" style={{ fontFamily: 'Manrope, sans-serif' }}>
            User Favorites
          </h2>
          <p className="text-gray-600 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Voted by users, for users
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        {displayedReviews.map((app) => (
          <div key={app.rank} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${getRankBadgeColor(app.rank)}`}>
              #{app.rank}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 truncate" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {app.name}
                </h3>
                {app.badge && (
                  <span className="px-2 py-1 bg-[#ffcee0] text-[#1F2853] text-xs font-medium rounded-full whitespace-nowrap">
                    {app.badge}
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {app.description}
              </p>
              <div className="flex items-center gap-4 mt-2">
                {renderStars(app.userRating)}
                <span className="text-xs text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {app.reviewCount.toLocaleString()} reviews
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <span className="text-xs text-gray-500 block" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {app.category}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <button 
          onClick={() => setShowAll(!showAll)}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors whitespace-nowrap"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {showAll ? 'Show Less' : 'View All User Favorites'}
        </button>
      </div>
    </div>
  );
}