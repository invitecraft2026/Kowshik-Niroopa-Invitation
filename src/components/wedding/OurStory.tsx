import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import storyImg from "@/assets/story-hands.jpg";

const steps = [
  { year: "First Glance", title: "A quiet beginning", body: "A shared smile at a family gathering — the kind of moment that stays." },
  { year: "Kindred Souls", title: "Late-night conversations", body: "Weeks turned into months of laughter, dreams and quiet understanding." },
  { year: "In Love", title: "Two hearts, one rhythm", body: "Distance felt smaller. Home felt bigger. Everything, in colour." },
  { year: "September 6", title: "Engagement", body: "Blessed by our families, we promised the beginning of forever." },
  { year: "September 7", title: "Marriage", body: "Under sacred fire, we tie the eternal knot — as one." },
];

export function OurStory() {
  return (
    <section className="relative overflow-hidden py-32 px-6">
      <SectionHeading eyebrow="Our Journey" title="Our" italic="Story" />

      <div className="relative mx-auto mt-20 grid max-w-6xl gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <motion.div
          initial={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
          className="relative"
        >
          <div className="gold-border overflow-hidden rounded-[2rem]">
            <img src={storyImg} alt="Hands of Kowshik and Niroopa" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-blush/30 blur-2xl" />
          <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-temple-gold/30 blur-2xl" />
        </motion.div>

        <ol className="relative border-l border-rose-gold/30 pl-8">
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="relative mb-12 last:mb-0"
            >
              <span
                className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full"
                style={{ background: "linear-gradient(135deg, var(--temple-gold), var(--rose-gold))" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-warm-white" />
              </span>
              <p className="font-display text-[10px] tracking-[0.4em] text-rose-gold uppercase">{s.year}</p>
              <h3 className="mt-2 font-serif text-3xl text-deep-brown">{s.title}</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-deep-brown/70">{s.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
