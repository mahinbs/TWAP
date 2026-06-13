import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import { Link } from 'react-router-dom';

const promoteOptions = [
  {
    slug: 'web-mobile-apps',
    icon: 'ri-smartphone-line',
    accent: '#ef4d0a',
    accentSoftBg: 'rgba(239, 77, 10, 0.12)',
    accentSoftBorder: 'rgba(239, 77, 10, 0.40)',
    title: 'Web & Mobile App',
    description:
      "You've built a web application, iOS or Android app, or cross-platform product and want real users to find it.",
    tags: ['iOS App', 'Android App', 'Web App', 'SaaS', 'Browser Extension'],
  },
  {
    slug: 'ai-tools',
    icon: 'ri-robot-2-line',
    accent: '#5d39f6',
    accentSoftBg: 'rgba(93, 57, 246, 0.14)',
    accentSoftBorder: 'rgba(93, 57, 246, 0.70)',
    title: 'AI Tool or Product',
    description:
      "You've built an AI-powered tool, LLM product, automation platform, or AI API and want it discovered by the right audience.",
    tags: ['AI Tool', 'LLM Product', 'Automation', 'AI API', 'GPT'],
  },
  {
    slug: 'agencies-service-providers',
    icon: 'ri-building-2-line',
    accent: '#0f8d5f',
    accentSoftBg: 'rgba(15, 141, 95, 0.14)',
    accentSoftBorder: 'rgba(15, 141, 95, 0.60)',
    title: 'Agency or Service Provider',
    description:
      'You run a development studio, design agency, AI consultancy, or digital services firm and want qualified leads to find you.',
    tags: ['Dev Agency', 'Design Studio', 'AI Consultancy', 'Marketing Agency'],
  },
];

export default function PromotePage() {
  return (
    <div className="min-h-screen bg-[#050608] text-white overflow-x-hidden">
      <Header />

      <main className="pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <section className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="inline-flex items-center rounded-full border border-[#f25a1a]/40 bg-[#f25a1a]/10 px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-[#ff8a5e]">
              Full-scale visibility platform
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight font-['Manrope']">
              <span className="block text-white">Who Are You</span>
              <span className="block text-[#ff6a3d] mt-1 sm:mt-2">Promoting?</span>
            </h1>

            <p className="mt-5 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base text-white/60 leading-relaxed font-['Poppins']">
              Tell us what you&apos;re bringing to market and we&apos;ll show you exactly how The Web App Pro can get it discovered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-4xl mx-auto">
            {promoteOptions.map((item) => (
              <Link
                key={item.title}
                to={`/promote/${item.slug}`}
                className="group relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.03] p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-colors"
                style={{ borderColor: item.accentSoftBorder }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center border transition-colors"
                    style={{ backgroundColor: item.accentSoftBg, borderColor: item.accentSoftBorder }}
                  >
                    <i className={`${item.icon} text-xl`} style={{ color: item.accent }}></i>
                  </div>
                  <i className="ri-arrow-right-up-line text-white/35 transition-colors" style={{ color: item.accent }}></i>
                </div>

                <h2 className="text-2xl leading-tight font-bold font-['Manrope'] mb-3">{item.title}</h2>
                <p className="text-sm text-white/55 leading-relaxed font-['Poppins'] mb-5">{item.description}</p>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/[0.1] border border-white/10 px-2.5 py-1 text-[11px] text-white/70 font-medium font-['Poppins']"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
