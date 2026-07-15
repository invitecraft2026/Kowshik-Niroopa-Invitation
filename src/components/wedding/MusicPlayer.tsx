// src/components/wedding/MusicPlayer.tsx
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import backgroundMusic from "@/assets/new-music.mp3";

export function MusicPlayer({ autostart }: { autostart: boolean }) {
  const [on, setOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Lazily create the audio element once
  useEffect(() => {
    const audio = new Audio(backgroundMusic);
    audio.loop = true;
    audio.volume = 0; // fade in manually below
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (autostart && !on) setOn(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autostart]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (on) {
      audio
        .play()
        .then(() => {
          // Smooth fade-in instead of an abrupt start
          let v = 0;
          const step = () => {
            v = Math.min(0.35, v + 0.02);
            audio.volume = v;
            if (v < 0.35) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        })
        .catch(() => {
          // Autoplay blocked (e.g. no prior user gesture) — user can tap the button to retry
          setOn(false);
        });
    } else {
      // Fade out, then pause
      let v = audio.volume;
      const step = () => {
        v = Math.max(0, v - 0.03);
        audio.volume = v;
        if (v > 0) requestAnimationFrame(step);
        else audio.pause();
      };
      requestAnimationFrame(step);
    }
  }, [on]);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      whileHover={{ scale: 1.08 }}
      onClick={() => setOn((v) => !v)}
      className="fixed bottom-6 right-6 z-[80] flex h-12 w-12 items-center justify-center rounded-full text-warm-white shadow-lg"
      style={{
        background: "linear-gradient(135deg, var(--rose-gold), var(--deep-brown))",
        boxShadow: "0 12px 30px -8px color-mix(in oklab, var(--rose-gold) 70%, transparent)",
      }}
      aria-label={on ? "Mute music" : "Play music"}
    >
      {on ? (
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
          <Music className="h-5 w-5" />
        </motion.div>
      ) : (
        <VolumeX className="h-5 w-5" />
      )}
    </motion.button>
  );
}