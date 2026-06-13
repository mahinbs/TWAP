import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribing:", email);
    setEmail("");
  };

  return (
    <footer className="">
      <div className="bg-white rounded-t-3xl mx-auto">
        {/* White Card Container */}
        <div className="p-2">
          {/* Newsletter Section - Top Half */}
          <div className="bg-gradient-to-br from-brand-dark via-brand-dark to-brand-dark px-6 sm:px-8 lg:px-12 py-10 lg:py-12 rounded-t-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side - Newsletter Info */}
              <div>
                <h3
                  className="text-3xl sm:text-4xl font-bold text-white mb-4"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Subscribe our newsletter
                </h3>
                <p
                  className="text-white/80 text-lg leading-relaxed"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Subscribe to our newsletter and be the first to receive
                  insights, updates, and expert tips on discovering the best AI
                  tools and apps.
                </p>
              </div>

              {/* Right Side - Newsletter Form */}
              <div>
                <p
                  className="text-white text-lg font-semibold mb-4"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Stay up to date
                </p>
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="flex-1 px-5 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#f25a1a] focus:border-transparent"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    />
                    <button
                      type="submit"
                      className="bg-[#b9ed2a] text-[#1F2853] px-6 py-3 rounded-lg font-semibold hover:bg-[#a5d426] transition-colors whitespace-nowrap"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Subscribe
                    </button>
                  </div>
                  <p
                    className="text-white/70 text-sm"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    By subscribing you agree to receive updates and insights.
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* Footer Links Section - Bottom Half */}
          <div className="px-6 sm:px-8 lg:px-12 py-8 lg:py-10 rounded-b-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Brand Section - Left */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-3 mb-3">
                  <a
                    href="/"
                    className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                  >
                    <img
                      src="https://static.readdy.ai/image/19a52a0e7cd11d182286c46a940c9855/e182590b8be678e75f8d6849629e767f.png"
                      alt="The Web App Pro"
                      className="h-8 md:h-14 w-auto object-contain invert"
                    />
                  </a>
                </div>
                <p
                  className="text-gray-600 text-sm mb-6"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Make your app discovery more simple
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#f25a1a] transition-colors cursor-pointer"
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      <i className="ri-twitter-fill text-lg"></i>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#f25a1a] transition-colors cursor-pointer"
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      <i className="ri-linkedin-fill text-lg"></i>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#f25a1a] transition-colors cursor-pointer"
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      <i className="ri-github-fill text-lg"></i>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#f25a1a] transition-colors cursor-pointer"
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      <i className="ri-youtube-fill text-lg"></i>
                    </div>
                  </a>
                </div>
              </div>

              {/* Features Column */}
              <div>
                <h4
                  className="text-lg font-semibold text-[#1F2853] mb-4"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Features
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/"
                      className="text-gray-600 hover:text-[#f25a1a] transition-colors text-sm cursor-pointer"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="/directory"
                      className="text-gray-600 hover:text-[#f25a1a] transition-colors text-sm cursor-pointer"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Directory
                    </a>
                  </li>
                  <li>
                    <a
                      href="/tools"
                      className="text-gray-600 hover:text-[#f25a1a] transition-colors text-sm cursor-pointer"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Top AI Tools & Apps
                    </a>
                  </li>
                </ul>
              </div>

              {/* Explore Column */}
              <div>
                <h4
                  className="text-lg font-semibold text-[#1F2853] mb-4"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Explore
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/everything-ai"
                      className="text-gray-600 hover:text-[#f25a1a] transition-colors text-sm cursor-pointer"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Everything AI
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services"
                      className="text-gray-600 hover:text-[#f25a1a] transition-colors text-sm cursor-pointer"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="/agencies"
                      className="text-gray-600 hover:text-[#f25a1a] transition-colors text-sm cursor-pointer"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Agency Feature
                    </a>
                  </li>
                </ul>
              </div>

              {/* Company Column */}
              <div>
                <h4
                  className="text-lg font-semibold text-[#1F2853] mb-4"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Company
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/methodology"
                      className="text-gray-600 hover:text-[#f25a1a] transition-colors text-sm cursor-pointer"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Methodology
                    </a>
                  </li>
                  <li>
                    <a
                      href="/promote"
                      className="text-gray-600 hover:text-[#f25a1a] transition-colors text-sm cursor-pointer"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Promote
                    </a>
                  </li>
                  <li>
                    <a
                      href="/resource-centre/blogs"
                      className="text-gray-600 hover:text-[#f25a1a] transition-colors text-sm cursor-pointer"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Resource Centre
                    </a>
                  </li>
                  <li>
                    <a
                      href="/interviews-success-stories"
                      className="text-gray-600 hover:text-[#f25a1a] transition-colors text-sm cursor-pointer"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Success Stories
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Section - Copyright */}
            <div className="border-t border-gray-200 mt-8 pt-8">
              <p
                className="text-gray-500 text-sm text-center"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                © {new Date().getFullYear()} The Web App Pro. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
