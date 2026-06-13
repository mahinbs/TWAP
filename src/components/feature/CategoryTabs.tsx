
import { useState } from 'react';

const categories = [
  { id: 'marketing', name: 'Marketing' },
  { id: 'productivity', name: 'Productivity' },
  { id: 'finance', name: 'Finance' },
  { id: 'design', name: 'Design' }
];

export default function CategoryTabs() {
  const [activeCategory, setActiveCategory] = useState('marketing');

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2853] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            Top App Reviews – Handpicked for You
          </h2>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-[#f25a1a] text-white shadow-md'
                  : 'bg-[#f7f5ef] text-[#1F2853] hover:bg-[#f25a1a] hover:text-white'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Category Content Placeholder */}
        <div className="text-center py-8">
          <p className="text-[#1F2853]/60 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
            Showing {categories.find(cat => cat.id === activeCategory)?.name} apps
          </p>
        </div>
      </div>
    </section>
  );
}