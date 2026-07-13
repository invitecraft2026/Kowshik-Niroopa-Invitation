import { motion } from "framer-motion";
import { Ornament } from "./Ornament";

export function SectionHeading({
  eyebrow,
  title,
  italic,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  italic?: string;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`mx-auto flex flex-col ${alignCls} max-w-3xl`}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="font-display text-[10px] tracking-[0.5em] text-rose-gold uppercase"
        >
          {eyebrow}
        </motion.p>
      )}
      {align === "center" && <Ornament className="mt-5 h-6 w-56 opacity-70" />}
      <motion.h2
        initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        className="mt-6 font-serif text-4xl leading-tight text-deep-brown md:text-6xl"
      >
        {title}
        {italic && <span className="italic text-gradient-gold"> {italic}</span>}
      </motion.h2>
    </div>
  );
}
