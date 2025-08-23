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
        <div className="flex  justify-center items-center pr-48 mt-20 mb-20">
          <MagicBento
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={false}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="171, 171, 171"
          />
        </div>
        <IntegrationsSection />
        <FooterSection />
      </div>
    </main>
  );
}
