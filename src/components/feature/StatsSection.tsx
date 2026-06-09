import { useState, useEffect, useRef, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi } from '../../lib/api';

interface StatRow { label: string; value: string }

// Parse "85%" → 85, "12K+" → 12000, "4.8★" → 4.8
function parseStatNumber(s: string): number {
  if (!s) return 0;
  const cleaned = s.replace(/[%★+,]/g, '').trim();
  if (cleaned.toLowerCase().endsWith('k')) return parseFloat(cleaned) * 1000;
  if (cleaned.toLowerCase().endsWith('m')) return parseFloat(cleaned) * 1_000_000;
  return parseFloat(cleaned) || 0;
}

function formatStatNumber(n: number, original: string): string {
  // Match the original format (% / K / +)
  if (!original) return String(Math.floor(n));
  if (original.includes('%')) return `${Math.floor(n)}%`;
  if (original.toLowerCase().includes('k')) return `${(n / 1000).toFixed(0)}K${original.includes('+') ? '+' : ''}`;
  if (original.includes('★')) return `${n.toFixed(1)}★`;
  return `${Math.floor(n)}${original.includes('+') ? '+' : ''}`;
}

interface StatsSectionProps {
  page?: string;
  sectionKey?: string;
}

export default function StatsSection({ page = 'home', sectionKey }: StatsSectionProps) {
  const resolvedSection = sectionKey ?? (page === 'tools' ? 'stats' : 'measurable');
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { data: section } = useQuery({
    queryKey: ['page-section', page, resolvedSection],
    queryFn: () => siteContentApi.section(page, resolvedSection),
  });

  const { data: stats = [] } = useQuery({
    queryKey: ['stats', page],
    queryFn: () => siteContentApi.stats(page),
  });

  // Compute target numbers from DB stats (top 5)
  const targets = useMemo(
    () => (stats as StatRow[]).slice(0, 5).map(s => parseStatNumber(s.value)),
    [stats]
  );

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !isVisible) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, [isVisible]);

  // Animate counters
  useEffect(() => {
    if (!isVisible || targets.length === 0) return;
    const duration = 2000;
    const steps = 60;
    let currentStep = 0;
    setCounters(targets.map(() => 0));
    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(currentStep / steps, 1);
      setCounters(targets.map(t => t * progress));
      if (currentStep >= steps) {
        setCounters(targets);
        clearInterval(timer);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, targets]);

  const title = section?.title ?? 'Measurable';
  const statsData = stats as StatRow[];

  if (statsData.length === 0) return null;

  const [main, userSat, toolAdopt, activeUsers, premium] = [
    counters[0] ?? 0, counters[1] ?? 0, counters[2] ?? 0, counters[3] ?? 0, counters[4] ?? 0,
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2853] mb-12">{title}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main stat */}
            {statsData[0] && (
              <div className="md:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-sm font-semibold text-gray-700">{statsData[0].label}</h3>
                  <div className="flex items-center gap-1 text-[#f25a1a] text-sm font-bold">
                    <i className="ri-arrow-up-circle-fill" /><span>+45%</span>
                  </div>
                </div>
                <div className="h-1 bg-[#f25a1a]/10 rounded-full mb-6">
                  <div className="h-full bg-[#f25a1a] rounded-full transition-all duration-1000"
                       style={{ width: `${isVisible ? 75 : 0}%` }} />
                </div>
                <div className="text-6xl md:text-7xl font-bold text-[#1F2853] mb-4">
                  {formatStatNumber(main, statsData[0].value)}
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {section?.description ?? 'Regular updates and new tools — the best way to grow your platform success rate.'}
                </p>
              </div>
            )}

            {/* 4-stat grid */}
            <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
              {statsData.slice(1, 5).map((stat, i) => {
                const value = [userSat, toolAdopt, activeUsers, premium][i];
                const colors = ['#c6f135', '#22c55e', '#3b82f6', '#8b5cf6'];
                return (
                  <div key={stat.label}>
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-sm font-semibold text-gray-700">{stat.label}</h3>
                    </div>
                    <div className="h-1 rounded-full mb-4" style={{ background: `${colors[i]}1A` }}>
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${isVisible ? Math.min(parseStatNumber(stat.value), 100) : 0}%`, background: colors[i] }}
                      />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-[#1F2853]">
                      {formatStatNumber(value, stat.value)}
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
