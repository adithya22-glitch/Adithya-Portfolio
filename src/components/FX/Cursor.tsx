import { useEffect, useRef, useState } from "react";

type Variant = "default" | "hover" | "down" | "magnetic";

const isTouchOrNoHover = () =>
  window.matchMedia("(pointer: coarse), (hover: none)").matches;

const isReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], [data-cursor="hover"], [data-magnetic], .magnetic';

export default function Cursor() {
  const ref = useRef<HTMLDivElement | null>(null);

  // logical position (lerped) vs target
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const target = useRef({ x: pos.current.x, y: pos.current.y });
  const rafId = useRef<number | null>(null);

  const [variant, setVariant] = useState<Variant>("default");
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect touch / no-hover / reduced motion
    if (isTouchOrNoHover() || isReducedMotion()) {
      setEnabled(false);
      return;
    }

    // hide native cursor
    document.documentElement.classList.add("cursor-none");

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const onDown = () => setVariant((v) => (v === "magnetic" ? "magnetic" : "down"));
    const onUp = () => setVariant("default");

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest(INTERACTIVE_SELECTOR);
      setVariant(el ? (el.hasAttribute("data-magnetic") ? "magnetic" : "hover") : "default");
    };
    const onOut = () => setVariant("default");

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);

    // lerp animation
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
    const tick = () => {
      // smoother follow
      pos.current.x = lerp(pos.current.x, target.current.x, 0.18);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.18);

      if (ref.current) {
        const scale =
          variant === "down" ? 0.95 : variant === "hover" ? 1.5 : variant === "magnetic" ? 2.0 : 1;
        ref.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) scale(${scale})`;
        ref.current.dataset.variant = variant;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [variant]);

  if (!enabled) return null;

  return <div ref={ref} className="custom-cursor" aria-hidden="true" />;
}
