import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi, agenciesPageApi } from '../../lib/api';

const FALLBACK_INSIGHTS = [
  { category: 'FINANCING', title: 'The Scaling Blueprint: Helping Regional Banks Prepare for the Future?', image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', link: '#', variant: 'light' as const },
  { category: 'HEALTHCARE', title: 'Healthcare Private Equity Market 2024: Year in Review and Outlook', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', link: '#', variant: 'dark' as const },
];

const FALLBACK_CLIENTS = [
  { name: 'HEX Fund', font: 'font-serif' },
  { name: 'MTGox', font: 'font-sans font-black tracking-tighter' },
  { name: 'Sauex Bank', font: 'font-serif italic' },
  { name: 'KONSTRUKTION', font: 'font-mono' },
  { name: 'Coinbase', font: 'font-sans font-bold' },
  { name: 'Meta Max', font: 'font-serif' },
];

export default function AgenciesInsights() {
  const { data: insightsSection } = useQuery({
    queryKey: ['page-section', 'agencies', 'insights'],
    queryFn: () => siteContentApi.section('agencies', 'insights'),
  });

  const { data: clientsSection } = useQuery({
    queryKey: ['page-section', 'agencies', 'clients'],
    queryFn: () => siteContentApi.section('agencies', 'clients'),
  });

  const { data: insightItems = [] } = useQuery({
    queryKey: ['agencies-items', 'insights'],
    queryFn: () => agenciesPageApi.items('insights'),
  });

  const { data: clientItems = [] } = useQuery({
    queryKey: ['agencies-items', 'clients'],
    queryFn: () => agenciesPageApi.items('clients'),
  });

  const insights = insightItems.length > 0
    ? insightItems.map(item => {
        const ex = (item.extras ?? {}) as Record<string, string>;
        return {
          category: ex.category ?? '',
          title: item.title,
          image: item.image_url ?? '',
          link: item.link_url ?? '#',
          variant: (ex.variant === 'dark' ? 'dark' : 'light') as 'light' | 'dark',
        };
      })
    : FALLBACK_INSIGHTS;

  const clients = clientItems.length > 0
    ? clientItems.map(item => ({
        name: item.title,
        font: ((item.extras ?? {}) as Record<string, string>).font ?? 'font-sans',
      }))
    : FALLBACK_CLIENTS;

  return (
    <section className="py-24 bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">
            {insightsSection?.subtitle ?? 'Insights'}
          </span>
          <h2 className="text-4xl font-bold text-[#1A1B20] mb-4">{insightsSection?.title ?? 'Our Latest Insights'}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {insightsSection?.description ?? 'Proprietary data, expert analysis and bold thinking for leaders who want to achieve the extraordinary.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {insights.map((item, index) => (
            <div key={index} className={`rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6 items-start ${item.variant === 'dark' ? 'bg-[#56122D]' : 'bg-white'}`}>
              <div className="w-full sm:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden">
                {item.image && (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                )}
              </div>
              <div className="flex-1 py-2">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{item.category}</div>
                <h3 className={`text-xl font-bold mb-6 leading-snug ${item.variant === 'dark' ? 'text-white' : 'text-[#1A1B20]'}`}>
                  {item.title}
                </h3>
                <Link to={item.link} className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-all ${item.variant === 'dark' ? 'text-gray-400 hover:bg-white hover:text-[#1A1B20] hover:border-transparent' : 'text-gray-400 hover:bg-[#f25a1a] hover:text-white hover:border-transparent'}`}>
                  <i className="ri-arrow-right-up-line" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to={insightsSection?.cta_url ?? '#'}
            className="inline-block bg-[#f25a1a] hover:bg-[#d14815] text-white px-8 py-3 rounded-full font-semibold transition-all cursor-pointer"
          >
            {insightsSection?.cta_text ?? 'More Insights'}
          </Link>
        </div>

        <div className="mt-24 pt-12 border-t border-gray-200 relative">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest w-full text-center mb-8">
            {clientsSection?.title ?? 'Empowering Our Clients'}
          </h3>

          <div className="relative w-full overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />

            <div className="flex w-max animate-scroll hover:pause items-center">
              {[...clients, ...clients, ...clients].map((client, index) => (
                <div key={index} className="mx-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-300 cursor-default">
                  <span className={`text-2xl ${client.font} whitespace-nowrap`}>{client.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
