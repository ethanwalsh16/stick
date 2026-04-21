import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Overview of your Stick profile.",
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
