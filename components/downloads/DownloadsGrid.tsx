"use client";

import { useState } from 'react';
import Image from 'next/image';
import ScrollReveal from '../ui/ScrollReveal';
import CertificateModal, { Certificate } from './CertificateModal';

export default function DownloadsGrid({download}:{download:any[]}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  const certificates: Certificate[] = [
    {
      image: '/certificates/new/ISO 9001 - Shafaq Al Group United LLC-1.png',
      title: 'ISO 9001:2015',
      fileUrl: '/certificates/new/ISO 9001 - Shafaq Al Group United LLC.pdf',
      fileType: 'pdf',
    },
    {
      image: '/certificates/new/ISO 14001 - Shafaq Al Group United LLC-1.png',
      title: 'ISO 14001:2015',
      fileUrl: '/certificates/new/ISO 14001 - Shafaq Al Group United LLC.pdf',
      fileType: 'pdf',
    },
    {
      image: '/certificates/new/ISO 45001 - Shafaq Al Group United LLC-1.png',
      title: 'ISO 45001:2018',
      fileUrl: '/certificates/new/ISO 45001 - Shafaq Al Group United LLC.pdf',
      fileType: 'pdf',
    },
    {
      image: '/certificates/new/SHAFAQ_AL_GROUP_UNITED_LLC003-1.png',
      title: 'JSRS certificate',
      fileUrl: '/certificates/new/SHAFAQ_AL_GROUP_UNITED_LLC003.pdf',
      fileType: 'pdf',
    },
    {
      image: '/certificates/QC.png',
      title: 'QC',
      fileUrl: '/certificates/QC.png',
      fileType: 'image',
    },
    {
      image: '/certificates/SAG-VAT.png',
      title: 'SAG-VAT',
      fileUrl: '/certificates/SAG-VAT.png',
      fileType: 'image',
    },
    {
      image: '/certificates/CHAMBER OF COMMERCE.png',
      title: 'Chamber of Commerce',
      fileUrl: '/certificates/CHAMBER OF COMMERCE.png',
      fileType: 'image',
    }
  ];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (animating || selectedIndex === null) return;
    setAnimating(true);
    setTimeout(() => {
      setSelectedIndex((prev) => (prev! + 1) % download.length);
      setAnimating(false);
    }, 200);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (animating || selectedIndex === null) return;
    setAnimating(true);
    setTimeout(() => {
      setSelectedIndex((prev) => (prev! - 1 + download.length) % download.length);
      setAnimating(false);
    }, 200);
  };

  return (
    <section id="certificates" className="bg-[var(--color-bg-grey)] py-28 px-6 md:px-12 relative">
      <ScrollReveal>
        <div className="max-w-[1440px] mx-auto text-center relative z-10">
          <h2 className="text-[3rem] md:text-[4rem] text-[#1C1C1C] font-bold uppercase tracking-tighter leading-none mb-16">
            Certified Excellence
          </h2>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {download?.map((cert, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-4 cursor-pointer group"
                onClick={() => setSelectedIndex(index)}
              >
                <div className="relative w-full aspect-[250/350] max-w-[280px] rounded-[var(--radius-light)] overflow-hidden border border-[#eaeaea] bg-white group-hover:shadow-xl group-hover:border-[#FE0002] transition-all duration-300">
                  <Image
                    src={cert.image || ""}
                    alt={cert.title || ""}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-4"
                  />
                </div>
                <span className="text-[#1C1C1C] font-medium text-lg text-center max-w-[250px]">
                  {cert.title || ""}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Extracted Certificate Modal Component */}
      <CertificateModal
        selectedIndex={selectedIndex}
        certificates={download}
        onClose={() => setSelectedIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
        animating={animating}
      />
    </section>
  );
}
