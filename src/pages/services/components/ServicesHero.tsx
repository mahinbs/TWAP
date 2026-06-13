import React from 'react';

const ServicesHero: React.FC = () => {
  return (
    <section 
      className="relative pt-32 pb-24 overflow-hidden"
      style={{
        backgroundImage: 'url(https://readdy.ai/api/search-image?query=Modern%20digital%20technology%20workspace%20with%20holographic%20interfaces%20and%20futuristic%20AI%20elements%20floating%20in%20a%20sleek%20minimalist%20office%20environment%20with%20soft%20ambient%20lighting%20and%20clean%20professional%20atmosphere%20showcasing%20innovation%20and%20digital%20transformation%20with%20abstract%20data%20visualization%20and%20connectivity%20patterns&width=1920&height=800&seq=services-hero-bg&orientation=landscape)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1F2853]/95 via-[#1F2853]/90 to-[#1F2853]/85"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-6 py-2 bg-[#ffcee0]/20 backdrop-blur-sm rounded-full border border-[#ffcee0]/30 mb-6">
            <span className="text-[#ffcee0] font-semibold text-sm">Premium Services</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-['Poppins']">
            Elevate Your Digital Presence
          </h1>
          
          <p className="text-xl text-gray-200 mb-8 leading-relaxed font-['Manrope']">
            Choose from our premium services designed to boost your app's visibility and transform your business with cutting-edge AI automation solutions
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="#app-promotion" 
              className="px-8 py-4 bg-[#f25a1a] text-white rounded-full font-semibold hover:bg-[#d94d15] transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
            >
              Feature Your App
            </a>
            <a 
              href="#ai-automation" 
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/30 whitespace-nowrap cursor-pointer"
            >
              AI Automation Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
