"use client";

import { motion } from "framer-motion";
import About from "@/components/About";
import AnimatedBackground from "@/components/AnimatedBackground";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />

      {/* Page-level fade sets a polished initial entrance for the full layout. */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.65, ease: "easeInOut" }}
        className="relative"
      >
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </motion.main>
    </>
  );
}
