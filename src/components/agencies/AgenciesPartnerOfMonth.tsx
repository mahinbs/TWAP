import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi, agenciesApi } from '../../lib/api';

export default function AgenciesPartnerOfMonth() {
  const { data: section } = useQuery({
    queryKey: ['page-section', 'agencies', 'partner'],
    queryFn: () => siteContentApi.section('agencies', 'partner'),
  });

  const agencySlug = ((section?.content ?? {}) as Record<string, string>).agency_slug ?? 'crebos-international';

  const { data: agency } = useQuery({
    queryKey: ['agency', agencySlug],
    queryFn: () => agenciesApi.bySlug(agencySlug),
    enabled: Boolean(agencySlug),
  });

  if (!agency) return null;

  const badge = section?.subtitle ?? 'Spotlight';
  const heading = section?.title ?? 'Partner of The Month';
  const tags = (agency.service_lines as { label: string }[] | undefined) ?? [];

  return (
    <section className="pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#f25a1a]/10 border border-[#f25a1a]/20 text-sm font-bold text-[#f25a1a] mb-4 uppercase tracking-wider">
            {badge}
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1B20]">{heading}</h2>
        </div>

        <div className="relative">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#f25a1a]/20 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#f25a1a]/10 rounded-full blur-3xl -z-10" />

          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-2 md:p-4 border border-white/50 shadow-2xl shadow-orange-500/5 flex flex-col lg:flex-row overflow-hidden relative z-10">
            <div className="flex-1 p-6 md:p-10">
              <div className="flex flex-col md:flex-row gap-6 items-start mb-6">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#1A1B20] to-black flex items-center justify-center flex-shrink-0 shadow-lg shadow-gray-200 overflow-hidden">
                  {agency.avatar_url
                    ? <img src={agency.avatar_url} alt={agency.name} className="w-full h-full object-cover" />
                    : <span className="text-white font-bold text-xs">{agency.name.slice(0, 6)}</span>
                  }
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="text-2xl font-bold text-[#1A1B20]">{agency.name}</h3>
                    {agency.verified && <i className="ri-checkbox-circle-fill text-[#f25a1a] text-xl" />}
                  </div>
                  {agency.tagline && (
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{agency.tagline}</p>
                  )}
                </div>
              </div>

              {agency.description && (
                <p className="text-gray-600 leading-relaxed mb-8 text-lg">{agency.description}</p>
              )}

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-4 items-center mb-8">
                  {tags.map((tag, i) => (
                    <span key={i} className="px-4 py-2 rounded-lg bg-white/50 text-gray-600 text-sm font-medium border border-gray-100 backdrop-blur-sm">
                      {tag.label}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                <Link to={`/agencies/${agency.slug}`} className="px-8 py-3 rounded-xl border border-[#f25a1a]/30 text-[#f25a1a] font-bold hover:bg-[#f25a1a] hover:text-white transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:shadow-orange-500/20 bg-white/50 backdrop-blur-sm">
                  <i className="ri-user-smile-line" />
                  View Profile
                </Link>
                {agency.website_url && (
                  <a href={agency.website_url} target="_blank" rel="noreferrer" className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#f25a1a] to-[#d14815] text-white font-bold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 flex items-center gap-2">
                    <i className="ri-global-line" />
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
