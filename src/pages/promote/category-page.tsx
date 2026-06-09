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
import { usePromoteCategory } from '../../hooks/usePromoteCategory';

export default function PromoteCategoryPage() {
  const { category = 'web-mobile-apps' } = useParams<{ category: string }>();
  const data = usePromoteCategory(category);

  return (
    <div className="min-h-screen bg-[#050608] text-white overflow-x-hidden">
      <Header />

      <div
        className="fixed top-[5.2rem] sm:top-[5.5rem] w-full py-2.5 px-4 text-center text-[11px] sm:text-xs font-semibold tracking-wide z-20"
        style={{ backgroundColor: data.theme.topBarBg }}
      >
        <span className="text-white/80 mr-2">{data.theme.viewingPrefix}</span>
        <span className="text-white">{data.theme.viewingLabel}</span>
        <Link to="/promote" className="ml-4 underline decoration-white/40 hover:decoration-white text-white/90">
          {data.theme.switchCategoryText}
        </Link>
      </div>

      <PromoteCategoryHero theme={data.theme} metrics={data.metrics} />

      {data.benefits && (
        <PromoteBenefitsSection
          accentColor={data.benefits.accentColor}
          eyebrow={data.benefits.eyebrow}
          headingHtml={data.benefits.headingHtml}
          introText={data.benefits.introText}
          firstCardTitle={data.benefits.firstCardTitle}
          firstCardDescription={data.benefits.firstCardDescription}
          secondCardTitle={data.benefits.secondCardTitle}
          secondCardDescription={data.benefits.secondCardDescription}
          previewCard={data.benefits.previewCard as Parameters<typeof PromoteBenefitsSection>[0]['previewCard']}
          directoryBenefits={data.benefits.directoryBenefits}
          reviewBenefits={data.benefits.reviewBenefits}
        />
      )}

      {data.distribution && (
        <PromoteDistributionChannelsSection
          accentColor={data.distribution.accentColor}
          eyebrow={data.distribution.eyebrow}
          headingHtml={data.distribution.headingHtml}
          introText={data.distribution.introText}
          cards={data.distribution.cards as Parameters<typeof PromoteDistributionChannelsSection>[0]['cards']}
        />
      )}

      {data.howItWorks && (
        <PromoteHowItWorksSection
          accentColor={data.howItWorks.accentColor}
          eyebrow={data.howItWorks.eyebrow}
          headingHtml={data.howItWorks.headingHtml}
          introText={data.howItWorks.introText}
          steps={data.howItWorks.steps as Parameters<typeof PromoteHowItWorksSection>[0]['steps']}
        />
      )}

      {data.pricing && (
        <PromotePricingSection
          accentColor={data.pricing.accentColor}
          eyebrow={data.pricing.eyebrow}
          headingHtml={data.pricing.headingHtml}
          introText={data.pricing.introText}
          plans={data.pricing.plans as Parameters<typeof PromotePricingSection>[0]['plans']}
        />
      )}

      {data.comparison && (
        <PromoteComparisonSection
          accentColor={data.comparison.accentColor}
          eyebrow={data.comparison.eyebrow}
          headingHtml={data.comparison.headingHtml}
          introText={data.comparison.introText}
          columns={data.comparison.columns}
          rows={data.comparison.rows}
        />
      )}

      {data.successStories && (
        <PromoteSuccessStoriesCarousel
          accentColor={data.successStories.accentColor}
          eyebrow={data.successStories.eyebrow}
          headingHtml={data.successStories.headingHtml}
          introText={data.successStories.introText}
          metricsLabel={data.successStories.metricsLabel}
          slides={data.successStories.slides as Parameters<typeof PromoteSuccessStoriesCarousel>[0]['slides']}
        />
      )}

      {data.addons && (
        <PromoteAddOnsSection
          accentColor={data.addons.accentColor}
          eyebrow={data.addons.eyebrow}
          headingHtml={data.addons.headingHtml}
          introText={data.addons.introText}
          items={data.addons.items as Parameters<typeof PromoteAddOnsSection>[0]['items']}
          ctaTitle={data.addons.ctaTitle}
          ctaDescription={data.addons.ctaDescription}
          ctaButtonText={data.addons.ctaButtonText}
        />
      )}

      {data.form && (
        <PromoteSubmitFormSection
          source={`promote:${category}`}
          accentColor={data.form.accentColor}
          eyebrow={data.form.eyebrow}
          headingHtml={data.form.headingHtml}
          introText={data.form.introText}
          plans={data.form.plans}
          defaultPlan={data.form.defaultPlan}
          leftColumnFields={data.form.leftColumnFields as Parameters<typeof PromoteSubmitFormSection>[0]['leftColumnFields']}
          rightColumnFields={data.form.rightColumnFields as Parameters<typeof PromoteSubmitFormSection>[0]['rightColumnFields']}
          textAreaLabel={data.form.textAreaLabel}
          textAreaPlaceholder={data.form.textAreaPlaceholder}
          bottomLeftField={data.form.bottomLeftField as Parameters<typeof PromoteSubmitFormSection>[0]['bottomLeftField']}
          bottomRightField={data.form.bottomRightField as Parameters<typeof PromoteSubmitFormSection>[0]['bottomRightField']}
          submitButtonText={data.form.submitButtonText}
          disclaimer={data.form.disclaimer}
          planPickerHeading={data.form.planPickerHeading}
          successTitle={data.form.successTitle}
          successMessage={data.form.successMessage}
          submittingText={data.form.submittingText}
          errorMessage={data.form.errorMessage}
        />
      )}

      {data.faq && (
        <PromoteFaqSection
          accentColor={data.faq.accentColor}
          eyebrow={data.faq.eyebrow}
          headingPrefix={data.faq.headingPrefix}
          headingHighlight={data.faq.headingHighlight}
          items={data.faq.items as Parameters<typeof PromoteFaqSection>[0]['items']}
        />
      )}

      {data.finalCta && (
        <PromoteFinalCtaSection
          accentColor={data.finalCta.accentColor}
          eyebrow={data.finalCta.eyebrow}
          headingPrefix={data.finalCta.headingPrefix}
          headingHighlight={data.finalCta.headingHighlight}
          description={data.finalCta.description}
          buttonText={data.finalCta.buttonText}
          points={data.finalCta.points}
        />
      )}

      <Footer />
    </div>
  );
}
