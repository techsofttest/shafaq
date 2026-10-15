"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import ScrollReveal from '../ui/ScrollReveal';

interface ProductServiceItem{
  id:string;
    slug: string;
    title: string;
    content: string;
    image: string[];
}
function ProductCard({ product }:{product:ProductServiceItem}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (product.image.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % product.image.length);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [product.image.length]);

  return (
    <Link href={`/products-services/${product.slug}`} className="group relative aspect-video flex flex-col justify-end p-8 overflow-hidden cursor-pointer block w-full">
      <div className="absolute inset-0 z-0">
        {product.image.map((src: string, i: number) => (
          <Image
            key={i}
            src={src}
            alt={`${product.title} ${i + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-all duration-1000 group-hover:scale-105 ${i === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 group-hover:from-black/70 transition-all duration-700"></div>

      <div className="relative z-20 mt-auto transition-transform duration-500 group-hover:-translate-y-[90px] md:group-hover:-translate-y-[110px]">
        <div className="flex items-center gap-4">
          <span className="text-white text-base font-bold tracking-widest block">{product.id}</span>
          <h3 className="text-xl md:text-2xl lg:text-3xl text-white font-bold uppercase">{product.title}</h3>
        </div>
      </div>

      {/* Sliding Red Description Box */}
      <div className="absolute -bottom-px left-0 w-full bg-[#FE0002] px-8 py-6 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 z-30 min-h-[90px] md:min-h-[110px] flex items-center justify-between">
        <div className="text-white text-sm md:text-base leading-relaxed pr-4" dangerouslySetInnerHTML={{__html:product.content || ""}} />
      </div>

      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FE0002] transition-colors duration-500 z-40 pointer-events-none"></div>
    </Link>
  );
}

export default function OtherServicesCarousel({services,}:{services:ProductServiceItem[]}) {

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: 'start', loop: true, slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);


  return (
    <section className="bg-white py-20 px-6 md:px-12 border-t border-gray-200 relative z-10">
      <ScrollReveal>
        <div className="max-w-[1440px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#121212] font-bold uppercase tracking-tight">
                OTHER PRODUCTS & SERVICES
              </h2>
            </div>

            {/* Carousel Arrow Controls */}
            <div className="flex gap-3">
              <button
                onClick={scrollPrev}
                aria-label="Previous service"
                className="w-12 h-12 flex items-center justify-center border border-gray-300 text-[#121212] hover:border-[var(--color-button-blue)] hover:bg-[var(--color-button-blue)] hover:text-white transition-all rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={scrollNext}
                aria-label="Next service"
                className="w-12 h-12 flex items-center justify-center border border-gray-300 text-[#121212] hover:border-[var(--color-button-blue)] hover:bg-[var(--color-button-blue)] hover:text-white transition-all rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Embla Carousel viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y -ml-6">
              {services.map((service,idx) => (
                <div key={service.slug} className="flex-[0_0_100%] md:flex-[0_0_50%] min-w-0 pl-6">
                  <ProductCard product={service}  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
