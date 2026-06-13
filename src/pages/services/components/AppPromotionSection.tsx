import React, { useState } from 'react';

const AppPromotionSection: React.FC = () => {
  const [formData, setFormData] = useState({
    appName: '',
    appUrl: '',
    category: '',
    email: '',
    description: ''
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

      const response = await fetch('https://readdy.ai/api/form/d49i93n43pgcqhvcq3cg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          appName: '',
          appUrl: '',
          category: '',
          email: '',
          description: ''
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

  const seoFeatures = [
    {
      icon: 'ri-links-line',
      title: 'Quality Backlinks',
      description: 'Earn high-authority backlinks that boost your domain reputation and search rankings'
    },
    {
      icon: 'ri-traffic-light-line',
      title: 'Targeted Traffic',
      description: 'Drive qualified visitors actively searching for solutions like yours'
    },
    {
      icon: 'ri-search-eye-line',
      title: 'Enhanced Visibility',
      description: 'Appear in our curated directory viewed by thousands of potential customers monthly'
    },
    {
      icon: 'ri-bar-chart-box-line',
      title: 'Improved Rankings',
      description: 'Strengthen your SEO profile with increased mentions and citations across the web'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Trust & Credibility',
      description: 'Build authority by being featured on a respected platform in the tech community'
    },
    {
      icon: 'ri-time-line',
      title: 'Long-term Benefits',
      description: 'Enjoy lasting SEO advantages that continue to deliver value over time'
    }
  ];

  return (
    <section id="app-promotion" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Content */}
          <div>
            <div className="inline-block px-4 py-2 bg-[#ffcee0]/20 rounded-full mb-6">
              <span className="text-[#f25a1a] font-semibold text-sm">App Promotion Service</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-[#1F2853] mb-6 font-['Poppins']">
              Feature Your App &amp; Supercharge Your SEO
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed font-['Manrope']">
              Get your application featured on our premium directory and unlock powerful SEO benefits that drive organic growth. Our platform generates over 100 quality backlinks from relevant websites, helping you climb search rankings while we handle all the tedious submission work.
            </p>

            <div className="bg-gradient-to-br from-[#1F2853] to-[#2a3566] rounded-3xl p-8 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffcee0]/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4 font-['Poppins']">
                  SEO Benefits You'll Receive
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {seoFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#f25a1a] rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className={`${feature.icon} text-white text-lg`}></i>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                        <p className="text-gray-300 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#ffcee0]/10 rounded-2xl p-6 border border-[#ffcee0]/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#f25a1a] rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-time-line text-white text-xl"></i>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#1F2853] mb-2">Save 40+ Hours of Manual Work</h4>
                  <p className="text-gray-600">
                    We handle the entire submission process across 100+ directories, so you can focus on building your product while we boost your online presence.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-2xl border border-gray-200">
              <h3 className="text-2xl font-bold text-[#1F2853] mb-6 font-['Poppins']">
                Submit Your App for Promotion
              </h3>
              
              <form id="app-promotion-form" data-readdy-form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="appName" className="block text-sm font-semibold text-[#1F2853] mb-2">
                    App Name *
                  </label>
                  <input
                    type="text"
                    id="appName"
                    name="appName"
                    value={formData.appName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#f25a1a] focus:ring-2 focus:ring-[#f25a1a]/20 outline-none transition-all text-sm"
                    placeholder="Enter your app name"
                  />
                </div>

                <div>
                  <label htmlFor="appUrl" className="block text-sm font-semibold text-[#1F2853] mb-2">
                    App URL *
                  </label>
                  <input
                    type="url"
                    id="appUrl"
                    name="appUrl"
                    value={formData.appUrl}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#f25a1a] focus:ring-2 focus:ring-[#f25a1a]/20 outline-none transition-all text-sm"
                    placeholder="https://yourapp.com"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-[#1F2853] mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pr-8 rounded-xl border border-gray-300 focus:border-[#f25a1a] focus:ring-2 focus:ring-[#f25a1a]/20 outline-none transition-all text-sm appearance-none bg-white cursor-pointer"
                  >
                    <option value="">Select a category</option>
                    <option value="AI & Machine Learning">AI &amp; Machine Learning</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Business Tools">Business Tools</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Design">Design</option>
                    <option value="Development">Development</option>
                    <option value="Analytics">Analytics</option>
                    <option value="Communication">Communication</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Other">Other</option>
                  </select>
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
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-[#1F2853] mb-2">
                    App Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    maxLength={500}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#f25a1a] focus:ring-2 focus:ring-[#f25a1a]/20 outline-none transition-all resize-none text-sm"
                    placeholder="Brief description of your app (max 500 characters)"
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 characters</p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-[#f25a1a] text-white rounded-full font-semibold hover:bg-[#d94d15] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Your App'}
                </button>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <p className="text-green-800 text-sm font-semibold">
                      ✓ Thank you! Your app has been submitted successfully. We'll review it and get back to you soon.
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
        </div>
      </div>
    </section>
  );
};

export default AppPromotionSection;
