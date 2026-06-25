import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

const SuccessContact = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email) { setStatus('err'); return; }
        setStatus('sending');
        try {
            await supabase.from('form_submissions').insert({
                form_type: 'success_stories_contact',
                source_page: 'interviews-success-stories',
                payload: form,
            });
            setStatus('ok');
            setForm({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch { setStatus('err'); }
    };
    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Left Info */}
                    <div>
                        <span className="text-brand-orange font-bold text-xs tracking-widest uppercase mb-4 block">Get in Touch</span>
                        <h2 className="text-4xl font-bold text-brand-dark mb-8">
                            Have a Story to Tell? <br />
                            <span className="text-brand-orange">Let's Connect.</span>
                        </h2>
                        <p className="text-gray-500 mb-12 text-lg">
                            We're always looking for inspiring success stories and innovative leaders to feature. Drop us a message or visit our studio.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 text-brand-dark">
                                    <i className="ri-map-pin-line text-xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-dark mb-1">Studio Address</h4>
                                    <p className="text-gray-500 text-sm">Creative District, Virtual Tech Park, 402, Web City, Digital World.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 text-brand-dark">
                                    <i className="ri-phone-line text-xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-dark mb-1">Call Us</h4>
                                    <p className="text-gray-500 text-sm">+1 (800) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 text-brand-dark">
                                    <i className="ri-mail-line text-xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-dark mb-1">Email Us</h4>
                                    <p className="text-gray-500 text-sm">stories@agency.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 rounded-2xl overflow-hidden h-64 bg-gray-100 relative">
                            {/* Placeholder for Map or Image */}
                            <img
                                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800"
                                alt="Studio"
                                className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                            />
                        </div>
                    </div>

                    {/* Right Form */}
                    <div className="bg-gray-50 rounded-[2rem] p-8 md:p-12 border border-gray-100 shadow-xl shadow-gray-100/50">
                        <h3 className="text-2xl font-bold text-brand-dark mb-6">Send Message</h3>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Name</label>
                                    <input name="name" type="text" value={form.name} onChange={handleChange} required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</label>
                                    <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors" placeholder="john@example.com" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone</label>
                                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors" placeholder="+1 (555) 000-0000" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Subject</label>
                                    <input name="subject" type="text" value={form.subject} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors" placeholder="Interview Request" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Message</label>
                                <textarea name="message" value={form.message} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 h-32 focus:outline-none focus:border-brand-orange transition-colors resize-none" placeholder="Tell us about your story..."></textarea>
                            </div>

                            <button type="submit" disabled={status === 'sending'} className="w-full bg-brand-dark text-white font-bold py-4 rounded-xl hover:bg-brand-orange transition-colors shadow-lg shadow-brand-dark/20 flex items-center justify-center gap-2 group disabled:opacity-60">
                                {status === 'sending' ? 'Sending…' : 'Send Message'}
                                <i className="ri-send-plane-fill group-hover:translate-x-1 transition-transform"></i>
                            </button>
                            {status === 'ok' && <p className="text-green-600 text-sm">Thanks — we'll be in touch!</p>}
                            {status === 'err' && <p className="text-red-600 text-sm">Couldn't send. Try again.</p>}
                        </form>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default SuccessContact;
