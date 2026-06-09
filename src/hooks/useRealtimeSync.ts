import { useEffect } from 'react';
import type { QueryClient } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

/** First segment of React Query keys to invalidate per table */
const TABLE_QUERY_KEYS: Record<string, readonly string[]> = {
  page_sections: ['page-section'],
  navigation_items: ['navigation'],
  founder_stories: ['founder-stories'],
  site_stats: ['stats'],
  testimonials: ['testimonials'],
  expert_reviews: ['expert-reviews'],
  promote_categories: ['promote-categories', 'promote-category'],
  promote_items: ['promote-items'],
  success_stories_items: ['success-stories-items'],
  agencies_items: ['agencies-items'],
  resource_centre_items: ['resource-centre-items'],
  tools_items: ['tools-items'],
  methodology_items: ['methodology-items'],
  services_items: ['services-items'],
  everything_ai_items: ['everything-ai-items'],
  page_seo: ['page-seo', 'global-settings-seo'],
  global_settings: ['global-settings', 'global-settings-seo'],
  apps: ['apps', 'app'],
  blog_posts: ['blogs', 'blog'],
  agencies: ['agencies', 'agency'],
  categories: ['categories'],
  authors: ['authors'],
};

const CMS_TABLES = Object.keys(TABLE_QUERY_KEYS);

function invalidateTable(qc: QueryClient, table: string) {
  const prefixes = TABLE_QUERY_KEYS[table];
  if (!prefixes) return;
  for (const prefix of prefixes) {
    void qc.invalidateQueries({ queryKey: [prefix] });
  }
}

export function useRealtimeSync() {
  const qc = useQueryClient();

  useEffect(() => {
    if (!import.meta.env.VITE_SUPABASE_URL) return;

    const channel = supabase.channel('twap-cms-realtime');

    for (const table of CMS_TABLES) {
      channel.on('postgres_changes', { event: '*', schema: 'public', table }, () => {
        invalidateTable(qc, table);
      });
    }

    channel.subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [qc]);
}
