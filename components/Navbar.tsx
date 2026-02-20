"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiBars3BottomRight, HiXMark } from "react-icons/hi2";
import { FiMoon, FiSun } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [darkMode, setDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    queueMicrotask(() => {
      setDarkMode(storedTheme !== "light");
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!mounted) return;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode, mounted]);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.45 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navClass = useMemo(
    () =>
      isScrolled
        ? "border-slate-300/80 bg-white/85 shadow-xl shadow-slate-300/25 dark:border-cyan-300/20 dark:bg-slate-950/75 dark:shadow-2xl dark:shadow-cyan-900/20"
        : "border-slate-200/80 bg-white/75 dark:border-white/10 dark:bg-slate-950/45",
    [isScrolled]
  );

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
    >
      <nav className={`mx-auto mt-2 flex h-16 w-[calc(100%-1.5rem)] max-w-6xl items-center justify-between rounded-2xl border px-6 backdrop-blur-xl transition-all duration-500 lg:px-10 ${navClass}`}>
        <Link href="#home" className="text-sm font-semibold tracking-[0.24em] text-slate-900 dark:text-slate-100">
          BARSHAN
        </Link>

        <ul className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    isActive ? "text-cyan-700 dark:text-cyan-300" : "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
            className="rounded-full border border-slate-300/80 bg-white/80 p-2 text-slate-700 transition hover:border-cyan-500/70 hover:text-cyan-600 dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:border-cyan-300/70 dark:hover:text-cyan-300"
          >
            {darkMode ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
          </button>

          <button
            aria-label="Toggle menu"
            className="rounded-full border border-slate-300/80 bg-white/80 p-2 text-slate-700 dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-200 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <HiXMark className="h-5 w-5" /> : <HiBars3BottomRight className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="mx-4 mb-4 rounded-2xl border border-slate-200/70 bg-white/95 p-3 shadow-xl dark:border-slate-700/70 dark:bg-slate-900/95 md:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-cyan-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-cyan-300"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
