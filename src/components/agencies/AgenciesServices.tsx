import { useQuery } from '@tanstack/react-query';
import { agenciesPageApi, siteContentApi } from '../../lib/api';

export default function AgenciesServices() {
    const { data: section } = useQuery({
        queryKey: ['page-section', 'agencies', 'services'],
        queryFn: () => siteContentApi.section('agencies', 'services'),
    });

    const { data: items = [] } = useQuery({
        queryKey: ['agencies-items', 'services'],
        queryFn: () => agenciesPageApi.items('services' as never),
    });

    if (items.length === 0 && !section) return null;

    return (
        <section className="bg-gray-50 py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {section && (
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#1A1B20] mb-4">{section.title}</h2>
                        {section.description && (
                            <p className="text-gray-500 text-lg">{section.description}</p>
                        )}
                    </div>
                )}

                {items.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {items.map(item => {
                            const ex = (item.extras ?? {}) as { icon?: string };
                            return (
                                <div key={item.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                                    <div className="w-12 h-12 bg-[#f25a1a]/10 rounded-xl flex items-center justify-center mb-6">
                                        <i className={`${ex.icon ?? 'ri-star-line'} text-2xl text-[#f25a1a]`} />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1A1B20] mb-3">{item.title}</h3>
                                    {item.description && (
                                        <p className="text-gray-500 leading-relaxed">{item.description}</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
