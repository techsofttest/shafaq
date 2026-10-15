"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutHero({about}:{about:any}) {
  return (
    <section className="relative pt-16 px-6 bg-[#121212] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <svg className="absolute top-[15vh] left-0 w-full h-[40px] opacity-20" viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 L800 0 L840 40 L1440 40" stroke="#FE0002" strokeWidth="2" fill="none" />
        </svg>
        <svg className="absolute top-[35vh] left-0 w-full h-[40px] opacity-20" viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40 L600 40 L640 0 L1440 0" stroke="#FE0002" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto relative z-20">

        {/* Title & Description Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-12"
        >
          <div className="md:w-1/2">
            <h1 className="text-[3.2rem] sm:text-[4.5rem] md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-none text-white text-left">
              {about?.title || ""}
            </h1>
          </div>
          <div className="md:w-1/2 flex md:justify-end">
            <div className="text-gray-300 text-lg md:text-xl font-light leading-relaxed text-left md:text-right max-w-lg" dangerouslySetInnerHTML={{__html:about.content || ""}} />
          </div>
        </motion.div>

        {/* Image Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-sm overflow-hidden mb-12"
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="w-full h-full relative"
          >
            <Image
              src={ about.image ||"/about/b3.png"}
              alt={about.title || ""}
              fill
              priority
              sizes="100vw"
              quality={90}
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/10 z-10" />
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-6 md:bottom-10 left-0 right-0 z-20 flex flex-wrap justify-center gap-4 px-4"
          >
            <a
              href="#company-profile"
              className="bg-[#FE0002] hover:bg-red-700 text-white font-bold uppercase tracking-wider text-sm px-6 md:px-8 py-3 md:py-3.5 transition-colors shadow-lg text-center"
            >
              Our Profile
            </a>
            <a
              href="#org-structure"
              className="bg-black/30 backdrop-blur-sm border border-white hover:bg-white hover:text-black text-white font-bold uppercase tracking-wider text-sm px-6 md:px-8 py-3 md:py-3.5 transition-colors text-center"
            >
              Organization Chart
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
