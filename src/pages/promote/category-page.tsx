import { Link, useParams } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import PromoteCategoryHero from '../../components/promote/PromoteCategoryHero';
import PromoteBenefitsSection from '../../components/promote/PromoteBenefitsSection';
import PromoteDistributionChannelsSection from '../../components/promote/PromoteDistributionChannelsSection';
import PromoteHowItWorksSection from '../../components/promote/PromoteHowItWorksSection';
import PromotePricingSection from '../../components/promote/PromotePricingSection';
import PromoteComparisonSection from '../../components/promote/PromoteComparisonSection';
import PromoteSuccessStoriesCarousel from '../../components/promote/PromoteSuccessStoriesCarousel';
import PromoteAddOnsSection from '../../components/promote/PromoteAddOnsSection';
import PromoteSubmitFormSection from '../../components/promote/PromoteSubmitFormSection';
import PromoteFaqSection from '../../components/promote/PromoteFaqSection';
import PromoteFinalCtaSection from '../../components/promote/PromoteFinalCtaSection';
import { usePromoteCategory, isValidPromoteCategory } from '../../hooks/usePromoteCategory';
import { Navigate } from 'react-router-dom';

export default function PromoteCategoryPage() {
  const { category } = useParams<{ category: string }>();
  const slug = category ?? '';

  if (!isValidPromoteCategory(slug)) {
    return <Navigate to="/promote" replace />;
  }

  const {
    theme,
    metrics,
    benefits,
    distribution,
    howItWorks,
    pricing,
    comparison,
    successStories,
    addons,
    form,
    faq,
    finalCta,
  } = usePromoteCategory(slug);

  return (
    <div className="min-h-screen bg-[#050608] text-white overflow-x-hidden">
      <Header />

      <div
        className="fixed top-[5.2rem] sm:top-[5.5rem] w-full py-2.5 px-4 text-center text-[11px] sm:text-xs font-semibold tracking-wide z-20"
        style={{ backgroundColor: theme.topBarBg }}
      >
        <span className="text-white/80 mr-2">{theme.viewingPrefix ?? "You're viewing:"}</span>
        <span className="text-white">{theme.viewingLabel}</span>
        <Link to="/promote" className="ml-4 underline decoration-white/40 hover:decoration-white text-white/90">
          {theme.switchCategoryText ?? 'Switch Category'}
        </Link>
      </div>

      <PromoteCategoryHero theme={theme} metrics={metrics} />

      {benefits && (
        <div id="promote-benefits">
          <PromoteBenefitsSection
            accentColor={benefits.accentColor}
            eyebrow={benefits.eyebrow}
            headingHtml={benefits.headingHtml}
            introText={benefits.introText}
            firstCardTitle={benefits.firstCardTitle}
            firstCardDescription={benefits.firstCardDescription}
            secondCardTitle={benefits.secondCardTitle}
            secondCardDescription={benefits.secondCardDescription}
            previewCard={benefits.previewCard as {
              icon: string;
              iconBg: string;
              iconColor: string;
              name: string;
              meta: string;
              badge: string;
              badgeColor: string;
            }}
            directoryBenefits={benefits.directoryBenefits}
            reviewBenefits={benefits.reviewBenefits}
          />
        </div>
      )}

      {distribution && (
        <PromoteDistributionChannelsSection
          accentColor={distribution.accentColor}
          eyebrow={distribution.eyebrow}
          headingHtml={distribution.headingHtml}
          introText={distribution.introText}
          cards={distribution.cards as Array<{
            number: string;
            icon: string;
            title: string;
            description: string;
            tags: string[];
            metricLabel: string;
            metricValue: string;
            featured?: boolean;
          }>}
        />
      )}

      {howItWorks && (
        <PromoteHowItWorksSection
          accentColor={howItWorks.accentColor}
          eyebrow={howItWorks.eyebrow}
          headingHtml={howItWorks.headingHtml}
          introText={howItWorks.introText}
          steps={howItWorks.steps}
        />
      )}

      {pricing && (
        <PromotePricingSection
          accentColor={pricing.accentColor}
          eyebrow={pricing.eyebrow}
          headingHtml={pricing.headingHtml}
          introText={pricing.introText}
          plans={pricing.plans}
        />
      )}

      {comparison && comparison.columns && (
        <PromoteComparisonSection
          accentColor={comparison.accentColor}
          eyebrow={comparison.eyebrow}
          headingHtml={comparison.headingHtml}
          introText={comparison.introText}
          columns={comparison.columns as {
            feature: string;
            twap: string;
            directory: string;
            editorial: string;
            social: string;
            ceo: string;
          }}
          rows={comparison.rows as Array<Record<string, string>>}
        />
      )}

      {successStories && (
        <PromoteSuccessStoriesCarousel
          accentColor={successStories.accentColor}
          eyebrow={successStories.eyebrow}
          headingHtml={successStories.headingHtml}
          introText={successStories.introText}
          slides={successStories.slides as Array<{
            appName: string;
            appType: string;
            quote: string;
            metrics: Array<{ value: string; label: string }>;
            mockBg: string;
            mockCard: string;
            icon: string;
            imageUrl?: string;
          }>}
        />
      )}

      {addons && (
        <PromoteAddOnsSection
          accentColor={addons.accentColor}
          eyebrow={addons.eyebrow}
          headingHtml={addons.headingHtml}
          introText={addons.introText}
          items={addons.items}
          ctaTitle={addons.ctaTitle}
          ctaDescription={addons.ctaDescription}
          ctaButtonText={addons.ctaButtonText}
          ctaButtonUrl={addons.ctaButtonUrl}
        />
      )}

      {form && (
        <div id="promote-submit-form">
          <PromoteSubmitFormSection
            accentColor={form.accentColor}
            eyebrow={form.eyebrow}
            headingHtml={form.headingHtml}
            introText={form.introText}
            plans={form.plans}
            defaultPlan={form.defaultPlan}
            leftColumnFields={form.leftColumnFields as Array<{
              label: string;
              placeholder: string;
              required?: boolean;
              type?: 'text' | 'email';
              options?: string[];
            }>}
            rightColumnFields={form.rightColumnFields as Array<{
              label: string;
              placeholder: string;
              required?: boolean;
              type?: 'text' | 'email';
              options?: string[];
            }>}
            textAreaLabel={form.textAreaLabel}
            textAreaPlaceholder={form.textAreaPlaceholder}
            bottomLeftField={form.bottomLeftField as {
              label: string;
              placeholder: string;
              required?: boolean;
              type?: 'text' | 'email';
              options?: string[];
            }}
            bottomRightField={form.bottomRightField as {
              label: string;
              placeholder: string;
              required?: boolean;
              type?: 'text' | 'email';
              options?: string[];
            }}
            submitButtonText={form.submitButtonText}
            disclaimer={form.disclaimer}
          />
        </div>
      )}

      {faq && (
        <PromoteFaqSection
          accentColor={faq.accentColor}
          eyebrow={faq.eyebrow}
          headingPrefix={faq.headingPrefix}
          headingHighlight={faq.headingHighlight}
          items={faq.items}
        />
      )}

      {finalCta && (
        <PromoteFinalCtaSection
          accentColor={finalCta.accentColor}
          eyebrow={finalCta.eyebrow}
          headingPrefix={finalCta.headingPrefix}
          headingHighlight={finalCta.headingHighlight}
          description={finalCta.description}
          buttonText={finalCta.buttonText}
          points={finalCta.points}
        />
      )}

      <Footer />
    </div>
  );
}
