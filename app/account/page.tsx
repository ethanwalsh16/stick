import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description: "Manage account details and preferences.",
};

export default function AccountPage() {
  return (
    <section className="max-w-2xl space-y-8">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          Account
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Manage your account.
        </h1>
        <p className="text-base leading-7 text-zinc-600 dark:text-zinc-300">
          Use this page for profile details, security settings, billing, or user preferences.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
          <h2 className="text-lg font-medium">Profile</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            Display user information and editable profile fields here.
          </p>
        </article>
        <article className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
          <h2 className="text-lg font-medium">Preferences</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            Add theme, notification, and privacy controls here.
          </p>
        </article>
      </div>
    </section>
  );
}