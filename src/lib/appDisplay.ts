import type { App } from './api';

export function formatReviewCount(count?: number): string {
  if (!count || count <= 0) return '0 reviews';
  if (count >= 1000) {
    const k = count / 1000;
    const text = k >= 10 ? Math.round(k).toString() : k.toFixed(1).replace(/\.0$/, '');
    return `${text}K reviews`;
  }
  return `${count} reviews`;
}

export function formatTimeAgo(iso?: string): string {
  if (!iso) return '';
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days < 1) return 'Today';
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (days < 30) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export function appActivityDate(app: App): string | undefined {
  return app.updated_at ?? app.published_at ?? app.created_at;
}

export function appToListicleCard(app: App) {
  return {
    id: app.id,
    slug: app.slug,
    name: app.name,
    tagline: app.tagline ?? '',
    rating: app.rating ?? 0,
    reviews: formatReviewCount(app.review_count),
    tags: app.tags ?? [],
    logo: app.logo_url ?? '',
    badges: app.badges ?? [],
    downloads: {
      ios: app.downloads_ios || app.website_url || '#',
      android: app.downloads_android || app.website_url || '#',
    },
    pros: app.pros ?? [],
    cons: app.cons ?? [],
  };
}

export function buildRecentLaunchesIntro(apps: App[]): string {
  if (apps.length === 0) return '';
  const highlighted = apps
    .slice(0, 3)
    .map(a => `<span class="text-[#CA8A04] font-bold">${a.name}</span>`)
    .join(', ');
  return `Recently added and updated on TWAP: ${highlighted}. Explore full reviews in our directory.`;
}
