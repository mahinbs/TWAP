import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { siteContentApi, toolsApi } from "../../lib/api";

const FALLBACK = [
  {
    title: "Product Review: Web App Review",
    products: [
      { id: "401", name: "WebFlow Pro", rating: "4.2/5", stars: 4, description: "Professional web design tool with advanced features and templates", icon: "ri-global-line", iconColor: "text-brand-orange bg-brand-orange/10", link: "#" },
      { id: "402", name: "Analytics Dashboard", rating: "4.8/5", stars: 5, description: "Comprehensive analytics solution for tracking business metrics", icon: "ri-bar-chart-box-line", iconColor: "text-brand-lime bg-brand-lime/10", link: "#" },
    ],
  },
  {
    title: "Product Review: Extension App Review",
    products: [
      { id: "403", name: "Productivity Booster", rating: "4.5/5", stars: 4, description: "Browser extension that enhances productivity with smart shortcuts", icon: "ri-chrome-fill", iconColor: "text-brand-orange bg-brand-orange/10", link: "#" },
      { id: "404", name: "Security Guard", rating: "4.9/5", stars: 5, description: "Advanced security extension for safe browsing and privacy protection", icon: "ri-shield-check-line", iconColor: "text-brand-lime bg-brand-lime/10", link: "#" },
    ],
  },
];

export default function ProductReviewSection() {
  const { data: reviewsSection } = useQuery({
    queryKey: ['page-section', 'tools', 'reviews'],
    queryFn: () => siteContentApi.section('tools', 'reviews'),
  });

  const { data: reviewItems = [] } = useQuery({
    queryKey: ['tools-items', 'reviews'],
    queryFn: () => toolsApi.items('reviews'),
  });

  const exploreText = ((reviewsSection?.content ?? {}) as Record<string, string>).explore_button_text ?? 'Explore';

  const reviewSections = reviewItems.length > 0
    ? (() => {
        const groups = new Map<string, typeof FALLBACK[0]['products']>();
        for (const item of reviewItems) {
          const ex = (item.extras ?? {}) as Record<string, string | number>;
          const groupTitle = (ex.group_title as string) ?? 'Reviews';
          const product = {
            id: item.id,
            name: item.title,
            rating: (ex.rating as string) ?? '',
            stars: Number(ex.stars) || 0,
            description: item.description ?? '',
            icon: item.icon ?? 'ri-star-fill',
            iconColor: (ex.icon_color as string) ?? 'text-brand-orange bg-brand-orange/10',
            link: item.link_url ?? '#',
          };
          if (!groups.has(groupTitle)) groups.set(groupTitle, []);
          groups.get(groupTitle)!.push(product);
        }
        return Array.from(groups.entries()).map(([title, products]) => ({ title, products }));
      })()
    : FALLBACK;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {reviewSections.map((section, idx) => (
          <div key={section.title} className={`mb-12 ${idx !== 0 ? 'mt-12 pt-12 border-t border-gray-100' : ''}`}>
            <h2 className="text-2xl font-medium text-[#1F2853] mb-8">{section.title}</h2>

            <div className="space-y-4">
              {section.products.map((product) => (
                <div key={product.id} className="flex flex-col md:flex-row items-center gap-6 p-6 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow group">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${product.iconColor}`}>
                    <i className={product.icon} />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h3 className="font-bold text-lg text-[#1F2853] mb-1">{product.name}</h3>

                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <div className="flex text-gray-200 text-sm">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={`ri-star-fill ${i < product.stars ? 'text-brand-orange' : ''}`} />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-gray-500">{product.rating}</span>
                    </div>

                    <p className="text-sm text-gray-500">{product.description}</p>
                  </div>

                  <Link
                    to={product.link}
                    className="px-8 py-3 bg-brand-dark text-white text-sm font-bold rounded-lg hover:bg-brand-orange transition-colors whitespace-nowrap"
                  >
                    {exploreText}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
