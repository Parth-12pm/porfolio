import FooterSection from "@/components/footer";
import LogoCloud from "../components/logo-cloud";
import MagicBento from "@/components/MagicBento/MagicBento";
import { Spotlight } from "@/components/ui/spotlight-new";
import HeroSection from "@/components/my-hero-section";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center  ">
      <div className="mb-100">
        <Spotlight />
        <HeroSection />
      </div>
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
      <LogoCloud />
      <FooterSection />
    </main>
  );
}
