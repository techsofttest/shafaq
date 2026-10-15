"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Hero({hero}:{hero:any[]}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % hero.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? hero.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % hero.length);
  };

  return (
    <section id="home" className="relative w-full h-[calc(100vh-96px)] md:h-[70vh] min-h-[500px] bg-black flex items-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        {hero.map((slide, index) => (
          <Image
            key={index}
            src={slide?.image || ""}
            alt="Shafaq Al Group Facility"
            fill
            sizes="100vw"
            quality={90}
            className={`object-cover object-center transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            priority={index === 0}
          />
))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/80 via-[#121212]/50  via-[#121212]/5 to-transparent"></div>
        <div className="absolute inset-0 bg-black/40 md:bg-transparent"></div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-10 relative z-10">
        <div className="grid">
          {hero.map((slide, index) => (
             <div
              key={index}
              className={`col-start-1 row-start-1 max-w-[700px] pt-10 pb-16 transition-all duration-1000 ease-in-out ${index === currentIndex
                ? 'opacity-100 translate-y-0 pointer-events-auto z-10'
                : 'opacity-0 translate-y-8 pointer-events-none z-0'
                }`}
            >
              {/* Reduced subtitle from text-base/md:text-lg to text-sm/md:text-base */}
              <p className="text-white font-bold tracking-widest uppercase mb-3 text-sm md:text-base">
                {slide.subtitle}
              </p>

              {/* Reduced title from 3.5rem/5rem to 2.75rem/4rem */}
              <h1 className="text-[2.75rem] md:text-[4rem] mb-4 text-white leading-none tracking-tighter whitespace-pre-line">
                {slide.title}
              </h1>

              {/* Reduced description from text-base/md:text-lg to text-sm/md:text-base */}
              <div className="text-sm md:text-base mb-8 text-white max-w-[600px] leading-relaxed" dangerouslySetInnerHTML={{__html:slide.content}} />

              {/* Reduced button text to text-sm */}
              <a href={slide.ctaLink} className="inline-block bg-[var(--color-button-blue)] text-white text-sm font-bold px-7 py-3 uppercase tracking-wider hover:bg-[var(--color-button-blue-hover)] transition-colors">
                {slide.ctaText}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Section Separator */}
      <div className="absolute bottom-0 right-0 w-full h-[60px] md:h-[90px] z-10 pointer-events-none">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0 100 L75 100 L80 0 L100 0 L100 100 Z" fill="#121212" />
          <path d="M75 100 L80 0 L100 0" fill="none" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-0 right-5 md:right-[4%] flex z-20">
        <button
          onClick={handlePrev}
          className="w-12 h-12 md:w-14 md:h-14 bg-[var(--color-button-blue)] hover:bg-[var(--color-button-blue-hover)] flex items-center justify-center text-white transition-colors border-r border-white/20"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button
          onClick={handleNext}
          className="w-12 h-12 md:w-14 md:h-14 bg-[var(--color-button-blue)] hover:bg-[var(--color-button-blue-hover)] flex items-center justify-center text-white transition-colors"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </section>
  );
}
