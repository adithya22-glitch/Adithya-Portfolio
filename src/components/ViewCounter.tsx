import { useEffect, useState } from "react";

type Props = {
  id: string;                // e.g. "site" or `project-${title}`
  className?: string;
  namespace?: string;        // optional override if you want to group counters
};

/**
 * ViewCounter
 * - Increments + reads a counter via CountAPI.
 * - Falls back gracefully to 0 (and localStorage cache) if blocked/offline.
 */
export default function ViewCounter({
  id,
  className = "",
  namespace = "adithya-portfolio",
}: Props) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    // 1) optimistic: show cached value quickly so something renders
    try {
      const cached = localStorage.getItem(`vcache:${namespace}:${id}`);
      if (cached && !isNaN(Number(cached))) {
        setCount(Number(cached));
      }
    } catch {/* ignore */}

    // 2) hit CountAPI with a short timeout
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 2000);

    const url = `https://api.countapi.xyz/hit/${encodeURIComponent(namespace)}/${encodeURIComponent(id)}`;

    fetch(url, { signal: controller.signal })
      .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
      .then(d => {
        if (cancelled) return;
        const value = typeof d?.value === "number" ? d.value : 0;
        setCount(value);
        try {
          localStorage.setItem(`vcache:${namespace}:${id}`, String(value));
        } catch {/* ignore */}
      })
      .catch(() => {
        if (cancelled) return;
        // Even if blocked or offline, render something
        setCount((prev) => (prev == null ? 0 : prev));
      })
      .finally(() => clearTimeout(t));

    return () => {
      cancelled = true;
      clearTimeout(t);
      controller.abort();
    };
  }, [id, namespace]);

  // Always render a pill so you can see it even if fetch fails
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs text-neutral-600 bg-white/70 ${className}`}
      title={`Counter: ${namespace}/${id}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      {count === null ? "…" : `${count.toLocaleString()} views`}
    </span>
  );
}
