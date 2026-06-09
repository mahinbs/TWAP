import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Button from '../base/Button';
import { siteContentApi } from '../../lib/api';

interface Props {
  page?: string;
  section?: string;
}

export default function CTASection({ page = 'global', section = 'cta' }: Props) {
  const { data: data } = useQuery({
    queryKey: ['page-section', page, section],
    queryFn: () => siteContentApi.section(page, section),
  });

  if (!data) return null;
  const content = (data.content ?? {}) as Record<string, string>;

  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{data.title}</h2>
        {data.description && (
          <p className="text-xl text-orange-100 mb-8">{data.description}</p>
        )}

        {(data.cta_text || data.cta_text_2) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {data.cta_text && (
              <Link to={data.cta_url ?? '#'}>
                <Button variant="outline" size="lg" className="bg-white text-orange-600 border-white hover:bg-orange-50">
                  {data.cta_text}
                </Button>
              </Link>
            )}
            {data.cta_text_2 && (
              <Link to={data.cta_url_2 ?? '#'}>
                <Button variant="primary" size="lg" className="bg-blue-600 hover:bg-blue-700">
                  {data.cta_text_2}
                </Button>
              </Link>
            )}
          </div>
        )}

        {content.features_line && (
          <div className="mt-8 text-orange-100">
            <p className="text-sm">{content.features_line}</p>
          </div>
        )}
      </div>
    </div>
  );
}
