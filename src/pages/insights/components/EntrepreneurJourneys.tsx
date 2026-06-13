
import { useState } from 'react';

interface Entrepreneur {
  id: number;
  name: string;
  title: string;
  company: string;
  journey: string;
  challenge: string;
  solution: string;
  avatar: string;
  companyLogo: string;
  productName: string;
  metrics: {
    users: string;
    revenue: string;
    growth: string;
  };
}

export default function EntrepreneurJourneys() {
  const [entrepreneurs] = useState<Entrepreneur[]>([
    {
      id: 1,
      name: "Alex Thompson",
      title: "Co-founder & CEO",
      company: "StreamlineAI",
      productName: "StreamlineAI - Workflow Automation",
      journey: "From struggling with repetitive tasks in my consulting firm to building an AI that automates complex workflows for thousands of businesses.",
      challenge: "Manual processes were eating 60% of our team's time",
      solution: "Built an AI that learns and replicates human decision-making patterns",
      avatar: "https://readdy.ai/api/search-image?query=Professional%20male%20entrepreneur%20headshot%2C%20confident%20tech%20startup%20founder%2C%20modern%20office%20background%2C%20business%20casual%20attire%2C%20innovative%20leader%20portrait%2C%20clean%20corporate%20photography&width=200&height=200&seq=alex-entrepreneur&orientation=squarish",
      companyLogo: "https://readdy.ai/api/search-image?query=Modern%20AI%20technology%20company%20logo%2C%20streamlined%20design%2C%20blue%20and%20silver%20colors%2C%20professional%20tech%20brand%20identity%2C%20minimalist%20corporate%20logo&width=100&height=100&seq=streamline-logo&orientation=squarish",
      metrics: {
        users: "50K+",
        revenue: "$2.5M ARR",
        growth: "300%"
      }
    },
    {
      id: 2,
      name: "Maria Santos",
      title: "Founder & CTO",
      company: "HealthTrack Pro",
      productName: "HealthTrack - Patient Management System",
      journey: "After witnessing inefficiencies in healthcare during my mother's treatment, I created a platform that connects patients, doctors, and caregivers seamlessly.",
      challenge: "Healthcare communication was fragmented and inefficient",
      solution: "Unified platform with real-time updates and AI-powered insights",
      avatar: "https://readdy.ai/api/search-image?query=Professional%20female%20healthcare%20tech%20entrepreneur%2C%20confident%20startup%20founder%20portrait%2C%20medical%20technology%20background%2C%20professional%20attire%2C%20innovative%20healthcare%20leader&width=200&height=200&seq=maria-entrepreneur&orientation=squarish",
      companyLogo: "https://readdy.ai/api/search-image?query=Healthcare%20technology%20company%20logo%2C%20medical%20cross%20symbol%2C%20green%20and%20blue%20colors%2C%20professional%20healthcare%20brand%2C%20clean%20medical%20logo%20design&width=100&height=100&seq=healthtrack-logo&orientation=squarish",
      metrics: {
        users: "25K+",
        revenue: "$1.8M ARR",
        growth: "250%"
      }
    },
    {
      id: 3,
      name: "David Kim",
      title: "Founder & Head of Product",
      company: "EduFlow",
      productName: "EduFlow - Learning Management Platform",
      journey: "Teaching online during the pandemic showed me how broken digital education was. I built a platform that makes learning as engaging as gaming.",
      challenge: "Students were disengaged with traditional online learning",
      solution: "Gamified learning with adaptive AI and social collaboration",
      avatar: "https://readdy.ai/api/search-image?query=Professional%20Asian%20male%20education%20tech%20entrepreneur%2C%20startup%20founder%20headshot%2C%20modern%20educational%20environment%2C%20confident%20expression%2C%20innovative%20educator%20portrait&width=200&height=200&seq=david-entrepreneur&orientation=squarish",
      companyLogo: "https://readdy.ai/api/search-image?query=Education%20technology%20company%20logo%2C%20book%20and%20digital%20elements%2C%20purple%20and%20orange%20colors%2C%20modern%20educational%20brand%2C%20learning%20platform%20logo&width=100&height=100&seq=eduflow-logo&orientation=squarish",
      metrics: {
        users: "100K+",
        revenue: "$3.2M ARR",
        growth: "400%"
      }
    }
  ]);

  return (
    <section className="py-20 bg-gradient-to-br from-white to-[#f7f5ef]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1F2853] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Entrepreneur Journeys
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Real stories of transformation, challenge, and breakthrough innovation from founders who dared to solve problems that mattered.
          </p>
        </div>

        <div className="space-y-16">
          {entrepreneurs.map((entrepreneur, index) => (
            <div key={entrepreneur.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
              {/* Content Side */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#f25a1a]">
                    <img 
                      src={entrepreneur.avatar}
                      alt={entrepreneur.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#1F2853]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {entrepreneur.name}
                    </h3>
                    <p className="text-[#f25a1a] font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {entrepreneur.title}
                    </p>
                    <div className="flex items-center space-x-3 mt-2">
                      <img 
                        src={entrepreneur.companyLogo}
                        alt={entrepreneur.company}
                        className="w-8 h-8 object-contain"
                      />
                      <span className="text-gray-600 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {entrepreneur.company}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h4 className="text-lg font-bold text-[#1F2853] mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    The Journey
                  </h4>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    "{entrepreneur.journey}"
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                      <h5 className="font-semibold text-red-800 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        The Challenge
                      </h5>
                      <p className="text-red-700 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {entrepreneur.challenge}
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                      <h5 className="font-semibold text-green-800 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        The Solution
                      </h5>
                      <p className="text-green-700 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {entrepreneur.solution}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center bg-gradient-to-br from-[#f25a1a] to-[#ff7043] text-white p-4 rounded-lg">
                    <div className="text-2xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {entrepreneur.metrics.users}
                    </div>
                    <div className="text-sm opacity-90" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Active Users
                    </div>
                  </div>
                  <div className="text-center bg-gradient-to-br from-[#1F2853] to-[#2a3a6b] text-white p-4 rounded-lg">
                    <div className="text-2xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {entrepreneur.metrics.revenue}
                    </div>
                    <div className="text-sm opacity-90" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Annual Revenue
                    </div>
                  </div>
                  <div className="text-center bg-gradient-to-br from-[#ffcee0] to-[#ff9ec7] text-[#1F2853] p-4 rounded-lg">
                    <div className="text-2xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {entrepreneur.metrics.growth}
                    </div>
                    <div className="text-sm opacity-80" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      YoY Growth
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Preview Side */}
              <div className="flex-1">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                  <div className="bg-gradient-to-r from-[#1F2853] to-[#2a3a6b] p-6 text-white">
                    <h4 className="text-xl font-bold mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {entrepreneur.productName}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {[1,2,3,4,5].map((star) => (
                          <div key={star} className="w-4 h-4 flex items-center justify-center text-yellow-400">
                            <i className="ri-star-fill text-sm"></i>
                          </div>
                        ))}
                      </div>
                      <span className="text-sm opacity-90">4.9/5</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <img 
                      src={`https://readdy.ai/api/search-image?query=Modern%20$%7Bentrepreneur.company.toLowerCase%28%29%7D%20software%20dashboard%20interface%2C%20clean%20user%20interface%20design%2C%20professional%20app%20screenshot%2C%20$%7Bentrepreneur.productName.split%28%20-%20%29%5B1%5D.toLowerCase%28%29%7D%20platform%2C%20modern%20software%20presentation&width=500&height=300&seq=product-${entrepreneur.id}&orientation=landscape`}
                      alt={entrepreneur.productName}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <button className="w-full bg-[#f25a1a] hover:bg-[#d14815] text-white py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      View Full Case Study
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-[#f25a1a] to-[#ff7043] text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Share Your Journey
          </button>
        </div>
      </div>
    </section>
  );
}
