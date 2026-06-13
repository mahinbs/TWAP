import { useState, useEffect, useRef } from 'react';

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    main: 0,
    userSat: 0,
    toolAdopt: 0,
    activeUsers: 0,
    premium: 0
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to detect when component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  // Counter animation
  useEffect(() => {
    if (!isVisible) return;

    const targets = {
      main: 85,
      userSat: 92,
      toolAdopt: 78,
      activeUsers: 65,
      premium: 42
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        main: Math.floor(targets.main * progress),
        userSat: Math.floor(targets.userSat * progress),
        toolAdopt: Math.floor(targets.toolAdopt * progress),
        activeUsers: Math.floor(targets.activeUsers * progress),
        premium: Math.floor(targets.premium * progress)
      });

      if (currentStep >= steps) {
        setCounters(targets);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12">
            Measurable
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Stat - Platform Growth */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-sm font-semibold text-gray-700">Platform Growth</h3>
                <div className="flex items-center gap-1 text-brand-orange text-sm font-bold">
                  <i className="ri-arrow-up-circle-fill"></i>
                  <span>+45%</span>
                </div>
              </div>
              <div className="h-1 bg-brand-orange/10 rounded-full mb-6">
                <div
                  className="h-full bg-brand-orange rounded-full transition-all duration-2000 ease-out"
                  style={{ width: `${isVisible ? (counters.main / 85) * 75 : 0}%` }}
                ></div>
              </div>
              <div className="text-6xl md:text-7xl font-bold text-brand-dark mb-4">
                {counters.main}%
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Regular updates and new tools best way to grow platform <span className="text-brand-orange font-semibold">Success Rate</span>. It also helps us understand your team's needs and improve the accuracy of recommendations.
              </p>
            </div>

            {/* Stats Grid - Right Side */}
            <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
              {/* User Satisfaction */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-sm font-semibold text-gray-700">User Satisfaction</h3>
                  <div className="flex items-center gap-1 text-brand-lime text-sm font-bold">
                    <i className="ri-arrow-up-circle-fill"></i>
                    <span>+32%</span>
                  </div>
                </div>
                <div className="h-1 bg-brand-lime/10 rounded-full mb-4">
                  <div
                    className="h-full bg-brand-lime rounded-full transition-all duration-2000 ease-out"
                    style={{ width: `${isVisible ? counters.userSat : 0}%` }}
                  ></div>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-brand-dark">
                  {counters.userSat}%
                </div>
              </div>

              {/* Tool Adoption */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-sm font-semibold text-gray-700">Tool Adoption</h3>
                  <div className="flex items-center gap-1 text-green-500 text-sm font-bold">
                    <i className="ri-arrow-up-circle-fill"></i>
                    <span>+18%</span>
                  </div>
                </div>
                <div className="h-1 bg-brand-lime/10 rounded-full mb-4">
                  <div
                    className="h-full bg-brand-lime rounded-full transition-all duration-2000 ease-out"
                    style={{ width: `${isVisible ? counters.toolAdopt : 0}%` }}
                  ></div>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-brand-dark">
                  {counters.toolAdopt}%
                </div>
              </div>

              {/* Active Users */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-sm font-semibold text-gray-700">Active Users</h3>
                  <div className="flex items-center gap-1 text-pink-400 text-sm font-bold">
                    <i className="ri-arrow-down-circle-fill"></i>
                    <span>-2%</span>
                  </div>
                </div>
                <div className="h-1 bg-brand-burgundy/10 rounded-full mb-4">
                  <div
                    className="h-full bg-brand-burgundy rounded-full transition-all duration-2000 ease-out"
                    style={{ width: `${isVisible ? counters.activeUsers : 0}%` }}
                  ></div>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-brand-dark">
                  {counters.activeUsers}%
                </div>
              </div>

              {/* Premium Conversion */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-sm font-semibold text-gray-700">Premium Conversion</h3>
                  <div className="flex items-center gap-1 text-brand-dark text-sm font-bold">
                    <i className="ri-arrow-up-circle-fill"></i>
                    <span>+15%</span>
                  </div>
                </div>
                <div className="h-1 bg-brand-dark/10 rounded-full mb-4">
                  <div
                    className="h-full bg-brand-dark rounded-full transition-all duration-2000 ease-out"
                    style={{ width: `${isVisible ? counters.premium : 0}%` }}
                  ></div>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-brand-dark">
                  {counters.premium}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
