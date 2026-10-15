"use client";

import Image from 'next/image';
import Marquee from "react-fast-marquee";
import ScrollReveal from '../ui/ScrollReveal';

export default function OurClients({client}:{client:any[]}) {
  const clients = Array.from({ length: 9 }, (_, i) => `/client/clt-logo${i + 1}.png`);

  return (
    <section className="relative overflow-hidden py-24 px-10 bg-white">
      <ScrollReveal>
        <div className="max-w-[1440px] mx-auto text-center relative z-10">
        <h2 className="text-[3rem] md:text-[4rem] text-[#1C1C1C] font-bold uppercase tracking-tighter leading-none mb-16">Our Clients</h2>
        <Marquee speed={40} pauseOnHover={true} gradient={false} direction="right" className="py-4">
          {clients.map((src, index) => (
            <div
              key={index}
              className="mx-8 relative w-[120px] h-[80px] md:w-[150px] md:h-[100px] grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={src}
                alt={`Client ${index + 1}`}
                fill
                sizes="180px"
                className="object-contain"
              />
            </div>
          ))}
        </Marquee>
        </div>
      </ScrollReveal>
    </section>
  );
}
