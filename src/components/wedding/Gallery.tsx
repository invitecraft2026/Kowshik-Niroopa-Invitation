import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import g1 from "@/assets/image-1.jpeg";
import g2 from "@/assets/image-2.jpeg";
import g3 from "@/assets/image-3.jpeg";
import g4 from "@/assets/image-4.jpeg";
import g5 from "@/assets/image-5.jpeg";
const images = [
  { src: g1, caption: "Jasmine & marigold", span: "row-span-2" },
  { src: g2, caption: "Sacred deepam", span: "" },
  { src: g3, caption: "Silk in blush", span: "row-span-2" },
  { src: g4, caption: "Bound together", span: "" },
  { src: g5, caption: "The venue awaits", span: "col-span-2" },
  // { src: g6, caption: "Blessings in gold", span: "" },
];

export function Gallery() {
  return (
    <section className="relative py-32 px-6">
      <SectionHeading eyebrow="Frames of Us" title="A" italic="Prelude" />
      <div className="mx-auto mt-20 grid max-w-6xl auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {images.map((im, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 40, scale: 0.96, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: (i % 4) * 0.08, ease: [0.19, 1, 0.22, 1] }}
            whileHover={{ scale: 1.02 }}
            className={`group relative overflow-hidden rounded-2xl ${im.span}`}
          >
            <img
              src={im.src}
              alt={im.caption}
              loading="lazy"
              className={`h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110 ${
                i === 4 ? "object-top" : "object-center"
              }`}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep-brown/70 via-transparent to-transparent opacity-70" />
            <figcaption className="absolute bottom-4 left-4 font-serif italic text-warm-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              {im.caption}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
