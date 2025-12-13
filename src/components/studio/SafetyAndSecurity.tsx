
'use client';

import { useInView } from '@/hooks/use-in-view';
import { StackedCards } from '@/components/ui/glass-cards';
import { cn } from '@/lib/utils';
import { securityCardData } from '@/lib/security-data';

export default function SafetyAndSecurity() {
  const [titleRef, isTitleInView] = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <section id="safety" className="bg-background text-foreground">
       <div
        ref={titleRef}
        className={`text-center pt-16 transition-opacity duration-1000 ${
          isTitleInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h2 className="section-title font-headline">Safety And Security</h2>
        <p className="section-subtitle">
          We protect your assets with multiple levels of safety and security measures, from 24/7 surveillance to biometric access and climate control.
        </p>
      </div>
      <StackedCards cards={securityCardData} />
    </section>
  );
}
