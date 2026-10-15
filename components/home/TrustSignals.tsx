"use client";

import { useState } from 'react';
import Image from 'next/image';
import Marquee from "react-fast-marquee";
import ScrollReveal from '../ui/ScrollReveal';

export default function TrustSignals({certificate}:{certificate:any[]}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'right' | 'left'>('right');

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (animating || selectedIndex === null) return;
    setAnimating(true);
    setTimeout(() => {
      setSelectedIndex((prev) => (prev! + 1) % certificate.length);
      setAnimating(false);
    }, 200);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (animating || selectedIndex === null) return;
    setAnimating(true);
    setTimeout(() => {
      setSelectedIndex((prev) => (prev! - 1 + certificate.length) % certificate.length);
      setAnimating(false);
    }, 200);
  };

  return (
    <section id="downloads" className="relative bg-[var(--color-bg-grey)] py-20 px-10">
      {/* Decorative SVG Lines */}
      <div className="sticky top-0 left-0 w-full h-0 pointer-events-none z-0">
        <svg className="absolute top-[15vh] left-0 w-full h-[40px] opacity-20" viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 L800 0 L840 40 L1440 40" stroke="#FE0002" strokeWidth="2" fill="none" />
        </svg>
        <svg className="absolute top-[75vh] left-0 w-full h-[40px] opacity-20" viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40 L600 40 L640 0 L1440 0" stroke="#FE0002" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <ScrollReveal>
        <div className="max-w-[1440px] mx-auto text-center relative z-10">
          <h2 className="text-[3rem] md:text-[4rem] text-[#1C1C1C] font-bold uppercase tracking-tighter leading-none mb-16">Certified Excellence</h2>
        <Marquee speed={60} pauseOnHover={true} gradient={false} className="py-4">
          {certificate.map((cert, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4 mx-5 cursor-pointer group"
              onClick={() => setSelectedIndex(index)}
            >
              <div className="relative w-[250px] h-[350px] rounded-[var(--radius-light)] overflow-hidden border border-[#eaeaea] bg-white group-hover:shadow-xl group-hover:border-[#FE0002] transition-all duration-300">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain p-2"
                />
              </div>
              <span className="text-[#1C1C1C] font-medium text-lg text-center max-w-[250px]">
                {cert.title}
              </span>
            </div>
          ))}
          </Marquee>
        </div>
      </ScrollReveal>

      {/* Folder Style Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm">
          {/* Overlay to close */}
          <div className="absolute inset-0" onClick={() => setSelectedIndex(null)}></div>

          {/* Folder Container */}
          <div className="relative w-full max-w-[400px] md:max-w-[450px] z-10">
            {/* Slanted Step Tab */}
            <div
              className="w-[90%] h-[45px] bg-[#1C1C1C] rounded-tl-xl relative flex justify-between items-center px-6 pr-12 border-t border-l border-gray-800"
              style={{ clipPath: 'polygon(0 0, calc(100% - 35px) 0, 100% 100%, 0 100%)' }}
            >
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Certificate</span>
              {/* Close Button on the step */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="text-gray-400 hover:text-[#FE0002] transition-colors p-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Main Content Area */}
            <div className="relative w-full aspect-[1/1.3] max-h-[85vh] bg-[#1C1C1C] rounded-b-xl rounded-tr-xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center p-4 md:p-6 border-b border-l border-r border-t border-gray-800">

              {/* Slider Controls */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 bg-[#121212] hover:bg-[#FE0002] text-white p-3 rounded-full transition-colors z-20 shadow-xl border border-gray-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 bg-[#121212] hover:bg-[#FE0002] text-white p-3 rounded-full transition-colors z-20 shadow-xl border border-gray-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>

              {/* Stacked Papers (Certificates) */}
              <div className="relative w-full h-full mt-2">
                {/* Bottom Paper */}
                <div className="absolute inset-0 bg-white rounded shadow-sm border border-gray-300 transform -rotate-3 scale-[0.96] translate-y-3 opacity-30"></div>
                {/* Middle Paper */}
                <div className="absolute inset-0 bg-white rounded shadow-sm border border-gray-300 transform rotate-2 scale-[0.98] translate-x-2 translate-y-1 opacity-70"></div>

                {/* Top Paper (Active Certificate) */}
                <div
                  className={`relative w-full h-full bg-white rounded shadow-lg overflow-hidden p-2 border border-gray-100 z-10 transition-all duration-200 ease-in-out ${animating
                    ? 'opacity-0 scale-95'
                    : 'opacity-100 scale-100'
                    }`}
                >
                  <Image
                    src={certificate[selectedIndex].image}
                    alt={certificate[selectedIndex].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Title Label */}
              <div className="absolute bottom-4 left-0 w-full text-center pointer-events-none z-20">
                <span className="text-white font-medium tracking-wide bg-black/60 backdrop-blur px-6 py-2 rounded-full text-sm shadow-lg">
                  {certificate[selectedIndex].title}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
