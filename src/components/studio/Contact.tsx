'use client';
import React from 'react';
import { useInView } from '@/hooks/use-in-view';
import { Phone } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Contact = () => {
  const [ref, isInView] = useInView({ threshold: 0.2, triggerOnce: true });
  
  return (
    <section id="contact" ref={ref} className="section-container bg-grid">
      <div className={`w-full max-w-3xl mx-auto text-center mb-16 transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="section-title font-headline">
          Connect <span className="text-primary">With Us</span>
        </h2>
        <p className="section-subtitle">
          Connect with us to get the best deal.
          <br />
          Make an appointment today to store anything, any size, any duration.
        </p>
      </div>
      
      <div className={`relative w-full max-w-2xl mx-auto flex justify-center transition-all duration-1000 ease-out ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{transitionDelay: '200ms'}}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a 
                href="tel:+918591439244"
                className="group relative flex items-center justify-center w-40 h-40 rounded-full bg-card/80 border border-border/50 shadow-2xl backdrop-blur-xl cursor-pointer transition-all duration-500 hover:scale-110 hover:border-primary"
                style={{
                  boxShadow:  '0 0 50px hsla(var(--primary), 0.4), 0 0 80px hsla(var(--accent), 0.2)'
                }}
              >
                <Phone className="w-16 h-16 text-primary transition-all duration-300 group-hover:text-accent animate-pulse" />
              </a>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-transparent border-none shadow-none text-foreground">
              <p className="font-bold text-lg" style={{textShadow: '0 0 10px hsl(var(--primary))'}}>+91 8591-439-244</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </section>
  );
};

export default Contact;
