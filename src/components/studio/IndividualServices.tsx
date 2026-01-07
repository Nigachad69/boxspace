'use client';

import React from 'react';
import { useInView } from '@/hooks/use-in-view';
import ParallaxCardCarousel from '@/components/ui/3d-cards-slider';

const individualServicesData = [
  {
    id: 1,
    title: 'Self Storage - Open Flexi',
    description: 'Secure warehouse storage, with no minimum space or time commitments, no deposit and easy access to your belongings. Store anything from a book to a motorbike.',
    imageUrl: 'https://images.unsplash.com/photo-1593955813350-bf3a9a14ad7a?q=80&w=2070&auto=format&fit=crop',
    imageHint: 'warehouse storage',
    actionLabel: 'View More',
    onAction: () => console.log("Action for Open Flexi"),
  },
  {
    id: 2,
    title: 'Self Storage - Closed Room',
    description: 'Dedicated room with lockable door and CCTV camera monitoring. Additional customizations, as required.',
    imageUrl: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?q=80&w=2070&auto=format&fit=crop',
    imageHint: 'storage units hallway',
    actionLabel: 'View More',
    onAction: () => console.log("Action for Closed Room"),
  },
];

export default function IndividualServices() {
  const [titleRef, isTitleInView] = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <section id="individual-services" className="section-container">
      <div
        ref={titleRef}
        className={`transition-opacity duration-1000 ${
          isTitleInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h3 className="text-2xl font-bold text-center text-accent mb-12">
          Individual Services
        </h3>
      </div>
      <ParallaxCardCarousel 
        cards={individualServicesData}
        backgroundColor="bg-transparent"
      />
    </section>
  );
}
