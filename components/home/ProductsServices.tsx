"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import ScrollReveal from '../ui/ScrollReveal';

function ProductCard({ product ,index}: { product: any ,index: number; }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (product.image.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % product.image.length);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [product.image.length]);

  return (<Link href={`/products-services/${product.slug}`} className="group relative aspect-video flex flex-col justify-end p-8 overflow-hidden cursor-pointer block">
  <div className="absolute inset-0 z-0">
        {product.image.map((src: string, i: number) => (
          <Image
            key={i}
            src={src}
            alt={`${product.title} ${i + 1}`}
            fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-all duration-1000 group-hover:scale-105 ${i === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 group-hover:from-black/70 transition-all duration-700"></div>

      <div className="relative z-20 mt-auto transition-transform duration-500 group-hover:-translate-y-[90px] md:group-hover:-translate-y-[110px]">
        <div className="flex items-center gap-4">
          <span className="text-white text-base font-bold tracking-widest block"> {String(index).padStart(2, "0")}</span>
          <h3 className="text-xl md:text-2xl lg:text-3xl text-white font-bold uppercase">{product.title}</h3>
        </div>
      </div>

      {/* Sliding Red Description Box */}
      <div className="absolute -bottom-px left-0 w-full bg-[#FE0002] px-8 py-6 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 z-30 min-h-[90px] md:min-h-[110px] flex items-center">
        <div className="[&_p]:text-white [&_p]:text-sm [&_p]:md:text-base [&_p]:leading-relaxed"dangerouslySetInnerHTML={{__html:product.content}} />
      </div>

      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FE0002] transition-colors duration-500 z-40 pointer-events-none"></div>
    </Link>
  );
}

export default function ProductsServices({product,pro, hideHeader = false }: { hideHeader?: boolean, product:any[],pro:any}) {

  return (
    <section id="services" className="relative overflow-hidden bg-[var(--color-bg-grey)] py-32 px-10">
      {/* Fixed Background Logo using pure CSS */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.04] grayscale"
        style={{
          backgroundImage: "url('/logo/logo.png')",
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center 15vh',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'min(80vw, 500px)'
        }}
      ></div>

      <ScrollReveal>
        <div className="max-w-[1440px] mx-auto relative z-10"> {!hideHeader && (
          <div className="mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="max-w-2xl">
              <h2 className="text-[3rem] md:text-[4rem] text-[#1C1C1C] font-bold uppercase tracking-tighter leading-none mb-4">{pro?.title}</h2>
              <div className="text-gray-800 text-lg leading-relaxed" dangerouslySetInnerHTML={{__html:pro?.content ?? ""}}/>
            </div>
            <a href="/products-services" className="bg-[var(--color-button-blue)] text-white px-8 py-3 uppercase text-base font-bold tracking-wider hover:bg-[var(--color-button-blue-hover)] transition-colors whitespace-nowrap">View All Services</a>
          </div>)}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {product.map((product, index) => (
              <ProductCard key={index} product={product} index={index+1} />
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
