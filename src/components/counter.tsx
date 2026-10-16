"use client";

import { useState } from "react";

export interface CounterProps {
  label: string;
  step: number;
}

export default function Counter({ label, step }: CounterProps) {
  const [count, setCount] = useState(0);

  return (
    <section className="flex w-full max-w-md flex-col items-center rounded-2xl border border-black/[.08] bg-white p-8 text-center dark:border-white/[.145] dark:bg-zinc-950">
      <h2 className="text-sm font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
        {label}
      </h2>
      <p
        aria-live="polite"
        className="mt-2 text-6xl font-semibold tabular-nums text-black dark:text-zinc-50"
      >
        {count}
      </p>
      <button
        type="button"
        onClick={() => setCount((current) => current + step)}
        aria-label={`Increment ${label} by ${step}`}
        className="mt-6 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-[#383838] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground dark:hover:bg-[#ccc]"
      >
        Increment by {step}
      </button>
    </section>
  );
}
