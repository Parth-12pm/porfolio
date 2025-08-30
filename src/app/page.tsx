import FooterSection from "@/components/footer";
import LogoCloud from "../components/logo-cloud";
import MagicBento from "@/components/MagicBento/MagicBento";
import { Spotlight } from "@/components/ui/spotlight-new";
import HeroSection from "@/components/my-hero-section";
import MyNav from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center ">
        <Spotlight
          duration={4}
          xOffset={50}
          gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(0, 0%, 95%, .08) 0, hsla(0, 0%, 75%, .04) 50%, hsla(0, 0%, 55%, 0) 80%)"
          gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 90%, .06) 0, hsla(0, 0%, 70%, .03) 80%, transparent 100%)"
          gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 85%, .04) 0, hsla(0, 0%, 65%, .02) 80%, transparent 100%)"
        />
        <MyNav />
        <div className="mb-100">
          <HeroSection />
        </div>
        <div id="projects" className="flex justify-center items-center pr-48 mt-20 mb-20">
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
    </>
  );
}
