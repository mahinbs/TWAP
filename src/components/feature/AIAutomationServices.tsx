import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi } from '../../lib/api';
import { supabase } from '../../lib/supabase';

const FALLBACK = {
  title: 'AI Automation Services',
  description: 'Transform your business with custom AI automation solutions designed to increase efficiency and reduce costs.',
  image: 'https://readdy.ai/api/search-image?query=Modern%20AI%20automation%20workflow%20illustration%2C%20robotic%20process%20automation%2C%20digital%20transformation%2C%20business%20efficiency%2C%20technology%20integration%2C%20clean%20minimalist%20design%2C%20blue%20and%20white%20color%20scheme%2C%20professional%20business%20automation&width=500&height=320&seq=ai-automation-illustration&orientation=landscape',
  features: [
    'Custom AI workflow development',
    'Process automation consulting',
    'Integration with existing systems',
  ],
  formTitle: 'Book Free Consultation',
  buttonText: 'Book Free Call',
};

export default function AIAutomationServices() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const { data: section } = useQuery({
    queryKey: ['page-section', 'home', 'ai_automation'],
    queryFn: () => siteContentApi.section('home', 'ai_automation'),
  });

  const c = (section?.content ?? {}) as Record<string, unknown>;
  const title = section?.title ?? FALLBACK.title;
  const description = section?.description ?? FALLBACK.description;
  const image = section?.media_url ?? FALLBACK.image;
  const features = (c.features as string[]) ?? FALLBACK.features;
  const formTitle = (c.form_title as string) ?? FALLBACK.formTitle;
  const buttonText = (c.button_text as string) ?? FALLBACK.buttonText;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const { error } = await supabase.from('form_submissions').insert({
        form_type: 'ai_automation_consultation',
        source_page: 'home',
        payload: formData,
      });
      if (error) throw error;
      setSubmitStatus('Thank you! We will contact you soon.');
      setFormData({ name: '', email: '' });
    } catch {
      setSubmitStatus('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Image */}
          <div className="order-2 lg:order-1">
            <div className="bg-gray-300 rounded-lg h-80 flex items-center justify-center">
              <img
                src={image}
                alt="AI Automation Illustration"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1F2853] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
              {title}
            </h2>

            <p className="text-lg text-gray-600 mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {description}
            </p>

            {/* Service Features */}
            <div className="space-y-4 mb-8">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-white text-sm"></i>
                  </div>
                  <span className="text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Icons */}
            <div className="flex gap-4 mb-8">
              <div className="w-10 h-10 bg-[#1F2853] rounded-lg flex items-center justify-center">
                <i className="ri-robot-line text-white text-lg"></i>
              </div>
              <div className="w-10 h-10 bg-[#1F2853] rounded-lg flex items-center justify-center">
                <i className="ri-settings-3-line text-white text-lg"></i>
              </div>
              <div className="w-10 h-10 bg-[#1F2853] rounded-lg flex items-center justify-center">
                <i className="ri-speed-line text-white text-lg"></i>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#1F2853] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {formTitle}
              </h3>

              <form onSubmit={handleSubmit} id="ai-automation-consultation">
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F2853] focus:border-transparent text-sm"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F2853] focus:border-transparent text-sm"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#f25a1a] text-white py-3 rounded-lg font-medium hover:bg-[#e04d15] transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {isSubmitting ? 'Submitting...' : buttonText}
                  </button>
                </div>

                {submitStatus && (
                  <div className={`mt-4 p-3 rounded-lg text-sm ${
                    submitStatus.includes('Thank you')
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {submitStatus}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
