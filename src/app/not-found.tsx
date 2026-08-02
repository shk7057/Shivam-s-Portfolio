import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section-viewport grid place-items-center bg-background px-6">
      <div className="text-center">
        <p className="text-xs font-medium uppercase text-muted-foreground">404</p>
        <h1 className="mt-4 text-4xl font-medium uppercase text-foreground sm:text-5xl">
          Page Not Found
        </h1>
        <div className="mt-8">
          <Link
            href="/"
            className="text-xs font-medium uppercase tracking-wider text-primary hover:underline"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
