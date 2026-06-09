import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { siteContentApi, settingsApi } from "../../lib/api";
import { formsApi } from "../../lib/forms";
import type { NavItem } from "../../lib/api";

const FALLBACK_LOGO = 'https://static.readdy.ai/image/19a52a0e7cd11d182286c46a940c9855/e182590b8be678e75f8d6849629e767f.png';

function FooterColumn({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div>
      <h4 className="text-lg font-semibold text-[#1F2853] mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map(item => (
          <li key={item.id}>
            <Link
              to={item.url}
              className="text-gray-600 hover:text-[#f25a1a] transition-colors text-sm"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const { data: section } = useQuery({
    queryKey: ['page-section', 'global', 'footer_tagline'],
    queryFn: () => siteContentApi.section('global', 'footer_tagline'),
  });

  const { data: settings } = useQuery({
    queryKey: ['global-settings'],
    queryFn: settingsApi.get,
  });

  const { data: col1 = [] } = useQuery({
    queryKey: ['navigation', 'footer_col_1'],
    queryFn: () => siteContentApi.navigation('footer_col_1'),
  });
  const { data: col2 = [] } = useQuery({
    queryKey: ['navigation', 'footer_col_2'],
    queryFn: () => siteContentApi.navigation('footer_col_2'),
  });
  const { data: col3 = [] } = useQuery({
    queryKey: ['navigation', 'footer_col_3'],
    queryFn: () => siteContentApi.navigation('footer_col_3'),
  });

  const c = section?.content as Record<string, string> | undefined;
  const logoUrl = settings?.logo_url ?? FALLBACK_LOGO;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubStatus('loading');
    try {
      await formsApi.submit({ source: 'newsletter:footer', email });
      setSubStatus('success');
      setEmail("");
    } catch {
      setSubStatus('error');
    }
  };

  return (
    <footer>
      <div className="bg-white rounded-t-3xl mx-auto">
        <div className="p-2">
          <div className="bg-gradient-to-br from-brand-dark via-brand-dark to-brand-dark px-6 sm:px-8 lg:px-12 py-10 lg:py-12 rounded-t-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
                  {section?.title ?? 'Subscribe our newsletter'}
                </h3>
                <p className="text-white/80 text-lg leading-relaxed" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {section?.description ?? 'Subscribe to our newsletter and be the first to receive insights, updates, and expert tips on discovering the best AI tools and apps.'}
                </p>
              </div>

              <div>
                <p className="text-white text-lg font-semibold mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
                  {c?.form_label ?? 'Stay up to date'}
                </p>
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={c?.newsletter_placeholder ?? 'Enter your email'}
                      required
                      className="flex-1 px-5 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#f25a1a] focus:border-transparent"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    />
                    <button
                      type="submit"
                      disabled={subStatus === 'loading'}
                      className="bg-[#b9ed2a] text-[#1F2853] px-6 py-3 rounded-lg font-semibold hover:bg-[#a5d426] transition-colors whitespace-nowrap disabled:opacity-60"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {c?.newsletter_cta ?? 'Subscribe'}
                    </button>
                  </div>
                  {subStatus === 'success' && <p className="text-emerald-300 text-sm">Subscribed! Thank you.</p>}
                  {subStatus === 'error' && <p className="text-red-300 text-sm">Could not subscribe. Try again.</p>}
                  <p className="text-white/70 text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {c?.newsletter_disclaimer ?? 'By subscribing you agree to receive updates and insights.'}
                  </p>
                </form>
              </div>
            </div>
          </div>

          <div className="px-6 sm:px-8 lg:px-12 py-8 lg:py-10 rounded-b-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
              <div className="lg:col-span-1">
                <div className="flex items-center gap-3 mb-3">
                  <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                    <img
                      src={logoUrl}
                      alt={settings?.site_name ?? 'The Web App Pro'}
                      className="h-8 md:h-14 w-auto object-contain invert"
                    />
                  </Link>
                </div>
                <p className="text-gray-600 text-sm mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {c?.footer_tagline ?? settings?.site_description ?? 'Make your app discovery more simple'}
                </p>
                <div className="flex space-x-4">
                  {settings?.twitter_handle && (
                    <a href={settings.twitter_handle} className="text-gray-600 hover:text-[#f25a1a] transition-colors">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <i className="ri-twitter-fill text-lg" />
                      </div>
                    </a>
                  )}
                  {settings?.linkedin_url && (
                    <a href={settings.linkedin_url} className="text-gray-600 hover:text-[#f25a1a] transition-colors">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <i className="ri-linkedin-fill text-lg" />
                      </div>
                    </a>
                  )}
                  {settings?.facebook_url && (
                    <a href={settings.facebook_url} className="text-gray-600 hover:text-[#f25a1a] transition-colors">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <i className="ri-github-fill text-lg" />
                      </div>
                    </a>
                  )}
                </div>
              </div>

              <FooterColumn title={c?.col1_title ?? 'Features'} items={col1} />
              <FooterColumn title={c?.col2_title ?? 'Explore'} items={col2} />
              <FooterColumn title={c?.col3_title ?? 'Company'} items={col3} />
            </div>

            <div className="border-t border-gray-200 mt-8 pt-8">
              <p className="text-gray-500 text-sm text-center" style={{ fontFamily: "Poppins, sans-serif" }}>
                {c?.copyright ?? `© ${new Date().getFullYear()} The Web App Pro. All rights reserved.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
