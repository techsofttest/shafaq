"use client";

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import ScrollReveal from '../ui/ScrollReveal';

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

interface AboutData{
  about?:{
    title:string;
    image:string;
    content:string;
    detail:{
    title:string;
    icon:string;
    option:string;
  }[];
  matrix:{
    title:string;
    icon:string;
    description:string;
  }[];
  };
}

export default function CompanyProfile({about}:AboutData) {
  const stats = [
    { label: '15+', sub: 'YEARS EXPERIENCE', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
    { label: '500 + ', sub: 'PROJECTS COMPLETED', icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' },
    { label: '45,000+', sub: 'TONS FABRICATED', icon: 'M2 12h20M12 2v20' },
    { label: '100%', sub: 'QHSE COMMITMENT', icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' }
  ];

  return (
    <section id="company-profile" className="bg-white text-[#121212] py-24 px-6 md:px-12 relative">
      <ScrollReveal>
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

            {/* Left Column: Featured Image Display (Full height) */}
            <div className="lg:col-span-5 relative w-full min-h-[750px]">
              <Image
                src={about?.image ?? "/about-page/company-profile/c1.png"}
                alt={about?.title || ""}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Right Column: Heading & Text */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <h2 className="text-[2.5rem] sm:text-[3.5rem] leading-none font-bold uppercase text-[#121212] tracking-tighter mb-8">
                  {about?.title}
                </h2>

                {/* Key Highlights Clean Badges (With Icons) */}
                <div className="space-y-6 my-18 grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {about?.detail.map((stat, idx) => (
                  <div key={idx}>
                    <div className="mb-3 text-gray-700  [&_svg]:stroke-[1.75]" dangerouslySetInnerHTML={{ __html: stat.icon || "" }}/>
                    <span className="block text-2xl font-bold text-[#121212]">{stat.title}</span>
                    <span className="text-xs text-gray-900 uppercase tracking-wider">{stat.option}</span>
                  </div>))}
                  
                </div>

                <div className="text-gray-700 text-lg leading-relaxed font-normal w-full md:w-[90%] [&_p_strong]:text-black [&_p_strong]:font-bold" dangerouslySetInnerHTML={{__html:about?.content ?? ""}} />

              </div>
            </div>

          </div>

          {/* Animated Statistics Counter Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-200 pt-12 mt-16">
            {about?.matrix.map((stat, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-12 h-12 flex-shrink-0 border border-[#121212] rounded-sm flex items-center justify-center text-[#121212]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={stat.icon}></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#121212] text-2xl md:text-3xl font-bold leading-none mb-1">
                    <AnimatedNumber value={stat.title} />
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm font-bold tracking-widest uppercase">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </ScrollReveal>
    </section>
  );
}
