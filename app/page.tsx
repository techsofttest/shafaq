import type { Metadata } from "next";
import Hero from '../components/home/Hero';
import SectionDivider from '../components/ui/SectionDivider';
import AboutPreview from '../components/home/AboutPreview';
import FacilitiesPreview from '../components/home/FacilitiesPreview';
import ProductsServices from '../components/home/ProductsServices';
import Facilities from '../components/home/Facilities';
import ProjectsGallery from '../components/home/ProjectsGallery';
import TrustSignals from '../components/home/TrustSignals';
import OurClients from '../components/home/OurClients';
import ScrollReveal from '../components/ui/ScrollReveal';

interface ProductResponse {
  seo: {
    meta_title: string;
    meta_key: string;
    meta_desc: string;
  };
service:{
  slug:string;
  title: string;
  content: string;
  image: string[];
}[];
facility:{
  title: string;
  image: string;
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
  page:{
  title: string;
    image: string;
  content: string;
  detail:{
    title:string;
    icon:string;
    description:string;
  }[];}|undefined;
  pro:{
  title: string;
  content: string;
}|undefined;
  promain:{
    title: string;
    content: string;
  }|undefined;
  banner:{
  title: string;
  sub:string;
  content: string;
      image: string;
  ctaText:string;
  ctaLink:string;
  }[];
}

async function getSEO(): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const res = await fetch(`${baseUrl}/index`, {
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
      title: data?.seo?.meta_title ?? "Home",
      description: data?.seo?.meta_desc ?? "",
      keywords: data?.seo?.meta_key ?? "",
    };
  } catch (error) {
    return {
      title: "Home",
    };
  }
}

export default async function Home() {
  let data: ProductResponse | null = null;

  try {
    data = await getSEO();
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }
  return (
    <main className="relative overflow-hidden">
      {/* Global Fixed Parallax Background */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <svg className="absolute top-[25vh] left-0 w-full h-[40px] opacity-20" viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 L800 0 L840 40 L1440 40" stroke="#FE0002" strokeWidth="2" fill="none" />
        </svg>
        <svg className="absolute top-[75vh] left-0 w-full h-[40px] opacity-20" viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40 L600 40 L640 0 L1440 0" stroke="#FE0002" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <Hero hero={data?.banner ?? []} />
      
      <AboutPreview page={data?.page } />
      <SectionDivider topColor="#121212" bottomColor="#ffffff" />
      
      <FacilitiesPreview  />
      <SectionDivider topColor="#ffffff" bottomColor="#f5f5f5" />
      
      <ProductsServices product={data?.service?? []} pro={data?.pro ?? ""} />
      <SectionDivider topColor="#f5f5f5" bottomColor="#ffffff" />
      
      <Facilities facility={data?.facility ?? []} />
      <SectionDivider topColor="#ffffff" bottomColor="#121212" />
      
      <ProjectsGallery project={data?.project ?? []}  promain={data?.promain ?? ""} />
      <SectionDivider topColor="#121212" bottomColor="#f5f5f5" />
      
      <TrustSignals certificate={data?.certificate ?? []} />
      <SectionDivider topColor="#f5f5f5" bottomColor="#ffffff" />
      
      <OurClients client={data?.client ?? []} />
      <SectionDivider topColor="#ffffff" bottomColor="#FE0002" />

    </main>
  );
}
