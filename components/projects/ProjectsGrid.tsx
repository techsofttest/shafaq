"use client";

import Image from 'next/image';
import { useState } from 'react';

import ScrollReveal from '../ui/ScrollReveal';

interface Project {
  src: string;
  label: string;
}

interface ProjectsGridProps {
  title: string;
  projects: Project[];
}

export default function ProjectsGrid({ title, projects }: ProjectsGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <div className="py-10 bg-white max-w-[1440px] mx-auto px-10">
        <ScrollReveal>
          <h2 className="text-3xl text-black font-bold uppercase mb-12">All {title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="relative aspect-[1/1] sm:aspect-[1/1] group overflow-hidden bg-[#1a1a1a] cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src={project.src}
                    alt={project.label}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-all duration-1000 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 group-hover:from-black/70 transition-all duration-700" />

                {/* Sliding Red Container without description */}
                <div className="absolute bottom-0 left-0 w-full bg-[#FE0002] px-6 pb-6 pt-4 translate-y-[calc(100%-80px)] group-hover:translate-y-0 transition-transform duration-500 z-30 flex flex-col justify-start min-h-[120px]">
                  <div className="mb-2">
                    <h3 className="text-lg sm:text-xl text-white font-bold uppercase tracking-tight leading-tight">
                      {project.label}
                    </h3>
                  </div>
                </div>

                {/* Red Outline on Hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FE0002] transition-colors duration-500 z-40 pointer-events-none" />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Simple Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-10"
          onClick={() => setSelectedProject(null)}
        >
          <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
            <Image
              src={selectedProject.src}
              alt={selectedProject.label}
              fill
              className="object-contain"
            />
          </div>

          <button
            className="absolute top-6 right-6 text-white bg-black/50 hover:bg-[#FE0002] transition-colors p-2 rounded-full z-[110]"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProject(null);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
