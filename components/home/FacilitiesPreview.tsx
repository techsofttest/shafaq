"use client";

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from '../ui/ScrollReveal';

export default function FacilitiesPreview() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const media = [
    { type: 'video', src: '/about/carousel/banner.mp4' },
    { type: 'image', src: '/about/carousel/c1.png' },
    { type: 'image', src: '/about/carousel/c4.png' },
    { type: 'image', src: '/about/carousel/c3.png' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % media.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="facility" className="w-full relative py-24">
      <ScrollReveal>
        <div className="max-w-[1440px] mx-auto px-10">
        <div ref={ref} className="w-full relative min-h-[400px] md:min-h-[500px] rounded-sm overflow-hidden flex items-center justify-center">
          {/* Background Carousel */}
          <motion.div style={{ y }} className="absolute inset-0 w-full h-[130%] -top-[15%] z-0">
            {media.map((item, i) => (
              <div key={item.src} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                {item.type === 'image' ? (
                  <Image
                    src={item.src}
                    alt={`Facility ${i + 1}`}
                    fill sizes="100vw"
                    className={`object-cover transition-transform duration-[4000ms] ease-linear ${i === currentIndex ? 'scale-110' : 'scale-100'}`}
                  />
                ) : (
                  <video
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>
            ))}
          </motion.div>
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/40 z-10" />

          {/* Overlay Content */}
          <div className="relative z-10 w-full text-center px-6 py-16">
            <h2 className="text-xl md:text-2xl lg:text-5xl text-white font-bold uppercase leading-none tracking-tighter">
              We Thrive On <span className="text-[var(--color-primary)] block">Impossible</span>
            </h2>
          </div>
        </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
