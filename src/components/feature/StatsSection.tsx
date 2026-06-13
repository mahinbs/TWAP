import { useState, useEffect, useRef, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi } from '../../lib/api';

const FALLBACK = {
  title: 'Measurable',
  mainLabel: 'Platform Growth',
  mainDelta: '+45%',
  mainValue: 85,
  mainMax: 85,
  mainDescription: 'Regular updates and new tools best way to grow platform Success Rate. It also helps us understand your team\'s needs and improve the accuracy of recommendations.',
  mainDescriptionHighlight: 'Success Rate',
  stats: [
    { label: 'User Satisfaction', delta: '+32%', value: 92, deltaColor: 'text-brand-lime', barColor: 'bg-brand-lime', barBg: 'bg-brand-lime/10' },
    { label: 'Tool Adoption', delta: '+18%', value: 78, deltaColor: 'text-green-500', barColor: 'bg-brand-lime', barBg: 'bg-brand-lime/10' },
    { label: 'Active Users', delta: '-2%', value: 65, deltaColor: 'text-pink-400', barColor: 'bg-brand-burgundy', barBg: 'bg-brand-burgundy/10', deltaIcon: 'ri-arrow-down-circle-fill' },
    { label: 'Premium Conversion', delta: '+15%', value: 42, deltaColor: 'text-brand-dark', barColor: 'bg-brand-dark', barBg: 'bg-brand-dark/10' },
  ],
};

function parsePercent(value: string): number {
  return parseInt(value.replace(/[^\d]/g, ''), 10) || 0;
}

export default function StatsSection({ page = 'home' }: { page?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    main: 0,
    userSat: 0,
    toolAdopt: 0,
    activeUsers: 0,
    premium: 0
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  const sectionKey = page === 'tools' ? 'stats' : 'measurable';

  const { data: section } = useQuery({
    queryKey: ['page-section', page, sectionKey],
    queryFn: () => siteContentApi.section(page, sectionKey),
  });

  const { data: dbStats = [] } = useQuery({
    queryKey: ['site-stats', page],
    queryFn: () => siteContentApi.stats(page),
  });

  const title = section?.title ?? FALLBACK.title;

  const statConfig = useMemo(() => {
    if (dbStats.length === 0) return FALLBACK;

    const main = dbStats[0];
    const rest = dbStats.slice(1, 5);
    return {
      title: section?.title ?? FALLBACK.title,
      mainLabel: main?.label ?? FALLBACK.mainLabel,
      mainDelta: FALLBACK.mainDelta,
      mainValue: parsePercent(main?.value ?? '85%'),
      mainMax: parsePercent(main?.value ?? '85%') || FALLBACK.mainMax,
      mainDescription: section?.description ?? FALLBACK.mainDescription,
      mainDescriptionHighlight: FALLBACK.mainDescriptionHighlight,
      stats: rest.map((s, i) => ({
        label: s.label,
        delta: FALLBACK.stats[i]?.delta ?? '+0%',
        value: parsePercent(s.value),
        deltaColor: FALLBACK.stats[i]?.deltaColor ?? 'text-brand-lime',
        barColor: FALLBACK.stats[i]?.barColor ?? 'bg-brand-lime',
        barBg: FALLBACK.stats[i]?.barBg ?? 'bg-brand-lime/10',
        deltaIcon: FALLBACK.stats[i]?.deltaIcon ?? 'ri-arrow-up-circle-fill',
      })),
    };
  }, [dbStats, section]);

  const targets = useMemo(() => ({
    main: statConfig.mainValue,
    userSat: statConfig.stats[0]?.value ?? FALLBACK.stats[0].value,
    toolAdopt: statConfig.stats[1]?.value ?? FALLBACK.stats[1].value,
    activeUsers: statConfig.stats[2]?.value ?? FALLBACK.stats[2].value,
    premium: statConfig.stats[3]?.value ?? FALLBACK.stats[3].value,
  }), [statConfig]);

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

    const duration = 2000;
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
  }, [isVisible, targets]);

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12">
            {title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Stat - Platform Growth */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-sm font-semibold text-gray-700">{statConfig.mainLabel}</h3>
                <div className="flex items-center gap-1 text-brand-orange text-sm font-bold">
                  <i className="ri-arrow-up-circle-fill"></i>
                  <span>{statConfig.mainDelta}</span>
                </div>
              </div>
              <div className="h-1 bg-brand-orange/10 rounded-full mb-6">
                <div
                  className="h-full bg-brand-orange rounded-full transition-all duration-2000 ease-out"
                  style={{ width: `${isVisible ? (counters.main / statConfig.mainMax) * 75 : 0}%` }}
                ></div>
              </div>
              <div className="text-6xl md:text-7xl font-bold text-brand-dark mb-4">
                {counters.main}%
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                {statConfig.mainDescription.split(statConfig.mainDescriptionHighlight)[0]}
                <span className="text-brand-orange font-semibold">{statConfig.mainDescriptionHighlight}</span>
                {statConfig.mainDescription.split(statConfig.mainDescriptionHighlight)[1] ?? ''}
              </p>
            </div>

            {/* Stats Grid - Right Side */}
            <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
              {(statConfig.stats.length ? statConfig.stats : FALLBACK.stats).map((stat, index) => {
                const counterKey = ['userSat', 'toolAdopt', 'activeUsers', 'premium'][index] as keyof typeof counters;
                return (
              <div key={stat.label}>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-sm font-semibold text-gray-700">{stat.label}</h3>
                  <div className={`flex items-center gap-1 ${stat.deltaColor} text-sm font-bold`}>
                    <i className={stat.deltaIcon ?? 'ri-arrow-up-circle-fill'}></i>
                    <span>{stat.delta}</span>
                  </div>
                </div>
                <div className={`h-1 ${stat.barBg} rounded-full mb-4`}>
                  <div
                    className={`h-full ${stat.barColor} rounded-full transition-all duration-2000 ease-out`}
                    style={{ width: `${isVisible ? counters[counterKey] : 0}%` }}
                  ></div>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-brand-dark">
                  {counters[counterKey]}%
                </div>
              </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
