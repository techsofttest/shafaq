import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import GlobalCTA from '../components/global/GlobalCTA';
import SectionDivider from '../components/ui/SectionDivider';
import WhatsAppButton from "../components/global/WhatsAppButton";
import "./globals.css";
export const dynamic = "force-dynamic";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});
interface Contact{
      facebook: string;
    linkedin: string;
    instagram: string;
    address:string;
    phone:string;
    phone2:string;
    email:string;
    fax:string;
    tel:string;
    map:string;
    whatsapp:string;
}
interface ProductResponse{
  contact:Contact;
    contact2:Contact;
      contact3:Contact;
  service:{
    title:string;
    slug:string;
  }[];
  facility:{
    title:string;
    slug:string;
  }[];
}
async function getSEO(): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/layout`, {
   next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch SEO data");
  }

  return res.json();
}
export default async function RootLayout({ children }: LayoutProps<"/">) {
   let data: ProductResponse | null = null;

  try {
    data = await getSEO();
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">
          {children}
        </div>
              <GlobalCTA contact={data?.contact} />
              <SectionDivider topColor="#FE0002" bottomColor="#121212" />
        <WhatsAppButton whatsapp={data?.contact?.whatsapp} />
        <Footer contact={data?.contact} contact2={data?.contact2} contact3={data?.contact3} facility={data?.facility ?? []} service={data?.service?? []}  />
      </body>
    </html>
  );
}
