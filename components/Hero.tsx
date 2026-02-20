"use client";

import { motion } from "framer-motion";
import { FiArrowRight, FiGithub, FiLinkedin } from "react-icons/fi";
import { useTypewriter } from "@/hooks/useTypewriter";

const phrases = [
  "am Barshan Ghosh.",
  "build modern web experiences.",
  "love clean code & refined UI.",
];

const highlightedName = "Barshan Ghosh";
const firstPhrase = phrases[0];
const nameStartIndex = firstPhrase.indexOf(highlightedName);

export default function Hero() {
  const { text, wordIndex } = useTypewriter({
    words: phrases,
    typeSpeed: 64,
    deleteSpeed: 42,
    pauseDuration: 1800,
  });

  const renderTypedText = () => {
    if (wordIndex !== 0 || nameStartIndex < 0) return text;

    const safeNameStart = Math.min(nameStartIndex, text.length);
    const beforeName = text.slice(0, safeNameStart);
    const typedNameLength = Math.max(0, Math.min(highlightedName.length, text.length - nameStartIndex));
    const typedName = highlightedName.slice(0, typedNameLength);
    const afterName = text.slice(nameStartIndex + typedNameLength);

    return (
      <>
        {beforeName}
        {typedName && (
          <span className="bg-gradient-to-r from-cyan-700 via-sky-700 to-emerald-700 bg-clip-text text-transparent dark:from-cyan-200 dark:via-sky-300 dark:to-emerald-200">
            {typedName}
          </span>
        )}
        {afterName}
      </>
    );
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center px-6 pt-24 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1fr]"
      >
        <div>
          <p className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-700 dark:border-cyan-300/30 dark:bg-cyan-400/10 dark:text-cyan-200">
            B.Tech Student • Information Technology
          </p>

          <h1 className="mt-8 min-h-[7.5rem] text-left text-4xl font-bold leading-[1.12] tracking-tight text-slate-900 dark:text-white sm:min-h-[8.5rem] sm:text-5xl md:min-h-[10rem] md:text-6xl">
            <span aria-live="polite">
              I {renderTypedText()}
            </span>
            <span aria-hidden="true" className="typewriter-cursor">
              |
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-left text-base text-slate-700 dark:text-slate-300 sm:text-lg">
            Crafting premium frontend interfaces with Next.js, TypeScript, motion, and a clean product-first design approach.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-cyan-500"
            >
              View Projects
              <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-slate-300/90 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-cyan-500/70 hover:text-cyan-700 dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:border-cyan-300/70 dark:hover:text-cyan-300"
            >
              Let&apos;s Connect
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <a
              href="https://github.com/barshaann"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-full border border-slate-300/90 bg-white/80 p-3 text-slate-700 transition hover:-translate-y-0.5 hover:border-cyan-500/70 hover:text-cyan-700 dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-cyan-300/70 dark:hover:text-cyan-300"
            >
              <FiGithub className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/barshaann/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="rounded-full border border-slate-300/90 bg-white/80 p-3 text-slate-700 transition hover:-translate-y-0.5 hover:border-cyan-500/70 hover:text-cyan-700 dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-cyan-300/70 dark:hover:text-cyan-300"
            >
              <FiLinkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeInOut" }}
          className="relative hidden min-h-[460px] lg:block"
        >
          <motion.div
            className="absolute left-1/2 top-[44%] h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-slate-400/55 shadow-[0_0_30px_rgba(59,130,246,0.15)] dark:border-cyan-300/35 dark:shadow-[0_0_30px_rgba(103,232,249,0.12)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500 shadow-[0_0_16px_rgba(14,165,233,0.75)] dark:bg-cyan-300 dark:shadow-[0_0_16px_rgba(103,232,249,0.8)]" />
          </motion.div>
          <motion.div
            className="absolute left-1/2 top-[44%] h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-slate-500/45 shadow-[0_0_24px_rgba(59,130,246,0.12)] dark:border-sky-300/35 dark:shadow-[0_0_24px_rgba(125,211,252,0.12)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 42, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <span className="absolute left-0 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-600 shadow-[0_0_14px_rgba(2,132,199,0.7)] dark:bg-sky-300 dark:shadow-[0_0_14px_rgba(125,211,252,0.75)]" />
          </motion.div>
          <motion.div
            className="absolute left-1/2 top-[44%] h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-emerald-500/45 shadow-[0_0_20px_rgba(16,185,129,0.14)] dark:border-emerald-300/35 dark:shadow-[0_0_20px_rgba(110,231,183,0.12)]"
            animate={{ rotate: -360 }}
            transition={{ duration: 36, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <span className="absolute left-1/2 top-full h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600 shadow-[0_0_14px_rgba(5,150,105,0.7)] dark:bg-emerald-300 dark:shadow-[0_0_14px_rgba(110,231,183,0.75)]" />
          </motion.div>

          <div className="absolute left-1/2 top-[44%] h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-slate-200/80 bg-white/75 p-4 shadow-xl shadow-slate-300/20 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/55 dark:shadow-cyan-900/20">
            <div className="relative h-full overflow-hidden rounded-2xl border border-dashed border-cyan-500/35 dark:border-cyan-300/35">
              <motion.div
                className="absolute -left-6 -top-6 h-14 w-14 rounded-full bg-cyan-500/30 blur-xl dark:bg-cyan-300/30"
                animate={{ x: [0, 10, 0], y: [0, 8, 0] }}
                transition={{ duration: 4.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-6 -right-6 h-14 w-14 rounded-full bg-emerald-500/25 blur-xl dark:bg-emerald-300/25"
                animate={{ x: [0, -8, 0], y: [0, -10, 0] }}
                transition={{ duration: 4.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <div className="absolute inset-3 rounded-xl border border-slate-300/60 bg-white/70 dark:border-slate-700/60 dark:bg-slate-900/65">
                <div className="flex h-full flex-col justify-center gap-2 px-3">
                  <div className="h-1.5 w-16 rounded-full bg-cyan-500/70 dark:bg-cyan-300/70" />
                  <div className="h-1.5 w-12 rounded-full bg-sky-500/60 dark:bg-sky-300/60" />
                  <div className="h-1.5 w-14 rounded-full bg-emerald-500/60 dark:bg-emerald-300/60" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
