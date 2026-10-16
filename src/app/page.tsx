export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-24 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center gap-8 text-center">
        <span className="rounded-full border border-black/[.08] px-4 py-1.5 text-sm font-medium text-zinc-600 dark:border-white/[.145] dark:text-zinc-400">
          Next.js · TypeScript · Tailwind CSS
        </span>

        <h1 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl dark:text-zinc-50">
          Counter App
        </h1>

        <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          A minimal starting point for a counting application built with the
          Next.js App Router. This first step sets up the project and introduces
          the app — the interactive counter comes next.
        </p>

        <section className="mt-4 w-full max-w-md rounded-2xl border border-black/[.08] bg-white p-8 dark:border-white/[.145] dark:bg-zinc-950">
          <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
            Current count
          </p>
          <p className="mt-2 text-6xl font-semibold tabular-nums text-black dark:text-zinc-50">
            0
          </p>
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            Read-only preview. Increment and reset controls are not implemented
            yet.
          </p>
        </section>
      </main>
    </div>
  );
}
