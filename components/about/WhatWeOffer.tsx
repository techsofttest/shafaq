"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../ui/ScrollReveal';
import { off } from 'process';

interface OfferData{
     offer?:{
    title:string;
    image:string;
    content:string;
  };
  offer1?:{
    subtitle:string;
    title:string;
    image:string;
      detail:{
    title:string;
    option:string;
    description:string;
  }[];
    content:string;
  };
  offer2?:{
    title:string;
    subtitle:string;
    image:string;
      detail:{
    title:string;
    option:string;
    description:string;
  }[];
    content:string;
  };
}

export default function WhatWeOffer({offer,offer1,offer2}:OfferData) {
  const [activeOfferModal, setActiveOfferModal] = useState<string | null>(null);

  return (
    <section id="offers" className="bg-white text-[#121212] py-28 px-6 md:px-12">
      <ScrollReveal>
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[2.8rem] md:text-[4rem] text-[#121212] font-bold uppercase tracking-tighter leading-none mt-2">
             {offer?.title || ""}
            </h2>
            <div className="text-gray-600 max-w-2xl mx-auto mt-4 text-base md:text-lg" dangerouslySetInnerHTML={{__html:offer?.content || ""}} />
          </div>

          {/* Offer Cards */}
          <div className="flex flex-col md:flex-row gap-8 items-stretch w-full">

            {/* Card 1: Steel Fabrication */}
            <div className="w-full bg-white flex flex-col justify-between group md:flex-1">
              <div>
                <div className="relative w-full h-48 sm:h-56 mb-6 overflow-hidden">
                  <Image
                    src={offer1?.image || ""}
                    alt={offer1?.title || ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#121212] mb-4">
                  {offer1?.title || ""}
                </h3>
                <div className="text-gray-600 text-base leading-relaxed mb-6" dangerouslySetInnerHTML={{__html:offer1?.content ?? ""}} />
              </div>
              <button
                onClick={() => setActiveOfferModal("steel-fabrication")}
                className="inline-flex items-center gap-3 bg-[var(--color-button-blue)] text-white hover:bg-[var(--color-button-blue-hover)] px-7 hover:px-9 py-3 transition-all duration-300 uppercase text-xs font-bold tracking-wider w-fit group/btn"
              >
                Read More
                <svg className="transition-transform duration-300 group-hover/btn:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>

            {/* Card 2: Project Management */}
            <div className="w-full bg-white flex flex-col justify-between group md:flex-1">
              <div>
                <div className="relative w-full h-48 sm:h-56 mb-6 overflow-hidden">
                  <Image
                    src={offer2?.image || ""}
                    alt={offer2?.title || ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#121212] mb-4">
                  {offer2?.title || ""}
                </h3>
                <div className="text-gray-600 text-base leading-relaxed mb-6" dangerouslySetInnerHTML={{__html:offer2?.content ?? ""}} />
              </div>
              <button
                onClick={() => setActiveOfferModal("project-management")}
                className="inline-flex items-center gap-3 bg-[#121212] text-white hover:bg-black px-7 hover:px-9 py-3 transition-all duration-300 uppercase text-xs font-bold tracking-wider w-fit group/btn"
              >
                Read More
                <svg className="transition-transform duration-300 group-hover/btn:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>

          </div>
        </div>
      </ScrollReveal>

      {/* Modal for Read More Details */}
      <AnimatePresence>
        {activeOfferModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white text-[#121212] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
            >
              <button
                onClick={() => setActiveOfferModal(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              {activeOfferModal === "steel-fabrication" && (
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold uppercase text-[#121212] mb-2">{offer1?.title || ""}</h3>
                  <p className="text-gray-500 text-sm mb-6">{offer1?.subtitle || ""}</p>

                  <div className="text-gray-700 text-base leading-relaxed mb-6" dangerouslySetInnerHTML={{__html:offer1?.content ?? ""}}/>

                  <h4 className="text-[#121212] font-bold uppercase text-sm mb-4 border-b border-gray-200 pb-2">Key Fabrication Capabilities:</h4>
                  <ul className="space-y-3 mb-8 text-gray-700 text-sm">
                    {offer1?.detail.map((cap, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-[#FE0002] font-bold">✓</span>
                        <span>{cap.title}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setActiveOfferModal(null)}
                    className="w-full bg-[#FE0002] text-white uppercase text-xs font-bold tracking-wider py-3 hover:bg-red-700 transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              )}

              {activeOfferModal === "project-management" && (
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold uppercase text-[#121212] mb-2">{offer2?.title || ""}</h3>
                  <p className="text-gray-500 text-sm mb-6">{offer2?.subtitle || ""}</p>

                  <div className="text-gray-700 text-base leading-relaxed mb-6" dangerouslySetInnerHTML={{__html:offer2?.content ?? ""}} />

                  <h4 className="text-[#121212] font-bold uppercase text-sm mb-4 border-b border-gray-200 pb-2">Project Execution Framework:</h4>
                  <ul className="space-y-3 mb-8 text-gray-700 text-sm">
                    {offer2?.detail.map((cap, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-[var(--color-button-blue)] font-bold">✓</span>
                        <span>{cap.title}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setActiveOfferModal(null)}
                    className="w-full bg-[var(--color-button-blue)] text-white uppercase text-xs font-bold tracking-wider py-3 hover:bg-blue-700 transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
