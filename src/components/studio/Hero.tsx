'use client';

import { InteractiveCard } from '@/components/ui/3d-card';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen md:h-[112svh] w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://boxspacesolutions.com/img/banner/warehouse-banner.jpg"
          alt="Warehouse with boxes on shelves"
          data-ai-hint="warehouse shelves"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div
        style={{ perspective: "2000px" }}
        className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 h-full text-center text-white"
      >
        <InteractiveCard
          title="Corporate Services"
          href="#services"
          actionText="KNOW MORE"
          onActionClick={() => {}}
          glowColor="purple"
        >
          <ArrowLeft className="mr-2" />
        </InteractiveCard>
        <InteractiveCard
          title="Individual Services"
          href="#individual-services"
          actionText="KNOW MORE"
          onActionClick={() => {}}
          glowColor="purple"
        >
          <ArrowRight className="ml-2" />
        </InteractiveCard>
      </div>
    </section>
  );
}
