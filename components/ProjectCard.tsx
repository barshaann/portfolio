"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  demoUrl: string;
  repoUrl: string;
};

type ProjectCardProps = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: "easeInOut" }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/75 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{project.title}</h3>
      <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-slate-300/90 bg-white px-2.5 py-1 text-xs font-medium text-slate-800 dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-slate-300">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-500/25 dark:bg-cyan-300 dark:text-slate-950 dark:hover:bg-cyan-200 dark:hover:shadow-cyan-300/25"
        >
          Live Demo
          <FiArrowUpRight className="h-4 w-4" />
        </a>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white/80 px-4 py-2 text-sm text-slate-700 transition hover:border-cyan-500/70 hover:text-cyan-700 dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:border-cyan-300/70 dark:hover:text-cyan-200"
        >
          Code
          <FiGithub className="h-4 w-4" />
        </a>
      </div>
    </motion.article>
  );
}
