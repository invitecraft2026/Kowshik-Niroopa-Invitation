import { useEffect, useMemo, useState } from "react";

type Props = { count?: number; className?: string };

export function FloatingPetals({ count = 18, className = "" }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const petals = useMemo(
    () =>
      mounted
        ? Array.from({ length: count }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            size: 10 + Math.random() * 22,
            duration: 18 + Math.random() * 22,
            delay: -Math.random() * 30,
            hue: Math.random() > 0.5 ? "var(--blush)" : "var(--peach)",
            opacity: 0.35 + Math.random() * 0.4,
          }))
        : [],
    [count, mounted],
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute block"
          style={{
            left: `${p.left}%`,
            top: 0,
            width: p.size,
            height: p.size * 0.7,
            background: `radial-gradient(ellipse at 30% 30%, ${p.hue}, transparent 70%)`,
            borderRadius: "60% 40% 55% 45% / 55% 65% 35% 45%",
            filter: "blur(0.5px)",
            opacity: p.opacity,
            animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
