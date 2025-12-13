"use client";

import AboutUsSection from '@/components/about/AboutUsSection';
import { HistorySection } from '@/components/about/HistorySection';
import { ManagementTeam } from '@/components/about/ManagementTeam';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

export default function AboutPage() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <AboutUsSection />
        <HistorySection />
        <ManagementTeam />

        {/* CTA Section */}
        <div ref={ctaRef} className="section-container">
          <motion.div
            className="bg-card text-foreground p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-border"
            initial={{ opacity: 0, y: 30 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-medium mb-2">Ready to secure your space?</h3>
              <p className="text-muted-foreground">Let's create the perfect storage solution together.</p>
            </div>
            <Link href="/contact">
              <motion.button
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
