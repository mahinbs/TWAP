import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { servicesApi, siteContentApi } from '../../../lib/api';
import { supabase } from '../../../lib/supabase';

interface SolutionExtras {
  icon?: string;
}

const AIAutomationSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '', companyName: '', email: '', phone: '',
    industry: '', challenge: '', budget: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { data: section } = useQuery({
    queryKey: ['page-section', 'services', 'ai_automation'],
    queryFn: () => siteContentApi.section('services', 'ai_automation'),
  });

  const { data: solutionItems = [] } = useQuery({
    queryKey: ['services-items', 'ai_automation_solutions'],
    queryFn: () => servicesApi.items('ai_automation_solutions' as never),
  });

  const automationSolutions = solutionItems.map(s => ({
    icon: (s.extras as SolutionExtras | undefined)?.icon ?? s.icon ?? 'ri-star-line',
    title: s.title,
    description: s.description ?? '',
  }));

  const content = (section?.content ?? {}) as Record<string, string>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const { error } = await supabase.from('form_submissions').insert({
        form_type: 'ai_automation_consultation',
        source_page: 'services',
        payload: formData,
      });
      if (error) throw error;
      setSubmitStatus('success');
      setFormData({ fullName: '', companyName: '', email: '', phone: '', industry: '', challenge: '', budget: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="ai-automation" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Form */}
          <div className="lg:sticky lg:top-24 order-2 lg:order-1">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200">
              <h3 className="text-2xl font-bold text-[#1F2853] mb-6 font-['Poppins']">
                {content.form_title ?? 'Get Your Free AI Consultation'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#1F2853] mb-2">Full Name *</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#f25a1a] focus:ring-2 focus:ring-[#f25a1a]/20 outline-none transition-all text-sm" placeholder="John Smith" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1F2853] mb-2">Company Name *</label>
                  <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#f25a1a] focus:ring-2 focus:ring-[#f25a1a]/20 outline-none transition-all text-sm" placeholder="Your Company Inc." />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1F2853] mb-2">Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#f25a1a] focus:ring-2 focus:ring-[#f25a1a]/20 outline-none transition-all text-sm" placeholder="john@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1F2853] mb-2">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#f25a1a] focus:ring-2 focus:ring-[#f25a1a]/20 outline-none transition-all text-sm" placeholder="+1 (555) 123-4567" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1F2853] mb-2">What challenge are you looking to solve? *</label>
                  <textarea name="challenge" value={formData.challenge} onChange={handleChange} required maxLength={500} rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#f25a1a] focus:ring-2 focus:ring-[#f25a1a]/20 outline-none transition-all resize-none text-sm" placeholder="Describe your business challenge or automation needs (max 500 characters)" />
                  <p className="text-xs text-gray-500 mt-1">{formData.challenge.length}/500 characters</p>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full px-8 py-4 bg-[#f25a1a] text-white rounded-full font-semibold hover:bg-[#d94d15] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap">
                  {isSubmitting ? 'Submitting…' : (content.form_button_text ?? 'Request Consultation')}
                </button>
                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <p className="text-green-800 text-sm font-semibold">
                      ✓ {content.success_message ?? 'Thank you! Our AI experts will contact you within 24 hours.'}
                    </p>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-800 text-sm font-semibold">✗ Something went wrong. Please try again later.</p>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            {section?.badge_text && (
              <div className="inline-block px-4 py-2 bg-[#b9ed2a]/20 rounded-full mb-6">
                <span className="text-[#1F2853] font-semibold text-sm">{section.badge_text}</span>
              </div>
            )}
            <h2 className="text-4xl md:text-5xl font-bold text-[#1F2853] mb-6 font-['Poppins']">
              {section?.title ?? 'Transform Your Business with AI Automation'}
            </h2>
            {section?.description && (
              <p className="text-lg text-gray-600 mb-8 leading-relaxed font-['Manrope']">{section.description}</p>
            )}

            {section?.media_url && (
              <div className="rounded-3xl overflow-hidden mb-8 shadow-xl" style={{ backgroundImage: `url(${section.media_url})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '400px' }}>
                <div className="w-full h-full bg-gradient-to-t from-[#1F2853]/80 to-transparent flex items-end p-8">
                  <div>
                    {content.image_overlay_title && (
                      <h3 className="text-2xl font-bold text-white mb-2">{content.image_overlay_title}</h3>
                    )}
                    {content.image_overlay_subtitle && (
                      <p className="text-gray-200">{content.image_overlay_subtitle}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {automationSolutions.length > 0 && (
              <>
                <h3 className="text-2xl font-bold text-[#1F2853] mb-6 font-['Poppins']">
                  {content.solutions_title ?? 'Our AI Automation Solutions'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {automationSolutions.map((s, i) => (
                    <div key={i} className="p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 bg-[#f25a1a]/10 rounded-xl flex items-center justify-center mb-4">
                        <i className={`${s.icon} text-2xl text-[#f25a1a]`} />
                      </div>
                      <h4 className="text-lg font-bold text-[#1F2853] mb-2 font-['Poppins']">{s.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed font-['Manrope']">{s.description}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAutomationSection;
