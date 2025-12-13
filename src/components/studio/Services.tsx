'use client';

import React from 'react';
import { useInView } from '@/hooks/use-in-view';
import ParallaxCardCarousel from '@/components/ui/3d-cards-slider';

const servicesData = [
  {
    id: 1,
    title: 'Records Management',
    description: 'Comprehensive information lifecycle management that includes Inventorization, Barcoding.',
    imageUrl: 'https://images.unsplash.com/photo-1584895493946-2c9b6f3a3d9d?q=80&w=2070&auto=format&fit=crop',
    imageHint: 'archive boxes',
    actionLabel: 'View More',
    onAction: () => console.log("Action for Records Management"),
  },
  {
    id: 2,
    title: 'Digitization',
    description: 'Our experienced team can be deployed at your premises to convert your documents to multiple digital formats.',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1934&auto=format&fit=crop',
    imageHint: 'office scanner',
    actionLabel: 'View More',
    onAction: () => console.log("Action for Digitization"),
  },
  {
    id: 3,
    title: 'Business Asset',
    description: 'Flexible and customizable storage for corporate business assets like stationary, furniture & more.',
    imageUrl: 'https://images.unsplash.com/photo-1507878866276-a947772501b8?q=80&w=2070&auto=format&fit=crop',
    imageHint: 'warehouse storage',
    actionLabel: 'View More',
    onAction: () => console.log("Action for Business Asset"),
  },
  {
    id: 4,
    title: 'Ecommerce Fulfillment',
    description: 'Accurate and timely fulfillment from our warehouse, integration with multiple marketplace softwares.',
    imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop',
    imageHint: 'ecommerce fulfillment',
    actionLabel: 'View More',
    onAction: () => console.log("Action for Ecommerce Fulfillment"),
  },
];

export default function Services() {
  const [titleRef, isTitleInView] = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <section id="services" className="section-container">
      <div
        ref={titleRef}
        className={`transition-opacity duration-1000 ${
          isTitleInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h2 className="section-title font-headline">
          Comprehensive Storage and Management Solutions for Corporate and Individuals.
        </h2>
        <p className="section-subtitle">
          Our Customized Solutions Leverage Years Of Experience And Encompass Multiple Industries And Verticals.
        </p>
        <h3 className="text-2xl font-bold text-center text-accent mt-8 mb-12">
          Corporate Services
        </h3>
      </div>
      <ParallaxCardCarousel 
        cards={servicesData}
        backgroundColor="bg-transparent"
      />
    </section>
  );
}
