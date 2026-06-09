import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi } from '../../lib/api';
import { supabase } from '../../lib/supabase';

const SuccessContact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const { data: section } = useQuery({
        queryKey: ['page-section', 'success_stories', 'contact'],
        queryFn: () => siteContentApi.section('success_stories', 'contact'),
    });

    const { data: globalSettings } = useQuery({
        queryKey: ['global-settings-public'],
        queryFn: async () => {
            const { data } = await supabase
                .from('global_settings')
                .select('admin_email')
                .eq('id', 1)
                .single();
            return data;
        },
    });

    const content = (section?.content ?? {}) as Record<string, string>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const { error } = await supabase.from('form_submissions').insert({
                form_type: 'success_stories_contact',
                source_page: 'success_stories',
                payload: formData,
            });
            if (error) throw error;
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch {
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!section) return null;

    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Left Info */}
                    <div>
                        {section.subtitle && (
                            <span className="text-brand-orange font-bold text-xs tracking-widest uppercase mb-4 block">{section.subtitle}</span>
                        )}
                        <h2 className="text-4xl font-bold text-brand-dark mb-8">
                            {section.title?.split('\n').map((line, i) => (
                                <span key={i} className={i === 1 ? 'text-brand-orange' : ''}>{line}<br /></span>
                            ))}
                        </h2>
                        {section.description && (
                            <p className="text-gray-500 mb-12 text-lg">{section.description}</p>
                        )}

                        <div className="space-y-8">
                            {content.address && (
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 text-brand-dark">
                                        <i className="ri-map-pin-line text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-dark mb-1">{content.address_label ?? 'Studio Address'}</h4>
                                        <p className="text-gray-500 text-sm">{content.address}</p>
                                    </div>
                                </div>
                            )}
                            {content.phone && (
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 text-brand-dark">
                                        <i className="ri-phone-line text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-dark mb-1">{content.phone_label ?? 'Call Us'}</h4>
                                        <p className="text-gray-500 text-sm">{content.phone}</p>
                                    </div>
                                </div>
                            )}
                            {(content.email || globalSettings?.admin_email) && (
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 text-brand-dark">
                                        <i className="ri-mail-line text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-dark mb-1">{content.email_label ?? 'Email Us'}</h4>
                                        <p className="text-gray-500 text-sm">{content.email ?? globalSettings?.admin_email}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {section.media_url && (
                            <div className="mt-12 rounded-2xl overflow-hidden h-64 bg-gray-100 relative">
                                <img src={section.media_url} alt="Studio" className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700" />
                            </div>
                        )}
                    </div>

                    {/* Right Form */}
                    <div className="bg-gray-50 rounded-[2rem] p-8 md:p-12 border border-gray-100 shadow-xl shadow-gray-100/50">
                        <h3 className="text-2xl font-bold text-brand-dark mb-6">{content.form_title ?? 'Send Message'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Name</label>
                                    <input name="name" value={formData.name} onChange={handleChange} required type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</label>
                                    <input name="email" value={formData.email} onChange={handleChange} required type="email" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors" placeholder="john@example.com" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone</label>
                                    <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors" placeholder="+1 (555) 000-0000" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Subject</label>
                                    <input name="subject" value={formData.subject} onChange={handleChange} type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors" placeholder="Interview Request" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Message</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 h-32 focus:outline-none focus:border-brand-orange transition-colors resize-none" placeholder="Tell us about your story..." />
                            </div>
                            <button type="submit" disabled={isSubmitting} className="w-full bg-brand-dark text-white font-bold py-4 rounded-xl hover:bg-brand-orange transition-colors shadow-lg shadow-brand-dark/20 flex items-center justify-center gap-2 group disabled:opacity-50">
                                {isSubmitting ? 'Sending…' : (content.button_text ?? 'Send Message')}
                                <i className="ri-send-plane-fill group-hover:translate-x-1 transition-transform" />
                            </button>
                            {status === 'success' && (
                                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-800 text-sm font-semibold">
                                    ✓ {content.success_message ?? 'Message sent. Thank you!'}
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800 text-sm font-semibold">
                                    ✗ Something went wrong. Please try again.
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SuccessContact;
