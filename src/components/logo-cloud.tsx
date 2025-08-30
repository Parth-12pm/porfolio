import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import Image from "next/image";

export default function LogoCloud() {
  return (
    <section className="bg-background overflow-hidden py-16">
      <div className="group relative m-auto max-w-6xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:max-w-65 md:border-r md:pr-6">
            <p className="text-end text-lg">Powering the applications with</p>
          </div>
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
              {/* Java */}
              <div className="flex">
                <Image
                  className="mx-auto h-22 w-fit "
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
                  alt="Java Logo"
                  height={30}
                  width={30}
                />
              </div>

              {/* JavaScript */}
              <div className="flex">
                <Image
                  className="mx-auto h-22 w-fit "
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                  alt="JavaScript Logo"
                  height={30}
                  width={30}
                />
              </div>

              {/* Next.js */}
              <div className="flex">
                <Image
                  className="mx-auto h-22 w-fit dark:invert"
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
                  alt="Next.js Logo"
                  height={30}
                  width={30}
                />
              </div>

              {/* HTML */}
              <div className="flex">
                <Image
                  className="mx-auto h-22 w-fit "
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
                  alt="HTML5 Logo"
                  height={30}
                  width={30}
                />
              </div>

              {/* CSS */}
              <div className="flex">
                <Image
                  className="mx-auto h-22 w-fit "
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
                  alt="CSS3 Logo"
                  height={30}
                  width={30}
                />
              </div>

              {/* React */}
              <div className="flex">
                <Image
                  className="mx-auto h-22 w-fit "
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                  alt="React Logo"
                  height={30}
                  width={30}
                />
              </div>

              {/* Tailwind CSS */}
              <div className="flex">
                <Image
                  className="mx-auto h-18 w-fit "
                  src="https://static.cdnlogo.com/logos/t/58/tailwindcss.svg"
                  alt="Tailwind CSS Logo"
                  height={30}
                  width={30}
                />
              </div>

              {/* Node.js */}
              <div className="flex">
                <Image
                  className="mx-auto h-22 w-fit "
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                  alt="Node.js Logo"
                  height={30}
                  width={30}
                />
              </div>

              {/* MongoDB */}
              <div className="flex">
                <Image
                  className="mx-auto h-22 w-fit "
                  src="https://static.cdnlogo.com/logos/m/26/mongodb-icon_800.png"
                  alt="MongoDB Logo"
                  height={30}
                  width={30}
                />
              </div>

              {/* Neon ORM (Neon Postgres logomark) */}
              {/* <div className="flex">
                <Image
                  className="mx-auto h-22 w-fit dark:invert"
                  src="/_next/static/svgs/6da928883916f39a4848774319dcaf81.svg"
                  alt="Neon Logo"
                  height={50}
                  width={50}
                  width="auto"
                />
              </div> */}
            </InfiniteSlider>

            <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
            <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
