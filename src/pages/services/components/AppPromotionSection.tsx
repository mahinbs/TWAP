import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { servicesApi, siteContentApi } from '../../../lib/api';
import { supabase } from '../../../lib/supabase';

interface FeatureExtras { icon?: string }

const AppPromotionSection: React.FC = () => {
  const [formData, setFormData] = useState({ appName: '', appUrl: '', category: '', email: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { data: section } = useQuery({
    queryKey: ['page-section', 'services', 'app_promotion'],
    queryFn: () => siteContentApi.section('services', 'app_promotion'),
  });

  const { data: seoItems = [] } = useQuery({
    queryKey: ['services-items', 'seo_benefits'],
    queryFn: () => servicesApi.items('seo_benefits' as never),
  });

  const seoFeatures = seoItems.map(item => ({
    icon: (item.extras as FeatureExtras | undefined)?.icon ?? item.icon ?? 'ri-check-line',
    title: item.title,
    description: item.description ?? '',
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
        form_type: 'app_promotion_submission',
        source_page: 'services',
        payload: formData,
      });
      if (error) throw error;
      setSubmitStatus('success');
      setFormData({ appName: '', appUrl: '', category: '', email: '', description: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!section && seoFeatures.length === 0) return null;

  return (
    <section id="app-promotion" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left side — Content */}
          <div>
            {section?.badge_text && (
              <div className="inline-block px-4 py-2 bg-[#ffcee0]/20 rounded-full mb-6">
                <span className="text-[#f25a1a] font-semibold text-sm">{section.badge_text}</span>
              </div>
            )}

            <h2 className="text-4xl md:text-5xl font-bold text-[#1F2853] mb-6 font-['Poppins']">
              {section?.title ?? ''}
            </h2>

            {section?.description && (
              <p className="text-lg text-gray-600 mb-8 leading-relaxed font-['Manrope']">
                {section.description}
              </p>
            )}

            {seoFeatures.length > 0 && (
              <div className="bg-gradient-to-br from-[#1F2853] to-[#2a3566] rounded-3xl p-8 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffcee0]/10 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-4 font-['Poppins']">
                    {content.seo_features_title ?? "SEO Benefits You'll Receive"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {seoFeatures.map((f, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-[#f25a1a] rounded-lg flex items-center justify-center flex-shrink-0">
                          <i className={`${f.icon} text-white text-lg`} />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1">{f.title}</h4>
                          <p className="text-gray-300 text-sm">{f.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {(content.savings_title || content.savings_description) && (
              <div className="bg-[#ffcee0]/10 rounded-2xl p-6 border border-[#ffcee0]/30">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#f25a1a] rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-time-line text-white text-xl" />
                  </div>
                  <div>
                    {content.savings_title && (
                      <h4 className="text-lg font-bold text-[#1F2853] mb-2">{content.savings_title}</h4>
                    )}
                    {content.savings_description && (
                      <p className="text-gray-600">{content.savings_description}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right side — Form */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-2xl border border-gray-200">
              <h3 className="text-2xl font-bold text-[#1F2853] mb-6 font-['Poppins']">
                {content.form_title ?? 'Submit Your App for Promotion'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#1F2853] mb-2">App Name *</label>
                  <input type="text" name="appName" value={formData.appName} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#f25a1a] focus:ring-2 focus:ring-[#f25a1a]/20 outline-none transition-all text-sm" placeholder="Enter your app name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1F2853] mb-2">App URL *</label>
                  <input type="url" name="appUrl" value={formData.appUrl} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#f25a1a] focus:ring-2 focus:ring-[#f25a1a]/20 outline-none transition-all text-sm" placeholder="https://yourapp.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1F2853] mb-2">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#f25a1a] focus:ring-2 focus:ring-[#f25a1a]/20 outline-none transition-all text-sm" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1F2853] mb-2">Description *</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#f25a1a] focus:ring-2 focus:ring-[#f25a1a]/20 outline-none transition-all resize-none text-sm" placeholder="Tell us about your app" />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full px-8 py-4 bg-[#f25a1a] text-white rounded-full font-semibold hover:bg-[#d94d15] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 whitespace-nowrap">
                  {isSubmitting ? 'Submitting…' : (content.form_button_text ?? 'Submit App')}
                </button>
                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <p className="text-green-800 text-sm font-semibold">
                      ✓ {content.success_message ?? "Thanks! We'll review your submission within 48 hours."}
                    </p>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-800 text-sm font-semibold">✗ Something went wrong. Please try again.</p>
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
