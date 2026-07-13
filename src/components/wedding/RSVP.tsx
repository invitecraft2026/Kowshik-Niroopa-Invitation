import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Send } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

export function RSVP() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="relative py-32 px-6">
      <SectionHeading eyebrow="Your Presence" title="Kindly" italic="RSVP" />

      <motion.form
        initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="glass gold-border mx-auto mt-16 max-w-2xl space-y-6 rounded-[2rem] p-8 md:p-12"
      >
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-12 text-center">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full text-warm-white"
              style={{ background: "linear-gradient(135deg, var(--rose-gold), var(--deep-brown))" }}
            >
              <Check className="h-7 w-7" />
            </div>
            <h3 className="font-serif text-3xl text-deep-brown">Thank you</h3>
            <p className="max-w-sm text-deep-brown/70">
              Your response has been received. We can&apos;t wait to celebrate with you.
            </p>
          </div>
        ) : (
          <>
            <Field label="Your Name" name="name" placeholder="Enter your full name" />
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Phone" name="phone" placeholder="+91" />
              <Field label="Guests" name="guests" placeholder="1" type="number" />
            </div>
            <div>
              <Label>Will you attend?</Label>
              <div className="mt-3 flex gap-3">
                {["Joyfully accept", "Regretfully decline"].map((o) => (
                  <label
                    key={o}
                    className="flex-1 cursor-pointer rounded-xl border border-rose-gold/30 bg-warm-white/50 px-4 py-3 text-center text-sm text-deep-brown transition-all has-[:checked]:bg-deep-brown has-[:checked]:text-warm-white"
                  >
                    <input type="radio" name="attend" className="peer sr-only" defaultChecked={o.startsWith("Joyfully")} />
                    {o}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <Label>A message for the couple</Label>
              <textarea
                name="message"
                rows={4}
                placeholder="Your blessings mean the world to us…"
                className="mt-2 w-full resize-none rounded-xl border border-rose-gold/25 bg-warm-white/60 px-4 py-3 text-sm text-deep-brown placeholder:text-deep-brown/40 focus:border-rose-gold focus:outline-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="group flex w-full items-center justify-center gap-3 rounded-full py-4 text-[11px] tracking-[0.35em] text-warm-white uppercase shine"
              style={{
                background: "linear-gradient(135deg, var(--rose-gold), var(--deep-brown))",
                boxShadow: "0 20px 40px -12px color-mix(in oklab, var(--rose-gold) 70%, transparent)",
              }}
            >
              <Send className="h-4 w-4" />
              Send Blessings
            </motion.button>
          </>
        )}
      </motion.form>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="font-display text-[10px] tracking-[0.4em] text-rose-gold uppercase">{children}</span>;
}
function Field({ label, name, placeholder, type = "text" }: { label: string; name: string; placeholder?: string; type?: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-rose-gold/25 bg-warm-white/60 px-4 py-3 text-sm text-deep-brown placeholder:text-deep-brown/40 focus:border-rose-gold focus:outline-none"
      />
    </div>
  );
}
