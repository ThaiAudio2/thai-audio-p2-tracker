import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-canvas px-6">
      <div className="text-center">
        <Logo className="mx-auto h-10 w-10" />
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">
          404 — Not found
        </p>
        <h1 className="mt-3 text-display-sm">This page took a different track.</h1>
        <p className="mx-auto mt-3 max-w-md text-ink-500">
          The page you’re looking for doesn’t exist or may have moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex h-11 items-center gap-2 rounded-card bg-ink px-5 text-sm font-medium text-canvas transition-colors hover:bg-ink-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to the seminar
        </Link>
      </div>
    </main>
  );
}
