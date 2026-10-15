import Image from 'next/image';
import Link from 'next/link';

export default function Footer({contact,contact2,contact3,facility,service}:{contact:any,contact2:any,contact3:any,facility:any[],service:any[]}) {
  const currentYear = new Date().getFullYear();
  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'About us', href: '/about' },
    { label: 'Facility', href: '/facility' },
    { label: 'Services & Products', href: '/products-services' },
    { label: 'Project', href: '/projects/completed' },
    { label: 'Downloads', href: '/downloads' },
    { label: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer className="bg-[#121212] text-white py-16 px-10 relative overflow-hidden">

      {/* Background Watermark Text */}
      <div className="absolute bottom-[-2%] left-0 right-0 w-full overflow-hidden flex justify-center items-end pointer-events-none select-none z-0 leading-none opacity-40">
        <span
          className="text-[13.5vw] font-bold uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-t from-[#FE0002]/30 to-transparent whitespace-nowrap"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Shafaq Al Group
        </span>
      </div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 relative z-10">
        <div className="lg:col-span-1">
          <div className="relative w-[220px] h-[100px] mb-6">
            <Image
              src="/logo/logo2.png"
              alt="Shafaq Al Group Logo"
              fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain brightness-0 invert"
            />
          </div>
          <p className="text-gray-300 text-sm max-w-sm mb-8 leading-relaxed">
            Leading Structural Steel Fabrication in Oman. JSRS Certified experts in engineering, procurement, and fabrication.
          </p>
          <Link href="/about" className="inline-block border border-gray-600 text-gray-300 px-6 py-3 uppercase text-xs font-bold tracking-wider hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors mb-8">
            Know More About Us
          </Link>

          <div className="flex items-center gap-4">
            <a href={contact?.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1C1C1C] rounded-full flex items-center justify-center text-white hover:bg-[var(--color-primary)] hover:text-white hover:scale-110 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:-rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
            </a>
            <a href={contact?.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1C1C1C] rounded-full flex items-center justify-center text-white hover:bg-[var(--color-primary)] hover:text-white hover:scale-110 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href={contact?.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1C1C1C] rounded-full flex items-center justify-center text-white hover:bg-[var(--color-primary)] hover:text-white hover:scale-110 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:-rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-6 text-white">Services</h3>
          <ul className="flex flex-col gap-3 mb-4">
            {service.map((ser,idx)=>(
               <li key={idx}><Link href={`/products-services/${ser.slug}`} className="text-gray-300 hover:text-white text-sm transition-colors">{ser.title}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-6 text-white">Facilities</h3>
          <ul className="flex flex-col gap-3 mb-4">
              {facility.map((fac,idx)=>(
               <li key={idx}><Link href={`#facility/${fac.slug}`} className="text-gray-300 hover:text-white text-sm transition-colors">{fac.title}</Link></li>
            ))}
          </ul>
          <Link href="/facility" className="text-gray-300 hover:text-white text-sm font-bold transition-colors flex items-center gap-1">
            View All Equipment <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-6 text-white">Our Locations</h3>
          <ul className="flex flex-col gap-4 text-sm text-gray-300">
                {[contact,contact2,contact3].map((location, idx) =>
                  location?.address ? (
                    <li key={idx}>
                      <div
                        className="
                          [&_h3]:font-bold
                          [&_h3]:text-white
                          [&_h3]:mb-2
                          [&_p_strong]:font-bold
                          [&_p_strong]:text-white
                          [&_p_strong]:mb-2
                          [&_p]:mb-1
                          [&_strong]:font-semibold
                          [&_a]:underline
                          [&_a]:hover:text-white
                          [&_a]:transition-colors
                        "
                        dangerouslySetInnerHTML={{__html: (location.address ?? "").replace(  /<a\s/gi, '<a target="_blank" rel="noopener noreferrer" ' ),
                        }}
                      />
                    </li>
                  ) : null
                )}
              </ul>

        </div>

        <div>
          <h3 className="text-lg font-bold mb-6 text-white">Contact Us</h3>
          <ul className="flex flex-col gap-3 text-sm text-gray-300">
            <li className="flex flex-col gap-2 mt-2">
              <span><strong className="text-white font-semibold">Tel:</strong> <a href={`tel:${contact?.tel}`} className="hover:text-white transition-colors">+968 24815717</a></span>
              <span>
                <strong className="text-white font-semibold">Mobile:</strong>
                <a href={`tel:${contact.phone}`} className="hover:text-white transition-colors ml-1">{contact?.phone}</a>,<br />
                <a href={`tel:${contact.phone2}`} className="hover:text-white transition-colors ml-1">{contact?.phone2}</a>
              </span>
              <span><strong className="text-white font-semibold">Fax:</strong> <a href={`tel:${contact?.fax}`} className="hover:text-white transition-colors">{contact.fax}</a></span>
              <span className="mt-2"><strong className="text-white font-semibold">Email:</strong> <a href="mailto:info@shafaqgroup.com" className="hover:text-white transition-colors">{contact.email}</a></span>
              <span><strong className="text-white font-semibold">Website:</strong> <a href={contact?.web} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{contact.web}</a></span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col gap-8 relative z-10">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-gray-400">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href} className="hover:text-white transition-colors">
              {item.label}
            </Link>
          ))}
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center text-sm text-gray-400 border-t border-white/5 pt-6">
          <p>&copy; {currentYear} Shafaq Al Group. All rights reserved.</p>
          <div className="mt-4 lg:mt-0 text-right">
            <a href="https://www.techsoftweb.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white font-normal hover:underline underline-offset-4 transition-colors">Web Design Company in Kochi Techsoft</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
