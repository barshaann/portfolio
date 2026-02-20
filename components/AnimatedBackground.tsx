"use client";

import { motion } from "framer-motion";

const blobTransition = {
  duration: 22,
  repeat: Number.POSITIVE_INFINITY,
  repeatType: "mirror" as const,
  ease: "easeInOut" as const,
};

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0 dark:hidden"
        animate={{
          background: [
            "radial-gradient(circle at 20% 10%, rgba(14,165,233,0.14), transparent 42%), radial-gradient(circle at 80% 90%, rgba(34,197,94,0.12), transparent 48%), #f8fafc",
            "radial-gradient(circle at 80% 20%, rgba(14,165,233,0.12), transparent 45%), radial-gradient(circle at 20% 80%, rgba(59,130,246,0.14), transparent 42%), #f8fafc",
            "radial-gradient(circle at 40% 10%, rgba(56,189,248,0.13), transparent 46%), radial-gradient(circle at 70% 80%, rgba(16,185,129,0.12), transparent 50%), #f8fafc",
          ],
        }}
        transition={{ duration: 24, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 hidden dark:block"
        animate={{
          background: [
            "radial-gradient(circle at 20% 10%, rgba(14,165,233,0.22), transparent 42%), radial-gradient(circle at 80% 90%, rgba(34,197,94,0.14), transparent 48%), #020617",
            "radial-gradient(circle at 80% 20%, rgba(14,165,233,0.18), transparent 45%), radial-gradient(circle at 20% 80%, rgba(59,130,246,0.18), transparent 42%), #020617",
            "radial-gradient(circle at 40% 10%, rgba(56,189,248,0.2), transparent 46%), radial-gradient(circle at 70% 80%, rgba(16,185,129,0.14), transparent 50%), #020617",
          ],
        }}
        transition={{ duration: 24, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -top-20 left-[8%] h-72 w-72 rounded-full bg-cyan-400/15 dark:bg-cyan-400/20 blur-3xl"
        animate={{ x: [0, 80, -30], y: [0, -30, 40] }}
        transition={blobTransition}
      />
      <motion.div
        className="absolute right-[6%] top-[25%] h-80 w-80 rounded-full bg-blue-500/12 dark:bg-blue-500/15 blur-3xl"
        animate={{ x: [0, -70, 25], y: [0, 35, -25] }}
        transition={blobTransition}
      />
      <motion.div
        className="absolute bottom-[8%] left-[30%] h-72 w-72 rounded-full bg-emerald-400/12 dark:bg-emerald-400/15 blur-3xl"
        animate={{ x: [0, 45, -35], y: [0, -35, 15] }}
        transition={blobTransition}
      />

      {/* Lightweight particle-style pattern for depth without canvas overhead. */}
      <div className="absolute inset-0 opacity-10 dark:opacity-25 [background-image:radial-gradient(circle_at_center,rgba(148,163,184,0.45)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="noise-overlay absolute inset-0 opacity-10 dark:opacity-50" />
    </div>
  );
}
