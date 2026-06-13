import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import SuccessStoriesHero from '../../components/success-stories/SuccessStoriesHero';
import StoriesGrid from '../../components/success-stories/StoriesGrid';
import InterviewsSection from '../../components/success-stories/InterviewsSection';
import SuccessNotes from '../../components/success-stories/SuccessNotes';
import SuccessCTA from '../../components/success-stories/SuccessCTA';
import SuccessTopics from '../../components/success-stories/SuccessTopics';
import SuccessFeatures from '../../components/success-stories/SuccessFeatures';
import AgenciesContact from '../../components/agencies/AgenciesContact';

const SuccessStoriesPage = () => {
    return (
        <div className="min-h-screen bg-[#F5F5F7]">
            <Header />
            <main>
                <SuccessStoriesHero />
                <StoriesGrid />
                <SuccessFeatures />
                <InterviewsSection />
                <SuccessTopics />
                <SuccessNotes />
                <SuccessCTA />
                <AgenciesContact/>
            </main>
            <Footer />
        </div>
    );
};

export default SuccessStoriesPage;
