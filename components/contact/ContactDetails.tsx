"use client";

import { useState } from 'react';
import ScrollReveal from '../ui/ScrollReveal';

export default function ContactDetails({contact,contact2,contact3}:{contact:any,contact2:any,contact3:any}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const contactCards = [
    {
      title: '',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18"></path>
          <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path>
          <path d="M9 9h1"></path>
          <path d="M9 13h1"></path>
          <path d="M9 17h1"></path>
          <path d="M14 9h1"></path>
          <path d="M14 13h1"></path>
          <path d="M14 17h1"></path>
        </svg>
      ),
      content: (
        <div className="space-y-2 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:uppercase [&_h3]:tracking-tight [&_h3]:text-white [&_h3]:mb-6 [&_h3]:transition-colors [&_h3]:duration-500 [&_p_strong]:font-bold [&_p_strong]:text-white [&_p_strong]:group-hover:text-white  [&_span]:pt-2 [&_span]:text-sm [&_span]:opacity-90" dangerouslySetInnerHTML={{__html:contact?.address ?? ""}} />
      )
    },
    {
      title: '',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"></path>
        </svg>
      ),
      content: (
        <div className="space-y-2 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:uppercase [&_h3]:tracking-tight [&_h3]:text-white [&_h3]:mb-6 [&_h3]:transition-colors [&_h3]:duration-500 [&_p_strong]:font-bold [&_p_strong]:text-white [&_p_strong]:group-hover:text-white [&_span]:pt-2 [&_span]:text-sm [&_span]:opacity-90" dangerouslySetInnerHTML={{__html:contact2?.address ?? ""}} />
      )
    },
    {
      title:'',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      ),
      content: (
        <div  className="space-y-2 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:uppercase [&_h3]:tracking-tight [&_h3]:text-white [&_h3]:mb-6 [&_h3]:transition-colors [&_h3]:duration-500 [&_p_strong]:font-bold [&_p_strong]:text-white [&_p_strong]:group-hover:text-white  [&_span]:pt-2 [&_span]:text-sm [&_span]:opacity-90 [&_a]:underline [&_a]:hover:text-white [&_a]:transition-colors"  dangerouslySetInnerHTML={{
      __html: (contact3?.address ?? "").replace(  /<a\s/gi, '<a target="_blank" rel="noopener noreferrer" ' ), }} />
      )
    },
    {
      title: 'Telephone & Mobile',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      ),
      content: (
        <div className="space-y-2">
          {contact?.tel && (<p>
            <strong className="text-white group-hover:text-white font-semibold">Tel: </strong>
            <a href={`tel:${contact?.tel}`} className="hover:underline"> {contact?.tel} </a>
          </p>)}
          {contact?.phone && (<p>
            <strong className="text-white group-hover:text-white font-semibold">Mobile: </strong>
            <a href={`tel:${contact?.phone}`} className="hover:underline">{contact?.phone}</a>
          </p>)}
          {contact?.phone2 && (<p>
            <strong className="text-white group-hover:text-white font-semibold">Mobile: </strong>
            <a href={`tel:${contact?.phone2}`} className="hover:underline">{contact?.phone2}</a>
          </p>)}
          {contact?.fax &&( <p className="pt-1">
            <strong className="text-white group-hover:text-white font-semibold">Fax: </strong>
            <a href={`tel:${contact?.fax}`} className="hover:underline">{contact?.fax}</a>
          </p>)}
        </div>
      )
    },
    {
      title: 'Email & Online Contact',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      ),
      content: (
        <div className="space-y-2">
          <p>
            <strong className="text-white group-hover:text-white font-semibold">Email: </strong>
            <a href={`mailto:${contact?.email}`} className="hover:underline">{contact?.email}</a>
          </p>
          <p>
            <strong className="text-white group-hover:text-white font-semibold">Website: </strong>
            <a href={ contact?.web?.startsWith("http") ? contact?.web : `https://${contact?.web}`}  target="_blank" rel="noopener noreferrer" className="hover:underline">{contact?.web}</a>
          </p>
          <p className="pt-2 text-sm opacity-90">{contact?.open}</p>
        </div>
      )
    }
  ];

  // Render individual card helper
  const renderCard = (card: typeof contactCards[0], idx: number) => {
    const rotateClass = idx % 2 === 0 ? 'hover:-rotate-[3deg]' : 'hover:rotate-[3deg]';

    // Bento dynamic width expansion calculations per row
    let flexWidthClass = 'lg:flex-1';
    if (idx < 3) {
      // Top Row (3 items)
      if (hoveredIdx === idx) {
        flexWidthClass = 'lg:flex-[1.5]';
      } else if (hoveredIdx !== null && hoveredIdx < 3) {
        flexWidthClass = 'lg:flex-[0.75]';
      }
    } else {
      // Bottom Row (2 items)
      if (hoveredIdx === idx) {
        flexWidthClass = 'lg:flex-[1.4]';
      } else if (hoveredIdx !== null && hoveredIdx >= 3) {
        flexWidthClass = 'lg:flex-[0.7]';
      }
    }

    return (
      <div
        key={idx}
        onMouseEnter={() => setHoveredIdx(idx)}
        onMouseLeave={() => setHoveredIdx(null)}
        className={`w-full bg-[#181818] hover:bg-red-600 ${rotateClass} ${flexWidthClass} border border-gray-800 p-8 sm:p-10 border-t-4 border-white flex flex-col justify-between group hover:border-white transition-all duration-700 ease-in-out cursor-pointer`}
      >
        <div>
          {/* Icon without box wrapper matching VisionMission design */}
          <div className="mb-6 text-[#FE0002] group-hover:text-white transition-colors duration-500">
            {card.icon}
          </div>

          {card.title && (<h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-6 transition-colors duration-500">
            {card.title}
          </h3>)}

          <div className="text-gray-300 group-hover:text-white text-base md:text-lg leading-relaxed font-normal transition-colors duration-500">
            {card.content}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="contact-info" className="bg-[#121212] text-white py-20 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <svg className="absolute top-[15vh] left-0 w-full h-[40px] opacity-20" viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 L800 0 L840 40 L1440 40" stroke="#FE0002" strokeWidth="2" fill="none" />
        </svg>
        <svg className="absolute top-[35vh] left-0 w-full h-[40px] opacity-20" viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40 L600 40 L640 0 L1440 0" stroke="#FE0002" strokeWidth="2" fill="none" />
        </svg>
      </div>
      <ScrollReveal>
        <div className="max-w-[1440px] mx-auto relative z-20">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-[2.8rem] md:text-[4rem] text-white font-bold uppercase tracking-tighter leading-none">
              REACH OUR OFFICES
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mt-4 text-base md:text-lg">
              Get in touch directly with our engineering hubs, factories, and corporate offices across Oman &amp; UAE.
            </p>
          </div>

          {/* Bento Grid: 3 cards on Top Row, 2 cards on Bottom Row */}
          <div className="space-y-8 w-full">
            {/* Top Row: 3 Cards */}
            <div className="flex flex-col lg:flex-row gap-8 items-stretch w-full">
              {contactCards.slice(0, 3).map((card, idx) => renderCard(card, idx))}
            </div>

            {/* Bottom Row: 2 Cards */}
            <div className="flex flex-col lg:flex-row gap-8 items-stretch w-full">
              {contactCards.slice(3, 5).map((card, idx) => renderCard(card, idx + 3))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
