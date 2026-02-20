import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.dev"),
  title: "Barshan Ghosh | B.Tech IT Student Portfolio",
  description:
    "Portfolio of Barshan Ghosh, a B.Tech Information Technology student building modern, high-performance web products.",
  keywords: [
    "developer portfolio",
    "barshan ghosh",
    "b.tech information technology",
    "next.js portfolio",
    "typescript",
    "student developer",
    "framer motion",
  ],
  openGraph: {
    title: "Barshan Ghosh | B.Tech IT Student Portfolio",
    description:
      "Modern portfolio showcasing projects, skills, and web development work by Barshan Ghosh.",
    type: "website",
    url: "https://example.dev",
    siteName: "Barshan Ghosh Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Barshan Ghosh | B.Tech IT Student Portfolio",
    description:
      "Modern portfolio showcasing projects, skills, and web development work by Barshan Ghosh.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased transition-colors duration-500">
        {children}
      </body>
    </html>
  );
}
