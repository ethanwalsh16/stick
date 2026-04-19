import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NavHeader } from "@/app/components/nav-header";
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
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 sm:px-8 lg:px-10">
          <NavHeader />
          <main className="flex flex-1 flex-col py-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
