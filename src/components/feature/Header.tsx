import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi, settingsApi } from '../../lib/api';

const FALLBACK_NAV = [
  { label: 'Home',      url: '/' },
  { label: 'Directory', url: '/directory' },
  { label: 'Reviews',   url: '/reviews' },
  { label: 'News',      url: '/news' },
  { label: 'Insights',  url: '/insights' },
  { label: 'Services',  url: '/services' },
];

const FALLBACK_LOGO = 'https://static.readdy.ai/image/19a52a0e7cd11d182286c46a940c9855/e182590b8be678e75f8d6849629e767f.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: navItems = [] } = useQuery({
    queryKey: ['navigation', 'header'],
    queryFn: () => siteContentApi.navigation('header'),
  });

  const { data: settings } = useQuery({
    queryKey: ['global-settings'],
    queryFn: settingsApi.get,
  });

  const navLinks = navItems.length > 0
    ? navItems.map(n => ({ label: n.label, url: n.url }))
    : FALLBACK_NAV;

  const logoUrl = settings?.logo_url ?? FALLBACK_LOGO;
  const siteName = settings?.site_name ?? 'The Web App Pro';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1F2853] border-b border-white/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img
              src={logoUrl}
              alt={siteName}
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                className="text-[#ffcee0] hover:text-[#f25a1a] font-medium transition-colors"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              to="/submit"
              className="bg-gradient-to-r from-[#f25a1a] to-[#ff7043] text-white px-6 py-3 rounded-lg font-['Poppins'] font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
            >
              Submit Your App
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <nav className="flex flex-col space-y-4 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.url}
                  to={link.url}
                  className="text-white font-['Manrope'] font-medium hover:text-[#ffcee0] transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/submit"
                className="bg-gradient-to-r from-[#f25a1a] to-[#ff7043] text-white px-6 py-3 rounded-lg font-['Poppins'] font-semibold hover:shadow-lg transition-all duration-300 text-center mt-4 whitespace-nowrap"
                onClick={() => setIsMenuOpen(false)}
              >
                Submit Your App
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
