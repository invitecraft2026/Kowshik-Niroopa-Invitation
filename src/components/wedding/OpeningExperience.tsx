// src/components/wedding/OpeningExperience.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import coverImg from "@/assets/first-frame.png";
import openingVideo from "@/assets/new-video4.mp4";
import heroEndFrame from "@/assets/end_frame.jpg";

type Phase = "cover" | "video" | "exiting";

export function OpeningExperience({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("cover");
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Preload the hero background early so it's already cached
  // by the time the video ends — no load-flash on handoff.
  useEffect(() => {
    const img = new Image();
    img.src = heroEndFrame;
  }, []);

  const handleOpen = useCallback(() => {
    setPhase("video");
  }, []);

  useEffect(() => {
    if (phase === "video" && videoRef.current) {
      const v = videoRef.current;
      v.currentTime = 0;
      v.muted = true;
      v.play().catch(() => {});
    }
  }, [phase]);

  const finish = useCallback(() => {
    setPhase("exiting");
    // Start revealing Hero immediately so it crossfades
    // WITH the overlay's fade-out, instead of after it.
    onComplete();
  }, [onComplete]);

  const handleEnded = () => finish();

  return (
    <AnimatePresence>
      {phase !== "exiting" && (
        <motion.div
          key="opening"
          className="fixed inset-0 z-[95] flex items-center justify-center overflow-hidden bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* COVER SCREEN */}
          <AnimatePresence>
            {phase === "cover" && (
              <motion.button
                key="cover"
                onClick={handleOpen}
                aria-label="Tap to open invitation"
                className="absolute inset-0 flex h-full w-full items-end justify-center overflow-hidden"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${coverImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="relative z-10 mb-14 flex flex-col items-center"
                >
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    className="rounded-full bg-black/30 px-6 py-2 text-[10px] tracking-[0.5em] text-warm-white uppercase backdrop-blur-sm"
                  >
                    Tap to Open
                  </motion.span>
                </motion.div>
              </motion.button>
            )}
          </AnimatePresence>

          {/* VIDEO SCREEN */}
          {phase === "video" && (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <video
                ref={videoRef}
                src={openingVideo}
                muted
                playsInline
                preload="auto"
                onEnded={handleEnded}
                onCanPlay={() => setVideoReady(true)}
                className="h-full w-full object-cover"
              />

              {!videoReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                    className="h-10 w-10 rounded-full border-2 border-temple-gold/30 border-t-temple-gold"
                  />
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}