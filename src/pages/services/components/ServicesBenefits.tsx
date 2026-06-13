import React from 'react';

const ServicesBenefits: React.FC = () => {
  const benefits = [
    {
      icon: 'ri-line-chart-line',
      title: 'Boost Visibility',
      description: 'Get featured on our high-traffic platform and reach thousands of potential users'
    },
    {
      icon: 'ri-search-line',
      title: 'SEO Enhancement',
      description: 'Improve your search rankings with quality backlinks and increased domain authority'
    },
    {
      icon: 'ri-robot-2-line',
      title: 'AI-Powered Growth',
      description: 'Leverage cutting-edge automation to streamline operations and scale faster'
    },
    {
      icon: 'ri-team-line',
      title: 'Expert Support',
      description: 'Work with experienced professionals dedicated to your success'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1F2853] mb-4 font-['Poppins']">
            Why Choose Our Services?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Manrope']">
            We provide comprehensive solutions to help your business thrive in the digital landscape
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#ffcee0]/50 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#f25a1a] to-[#ff7a3d] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className={`${benefit.icon} text-3xl text-white`}></i>
              </div>
              <h3 className="text-xl font-bold text-[#1F2853] mb-3 font-['Poppins']">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed font-['Manrope']">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesBenefits;
