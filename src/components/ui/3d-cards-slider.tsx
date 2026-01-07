'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';

const ParallaxCardCarousel = ({ 
  cards = [],
  autoplaySpeed = 5000,
  enableAutoplay = true,
  cardWidth = 320,
  cardHeight = 450,
  gap = 30,
  perspective = 1200,
  maxRotation = 25,
  backgroundColor = 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-700'
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(enableAutoplay);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const carouselRef = useRef(null);
  const autoplayTimerRef = useRef(null);
  const touchStartRef = useRef(0);
  
  // Handle card rotation and parallax on mouse move
  const handleMouseMove = (e) => {
    if (!carouselRef.current) return;
    
    const rect = carouselRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    setMousePosition({ x, y });
  };
  
  // Handle autoplay timing
  useEffect(() => {
    if (isAutoPlaying && !isHovered) {
      autoplayTimerRef.current = setTimeout(() => {
        goToNext();
      }, autoplaySpeed);
    }
    
    return () => clearTimeout(autoplayTimerRef.current);
  }, [activeIndex, isAutoPlaying, isHovered]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Navigation methods
  const goToNext = () => setActiveIndex((prev) => (prev + 1) % cards.length);
  const goToPrev = () => setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  const goToIndex = (index) => setActiveIndex(index);
  
  // Touch handlers
  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext();
      else goToPrev();
    }
  };
  
  // Calculate card positions
  const getCardStyle = (index) => {
    const isActive = index === activeIndex;
    const distance = ((index - activeIndex + cards.length) % cards.length);
    let adjustedDistance = distance;
    if (distance > cards.length / 2) adjustedDistance = distance - cards.length;
    
    const x = adjustedDistance * (cardWidth + gap);
    const scale = isActive ? 1 : 0.85 - Math.min(Math.abs(adjustedDistance), 2) * 0.05;
    const zIndex = cards.length - Math.abs(adjustedDistance);
    const opacity = 1 - Math.min(Math.abs(adjustedDistance) * 0.25, 0.6);
    
    // Apply mouse position effect only to active card
    let rotateY = 0;
    let rotateX = 0;
    let translateZ = 0;
    
    if (isActive && isHovered) {
      rotateY = -mousePosition.x * maxRotation;
      rotateX = mousePosition.y * (maxRotation * 0.5);
      translateZ = 50;
    }
    
    return {
      x,
      scale,
      zIndex,
      opacity,
      rotateY,
      rotateX,
      translateZ,
    };
  };

  // Card layers for parallax effect
  const renderCardLayers = (card, index) => {
    const isActive = index === activeIndex;
    
    return (
      <div className="relative w-full h-full">
        {/* Background Layer */}
        <motion.div 
          className="absolute inset-0 rounded-2xl bg-card/60 backdrop-blur-sm overflow-hidden"
          style={{ 
            translateZ: isActive && isHovered ? -20 : 0,
            translateX: isActive && isHovered ? -mousePosition.x * 10 : 0,
            translateY: isActive && isHovered ? -mousePosition.y * 10 : 0,
          }}
        />
        
        {/* Content Layer */}
        <motion.div 
          className="absolute inset-0 p-6 flex flex-col justify-between z-10"
          style={{ 
            translateZ: isActive && isHovered ? 30 : 0,
            translateX: isActive && isHovered ? mousePosition.x * 15 : 0,
            translateY: isActive && isHovered ? mousePosition.y * 15 : 0,
          }}
        >
          {/* Card Header */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-1">{card.title}</h3>
          </div>
          
          {/* Card Content */}
          {card.imageUrl && (
            <motion.div 
              className="my-4 rounded-lg overflow-hidden"
              style={{ 
                translateZ: isActive && isHovered ? 60 : 0,
                translateX: isActive && isHovered ? mousePosition.x * 25 : 0,
                translateY: isActive && isHovered ? mousePosition.y * 25 : 0,
              }}
            >
              <img 
                src={card.imageUrl} 
                alt={card.title} 
                className="w-full h-48 object-cover" 
              />
            </motion.div>
          )}
          
          {/* Card Footer */}
          <div>
            <p className="text-muted-foreground text-sm mb-4 h-20">{card.description}</p>
            <Button
              variant="link"
              onClick={() => card.onAction && card.onAction()}
            >
              {card.actionLabel || 'Learn More'}
            </Button>
          </div>
        </motion.div>
        
        {/* Glass Reflection Effect */}
        <motion.div 
          className="absolute inset-0 rounded-2xl bg-white opacity-5"
          style={{ 
            background: isActive && isHovered 
              ? `linear-gradient(
                  ${135 + (mousePosition.y * 40)}deg, 
                  rgba(255,255,255,0.1) 0%, 
                  rgba(255,255,255,0.15) 50%, 
                  rgba(255,255,255,0) 50.1%
                )`
              : 'none',
            translateZ: isActive && isHovered ? 70 : 0,
          }}
        />
        
        {/* Card border */}
        <motion.div 
          className="absolute inset-0 rounded-2xl border border-border/50"
          style={{ 
            boxShadow: isActive && isHovered 
              ? `0 20px 25px -5px rgba(0, 0, 0, 0.4), 
                 0 10px 10px -5px rgba(0, 0, 0, 0.2),
                 inset 0 0 0 1px hsla(var(--primary), 0.5)`
              : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            translateZ: 10,
          }}
        />
      </div>
    );
  };

  return (
    <div className={`flex flex-col items-center justify-center ${backgroundColor}`}>
      <div 
        ref={carouselRef}
        className="relative w-full max-w-6xl mx-auto"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-label="Card Carousel"
        role="region"
        style={{ 
          perspective: `${perspective}px`,
          height: `${cardHeight + 100}px`
        }}
      >
        {/* Cards */}
        <div className="relative h-full flex items-center justify-center">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className="absolute rounded-2xl shadow-xl cursor-pointer"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={getCardStyle(index)}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 1
              }}
              onClick={() => goToIndex(index)}
              style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                transformStyle: 'preserve-3d',
              }}
              whileHover={{ scale: index === activeIndex ? 1.02 : undefined }}
              role="button"
              tabIndex={index === activeIndex ? 0 : -1}
              aria-label={`Card ${index + 1}: ${card.title}`}
              aria-current={index === activeIndex ? "true" : "false"}
            >
              {renderCardLayers(card, index)}
            </motion.div>
          ))}
        </div>
        
        {/* Navigation Controls */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 py-6">
          <div className="flex items-center gap-2">
            {cards.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-white w-6' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                onClick={() => goToIndex(index)}
                aria-label={`Go to card ${index + 1}`}
                aria-current={activeIndex === index ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxCardCarousel;
