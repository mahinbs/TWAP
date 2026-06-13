export default function ReviewsHero() {
  return (
    <section 
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        backgroundImage: 'url(https://readdy.ai/api/search-image?query=Modern%20technology%20review%20platform%20background%2C%20digital%20interface%20elements%2C%20app%20icons%20floating%2C%20gradient%20blue%20purple%20atmosphere%2C%20professional%20tech%20environment%2C%20clean%20minimalist%20design%2C%20review%20stars%20and%20ratings%20visualization%2C%20futuristic%20dashboard%20aesthetic&width=1920&height=800&seq=reviews-hero&orientation=landscape)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1F2853]/90 to-[#1F2853]/70"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
            App Reviews & Rankings
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Discover the best apps through comprehensive reviews from both users and our expert team
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              className="px-8 py-4 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap hover:scale-105 hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #b9ed2a 0%, #a5d426 50%, #91bb22 100%)',
                color: '#1F2853',
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              Submit Your Review
            </button>
            <button 
              className="px-8 py-4 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap backdrop-blur-md border border-white/30"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              Browse All Reviews
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}