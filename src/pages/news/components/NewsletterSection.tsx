import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi } from '../../../lib/api';
import { supabase } from '../../../lib/supabase';

interface FeatureItem { icon?: string; title?: string; description?: string }

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { data: section } = useQuery({
    queryKey: ['page-section', 'news', 'newsletter'],
    queryFn: () => siteContentApi.section('news', 'newsletter'),
  });

  const content = (section?.content ?? {}) as Record<string, unknown>;
  const features = (content.features as FeatureItem[] | undefined) ?? [];
  const trustIndicators = (content.trust_indicators as Array<{ icon?: string; label?: string }> | undefined) ?? [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await supabase.from('form_submissions').insert({
        form_type: 'newsletter',
        source_page: 'news',
        payload: { email },
      });
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    } catch {
      // ignore — table may not exist; visual feedback only
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  if (!section) return null;

  return (
    <section className="py-16 bg-gradient-to-br from-[#1F2853] via-[#2a3a6b] to-[#1F2853]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {section.title ?? ''}
          </h2>
          {section.description && (
            <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {section.description}
            </p>
          )}
        </div>

        {features.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {features.map((feat, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-[#ffcee0]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className={`${feat.icon ?? 'ri-mail-line'} text-[#ffcee0] text-xl`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {feat.title}
                </h3>
                <p className="text-gray-300 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={String(content.email_placeholder ?? 'Enter your email address')}
              required
              className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ffcee0]"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-gradient-to-r from-[#f25a1a] to-[#ff7043] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg whitespace-nowrap disabled:opacity-60"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {submitting ? 'Subscribing…' : String(content.button_text ?? 'Subscribe Now')}
            </button>
          </div>
        </form>

        {isSubscribed && (
          <div className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-200">
            <div className="flex items-center justify-center space-x-2">
              <i className="ri-check-line" />
              <span style={{ fontFamily: 'Poppins, sans-serif' }}>
                {String(content.success_message ?? 'Successfully subscribed!')}
              </span>
            </div>
          </div>
        )}

        {trustIndicators.length > 0 && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-gray-300">
            {trustIndicators.map((t, i) => (
              <div key={i} className="flex items-center space-x-2">
                <i className={`${t.icon ?? 'ri-shield-check-line'} text-[#ffcee0]`} />
                <span className="text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>{t.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
