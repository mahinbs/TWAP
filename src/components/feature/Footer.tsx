import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { siteContentApi, settingsApi } from "../../lib/api";
import { supabase } from "../../lib/supabase";

const FALLBACK_LOGO = "https://static.readdy.ai/image/19a52a0e7cd11d182286c46a940c9855/e182590b8be678e75f8d6849629e767f.png";

const FALLBACK_NEWSLETTER = {
  title: "Subscribe our newsletter",
  description: "Subscribe to our newsletter and be the first to receive insights, updates, and expert tips on discovering the best AI tools and apps.",
  form_title: "Stay up to date",
  email_placeholder: "Enter your email",
  button_text: "Subscribe",
  fine_print: "By subscribing you agree to receive updates and insights.",
};

const FALLBACK_BRAND = {
  tagline: "Make your app discovery more simple",
};

const FALLBACK_SOCIAL = [
  { icon: "ri-twitter-fill",  url: "#" },
  { icon: "ri-linkedin-fill", url: "#" },
  { icon: "ri-github-fill",   url: "#" },
  { icon: "ri-youtube-fill",  url: "#" },
];

const FALLBACK_COLS: Record<string, { heading: string; items: { label: string; url: string }[] }> = {
  footer_col_1: {
    heading: "Features",
    items: [
      { label: "Home",                url: "/" },
      { label: "Directory",           url: "/directory" },
      { label: "Top AI Tools & Apps", url: "/tools" },
    ],
  },
  footer_col_2: {
    heading: "Explore",
    items: [
      { label: "Everything AI",   url: "/everything-ai" },
      { label: "Services",        url: "/services" },
      { label: "Agency Feature",  url: "/agencies" },
    ],
  },
  footer_col_3: {
    heading: "Company",
    items: [
      { label: "Methodology",     url: "/methodology" },
      { label: "Promote",         url: "/promote" },
      { label: "Resource Centre", url: "/resource-centre/blogs" },
      { label: "Success Stories", url: "/interviews-success-stories" },
    ],
  },
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"" | "ok" | "err">("");

  const { data: newsletterSection } = useQuery({
    queryKey: ["page-section", "global", "footer_newsletter"],
    queryFn: () => siteContentApi.section("global", "footer_newsletter"),
  });
  const { data: brandSection } = useQuery({
    queryKey: ["page-section", "global", "footer_brand"],
    queryFn: () => siteContentApi.section("global", "footer_brand"),
  });
  const { data: col1Section } = useQuery({
    queryKey: ["page-section", "global", "footer_col_1"],
    queryFn: () => siteContentApi.section("global", "footer_col_1"),
  });
  const { data: col2Section } = useQuery({
    queryKey: ["page-section", "global", "footer_col_2"],
    queryFn: () => siteContentApi.section("global", "footer_col_2"),
  });
  const { data: col3Section } = useQuery({
    queryKey: ["page-section", "global", "footer_col_3"],
    queryFn: () => siteContentApi.section("global", "footer_col_3"),
  });
  const { data: settings } = useQuery({
    queryKey: ["global-settings"],
    queryFn: () => settingsApi.get(),
  });
  const { data: copyrightSection } = useQuery({
    queryKey: ["page-section", "global", "footer_copyright"],
    queryFn: () => siteContentApi.section("global", "footer_copyright"),
  });
  const { data: socialNav = [] } = useQuery({
    queryKey: ["navigation", "footer_social"],
    queryFn: () => siteContentApi.navigation("footer_social"),
  });
  const { data: footerCol1Nav = [] } = useQuery({
    queryKey: ["navigation", "footer_col_1"],
    queryFn: () => siteContentApi.navigation("footer_col_1"),
  });
  const { data: footerCol2Nav = [] } = useQuery({
    queryKey: ["navigation", "footer_col_2"],
    queryFn: () => siteContentApi.navigation("footer_col_2"),
  });
  const { data: footerCol3Nav = [] } = useQuery({
    queryKey: ["navigation", "footer_col_3"],
    queryFn: () => siteContentApi.navigation("footer_col_3"),
  });

  const newsC = (newsletterSection?.content ?? {}) as Record<string, string>;
  const brandC = (brandSection?.content ?? {}) as Record<string, string>;

  const newsTitle       = newsletterSection?.title       ?? FALLBACK_NEWSLETTER.title;
  const newsDescription = newsletterSection?.description ?? FALLBACK_NEWSLETTER.description;
  const newsFormTitle   = newsC.form_title         ?? FALLBACK_NEWSLETTER.form_title;
  const newsEmailPh     = newsC.email_placeholder  ?? FALLBACK_NEWSLETTER.email_placeholder;
  const newsBtnText     = newsletterSection?.cta_text    ?? FALLBACK_NEWSLETTER.button_text;
  const newsFinePrint   = newsC.fine_print         ?? FALLBACK_NEWSLETTER.fine_print;

  const logoUrl = brandSection?.media_url ?? settings?.logo_url ?? FALLBACK_LOGO;
  const brandTagline = brandSection?.description ?? brandC.tagline ?? FALLBACK_BRAND.tagline;
  const copyright = copyrightSection?.title
    ?? `© ${new Date().getFullYear()} The Web App Pro. All rights reserved.`;

  const socialLinks = socialNav.length > 0
    ? socialNav.map(n => ({ icon: n.icon ?? "ri-link", url: n.url }))
    : FALLBACK_SOCIAL;

  const buildCol = (
    section: typeof col1Section,
    nav: typeof footerCol1Nav,
    fallbackKey: "footer_col_1" | "footer_col_2" | "footer_col_3"
  ) => ({
    heading: section?.title ?? FALLBACK_COLS[fallbackKey].heading,
    items: nav.length > 0
      ? nav.map(n => ({ label: n.label, url: n.url }))
      : FALLBACK_COLS[fallbackKey].items,
  });

  const col1 = buildCol(col1Section, footerCol1Nav, "footer_col_1");
  const col2 = buildCol(col2Section, footerCol2Nav, "footer_col_2");
  const col3 = buildCol(col3Section, footerCol3Nav, "footer_col_3");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await supabase.from("form_submissions").insert({
        form_type: "footer_newsletter",
        source_page: "global",
        payload: { email },
      });
      setStatus("ok");
    } catch {
      setStatus("err");
    }
    setEmail("");
  };

  return (
    <footer className="">
      <div className="bg-white rounded-t-3xl mx-auto">
        <div className="p-2">
          <div className="bg-gradient-to-br from-brand-dark via-brand-dark to-brand-dark px-6 sm:px-8 lg:px-12 py-10 lg:py-12 rounded-t-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
                  {newsTitle}
                </h3>
                <p className="text-white/80 text-lg leading-relaxed" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {newsDescription}
                </p>
              </div>

              <div>
                <p className="text-white text-lg font-semibold mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
                  {newsFormTitle}
                </p>
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={newsEmailPh}
                      required
                      className="flex-1 px-5 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#f25a1a] focus:border-transparent"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    />
                    <button
                      type="submit"
                      className="bg-[#b9ed2a] text-[#1F2853] px-6 py-3 rounded-lg font-semibold hover:bg-[#a5d426] transition-colors whitespace-nowrap"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {newsBtnText}
                    </button>
                  </div>
                  <p className="text-white/70 text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {status === "ok" ? "Thanks! You're subscribed." : status === "err" ? "Could not subscribe — please try again." : newsFinePrint}
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
                      alt="The Web App Pro"
                      className="h-8 md:h-14 w-auto object-contain invert"
                    />
                  </Link>
                </div>
                <p className="text-gray-600 text-sm mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {brandTagline}
                </p>
                <div className="flex space-x-4">
                  {socialLinks.map((s, i) => (
                    <a
                      key={i}
                      href={s.url}
                      className="text-gray-600 hover:text-[#f25a1a] transition-colors cursor-pointer"
                    >
                      <div className="w-6 h-6 flex items-center justify-center">
                        <i className={`${s.icon} text-lg`}></i>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {[col1, col2, col3].map((col, idx) => (
                <div key={idx}>
                  <h4 className="text-lg font-semibold text-[#1F2853] mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
                    {col.heading}
                  </h4>
                  <ul className="space-y-2">
                    {col.items.map((item, i) => (
                      <li key={i}>
                        <Link
                          to={item.url}
                          className="text-gray-600 hover:text-[#f25a1a] transition-colors text-sm cursor-pointer"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-8 pt-8">
              <p className="text-gray-500 text-sm text-center" style={{ fontFamily: "Poppins, sans-serif" }}>
                {copyright}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
