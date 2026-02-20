"use client";

import { motion } from "framer-motion";

const skills = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "MySQL",
  "Git & GitHub",
  "REST APIs",
  "Java",
];

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-200/85">About</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">B.Tech IT student with a builder mindset.</h2>
            <p className="mt-5 max-w-2xl text-slate-700 dark:text-slate-300">
              I am pursuing B.Tech in Information Technology at Dr. B.C. Roy Engineering College (2022-2026), and actively building modern web projects to sharpen my skills in frontend engineering, backend fundamentals, and real-world product development.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <p className="text-sm text-slate-600 dark:text-slate-300">Core toolkit</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.06, ease: "easeInOut" }}
                  className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-800 transition hover:-translate-y-0.5 hover:border-cyan-600/60 dark:border-cyan-300/25 dark:bg-cyan-400/10 dark:text-cyan-100 dark:hover:border-cyan-300/60"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
