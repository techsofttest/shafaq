import Image from 'next/image';

interface ProductServiceItem{
    product: {
      id:string;
    slug: string;
    key: string[];
    title: string;
    images: string[];
    content: string;
  };
}

export default function ProductDetailGrid({ product }:ProductServiceItem) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-12">
      {/* Left Side: Images Grid */}
      <div className="lg:col-span-6">
        <div className={`grid gap-4 ${product.images.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
          {product.images.map((imgSrc, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden bg-gray-900 group ${product.images.length === 1
                ? 'aspect-[16/10] w-full'
                : idx === 0 && product.images.length % 2 !== 0
                  ? 'md:col-span-2 aspect-[16/9]'
                  : 'aspect-square'
                }`}
            >
              <Image
                src={imgSrc}
                alt={`${product.title} Image ${idx + 1}`}
                fill
                priority={idx < 2}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Title, Subtitle, Details & Specs */}
      <div className="lg:col-span-6 flex flex-col justify-between h-full bg-[#1A1A1A] p-8 sm:p-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#FE0002] text-white text-xs font-bold px-3 py-1 uppercase tracking-widest">
              Service {product.id}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-6 leading-tight">
            {product.title || ""}
          </h1>

          <div className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8" dangerouslySetInnerHTML={{__html:product.content || ""}} />

          {product.key && product.key.length > 0 && (
            <div className="mb-10">
              <p className="text-xs font-semibold tracking-widest text-gray-400 mb-4 border-b border-gray-800 pb-2">
                Key Capabilities & Specs
              </p>
              <ul className="space-y-3">
                {product.key.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-sm text-gray-300">
                    <span className="text-[#FE0002] font-bold">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
