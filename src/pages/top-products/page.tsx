import Header from "../../components/feature/Header";
import Footer from "../../components/feature/Footer";
import TopProductsHero from "../../components/feature/TopProductsHero";
import TopProductsGrid from "../../components/feature/TopProductsGrid";
import ProductReviewSection from "../../components/feature/ProductReviewSection";
import ReadyToStartCta from "../../components/feature/ReadyToStartCta";
import StatsSection from "../../components/feature/StatsSection";

export default function TopProductsPage() {
    return (
        <div className="min-h-screen bg-white font-['Manrope']">
            <Header />
            <main>
                <TopProductsHero />
                <TopProductsGrid />
                <ProductReviewSection />
                <ReadyToStartCta />
                <StatsSection page="tools" />
            </main>
            <Footer />
            <style>{`
         @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
         }
         .animate-infinite-scroll {
            animation: scroll 20s linear infinite;
         }
         .animate-spin-slow {
            animation: spin 3s linear infinite;
         }
         @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
         }
      `}</style>
        </div>
    );
}
