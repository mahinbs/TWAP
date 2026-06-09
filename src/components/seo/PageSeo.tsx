import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { seoApi, settingsApi } from '../../lib/api';
import { useSeoOverride } from './SeoContext';

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(href: string) {
  if (!href) return;
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

export interface PageSeoOverride {
  title?: string;
  description?: string;
  image?: string;
  noindex?: boolean;
}

export default function PageSeo() {
  const { pathname } = useLocation();
  const { override: ctxOverride } = useSeoOverride();
  const override = ctxOverride;

  const { data: settings } = useQuery({
    queryKey: ['global-settings-seo'],
    queryFn: settingsApi.get,
  });

  const { data: pageSeo } = useQuery({
    queryKey: ['page-seo', pathname],
    queryFn: () => seoApi.forPath(pathname),
  });

  useEffect(() => {
    const siteName = settings?.site_name ?? 'The Web App Pro';
    const title = override?.title ?? pageSeo?.meta_title ?? siteName;
    const description = override?.description ?? pageSeo?.meta_description ?? settings?.site_description ?? '';
    const image = override?.image ?? pageSeo?.og_image_url ?? settings?.default_og_image_url ?? '';
    const noindex = override?.noindex ?? pageSeo?.noindex ?? false;
    const siteUrl = (import.meta.env.VITE_SITE_URL as string) || window.location.origin;
    const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

    document.title = fullTitle;
    setMeta('description', description);
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('og:url', `${siteUrl}${pathname}`, 'property');
    if (image) setMeta('og:image', image, 'property');
    setMeta('twitter:card', image ? 'summary_large_image' : 'summary');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    if (settings?.twitter_handle) setMeta('twitter:site', `@${settings.twitter_handle.replace('@', '')}`);
    setCanonical(`${siteUrl}${pathname}`);
  }, [pathname, pageSeo, settings, override]);

  return null;
}
