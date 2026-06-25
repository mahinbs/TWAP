import { siteContentApi } from './api';

export const LISTICLE_PAGE = 'top-10-project-management-software-2026';

export interface ListicleSpot {
  rank: number;
  app_id: string;
}

export async function fetchListicleSpots(): Promise<ListicleSpot[]> {
  const section = await siteContentApi.section(LISTICLE_PAGE, 'apps');
  const raw = section?.content?.listicle_spots;
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((s): s is ListicleSpot => Boolean(s?.app_id))
    .map(s => ({ rank: Number(s.rank), app_id: String(s.app_id) }))
    .sort((a, b) => a.rank - b.rank);
}
