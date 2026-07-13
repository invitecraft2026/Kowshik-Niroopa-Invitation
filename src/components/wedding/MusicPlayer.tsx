import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * Ambient Web Audio drone — no external file needed. Renders a very soft,
 * temple-inspired shruti-style pad using two detuned sine oscillators.
 */
export function MusicPlayer({ autostart }: { autostart: boolean }) {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscsRef = useRef<OscillatorNode[]>([]);

  useEffect(() => {
    if (autostart && !on) setOn(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autostart]);

  useEffect(() => {
    if (!on) {
      if (ctxRef.current) {
        gainRef.current?.gain.exponentialRampToValueAtTime(0.0001, ctxRef.current.currentTime + 0.6);
        setTimeout(() => {
          oscsRef.current.forEach((o) => o.stop());
          oscsRef.current = [];
          ctxRef.current?.close();
          ctxRef.current = null;
          gainRef.current = null;
        }, 700);
      }
      return;
    }
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
      const gain = ctx.createGain();
      gain.gain.value = 0.0001;
      gain.connect(ctx.destination);

      const freqs = [110, 110 * 1.5, 220]; // Sa – Pa – Sa drone
      const oscs = freqs.map((f, i) => {
        const o = ctx.createOscillator();
        o.type = i === 2 ? "triangle" : "sine";
        o.frequency.value = f;
        const g = ctx.createGain();
        g.gain.value = i === 2 ? 0.15 : 0.35;
        o.connect(g).connect(gain);
        o.start();
        return o;
      });

      gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 1.8);
      ctxRef.current = ctx;
      gainRef.current = gain;
      oscsRef.current = oscs;
    } catch {
      /* audio blocked */
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
