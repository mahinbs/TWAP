import { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/feature/Header";
import Footer from "../../components/feature/Footer";

interface LearningPoint {
  title: string;
  description: string;
}

interface BlogPost {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  heroImage: string;
  subheading: string;
  introParagraph: string;
  whatYouLearn: LearningPoint[];
  conclusion: string;
}

interface NextArticle {
  slug: string;
  title: string;
  category: string;
  image: string;
}

const blogPosts: Record<string, BlogPost> = {
  "the-ultimate-guide-to-budgeting-in-2024": {
    slug: "the-ultimate-guide-to-budgeting-in-2024",
    date: "August 12, 2024",
    title: "The Ultimate Guide to Budgeting in 2024",
    excerpt:
      "Our Finance insights blog is dedicated to bringing you the latest news, expert advice, and actionable strategies to help",
    heroImage:
      "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    subheading: "Accounts payable audit",
    introParagraph:
      "Budgeting is the cornerstone of financial stability, and 2024 presents new opportunities and challenges. Whether you're managing personal finances or overseeing business accounts, a clear budgeting strategy helps you allocate resources, track spending, and plan for the future. This guide walks you through the essentials of creating and maintaining an effective budget in the current economic landscape.",
    whatYouLearn: [
      {
        title: "Why Budgeting Matters More Than Ever",
        description:
          "Understand the importance of budgeting in an era of inflation, rising costs, and economic uncertainty. A solid budget gives you control and visibility over your finances.",
      },
      {
        title: "Steps to Building a Realistic Budget",
        description:
          "Learn the step-by-step process of creating a budget that fits your income, goals, and lifestyle. We cover the 50/30/20 rule and custom approaches.",
      },
      {
        title: "Tracking Your Expenses",
        description:
          "Discover the best practices for monitoring daily and monthly spending. From apps to spreadsheets, find the method that works for you.",
      },
      {
        title: "Adapting to Inflation and Market Changes",
        description:
          "Get tips on adjusting your budget to account for inflation, market fluctuations, and other external factors that impact your purchasing power.",
      },
      {
        title: "Tools and Apps for Budgeting Success",
        description:
          "Explore the latest tools and apps that can simplify the budgeting process and help you manage your money more efficiently.",
      },
    ],
    conclusion:
      "By the end of this guide, you'll have a clear, actionable plan to take control of your finances in 2024. Whether you're new to budgeting or looking to refine your existing approach, this guide will empower you to make informed decisions and set yourself up for financial success.",
  },
};

const nextArticles: NextArticle[] = [
  {
    slug: "budgeting-basics",
    title: "Budgeting Basics for Small Business",
    category: "Accounts payable",
    image:
      "https://images.pexels.com/photos/5691502/pexels-photo-5691502.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1",
  },
  {
    slug: "business-growth-strategies",
    title: "5 Strategies for Sustainable Business Growth",
    category: "Business growth",
    image:
      "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1",
  },
  {
    slug: "financial-news-roundup",
    title: "Weekly Financial News Roundup",
    category: "Accounts payable",
    image:
      "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1",
  },
  {
    slug: "cash-flow-management",
    title: "Cash Flow Management Best Practices",
    category: "Business",
    image:
      "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1",
  },
];

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const carouselRef = useRef<HTMLDivElement>(null);

  const post =
    slug && blogPosts[slug] ? blogPosts[slug] : Object.values(blogPosts)[0];

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cardWidth = 320;
    const gap = 16;
    const scrollAmount = (cardWidth + gap) * (direction === "left" ? -1 : 1);
    const newScroll = container.scrollLeft + scrollAmount;
    container.scrollTo({ left: Math.max(0, newScroll), behavior: "smooth" });
  };

  if (!post) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#F6F6F6] pt-28 pb-16 flex items-center justify-center">
          <p className="text-gray-600">Blog post not found.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F6F6] font-sans text-gray-800">
      <Header />
      <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <article className="max-w-5xl mx-auto">
          {/* Metadata */}
          <div className="mb-6">
            <p className="text-gray-500 text-sm mt-3">{post.date}</p>
          </div>

          {/* Hero block */}
          <div className="bg-[#F8F8F8] rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-10 border border-gray-200/60 shadow-sm">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
              {post.title}
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
              {post.excerpt}
            </p>
            <div className="rounded-lg sm:rounded-xl overflow-hidden shadow-md">
              <img
                src={post.heroImage}
                alt={post.title}
                className="w-full h-auto object-cover aspect-video"
              />
            </div>
          </div>

          {/* Main content */}
          <div className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              {post.subheading}
            </h2>
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              {post.introParagraph}
            </p>

            {/* What You'll Learn */}
            <section>
              <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
                What You'll Learn:
              </h3>
              <div className="space-y-6">
                {post.whatYouLearn.map((point, index) => (
                  <div key={index} className="space-y-1">
                    <h4 className="font-bold text-gray-900 text-base sm:text-lg">
                      {point.title}:
                    </h4>
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base pl-0 sm:pl-1">
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              {post.conclusion}
            </p>
          </div>

          {/* Separator */}
          <div className="flex justify-center my-12">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-800/90" />
          </div>

          {/* Read Our Next Article */}
          <section className="mt-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Read Our Next Article
              </h2>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => scrollCarousel("left")}
                  className="w-10 h-10 rounded-full bg-teal-700 hover:bg-teal-800 text-white flex items-center justify-center transition-colors shadow-md"
                  aria-label="Previous articles"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel("right")}
                  className="w-10 h-10 rounded-full bg-teal-700 hover:bg-teal-800 text-white flex items-center justify-center transition-colors shadow-md"
                  aria-label="Next articles"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto pb-2 -mx-1 scroll-smooth scrollbar-thin"
              style={{ scrollbarWidth: "thin" }}
            >
              {nextArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/blog/${article.slug}`}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] group"
                >
                  <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-semibold bg-teal-700 text-white shadow-sm">
                        {article.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 group-hover:text-teal-700 transition-colors">
                        {article.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
