import React from 'react';

const services = [
    {
        title: 'Strategic Consulting',
        description: 'Expert guidance to navigate complex digital landscapes and optimize your business strategy.',
        icon: 'ri-compass-3-line'
    },
    {
        title: 'Custom Development',
        description: 'Tailored software solutions designed to meet your specific business requirements and goals.',
        icon: 'ri-code-s-slash-line'
    },
    {
        title: 'Digital Transformation',
        description: 'Modernize your operations and processes with cutting-edge digital technologies.',
        icon: 'ri-refresh-line'
    },
    {
        title: 'UI/UX Design',
        description: 'Create intuitive and engaging user experiences that drive customer satisfaction and retention.',
        icon: 'ri-palette-line'
    },
    {
        title: 'Cloud Solutions',
        description: 'Scalable and secure cloud infrastructure implementation and management services.',
        icon: 'ri-cloud-line'
    },
    {
        title: 'Data Analytics',
        description: 'Turn your data into actionable insights to drive informed decision-making.',
        icon: 'ri-bar-chart-groupped-line'
    }
];

export default function AgenciesServices() {
    return (
        <section className="bg-gray-50 py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#1A1B20] mb-4">Comprehensive Agency Services</h2>
                    <p className="text-gray-500 text-lg">We provide a full spectrum of services to help you scale, innovate, and lead in your industry.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                            <div className="w-12 h-12 bg-[#f25a1a]/10 rounded-xl flex items-center justify-center mb-6">
                                <i className={`${service.icon} text-2xl text-[#f25a1a]`}></i>
                            </div>
                            <h3 className="text-xl font-bold text-[#1A1B20] mb-3">{service.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
