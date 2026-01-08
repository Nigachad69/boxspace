import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/studio/Hero';
import Stats from '@/components/studio/Stats';
import Services from '@/components/studio/Services';
import Contact from '@/components/studio/Contact';
import IndividualServices from '@/components/studio/IndividualServices';
import SafetyAndSecurity from '@/components/studio/SafetyAndSecurity';
import StorageAndManagement from '@/components/studio/StorageAndManagement';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const warehouseImage = PlaceHolderImages.find(img => img.id === 'warehouse-banner');

  return (
    <div className="flex flex-col min-h-screen bg-background pt-16 sm:pt-20 md:pt-24">
      <Header />
      <main className="flex-grow relative">
        <section className="relative bg-[url('/warehouse-banner.jpg')] bg-cover bg-center">
          <Hero />
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent"></div>
        </section>
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
