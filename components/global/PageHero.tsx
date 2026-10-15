"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  description: string;
  imageSrc?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
}

export default function PageHero({
  title,
  description,
  imageSrc = '/about/b3.png',
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section className="relative min-h-[75vh] flex items-center justify-center pt-32 pb-20 px-6 bg-[#121212] overflow-hidden">
      {/* Background Image with Slow Parallax/Zoom */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.08 }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="w-full h-full relative"
        >
          <Image
            src={imageSrc}
            alt={title}
            fill
            priority
            quality={90}
            className="object-cover object-center"
          />
        </motion.div>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from--black/10 via--black/80 to-black/80 z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-[1200px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-[3.2rem] sm:text-[4.5rem] md:text-7xl font-bold uppercase tracking-tighter leading-none text-white mb-6">
            {title}
          </h1>

          <div className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-8" dangerouslySetInnerHTML={{__html:description}}/>

          {(primaryCta || secondaryCta) && (
            <div className="flex flex-wrap justify-center gap-4">
              {primaryCta && (
                <a
                  href={primaryCta.href}
                  className="bg-[#FE0002] hover:bg-red-700 text-white font-bold uppercase tracking-wider text-sm px-8 py-3.5 transition-colors shadow-lg"
                >
                  {primaryCta.label}
                </a>
              )}
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className="border backdrop-blur-sm border-white hover:bg-white hover:text-black text-white font-bold uppercase tracking-wider text-sm px-8 py-3.5 transition-colors"
                >
                  {secondaryCta.label}
                </a>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
