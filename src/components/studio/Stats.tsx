'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { Users, CheckCircle, Archive, Maximize } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { useInView } from '@/hooks/use-in-view';

interface StatCounterProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  highlighted: string;
  suffix: string;
  delay: number;
}

function StatCounter({ icon, value, label, highlighted, suffix, delay }: StatCounterProps) {
  const [ref, isInView] = useInView({
    threshold: 0.5,
    triggerOnce: false, // Allow re-triggering animation
  });

  const springValue = useSpring(0, {
    stiffness: 40,
    damping: 20,
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    } else {
      springValue.set(0);
    }
  }, [isInView, value, springValue]);

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  return (
    <motion.div
      ref={ref}
      className="bg-card/50 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center text-center group hover:bg-card/80 transition-colors duration-300 border border-border/20 shadow-lg"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay },
        },
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary/20 transition-colors duration-300"
        whileHover={{ rotate: 360, scale: 1.1, transition: { duration: 0.8 } }}
      >
        {React.cloneElement(icon as React.ReactElement, { className: 'w-8 h-8' })}
      </motion.div>
      <motion.div className="text-4xl font-bold text-foreground flex items-center">
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </motion.div>
      <p className="text-muted-foreground text-base mt-1">
        {label} <span className="text-accent">{highlighted}</span>
      </p>
      <motion.div className="w-12 h-0.5 bg-accent mt-3 group-hover:w-20 transition-all duration-300" />
    </motion.div>
  );
}

export default function Stats() {
    const statsData = [
        { icon: <Users />, value: 350, label: 'Happy', highlighted: 'Customers', suffix: "+" },
        { icon: <CheckCircle />, value: 50000, label: 'Completed', highlighted: 'Transactions', suffix: "+" },
        { icon: <Archive />, value: 500000, label: 'Stored', highlighted: 'Assets', suffix: "+" },
        { icon: <Maximize />, value: 100000, label: 'Sq. ft.', highlighted: 'Space', suffix: "+" },
    ];

    return (
        <section className="bg-background border-y border-border/20">
            <div className="container mx-auto px-4 py-16 sm:py-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {statsData.map((stat, index) => (
                        <StatCounter
                        key={index}
                        icon={stat.icon}
                        value={stat.value}
                        label={stat.label}
                        highlighted={stat.highlighted}
                        suffix={stat.suffix}
                        delay={index * 0.15}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
