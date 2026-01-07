'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const targetScale = 1 - (totalCards - index) * 0.05;

        // Set initial state
        gsap.set(card, {
            scale: 1,
            y: index * -25,
            transformOrigin: "center top"
        });

        const startPosition = `top+=${index * 50} top`;
        const endPosition = `bottom-=${totalCards - index - 1 * 50} top`;

        ScrollTrigger.create({
            trigger: card,
            start: startPosition,
            end: endPosition,
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;
                const scale = gsap.utils.interpolate(1, targetScale, progress);
                gsap.to(card, {
                    scale: scale,
                    y: (self.progress * (totalCards - index - 1) * -25),
                    duration: 0.1,
                    ease: "none"
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [index, totalCards]);

    return (
        <div
            ref={cardRef}
            style={{
                position: 'sticky',
                top: `${80 + index * 50}px`,
                width: '90%',
                maxWidth: '800px',
                height: '350px',
                isolation: 'isolate',
                transformOrigin: 'top center',
                willChange: 'transform',
                margin: '0 auto'
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

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

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
    }, []);

    return (
        <section ref={containerRef} className="relative w-full text-foreground pb-[50vh]">
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
