
import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-[#1F2853] via-[#2a3a6b] to-[#1F2853]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Stay Ahead of the Tech Curve
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Get the latest AI and tech news delivered to your inbox. Join 25,000+ professionals who trust our weekly digest.
          </p>
        </div>

        {/* Newsletter Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="text-center">
            <div className="w-12 h-12 bg-[#ffcee0]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-newspaper-line text-[#ffcee0] text-xl"></i>
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Weekly Digest
            </h3>
            <p className="text-gray-300 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Curated tech news every Tuesday
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-[#ffcee0]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-flashlight-line text-[#ffcee0] text-xl"></i>
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Breaking News
            </h3>
            <p className="text-gray-300 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Instant alerts for major updates
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-[#ffcee0]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-user-star-line text-[#ffcee0] text-xl"></i>
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Expert Insights
            </h3>
            <p className="text-gray-300 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Analysis from industry leaders
            </p>
          </div>
        </div>

        {/* Newsletter Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ffcee0] focus:border-transparent transition-all duration-300"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#f25a1a] to-[#ff7043] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Subscribe Now
            </button>
          </div>
        </form>

        {/* Success Message */}
        {isSubscribed && (
          <div className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-200">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-check-line"></i>
              </div>
              <span style={{ fontFamily: 'Poppins, sans-serif' }}>
                Successfully subscribed! Check your email for confirmation.
              </span>
            </div>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-300">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-shield-check-line text-[#ffcee0]"></i>
            </div>
            <span className="text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>No spam, ever</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-time-line text-[#ffcee0]"></i>
            </div>
            <span className="text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>Unsubscribe anytime</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-user-line text-[#ffcee0]"></i>
            </div>
            <span className="text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>25,000+ subscribers</span>
          </div>
        </div>
      </div>
    </section>
  );
}