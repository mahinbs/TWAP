import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi } from '../../lib/api';
import { formsApi } from '../../lib/forms';

const SuccessCTA = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const { data: section } = useQuery({
    queryKey: ['page-section', 'success_stories', 'cta'],
    queryFn: () => siteContentApi.section('success_stories', 'cta'),
  });

  const content = (section?.content ?? {}) as Record<string, string>;
  const highlight = content.title_highlight ?? 'Subscribe For The Latest Updates.';
  const titleBase = section?.title ?? 'What Do You Want to Hear Today?';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await formsApi.submit({ source: 'newsletter:success_stories', email });
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto rounded-[3rem] bg-black relative overflow-hidden text-white p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '30px 30px' }} />

        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {titleBase} <br />
            <span className="text-brand-orange">{highlight}</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">{section?.description}</p>

          {status === 'success' ? (
            <p className="text-emerald-400 font-semibold">You&apos;re subscribed. Check your inbox soon!</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={content.email_placeholder ?? 'Enter your email address'}
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-100 transition-colors disabled:opacity-60"
              >
                {status === 'loading' ? '…' : (section?.cta_text ?? 'Subscribe')}
              </button>
            </form>
          )}
          {status === 'error' && <p className="text-red-400 text-sm mt-2">Could not subscribe. Try again.</p>}
        </div>

        <div className="relative w-full md:w-1/3 flex justify-center md:justify-end">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 bg-brand-orange/20 rounded-full blur-[80px]" />
            <div className="relative z-10 transform rotate-12 hover:rotate-6 transition-transform duration-700">
              <img
                src={section?.media_url ?? 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=600'}
                alt="Microphone"
                className="w-full h-full object-cover rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessCTA;
