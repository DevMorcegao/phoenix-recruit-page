"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function BackgroundNarrative() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  
  // Generate particles - always generate them, but only render when mounted
  const [fireParticles] = useState(() => 
    Array.from({ length: 30 }, () => ({
      left: Math.random() * 100,
      bottom: Math.random() * 30, // Start from bottom 30%
      size: 2 + Math.random() * 4, // 2-6px
      duration: 8 + Math.random() * 12, // 8-20s
      delay: Math.random() * 8,
      brightness: 0.6 + Math.random() * 0.4, // 0.6-1.0,
    }))
  );

  const [smokeParticles] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      left: i * 12.5, // Distribute evenly
      size: 300 + Math.random() * 200, // 300-500px
      duration: 15 + Math.random() * 10, // 15-25s
      delay: i * 2,
    }))
  );

  useEffect(() => {
    // Set mounted to true after hydration (in setTimeout to avoid cascading renders)
    const timer = setTimeout(() => setIsMounted(true), 0);
    
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate layer opacities based on scroll with smooth, overlapping transitions
  // Phoenix: Hard cutoff to prevent flash
  const phoenixOpacity = scrollProgress < 0.13 ? 0 : 0;
  
  // Smoke: Gradual fade in and out for smooth transitions
  const smokeOpacity = scrollProgress > 0.15 && scrollProgress < 0.75 
    ? Math.min(1, (scrollProgress - 0.15) / 0.1) * Math.max(0, 1 - (scrollProgress - 0.65) / 0.1)
    : 0;
  
  // Sky: Gradual fade in, overlaps with smoke
  const skyOpacity = scrollProgress > 0.50 
    ? Math.min(1, (scrollProgress - 0.50) / 0.15) 
    : 0;
  
  // Battlefield: Starts after Oath (0.65), gradual fade in, overlaps with sky
  const battlefieldOpacity = scrollProgress > 0.65 
    ? Math.min(1, (scrollProgress - 0.65) / 0.15) 
    : 0;
  
  const emberOpacity = scrollProgress > 0.2 ? 1 : 0;
  
  // Progressive darkening overlays for each section
  const historyDarkness = scrollProgress > 0.13 && scrollProgress < 0.35 ? 0.85 : 0;
  const achievementsDarkness = scrollProgress > 0.35 && scrollProgress < 0.55 ? 0.25 : 0;
  const oathDarkness = scrollProgress > 0.55 && scrollProgress < 0.75 ? 0.35 : 0;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -10 }}>
      {/* Base void background */}
      <div className="absolute inset-0 bg-void" />

      {/* Layer 1: Phoenix Flames (Hero Section) */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: phoenixOpacity }}
      >
        {/* Phoenix Image with dramatic glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-fire-orange/20 via-magma/30 to-void">
          <Image 
            src="/hero_phoenix.png" 
            alt="" 
            fill
            className="object-cover opacity-70"
          />
          {/* Golden glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-gold/10 via-transparent to-transparent" />
        </div>

        {/* Ascending fire particles (Hero) */}
        <div className="absolute inset-0">
          {isMounted && fireParticles.slice(0, 15).map((particle, i) => (
            <div
              key={`hero-${i}`}
              className="absolute rounded-full bg-fire-orange blur-sm"
              style={{
                left: `${particle.left}%`,
                bottom: `${particle.bottom}%`,
                width: `${particle.size * 1.5}px`,
                height: `${particle.size * 1.5}px`,
                animation: `rise ${particle.duration}s linear infinite, float ${particle.duration * 0.5}s ease-in-out infinite`,
                animationDelay: `${particle.delay}s`,
                boxShadow: `0 0 ${particle.size * 3}px rgba(255, 69, 0, ${particle.brightness})`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Layer 2: Dramatic Smoke Clouds (Middle Sections) */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: smokeOpacity }}
      >
        {/* Strong gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-fire-orange/15 via-magma/25 to-magma/15" />
        
        {/* Dense smoke clouds */}
        <div className="absolute inset-0">
          {isMounted && smokeParticles.map((smoke, i) => (
            <div
              key={`smoke-${i}`}
              className="absolute rounded-full blur-3xl"
              style={{
                left: `${smoke.left}%`,
                top: `${20 + (i % 3) * 20}%`,
                width: `${smoke.size}px`,
                height: `${smoke.size}px`,
                background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(139,0,0,0.1) 50%, transparent 100%)',
                animation: `float ${smoke.duration}s ease-in-out infinite`,
                animationDelay: `${smoke.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Floating embers (medium) */}
        <div className="absolute inset-0">
          {isMounted && fireParticles.slice(10, 25).map((particle, i) => (
            <div
              key={`mid-${i}`}
              className="absolute rounded-full bg-gold blur-sm"
              style={{
                left: `${particle.left}%`,
                bottom: `${particle.bottom}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animation: `rise ${particle.duration}s linear infinite, float ${particle.duration * 0.5}s ease-in-out infinite`,
                animationDelay: `${particle.delay}s`,
                boxShadow: `0 0 ${particle.size * 2}px rgba(255, 215, 0, ${particle.brightness * 0.6})`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Layer 3: Sky on Fire (Form Section) */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: skyOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-magma/30 via-fire-orange/20 to-fire-orange/30" />
      </div>

      {/* Layer 4: Battlefield Ground (Footer) */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[1100px] transition-opacity duration-1000"
        style={{ opacity: battlefieldOpacity }}
      >
        {/* Battlefield image - VERY VISIBLE with full castle */}
        <Image 
          src="/battlefield.png" 
          alt="" 
          fill
          className="object-cover object-center opacity-40"
        />
        
        {/* Subtle gradient to blend with content */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-void/60" />
        
        {/* Fire glow at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-fire-orange/20 to-transparent" />
      </div>

      {/* Ember particles throughout (always visible after scroll) */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: emberOpacity }}
      >
        <div className="absolute inset-0">
          {isMounted && fireParticles.map((particle, i) => (
            <div
              key={`ember-${i}`}
              className="absolute rounded-full bg-fire-orange"
              style={{
                left: `${particle.left}%`,
                bottom: `${particle.bottom}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animation: `rise ${particle.duration}s linear infinite, float ${particle.duration * 0.5}s ease-in-out infinite`,
                animationDelay: `${particle.delay}s`,
                boxShadow: `0 0 ${particle.size * 2}px rgba(255, 69, 0, ${particle.brightness * 0.5})`,
                filter: 'blur(1px)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Progressive darkening overlays for sections */}
      <div 
        className="absolute inset-0 bg-void transition-opacity duration-1000 pointer-events-none"
        style={{ opacity: historyDarkness }}
      />
      <div 
        className="absolute inset-0 bg-void transition-opacity duration-1000 pointer-events-none"
        style={{ opacity: achievementsDarkness }}
      />
      <div 
        className="absolute inset-0 bg-void transition-opacity duration-1000 pointer-events-none"
        style={{ opacity: oathDarkness }}
      />
    </div>
  );
}
