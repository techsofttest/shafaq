"use client";

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback } from 'react';
import ScrollReveal from '../ui/ScrollReveal';

export default function ProjectsGallery({project,promain}:{project:any[],promain:any}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: 'start', loop: true, dragFree: true },
    [Autoplay({ delay: 3000, stopOnInteraction: true })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="project" className="bg-[#121212] pt-32 pb-40">
      <ScrollReveal>
        <div className="text-center mb-16 px-10 max-w-[1440px] mx-auto">
          <h2 className="text-[3rem] md:text-[4rem] text-white font-bold uppercase tracking-tighter leading-none mb-6">{promain?.title}</h2>
          <div className="text-gray-100 max-w-2xl mx-auto mb-10 text-lg leading-relaxed" dangerouslySetInnerHTML={{__html:promain?.content ?? ""}} />
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/projects/completed" className="inline-block bg-[var(--color-button-blue)] text-white px-8 py-3 hover:bg-[var(--color-button-blue-hover)] transition-colors uppercase text-base font-bold tracking-wider w-full sm:w-auto">
              See Completed Works
            </a>
            <a href="/projects/ongoing" className="inline-block border border-white text-white px-8 py-3 hover:bg-white hover:text-black transition-colors uppercase text-base font-bold tracking-wider w-full sm:w-auto">
              See Ongoing Works
            </a>
          </div>
        </div>

        <div className="relative w-full max-w-[1920px] mx-auto">
          {/* Carousel Arrows */}
          <button onClick={scrollPrev} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 hover:bg-black/80 flex items-center justify-center text-white transition-colors" aria-label="Previous Project">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button onClick={scrollNext} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 hover:bg-black/80 flex items-center justify-center text-white transition-colors" aria-label="Next Project">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <div className="overflow-hidden w-full" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {project.map((project, index) => (
                <div key={index} className="relative flex-[0_0_100%] md:flex-[0_0_50%] xl:flex-[0_0_25%] min-w-0 aspect-square group cursor-pointer overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`Project ${index + 1}`}
                    fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-8 left-8 flex items-center gap-4">
                    <span className="text-white text-base font-semibold"> {String(index + 1).padStart(2, "0")}</span>
                    <h3 className="text-white text-lg font-sans font-semibold tracking-wide normal-case">
                      {project.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}