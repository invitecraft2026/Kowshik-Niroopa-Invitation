import { motion } from "framer-motion";
import { FloatingPetals } from "./FloatingPetals";
import { Ornament, LotusIcon } from "./Ornament";

export function ThankYou() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden py-32 px-6">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, color-mix(in oklab, var(--blush) 40%, transparent), transparent 60%), radial-gradient(ellipse at 50% 20%, color-mix(in oklab, var(--temple-gold) 25%, transparent), transparent 60%)",
        }}
      />
      <FloatingPetals count={20} />

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, rotate: -15, scale: 0.7 }}
          whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
          className="mx-auto text-rose-gold"
        >
          <LotusIcon className="h-16 w-16" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
          className="mt-8 font-serif text-4xl leading-tight text-deep-brown md:text-6xl"
        >
          We can&apos;t wait to
          <br />
          <span className="italic text-gradient-gold">celebrate with you.</span>
        </motion.h2>

        <Ornament className="mx-auto mt-10 h-6 w-56" />

        <p className="mt-8 font-serif text-lg italic text-deep-brown/70">— Kowshik &amp; Niroopa</p>
        <p className="mt-2 text-[10px] tracking-[0.5em] text-deep-brown/50 uppercase">Trichy · 07 September</p>
      </div>
    </section>
  );
}
