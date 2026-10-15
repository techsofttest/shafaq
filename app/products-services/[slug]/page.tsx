import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SectionDivider from '../../../components/ui/SectionDivider';
import GlobalCTA from '../../../components/global/GlobalCTA';
import ScrollReveal from '../../../components/ui/ScrollReveal';
import OtherServicesCarousel from '../../../components/products-services/OtherServicesCarousel';
import ProductDetailGrid from '../../../components/products-services/ProductDetailGrid';

interface ProductResponse {
  seo: {
    meta_title: string;
    meta_key: string;
    meta_desc: string;
  }; 
  detail: {
    id:string;
    slug: string;
    key: string[];
    title: string;
    images: string[];
    content: string;
  };
  service: {
    id:string;
    slug: string;
    title: string;
    content: string;
    image: string[];
  }[];
  contact: {
    facebook: string;
    linkedin: string;
    instagram: string;
  };
}
type PageProps = {
  params: Promise<{ slug: string }>;
};
async function getSEO(slug: string): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const res = await fetch(
    `${baseUrl.replace(/\/$/, "")}/service/${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  );

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch service data: ${res.status}`);
  }

  return res.json();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const data = await getSEO(slug);

    return {
      title: data.seo?.meta_title || data.detail?.title || "Service",
      description: data.seo?.meta_desc || "",
      keywords: data.seo?.meta_key || "",
    };
  } catch (error) {
    console.error("Failed to fetch service metadata:", error);

    return {
      title: "Service",
      description: "",
    };
  }
}

export default async function ProductDetailPage( {params}: PageProps) {
  const { slug } = await params;

  let data: ProductResponse;

  try {
    data = await getSEO(slug);
  } catch (error) {
    console.error("Error fetching service data:", error);
    throw error;
  }

  const product = data.detail;

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-[#121212] min-h-screen text-white relative overflow-hidden">
      {/* Background Decorative Lines */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <svg className="absolute top-[20vh] left-0 w-full h-[40px] opacity-15" viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 L800 0 L840 40 L1440 40" stroke="#FE0002" strokeWidth="2" fill="none" />
        </svg>
        <svg className="absolute top-[70vh] left-0 w-full h-[40px] opacity-15" viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40 L600 40 L640 0 L1440 0" stroke="#FE0002" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <ScrollReveal>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-4 pb-12 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs uppercase font-bold tracking-widest text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-gray-600">/</span>
            <Link href="/products-services" className="hover:text-white transition-colors">
              Products & Services
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white">{product.title}</span>
          </nav>

          {/* Main Detail Grid: Left Images Grid, Right Details */}
          <ProductDetailGrid product={product} />
        </div>
      </ScrollReveal>

      {/* Floating Island CTA Bar */}
      <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        <div className="pointer-events-auto bg-[#1A1A1A]/90 backdrop-blur-md shadow-2xl rounded-full p-2 flex items-center gap-3 max-w-fit">
      
      <Link
        href={`/contact?service=${encodeURIComponent(product.title)}#contact-form`}
        className="bg-[var(--color-button-blue)] hover:bg-[var(--color-button-blue-hover)] text-white px-7 py-3 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 shadow-sm hover:shadow-black/20 whitespace-nowrap"
      >
        Request a Quote
      </Link>

          <Link
            href="/products-services"
            className="bg-transparent border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 px-6 py-3 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 whitespace-nowrap"
          >
            Back to All Services
          </Link>
        </div>
      </div>

      <SectionDivider topColor="#121212" bottomColor="#ffffff" />

      {/* OTHER SERVICES CAROUSEL */}
      <OtherServicesCarousel services={data.service ?? []} />

      <SectionDivider topColor="#ffffff" bottomColor="#FE0002" />

    </main>
  );
}
