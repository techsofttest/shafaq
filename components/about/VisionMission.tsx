"use client";

import { useState } from 'react';
import ScrollReveal from '../ui/ScrollReveal';

interface VisionMission{
   vission?:{
    title:string;
    image:string;
    content:string;
      detail:{
    title:string;
    icon:string;
    description:string;
  }[];
  };
}

export default function VisionMission({vission}:VisionMission) {
  const [hoveredCard, setHoveredCard] = useState<'vision' | 'mission' | null>(null);

  // Dynamic flex ratio calculation for smooth card expansion and contraction
  const visionFlex = hoveredCard === 'vision' ? 'lg:flex-[7.5]' : hoveredCard === 'mission' ? 'lg:flex-[3.5]' : 'lg:flex-[5]';
  const missionFlex = hoveredCard === 'mission' ? 'lg:flex-[8.5]' : hoveredCard === 'vision' ? 'lg:flex-[4.5]' : 'lg:flex-[7]';

  return (
    <section id="vision-mission" className="bg-[#121212] text-white py-28 px-6 md:px-12 relative overflow-hidden">
      <ScrollReveal>
        <div className="max-w-[1440px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-[2.8rem] md:text-[4rem] text-white font-bold uppercase tracking-tighter leading-none mt-2">
             {vission?.title || ""}
            </h2>
            <div className="text-gray-300 max-w-2xl mx-auto mt-4 text-base md:text-lg" dangerouslySetInnerHTML={{__html:vission?.content || ""}} />
          </div>

          {/* Vision & Mission Cards Flex Container */}
          <div className="flex flex-col lg:flex-row gap-8 items-stretch w-full">

            {/* 1. Our Vision Card */}
            
            <div
              onMouseEnter={() => setHoveredCard('vision')}
              onMouseLeave={() => setHoveredCard(null)}
              className={`w-full bg-[#181818] hover:bg-red-600 hover:-rotate-[4deg] border border-gray-800 p-8 sm:p-12 border-t-4 border-white flex flex-col justify-between group hover:border-white transition-all duration-700 ease-in-out ${visionFlex}`}
            >
              <div>
                {/* Vision Icon: Eye (No box wrapper) */}
                <div className="mb-6 text-[#FE0002] group-hover:text-white transition-colors duration-500" dangerouslySetInnerHTML={{__html:vission?.detail[0].icon ?? ""}} />
                <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-6 transition-colors duration-500">
                 {vission?.detail[0].title || ""}
                </h3>
                <div className="text-gray-300 group-hover:text-white text-base md:text-lg leading-relaxed font-normal transition-colors duration-500" dangerouslySetInnerHTML={{__html:vission?.detail[0].description ?? ""}}/>
              </div>
            </div>

            {/* 2. Our Mission Card */}
            <div
              onMouseEnter={() => setHoveredCard('mission')}
              onMouseLeave={() => setHoveredCard(null)}
              className={`w-full bg-[#181818] hover:bg-red-600 border border-gray-800 p-8 sm:p-12 border-t-4 border-white flex flex-col justify-between group hover:border-white hover:rotate-[4deg] transition-all duration-700 ease-in-out ${missionFlex}`}
            >
              <div>
                {/* Mission Icon: Target / Precision (No box wrapper) */}
                <div className="mb-6 text-[#FE0002] group-hover:text-white transition-colors duration-500" dangerouslySetInnerHTML={{__html:vission?.detail[1].icon ?? ""}} />
                <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-6 transition-colors duration-500">
                 {vission?.detail[1].title || ""}
                </h3>

                <div className="space-y-6 text-gray-300 group-hover:text-white text-base md:text-lg leading-relaxed font-normal transition-colors duration-500" dangerouslySetInnerHTML={{__html:vission?.detail[1].description ?? ""}} />
              </div>
            </div>

          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
