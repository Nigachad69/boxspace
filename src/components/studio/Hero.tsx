'use client';

import { InteractiveCard } from '@/components/ui/3d-card';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[120svh] w-full flex items-center justify-center bg-[url('/warehouse-banner.jpg')] bg-cover bg-center">
      <div
        style={{ perspective: "2000px" }}
        className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-16 h-full text-center text-foreground"
      >
        <InteractiveCard
          title="Corporate Services"
          href="#services"
          actionText="KNOW MORE"
          onActionClick={() => {}}
          glowColor="blue"
        >
          <ArrowLeft className="mr-2" />
        </InteractiveCard>
        <InteractiveCard
          title="Individual Services"
          href="#individual-services"
          actionText="KNOW MORE"
          onActionClick={() => {}}
          glowColor="blue"
        >
          <ArrowRight className="ml-2" />
        </InteractiveCard>
      </div>
    </section>
  );
}
