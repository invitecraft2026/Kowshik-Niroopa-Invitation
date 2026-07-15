import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import mandala from "@/assets/mandala-bg.jpg";
import { FloatingPetals } from "./FloatingPetals";

export function Quote() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <section ref={ref} className="relative flex min-h-[90vh] items-center justify-center overflow-hidden py-32 px-6">
      <motion.div
        style={{ y, rotate, backgroundImage: `url(${mandala})` }}
        className="absolute inset-0 bg-cover bg-center opacity-25"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent, color-mix(in oklab, var(--cream) 90%, transparent))",
        }}
      />
      <FloatingPetals count={14} />

      <div className="relative z-10 max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
          className="font-serif text-3xl leading-snug italic text-deep-brown md:text-5xl"
        >
          &ldquo;Two souls, one sacred promise —
          <br />
          bound forever with love,
          <br />
          <span className="text-gradient-gold">blessings and tradition.</span>&rdquo;
        </motion.p>
        {/* <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-10 font-display text-[10px] tracking-[0.5em] text-rose-gold uppercase"
        >
          — Vivaha Mantra
        </motion.p> */}
      </div>
    </section>
  );
}
