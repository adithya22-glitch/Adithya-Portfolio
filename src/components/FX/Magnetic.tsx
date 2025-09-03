import React, { useRef } from "react";

type Props = React.PropsWithChildren<{
  className?: string;
  strength?: number; // how strong the element moves toward the cursor
  maxTranslate?: number; // px cap
}>;

/**
 * Wrap any element to make it "magnetized".
 * Example: <Magnetic><button>Hire me</button></Magnetic>
 */
export function Magnetic({
  children,
  className,
  strength = 0.25,
  maxTranslate = 18,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    const tx = Math.max(-maxTranslate, Math.min(maxTranslate, dx * strength));
    const ty = Math.max(-maxTranslate, Math.min(maxTranslate, dy * strength));

    el.style.transform = `translate(${tx}px, ${ty}px)`;
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  };

  // data-magnetic tells Cursor to switch to the "magnetic" variant
  return (
    <span
      ref={ref}
      data-magnetic
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onMouseEnter={onMove}
      style={{ display: "inline-flex", transition: "transform 140ms ease-out" }}
    >
      {children}
    </span>
  );
}
