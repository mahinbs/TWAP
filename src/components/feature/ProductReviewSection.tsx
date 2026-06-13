import { Link } from "react-router-dom";

// Mock Data
const reviewSections = [
    {
        title: "Product Review: Web App Review",
        products: [
            {
                id: 401,
                name: "WebFlow Pro",
                rating: "4.2/5",
                stars: 4,
                description: "Professional web design tool with advanced features and templates",
                icon: "ri-global-line",
                iconColor: "text-brand-orange bg-brand-orange/10"
            },
            {
                id: 402,
                name: "Analytics Dashboard",
                rating: "4.8/5",
                stars: 5,
                description: "Comprehensive analytics solution for tracking business metrics",
                icon: "ri-bar-chart-box-line",
                iconColor: "text-brand-lime bg-brand-lime/10"
            }
        ]
    },
    {
        title: "Product Review: Extension App Review",
        products: [
            {
                id: 403,
                name: "Productivity Booster",
                rating: "4.5/5",
                stars: 4, // 4.5 visually
                description: "Browser extension that enhances productivity with smart shortcuts",
                icon: "ri-chrome-fill",
                iconColor: "text-brand-orange bg-brand-orange/10"
            },
            {
                id: 404,
                name: "Security Guard",
                rating: "4.9/5",
                stars: 5,
                description: "Advanced security extension for safe browsing and privacy protection",
                icon: "ri-shield-check-line",
                iconColor: "text-brand-lime bg-brand-lime/10"
            }
        ]
    }
];

export default function ProductReviewSection() {
    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {reviewSections.map((section, idx) => (
                    <div key={idx} className={`mb-12 ${idx !== 0 ? 'mt-12 pt-12 border-t border-gray-100' : ''}`}>
                        <h2 className="text-2xl font-medium text-[#1F2853] mb-8">{section.title}</h2>

                        <div className="space-y-4">
                            {section.products.map((product) => (
                                <div key={product.id} className="flex flex-col md:flex-row items-center gap-6 p-6 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow group">
                                    {/* Icon */}
                                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${product.iconColor}`}>
                                        <i className={product.icon}></i>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="font-bold text-lg text-[#1F2853] mb-1">{product.name}</h3>

                                        {/* Rating */}
                                        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                            <div className="flex text-gray-200 text-sm">
                                                {[...Array(5)].map((_, i) => (
                                                    <i key={i} className={`ri-star-fill ${i < product.stars ? 'text-brand-orange' : ''}`}></i>
                                                ))}
                                            </div>
                                            <span className="text-xs font-bold text-gray-500">{product.rating}</span>
                                        </div>

                                        <p className="text-sm text-gray-500">{product.description}</p>
                                    </div>

                                    {/* Action */}
                                    <Link
                                        to="#"
                                        className="px-8 py-3 bg-brand-dark text-white text-sm font-bold rounded-lg hover:bg-brand-orange transition-colors whitespace-nowrap"
                                    >
                                        Explore
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
