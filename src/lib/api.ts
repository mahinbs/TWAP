/**
 * All typed query functions for the TWAP frontend.
 * Uses the Supabase JS client directly — RLS policies ensure only
 * published/active content is returned to the public.
 */
import { supabase } from './supabase';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface App {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  description?: string;
  why_you_love_it?: string;
  category?: string;
  rating?: number;
  review_count?: number;
  pricing?: string;
  price_detail?: string;
  logo_url?: string;
  website_url?: string;
  downloads_ios?: string;
  downloads_android?: string;
  pros?: string[];
  cons?: string[];
  badges?: { icon: string; tooltip: string; color: string }[];
  tags?: string[];
  table_of_content?: string[];
  recent_topics?: string[];
  featured?: boolean;
  editors_choice?: boolean;
  status?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  hero_image_url?: string;
  subheading?: string;
  intro_paragraph?: string;
  what_you_learn?: { title: string; description: string }[];
  conclusion?: string;
  body_content?: string;
  category?: string;
  resource_tab?: string;
  tags?: string[];
  published_date?: string;
  read_time_minutes?: number;
  views?: number;
  author?: { id: string; name: string; avatar_url?: string; bio?: string };
}

export interface Agency {
  id: string;
  name: string;
  slug: string;
  category?: string;
  description?: string;
  tagline?: string;
  website_url?: string;
  avatar_url?: string;
  cover_url?: string;
  rating?: number;
  review_count?: number;
  years_experience?: number;
  response_time?: string;
  project_completion_rate?: number;
  flagship_service?: { title: string; description: string; icon?: string };
  focus_areas?: { label: string; pc: number; tool?: string; color?: string }[];
  service_lines?: { label: string; pc: number; color?: string }[];
  verified?: boolean;
  featured?: boolean;
}

export interface PageSection {
  id: string;
  page: string;
  section: string;
  label?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  badge_text?: string;
  media_url?: string;
  media_url_2?: string;
  cta_text?: string;
  cta_url?: string;
  cta_text_2?: string;
  cta_url_2?: string;
  content?: Record<string, unknown>;
  active?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  avatar_url?: string;
  quote: string;
  rating?: number;
}

export interface SiteStat {
  id: string;
  page: string;
  label: string;
  value: string;
  icon?: string;
}

export interface NavItem {
  id: string;
  label: string;
  url: string;
  icon?: string;
  location: string;
  sort_order: number;
  open_in_new?: boolean;
}

export interface FounderStory {
  id: string;
  slug?: string;
  name: string;
  title?: string;
  company?: string;
  product_name?: string;
  question?: string;
  answer?: string;
  bio?: string;
  avatar_url?: string;
  video_thumbnail_url?: string;
  audio_url?: string;
  video_url?: string;
  youtube_id?: string;
  transcript?: string;
  duration_seconds?: number;
  card_gradient?: string;
  is_prime_feature?: boolean;
}

export interface ExpertReview {
  id: string;
  slug?: string;
  name: string;
  role?: string;
  topic?: string;
  quote: string;
  full_review?: string;
  avatar_url?: string;
  badge_text?: string;
}

export interface Author {
  id: string;
  slug?: string;
  name: string;
  bio?: string;
  avatar_url?: string;
}

export interface GlobalSettings {
  site_name?: string;
  logo_url?: string;
  site_description?: string;
  default_og_image_url?: string;
  twitter_handle?: string;
  facebook_url?: string;
  linkedin_url?: string;
}

export interface PageSeoRecord {
  path: string;
  label?: string;
  meta_title?: string;
  meta_description?: string;
  og_image_url?: string;
  noindex?: boolean;
}

export interface EverythingAiItem {
  id: string;
  section: 'tools' | 'directories' | 'experts' | 'videos' | 'insights';
  title: string;
  subtitle?: string;
  description?: string;
  image_url?: string;
  logo_url?: string;
  icon?: string;
  rating?: number;
  category?: string;
  tags?: string[];
  link_url?: string;
  youtube_id?: string;
  overlay_text?: string;
  read_time?: string;
  agency_count?: string;
  sort_order?: number;
  active?: boolean;
  extras?: Record<string, unknown>;
}

// ─── Apps ────────────────────────────────────────────────────────────────────

export const appsApi = {
  /** List published apps with optional filters */
  list: async (opts?: {
    category?: string;
    pricing?: string;
    featured?: boolean;
    search?: string;
    sort?: 'rating' | 'review_count' | 'name';
    limit?: number;
  }): Promise<App[]> => {
    let q = supabase
      .from('apps')
      .select('id,name,slug,tagline,category,rating,review_count,pricing,featured,editors_choice,logo_url,tags,website_url,badges,downloads_ios,downloads_android')
      .eq('status', 'published');

    if (opts?.category) q = q.eq('category', opts.category);
    if (opts?.pricing)  q = q.eq('pricing', opts.pricing);
    if (opts?.featured) q = q.eq('featured', true);
    if (opts?.search)   q = q.or(`name.ilike.%${opts.search}%,description.ilike.%${opts.search}%,tagline.ilike.%${opts.search}%`);

    if (opts?.sort === 'review_count') q = q.order('review_count', { ascending: false });
    else if (opts?.sort === 'name')    q = q.order('name');
    else                               q = q.order('rating', { ascending: false });

    if (opts?.limit) q = q.limit(opts.limit);

    const { data, error } = await q;
    if (error) throw error;
    return (data ?? []) as App[];
  },

  /** Get a single app by slug */
  bySlug: async (slug: string): Promise<App | null> => {
    const { data, error } = await supabase
      .from('apps')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();
    if (error) return null;
    return data as App;
  },

  /** Get featured apps */
  featured: (limit = 8) =>
    appsApi.list({ featured: true, sort: 'rating', limit }),

  /** Get top-rated apps */
  topRated: (limit = 12) =>
    appsApi.list({ sort: 'rating', limit }),

  /** Get apps by category */
  byCategory: (category: string, limit = 20) =>
    appsApi.list({ category, sort: 'rating', limit }),
};

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export const blogsApi = {
  list: async (opts?: {
    category?: string;
    resourceTab?: string;
    tag?: string;
    search?: string;
    limit?: number;
    offset?: number;
    featured?: boolean;
  }): Promise<BlogPost[]> => {
    let q = supabase
      .from('blog_posts')
      .select(`
        id, slug, title, excerpt, hero_image_url, category, resource_tab, tags,
        published_date, read_time_minutes, views,
        authors!author_id(id, name, avatar_url)
      `)
      .eq('status', 'published')
      .order('published_date', { ascending: false });

    if (opts?.category) q = q.eq('category', opts.category);
    if (opts?.resourceTab) q = q.eq('resource_tab', opts.resourceTab);
    if (opts?.tag)      q = q.contains('tags', [opts.tag]);
    if (opts?.search)   q = q.or(`title.ilike.%${opts.search}%,excerpt.ilike.%${opts.search}%`);
    if (opts?.featured) q = q.eq('featured', true);
    if (opts?.limit)    q = q.limit(opts.limit);
    if (opts?.offset)   q = q.range(opts.offset, (opts.offset ?? 0) + (opts.limit ?? 20) - 1);

    const { data, error } = await q;
    if (error) {
      // Fallback when authors join fails — re-run without embed
      let q2 = supabase
        .from('blog_posts')
        .select('id, slug, title, excerpt, hero_image_url, category, resource_tab, tags, published_date, read_time_minutes, views, author_id')
        .eq('status', 'published')
        .order('published_date', { ascending: false });
      if (opts?.category) q2 = q2.eq('category', opts.category);
      if (opts?.resourceTab) q2 = q2.eq('resource_tab', opts.resourceTab);
      if (opts?.featured) q2 = q2.eq('featured', true);
      if (opts?.tag)      q2 = q2.contains('tags', [opts.tag]);
      if (opts?.search)   q2 = q2.or(`title.ilike.%${opts.search}%,excerpt.ilike.%${opts.search}%`);
      if (opts?.limit)    q2 = q2.limit(opts.limit);
      if (opts?.offset)   q2 = q2.range(opts.offset, (opts.offset ?? 0) + (opts.limit ?? 20) - 1);
      const fb = await q2;
      if (fb.error) return [];
      return (fb.data ?? []).map((post: any) => ({ ...post, author: null })) as BlogPost[];
    }
    return (data ?? []).map((post: any) => ({ ...post, author: post.authors })) as BlogPost[];
  },

  bySlug: async (slug: string): Promise<BlogPost | null> => {
    const withJoin = await supabase
      .from('blog_posts')
      .select('*, authors!author_id(id, name, avatar_url, bio)')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();
    if (!withJoin.error && withJoin.data) {
      return { ...withJoin.data, author: withJoin.data.authors } as BlogPost;
    }
    // Schema cache missing FK → fetch without the embed
    const plain = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();
    if (plain.error || !plain.data) return null;
    return { ...plain.data, author: undefined } as BlogPost;
  },

  recent: (limit = 6) => blogsApi.list({ limit }),

  byResourceTab: (tab: string, opts?: { search?: string; limit?: number }) =>
    blogsApi.list({ resourceTab: tab, search: opts?.search, limit: opts?.limit ?? 50 }),
};

// ─── Resource Centre Page ─────────────────────────────────────────────────────

export interface ResourceCentreItem {
  id: string;
  section: 'tabs' | 'featured' | 'mid_banner';
  title: string;
  subtitle?: string;
  description?: string;
  image_url?: string;
  link_url?: string;
  sort_order?: number;
  active?: boolean;
  extras?: Record<string, unknown>;
}

export const resourceCentreApi = {
  items: async (section?: ResourceCentreItem['section']): Promise<ResourceCentreItem[]> => {
    let q = supabase
      .from('resource_centre_items')
      .select('*')
      .eq('active', true)
      .order('sort_order');
    if (section) q = q.eq('section', section);
    const { data, error } = await q;
    if (error) return [];
    return (data ?? []) as ResourceCentreItem[];
  },
};

// ─── Agencies ────────────────────────────────────────────────────────────────

export const agenciesApi = {
  list: async (opts?: {
    category?: string;
    featured?: boolean;
    verified?: boolean;
    search?: string;
    limit?: number;
  }): Promise<Agency[]> => {
    let q = supabase
      .from('agencies')
      .select('id,name,slug,category,tagline,rating,review_count,years_experience,avatar_url,cover_url,verified,featured,website_url,flagship_service')
      .eq('status', 'published')
      .order('rating', { ascending: false });

    if (opts?.category) q = q.eq('category', opts.category);
    if (opts?.featured) q = q.eq('featured', true);
    if (opts?.verified) q = q.eq('verified', true);
    if (opts?.search)   q = q.or(`name.ilike.%${opts.search}%,description.ilike.%${opts.search}%`);
    if (opts?.limit)    q = q.limit(opts.limit);

    const { data, error } = await q;
    if (error) throw error;
    return (data ?? []) as Agency[];
  },

  bySlug: async (slug: string) => {
    const { data: agency, error } = await supabase
      .from('agencies')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();
    if (error || !agency) return null;

    const [portfolio, reviews, clients] = await Promise.all([
      supabase.from('agency_portfolio_items').select('*').eq('agency_id', agency.id).order('sort_order'),
      supabase.from('agency_reviews').select('*').eq('agency_id', agency.id).eq('approved', true).order('likes', { ascending: false }),
      supabase.from('agency_clients').select('*').eq('agency_id', agency.id).order('sort_order'),
    ]);

    return {
      ...agency,
      portfolio: portfolio.data ?? [],
      reviews: reviews.data ?? [],
      clients: clients.data ?? [],
    };
  },

  featured: (limit = 6) => agenciesApi.list({ featured: true, limit }),
};

// ─── Agencies Page CMS items ──────────────────────────────────────────────────

export interface AgenciesPageItem {
  id: string;
  section: 'collaborations' | 'industries' | 'insights' | 'clients';
  title: string;
  subtitle?: string;
  description?: string;
  image_url?: string;
  link_url?: string;
  sort_order?: number;
  active?: boolean;
  extras?: Record<string, unknown>;
}

// ─── Success Stories Page ─────────────────────────────────────────────────────

export interface SuccessStoriesItem {
  id: string;
  section: 'hero_cards' | 'stories' | 'features' | 'interviews' | 'topics' | 'notes';
  title: string;
  subtitle?: string;
  description?: string;
  image_url?: string;
  link_url?: string;
  slug?: string;
  audio_url?: string;
  video_url?: string;
  youtube_id?: string;
  transcript?: string;
  duration_seconds?: number;
  guest_title?: string;
  guest_company?: string;
  guest_bio?: string;
  sort_order?: number;
  active?: boolean;
  extras?: Record<string, unknown>;
}

export const successStoriesApi = {
  items: async (section?: SuccessStoriesItem['section']): Promise<SuccessStoriesItem[]> => {
    let q = supabase
      .from('success_stories_items')
      .select('*')
      .eq('active', true)
      .order('sort_order');
    if (section) q = q.eq('section', section);
    const { data, error } = await q;
    if (error) return [];
    return (data ?? []) as SuccessStoriesItem[];
  },

  interviewBySlug: async (slug: string): Promise<SuccessStoriesItem | null> => {
    const { data, error } = await supabase
      .from('success_stories_items')
      .select('*')
      .eq('section', 'interviews')
      .eq('slug', slug)
      .eq('active', true)
      .single();
    if (error) return null;
    return data as SuccessStoriesItem;
  },
};

export const founderStoriesApi = {
  list: async (): Promise<FounderStory[]> => {
    const { data, error } = await supabase
      .from('founder_stories')
      .select('*')
      .eq('active', true)
      .order('sort_order');
    if (error) return [];
    return (data ?? []) as FounderStory[];
  },

  bySlug: async (slug: string): Promise<FounderStory | null> => {
    const { data, error } = await supabase
      .from('founder_stories')
      .select('*')
      .eq('slug', slug)
      .eq('active', true)
      .single();
    if (error) return null;
    return data as FounderStory;
  },
};

export const expertReviewsApi = {
  list: async (): Promise<ExpertReview[]> => {
    const { data, error } = await supabase
      .from('expert_reviews')
      .select('*')
      .eq('active', true)
      .order('sort_order');
    if (error) return [];
    return (data ?? []) as ExpertReview[];
  },

  bySlug: async (slug: string): Promise<ExpertReview | null> => {
    const { data, error } = await supabase
      .from('expert_reviews')
      .select('*')
      .eq('slug', slug)
      .eq('active', true)
      .single();
    if (error) return null;
    return data as ExpertReview;
  },
};

// ─── Promote Pages ────────────────────────────────────────────────────────────

export interface PromoteCategory {
  id: string;
  slug: string;
  title: string;
  description?: string;
  icon?: string;
  accent?: string;
  accent_soft?: string;
  top_bar_bg?: string;
  badge_text?: string;
  hero_title?: string;
  hero_description?: string;
  viewing_label?: string;
  tags?: string[];
  card_accent_soft_bg?: string;
  card_accent_soft_border?: string;
  hero_image_url?: string;
  viewing_prefix?: string;
  switch_category_text?: string;
  hero_primary_cta_text?: string;
  hero_primary_cta_url?: string;
  hero_secondary_cta_text?: string;
  hero_secondary_cta_url?: string;
  sort_order?: number;
  active?: boolean;
}

export interface PromoteItem {
  id: string;
  category_slug: string;
  section: string;
  title: string;
  subtitle?: string;
  description?: string;
  image_url?: string;
  link_url?: string;
  sort_order?: number;
  active?: boolean;
  extras?: Record<string, unknown>;
}

export const promoteApi = {
  categories: async (): Promise<PromoteCategory[]> => {
    const { data, error } = await supabase
      .from('promote_categories')
      .select('*')
      .eq('active', true)
      .order('sort_order');
    if (error) return [];
    return (data ?? []) as PromoteCategory[];
  },
  category: async (slug: string): Promise<PromoteCategory | null> => {
    const { data, error } = await supabase
      .from('promote_categories')
      .select('*')
      .eq('slug', slug)
      .eq('active', true)
      .single();
    if (error) return null;
    return data as PromoteCategory;
  },
  items: async (categorySlug: string, section?: string): Promise<PromoteItem[]> => {
    let q = supabase
      .from('promote_items')
      .select('*')
      .eq('category_slug', categorySlug)
      .eq('active', true)
      .order('sort_order');
    if (section) q = q.eq('section', section);
    const { data, error } = await q;
    if (error) return [];
    return (data ?? []) as PromoteItem[];
  },
  pageKey: (slug: string) => `promote_${slug}`,
};

export const agenciesPageApi = {
  items: async (section?: AgenciesPageItem['section']): Promise<AgenciesPageItem[]> => {
    let q = supabase
      .from('agencies_items')
      .select('*')
      .eq('active', true)
      .order('sort_order');
    if (section) q = q.eq('section', section);
    const { data, error } = await q;
    if (error) return [];
    return (data ?? []) as AgenciesPageItem[];
  },
};

// ─── Site Content ─────────────────────────────────────────────────────────────

export const siteContentApi = {
  /** Get all active sections for a page */
  sections: async (page: string): Promise<PageSection[]> => {
    const { data, error } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page', page)
      .eq('active', true)
      .order('sort_order');
    if (error) return [];
    return (data ?? []) as PageSection[];
  },

  /** Get a single section by page+section key */
  section: async (page: string, section: string): Promise<PageSection | null> => {
    const { data, error } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page', page)
      .eq('section', section)
      .eq('active', true)
      .single();
    if (error) return null;
    return data as PageSection;
  },

  testimonials: async (): Promise<Testimonial[]> => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('active', true)
      .order('sort_order');
    if (error) return [];
    return (data ?? []) as Testimonial[];
  },

  stats: async (page: string): Promise<SiteStat[]> => {
    const { data, error } = await supabase
      .from('site_stats')
      .select('*')
      .eq('page', page)
      .eq('active', true)
      .order('sort_order');
    if (error) return [];
    return (data ?? []) as SiteStat[];
  },

  expertReviews: async () => {
    const { data, error } = await supabase
      .from('expert_reviews')
      .select('*')
      .eq('active', true)
      .order('sort_order');
    if (error) return [];
    return data ?? [];
  },

  navigation: async (location?: string): Promise<NavItem[]> => {
    let q = supabase
      .from('navigation_items')
      .select('*')
      .eq('active', true)
      .order('sort_order');
    if (location) q = q.eq('location', location);
    const { data, error } = await q;
    if (error) return [];
    return (data ?? []) as NavItem[];
  },

  founderStories: async (): Promise<FounderStory[]> => {
    const { data, error } = await supabase
      .from('founder_stories')
      .select('*')
      .eq('active', true)
      .order('sort_order');
    if (error) return [];
    return (data ?? []) as FounderStory[];
  },
};

// ─── Everything AI ────────────────────────────────────────────────────────────

export const everythingAiApi = {
  items: async (section?: EverythingAiItem['section']): Promise<EverythingAiItem[]> => {
    let q = supabase
      .from('everything_ai_items')
      .select('*')
      .eq('active', true)
      .order('sort_order');
    if (section) q = q.eq('section', section);
    const { data, error } = await q;
    if (error) return [];
    return (data ?? []) as EverythingAiItem[];
  },
};

// ─── Services Page ────────────────────────────────────────────────────────────

export interface ServicesItem {
  id: string;
  section: 'bento' | 'benefits' | 'tailored';
  title: string;
  subtitle?: string;
  description?: string;
  image_url?: string;
  icon?: string;
  badge_text?: string;
  link_url?: string;
  sort_order?: number;
  active?: boolean;
  extras?: Record<string, unknown>;
}

export const servicesApi = {
  items: async (section?: ServicesItem['section']): Promise<ServicesItem[]> => {
    let q = supabase
      .from('services_items')
      .select('*')
      .eq('active', true)
      .order('sort_order');
    if (section) q = q.eq('section', section);
    const { data, error } = await q;
    if (error) return [];
    return (data ?? []) as ServicesItem[];
  },
};

// ─── Methodology Page ─────────────────────────────────────────────────────────

export interface MethodologyItem {
  id: string;
  section: 'hero_pillars' | 'ranking' | 'process' | 'sources' | 'review' | 'rating' | 'standards' | 'editors';
  title: string;
  subtitle?: string;
  description?: string;
  image_url?: string;
  media_url?: string;
  icon?: string;
  sort_order?: number;
  active?: boolean;
  extras?: Record<string, unknown>;
}

export const methodologyApi = {
  items: async (section?: MethodologyItem['section']): Promise<MethodologyItem[]> => {
    let q = supabase
      .from('methodology_items')
      .select('*')
      .eq('active', true)
      .order('sort_order');
    if (section) q = q.eq('section', section);
    const { data, error } = await q;
    if (error) return [];
    return (data ?? []) as MethodologyItem[];
  },
};

// ─── Tools Page ───────────────────────────────────────────────────────────────

export interface ToolsItem {
  id: string;
  section: 'highlights' | 'filters' | 'pills' | 'platforms' | 'grid' | 'reviews' | 'cta_avatars';
  title: string;
  subtitle?: string;
  description?: string;
  image_url?: string;
  icon?: string;
  link_url?: string;
  slug?: string;
  sort_order?: number;
  active?: boolean;
  extras?: Record<string, unknown>;
}

export const toolsApi = {
  items: async (section?: ToolsItem['section']): Promise<ToolsItem[]> => {
    let q = supabase
      .from('tools_items')
      .select('*')
      .eq('active', true)
      .order('sort_order');
    if (section) q = q.eq('section', section);
    const { data, error } = await q;
    if (error) return [];
    return (data ?? []) as ToolsItem[];
  },

  bySlug: async (slug: string): Promise<ToolsItem | null> => {
    const { data, error } = await supabase
      .from('tools_items')
      .select('*')
      .eq('section', 'grid')
      .eq('slug', slug)
      .eq('active', true)
      .single();
    if (error) return null;
    return data as ToolsItem;
  },
};

export const settingsApi = {
  get: async (): Promise<GlobalSettings | null> => {
    const { data, error } = await supabase
      .from('global_settings')
      .select('site_name, logo_url, site_description, default_og_image_url, twitter_handle, facebook_url, linkedin_url')
      .eq('id', 1)
      .single();
    if (error) return null;
    return data as GlobalSettings;
  },
};

export const seoApi = {
  forPath: async (path: string): Promise<PageSeoRecord | null> => {
    const { data, error } = await supabase
      .from('page_seo')
      .select('*')
      .eq('path', path)
      .maybeSingle();
    if (error) return null;
    return data as PageSeoRecord | null;
  },
};

// ─── Categories ───────────────────────────────────────────────────────────────

export const categoriesApi = {
  list: async (contentType?: string) => {
    let q = supabase.from('categories').select('id,name,slug,content_type,description').order('name');
    if (contentType) q = q.or(`content_type.eq.${contentType},content_type.eq.all`);
    const { data } = await q;
    return data ?? [];
  },

  bySlug: async (slug: string) => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();
    if (error) return null;
    return data;
  },
};

export const authorsApi = {
  bySlug: async (slug: string): Promise<Author | null> => {
    const { data, error } = await supabase
      .from('authors')
      .select('*')
      .eq('slug', slug)
      .single();
    if (error) return null;
    return data as Author;
  },

  posts: async (authorId: string): Promise<BlogPost[]> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        id, slug, title, excerpt, hero_image_url, category, published_date, read_time_minutes,
        authors!author_id(id, name, avatar_url)
      `)
      .eq('author_id', authorId)
      .eq('status', 'published')
      .order('published_date', { ascending: false });
    if (error) return [];
    return (data ?? []).map((post: Record<string, unknown>) => ({
      ...post,
      author: post.authors,
    })) as BlogPost[];
  },
};

export const searchApi = {
  config: async () => {
    const { data } = await supabase
      .from('global_settings')
      .select('search_config')
      .eq('id', 1)
      .single();
    const cfg = (data?.search_config ?? {}) as Record<string, unknown>;
    return {
      minQueryLength: Number(cfg.min_query_length ?? 2),
      enabledSources: (cfg.enabled_sources as string[]) ?? ['apps', 'blogs', 'agencies'],
      resultsPerSource: Number(cfg.results_per_source ?? 12),
      placeholder: String(cfg.placeholder ?? 'Search apps, blogs, agencies…'),
    };
  },

  query: async (q: string, opts?: { limit?: number }) => {
    const term = q.trim();
    const cfg = await searchApi.config();
    if (term.length < cfg.minQueryLength) return { apps: [], blogs: [], agencies: [] as Agency[] };
    const limit = opts?.limit ?? cfg.resultsPerSource;
    const tasks: Promise<unknown>[] = [];
    const keys: ('apps' | 'blogs' | 'agencies')[] = [];
    if (cfg.enabledSources.includes('apps')) {
      keys.push('apps');
      tasks.push(appsApi.list({ search: term, limit }));
    }
    if (cfg.enabledSources.includes('blogs')) {
      keys.push('blogs');
      tasks.push(blogsApi.list({ search: term, limit }));
    }
    if (cfg.enabledSources.includes('agencies')) {
      keys.push('agencies');
      tasks.push(agenciesApi.list({ search: term, limit }));
    }
    const results = await Promise.all(tasks);
    const out: { apps: App[]; blogs: BlogPost[]; agencies: Agency[] } = { apps: [], blogs: [], agencies: [] };
    keys.forEach((k, i) => { out[k] = results[i] as App[] & BlogPost[] & Agency[]; });
    return out;
  },
};
