import Image from 'next/image';
import ScrollReveal from '../ui/ScrollReveal';

function TeamCard({ member }: { member: any }) {
  return (
    <div className="group relative aspect-[4/5] flex flex-col justify-end overflow-hidden cursor-pointer rounded-sm">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={member.image}
          alt={member.role}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-all duration-1000 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 group-hover:from-black/70 transition-all duration-700" />

      {/* Sliding Red Container (Holds Header + Description together so Title is ALWAYS above Description) */}
      <div className="absolute bottom-0 left-0 w-full bg-[#FE0002] px-6 pb-6 pt-3 sm:px-8 sm:pb-8 sm:pt-4 translate-y-[calc(100%-85px)] sm:translate-y-[calc(100%-95px)] group-hover:translate-y-0 transition-transform duration-500 z-30 flex flex-col justify-start min-h-[50%]">
        {/* Header Block: Always visible at bottom when unhovered, stays on top of description when hovered */}
        <div className="mb-3">
          <div className="flex items-center gap-3 mb-1">
            {/* <span className="text-[#FE0002] text-xs font-semibold tracking-widest block bg-white px-2 py-0.5">{member.subtitle}</span> */}
            {member.title && (
              <p className="text-white text-sm sm:text-lg font-semibold tracking-wide opacity-90">
                {member.title}
              </p>
            )}
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl text-white font-bold uppercase tracking-tight leading-tight">
            {member.role || ""}
          </h3>
        </div>

        {/* Description: Revealed seamlessly under the title when hovered */}
        <div className="text-white text-xs sm:text-sm leading-relaxed opacity-0 group-hover:opacity-95 transition-opacity duration-500" dangerouslySetInnerHTML={{__html:member.content}} />
      </div>

      {/* Red Outline on Hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FE0002] transition-colors duration-500 z-40 pointer-events-none" />
    </div>
  );
}

export default function OrgStructure({organization,team}:{organization:any,team:any[]}) {

  return (
    <section id="org-structure" className="bg-[#f5f5f5] text-[#121212] py-28 px-6 md:px-12 relative">
      <ScrollReveal>
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[2.8rem] md:text-[4rem] text-[#121212] font-bold uppercase tracking-tighter leading-none mt-2">
             {organization.title || ""}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-base md:text-lg" dangerouslySetInnerHTML={{__html:organization.content ?? ""}}/>
          </div>

          {/* Management Team Cards Grid (Centered layout) */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {team.map((member, idx) => (
              <div key={idx} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[420px]">
                <TeamCard member={member} />
              </div>
            ))}
          </div>

        </div>
      </ScrollReveal>
    </section>
  );
}
