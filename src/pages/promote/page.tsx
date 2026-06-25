import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import { Link } from 'react-router-dom';
import { usePromoteLanding } from '../../hooks/usePromoteCategory';

export default function PromotePage() {
  const { eyebrow, titleLine1, titleLine2, description, cards } = usePromoteLanding();

  return (
    <div className="min-h-screen bg-[#050608] text-white overflow-x-hidden">
      <Header />

      <main className="pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <section className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            {eyebrow && (
              <span className="inline-flex items-center rounded-full border border-[#f25a1a]/40 bg-[#f25a1a]/10 px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-[#ff8a5e]">
                {eyebrow}
              </span>
            )}

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight font-['Manrope']">
              <span className="block text-white">{titleLine1}</span>
              <span className="block text-[#ff6a3d] mt-1 sm:mt-2">{titleLine2}</span>
            </h1>

            {description && (
              <p className="mt-5 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base text-white/60 leading-relaxed font-['Poppins']">
                {description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-4xl mx-auto">
            {cards.map((item) => (
              <Link
                key={item.slug}
                to={`/promote/${item.slug}`}
                className="group relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.03] p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-colors"
                style={{ borderColor: item.card_accent_soft_border }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center border transition-colors"
                    style={{ backgroundColor: item.card_accent_soft_bg, borderColor: item.card_accent_soft_border }}
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
