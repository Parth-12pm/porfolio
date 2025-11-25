"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Card } from "@/components/ui/card";

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  date: string;
  description: string;
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    title: "Bachelor's in Computer Engineering",
    company: "Mct's Rajiv Gandhi Institute Of Technology",
    date: "Jul 2028 (Expected)",
    description:
      "Pursuing a Bachelor's degree in Computer Engineering with a focus on advanced software development. Actively researching and implementing solutions in machine learning and AI integration.",
    skills: ["Computer Science", "AI/ML", "Software Engineering"],
  },
  {
    id: 2,
    title: "Diploma in Information Technology",
    company: "Vidyalankar Polytechnic",
    date: "Jun 2025",
    description:
      "Achieved a Diploma with Distinction (89.81%). Mastered core web development technologies and built a strong foundation in algorithmic problem-solving and system design.",
    skills: ["Information Technology", "Web Development", "Java"],
  },
  {
    id: 3,
    title: "Junior Software Engineer",
    company: "Hertzsoft Technologies Pvt. Ltd.",
    date: "Jun 2024 - Jul 2024",
    description:
      "Architected and deployed comprehensive Android applications and management systems. Engineered seamless integration between frontend interfaces and backend databases, optimizing data flow and user experience.",
    skills: ["Android Studio", "Java", "SQL", "Full Stack Development"],
  },
];

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-20 px-4 md:px-8 relative" ref={containerRef}>
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground"
        >
          My Journey
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          Skilled in the Next.js stack and core web development technologies.
          Experienced in Android development with Java and database management.
          Currently expanding expertise in machine learning and AI, working with
          tools like FastAPI and MongoDB for end-to-end integration.
        </motion.p>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2">
            <motion.div
              style={{ height }}
              className="absolute top-0 left-0 w-full bg-primary origin-top"
            />
          </div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <TimelineItem key={exp.id} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  experience,
  index,
}: {
  experience: ExperienceItem;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex items-center md:justify-between ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Dot on the line */}
      <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-background border-2 border-primary rounded-full -translate-x-1/2 z-10" />

      {/* Content Card */}
      <div className="ml-12 md:ml-0 md:w-[45%]">
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  {experience.title}
                </h3>
                <p className="text-primary font-medium">{experience.company}</p>
              </div>
              <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                {experience.date}
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              {experience.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {experience.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </div>
      
      {/* Spacer for the other side on desktop */}
      <div className="hidden md:block md:w-[45%]" />
    </motion.div>
  );
}
