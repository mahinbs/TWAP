import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { successStoriesApi, siteContentApi } from '../../../lib/api';

interface StoryExtras {
  client_name?: string;
  client_title?: string;
  company?: string;
  industry?: string;
  story?: string;
  results?: string[];
  before?: string;
  after?: string;
  avatar_url?: string;
  company_logo?: string;
  rating?: number;
  project_duration?: string;
}

export default function ClientSuccessStories() {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  const { data: section } = useQuery({
    queryKey: ['page-section', 'insights', 'success_stories'],
    queryFn: () => siteContentApi.section('insights', 'success_stories'),
  });

  const { data: items = [] } = useQuery({
    queryKey: ['success-stories', 'client_stories'],
    queryFn: () => successStoriesApi.items('client_stories'),
  });

  const stories = items.map(i => {
    const ex = (i.extras ?? {}) as StoryExtras;
    return {
      id: i.id,
      clientName: ex.client_name ?? i.title,
      clientTitle: ex.client_title ?? i.subtitle ?? '',
      company: ex.company ?? '',
      industry: ex.industry ?? '',
      story: ex.story ?? i.description ?? '',
      results: ex.results ?? [],
      before: ex.before ?? '',
      after: ex.after ?? '',
      avatar: ex.avatar_url ?? i.image_url ?? '',
      companyLogo: ex.company_logo ?? '',
      rating: ex.rating ?? 5,
      projectDuration: ex.project_duration ?? '',
    };
  });

  if (stories.length === 0) return null;
  const current = stories[activeStoryIndex];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2853] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {section?.title ?? 'Client Success Stories'}
          </h2>
          {section?.description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {section.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {stories.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveStoryIndex(i)}
              className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                activeStoryIndex === i ? 'border-[#f25a1a] bg-[#f25a1a]/5' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center mb-3">
                {s.avatar && <img src={s.avatar} alt={s.clientName} className="w-12 h-12 rounded-full mr-4 object-cover" />}
                <div>
                  <h3 className="font-bold text-[#1F2853]" style={{ fontFamily: 'Manrope, sans-serif' }}>{s.clientName}</h3>
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>{s.company}</p>
                </div>
              </div>
              {s.industry && (
                <span className="bg-[#ffcee0] text-[#1F2853] px-3 py-1 rounded-full text-sm font-medium">{s.industry}</span>
              )}
            </button>
          ))}
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 lg:p-12 shadow-lg border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <div className="flex items-center mb-6">
                {current.avatar && <img src={current.avatar} alt={current.clientName} className="w-16 h-16 rounded-full mr-4 object-cover" />}
                <div>
                  <h3 className="text-xl font-bold text-[#1F2853]" style={{ fontFamily: 'Manrope, sans-serif' }}>{current.clientName}</h3>
                  <p className="text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>{current.clientTitle}, {current.company}</p>
                </div>
              </div>
              <blockquote className="text-lg text-gray-700 italic mb-6 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                "{current.story}"
              </blockquote>
              {(current.before || current.after) && (
                <div className="space-y-4">
                  {current.before && (
                    <div className="bg-red-50 border-l-4 border-red-200 p-4">
                      <h4 className="font-bold text-red-700 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Before</h4>
                      <p className="text-red-600" style={{ fontFamily: 'Poppins, sans-serif' }}>{current.before}</p>
                    </div>
                  )}
                  {current.after && (
                    <div className="bg-green-50 border-l-4 border-green-200 p-4">
                      <h4 className="font-bold text-green-700 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>After</h4>
                      <p className="text-green-600" style={{ fontFamily: 'Poppins, sans-serif' }}>{current.after}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h4 className="text-xl font-bold text-[#1F2853] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>Key Results</h4>
              <div className="grid grid-cols-2 gap-4">
                {current.results.map((r, i) => (
                  <div key={i} className="text-center p-4 bg-gradient-to-br from-[#f25a1a] to-[#ff7043] rounded-lg text-white">
                    <p className="font-bold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>{r}</p>
                  </div>
                ))}
              </div>
              {current.projectDuration && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Project Duration: <strong>{current.projectDuration}</strong>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
