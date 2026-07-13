import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SectionHeading } from "./SectionHeading";

const TARGET = new Date("2026-09-07T09:00:00+05:30").getTime();

function diff(now: number) {
  const d = Math.max(0, TARGET - now);
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d / 3600000) % 24),
    minutes: Math.floor((d / 60000) % 60),
    seconds: Math.floor((d / 1000) % 60),
  };
}

export function Countdown() {
  const [t, setT] = useState(() => diff(TARGET));
  useEffect(() => {
    setT(diff(Date.now()));
    const id = setInterval(() => setT(diff(Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { label: "Days", v: t.days },
    { label: "Hours", v: t.hours },
    { label: "Minutes", v: t.minutes },
    { label: "Seconds", v: t.seconds },
  ];

  return (
    <section className="relative py-32 px-6">
      <SectionHeading eyebrow="The Sacred Day Awaits" title="Counting the Moments" />
      <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="glass gold-border relative overflow-hidden rounded-2xl px-4 py-8 text-center md:py-12"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-temple-gold to-transparent" />
            <div
              key={it.v}
              className="font-serif text-5xl text-deep-brown md:text-7xl"
              style={{ animation: "shine-sweep 0.6s ease" }}
            >
              {String(it.v).padStart(2, "0")}
            </div>
            <div className="mt-2 text-[10px] tracking-[0.4em] text-rose-gold uppercase">{it.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
