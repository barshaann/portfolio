export default function Footer() {
  return (
    <footer className="border-t border-slate-200/70 dark:border-white/10 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-6 text-sm text-slate-600 dark:text-slate-400 lg:px-10">
        <p>© {new Date().getFullYear()} Barshan Ghosh. All rights reserved.</p>
      </div>
    </footer>
  );
}
