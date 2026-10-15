import ScrollReveal from '../ui/ScrollReveal';

export default function GlobalCTA({contact}:{contact:any}) {
  return (
    <section id="contact" className="relative w-full py-[120px] px-10 flex items-center justify-center bg-[#FE0002] overflow-hidden">
      {/* Decorative White Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="absolute top-[20%] left-0 w-full h-[40px] opacity-60" viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 L800 0 L840 40 L1440 40" stroke="white" strokeWidth="2" fill="none" />
        </svg>
        <svg className="absolute bottom-[20%] left-0 w-full h-[40px] opacity-60" viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40 L600 40 L640 0 L1440 0" stroke="white" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <ScrollReveal>
        <div className="relative z-20 text-center max-w-[800px]">
        <h2 className="text-[2.5rem] md:text-[3.5rem] mb-20 text-white font-bold uppercase tracking-tighter leading-none">Ready to discuss your next project?</h2>
        <a href="/contact#contact-form" className="inline-block bg-[#121212] text-white px-8 py-4 uppercase text-base font-bold tracking-wider hover:bg-[#1C1C1C] transition-colors">Contact Our Engineers</a>

        {/* Social Media Links */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[var(--color-primary)] border border-white hover:bg-[var(--color-primary)] hover:text-white hover:scale-110 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
          </a>
          <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[var(--color-primary)] border border-white hover:bg-[var(--color-primary)] hover:text-white hover:scale-110 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[var(--color-primary)] border border-white hover:bg-[var(--color-primary)] hover:text-white hover:scale-110 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
          </a>
        </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
