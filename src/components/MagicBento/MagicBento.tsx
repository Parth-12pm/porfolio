"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";

export interface BentoCardProps {
  color?: string;
  title?: string;
  description?: string;
  label?: string;
  textAutoHide?: boolean;
  disableAnimations?: boolean;
  link?: string;
  image?: string;
  size?: {
    minHeight?: string;
    aspectRatio?: string;
    width?: string;
  };
}

export interface BentoProps {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "171, 171, 171";
const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

const cardData: BentoCardProps[] = [
  // Row 1: small, small, big
  {
    color: "#232326",
    title: "SJF Algorithm",
    description: "To find Shortest job First",
    label: "Web",
    link: "https://github.com/Parth-12pm/SJF-Algorithm-React",
    image: "/sjf_image.png",
    size: { minHeight: "180px", aspectRatio: "4/3", width: "280px" },
  },
  {
    color: "#232326",
    title: "Code Collab",
    description: "A real-time Collabrative IDE",
    label: "Web",
    link: "https://github.com/Parth-12pm/Code_Collab",
    image: "/code_collab.png",
    size: { minHeight: "180px", aspectRatio: "4/3", width: "280px" },
  },
  {
    color: "#232326",
    title: "StallSpot",
    description: "Discover World-Class Exhibitions",
    label: "Web",
    link: "https://github.com/Parth-12pm/next-stallSpot",
    image: "stallspot.png",
    size: { minHeight: "350px", aspectRatio: "4/4", width: "360px" },
  },
  // Row 2: big, small, small
  {
    color: "#232326",
    title: "Travel Mate",
    description: "A journal for your Travel Experiences",
    label: "App",
    link: "https://github.com/Parth-12pm/Travel_Mate",
    image: "/ic_launcher.png",
    size: { minHeight: "380px", aspectRatio: "6/4", width: "560px" },
  },
  {
    color: "#232326",
    title: "For More",
    link: "https://github.com/Parth-12pm/",
    image: "/solid_color.jpg",
    size: { minHeight: "180px", aspectRatio: "6/4", width: "360px" },
  },
];

const createParticleElement = (
  x: number,
  y: number,
  color: string = DEFAULT_GLOW_COLOR
): HTMLDivElement => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
});

const updateCardGlowProperties = (
  card: HTMLElement,
  mouseX: number,
  mouseY: number,
  glow: number,
  radius: number
) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty("--glow-x", `${relativeX}%`);
  card.style.setProperty("--glow-y", `${relativeY}%`);
  card.style.setProperty("--glow-intensity", glow.toString());
  card.style.setProperty("--glow-radius", `${radius}px`);
};

const ParticleCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  onClick?: () => void;
}> = ({
  children,
  className = "",
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(
        Math.random() * width,
        Math.random() * height,
        glowColor
      )
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        },
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(
          clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
        );

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1,
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        }
      );
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("click", handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("click", handleClick);
      clearAllParticles();
    };
  }, [
    animateParticles,
    clearAllParticles,
    disableAnimations,
    enableTilt,
    enableMagnetism,
    clickEffect,
    glowColor,
  ]);

  return (
    <div
      ref={cardRef}
      className={`${className} relative overflow-hidden`}
      style={{ ...style, position: "relative", overflow: "hidden" }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}> = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest(".bento-section");
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      isInsideSection.current = mouseInside || false;
      const cards = gridRef.current.querySelectorAll(".card");

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        cards.forEach((card) => {
          (card as HTMLElement).style.setProperty("--glow-intensity", "0");
        });
        return;
      }

      const { proximity, fadeDistance } =
        calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) -
          Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity =
            (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(
          cardElement,
          e.clientX,
          e.clientY,
          glowIntensity,
          spotlightRadius
        );
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll(".card").forEach((card) => {
        (card as HTMLElement).style.setProperty("--glow-intensity", "0");
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const BentoCardGrid: React.FC<{
  children: React.ReactNode;
  gridRef?: React.RefObject<HTMLDivElement | null>;
}> = ({ children, gridRef }) => (
  <div
    className="bento-section relative select-none w-full max-w-none px-4 py-6 md:px-6 md:py-8 lg:max-w-[64rem] lg:mx-auto"
    style={{ fontSize: "clamp(0.875rem, 0.8rem + 0.5vw, 1.125rem)" }}
    ref={gridRef}
  >
    {children}
  </div>
);

const useDeviceDetection = () => {
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width <= MOBILE_BREAKPOINT) {
        setDeviceType("mobile");
      } else if (width <= TABLET_BREAKPOINT) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return deviceType;
};

const MagicBento: React.FC<BentoProps> = ({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const deviceType = useDeviceDetection();
  const shouldDisableAnimations = disableAnimations || deviceType === "mobile";

  return (
    <>
      <style>
        {`
          .bento-section {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 200px;
            --glow-color: ${glowColor};
            --border-color: #333232;
            --background-dark: #000000;
            --white: hsl(0, 0%, 100%);
            --purple-primary: rgba(171, 191, 171, 1);
            --purple-glow: rgba(171, 191, 171, 0.2);
            --purple-border: rgba(181, 171, 181, 0.8);
          }
          
          /* Base mobile-first grid styles */
          .bento-grid {
            display: grid;
            gap: 0.75rem;
            width: 100%;
            grid-template-columns: 1fr;
          }
          
          /* Mobile styles (default) */
          @media (max-width: 767px) {
            .bento-grid {
              gap: 0.5rem;
              padding: 0;
            }
            
            .bento-grid .card {
              width: 100% !important;
              min-height: 160px !important;
              aspect-ratio: 1.2/1 !important;
            }
            
            .card__title {
              font-size: 1rem !important;
              line-height: 1.3 !important;
            }
            
            .card__description {
              font-size: 0.85rem !important;
              line-height: 1.4 !important;
            }
            
            .card__label {
              font-size: 0.75rem !important;
            }
          }
          
          /* Tablet styles */
          @media (min-width: 768px) and (max-width: 1023px) {
            .bento-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 1rem;
            }
            
            .bento-grid .card {
              min-height: 180px;
              aspect-ratio: 1.3/1;
            }
            
            /* Make the 3rd card (StallSpot) span full width on tablet */
            .bento-grid .card:nth-child(3) {
              grid-column: 1 / -1;
              aspect-ratio: 2.5/1;
            }
            
            /* Make the 4th card (Travel Mate) span full width on tablet */
            .bento-grid .card:nth-child(4) {
              grid-column: 1 / -1;
              aspect-ratio: 2.2/1;
            }
          }
          
          /* Desktop styles */
          @media (min-width: 1024px) {
            .bento-grid {
              grid-template-columns: repeat(4, 1fr);
              gap: 1rem;
            }
            
            .bento-grid .card {
              min-height: 200px;
            }
            
            /* First row: small, small, big (2x2) */
            .bento-grid .card:nth-child(1) {
              grid-column: 1;
              grid-row: 1;
              aspect-ratio: 1/1;
            }
            
            .bento-grid .card:nth-child(2) {
              grid-column: 2;
              grid-row: 1;
              aspect-ratio: 1/1;
            }
            
            .bento-grid .card:nth-child(3) {
              grid-column: 3 / 5;
              grid-row: 1 / 3;
              aspect-ratio: 1/1;
              min-height: 400px;
            }
            
            /* Second row: big (2x1), small */
            .bento-grid .card:nth-child(4) {
              grid-column: 1 / 3;
              grid-row: 2;
              aspect-ratio: 2/1;
              min-height: 180px;
            }
            
            .bento-grid .card:nth-child(5) {
              grid-column: 1 / 3;
              grid-row: 3;
              aspect-ratio: 2/1;
              min-height: 180px;
            }
          }
          
          /* Large desktop styles */
          @media (min-width: 1400px) {
            .bento-grid {
              gap: 1.25rem;
            }
            
            .bento-grid .card {
              min-height: 220px;
            }
            
            .bento-grid .card:nth-child(3) {
              min-height: 440px;
            }
          }
          
          /* Card base styles */
          .card {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow: hidden;
            padding: 1rem;
            border-radius: 1rem;
            border: 1px solid var(--border-color);
            font-weight: 300;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            background-size: cover;
            background-position: center;
            color: var(--white);
          }
          
          .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          }
          
          @media (max-width: 767px) {
            .card {
              padding: 0.875rem;
              border-radius: 0.875rem;
            }
            
            .card:hover {
              transform: translateY(-1px);
            }
          }
          
          .card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 6px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.8)) 0%,
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.4)) 30%,
                transparent 60%);
            border-radius: inherit;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: subtract;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: 1;
          }
          
          .card--border-glow:hover::after {
            opacity: 1;
          }
          
          .card--border-glow:hover {
            box-shadow: 0 4px 20px rgba(46, 24, 78, 0.4), 0 0 30px rgba(${glowColor}, 0.2);
          }
          
          .particle::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: rgba(${glowColor}, 0.2);
            border-radius: 50%;
            z-index: -1;
          }
          
          .particle-container:hover {
            box-shadow: 0 4px 20px rgba(46, 24, 78, 0.2), 0 0 30px rgba(${glowColor}, 0.2);
          }
          
          .card__header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 0.75rem;
            position: relative;
            z-index: 2;
            margin-bottom: 0.5rem;
          }
          
          .card__content {
            display: flex;
            flex-direction: column;
            position: relative;
            z-index: 2;
            flex-grow: 1;
            justify-content: flex-end;
          }
          
          .card__title {
            font-weight: 500;
            margin: 0 0 0.5rem 0;
            font-size: clamp(1rem, 1.5vw, 1.25rem);
            line-height: 1.3;
          }
          
          .card__description {
            font-size: clamp(0.875rem, 1.2vw, 1rem);
            line-height: 1.5;
            opacity: 0.9;
            margin: 0;
          }
          
          .card__label {
            font-size: clamp(0.75rem, 1vw, 0.875rem);
            opacity: 0.8;
            font-weight: 400;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          /* Special styling for the "For More" card */
          .bento-grid .card:nth-child(5) .card__title {
            font-size: clamp(1.5rem, 2.5vw, 2rem);
            font-weight: 600;
            text-align: center;
            margin: auto 0;
          }
          
          .text-clamp-1 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .text-clamp-2 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          /* Image overlay styles */
          .card-image-overlay {
            position: absolute;
            inset: 0;
            z-index: 0;
            background-size: cover;
            background-position: center;
            filter: blur(2px);
            opacity: 20;
            border-radius: inherit;
          }
          
          .card-dark-overlay {
            position: absolute;
            inset: 0;
            z-index: 1;
            background: rgba(35, 35, 38, 0.7);
            border-radius: inherit;
          }
          
          /* Responsive font scaling */
          @media (max-width: 480px) {
            .card__title {
              font-size: 0.95rem;
            }
            
            .card__description {
              font-size: 0.8rem;
            }
            
            .card__label {
              font-size: 0.7rem;
            }
          }
          
          /* Touch-friendly hover states for mobile */
          @media (hover: none) and (pointer: coarse) {
            .card:hover {
              transform: none;
              box-shadow: none;
            }
            
            .card:active {
              transform: scale(0.98);
              transition: transform 0.1s ease;
            }
          }
          
          /* Accessibility improvements */
          .card:focus {
            outline: 2px solid rgba(${glowColor}, 0.6);
            outline-offset: 2px;
          }
          
          .card:focus:not(:focus-visible) {
            outline: none;
          }
          
          /* High contrast mode support */
          @media (prefers-contrast: high) {
            .card {
              border: 2px solid;
            }
            
            .card__title {
              font-weight: 600;
            }
          }
          
          /* Reduced motion support */
          @media (prefers-reduced-motion: reduce) {
            .card,
            .card:hover {
              transition: none;
              transform: none;
            }
            
            .particle {
              animation: none !important;
            }
          }
        `}
      </style>

      {enableSpotlight && deviceType !== "mobile" && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={
            deviceType === "tablet" ? spotlightRadius * 0.8 : spotlightRadius
          }
          glowColor={glowColor}
        />
      )}

      <BentoCardGrid gridRef={gridRef}>
        <div className="bento-grid">
          {cardData.map((card, index) => {
            const baseClassName = `card ${
              enableBorderGlow && deviceType !== "mobile"
                ? "card--border-glow"
                : ""
            }`;

            const cardStyle = {
              backgroundColor: card.image
                ? undefined
                : card.color || "var(--background-dark)",
              borderColor: "var(--border-color)",
              color: "var(--white)",
              "--glow-x": "50%",
              "--glow-y": "50%",
              "--glow-intensity": "0",
              "--glow-radius": "200px",
            } as React.CSSProperties;

            const handleCardClick = () => {
              if (card.link) {
                window.open(card.link, "_blank", "noopener,noreferrer");
              }
            };

            const CardContent = (
              <>
                {/* Blurred background image */}
                {card.image && (
                  <div
                    className="card-image-overlay"
                    style={{
                      backgroundImage: `url(${card.image})`,
                    }}
                  />
                )}
                {/* Overlay for better text contrast */}
                {card.image && <div className="card-dark-overlay" />}

                {/* Card content */}
                <div className="card__header">
                  {card.label && (
                    <span className="card__label">{card.label}</span>
                  )}
                </div>

                <div className="card__content">
                  {card.title && (
                    <h3
                      className={`card__title ${
                        index === cardData.length - 1 ? "text-center" : ""
                      } ${textAutoHide ? "text-clamp-1" : ""}`}
                    >
                      {card.title}
                    </h3>
                  )}
                  {card.description && (
                    <p
                      className={`card__description ${
                        textAutoHide ? "text-clamp-2" : ""
                      }`}
                    >
                      {card.description}
                    </p>
                  )}
                </div>
              </>
            );

            // Use ParticleCard for desktop with stars enabled, regular div otherwise
            if (enableStars && deviceType === "desktop") {
              return (
                <ParticleCard
                  key={index}
                  className={baseClassName}
                  style={cardStyle}
                  disableAnimations={shouldDisableAnimations}
                  particleCount={particleCount}
                  glowColor={glowColor}
                  enableTilt={enableTilt && deviceType === "desktop"}
                  clickEffect={clickEffect}
                  enableMagnetism={enableMagnetism && deviceType === "desktop"}
                  onClick={handleCardClick}
                >
                  {CardContent}
                </ParticleCard>
              );
            }

            // Regular card for mobile and tablet, or when stars are disabled
            return (
              <div
                key={index}
                className={baseClassName}
                style={cardStyle}
                onClick={handleCardClick}
                tabIndex={0}
                role="button"
                aria-label={`Open ${card.title || "project"} ${card.link ? "in new tab" : ""}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick();
                  }
                }}
              >
                {CardContent}
              </div>
            );
          })}
        </div>
      </BentoCardGrid>
    </>
  );
};

export default MagicBento;
