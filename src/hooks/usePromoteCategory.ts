import { useQuery } from '@tanstack/react-query';
import { promoteApi, siteContentApi } from '../lib/api';
import type { PromoteCategoryTheme } from '../components/promote/PromoteCategoryHero';

export type PromoteCategorySlug = string;

const DEFAULT_PREVIEW_CARD = {
  icon: 'ri-smartphone-line',
  iconBg: '#efe9e4',
  iconColor: '#8b6b4a',
  name: 'Your App',
  meta: 'Category · Platforms',
  badge: '✓ TWAP Certified',
  badgeColor: '#ef4d0a',
};

function sectionContent(page: string, section: string) {
  return {
    queryKey: ['page-section', page, section] as const,
    queryFn: () => siteContentApi.section(page, section),
  };
}

function categoryItems(slug: string, section: string) {
  return {
    queryKey: ['promote-items', slug, section] as const,
    queryFn: () => promoteApi.items(slug, section),
  };
}

export function usePromoteLanding() {
  const { data: heroSection } = useQuery(sectionContent('promote', 'hero'));
  const { data: categories = [] } = useQuery({
    queryKey: ['promote-categories'],
    queryFn: promoteApi.categories,
  });

  const content = (heroSection?.content ?? {}) as Record<string, string>;

  // Cap at 6 categories on the landing page
  const MAX_PROMOTE_CARDS = 6;
  const cards = categories.slice(0, MAX_PROMOTE_CARDS).map(c => ({
    slug: c.slug,
    icon: c.icon ?? 'ri-star-line',
    accent: c.top_bar_bg ?? c.accent ?? '#ef4d0a',
    card_accent_soft_bg: c.card_accent_soft_bg ?? 'rgba(255,255,255,0.1)',
    card_accent_soft_border: c.card_accent_soft_border ?? 'rgba(255,255,255,0.2)',
    title: c.title,
    description: c.description ?? '',
    tags: (c.tags ?? []) as string[],
  }));

  return {
    eyebrow: heroSection?.subtitle ?? '',
    titleLine1: content.title_line1 ?? '',
    titleLine2: content.title_line2 ?? content.title_highlight ?? '',
    description: heroSection?.description ?? '',
    cards,
  };
}

export function usePromoteCategory(slug: string) {
  const page = promoteApi.pageKey(slug);

  const { data: category } = useQuery({
    queryKey: ['promote-category', slug],
    queryFn: () => promoteApi.category(slug),
  });

  const theme: PromoteCategoryTheme = {
    key: category?.slug ?? slug,
    viewingLabel: category?.viewing_label ?? '',
    viewingPrefix: category?.viewing_prefix ?? "You're viewing:",
    switchCategoryText: category?.switch_category_text ?? 'Switch Category',
    topBarBg: category?.top_bar_bg ?? '#ef4d0a',
    accent: category?.accent ?? '#ff6a3d',
    accentSoft: category?.accent_soft ?? 'rgba(255,106,61,0.14)',
    badgeText: category?.badge_text ?? '',
    title: category?.hero_title ?? '',
    description: category?.hero_description ?? '',
    heroImageUrl: category?.hero_image_url,
    primaryCtaText: category?.hero_primary_cta_text ?? 'Submit Your Product',
    primaryCtaUrl: category?.hero_primary_cta_url ?? '#promote-submit-form',
    secondaryCtaText: category?.hero_secondary_cta_text ?? "See What's Included",
    secondaryCtaUrl: category?.hero_secondary_cta_url ?? '#promote-benefits',
  };

  const benefitsQ = useQuery(sectionContent(page, 'benefits'));
  const distributionQ = useQuery(sectionContent(page, 'distribution'));
  const howItWorksQ = useQuery(sectionContent(page, 'how_it_works'));
  const pricingQ = useQuery(sectionContent(page, 'pricing'));
  const comparisonQ = useQuery(sectionContent(page, 'comparison'));
  const successQ = useQuery(sectionContent(page, 'success_stories'));
  const addonsQ = useQuery(sectionContent(page, 'addons'));
  const formQ = useQuery(sectionContent(page, 'form'));
  const faqQ = useQuery(sectionContent(page, 'faq'));
  const finalCtaQ = useQuery(sectionContent(page, 'final_cta'));

  const metricsQ = useQuery(categoryItems('shared', 'metrics'));
  const directoryQ = useQuery(categoryItems('shared', 'directory_benefits'));
  const reviewQ = useQuery(categoryItems('shared', 'review_benefits'));
  const distributionItemsQ = useQuery(categoryItems(slug, 'distribution_cards'));
  const stepsQ = useQuery(categoryItems(slug, 'steps'));
  const plansQ = useQuery(categoryItems(slug, 'plans'));
  const comparisonRowsQ = useQuery(categoryItems(slug, 'comparison_rows'));
  const slidesQ = useQuery(categoryItems(slug, 'success_slides'));
  const addonsItemsQ = useQuery(categoryItems(slug, 'addons'));
  const faqItemsQ = useQuery(categoryItems(slug, 'faq_items'));

  // DB-only section mapper — returns null if DB has no content
  const mapSection = (db: typeof benefitsQ.data) => {
    if (!db) return null;
    const c = (db.content ?? {}) as Record<string, unknown>;
    return {
      accentColor: String(c.accentColor ?? theme.topBarBg),
      eyebrow: String(db.subtitle ?? c.eyebrow ?? ''),
      headingHtml: String(db.title ?? c.headingHtml ?? ''),
      introText: String(db.description ?? c.introText ?? ''),
      content: c,
    };
  };

  const benefits = mapSection(benefitsQ.data);
  const distribution = mapSection(distributionQ.data);
  const howItWorks = mapSection(howItWorksQ.data);
  const pricing = mapSection(pricingQ.data);
  const comparison = mapSection(comparisonQ.data);
  const successStories = mapSection(successQ.data);
  const addons = mapSection(addonsQ.data);
  const form = mapSection(formQ.data);
  const faq = mapSection(faqQ.data);
  const finalCta = mapSection(finalCtaQ.data);

  const metrics = (metricsQ.data ?? []).map(m => ({
    value: m.title,
    label: m.subtitle ?? '',
  }));

  const directoryBenefits = (directoryQ.data ?? []).map(i => ({
    title: i.title,
    description: i.description ?? '',
  }));

  const reviewBenefits = (reviewQ.data ?? []).map(i => ({
    title: i.title,
    description: i.description ?? '',
  }));

  const distributionCards = (distributionItemsQ.data ?? []).map(i => ({
    ...(i.extras ?? {}),
    title: i.title,
    description: i.description,
  }));

  const steps = (stepsQ.data ?? []).map(i => ({
    number: String((i.extras as Record<string, string>)?.number ?? ''),
    title: i.title,
    description: i.description ?? '',
  }));

  const plans = (plansQ.data ?? []).map(i => {
    const ex = (i.extras ?? {}) as Record<string, unknown>;
    return {
      name: i.title,
      subtitle: i.subtitle ?? '',
      price: String(ex.price ?? '0'),
      features: (ex.features as string[]) ?? [],
      ctaText: String(ex.ctaText ?? 'Get Started'),
      ctaUrl: String(ex.ctaUrl ?? ex.cta_url ?? '#promote-submit-form'),
      highlighted: Boolean(ex.highlighted),
      badgeText: ex.badgeText as string | undefined,
    };
  });

  const comparisonData = comparison ? {
    ...comparison,
    columns: (comparison.content.columns ?? {}) as Record<string, string>,
    rows: (comparisonRowsQ.data ?? []).map(i => i.extras as Record<string, string>),
  } : null;

  const slides = (slidesQ.data ?? []).map(i => ({
    appName: i.title,
    appType: i.subtitle ?? '',
    quote: i.description ?? '',
    imageUrl: i.image_url,
    ...(i.extras as Record<string, unknown>),
  }));

  const addonItems = (addonsItemsQ.data ?? []).map(i => ({
    icon: String((i.extras as Record<string, string>)?.icon ?? ''),
    title: i.title,
    description: i.description ?? '',
    price: String((i.extras as Record<string, string>)?.price ?? ''),
    unit: String((i.extras as Record<string, string>)?.unit ?? ''),
  }));

  const faqItems = (faqItemsQ.data ?? []).map(i => ({
    question: i.title,
    answer: i.description ?? '',
  }));

  const formContent = (form?.content ?? {}) as Record<string, unknown>;
  const benefitsContent = (benefits?.content ?? {}) as Record<string, unknown>;

  return {
    theme,
    metrics,
    benefits: benefits ? {
      accentColor: benefits.accentColor,
      eyebrow: benefits.eyebrow,
      headingHtml: benefits.headingHtml,
      introText: benefits.introText,
      firstCardTitle: String(benefitsContent.first_card_title ?? benefitsContent.firstCardTitle ?? ''),
      firstCardDescription: String(benefitsContent.first_card_description ?? benefitsContent.firstCardDescription ?? ''),
      secondCardTitle: String(benefitsContent.second_card_title ?? benefitsContent.secondCardTitle ?? ''),
      secondCardDescription: String(benefitsContent.second_card_description ?? benefitsContent.secondCardDescription ?? ''),
      previewCard: {
        ...DEFAULT_PREVIEW_CARD,
        ...((benefitsContent.preview_card ?? benefitsContent.previewCard) as Record<string, string> | undefined),
      },
      directoryBenefits,
      reviewBenefits,
    } : null,
    distribution: distribution ? { ...distribution, cards: distributionCards } : null,
    howItWorks: howItWorks ? { ...howItWorks, steps } : null,
    pricing: pricing ? { ...pricing, plans } : null,
    comparison: comparisonData,
    successStories: successStories ? {
      ...successStories,
      slides,
      metricsLabel: String(successStories.content.metrics_label ?? successStories.content.metricsLabel ?? 'results'),
    } : null,
    addons: addons ? {
      ...addons,
      items: addonItems,
      ctaTitle: String(addons.content.cta_title ?? addons.content.ctaTitle ?? ''),
      ctaDescription: String(addons.content.cta_description ?? addons.content.ctaDescription ?? ''),
      ctaButtonText: String(addons.content.cta_button_text ?? addons.content.ctaButtonText ?? ''),
      ctaButtonUrl: String(addons.content.cta_button_url ?? addons.content.ctaButtonUrl ?? '#promote-submit-form'),
    } : null,
    form: form ? {
      accentColor: form.accentColor,
      eyebrow: form.eyebrow,
      headingHtml: form.headingHtml,
      introText: form.introText,
      plans: (formContent.plans as Array<{ name: string; price: string }>) ?? [],
      defaultPlan: (formContent.default_plan as string | undefined) ?? (formContent.defaultPlan as string | undefined),
      leftColumnFields: (formContent.left_column_fields ?? formContent.leftColumnFields) as unknown[],
      rightColumnFields: (formContent.right_column_fields ?? formContent.rightColumnFields) as unknown[],
      textAreaLabel: String(formContent.text_area_label ?? formContent.textAreaLabel ?? ''),
      textAreaPlaceholder: String(formContent.text_area_placeholder ?? formContent.textAreaPlaceholder ?? ''),
      bottomLeftField: formContent.bottom_left_field ?? formContent.bottomLeftField,
      bottomRightField: formContent.bottom_right_field ?? formContent.bottomRightField,
      submitButtonText: String(formContent.submit_button_text ?? formContent.submitButtonText ?? ''),
      disclaimer: String(formContent.disclaimer ?? ''),
      planPickerHeading: String(formContent.plan_picker_heading ?? formContent.planPickerHeading ?? 'Choose Your Plan'),
      successTitle: String(formContent.success_title ?? formContent.successTitle ?? 'Submission received!'),
      successMessage: String(formContent.success_message ?? formContent.successMessage ?? 'Our team will review your submission within one business day.'),
      submittingText: String(formContent.submitting_text ?? formContent.submittingText ?? 'Submitting…'),
      errorMessage: String(formContent.error_message ?? formContent.errorMessage ?? 'Submission failed'),
    } : null,
    faq: faq ? {
      accentColor: faq.accentColor,
      eyebrow: faq.eyebrow,
      headingPrefix: String(faq.content.heading_prefix ?? faq.content.headingPrefix ?? ''),
      headingHighlight: String(faq.content.heading_highlight ?? faq.content.headingHighlight ?? ''),
      items: faqItems,
    } : null,
    finalCta: finalCta ? {
      accentColor: finalCta.accentColor,
      eyebrow: finalCta.eyebrow,
      headingPrefix: String(finalCta.content.heading_prefix ?? finalCta.content.headingPrefix ?? ''),
      headingHighlight: String(finalCta.content.heading_highlight ?? finalCta.content.headingHighlight ?? ''),
      description: String(finalCta.content.description ?? finalCta.introText ?? ''),
      buttonText: String(finalCta.content.buttonText ?? ''),
      points: (finalCta.content.points as string[]) ?? [],
    } : null,
  };
}

export function isValidPromoteCategory(slug: string): slug is PromoteCategorySlug {
  return typeof slug === 'string' && slug.length > 0 && /^[a-z0-9-]+$/.test(slug);
}
