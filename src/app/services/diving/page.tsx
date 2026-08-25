// src/app/services/diving/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Menu,
  X,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Check,
  ArrowRight,
  Waves,
  Clock,
  Users,
  ShieldCheck,
  Anchor,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  DATA                                                                      */
/* -------------------------------------------------------------------------- */

interface Package {
  id: string;
  name: string;
  tagline: string;
  displayPrice: string;
  basePrice: number;
  description: string;
  includes: string[];
  extraInfo: { label: string; items: string[] };
  tags: string[];
  recommended?: boolean;
}

const PACKAGES: Package[] = [
  {
    id: "discover",
    name: "Discover Scuba Diving",
    tagline: "Beginner PADI Experience",
    displayPrice: "$50.00",
    basePrice: 50,
    description:
      "The perfect introduction for first-timers. Learn the basics, practice in shallow water, then head out for one guided open water ocean dive.",
    includes: [
      "Full orientation & briefing",
      "Complete equipment provided",
      "Shallow-water practice session",
      "1 guided ocean dive",
      "Small / private groups",
    ],
    extraInfo: {
      label: "Requirements",
      items: [
        "Minimum age: 10 years",
        "No prior experience needed",
        "Medical questionnaire required",
      ],
    },
    tags: ["Beginner Friendly", "PADI Standard"],
    recommended: true,
  },
  {
    id: "fun-dive",
    name: "Fun Dives",
    tagline: "Single Dive for Certified Divers",
    displayPrice: "$30.00 - $35.00",
    basePrice: 30,
    description:
      "Explore vibrant coral reefs, wrecks, and marine life in Hikkaduwa. Every dive is tailored to your certification level and experience.",
    includes: [
      "1 guided fun dive",
      "Complete equipment provided",
      "Boat transport included",
      "Free pickup / drop-off within 5km",
    ],
    extraInfo: {
      label: "Schedule",
      items: ["Meet at 8:45 AM", "Boat departs 9:30 AM"],
    },
    tags: ["Certified Divers", "Hikkaduwa Reef"],
  },
];

const GALLERY_IMAGES = [
  {
    src: "/images/diving/1.jpg",
    alt: "Scuba diver exploring coral reef",
    span: "tall",
  },
  {
    src: "/images/diving/2.jpg",
    alt: "Diver descending into deep blue water",
    span: "normal",
  },
  {
    src: "/images/diving/3.jpg",
    alt: "Underwater coral garden",
    span: "wide",
  },
  {
    src: "/images/diving/4.jpg",
    alt: "Scuba diver with bubbles",
    span: "normal",
  },
  {
    src: "/images/diving/5.jpg",
    alt: "Diver near shipwreck",
    span: "tall",
  },
  {
    src: "/images/diving/6.jpg",
    alt: "Sea turtle underwater",
    span: "normal",
  },
  {
    src: "/images/diving/7.jpg",
    alt: "Diver equipment on boat",
    span: "wide",
  },
  {
    src: "/images/diving/8.jpg",
    alt: "Tropical ocean surface from below",
    span: "normal",
  },
] as const;

const spanClasses: Record<string, string> = {
  tall: "row-span-2",
  wide: "col-span-2",
  normal: "row-span-1 col-span-1",
};

function calculatePrice(pkg: Package | null, persons: number): number {
  if (!pkg) return 0;
  const n = Math.max(1, persons || 1);
  return pkg.basePrice * n;
}

function GalleryImageCard({ img, index }: { img: any; index: number }) {
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
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={img.src}
          alt={img.alt}
          className={`w-full h-full object-cover transition-all duration-[900ms] ease-out
            ${isActive ? "grayscale-0 scale-110" : "grayscale-[85%] scale-100"}`}
        />
      </div>

      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-700
          ${isActive ? "opacity-40" : "opacity-90"}`}
      />

      <div
        className={`absolute inset-0 border transition-all duration-500 pointer-events-none
          ${isActive ? "border-[#D4AF37]/50" : "border-[#D4AF37]/0"}`}
      />

      <div className={`absolute top-3 right-3 w-6 h-6 transition-opacity duration-500 delay-100
          ${isActive ? "opacity-100" : "opacity-0"}`}>
        <div className="w-full h-px bg-[#D4AF37]" />
        <div className="w-px h-full bg-[#D4AF37] absolute top-0 right-0" />
      </div>
    </motion.div>
  );
} 

/* -------------------------------------------------------------------------- */
/*  NAVIGATION                                                                */
/* -------------------------------------------------------------------------- */

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Services", "Experience", "Gallery", "Reviews", "Contact"];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#D4AF37]/10 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Waves className="w-6 h-6 text-[#D4AF37] group-hover:rotate-12 transition-transform duration-500" />
            <span className="font-serif text-xl md:text-2xl tracking-wide text-white">
              Aloha <span className="text-[#D4AF37]">Water Sports</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <Link
                key={link}
                href={`/#${link.toLowerCase()}`}
                className="relative text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors duration-300 group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Link
              href="/#contact"
              className="px-6 py-2.5 border border-[#D4AF37] text-[#D4AF37] text-sm tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all duration-300"
            >
              Book Now
            </Link>
          </div>

          <button onClick={() => setMenuOpen(true)} className="md:hidden text-white">
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#0A0A0A]/98 backdrop-blur-2xl flex flex-col"
          >
            <div className="flex justify-end p-6">
              <button onClick={() => setMenuOpen(false)} className="text-white">
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {links.map((link, i) => (
                <motion.div
                  key={link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={`/#${link.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-3xl text-white/90 hover:text-[#D4AF37] transition-colors"
                  >
                    {link}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-6 px-8 py-3 border border-[#D4AF37] text-[#D4AF37] tracking-widest uppercase"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  FOOTER (inline SVG icons — no lucide social imports)                     */
/* -------------------------------------------------------------------------- */

function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <footer ref={ref} className="relative bg-[#0A0A0A] border-t border-[#D4AF37]/10 overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2000')] bg-cover bg-center" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-6xl text-white mb-6"
          >
            Ready for <span className="text-[#D4AF37] italic">Aloha</span>?
          </motion.h2>
          <p className="text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">
            Let the turquoise waters of the Indian Ocean become your next story.
            Reserve your adventure today.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#D4AF37] text-[#0A0A0A] tracking-widest uppercase text-sm font-medium hover:bg-white transition-colors duration-300"
          >
            Plan Your Journey <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-white/10 pt-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Waves className="w-5 h-5 text-[#D4AF37]" />
              <span className="font-serif text-lg text-white">Aloha Water Sports</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Premium ocean experiences on the shores of Sri Lanka.
            </p>
          </div>

          <div>
            <h4 className="text-white/80 text-sm tracking-widest uppercase mb-4">Explore</h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li>
                <Link href="/#services" className="hover:text-[#D4AF37] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="hover:text-[#D4AF37] transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-[#D4AF37] transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className="hover:text-[#D4AF37] transition-colors">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white/80 text-sm tracking-widest uppercase mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" /> Hikkaduwa, Sri Lanka
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37]" /> +94 77 647 6362
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37]" /> hikka.aloha@gmail.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white/80 text-sm tracking-widest uppercase mb-4">Follow</h4>
            <div className="flex gap-4">
              {/* TripAdvisor (inline SVG) */}
              <a
                href="https://www.tripadvisor.com/Attraction_Review-g304134-d28648467-Reviews-Hikkaduwa_Snorkeling_And_Diving_Aloha-Hikkaduwa_Galle_District_Southern_Province.html"
                aria-label="TripAdvisor"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M12.005 3.328c-4.437 0-9.697 1.815-11.597 4.772-.44.693-.207 1.933.567 2.656l1.246 1.157c-.206 1.347.16 2.766 1.05 3.79l3.036 3.447c.504.57 1.36.657 1.96.2.597-.457.674-1.286.17-1.856l-3.037-3.447c-.502-.572-.71-1.373-.59-2.146l4.24 3.935c1.472 1.366 3.733 1.366 5.205 0l4.24-3.935c.12.773-.087 1.574-.59 2.146l-3.035 3.447c-.505.57-.428 1.4.17 1.856.598.457 1.455.37 1.96-.2l3.036-3.447c.89-1.024 1.256-2.443 1.05-3.79l1.245-1.157c.774-.723 1.008-1.963.568-2.656-1.9-2.957-7.16-4.772-11.598-4.772zm0 2.215c3.21 0 7.158 1.22 8.71 2.85-1.294-1.354-4.896-2.023-8.71-2.023-3.814 0-7.416.67-8.71 2.023 1.552-1.63 5.5-2.85 8.71-2.85zm-4.71 3.5c1.558 0 2.82 1.26 2.82 2.82 0 1.557-1.262 2.82-2.82 2.82-1.558 0-2.82-1.263-2.82-2.82 0-1.56 1.262-2.82 2.82-2.82zm9.42 0c1.557 0 2.82 1.26 2.82 2.82 0 1.557-1.263 2.82-2.82 2.82-1.557 0-2.82-1.263-2.82-2.82 0-1.56 1.263-2.82 2.82-2.82zm-9.42 1.32c-.83 0-1.5.67-1.5 1.5 0 .828.67 1.5 1.5 1.5.828 0 1.5-.672 1.5-1.5 0-.83-.672-1.5-1.5-1.5zm9.42 0c-.828 0-1.5.67-1.5 1.5 0 .828.672 1.5 1.5 1.5.83 0 1.5-.672 1.5-1.5 0-.83-.67-1.5-1.5-1.5z"/>
                </svg>
              </a>
              {/* Facebook (inline SVG) */}
              <a
                href="https://web.facebook.com/profile.php?id=100063598476996"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* Youtube/X (inline SVG) */}
              <a
                href="https://www.youtube.com/@TharinduAloha"
                aria-label="Youtube"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-white/30 text-xs mt-16 pt-8 border-t border-white/5">
          © {new Date().getFullYear()} Aloha Water Sports. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  PRICING CARD                                                              */
/* -------------------------------------------------------------------------- */

function DivingCard({
  pkg,
  index,
  onBook,
}: {
  pkg: Package;
  index: number;
  onBook: (pkg: Package) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex flex-col p-8 md:p-10 border rounded-sm transition-all duration-500 ${
        pkg.recommended
          ? "border-[#D4AF37] bg-gradient-to-b from-[#D4AF37]/10 to-transparent"
          : "border-white/10 bg-white/[0.02] hover:border-[#D4AF37]/40"
      }`}
    >
      {pkg.recommended && (
        <span className="absolute -top-3 left-8 bg-[#D4AF37] text-[#0A0A0A] text-[10px] tracking-widest uppercase px-3 py-1 font-medium">
          Most Popular
        </span>
      )}

      <p className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-2">{pkg.tagline}</p>
      <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">{pkg.name}</h3>

      <div className="flex flex-wrap gap-2 mb-5">
        {pkg.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] tracking-wider uppercase px-3 py-1 border border-[#D4AF37]/30 text-[#D4AF37]/80 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-white/50 text-sm leading-relaxed mb-6">{pkg.description}</p>

      <div className="mb-6">
        <span className="font-serif text-3xl md:text-4xl text-white">{pkg.displayPrice}</span>
        <p className="text-white/40 text-xs mt-1">per person, based on group size</p>
      </div>

      <div className="mb-6">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Includes</p>
        <ul className="space-y-2">
          {pkg.includes.map((f) => (
            <li key={f} className="flex items-center gap-3 text-white/60 text-sm">
              <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8 border-t border-white/10 pt-5">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
          {pkg.extraInfo.label === "Requirements" ? (
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
          ) : (
            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
          )}
          {pkg.extraInfo.label}
        </p>
        <ul className="space-y-1.5">
          {pkg.extraInfo.items.map((item) => (
            <li key={item} className="text-white/50 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => onBook(pkg)}
        className="w-full mt-auto py-3.5 border border-[#D4AF37] text-[#D4AF37] tracking-widest uppercase text-xs hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all duration-300"
      >
        Book Now
      </button>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  BOOKING MODAL                                                             */
/* -------------------------------------------------------------------------- */

function BookingModal({
  isOpen,
  onClose,
  selectedPackage,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: Package | null;
}) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  // වෙනස 1: හිස් අගයක් වුණත් ගන්න පුළුවන් විදියට State එක හැදුවා
  const [numberOfPersons, setNumberOfPersons] = useState<number | string>(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // වෙනස 2: කොටුව හිස් වෙලා තියෙන තත්පරේට Price එක 1කට හදලා පෙන්නනවා
    const persons = typeof numberOfPersons === "number" ? numberOfPersons : 1;
    setTotalPrice(calculatePrice(selectedPackage, persons));
  }, [selectedPackage, numberOfPersons]);

  useEffect(() => {
    if (isOpen) {
      setName("");
      setDate("");
      setTime("");
      setNumberOfPersons(1);
    }
  }, [isOpen, selectedPackage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage) return;

    const persons = typeof numberOfPersons === "number" ? numberOfPersons : 1;

    const message =
      `Hi Aloha Water Sports! I would like to book a Diving experience.%0A%0A` +
      `*Package:* ${selectedPackage.name}%0A` +
      `*Name:* ${name}%0A` +
      `*Date:* ${date}%0A` +
      `*Time:* ${time}%0A` +
      `*Persons:* ${persons}%0A` +
      `*Estimated Total:* $${totalPrice}`;

    const url = `https://wa.me/94776476362?text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && selectedPackage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[#0E2129] border border-[#D4AF37]/20 rounded-sm p-8 md:p-10 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-2">
              Reserve Your Dive
            </p>
            <h3 className="font-serif text-3xl text-white mb-1 leading-snug">
              {selectedPackage.name}
            </h3>
            <p className="text-white/40 text-sm mb-8">{selectedPackage.tagline}</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-white/60 text-xs uppercase tracking-widest mb-2 block">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none text-white px-4 py-3 rounded-sm transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/60 text-xs uppercase tracking-widest mb-2 block">
                    Date
                  </label>
                  <input
                    required
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none text-white px-4 py-3 rounded-sm transition-colors [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-xs uppercase tracking-widest mb-2 block">
                    Time
                  </label>
                  <input
                    required
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none text-white px-4 py-3 rounded-sm transition-colors [color-scheme:dark]"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/60 text-xs uppercase tracking-widest mb-2 block">
                  Number of Persons
                </label>
                <input
                  required
                  type="number"
                  min={1}
                  value={numberOfPersons}
                  // වෙනස 3: මකනකොට හිස් වෙන්නත්, අලුත් අගය Type කරද්දී ඒක ගන්නත් අවසර දුන්නා
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "") {
                      setNumberOfPersons("");
                    } else {
                      const parsed = parseInt(val);
                      if (!isNaN(parsed) && parsed > 0) {
                        setNumberOfPersons(parsed);
                      }
                    }
                  }}
                  // වෙනස 4: හිස් කරලා වෙන තැනක් Click කළොත් ආයෙත් 1 වෙනවා (ආරක්ෂාවට)
                  onBlur={() => {
                    if (numberOfPersons === "") {
                      setNumberOfPersons(1);
                    }
                  }}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none text-white px-4 py-3 rounded-sm transition-colors"
                />
              </div>

              <div className="flex items-center justify-between bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-sm px-5 py-4 mt-2">
                <span className="text-white/70 text-sm tracking-wide uppercase">
                  Estimated Total
                </span>
                <span className="font-serif text-2xl text-[#D4AF37]">${totalPrice}</span>
              </div>
              <p className="text-white/30 text-xs -mt-3">
                Final price confirmed via WhatsApp based on group size & requirements.
              </p>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-[#D4AF37] text-[#0A0A0A] py-4 tracking-widest uppercase text-sm font-medium hover:bg-white transition-colors duration-300 mt-4"
              >
                Confirm via WhatsApp <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/*  PAGE                                                                      */
/* -------------------------------------------------------------------------- */

export default function DivingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const openModal = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen font-sans">
      <Navigation />

      {/* HERO */}
      <section className="relative h-[50vh] min-h-[420px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2000&auto=format&fit=crop"
            alt="Scuba diver underwater"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/30" />
          <div className="absolute inset-0 bg-[#0E2129]/40 mix-blend-multiply" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 pb-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 text-white/50 text-sm mb-6 tracking-wide">
              <Link href="/" className="hover:text-[#D4AF37] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/#services" className="hover:text-[#D4AF37] transition-colors">
                Services
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#D4AF37]">Diving</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-white">
              Scuba Diving <span className="italic text-[#D4AF37]">Adventures</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* PRICING */}
      <section className="relative bg-[#0A0A0A] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-4">
              Choose Your Dive
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white">
              Pricing &amp; Packages
            </h2>
            <p className="text-white/40 max-w-xl mx-auto mt-4 leading-relaxed">
              Whether it's your first breath underwater or your hundredth dive,
              our PADI-guided experiences meet you where you are.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PACKAGES.map((pkg, i) => (
              <DivingCard key={pkg.id} pkg={pkg} index={i} onBook={openModal} />
            ))}
          </div>
        </div>
      </section>

      {/* INFO STRIP */}
      <section className="relative bg-[#0E2129] py-16 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <ShieldCheck className="w-6 h-6 text-[#D4AF37] mx-auto mb-3" />
            <p className="font-serif text-xl text-white mb-2">PADI Certified</p>
            <p className="text-white/40 text-sm">
              All instructors are internationally certified for your safety.
            </p>
          </div>
          <div>
            <Anchor className="w-6 h-6 text-[#D4AF37] mx-auto mb-3" />
            <p className="font-serif text-xl text-white mb-2">Boat Included</p>
            <p className="text-white/40 text-sm">
              Comfortable boat transport to the best dive sites in Hikkaduwa.
            </p>
          </div>
          <div>
            <Users className="w-6 h-6 text-[#D4AF37] mx-auto mb-3" />
            <p className="font-serif text-xl text-white mb-2">Small Groups</p>
            <p className="text-white/40 text-sm">
              Personalized attention with intimate group sizes on every dive.
            </p>
          </div>
        </div>
      </section>

{/* GALLERY */}
      <section className="relative bg-[#0A0A0A] py-24 md:py-32 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D4AF37]/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-4">
              Explore the Depths
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
              Beneath <span className="italic text-[#D4AF37]">the Surface</span>
            </h2>
            <div className="flex items-center justify-center gap-3">
              <span className="w-10 h-px bg-[#D4AF37]/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span className="w-10 h-px bg-[#D4AF37]/40" />
            </div>
          </motion.div>

          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5
                       auto-rows-[160px] md:auto-rows-[200px]"
          >
            {/* අර ලොකු Code එක වෙනුවට අපි හදපු අලුත් Card එක මෙතනට දැම්මා */}
            {GALLERY_IMAGES.map((img, i) => (
              <GalleryImageCard key={img.src} img={img} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPackage={selectedPackage}
      />
    </div>
  );
}