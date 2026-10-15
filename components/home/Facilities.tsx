import Image from 'next/image';
import ScrollReveal from '../ui/ScrollReveal';

export default function facilities({facility}:{facility:any[]}) {


  return (
    <section id="facilities-gallery" className="relative overflow-hidden py-32 px-10">
      <ScrollReveal>
        <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="mb-16">
          <h2 className="text-[3rem] md:text-[4rem] text-[#1C1C1C] font-bold uppercase tracking-tighter leading-none">Our Facilities & Machinery</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facility.map((facility, index) => (
            <div key={index} className="group relative aspect-[4/3] bg-[#f5f5f5] overflow-hidden rounded-sm cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500">
              <Image
                src={facility.image}
                alt={facility.title} loading="eager"
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10 pointer-events-none"></div>
            </div>
          ))}
        </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
