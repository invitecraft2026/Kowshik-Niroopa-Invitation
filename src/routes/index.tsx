import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { LoadingScreen } from "@/components/wedding/LoadingScreen";
import { OpeningExperience } from "@/components/wedding/OpeningExperience";
import { Hero } from "@/components/wedding/Hero";
import { Countdown } from "@/components/wedding/Countdown";
import { OurStory } from "@/components/wedding/OurStory";
import { Quote } from "@/components/wedding/Quote";
import { Events } from "@/components/wedding/Events";
import { Gallery } from "@/components/wedding/Gallery";
import { Venue } from "@/components/wedding/Venue";
import { RSVP } from "@/components/wedding/RSVP";
import { ThankYou } from "@/components/wedding/ThankYou";
import { MusicPlayer } from "@/components/wedding/MusicPlayer";
import { ScratchReveal } from "@/components/wedding/ScratchReveal";

export const Route = createFileRoute("/")({
  component: Invitation,
});

function Invitation() {
  const [loaded, setLoaded] = useState(false);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (opened) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <>
      {/* {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />} */}
      { !opened && <OpeningExperience onComplete={() => setOpened(true)} />}

      <AnimatePresence>
        {opened && (
          <motion.main
            initial={{ opacity: 0, filter: "blur(30px)", scale: 1.04 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
            className="relative"
          >
            <Hero />
            <Countdown />
            <ScratchReveal/>
            {/* <OurStory /> */}
            <Quote />
            <Events />
            <Gallery />
            <Venue />
            {/* <RSVP /> */}
            <ThankYou />

            <footer className="border-t border-rose-gold/20 py-10 text-center text-[10px] tracking-[0.4em] text-deep-brown/50 uppercase">
              Made with love · K &amp; N · 2026
            </footer>
          </motion.main>
        )}
      </AnimatePresence>

      <MusicPlayer autostart={opened} />
    </>
  );
}