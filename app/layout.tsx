import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Stick",
    template: "%s | Stick",
  },
  description: "A tool to track effectiveness of golf swing changes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-6 sm:px-8 lg:px-10">
          <header className="flex flex-col gap-4 border-b border-zinc-200 pb-6 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Stick
            </Link>
            <nav aria-label="Primary" className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-300">
              <Link href="/new" className="transition-colors hover:text-zinc-950 dark:hover:text-white">
                New
              </Link>
              <Link href="/account" className="transition-colors hover:text-zinc-950 dark:hover:text-white">
                Account
              </Link>
            </nav>
          </header>
          <main className="flex-1 py-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
