import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="glass-panel flex min-h-[60vh] flex-col items-center justify-center rounded-3xl p-8 text-center">
      <p className="text-sm font-semibold text-cyan-300">404</p>
      <h2 className="mt-2 text-3xl font-semibold text-white">Page not found</h2>
      <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
