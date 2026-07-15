import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import venue from "@/assets/venue.jpg";
import coupleSecondary from "@/assets/image-4.jpeg";
import { SectionHeading } from "./SectionHeading";

const VENUE_QUERY = encodeURIComponent(
  "Crystal Convention Centre, SF No 108/2 and 108/3, Madurai Road, Kallikudi Village, South, Manikandam, Trichy - 620012",
);

export function Venue() {
  return (
    <section className="relative overflow-hidden py-32 px-6">
      {/* Soft couple photo backdrop */}
      {/* Soft couple photo backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={coupleSecondary}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-[0.32]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, var(--cream) 0%, color-mix(in oklab, var(--cream) 25%, transparent) 22%, color-mix(in oklab, var(--cream) 25%, transparent) 78%, var(--cream) 100%)",
          }}
        />
      </div>

      <div className="relative z-10">
        <SectionHeading eyebrow="Where We Gather" title="The" italic="Venue" />

        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="mx-auto mt-16 grid max-w-6xl overflow-hidden rounded-[2rem] md:grid-cols-2 gold-border"
        >
          <div className="relative min-h-[380px] overflow-hidden">
            <img
              src={venue}
              alt="Crystal Convention Centre"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="relative flex flex-col items-center">
                <div className="absolute -inset-6 rounded-full bg-warm-white/40 blur-2xl" />
                <div
                  className="relative flex h-14 w-14 items-center justify-center rounded-full text-warm-white shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, var(--rose-gold), var(--deep-brown))",
                  }}
                >
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="mt-2 h-3 w-3 rotate-45 rounded-sm bg-deep-brown" />
              </div>
            </motion.div>
          </div>

          <div className="glass flex flex-col justify-center gap-6 p-10 md:p-14">
            <p className="font-display text-[10px] tracking-[0.5em] text-rose-gold uppercase">
              Reception & Ceremony
            </p>
            <h3 className="font-serif text-4xl leading-tight text-deep-brown md:text-5xl">
              Crystal <span className="italic text-gradient-gold">Convention Centre</span>
            </h3>
            <p className="text-deep-brown/75 leading-relaxed">
              SF No 108/2 and 108/3, Madurai Road, Kallikudi Village, South, Manikandam, Trichy –
              620012.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${VENUE_QUERY}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[11px] tracking-[0.35em] text-warm-white uppercase transition-transform hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, var(--rose-gold), var(--deep-brown))",
                }}
              >
                <Navigation className="h-4 w-4" /> Get Directions
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${VENUE_QUERY}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-rose-gold/40 px-6 py-3 text-[11px] tracking-[0.35em] text-deep-brown uppercase"
              >
                <MapPin className="h-4 w-4" /> View on Map
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
