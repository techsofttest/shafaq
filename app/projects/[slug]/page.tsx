import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import SectionDivider from '../../../components/ui/SectionDivider';
import ProjectsCarousel from '../../../components/projects/ProjectsCarousel';
import GlobalCTA from '../../../components/global/GlobalCTA';
import ProjectsGrid from '../../../components/projects/ProjectsGrid';
import ScrollReveal from '../../../components/ui/ScrollReveal';
interface ProjectItem {
  id: number | string;
  title: string;
  image: string;
  status: "ongoing" | "completed";
}

interface ProductResponse {
  seo: {
    meta_title: string;
    meta_key: string;
    meta_desc: string;
  };
  banner: {
    title: string;
    content: string;
  };
  projects: ProjectItem[];
}

type PageProps = {
  params: Promise<{ slug: string }>;
};
async function getSEO(slug: string): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const res = await fetch(`${baseUrl}/projects/${encodeURIComponent(slug)}`, {
  cache: "no-store",
});

  if (!res.ok) {
    throw new Error("Failed to fetch SEO data");
  }

  return res.json();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (slug !== "completed" && slug !== "ongoing") {
    notFound();
  }

  try {
    const data = await getSEO(slug);

    return {
      title: data.seo.meta_title || "Projects",
      description: data.seo.meta_desc || "",
      keywords: data.seo.meta_key || "",
    };
  } catch {
    return {
      title: slug === "completed" ? "Completed Works" : "Ongoing Works",
    };
  }
}

export default async function ProjectsPage({ params }: PageProps) {
  const { slug } = await params;

  if (slug !== "completed" && slug !== "ongoing") {
    notFound();
  }

  let data: ProductResponse;

  try {
    data = await getSEO(slug);
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }

  const title = slug === "completed" ? "Completed Works" : "Ongoing Works";

  const projects = data.projects.map((project) => ({
    src: project.image,
    label: project.title,
  }));


  return (
    <>
      <main className="bg-[#121212] min-h-screen pt-16 relative">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          <svg className="absolute top-[15vh] left-0 w-full h-[40px] opacity-20" viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0 L800 0 L840 40 L1440 40" stroke="#FE0002" strokeWidth="2" fill="none" />
          </svg>
          <svg className="absolute top-[35vh] left-0 w-full h-[40px] opacity-20" viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40 L600 40 L640 0 L1440 0" stroke="#FE0002" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Top Row: Title & Description */}
        <ScrollReveal>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center md:items-center gap-10 mb-20 max-w-[1440px] mx-auto px-10">

            <div className="md:w-1/2">
              <h1 className="text-[3.2rem] sm:text-[4.5rem] md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-tighter leading-none">
                {data?.banner.title ?? ""}
              </h1>
            </div>

            <div className="md:w-1/2 flex md:justify-end">
              <div className="text-gray-300 text-lg md:text-xl font-light leading-relaxed text-left md:text-right max-w-lg" dangerouslySetInnerHTML={{__html:data?.banner.content ?? ""}} />
            </div>
          </div>
        </ScrollReveal>

        {/* Carousel */}
      { projects && projects.length > 0 && ( <ProjectsCarousel projects={projects} />)}
        <SectionDivider topColor="#121212" bottomColor="#ffffffff" />

        {/* Grid Layout matching OrgStructure Design */}
        {projects && projects.length > 0 && (<ProjectsGrid title={title} projects={projects} />)}
        <SectionDivider topColor="#ffffffff" bottomColor="#FE0002" />

      </main>
    </>
  );
}
