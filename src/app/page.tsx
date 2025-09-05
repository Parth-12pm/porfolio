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
        <div className="mb-16 md:mb-24 lg:mb-32">
          <HeroSection />
        </div>
        <div
          id="projects"
          className="w-full px-4 md:px-6 lg:px-8 mt-12 mb-12 md:mt-20 md:mb-20"
        >
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
