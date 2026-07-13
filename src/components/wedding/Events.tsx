import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const events = [
  {
    tag: "Ceremony I",
    title: "Engagement",
    date: "Saturday · 6 September",
    time: "7pm - onwards",
    location: "Grand Empire Convention Hall, Trichy",
  },
  {
    tag: "Ceremony II",
    title: "Marriage",
    date: "Sunday · 7 September",
    time: "Mugurtham · 9:00 – 10:30 AM",
    location: "Grand Empire Convention Hall, Trichy",
  },
];

export function Events() {
  return (
    <section className="relative py-32 px-6">
      <SectionHeading eyebrow="The Celebrations" title="Wedding" italic="Events" />
      <div className="mx-auto mt-20 grid max-w-5xl gap-8 md:grid-cols-2">
        {events.map((e, i) => (
          <motion.article
            key={e.title}
            initial={{ opacity: 0, y: 60, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, delay: i * 0.15, ease: [0.19, 1, 0.22, 1] }}
            whileHover={{ y: -6 }}
            className="glass gold-border relative overflow-hidden rounded-[2rem] p-10"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blush/25 blur-3xl" />
            <div className="pointer-events-none absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-temple-gold/25 blur-3xl" />

            <p className="font-display text-[10px] tracking-[0.5em] text-rose-gold uppercase">{e.tag}</p>
            <h3 className="mt-4 font-serif text-5xl text-deep-brown">{e.title}</h3>

            <div className="mt-8 space-y-4 text-sm text-deep-brown/80">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-rose-gold" />
                <span className="tracking-wide">{e.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-rose-gold" />
                <span className="tracking-wide">{e.time}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-rose-gold" />
                <span className="tracking-wide">{e.location}</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-gold/40 to-transparent" />
              <span className="font-serif italic text-deep-brown/60">with your blessings</span>
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-gold/40 to-transparent" />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
