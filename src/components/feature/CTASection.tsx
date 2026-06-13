import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Button from '../base/Button';
import { siteContentApi } from '../../lib/api';

interface Props {
  page?: string;
  section?: string;
}

const FALLBACK = {
  title: 'Ready to Showcase Your AI Tool?',
  description: 'Get your AI application featured in our directory and reach thousands of potential users',
  cta1: 'Submit Your App',
  cta1_url: '/promote',
  cta2: 'Learn More',
  cta2_url: '/services',
  features: '✓ Free listing for qualifying apps  ✓ Detailed analytics  ✓ User feedback system',
};

export default function CTASection({ page = 'global', section = 'cta' }: Props) {
  const { data } = useQuery({
    queryKey: ['page-section', page, section],
    queryFn: () => siteContentApi.section(page, section),
  });

  const content = (data?.content ?? {}) as Record<string, string>;

  const title = data?.title ?? FALLBACK.title;
  const description = data?.description ?? FALLBACK.description;
  const cta1 = data?.cta_text ?? FALLBACK.cta1;
  const cta1Url = data?.cta_url ?? FALLBACK.cta1_url;
  const cta2 = data?.cta_text_2 ?? FALLBACK.cta2;
  const cta2Url = data?.cta_url_2 ?? FALLBACK.cta2_url;
  const features = content.features_line ?? FALLBACK.features;

  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-16">
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
              {cta1}
            </Button>
          </Link>
          <Link to={cta2Url}>
            <Button variant="primary" size="lg" className="bg-blue-600 hover:bg-blue-700">
              {cta2}
            </Button>
          </Link>
        </div>

        {features && (
          <div className="mt-8 text-orange-100">
            <p className="text-sm">
              {features}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
