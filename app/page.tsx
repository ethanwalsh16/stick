import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Track and manage your golf swing focus areas.",
};

export default function Home() {
  return (
    <section className="space-y-8">
      <div className="max-w-2xl space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          Home
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          A simple starting point for your app.
        </h1>
        <p className="text-base leading-7 text-zinc-600 dark:text-zinc-300">
          This home page is a server component template that can grow into a landing page,
          dashboard, or product overview.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
          <h2 className="text-lg font-medium">Start a new item</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            Use the new page as the place for creating drafts, records, or workflows.
          </p>
        </article>
        <article className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
          <h2 className="text-lg font-medium">Account settings</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            Keep profile details, preferences, and billing screens on the account route.
          </p>
        </article>
      </div>
    </section>
  );
}
