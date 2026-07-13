import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { FloatingPetals } from "./FloatingPetals";
import { Ornament } from "./Ornament";

export function TapToOpen({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          key="ttopen"
          className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div
            className="absolute inset-0 scale-110"
            style={{
              backgroundImage: `url(${heroBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(30px) brightness(0.9)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, color-mix(in oklab, var(--warm-white) 45%, transparent), color-mix(in oklab, var(--deep-brown) 40%, transparent))",
            }}
          />
          <FloatingPetals count={22} />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ scale: 1.2, rotateY: 90, opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
            style={{ transformPerspective: 1200 }}
            className="relative mx-4 w-full max-w-md"
          >
            <div className="glass gold-border shine relative rounded-[2rem] px-8 py-14 text-center">
              <div className="pointer-events-none absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 rounded-sm bg-temple-gold/70 shadow" />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="font-display text-[10px] tracking-[0.5em] text-rose-gold uppercase"
              >
                A Wedding Invitation
              </motion.div>

              <Ornament className="mx-auto mt-6 h-6 w-48" />

              <motion.h1
                initial={{ opacity: 0, letterSpacing: "0.4em" }}
                animate={{ opacity: 1, letterSpacing: "0.02em" }}
                transition={{ duration: 1.6, delay: 1 }}
                className="mt-6 font-serif text-6xl leading-none text-deep-brown"
              >
                K <span className="text-gradient-gold">&amp;</span> N
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="mt-8 font-serif text-lg italic text-deep-brown/80"
              >
                Together with their families
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.55 }}
                className="mt-1 text-xs tracking-[0.35em] text-deep-brown/60 uppercase"
              >
                invite you to celebrate their
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7 }}
                className="mt-2 font-serif text-2xl text-deep-brown"
              >
                Engagement &amp; Wedding
              </motion.p>

              <Ornament className="mx-auto mt-8 h-6 w-40" />

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpen}
                className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full px-10 py-4 text-warm-white uppercase tracking-[0.35em] text-[11px]"
                style={{
                  background: "linear-gradient(135deg, var(--rose-gold), var(--deep-brown))",
                  boxShadow: "0 20px 40px -12px color-mix(in oklab, var(--rose-gold) 70%, transparent)",
                }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Tap to Open
                <Sparkles className="h-3.5 w-3.5" />
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
                  }}
                />
              </motion.button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                className="mt-8 flex items-center justify-center gap-2 text-xs text-deep-brown/50"
              >
                <Heart className="h-3 w-3 fill-rose-gold text-rose-gold" />
                <span className="tracking-[0.3em] uppercase">6 &amp; 7 September</span>
                <Heart className="h-3 w-3 fill-rose-gold text-rose-gold" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
