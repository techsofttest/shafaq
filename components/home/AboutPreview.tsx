"use client";

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import ScrollReveal from '../ui/ScrollReveal';
interface ProductResponse {
page:{title: string;
  image: string;
content: string;
detail:{
  title:string;
  icon:string;
  description:string;
}[];}|undefined;
}
function AnimatedNumber({ value }: { value: string }) {
  const numMatch = value.match(/[\d,]+/);
  if (!numMatch) return <span>{value}</span>;

  const rawNum = numMatch[0].replace(/,/g, '');
  const targetNum = parseInt(rawNum, 10);
  const suffix = value.replace(numMatch[0], '');

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const spring = useSpring(0, { duration: 2500, bounce: 0 });

  useEffect(() => {
    if (isInView) {
      spring.set(targetNum);
    }
  }, [isInView, spring, targetNum]);

  const display = useTransform(spring, (current) => {
    const rounded = Math.round(current);
    if (value.includes(',')) {
      return rounded.toLocaleString() + suffix;
    }
    return rounded + suffix;
  });

  return <motion.span ref={ref}>{display}</motion.span>;
}

export default function AboutPreview({page}:ProductResponse) {
  const stats = [
    { label: '15+', sub: 'YEARS EXPERIENCE', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
    { label: '500 + ', sub: 'PROJECTS COMPLETED', icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' },
    { label: '45,000+', sub: 'TONS FABRICATED', icon: 'M2 12h20M12 2v20' },
    { label: '100%', sub: 'QHSE COMMITMENT', icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' }
  ];

  return (
    <section className="bg-[#121212] pt-32 pb-24 px-10" id="about">
      <ScrollReveal>
        <div className="max-w-[1440px] mx-auto relative">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-10">
          <div className="lg:w-[40%]">
            <h2 className="text-[3rem] md:text-[4rem] leading-none text-white font-bold uppercase tracking-tighter">{page?.title}</h2>
          </div>
          <div className="lg:w-[50%] lg:pt-4">
            <div className="text-white text-lg mb-8 max-w-xl leading-relaxed" dangerouslySetInnerHTML={{__html:page?.content ?? ""}} />
            <a href="/about" className="inline-block border border-white text-white px-8 py-3 hover:bg-white hover:text-black transition-colors uppercase text-base font-bold tracking-wider">Read Our Story</a>
          </div>
        </div>

        <motion.div
          initial={{ scale: 0.7, borderRadius: "0rem" }}
          whileInView={{ scale: 1, borderRadius: "0rem" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-15%" }}
          className="w-full relative aspect-[21/9] md:aspect-[3/1] overflow-hidden mb-16"
        >
          <Image
            src={page?.image ?? ""}
            alt="Shafaq Al Group Fabrication Facility"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
          />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 border-t border-gray-800 pt-12">
          {page?.detail.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-12 h-12 flex-shrink-0 border border-white rounded-sm flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={stat.icon}></path>
                </svg>
              </div>
              <div>
                <h3 className="text-white text-2xl md:text-3xl font-bold leading-none mb-1">
                  <AnimatedNumber value={stat.title} />
                </h3>
                <p className="text-white text-base font-bold tracking-widest uppercase">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
