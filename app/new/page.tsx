import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New",
  description: "Create a new item in the app.",
};

export default function NewPage() {
  return (
    <section className="max-w-2xl space-y-8">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          New
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Create something new.
        </h1>
        <p className="text-base leading-7 text-zinc-600 dark:text-zinc-300">
          This route is ready for a creation flow, such as a form, editor, or onboarding step.
        </p>
      </div>

      <div className="rounded-2xl border border-dashed border-zinc-300 p-6 dark:border-zinc-700">
        <h2 className="text-lg font-medium">Template area</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          Add your inputs, validation, and submit actions here.
        </p>
      </div>
    </section>
  );
}