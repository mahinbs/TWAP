
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { siteContentApi } from '../../lib/api';
import { sectionBgStyle } from '../../lib/sectionGradient';
import Button from '../base/Button';

const FALLBACK = {
  title: 'Ready to Showcase Your AI Tool?',
  description: 'Get your AI application featured in our directory and reach thousands of potential users',
  cta1: { text: 'Submit Your App', url: '/promote' },
  cta2: { text: 'Learn More', url: '/services' },
  features_line: '✓ Free listing for qualifying apps  ✓ Detailed analytics  ✓ User feedback system',
};

export default function CTASection() {
  const { data: section } = useQuery({
    queryKey: ['page-section', 'home', 'showcase_cta'],
    queryFn: () => siteContentApi.section('home', 'showcase_cta'),
  });

  const c = (section?.content ?? {}) as Record<string, string>;
  const title = section?.title ?? FALLBACK.title;
  const description = section?.description ?? FALLBACK.description;
  const cta1Text = section?.cta_text ?? FALLBACK.cta1.text;
  const cta1Url  = section?.cta_url  ?? FALLBACK.cta1.url;
  const cta2Text = section?.cta_text_2 ?? FALLBACK.cta2.text;
  const cta2Url  = section?.cta_url_2  ?? FALLBACK.cta2.url;
  const featuresLine = c.features_line ?? FALLBACK.features_line;

  return (
    <div className="py-16" style={sectionBgStyle(c, { defaultFrom: '#f97316', defaultTo: '#ea580c', direction: 'to right' })}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          {title}
        </h2>
        <p className="text-xl text-orange-100 mb-8">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={cta1Url}>
            <Button variant="outline" size="lg" className="bg-white text-orange-600 border-white hover:bg-orange-50">
              {cta1Text}
            </Button>
          </Link>
          <Link to={cta2Url}>
            <Button variant="primary" size="lg" className="bg-blue-600 hover:bg-blue-700">
              {cta2Text}
            </Button>
          </Link>
        </div>

        <div className="mt-8 text-orange-100">
          <p className="text-sm">
            {featuresLine}
          </p>
        </div>
      </div>
    </div>
  );
}
