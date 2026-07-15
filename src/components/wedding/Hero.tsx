import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import heroVideo from "@/assets/new-video.mp4";
import { FloatingPetals } from "./FloatingPetals";
import { Ornament } from "./Ornament";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // slow motion
    }
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <video
          ref={videoRef}
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          style={{ filter: "blur(6px)" }}
        />
      </motion.div>

      <div
        className="absolute inset-0 bg-gradient-to-b
    from-white/25
    via-white/40
    to-warm-white/95"
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

      <motion.div style={{ opacity }} className="relative z-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-serif text-sm md:text-base tracking-[0.25em] uppercase text-deep-brown font-semibold"
          style={{
            textShadow: "0 1px 3px rgba(255,255,255,0.6), 0 2px 8px rgba(255,255,255,0.4)",
          }}
        >
          We Are Getting Married
        </motion.p>

        <Ornament className="mx-auto mt-6 h-8 w-64 opacity-80" />

        {/* Groom first */}
        <motion.h1
          initial={{ opacity: 0, letterSpacing: "0.5em", filter: "blur(30px)" }}
          animate={{ opacity: 1, letterSpacing: "0.02em", filter: "blur(0px)" }}
          transition={{ duration: 1.8, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="mt-6 font-script text-[clamp(3rem,9vw,6.5rem)] leading-[0.9] text-deep-brown"
        >
          Kowshik Raj
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="mt-1 font-serif text-lg italic text-deep-brown/90 drop-shadow-md md:text-xl"
        >
          S/O Mr. Durai Murugan &amp; Mrs. Kayalvizhi
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 1.4, ease: [0.19, 1, 0.22, 1] }}
          className="relative my-2 font-serif text-4xl italic text-deep-brown md:text-5xl"
          style={{
            textShadow: "0 2px 8px color-mix(in oklab, var(--deep-brown) 30%, transparent)",
          }}
        >
          ♥
        </motion.div>

        {/* Bride second */}
        <motion.h1
          initial={{ opacity: 0, letterSpacing: "0.5em", filter: "blur(30px)" }}
          animate={{ opacity: 1, letterSpacing: "0.02em", filter: "blur(0px)" }}
          transition={{ duration: 1.8, delay: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="font-script text-[clamp(3rem,9vw,6.5rem)] leading-[0.9] text-deep-brown"
        >
          Niroopa
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.9 }}
          className="mt-1 font-serif text-lg italic text-deep-brown/90 drop-shadow-md md:text-xl"
        >
          D/O Mr. Vijayakumar &amp; Mrs. Sujatha
        </motion.p>

        <Ornament className="mx-auto mt-8 h-8 w-64 opacity-80" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-8 font-serif text-xl italic text-deep-brown drop-shadow-lg md:text-2xl"
        >
          Two souls · One celebration · Wedding
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span
            className="text-sm font-extrabold tracking-[0.4em] uppercase text-deep-brown"
            style={{
              textShadow: "0 2px 6px rgba(255,255,255,0.6)",
            }}
          >
            Scroll
          </span>

          <ChevronDown className="h-7 w-7 text-deep-brown drop-shadow-xl" strokeWidth={3.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
