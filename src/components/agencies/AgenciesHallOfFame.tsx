import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Star, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { agenciesApi, siteContentApi } from '../../lib/api';
import type { Agency } from '../../lib/api';

export default function AgenciesHallOfFame() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: section } = useQuery({
    queryKey: ['page-section', 'agencies', 'hall_of_fame'],
    queryFn: () => siteContentApi.section('agencies', 'hall_of_fame'),
  });

  const { data: agencies = [], isLoading } = useQuery({
    queryKey: ['agencies', 'featured'],
    queryFn: () => agenciesApi.list({ featured: true, limit: 12 }),
  });

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
  };

  if (isLoading) return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-5 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="min-w-[300px] h-64 bg-gray-100 rounded-3xl animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );

  if (agencies.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2853] font-['Manrope']">{section?.title ?? 'Top Agencies'}</h2>
            <p className="text-gray-500 mt-2">{section?.description ?? 'Vetted digital agencies trusted by thousands of businesses'}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1F2853] hover:text-white hover:border-[#1F2853] transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1F2853] hover:text-white hover:border-[#1F2853] transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: 'none' }}>
          {(agencies as Agency[]).map(agency => (
            <Link key={agency.id} to={`/agencies/${agency.slug}`}
              className="min-w-[300px] bg-gray-50 rounded-3xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 overflow-hidden flex items-center justify-center shadow-sm">
                  {agency.avatar_url
                    ? <img src={agency.avatar_url} alt={agency.name} className="w-full h-full object-cover" />
                    : <span className="text-xl font-bold text-[#1F2853]">{agency.name[0]}</span>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-[#1F2853] truncate group-hover:text-[#f25a1a] transition-colors">{agency.name}</h3>
                    {agency.verified && <ShieldCheck className="w-4 h-4 text-green-500 shrink-0" />}
                  </div>
                  {agency.category && <p className="text-xs text-gray-400 truncate">{agency.category}</p>}
                </div>
              </div>

              {agency.tagline && (
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{agency.tagline}</p>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(agency.rating ?? 0) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">{agency.rating?.toFixed(1)}</span>
                </div>
                {agency.years_experience ? (
                  <span className="text-xs text-gray-400">{agency.years_experience}y exp</span>
                ) : null}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to={section?.cta_url ?? '/agencies'}
            className="inline-flex items-center gap-2 border border-[#1F2853] text-[#1F2853] px-6 py-3 rounded-full font-semibold hover:bg-[#1F2853] hover:text-white transition-colors">
            {section?.cta_text ?? 'Browse All Agencies'} <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </div>
    </section>
  );
}
