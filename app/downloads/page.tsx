import type { Metadata } from 'next';
import PageHero from '../../components/global/PageHero';
import DownloadsGrid from '../../components/downloads/DownloadsGrid';
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
  download:{
  fileType:'pdf' | 'image';
  fileUrl:string;
  title: string;
  image: string;
}[];
}

async function getSEO(): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const res = await fetch(`${baseUrl}/download`, {
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

export default async function DownloadsPage() {
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
        title={ data?.banner.title || "DOWNLOADS & CERTIFICATIONS"}
        description={data?.banner.content || "Access and download our official ISO Quality, Environmental & Safety Accreditations, JSRS Oil & Gas Certifications, and Corporate Compliance Documentation."}
        imageSrc={data?.banner.image || "/banner/downloads.png"}
        primaryCta={{ label: "View Certificates", href: "#certificates" }}
        secondaryCta={{ label: "Request Documentation", href: "/contact#contact-form" }}
      />
      <SectionDivider topColor="#121212" bottomColor="var(--color-bg-grey)" />

      {/* CERTIFICATES & DOWNLOADS GRID */}
      <DownloadsGrid download={data?.download ?? []}/>
      <SectionDivider topColor="var(--color-bg-grey)" bottomColor="#FE0002" />

    </main>
  );
}
