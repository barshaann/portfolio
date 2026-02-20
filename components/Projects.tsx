"use client";

import { motion } from "framer-motion";
import projects from "@/data/projects.json";
import ProjectCard, { type Project } from "./ProjectCard";

export default function Projects() {
  const list = projects as Project[];

  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-200/85">Projects</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">Featured projects</h2>
          <p className="mt-4 max-w-2xl text-slate-700 dark:text-slate-300">
            Projects that reflect my learning journey in modern web development, with focus on clean UI and practical engineering.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {list.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
