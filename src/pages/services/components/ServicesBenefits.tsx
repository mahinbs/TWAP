import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { servicesApi, siteContentApi } from '../../../lib/api';

const ServicesBenefits: React.FC = () => {
  const { data: section } = useQuery({
    queryKey: ['page-section', 'services', 'benefits'],
    queryFn: () => siteContentApi.section('services', 'benefits'),
  });

  const { data: items = [] } = useQuery({
    queryKey: ['services-items', 'benefits'],
    queryFn: () => servicesApi.items('benefits' as never),
  });

  if (items.length === 0 && !section) return null;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {section && (
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1F2853] mb-4 font-['Poppins']">
              {section.title}
            </h2>
            {section.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Manrope']">
                {section.description}
              </p>
            )}
          </div>
        )}

        {items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#ffcee0]/50 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#f25a1a] to-[#ff7a3d] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <i className={`${item.icon ?? 'ri-star-line'} text-3xl text-white`} />
                </div>
                <h3 className="text-xl font-bold text-[#1F2853] mb-3 font-['Poppins']">{item.title}</h3>
                {item.description && (
                  <p className="text-gray-600 leading-relaxed font-['Manrope']">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesBenefits;
