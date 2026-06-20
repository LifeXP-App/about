import { Link } from "react-router-dom";
import { APP_URL } from "../data.jsx";

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <Link to="/" className="font-serif text-lg font-semibold text-text">
            LifeXP
          </Link>
          <p className="mt-1 text-sm text-faint">
            Built for those who believe progress should be visible.
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted">
          <a href="/#aspects" className="transition-colors hover:text-text">Aspects</a>
          <Link to="/community" className="transition-colors hover:text-text">Community</Link>
          <a href={APP_URL} className="transition-colors hover:text-text">Open app</a>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-center text-xs text-faint sm:text-left">
        © 2026 LifeXP. All rights reserved.
      </p>
    </footer>
  );
}
