import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
        404
      </p>
      <h1 className="mt-4 font-sans text-3xl font-semibold text-white md:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md font-mono text-sm text-white/50">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="focus-accent mt-10 inline-flex rounded-full bg-accent px-8 py-3 font-sans text-sm font-semibold text-black transition-colors hover:bg-accent-hover"
      >
        Back to homepage
      </Link>
    </div>
  );
}
