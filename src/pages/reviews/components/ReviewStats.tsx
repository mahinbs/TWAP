export default function ReviewStats() {
  const stats = [
    { number: '2,847', label: 'Apps Reviewed', icon: 'ri-apps-2-line' },
    { number: '45,892', label: 'User Reviews', icon: 'ri-user-star-line' },
    { number: '156', label: 'Expert Reviews', icon: 'ri-shield-star-line' },
    { number: '4.7', label: 'Average Rating', icon: 'ri-star-line' }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#1F2853] rounded-full flex items-center justify-center">
                <i className={`${stat.icon} text-2xl text-white`}></i>
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-[#1F2853] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {stat.number}
              </div>
              <div className="text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}