import { useState } from "react";

interface LovedApp {
  rank: number;
  name: string;
  description: string;
  votes: number;
  category: string;
  weeklyGrowth: number;
  badge?: string;
}

const mockLovedApps: LovedApp[] = [
  {
    rank: 1,
    name: "Claude AI",
    description: "Advanced AI assistant for complex reasoning",
    votes: 12847,
    category: "AI Tools",
    weeklyGrowth: 23,
    badge: "🔥 Trending",
  },
  {
    rank: 2,
    name: "Perplexity AI",
    description: "AI-powered search and research assistant",
    votes: 11293,
    category: "Research",
    weeklyGrowth: 18,
    badge: "⚡ Rising Fast",
  },
  {
    rank: 3,
    name: "Linear",
    description: "Modern issue tracking and project management",
    votes: 9876,
    category: "Productivity",
    weeklyGrowth: 15,
  },
  {
    rank: 4,
    name: "Cursor",
    description: "AI-powered code editor for developers",
    votes: 8654,
    category: "Development",
    weeklyGrowth: 31,
    badge: "🚀 Hot",
  },
  {
    rank: 5,
    name: "Gamma",
    description: "AI presentation maker with beautiful designs",
    votes: 7432,
    category: "Design",
    weeklyGrowth: 12,
  },
  {
    rank: 6,
    name: "Superhuman",
    description: "The fastest email experience ever made",
    votes: 6891,
    category: "Productivity",
    weeklyGrowth: 8,
  },
];

export default function MostLovedApps() {
  const [showAll, setShowAll] = useState(false);
  const displayedApps = showAll ? mockLovedApps : mockLovedApps.slice(0, 4);

  const formatVotes = (votes: number) => {
    if (votes >= 1000) {
      return `${(votes / 1000).toFixed(1)}k`;
    }
    return votes.toString();
  };

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background Image with Opacity */}
      <div
        className="absolute inset-0 z-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url('/assets/loved-apps-bg1.webp')`,
          backgroundSize: "80%",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-transparent to-white/80 h-full w-full py-6 z-[1]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[2]">
        {/* Header */}
        <div className="text-center mb-12 reveal-fade-up">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ color: "#1F2853", fontFamily: "Manrope, sans-serif" }}
          >
            Most Loved Apps This Week
          </h2>
          <p
            className="text-xl text-gray-600"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Voted by users, for users
          </p>
        </div>

        {/* Leaderboard */}
        <div className="max-w-6xl mx-auto reveal-fade-up">
          <div
            className="rounded-2xl p-8 relative overflow-hidden group"
            style={{
              background:
                "#1F244A",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
            }}
          >
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent pointer-events-none"></div>

            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            ></div>

            <div className="relative z-10">
              <div className="space-y-6 reveal-stagger">
                {displayedApps.map((app, index) => (
                  <div
                    key={app.rank}
                    className="flex flex-col gap-5 md:gap-6 md:flex-row md:items-center p-5 sm:p-6 rounded-2xl transition-all duration-300 cursor-pointer hover:scale-[1.02] relative group/item overflow-hidden reveal-child"
                    style={{
                      background: "rgba(13, 16, 32, 0.55)",
                      backdropFilter: "blur(18px)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      boxShadow:
                        "0 8px 28px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ffcee0]/10 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>

                    {/* Rank */}
                    <div
                      className="relative z-10 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full font-bold text-lg sm:text-xl flex-shrink-0"
                      style={{
                        background:
                          index < 3
                            ? "linear-gradient(135deg, rgba(255, 206, 224, 0.9) 0%, rgba(255, 179, 214, 0.9) 100%)"
                            : "rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(10px)",
                        border:
                          index < 3
                            ? "2px solid rgba(255, 206, 224, 0.5)"
                            : "1px solid rgba(255, 255, 255, 0.2)",
                        color: index < 3 ? "#1F2853" : "#ffffff",
                        boxShadow:
                          index < 3
                            ? "0 4px 20px rgba(255, 206, 224, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
                            : "0 2px 10px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      #{app.rank}
                      {index < 3 && (
                        <div
                          className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs backdrop-blur-sm"
                          style={{
                            background: "rgba(255, 206, 224, 0.9)",
                            border: "1px solid rgba(255, 255, 255, 0.3)",
                            boxShadow: "0 2px 8px rgba(255, 206, 224, 0.5)",
                          }}
                        >
                          {index === 0 ? "👑" : index === 1 ? "🥈" : "🥉"}
                        </div>
                      )}
                    </div>

                    {/* Content blocks */}
                    <div className="flex-1 w-full flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
                      {/* App Info */}
                      <div className="flex-1 relative z-10">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                          <h3
                            className="font-semibold text-lg sm:text-xl text-white"
                            style={{ fontFamily: "Manrope, sans-serif" }}
                          >
                            {app.name}
                          </h3>
                          {app.badge && (
                            <span
                              className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                              style={{
                                background: "rgba(255, 206, 224, 0.9)",
                                color: "#1F2853",
                                border: "1px solid rgba(255, 255, 255, 0.3)",
                                boxShadow: "0 2px 8px rgba(255, 206, 224, 0.3)",
                              }}
                            >
                              {app.badge}
                            </span>
                          )}
                        </div>
                        <p
                          className="text-white/80 text-sm mb-2"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          {app.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-white/60">
                          <span style={{ fontFamily: "Poppins, sans-serif" }}>
                            {app.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <i className="ri-arrow-up-line text-green-400"></i>+
                            {app.weeklyGrowth}% this week
                          </span>
                        </div>
                      </div>

                      {/* Votes */}
                      <div className="text-left md:text-right relative z-10 md:min-w-[140px]">
                        <div className="flex items-center gap-2 mb-1">
                          <i className="ri-heart-fill text-red-400 text-base sm:text-lg"></i>
                          <span
                            className="text-2xl font-bold text-white leading-none"
                            style={{ fontFamily: "Manrope, sans-serif" }}
                          >
                            {formatVotes(app.votes)}
                          </span>
                        </div>
                        <p
                          className="text-white/60 text-xs"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          votes
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Show More Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="px-8 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap hover:scale-105 relative overflow-hidden group/btn"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 206, 224, 0.95) 0%, rgba(255, 179, 214, 0.95) 100%)",
                    backdropFilter: "blur(10px)",
                    color: "#1F2853",
                    fontFamily: "Poppins, sans-serif",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    boxShadow:
                      "0 4px 20px rgba(255, 206, 224, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                  }}
                >
                  <span className="relative z-10">
                    {showAll ? "Show Less" : "View All Loved Apps"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div
            className="text-center p-6 rounded-xl"
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <div
              className="text-3xl font-bold mb-2"
              style={{ color: "#1F2853", fontFamily: "Manrope, sans-serif" }}
            >
              50K+
            </div>
            <p
              className="text-gray-600"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Total Votes This Week
            </p>
          </div>

          <div
            className="text-center p-6 rounded-xl"
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <div
              className="text-3xl font-bold mb-2"
              style={{ color: "#1F2853", fontFamily: "Manrope, sans-serif" }}
            >
              127
            </div>
            <p
              className="text-gray-600"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Apps Competing
            </p>
          </div>

          <div
            className="text-center p-6 rounded-xl"
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <div
              className="text-3xl font-bold mb-2"
              style={{ color: "#1F2853", fontFamily: "Manrope, sans-serif" }}
            >
              24H
            </div>
            <p
              className="text-gray-600"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Voting Updates
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
