'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '@/hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

interface CardProps {
    id: number;
    title: string;
    description: string;
    index: number;
    totalCards: number;
    color: string;
    icon: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, index, totalCards, color, icon }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        const card = cardRef.current;
        if (!card || isMobile) return; // Skip complex animations on mobile

        // Calculate consistent positioning values
        const baseOffset = 80;
        const cardSpacing = 60; // Increased spacing for better alignment
        const targetScale = Math.max(0.85, 1 - index * 0.03); // More subtle scaling, reversed

        // Set initial state with consistent positioning (reversed stacking)
        gsap.set(card, {
            scale: 1,
            y: (totalCards - 1 - index) * -30, // Reversed vertical offset
            transformOrigin: "center center", // Changed to center for better alignment
            opacity: 1,
            zIndex: index + 1 // Ensure proper stacking order (higher index = higher z-index)
        });

        // Create more predictable scroll trigger zones (reversed)
        const triggerOffset = (totalCards - 1 - index) * cardSpacing;
        const startPosition = `top+=${baseOffset + triggerOffset} center`;
        const endPosition = `bottom-=${index * cardSpacing} center`;

        ScrollTrigger.create({
            trigger: card,
            start: startPosition,
            end: endPosition,
            scrub: 1.2, // Slightly smoother scrubbing
            onUpdate: (self: any) => {
                const progress = self.progress;
                // Use smooth easing function
                const easeProgress = gsap.utils.interpolate(0, 1, progress);

                const scale = gsap.utils.interpolate(1, targetScale, easeProgress);
                const yOffset = easeProgress * (totalCards - index - 1) * -30;

                gsap.to(card, {
                    scale: scale,
                    y: yOffset,
                    duration: 0.05, // Reduced duration for smoother updates
                    ease: "power2.out",
                    overwrite: "auto" // Prevent animation conflicts
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [index, totalCards, isMobile]);

    return (
        <div
            ref={cardRef}
            style={{
                position: isMobile ? 'relative' : 'sticky',
                top: isMobile ? 'auto' : `${80 + index * 60}px`, // Use consistent spacing
                width: '90%',
                maxWidth: '800px',
                height: '350px',
                isolation: 'isolate',
                transformOrigin: 'center center', // Match the GSAP transform origin
                willChange: 'transform',
                margin: isMobile ? '0 auto 2rem auto' : '0 auto', // Remove top margin, rely on section padding
                zIndex: isMobile ? 'auto' : index + 1 // Remove z-index stacking on mobile
            }}
            className="card-content"
        >
            {/* Electric Border Effect */}
            <div
                style={{
                    position: 'absolute',
                    inset: '-2px',
                    borderRadius: '26px',
                    background: `conic-gradient(from ${index * 90}deg at 50% 50%, transparent 0%, ${color} 90deg, transparent 180deg, ${color} 270deg, transparent 360deg)`,
                    zIndex: -1,
                    filter: 'blur(10px)',
                }}
            />

            {/* Main Card Content */}
            <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '2rem',
                borderRadius: '24px',
                background: `
                    linear-gradient(145deg,
                        hsla(var(--card) / 0.6),
                        hsla(var(--card) / 0.8)
                    )
                `,
                backdropFilter: 'blur(20px) saturate(150%)',
                border: '1px solid hsl(var(--border))',
                boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3)`,
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `
                        radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 1px, transparent 1px),
                        radial-gradient(circle at 80% 70%, rgba(255,255,255,0.06) 1px, transparent 1px)
                    `,
                    backgroundSize: '30px 30px',
                    pointerEvents: 'none',
                    borderRadius: '24px',
                    opacity: 0.5
                }} />

                <div className="text-primary mb-4" style={{ color: color }}>
                    {icon}
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: color, textShadow: `0 0 10px ${color}` }}>{title}</h3>
                <p className="text-muted-foreground max-w-md">{description}</p>
            </div>

        </div>
    );
};

interface StackedCardsProps {
    cards: {
        id: number;
        title: string;
        description: string;
        color: string;
        icon: React.ReactNode;
    }[];
}

export const StackedCards: React.FC<StackedCardsProps> = ({ cards }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Skip complex scroll animations on mobile
        if (isMobile) {
            gsap.set(container, { opacity: 1 });
            return;
        }

        gsap.fromTo(container,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: container,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }, [isMobile]);

    return (
        <section
            ref={containerRef}
            className="relative w-full text-foreground"
            style={{
                paddingBottom: isMobile ? '2rem' : '50vh',
                paddingTop: isMobile ? '3rem' : '0' // Add top padding on mobile to separate from title
            }}
        >
            {cards.map((card, index) => (
                <Card
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    description={card.description}
                    index={index}
                    totalCards={cards.length}
                    color={card.color}
                    icon={card.icon}
                />
            ))}
        </section>
    );
};
