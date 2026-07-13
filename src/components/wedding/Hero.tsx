import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import { FloatingPetals } from "./FloatingPetals";
import { Ornament } from "./Ornament";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <motion.div
        style={{ y, scale, backgroundImage: `url(${heroBg})` }}
        className="absolute inset-0 bg-cover bg-center"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--warm-white) 40%, transparent), color-mix(in oklab, var(--warm-white) 20%, transparent) 40%, var(--warm-white))",
        }}
      />
      <motion.div className="absolute inset-0" style={{ opacity }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, color-mix(in oklab, var(--temple-gold) 30%, transparent), transparent 40%), radial-gradient(circle at 70% 60%, color-mix(in oklab, var(--blush) 45%, transparent), transparent 50%)",
          }}
        />
      </motion.div>
      <FloatingPetals count={24} />

      <motion.div
        style={{ opacity }}
        className="relative z-10 px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          className="font-display text-[10px] tracking-[0.6em] text-rose-gold uppercase"
        >
          Save the Date · 06.09 — 07.09
        </motion.p>

        <Ornament className="mx-auto mt-6 h-8 w-64 opacity-80" />

        <motion.h1
          initial={{ opacity: 0, letterSpacing: "0.5em", filter: "blur(30px)" }}
          animate={{ opacity: 1, letterSpacing: "0.02em", filter: "blur(0px)" }}
          transition={{ duration: 1.8, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="mt-6 font-serif text-[clamp(3rem,10vw,8rem)] leading-[0.95] text-deep-brown"
        >
          Niroopa
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 1.4, ease: [0.19, 1, 0.22, 1] }}
          className="my-2 font-serif text-3xl italic text-gradient-gold md:text-4xl"
        >
          ♡
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, letterSpacing: "0.5em", filter: "blur(30px)" }}
          animate={{ opacity: 1, letterSpacing: "0.02em", filter: "blur(0px)" }}
          transition={{ duration: 1.8, delay: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="font-serif text-[clamp(3rem,10vw,8rem)] leading-[0.95] text-deep-brown"
        >
          Kowshik
        </motion.h1>

        <Ornament className="mx-auto mt-8 h-8 w-64 opacity-80" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-6 font-serif text-lg italic text-deep-brown/80"
        >
          Two souls · One celebration · Engagement &amp; Wedding
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-deep-brown/60"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
