import React from 'react';
import Header from '../../components/feature/Header';
import ServicesBentoGrid from './components/ServicesBentoGrid';
import TestimonialsSection from '../../components/feature/TestimonialsSection';
import ServiceBenefits from './components/ServiceBenefits';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import TailoredServicesGrid from './components/TailoredServicesGrid';
import Footer from '../../components/feature/Footer';

const ServicesPage: React.FC = () => {
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef} className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      <Header />
      <ServicesBentoGrid />
      <TestimonialsSection />
      <ServiceBenefits />
      <TailoredServicesGrid />
      <Footer />
    </div>
  );
};

export default ServicesPage;
