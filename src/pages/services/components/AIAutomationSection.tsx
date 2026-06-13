import React, { useState } from 'react';

const AIAutomationSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    industry: '',
    challenge: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formBody = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        formBody.append(key, value);
      });

      const response = await fetch('https://readdy.ai/api/form/d49i93n43pgcqhvcq3d0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          companyName: '',
          email: '',
          phone: '',
          industry: '',
          challenge: '',
          budget: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const automationSolutions = [
    {
      icon: 'ri-customer-service-2-line',
      title: 'Intelligent Customer Support',
      description: 'Deploy AI chatbots and virtual assistants that handle customer inquiries 24/7, reducing response times by 90%'
    },
    {
      icon: 'ri-file-list-3-line',
      title: 'Document Processing',
      description: 'Automate data extraction from invoices, contracts, and forms with 99% accuracy using advanced OCR and NLP'
    },
    {
      icon: 'ri-mail-send-line',
      title: 'Marketing Automation',
      description: 'Personalize email campaigns, social media posts, and content generation with AI-powered tools'
    },
    {
      icon: 'ri-database-2-line',
      title: 'Data Analysis & Insights',
      description: 'Transform raw data into actionable insights with predictive analytics and automated reporting'
    },
    {
      icon: 'ri-flow-chart',
      title: 'Workflow Optimization',
      description: 'Streamline repetitive tasks and business processes, freeing your team to focus on strategic work'
    },
    {
      icon: 'ri-code-s-slash-line',
      title: 'Custom AI Solutions',
      description: 'Build tailored AI models and integrations specific to your unique business requirements'
    }
  ];

  return (
    <section id="ai-automation" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Form */}
          <div className="lg:sticky lg:top-24 order-2 lg:order-1">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200">
              <h3 className="text-2xl font-bold text-[#1F2853] mb-6 font-['Poppins']">
                Get Your Free AI Consultation
              </h3>
              
              <form id="ai-automation-form" data-readdy-form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-[#1F2853] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#f25a1a] focus:ring-2 focus:ring-[#f25a1a]/20 outline-none transition-all text-sm"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="companyName" className="block text-sm font-semibold text-[#1F2853] mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#f25a1a] focus:ring-2 focus:ring-[#f25a1a]/20 outline-none transition-all text-sm"
                    placeholder="Your Company Inc."
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#1F2853] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#f25a1a] focus:ring-2 focus:ring-[#f25a1a]/20 outline-none transition-all text-sm"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-[#1F2853] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#f25a1a] focus:ring-2 focus:ring-[#f25a1a]/20 outline-none transition-all text-sm"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="industry" className="block text-sm font-semibold text-[#1F2853] mb-2">
                    Industry *
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pr-8 rounded-xl border border-gray-300 focus:border-[#f25a1a] focus:ring-2 focus:ring-[#f25a1a]/20 outline-none transition-all text-sm appearance-none bg-white cursor-pointer"
                  >
                    <option value="">Select your industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Retail">Retail</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Education">Education</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="challenge" className="block text-sm font-semibold text-[#1F2853] mb-2">
                    What challenge are you looking to solve? *
                  </label>
                  <textarea
                    id="challenge"
                    name="challenge"
                    value={formData.challenge}
                    onChange={handleChange}
                    required
                    maxLength={500}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#f25a1a] focus:ring-2 focus:ring-[#f25a1a]/20 outline-none transition-all resize-none text-sm"
                    placeholder="Describe your business challenge or automation needs (max 500 characters)"
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">{formData.challenge.length}/500 characters</p>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-semibold text-[#1F2853] mb-2">
                    Estimated Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-8 rounded-xl border border-gray-300 focus:border-[#f25a1a] focus:ring-2 focus:ring-[#f25a1a]/20 outline-none transition-all text-sm appearance-none bg-white cursor-pointer"
                  >
                    <option value="">Select budget range</option>
                    <option value="Under $10,000">Under $10,000</option>
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                    <option value="Over $100,000">Over $100,000</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-[#f25a1a] text-white rounded-full font-semibold hover:bg-[#d94d15] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isSubmitting ? 'Submitting...' : 'Request Consultation'}
                </button>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <p className="text-green-800 text-sm font-semibold">
                      ✓ Thank you! Our AI experts will contact you within 24 hours to discuss your automation needs.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-800 text-sm font-semibold">
                      ✗ Something went wrong. Please try again later.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-block px-4 py-2 bg-[#b9ed2a]/20 rounded-full mb-6">
              <span className="text-[#1F2853] font-semibold text-sm">AI Automation Services</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-[#1F2853] mb-6 font-['Poppins']">
              Transform Your Business with AI Automation
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed font-['Manrope']">
              Partner with our team of AI specialists to discover practical automation solutions tailored to your business needs. We help companies reduce operational costs by up to 60% while improving efficiency and accuracy across all departments.
            </p>

            <div 
              className="rounded-3xl overflow-hidden mb-8 shadow-xl"
              style={{
                backgroundImage: 'url(https://readdy.ai/api/search-image?query=Professional%20business%20team%20collaborating%20with%20AI%20technology%20holographic%20displays%20showing%20data%20analytics%20and%20automation%20workflows%20in%20modern%20office%20with%20futuristic%20interface%20elements%20and%20digital%20transformation%20visualization%20clean%20corporate%20environment%20with%20diverse%20professionals%20working%20together&width=800&height=500&seq=ai-automation-team&orientation=landscape)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '400px'
              }}
            >
              <div className="w-full h-full bg-gradient-to-t from-[#1F2853]/80 to-transparent flex items-end p-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Expert-Led Solutions</h3>
                  <p className="text-gray-200">Our certified AI engineers have delivered 200+ successful automation projects</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-[#1F2853] mb-6 font-['Poppins']">
              Our AI Automation Solutions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {automationSolutions.map((solution, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#b9ed2a]/50 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#1F2853] to-[#2a3566] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <i className={`${solution.icon} text-2xl text-[#b9ed2a]`}></i>
                  </div>
                  <h4 className="text-lg font-bold text-[#1F2853] mb-2 font-['Poppins']">
                    {solution.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed font-['Manrope']">
                    {solution.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-[#f25a1a] to-[#ff7a3d] rounded-3xl p-8 text-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-lightbulb-flash-line text-2xl"></i>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-3">Why Choose Our AI Experts?</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-[#b9ed2a]"></i>
                      <span>10+ years of combined AI and automation experience</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-[#b9ed2a]"></i>
                      <span>Proven ROI with average 3-6 month payback period</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-[#b9ed2a]"></i>
                      <span>End-to-end support from strategy to implementation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-[#b9ed2a]"></i>
                      <span>Custom solutions built for your specific industry</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAutomationSection;
