// src/components/OpeningExperience.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Sparkles, Volume2, VolumeX } from "lucide-react";
import coverImg from "@/assets/first-frame.png";
import openingVideo from "@/assets/new-video4.mp4";
import { FloatingPetals } from "./FloatingPetals";
import { Ornament } from "./Ornament";

type Phase = "cover" | "video" | "exiting";

export function OpeningExperience({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("cover");
  const [muted, setMuted] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleOpen = useCallback(() => {
    setPhase("video");
  }, []);

  useEffect(() => {   
    if (phase === "video" && videoRef.current) {
      const v = videoRef.current;
      v.currentTime = 0;
      // Tap was a real user gesture, so we can try playing with sound
      v.play().catch(() => {
        v.muted = true;
        setMuted(true);
        v.play().catch(() => {});
      });
    }
  }, [phase]);

  const finish = useCallback(() => {
    setPhase("exiting");
    setTimeout(onComplete, 900);
  }, [onComplete]);

  const handleEnded = () => finish();
  const handleSkip = () => finish();

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  return (
    <AnimatePresence>
      {phase !== "exiting" && (
        <motion.div
          key="opening"
          className="fixed inset-0 z-[95] flex items-center justify-center overflow-hidden bg-black"
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* COVER SCREEN */}
          <AnimatePresence>
            {phase === "cover" && (
              <motion.div
                key="cover"
                className="absolute inset-0 flex items-center justify-center overflow-hidden"
                exit={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${coverImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.55))",
                  }}
                />
                <FloatingPetals count={18} />

                <motion.div
                  initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
                  className="relative z-10 mx-4 flex flex-col items-center text-center"
                >
                  <div className="font-display text-[10px] tracking-[0.5em] text-rose-gold uppercase">
                    A Wedding Invitation
                  </div>

                  <Ornament className="mx-auto mt-6 h-6 w-48" />

                  <h1 className="mt-6 font-serif text-5xl leading-none text-warm-white drop-shadow-lg">
                    K <span className="text-gradient-gold">&amp;</span> N
                  </h1>

                  <p className="mt-6 text-xs tracking-[0.35em] text-warm-white/80 uppercase">
                    6 &amp; 7 September
                  </p>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleOpen}
                    className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full px-10 py-4 text-warm-white uppercase tracking-[0.35em] text-[11px]"
                    style={{
                      background: "linear-gradient(135deg, #8D5A5A 0%, #6F4747 45%, #4A2E2E 100%)",
                      boxShadow: "0 18px 35px rgba(74, 46, 46, 0.45)",
                      border: "1px solid rgba(212, 175, 55, 0.25)",
                    }}
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Tap to Open
                    <Sparkles className="h-3.5 w-3.5" />
                    <span
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
                      }}
                    />
                  </motion.button>
                </motion.div>
              </motion.div>
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

              <div className="absolute inset-x-0 bottom-8 z-10 flex items-center justify-center gap-4">
                <button
                  onClick={toggleMute}
                  aria-label={muted ? "Unmute" : "Mute"}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-warm-white backdrop-blur-sm transition hover:bg-black/50"
                >
                  {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <button
                  onClick={handleSkip}
                  className="rounded-full bg-black/30 px-5 py-2 text-[10px] uppercase tracking-[0.3em] text-warm-white backdrop-blur-sm transition hover:bg-black/50"
                >
                  Skip
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
