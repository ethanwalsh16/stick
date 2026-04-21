import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Focus Area",
  description: "Define a new swing change or area of your game to work on.",
};

export default function NewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
