"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export interface ProjectDetails {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  challenge: string;
  solution: string;
  results: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectDetails | null;
}

export default function ProjectModal({
  isOpen,
  onClose,
  project,
}: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none"
          >
            <div className="bg-background border border-border rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto pointer-events-auto relative flex flex-col">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Header */}
              <div className="relative h-48 sm:h-64 w-full shrink-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <h2 className="text-3xl font-bold text-foreground">
                    {project.title}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-8">
                {/* Links & Tags */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4 mr-2" /> Code
                        </a>
                      </Button>
                    )}
                    {project.link && (
                      <Button size="sm" asChild>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Case Study Sections */}
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">
                        The Challenge
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {project.challenge}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">
                        The Solution
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-muted/50 p-4 rounded-lg border border-border">
                      <h3 className="text-lg font-semibold mb-2 text-foreground">
                        Key Results
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {project.results}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
