'use client';

import { useInView } from '@/hooks/use-in-view';
import {
  AreaChart,
  FileText,
  Box,
  Barcode,
  Truck,
  Warehouse,
  PackageSearch,
  ArchiveRestore,
} from 'lucide-react';
import React from 'react';

const processSteps = [
  {
    icon: <AreaChart className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" />,
    title: 'Survey',
  },
  {
    icon: <FileText className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" />,
    title: 'Proposal / Agreement',
  },
  {
    icon: <Box className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" />,
    title: 'Initial Collection',
  },
  {
    icon: <Barcode className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" />,
    title: 'Packing / Barcoding',
  },
  {
    icon: <Truck className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" />,
    title: 'Transport',
  },
  {
    icon: <Warehouse className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" />,
    title: 'Storage',
  },
  {
    icon: <PackageSearch className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" />,
    title: 'Retrieval',
  },
  {
    icon: <ArchiveRestore className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" />,
    title: 'Refiling',
  },
];

const Step = ({
  icon,
  title,
  index,
  isInView,
}: {
  icon: React.ReactNode;
  title: string;
  index: number;
  isInView: boolean;
}) => {
  const isLastInRow = index === 3 || index === 7;
  return (
    <div className="flex items-center group">
      <div
        className={`flex flex-col items-center gap-4 transition-all duration-700 ease-out ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ transitionDelay: `${index * 150}ms` }}
      >
        <div className="w-32 h-32 bg-primary/10 border-2 border-primary/50 rounded-lg flex items-center justify-center text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:border-primary group-hover:shadow-[0_0_20px_hsl(var(--primary))]">
          {icon}
        </div>
        <p className="font-semibold text-accent">{title}</p>
      </div>
      {!isLastInRow && (
        <div
          className={`w-20 h-px bg-border mx-4 transition-all duration-1000 ease-out ${
            isInView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
          style={{ transitionDelay: `${index * 150 + 100}ms` }}
        />
      )}
    </div>
  );
};

export default function StorageAndManagement() {
  const [containerRef, isInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section ref={containerRef} className="section-container bg-background">
      <div
        className={`text-center transition-opacity duration-1000 ${
          isInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h2 className="section-title font-headline">Storage And Management</h2>
        <p className="section-subtitle">
          Storage and Management are our core services and we provide customized
          versions of these services to our customers. Our process includes the
          following steps:
        </p>
      </div>
      <div className="hidden md:flex flex-col items-center justify-center gap-y-12">
        <div className="flex items-start">
          {processSteps.slice(0, 4).map((step, index) => (
            <Step key={step.title} {...step} index={index} isInView={isInView} />
          ))}
        </div>
        <div className="flex items-start">
          {processSteps.slice(4, 8).map((step, index) => (
            <Step
              key={step.title}
              {...step}
              index={index + 4}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
      <div className="md:hidden flex flex-wrap justify-center gap-4">
        {processSteps.map((step, index) => (
           <div key={step.title} className="flex flex-col items-center gap-2 basis-1/3">
             <div className="w-24 h-24 bg-primary/10 border-2 border-primary/50 rounded-lg flex items-center justify-center text-primary">
                {step.icon}
             </div>
             <p className="font-semibold text-accent text-center text-sm">{step.title}</p>
           </div>
        ))}
      </div>
    </section>
  );
}
