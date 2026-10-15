import type { Metadata } from 'next';
import AboutHero from '../../components/about/AboutHero';
import CompanyProfile from '../../components/about/CompanyProfile';
import VisionMission from '../../components/about/VisionMission';
import WhatWeOffer from '../../components/about/WhatWeOffer';
import OrgStructure from '../../components/about/OrgStructure';
import ProjectsGallery from '../../components/home/ProjectsGallery';
import TrustSignals from '../../components/home/TrustSignals';
import GlobalCTA from '../../components/global/GlobalCTA';
import SectionDivider from '../../components/ui/SectionDivider';
import OurClients from '../../components/home/OurClients';

interface ProductResponse {
  seo: {
    meta_title: string;
    meta_key: string;
    meta_desc: string;
  };
  about:{
    title:string;
    image:string;
    content:string;
  };
    vission:{
    title:string;
    image:string;
    content:string;
      detail:{
    title:string;
    icon:string;
    description:string;
  }[];
  };
    who:{
    title:string;
    image:string;
    content:string;
    detail:{
    title:string;
    icon:string;
    option:string;
  }[];
      matrix:{
    title:string;
    icon:string;
    description:string;
  }[];
  };
    offer:{
    title:string;
    image:string;
    content:string;
  };
  offer1:{
    subtitle:string;
    title:string;
    image:string;
      detail:{
    title:string;
    option:string;
    description:string;
  }[];
    content:string;
  };
  offer2:{
    subtitle:string;
    title:string;
    image:string;
      detail:{
    title:string;
    option:string;
    description:string;
  }[];
    content:string;
  };
  team:{
    title:string;
    role:string;
    image:string;
    content:string;
  }[];
  organization:{
    title: string;
    content: string;
  }|undefined;
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
  promain:{
    title: string;
    content: string;
  }|undefined;
}

async function getSEO(): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const res = await fetch(`${baseUrl}/about`, {
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

export default async function AboutPage() {
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

      {/* SECTION 1: HERO (Dark #121212) */}
      <AboutHero about={data?.about} />
      <SectionDivider topColor="#121212" bottomColor="#ffffff" />

      {/* SECTION 2: COMPANY OVERVIEW (White #ffffff) */}
      <CompanyProfile about={data?.who} />
      <SectionDivider topColor="#ffffff" bottomColor="#121212" />

      {/* SECTION 3: VISION & MISSION (Dark #121212) */}
      <VisionMission  vission={data?.vission}  />
      <SectionDivider topColor="#121212" bottomColor="#ffffff" />

      {/* SECTION 4: WHAT WE OFFER (White #ffffff) */}
      <WhatWeOffer offer={data?.offer} offer1={data?.offer1} offer2={data?.offer2} />
      <SectionDivider topColor="#ffffff" bottomColor="#f5f5f5" />

      {/* SECTION 5: MANAGEMENT TEAM (Off-White #f5f5f5) */}
      <OrgStructure team={data?.team ?? []}  organization={data?.organization ?? ""} />
      <SectionDivider topColor="#f5f5f5" bottomColor="#121212" />

      {/* SECTION 6: PROJECTS GALLERY (Dark #121212) */}
      <ProjectsGallery project={data?.project ?? []}  promain={data?.promain ?? ""} />
      <SectionDivider topColor="#121212" bottomColor="#f5f5f5" />

      {/* SECTION 7: TRUST SIGNALS (Off-White #f5f5f5) */}
      <TrustSignals certificate={data?.certificate ?? []} />
      <SectionDivider topColor="#f5f5f5" bottomColor="#ffffffff" />

      <OurClients client={data?.client ?? []} />
      <SectionDivider topColor="#ffffffff" bottomColor="#FE0002" />

    </main>
  );
}
