"use client";

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback } from 'react';
import ScrollReveal from '../ui/ScrollReveal';

export default function ProjectsCarousel({ projects }: { projects: any[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: 'start', loop: true, slidesToScroll: 1 },
    [Autoplay({ delay: 3500, stopOnInteraction: true })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative mb-24">
      <ScrollReveal>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y -ml-4">
          {projects.map((project, index) => (
            <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] min-w-0 pl-4">
              <div className="relative aspect-video group overflow-hidden bg-[#1a1a1a]">
                <Image
                  src={project.src}
                  alt={project.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80"></div>
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4 z-10">
                  <span className="text-white text-base font-semibold">0{index + 1}</span>
                  <h3 className="text-white text-lg font-sans font-semibold tracking-wide normal-case">
                    {project.label}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-8 justify-center">
        <button onClick={scrollPrev} className="w-12 h-12 flex items-center justify-center border border-white text-white hover:bg-white hover:text-black transition-colors rounded-full">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <button onClick={scrollNext} className="w-12 h-12 flex items-center justify-center border border-white text-white hover:bg-white hover:text-black transition-colors rounded-full">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>
      </ScrollReveal>
    </div>
  );
}
