import type { Metadata } from 'next';
import PageHero from '../../components/global/PageHero';
import ProductsServices from '../../components/home/ProductsServices';
import ProjectsGallery from '../../components/home/ProjectsGallery';
import TrustSignals from '../../components/home/TrustSignals';
import GlobalCTA from '../../components/global/GlobalCTA';
import SectionDivider from '../../components/ui/SectionDivider';


interface ProductResponse {
  seo: {
    meta_title: string;
    meta_key: string;
    meta_desc: string;
  };
  banner:{
    title:string;
    image:string;
    content:string;
  };
  pro:{
    title:string;
    image:string;
    content:string;
  };
 service:{
  slug:string;
  title: string;
  content: string;
  image: string[];
}[];
  project:{
  title: string;
  image: string;
  }[];
  certificate:{
  title: string;
  image: string;
  }[];
  client:{
  title: string;
  image: string;
  }[];
  contact:{
    facebook: string;
    linkedin: string;
    instagram: string;
  }
  promain:{
    title: string;
    content: string;
  }|undefined;
}

async function getSEO(): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const res = await fetch(`${baseUrl}/service`, {
  cache: "no-store",
});

  if (!res.ok) {
    throw new Error("Failed to fetch SEO data");
  }

  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getSEO();

    return {
      title: data?.seo?.meta_title ?? "About Us",
      description: data?.seo?.meta_desc ?? "",
      keywords: data?.seo?.meta_key ?? "",
    };
  } catch (error) {
    return {
      title: "Home",
    };
  }
}

export default async function ProductsServicesPage() {
      let data: ProductResponse | null = null;

  try {
    data = await getSEO();
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }
  return (
    <main className="relative overflow-hidden bg-[#121212]">
      {/* Background Decorative Grid Lines */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <svg className="absolute top-[20vh] left-0 w-full h-[40px] opacity-15" viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 L800 0 L840 40 L1440 40" stroke="#FE0002" strokeWidth="2" fill="none" />
        </svg>
        <svg className="absolute top-[70vh] left-0 w-full h-[40px] opacity-15" viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40 L600 40 L640 0 L1440 0" stroke="#FE0002" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* HERO SECTION */}
      <PageHero
        title={data?.banner.title || ""}
        description={data?.banner.content || ""}
        imageSrc={data?.banner.image || ""}
        primaryCta={{ label: "Explore Products", href: "#products" }}
        secondaryCta={{ label: "Request Quote", href: "/contact#contact-form" }}
      />
      <SectionDivider topColor="#121212" bottomColor="var(--color-bg-grey)" />

      {/* PRODUCTS & SERVICES LISTING */}
      <div id="products">
        <ProductsServices hideHeader={true} product={data?.service ?? []} pro={data?.pro ?? ""}  />
      </div>
      <SectionDivider topColor="var(--color-bg-grey)" bottomColor="#121212" />

      {/* FEATURED PROJECTS GALLERY */}
      <ProjectsGallery  project={data?.project ?? []}  promain={data?.promain ?? ""} />
      <SectionDivider topColor="#121212" bottomColor="#f5f5f5" />

      {/* TRUST SIGNALS */}
      <TrustSignals certificate={data?.certificate ?? []} />
      <SectionDivider topColor="#f5f5f5" bottomColor="#FE0002" />

    </main>
  );
}
