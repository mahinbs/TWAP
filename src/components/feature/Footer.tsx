import { useQuery } from '@tanstack/react-query';
import { siteContentApi, settingsApi } from '../../lib/api';

const FALLBACK_BRAND = {
  name: 'The Web App Pro',
  description: 'Discover, compare, and promote the best AI-powered tools that matter for your business.',
};

interface FooterLink { label: string; url: string }
interface FooterColumn { title: string; links: FooterLink[] }

const FALLBACK_COLUMNS: FooterColumn[] = [
  {
    title: 'Reviews & Directory',
    links: [
      { label: 'App Reviews', url: '/reviews' },
      { label: 'Review Directory', url: '/directory' },
      { label: 'Submit App', url: '/submit' },
      { label: 'Categories', url: '/categories' },
    ],
  },
  {
    title: 'Services & Resources',
    links: [
      { label: 'Services', url: '/services' },
      { label: 'Insights & Blog', url: '/insights' },
      { label: 'News', url: '/news' },
      { label: 'AI Automation Help', url: '/automation' },
    ],
  },
  {
    title: 'Contact & Support',
    links: [
      { label: 'Contact Team', url: '/contact' },
      { label: 'About Us', url: '/about' },
      { label: 'Privacy Policy', url: '/privacy' },
      { label: 'Terms of Service', url: '/terms' },
    ],
  },
];

export default function Footer() {
  const { data: brandSection } = useQuery({
    queryKey: ['page-section', 'global', 'footer_brand'],
    queryFn: () => siteContentApi.section('global', 'footer_brand'),
  });
  const { data: settings } = useQuery({
    queryKey: ['global-settings'],
    queryFn: settingsApi.get,
  });
  const { data: col1Items = [] } = useQuery({
    queryKey: ['navigation', 'footer_col_1'],
    queryFn: () => siteContentApi.navigation('footer_col_1'),
  });
  const { data: col2Items = [] } = useQuery({
    queryKey: ['navigation', 'footer_col_2'],
    queryFn: () => siteContentApi.navigation('footer_col_2'),
  });
  const { data: col3Items = [] } = useQuery({
    queryKey: ['navigation', 'footer_col_3'],
    queryFn: () => siteContentApi.navigation('footer_col_3'),
  });

  const brandName = brandSection?.title ?? settings?.site_name ?? FALLBACK_BRAND.name;
  const brandDesc = brandSection?.description ?? settings?.site_description ?? FALLBACK_BRAND.description;
  const brandContent = (brandSection?.content ?? {}) as Record<string, string>;

  const columns: FooterColumn[] = [
    col1Items.length > 0
      ? { title: brandContent.col1_title ?? FALLBACK_COLUMNS[0].title, links: col1Items.map(i => ({ label: i.label, url: i.url })) }
      : FALLBACK_COLUMNS[0],
    col2Items.length > 0
      ? { title: brandContent.col2_title ?? FALLBACK_COLUMNS[1].title, links: col2Items.map(i => ({ label: i.label, url: i.url })) }
      : FALLBACK_COLUMNS[1],
    col3Items.length > 0
      ? { title: brandContent.col3_title ?? FALLBACK_COLUMNS[2].title, links: col3Items.map(i => ({ label: i.label, url: i.url })) }
      : FALLBACK_COLUMNS[2],
  ];

  const copyright = brandContent.copyright ?? `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`;
  const twitterUrl = settings?.twitter_handle ? `https://twitter.com/${settings.twitter_handle.replace('@', '')}` : '#';
  const linkedinUrl = settings?.linkedin_url ?? '#';
  const facebookUrl = settings?.facebook_url ?? '#';

  return (
    <footer className="bg-[#1F2853] text-[#f7f5ef]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-[#f7f5ef] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              {brandName}
            </h3>
            <p className="text-[#f7f5ef]/80 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              {brandDesc}
            </p>
            <div className="flex space-x-4">
              <a href={twitterUrl} className="text-[#f7f5ef] hover:text-[#f25a1a] transition-colors cursor-pointer">
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-twitter-fill"></i>
                </div>
              </a>
              <a href={linkedinUrl} className="text-[#f7f5ef] hover:text-[#f25a1a] transition-colors cursor-pointer">
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-linkedin-fill"></i>
                </div>
              </a>
              <a href={facebookUrl} className="text-[#f7f5ef] hover:text-[#f25a1a] transition-colors cursor-pointer">
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-github-fill"></i>
                </div>
              </a>
              <a href="#" className="text-[#f7f5ef] hover:text-[#f25a1a] transition-colors cursor-pointer">
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-youtube-fill"></i>
                </div>
              </a>
            </div>
          </div>

          {/* Footer Columns from DB */}
          {columns.map((col, idx) => (
            <div key={idx}>
              <h4 className="text-lg font-semibold text-[#f7f5ef] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.url}>
                    <a href={link.url} className="text-[#f7f5ef]/80 hover:text-[#f25a1a] transition-colors cursor-pointer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#f7f5ef]/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#f7f5ef]/60 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
