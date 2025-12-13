import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/studio/Hero';
import Stats from '@/components/studio/Stats';
import Services from '@/components/studio/Services';
import Contact from '@/components/studio/Contact';
import IndividualServices from '@/components/studio/IndividualServices';
import SafetyAndSecurity from '@/components/studio/SafetyAndSecurity';
import StorageAndManagement from '@/components/studio/StorageAndManagement';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background pt-24">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Stats />
        <Services />
        <IndividualServices />
        <SafetyAndSecurity />
        <StorageAndManagement />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
