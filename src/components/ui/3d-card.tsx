"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface InteractiveCardProps {
  title: string;
  href: string;
  className?: string;
  children?: React.ReactNode;
  actionText: string;
  onActionClick: () => void;
  glowColor?: 'blue' | 'purple';
}

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
};

export const InteractiveCard = React.forwardRef<
  HTMLDivElement,
  InteractiveCardProps
>(
  ({ title, href, className, children, actionText, onActionClick, glowColor = 'blue' }, ref) => {
    const cardRef = React.useRef<HTMLDivElement>(null);

    // 3D tilt effect logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 200 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const rotateX = useTransform(springY, [-0.5, 0.5], ["12.5deg", "-12.5deg"]);
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-12.5deg", "12.5deg"]);

    // Glow effect logic
    React.useEffect(() => {
      const syncPointer = (e: PointerEvent) => {
        const { clientX: x, clientY: y } = e;
        if (cardRef.current) {
          const rect = cardRef.current.getBoundingClientRect();
          cardRef.current.style.setProperty('--x', (x - rect.left).toFixed(2));
          cardRef.current.style.setProperty('--xp', ((x - rect.left) / rect.width).toFixed(2));
          cardRef.current.style.setProperty('--y', (y - rect.top).toFixed(2));
          cardRef.current.style.setProperty('--yp', ((y - rect.top) / rect.height).toFixed(2));
        }
      };

      document.addEventListener('pointermove', syncPointer);
      return () => document.removeEventListener('pointermove', syncPointer);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const { width, height, left, top } = rect;
      const mouseXVal = e.clientX - left;
      const mouseYVal = e.clientY - top;
      const xPct = mouseXVal / width - 0.5;
      const yPct = mouseYVal / height - 0.5;
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    const { base, spread } = glowColorMap[glowColor];
    
    const glowStyles: React.CSSProperties = {
      '--base': base,
      '--spread': spread,
      '--radius': '16',
      '--border': '2',
      '--size': '300',
      '--bg-spot-opacity': '0.15',
      '--border-spot-opacity': '1',
      '--border-light-opacity': '1',
      '--saturation': '80',
      '--lightness': '70',
      '--border-size': 'calc(var(--border, 2) * 1px)',
      '--spotlight-size': 'calc(var(--size, 150) * 1px)',
      '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
       willChange: 'transform',
    };

    const beforeAfterStyles = `
      [data-glow] {
        position: relative;
        background-image: radial-gradient(
          var(--spotlight-size) var(--spotlight-size) at
          calc(var(--x, 0) * 1px)
          calc(var(--y, 0) * 1px),
          hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
        );
      }
      [data-glow]::before,
      [data-glow]::after {
        pointer-events: none;
        content: "";
        position: absolute;
        inset: calc(var(--border-size) * -1);
        border: var(--border-size) solid transparent;
        border-radius: calc(var(--radius) * 1px);
        mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
        mask-clip: padding-box, border-box;
        mask-composite: intersect;
      }
      
      [data-glow]::before {
        background-image: radial-gradient(
          calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
          calc(var(--x, 0) * 1px)
          calc(var(--y, 0) * 1px),
          hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
        );
        filter: brightness(1.75);
      }
      
      [data-glow]::after {
         background-image: radial-gradient(
          calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
          calc(var(--x, 0) * 1px)
          calc(var(--y, 0) * 1px),
          hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
        );
      }
    `;

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            ...glowStyles,
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          data-glow
          className={cn(
            "relative h-64 w-64 sm:h-80 sm:w-80 rounded-2xl bg-transparent p-px",
            className
          )}
        >
          <div
            style={{
              transform: "translateZ(40px)",
              transformStyle: "preserve-3d",
            }}
            className="absolute inset-px flex flex-col items-center justify-center text-center text-white bg-background/80 rounded-[15px] p-8"
          >
            <motion.h2
              style={{ transform: "translateZ(50px)" }}
              className="text-4xl font-bold text-primary"
            >
              {title}
            </motion.h2>
            
            <motion.div
              style={{ transform: "translateZ(60px)" }}
              className="mt-6"
            >
              <Button asChild variant="ghost" size="lg" onClick={onActionClick} className="group">
                <a href={href} className="flex items-center">
                  {children}
                  {actionText}
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </>
    );
  }
);
InteractiveCard.displayName = "InteractiveCard";
