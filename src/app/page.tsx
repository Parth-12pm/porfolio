import FooterSection from "@/components/footer";
import HeroSection from "@/components/hero-section";
import IntegrationsSection from "@/components/integrations-1";
import { FloatingNav } from "@/components/ui/floating-navbar";
import LogoCloud from "../components/logo-cloud";
import MagicBento from "@/components/MagicBento/MagicBento";

const navItems = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
];

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center  ">
      <div className=" flex flex-col ">
        <HeroSection />
        <LogoCloud />
        <div className="flex  justify-center">
          <MagicBento />
        </div>
        <IntegrationsSection />
        <FooterSection />
      </div>
    </main>
  );
}
