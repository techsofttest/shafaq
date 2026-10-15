import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const menuItems = [
    { label: 'About us', href: '/about' },
    { label: 'Services & Products', href: '/products-services' },
    { label: 'Facility', href: '/facility' },
    {
      label: 'Projects',
      dropdown: [
        { label: 'Completed Works', href: '/projects/completed' },
        { label: 'Ongoing Works', href: '/projects/ongoing' },
      ]
    },
    { label: 'Downloads', href: '/downloads' },
    { label: 'Contact Us', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#121212] border-b border-gray-800 shadow-sm relative overflow-visible">
      <div className="max-w-[1440px] mx-auto px-10 h-24 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center h-full relative">
          {/* Slanted White Background strictly wrapping Logo */}
          <div
            className="absolute top-0 bottom-0 -left-[50vw] bg-white z-0"
            style={{
              width: 'calc(50vw + 100% - 15px)',
              clipPath: 'polygon(0 0, 100% 0, calc(100% - 30px) 100%, 0 100%)'
            }}
          ></div>
          <div className="relative w-[200px] h-[60px] md:w-[280px] md:h-[90px] z-10">
            <Image
              src="/logo/logo.png"
              alt="Shafaq Al Group Logo"
              fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {menuItems.map((item, index) => (
            item.dropdown ? (
              <div key={index} className="relative group h-24 flex items-center">
                <button className="text-gray-300 hover:text-white font-semibold text-sm tracking-wider transition-colors flex items-center gap-1 uppercase">
                  {item.label}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div className="absolute top-[100%] left-0 w-48 bg-[#1a1a1a] border border-gray-800 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col z-50">
                  {item.dropdown.map((dropItem, dropIndex) => (
                    <Link
                      key={dropIndex}
                      href={dropItem.href}
                      className="px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-[#FE0002] transition-colors border-b border-gray-800 last:border-b-0 uppercase"
                    >
                      {dropItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={index}
                href={item.href}
                className="text-gray-300 hover:text-white font-semibold text-sm tracking-wider transition-colors uppercase"
              >
                {item.label}
              </Link>
            )
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <Link href="/contact#contact-form" className="hidden lg:flex items-center gap-3 border border-[var(--color-primary)] bg-[var(--color-primary)] text-white px-6 py-2.5 uppercase text-xs font-bold tracking-wider hover:bg-[var(--color-primary-hover)] hover:border-[var(--color-primary-hover)] transition-colors">
            Get a Quote
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
          <div className="lg:hidden">
            <button className="text-white p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
