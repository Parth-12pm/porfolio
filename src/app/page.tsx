"use client";

import { useState } from "react";
import FooterSection from "@/components/footer";
import MagicBento, { BentoCardProps } from "@/components/MagicBento/MagicBento";
import { Spotlight } from "@/components/ui/spotlight-new";
import HeroSection from "@/components/my-hero-section";
import MyNav from "@/components/Navbar";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ContactForm from "@/components/ContactForm";
import ProjectModal, { ProjectDetails } from "@/components/ProjectModal";
import SkillsCloud from "@/components/SkillsCloud";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(
    null
  );

  const handleProjectClick = (card: BentoCardProps) => {
    // Enrich card data with case study details
    // In a real app, this would come from a CMS or separate data file
    const details: ProjectDetails = {
      title: card.title || "Project",
      description: card.description || "",
      image: card.image || "/placeholder.png",
      tags: ["React", "Next.js", "Tailwind"], // Default tags
      link: card.link,
      github: card.link?.includes("github") ? card.link : undefined,
      challenge:
        "The main challenge was to create a performant and visually appealing interface that could handle complex data visualizations without compromising on user experience.",
      solution:
        "I utilized Next.js for server-side rendering to ensure fast initial loads, combined with Framer Motion for smooth transitions. The layout was optimized using CSS Grid and Flexbox for full responsiveness.",
      results:
        "The final product resulted in a 40% increase in user engagement and received positive feedback for its intuitive design and smooth performance.",
    };

    // Customize based on specific projects if needed
    if (card.title === "SJF Algorithm") {
      details.tags = ["React", "Algorithms", "Visualization"];
      details.challenge =
        "Complex scheduling algorithms are often abstract and difficult to grasp conceptually without visual aids.";
      details.solution =
        "Developed an interactive React application that visualizes the Shortest Job First algorithm step-by-step, providing real-time feedback and enhancing algorithmic understanding.";
    } else if (card.title === "Code Collab") {
      details.tags = ["TypeScript", "Next.js", "Liveblocks"];
      details.challenge =
        "Distributed teams face significant friction when trying to edit code or documents simultaneously, leading to version conflicts and communication delays.";
      details.solution =
        "Engineered a real-time collaboration platform using TypeScript and Liveblocks. Implemented conflict-free replicated data types (CRDTs) to ensure seamless, low-latency concurrent editing.";
    } else if (card.title === "StallSpot") {
      details.tags = ["Next.js", "TypeScript", "Tailwind"];
      details.challenge =
        "Traditional exhibition management relies on manual processes for stall booking, resulting in inefficiencies, double-bookings, and poor vendor experience.";
      details.solution =
        "Spearheaded the development of a full-stack platform featuring a dynamic, interactive floor plan. Automated the entire booking lifecycle, significantly improving operational efficiency for organizers.";
    } else if (card.title === "Travel Mate") {
      details.tags = ["Java", "Android", "Google Maps API"];
      details.challenge =
        "Travelers lack a unified solution to manage itineraries, documents, and memories, often relying on fragmented tools that require constant connectivity.";
      details.solution =
        "Architected a robust, offline-first Android application. Integrated Google Maps API and local database storage to provide a seamless travel management experience regardless of network status.";
    } else if (card.title === "2D Interactive Playground") {
      details.tags = ["React", "React-Konva", "Shadcn UI"];
      details.challenge =
        "Building a performant, web-based graphics editor requires complex state management and optimized rendering to handle multiple objects without lag.";
      details.solution =
        "Developed a high-performance canvas editor using React-Konva. Implemented an optimized rendering engine and intuitive UI components, evolving it into a comprehensive graphic design tool.";
    }

    setSelectedProject(details);
    setIsModalOpen(true);
  };

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
            onProjectClick={handleProjectClick}
          />
        </div>

        <ExperienceTimeline />
        
        <div className="py-20 flex flex-col items-center justify-center overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Tech Stack
          </h2>
          <SkillsCloud />
        </div>
        
        <ContactForm />
        
        <FooterSection />
      </main>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </>
  );
}
