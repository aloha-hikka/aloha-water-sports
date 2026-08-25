// src/app/services/fishing/FishingGallery.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  DATA                                                                      */
/* -------------------------------------------------------------------------- */

interface GalleryImage {
  src: string;
  alt: string;
  span: "tall" | "wide" | "normal";
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/images/fishing/1.jpg",
    alt: "Deep sea fishing rods at sunset",
    span: "tall",
  },
  {
    src: "/images/fishing/2.jpg",
    alt: "Fishing boat on open ocean",
    span: "normal",
  },
  {
    src: "/images/fishing/3.jpg",
    alt: "Marlin catch on deep sea trip",
    span: "wide",
  },
  {
    src: "/images/fishing/4.jpg",
    alt: "Tropical ocean sunset",
    span: "normal",
  },
  {
    src: "/images/fishing/5.jpg",
    alt: "Angler reeling in a catch",
    span: "tall",
  },
  {
    src: "/images/fishing/6.jpg",
    alt: "Ocean waves at golden hour",
    span: "normal",
  },
  {
    src: "/images/fishing/7.jpg",
    alt: "Sport fishing gear on boat deck",
    span: "wide",
  },
  {
    src: "/images/fishing/8.jpg",
    alt: "Fresh catch on ice",
    span: "normal",
  },
];

const spanClasses: Record<GalleryImage["span"], string> = {
  tall: "row-span-2",
  wide: "col-span-2",
  normal: "row-span-1 col-span-1",
};

/* -------------------------------------------------------------------------- */
/*  GALLERY CARD COMPONENT                                                    */
/* -------------------------------------------------------------------------- */

function GalleryImageCard({ img, index }: { img: GalleryImage; index: number }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: (index % 4) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative overflow-hidden rounded-sm cursor-pointer ${spanClasses[img.span]}`}
      onClick={() => setIsActive(!isActive)}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {/* Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={img.src}
          alt={img.alt}
          className={`w-full h-full object-cover transition-all duration-[900ms] ease-out
            ${isActive ? "grayscale-0 scale-110" : "grayscale-[85%] scale-100"}`}
        />
      </div>

      {/* Dark overlay - fades on hover/touch */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-700
          ${isActive ? "opacity-40" : "opacity-90"}`}
      />

      {/* Gold border on hover/touch */}
      <div
        className={`absolute inset-0 border transition-all duration-500 pointer-events-none
          ${isActive ? "border-[#D4AF37]/50" : "border-[#D4AF37]/0"}`}
      />

      {/* Corner accent */}
      <div className={`absolute top-3 right-3 w-6 h-6 transition-opacity duration-500 delay-100
          ${isActive ? "opacity-100" : "opacity-0"}`}>
        <div className="w-full h-px bg-[#D4AF37]" />
        <div className="w-px h-full bg-[#D4AF37] absolute top-0 right-0" />
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  MAIN COMPONENT                                                            */
/* -------------------------------------------------------------------------- */

export default function FishingGallery() {
  return (
    <section className="relative bg-[#0A0A0A] py-24 md:py-32 overflow-hidden">
      {/* subtle ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D4AF37]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-4">
            Moments From the Ocean
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
            The Catch <span className="italic text-[#D4AF37]">— Gallery</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="w-10 h-px bg-[#D4AF37]/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="w-10 h-px bg-[#D4AF37]/40" />
          </div>
        </motion.div>

        {/* Masonry Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5
                     auto-rows-[160px] md:auto-rows-[200px]"
        >
          {GALLERY_IMAGES.map((img, i) => (
            <GalleryImageCard key={img.src} img={img} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}