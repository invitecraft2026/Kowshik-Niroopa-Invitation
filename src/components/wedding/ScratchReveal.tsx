// src/components/wedding/ScratchReveal.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Ornament } from "./Ornament";
import coupleSecondary from "@/assets/image-new2.jpeg";

const HEART_PATH =
  "M130,225 C130,225 20,145 20,80 C20,45 45,18 80,18 C102,18 120,32 130,50 C140,32 158,18 180,18 C215,18 240,45 240,80 C240,145 130,225 130,225 Z";

const HEART_W = 260;
const HEART_H = 240;
const REVEAL_THRESHOLD = 0.5;
const PETAL_COUNT = 40;

export function ScratchReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heartPath = useRef<Path2D>(new Path2D(HEART_PATH));
  const isDrawing = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const [scratchedPct, setScratchedPct] = useState(0);

  // Precompute randomized petal properties once, reused every time `revealed` flips true
  const petals = useMemo(
    () =>
      Array.from({ length: PETAL_COUNT }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.2,
        duration: 2.2 + Math.random() * 1.8,
        size: 10 + Math.random() * 12,
        rotate: Math.random() * 360,
        drift: (Math.random() - 0.5) * 100,
        emoji: ["🌸", "🌺", "🌼", "🌷"][Math.floor(Math.random() * 4)],
      })),
    [],
  );

  const drawTexture = useCallback((ctx: CanvasRenderingContext2D) => {
    const { width, height } = ctx.canvas;

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.clip(heartPath.current);

    const styles = getComputedStyle(document.documentElement);
    const gold = styles.getPropertyValue("--temple-gold").trim() || "#c9a227";
    const rose = styles.getPropertyValue("--rose-gold").trim() || "#b76e79";
    const brown = styles.getPropertyValue("--deep-brown").trim() || "#5c3a2e";

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, gold);
    grad.addColorStop(0.55, rose);
    grad.addColorStop(1, brown);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 260; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 1.3 + 0.3;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.6 + 0.15})`;
      ctx.fill();
    }

    const sheen = ctx.createLinearGradient(0, 0, width, height * 0.6);
    sheen.addColorStop(0, "rgba(255,255,255,0.25)");
    sheen.addColorStop(0.4, "rgba(255,255,255,0)");
    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, width, height);

    ctx.restore();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = HEART_W;
    canvas.height = HEART_H;
    drawTexture(ctx);
  }, [drawTexture]);

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const scratch = (x: number, y: number) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.save();
    ctx.clip(heartPath.current);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const checkProgress = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;
    let sampled = 0;
    for (let i = 3; i < data.length; i += 4 * 8) {
      sampled++;
      if (data[i] === 0) cleared++;
    }
    const pct = cleared / sampled;
    setScratchedPct(pct);
    if (pct > REVEAL_THRESHOLD) setRevealed(true);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    isDrawing.current = true;
    const { x, y } = getPos(e);
    scratch(x, y);
  };
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const { x, y } = getPos(e);
    scratch(x, y);
  };
  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDrawing.current) checkProgress();
    isDrawing.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <section className="relative overflow-hidden py-24">
      {/* Soft couple photo backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={coupleSecondary}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-[0.32]"
          style={{ objectPosition: "50% 10%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, var(--cream) 0%, color-mix(in oklab, var(--cream) 25%, transparent) 22%, color-mix(in oklab, var(--cream) 25%, transparent) 78%, var(--cream) 100%)",
          }}
        />
      </div>

      {/* Falling petals — triggered on reveal */}
      <AnimatePresence>
        {revealed && (
          <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
            {petals.map((p) => (
              <motion.span
                key={p.id}
                initial={{ y: -40, x: 0, opacity: 0, rotate: 0 }}
                animate={{
                  y: "110vh",
                  x: p.drift,
                  opacity: [0, 1, 1, 0],
                  rotate: p.rotate,
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  ease: "easeIn",
                }}
                style={{
                  position: "absolute",
                  left: `${p.left}%`,
                  top: 0,
                  fontSize: p.size,
                }}
              >
                {p.emoji}
              </motion.span>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex max-w-md flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-[10px] tracking-[0.5em] text-rose-gold uppercase"
        >
          A Little Secret
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-4 font-serif text-4xl italic text-deep-brown"
        >
          Scratch to Reveal
        </motion.h2>

        <Ornament className="mx-auto mt-5 h-6 w-48" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          className="relative mt-10 select-none"
          style={{
            width: HEART_W,
            height: HEART_H,
            filter:
              "drop-shadow(0 12px 24px color-mix(in oklab, var(--rose-gold) 35%, transparent))",
          }}
        >
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{
              clipPath: `path('${HEART_PATH}')`,
              background: "linear-gradient(135deg, var(--blush), var(--warm-white))",
            }}
            animate={revealed ? { scale: [1, 1.04, 1] } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="mt-2 font-serif text-3xl font-bold text-deep-brown">7</span>
            <span className="font-serif text-xl italic font-bold text-deep-brown">
              September 2026
            </span>
          </motion.div>

          <motion.canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            animate={{ opacity: revealed ? 0 : 1 }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="absolute inset-0 touch-none"
            style={{
              width: HEART_W,
              height: HEART_H,
              cursor: revealed ? "default" : "pointer",
              pointerEvents: revealed ? "none" : "auto",
            }}
          />
        </motion.div>

        <motion.p
          animate={{ opacity: revealed || scratchedPct > 0 ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="mt-6 text-xs tracking-[0.3em] text-deep-brown/50 uppercase"
        >
          Scratch the heart to see the date
        </motion.p>
      </div>
    </section>
  );
}
