"use client";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PremiumContactPage from '@/components/contact/PremiumContactPage';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <PremiumContactPage />
      </main>
      <Footer />
    </div>
  );
}
