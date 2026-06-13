
import { useState } from 'react';

interface SuccessStory {
  id: number;
  clientName: string;
  clientTitle: string;
  company: string;
  industry: string;
  story: string;
  results: string[];
  beforeAfter: {
    before: string;
    after: string;
  };
  avatar: string;
  companyLogo: string;
  rating: number;
  projectDuration: string;
}

export default function ClientSuccessStories() {
  const [stories] = useState<SuccessStory[]>([
    {
      id: 1,
      clientName: "Jennifer Walsh",
      clientTitle: "VP of Operations",
      company: "TechFlow Solutions",
      industry: "SaaS",
      story: "Working with TheWebApp Pro transformed our entire customer onboarding process. What used to take weeks now happens in days, and our customer satisfaction scores have never been higher.",
      results: [
        "300% faster onboarding",
        "95% customer satisfaction",
        "50% reduction in support tickets",
        "$500K annual savings"
      ],
      beforeAfter: {
        before: "Manual onboarding taking 3-4 weeks with multiple touchpoints",
        after: "Automated workflow completing onboarding in 3-5 days"
      },
      avatar: "https://readdy.ai/api/search-image?query=Professional%20female%20VP%20operations%20headshot%2C%20confident%20business%20executive%2C%20modern%20corporate%20office%20background%2C%20business%20professional%20attire%2C%20leadership%20portrait&width=200&height=200&seq=jennifer-client&orientation=squarish",
      companyLogo: "https://readdy.ai/api/search-image?query=Modern%20SaaS%20technology%20company%20logo%2C%20blue%20and%20gray%20colors%2C%20professional%20tech%20brand%20identity%2C%20clean%20corporate%20logo%20design&width=100&height=100&seq=techflow-logo&orientation=squarish",
      rating: 5,
      projectDuration: "4 months"
    },
    {
      id: 2,
      clientName: "Robert Chen",
      clientTitle: "Chief Marketing Officer",
      company: "GrowthLab",
      industry: "Marketing",
      story: "The analytics platform they built for us revealed insights we never knew existed. Our marketing ROI improved dramatically, and we can now predict customer behavior with incredible accuracy.",
      results: [
        "400% improvement in ROI",
        "85% prediction accuracy",
        "60% increase in conversions",
        "Real-time insights dashboard"
      ],
      beforeAfter: {
        before: "Scattered data across multiple platforms with limited insights",
        after: "Unified analytics with predictive modeling and real-time reporting"
      },
      avatar: "https://readdy.ai/api/search-image?query=Professional%20Asian%20male%20CMO%20headshot%2C%20marketing%20executive%20portrait%2C%20modern%20office%20environment%2C%20confident%20business%20leader%2C%20professional%20corporate%20photography&width=200&height=200&seq=robert-client&orientation=squarish",
      companyLogo: "https://readdy.ai/api/search-image?query=Marketing%20agency%20logo%2C%20growth%20arrow%20symbol%2C%20green%20and%20orange%20colors%2C%20professional%20marketing%20brand%2C%20dynamic%20logo%20design&width=100&height=100&seq=growthlab-logo&orientation=squarish",
      rating: 5,
      projectDuration: "6 months"
    },
    {
      id: 3,
      clientName: "Lisa Rodriguez",
      clientTitle: "Founder & CEO",
      company: "EcoVenture",
      industry: "Sustainability",
      story: "They didn't just build us an app - they built us a movement. Our sustainability tracking platform now serves thousands of companies and has become the industry standard.",
      results: [
        "10,000+ active companies",
        "Industry standard platform",
        "2M tons CO2 tracked",
        "Award-winning design"
      ],
      beforeAfter: {
        before: "Manual sustainability reporting with Excel spreadsheets",
        after: "Automated platform with real-time environmental impact tracking"
      },
      avatar: "https://readdy.ai/api/search-image?query=Professional%20female%20CEO%20sustainability%20entrepreneur%2C%20confident%20startup%20founder%2C%20eco-friendly%20office%20background%2C%20professional%20green%20business%20leader%20portrait&width=200&height=200&seq=lisa-client&orientation=squarish",
      companyLogo: "https://readdy.ai/api/search-image?query=Sustainability%20company%20logo%2C%20leaf%20and%20earth%20elements%2C%20green%20and%20blue%20colors%2C%20eco-friendly%20brand%20identity%2C%20environmental%20logo%20design&width=100&height=100&seq=ecoventure-logo&orientation=squarish",
      rating: 5,
      projectDuration: "8 months"
    }
  ]);

  return (
    <section className="py-20 bg-gradient-to-br from-[#f7f5ef] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1F2853] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Client Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Discover how we've helped businesses transform their operations, boost growth, and achieve remarkable results through innovative technology solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div key={story.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#1F2853] to-[#2a3a6b] p-6 text-white">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-white">
                    <img 
                      src={story.avatar}
                      alt={story.clientName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {story.clientName}
                    </h3>
                    <p className="text-[#ffcee0] text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {story.clientTitle}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={story.companyLogo}
                      alt={story.company}
                      className="w-8 h-8 object-contain bg-white rounded p-1"
                    />
                    <div>
                      <div className="font-semibold text-sm">{story.company}</div>
                      <div className="text-xs text-[#ffcee0]">{story.industry}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex space-x-1 mb-1">
                      {[1,2,3,4,5].map((star) => (
                        <div key={star} className="w-4 h-4 flex items-center justify-center text-yellow-400">
                          <i className={`ri-star-${star <= story.rating ? 'fill' : 'line'} text-sm`}></i>
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-[#ffcee0]">{story.projectDuration}</div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Story */}
                <div>
                  <h4 className="text-lg font-bold text-[#1F2853] mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Success Story
                  </h4>
                  <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    "{story.story}"
                  </p>
                </div>

                {/* Before & After */}
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-[#1F2853]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Transformation
                  </h4>
                  <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                    <h5 className="font-semibold text-red-800 mb-2 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      Before
                    </h5>
                    <p className="text-red-700 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {story.beforeAfter.before}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                    <h5 className="font-semibold text-green-800 mb-2 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      After
                    </h5>
                    <p className="text-green-700 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {story.beforeAfter.after}
                    </p>
                  </div>
                </div>

                {/* Results */}
                <div>
                  <h4 className="text-lg font-bold text-[#1F2853] mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Key Results
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {story.results.map((result, index) => (
                      <div key={index} className="bg-gradient-to-r from-[#f25a1a]/10 to-[#ff7043]/10 p-3 rounded-lg border border-[#f25a1a]/20">
                        <div className="text-[#f25a1a] font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {result}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full bg-gradient-to-r from-[#f25a1a] to-[#ff7043] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 group-hover:scale-105 cursor-pointer whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Read Full Case Study
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-[#1F2853] to-[#2a3a6b] text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Start Your Success Story
          </button>
        </div>
      </div>
    </section>
  );
}
