import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { LotusIcon } from "./Ornament";

const PARTICLES = Array.from({ length: 40 }).map(() => ({
  left: Math.random() * 100,
  top: Math.random() * 100,
  w: 2 + Math.random() * 4,
  dur: 3 + Math.random() * 3,
  delay: Math.random() * 3,
}));

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const start = performance.now();
    const total = 2600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / total);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setVisible(false);
          setTimeout(onDone, 700);
        }, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, var(--warm-white), var(--cream) 60%, color-mix(in oklab, var(--blush) 40%, var(--cream)))",
          }}
        >
          {/* Golden particles (client-only to avoid hydration mismatch) */}
          {mounted && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {PARTICLES.map((p, i) => (
                <motion.span
                  key={i}
                  className="absolute block rounded-full"
                  style={{
                    left: `${p.left}%`,
                    top: `${p.top}%`,
                    width: p.w,
                    height: p.w,
                    background: "var(--temple-gold)",
                    boxShadow: "0 0 12px var(--temple-gold)",
                  }}
                  animate={{ y: [-10, 10, -10], opacity: [0.2, 0.9, 0.2] }}
                  transition={{ duration: p.dur, repeat: Infinity, delay: p.delay }}
                />
              ))}
            </div>
          )}

          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -30 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
              className="text-rose-gold"
            >
              <LotusIcon className="h-20 w-20" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="mt-8 text-center"
            >
              <div className="font-display text-[10px] tracking-[0.5em] text-rose-gold uppercase">Shubh Vivaham</div>
              <div className="mt-3 font-serif text-4xl italic text-deep-brown">Kowshik &amp; Niroopa</div>
            </motion.div>

            <div className="mt-10 h-[1px] w-56 overflow-hidden bg-rose-gold/20">
              <motion.div
                className="h-full"
                style={{
                  width: `${progress * 100}%`,
                  background: "linear-gradient(90deg, var(--temple-gold), var(--rose-gold), var(--blush))",
                }}
              />
            </div>
            <div className="mt-3 font-display text-[10px] tracking-[0.4em] text-deep-brown/60">
              {Math.round(progress * 100)}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
