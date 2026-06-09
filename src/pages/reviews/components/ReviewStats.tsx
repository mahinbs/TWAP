import { useQuery } from '@tanstack/react-query';
import { siteContentApi } from '../../../lib/api';

export default function ReviewStats() {
  const { data: stats = [] } = useQuery({
    queryKey: ['stats', 'reviews'],
    queryFn: () => siteContentApi.stats('reviews'),
  });

  if (stats.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.slice(0, 4).map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#1F2853] rounded-full flex items-center justify-center">
                <i className={`${stat.icon ?? 'ri-star-line'} text-2xl text-white`} />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-[#1F2853] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {stat.value}
              </div>
              <div className="text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
