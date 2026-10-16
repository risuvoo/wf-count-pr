import Counter from "@/components/counter";

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
          A minimal counting application built with the Next.js App Router.
          Activate the counter below to see it increment.
        </p>

        <Counter label="Counter A" step={1} />
      </main>
    </div>
  );
}
