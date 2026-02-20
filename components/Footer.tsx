export default function Footer() {
  return (
    <footer className="border-t border-slate-200/70 dark:border-white/10 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-slate-600 dark:text-slate-400 sm:flex-row lg:px-10">
        <p>© {new Date().getFullYear()} Barshan Ghosh. All rights reserved.</p>
        <p>B.Tech Information Technology • Modern Web Developer</p>
      </div>
    </footer>
  );
}
