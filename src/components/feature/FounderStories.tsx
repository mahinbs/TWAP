import { useState } from "react";

interface Founder {
  id: number;
  name: string;
  title: string;
  company: string;
  question: string;
  answer: string;
  avatar: string;
  videoThumbnail: string;
  productName: string;
}

export default function FounderStories() {
  const [founders] = useState<Founder[]>([
    {
      id: 1,
      name: "Sarah Chen",
      title: "Founder & CEO",
      company: "MindFlow AI",
      productName: "MindFlow - AI Writing Assistant",
      question: "What inspired you to create MindFlow AI?",
      answer:
        "I noticed writers spending hours on first drafts instead of refining ideas. MindFlow eliminates writer's block by understanding context and generating intelligent suggestions that feel authentically yours.",
      avatar:
        "https://readdy.ai/api/search-image?query=Professional%20Asian%20female%20CEO%20headshot%2C%20confident%20tech%20entrepreneur%2C%20modern%20startup%20office%20background%2C%20business%20casual%20attire%2C%20warm%20smile%2C%20clean%20corporate%20portrait%2C%20professional%20lighting%2C%20innovative%20leader&width=200&height=200&seq=founder-sarah&orientation=squarish",
      videoThumbnail:
        "https://readdy.ai/api/search-image?query=AI%20writing%20assistant%20interface%20demonstration%2C%20modern%20software%20dashboard%20with%20text%20editing%20features%2C%20clean%20user%20interface%20design%2C%20productivity%20app%20screenshot%2C%20professional%20software%20presentation%2C%20blue%20and%20white%20color%20scheme&width=400&height=225&seq=video-mindflow&orientation=landscape",
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      title: "Co-Founder & CTO",
      company: "DataSync Pro",
      productName: "DataSync - Business Analytics Platform",
      question: "How does DataSync solve real business problems?",
      answer:
        "Small businesses drown in spreadsheets and disconnected tools. DataSync automatically connects all your business data sources and provides actionable insights without requiring a data science degree.",
      avatar:
        "https://readdy.ai/api/search-image?query=Professional%20Hispanic%20male%20founder%20headshot%2C%20tech%20entrepreneur%20portrait%2C%20modern%20office%20environment%2C%20confident%20expression%2C%20business%20casual%20shirt%2C%20clean%20corporate%20photography%2C%20innovative%20startup%20leader&width=200&height=200&seq=founder-marcus&orientation=squarish",
      videoThumbnail:
        "https://readdy.ai/api/search-image?query=Business%20analytics%20dashboard%20with%20charts%20and%20graphs%2C%20data%20visualization%20interface%2C%20modern%20business%20intelligence%20software%2C%20professional%20analytics%20platform%2C%20clean%20dashboard%20design%2C%20blue%20and%20orange%20color%20scheme&width=400&height=225&seq=video-datasync&orientation=landscape",
    },
    {
      id: 3,
      name: "Emily Watson",
      title: "Co-Founder & Head of Product",
      company: "EcoTrack Solutions",
      productName: "EcoTrack - Sustainability Management",
      question: "Why is sustainability tracking crucial for businesses today?",
      answer:
        "Companies need to measure their environmental impact not just for compliance, but for competitive advantage. EcoTrack makes sustainability data as accessible as financial metrics, driving both profit and purpose.",
      avatar:
        "https://readdy.ai/api/search-image?query=Professional%20female%20founder%20headshot%2C%20sustainability%20tech%20entrepreneur%2C%20modern%20eco-friendly%20office%20background%2C%20confident%20business%20leader%2C%20professional%20attire%2C%20warm%20expression%2C%20clean%20corporate%20portrait&width=200&height=200&seq=founder-emily&orientation=squarish",
      videoThumbnail:
        "https://readdy.ai/api/search-image?query=Sustainability%20tracking%20dashboard%20with%20environmental%20metrics%2C%20green%20technology%20interface%2C%20eco-friendly%20business%20analytics%2C%20modern%20environmental%20software%2C%20clean%20green%20and%20blue%20design%2C%20professional%20app%20interface&width=400&height=225&seq=video-ecotrack&orientation=landscape",
    },
  ]);

  const cardThemes = [
    {
      background: "linear-gradient(150deg, #ecffbf 0%, #e1f97b 100%)",
      tagBg: "rgba(31, 40, 83, 0.08)",
      accent: "#1F2853",
    },
    {
      background: "linear-gradient(150deg, #ffe8f2 0%, #fdd7ed 100%)",
      tagBg: "rgba(31, 40, 83, 0.08)",
      accent: "#1F2853",
    },
    {
      background: "linear-gradient(150deg, #f6f1ff 0%, #e9ddff 100%)",
      tagBg: "rgba(31, 40, 83, 0.08)",
      accent: "#1F2853",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[#f7f5ef] via-white to-[#f7f5ef] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#f25a1a]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#1F2853]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Service Hero Section */}
        <div className="text-center lg:text-left mb-12 lg:mb-16 max-w-4xl">
          <div className="inline-block mb-6">
            <span
              className="px-6 py-2 bg-gradient-to-r from-[#ffcee0]/20 to-[#ffb3d6]/20 backdrop-blur-sm border border-[#ffcee0]/30 rounded-full text-[#f25a1a] text-sm font-semibold"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Full-Scale Visibility Platform
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1F2853] mb-4 leading-tight"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Founder visibility that looks and feels editorial
          </h2>
          <p
            className="text-xl sm:text-2xl text-gray-700 mb-4 max-w-3xl"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            The Web App Pro elevates every founder story with cinematic visuals,
            curated interviews, and feature-grade exposure tailored to their growth stage.
          </p>
          <p
            className="text-lg text-gray-600 max-w-2xl"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Get featured with bespoke coverage that mirrors the premium program grid you see on top-tier editorial sites.
          </p>
        </div>

        {/* New founder grid inspired by reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {founders.map((founder, index) => {
            const theme = cardThemes[index % cardThemes.length];
            return (
              <div
                key={founder.id}
                className="rounded-[36px] p-6 sm:p-7 flex flex-col justify-between shadow-lg border border-white/60"
                style={{ background: theme.background }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
                    style={{
                      background: theme.tagBg,
                      color: theme.accent,
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {founder.company}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-800 font-semibold">
                    <i className="ri-star-fill text-[#f25a1a]"></i>
                    Prime Feature
                  </span>
                </div>

                <div>
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ fontFamily: "Manrope, sans-serif", color: theme.accent }}
                  >
                    {founder.name}
                  </h3>
                  <p
                    className="text-sm text-gray-800 mb-4"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {founder.title}
                  </p>
                  <h4
                    className="text-lg font-semibold mb-2"
                    style={{ fontFamily: "Manrope, sans-serif", color: theme.accent }}
                  >
                    {founder.productName}
                  </h4>
                  <p
                    className="text-sm text-gray-700 leading-relaxed mb-4"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    "{founder.question}"
                  </p>
                  <p
                    className="text-sm text-gray-800 leading-relaxed"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {founder.answer}
                  </p>
                </div>

                <div className="mt-6">
                  <div className="rounded-[26px] overflow-hidden shadow-inner border border-white/70">
                    <img
                      src={founder.avatar}
                      alt={founder.name}
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                  {/* <button
                    className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-[#1F2853] font-semibold text-sm shadow-md hover:shadow-lg transition-shadow"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Watch story
                    <i className="ri-arrow-right-line"></i>
                  </button> */}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div
          className="text-center rounded-3xl p-8 lg:p-12 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(31, 40, 83, 0.08) 0%, rgba(22, 32, 64, 0.12) 100%)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            boxShadow:
              "0 20px 60px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
          }}
        >
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-transparent pointer-events-none"></div>

          <div className="relative z-10">
            <h3
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F2853] mb-4"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Ready to share your founder story?
            </h3>
            <p
              className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Join our featured founders and get full-scale visibility for you
              and your product
            </p>
            <button
              className="bg-gradient-to-r from-[#f25a1a] to-[#ff7043] text-white px-8 lg:px-10 py-4 lg:py-5 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 whitespace-nowrap text-base lg:text-lg relative overflow-hidden group/btn"
              style={{
                fontFamily: "Poppins, sans-serif",
                boxShadow: "0 10px 30px rgba(242, 90, 26, 0.4)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Share Your Story
                <i className="ri-arrow-right-line group-hover/btn:translate-x-1 transition-transform"></i>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff7043] to-[#f25a1a] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
