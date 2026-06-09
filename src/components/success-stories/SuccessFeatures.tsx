import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi, successStoriesApi } from '../../lib/api';

const FALLBACK = [
  { title: 'Engaging Stories', content: 'Discover the human side of success. We go beyond the numbers to uncover the struggles, pivots, and pivotal moments that define a true success story.' },
  { title: 'Actionable Advice', content: "Don't just read about success—replicate it. Our interviews are packed with practical strategies, frameworks, and tools you can apply to your business today." },
  { title: 'Community & Connection', content: 'Join a network of like-minded innovators. Connect with founders, participate in live Q&As, and get exclusive access to our private community channels.' },
];

const SuccessFeatures = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: section } = useQuery({
    queryKey: ['page-section', 'success_stories', 'features'],
    queryFn: () => siteContentApi.section('success_stories', 'features'),
  });

  const { data: items = [] } = useQuery({
    queryKey: ['success-stories-items', 'features'],
    queryFn: () => successStoriesApi.items('features'),
  });

  const content = (section?.content ?? {}) as Record<string, string>;
  const features = items.length > 0
    ? items.map(i => ({ title: i.title, content: i.description ?? '' }))
    : FALLBACK;

  const highlight = content.title_highlight ?? 'Growth Masters';
  const titleParts = (section?.title ?? 'Why Settle? Join the Growth Masters').split(highlight);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <span className="text-brand-orange font-bold text-xs tracking-widest uppercase mb-4 block">{section?.subtitle ?? 'Why Listen?'}</span>
            <h2 className="text-4xl font-bold text-brand-dark mb-6 leading-tight">
              {titleParts[0]}<br />
              <span className="text-brand-orange">{highlight}</span>
              {titleParts[1] ?? ''}
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">{section?.description}</p>
          </div>

          <div className="lg:col-span-4 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4]">
              <img
                src={section?.media_url ?? 'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=800'}
                alt="Podcast Hosts"
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-orange rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob" />
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${activeIndex === index ? 'bg-white border-brand-orange shadow-lg' : 'bg-transparent border-gray-200 hover:bg-white hover:border-gray-300'}`}
              >
                <button onClick={() => setActiveIndex(index)} className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
                  <span className={`font-bold text-lg ${activeIndex === index ? 'text-brand-dark' : 'text-gray-600'}`}>{feature.title}</span>
                  <i className={`ri-arrow-down-s-line text-2xl transition-transform duration-300 ${activeIndex === index ? 'rotate-180 text-brand-orange' : 'text-gray-400'}`} />
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-gray-500 leading-relaxed text-sm">{feature.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessFeatures;
