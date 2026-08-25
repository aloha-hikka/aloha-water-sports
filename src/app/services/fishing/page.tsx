// src/app/services/fishing/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import FishingGallery from "./FishingGallery";
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
  Fish,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  DATA                                                                      */
/* -------------------------------------------------------------------------- */

type PriceType = "from" | "fixed" | "contact";

interface Package {
  id: string;
  name: string;
  tagline: string;
  duration: string;
  capacity: string;
  includes: string[];
  tags: string[];
  priceType: PriceType;
  priceLabel: string;
  priceValue: number | null; // null if not fixed
  recommended?: boolean;
}

const PACKAGES: Package[] = [
  {
    id: "bottom",
    name: "Bottom Fishing",
    tagline: "Classic & Relaxed",
    duration: "1, 2, or 3 Hours",
    capacity: "Max 2 People",
    includes: ["Equipment", "Water"],
    tags: ["Child Friendly", "Max 2 Pax"],
    priceType: "from",
    priceLabel: "From $50",
    priceValue: 50,
  },
  {
    id: "sport-mixed",
    name: "Sport Trolling, Bottom & Spinning",
    tagline: "Best of All Styles",
    duration: "3 Hours",
    capacity: "1-4 People",
    includes: ["Branded Equipment", "Water"],
    tags: ["Group Friendly"],
    priceType: "fixed",
    priceLabel: "$120",
    priceValue: 120,
  },
  {
    id: "sport-trolling",
    name: "Sport Trolling Fishing",
    tagline: "Chase the Big Catch",
    duration: "3 Hours",
    capacity: "1-4 People",
    includes: ["Branded Equipment", "Water", "Food"],
    tags: ["Meals Included"],
    priceType: "fixed",
    priceLabel: "$200",
    priceValue: 200,
    recommended: true,
  },
  {
    id: "super-spinning",
    name: "Sport Trolling & Super Locations Spinning",
    tagline: "Extended Deep Water Access",
    duration: "6 Hours",
    capacity: "1-4 People",
    includes: ["Branded Equipment", "Water", "Food"],
    tags: ["Meals Included", "Full Day"],
    priceType: "fixed",
    priceLabel: "$350",
    priceValue: 350,
  },
  {
    id: "deep-sea",
    name: "Deep Sea Fishing (Within 15km)",
    tagline: "Open Ocean Pursuit",
    duration: "8 Hours",
    capacity: "1-4 People",
    includes: ["Branded Equipment", "Water", "Food"],
    tags: ["Meals Included", "Full Day"],
    priceType: "fixed",
    priceLabel: "$350",
    priceValue: 350,
  },
  {
    id: "night-fishing",
    name: "Night Fishing Tour",
    tagline: "Under the Stars",
    duration: "3 / 4 / 5 / 6 Hours",
    capacity: "1-4 People",
    includes: ["Branded Equipment", "Water", "Food"],
    tags: ["Custom Duration"],
    priceType: "contact",
    priceLabel: "Contact for Details",
    priceValue: null,
  },
];

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

function FishingCard({
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
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={`relative flex flex-col p-8 border rounded-sm transition-all duration-500 ${
        pkg.recommended
          ? "border-[#D4AF37] bg-gradient-to-b from-[#D4AF37]/10 to-transparent"
          : "border-white/10 bg-white/[0.02] hover:border-[#D4AF37]/40"
      }`}
    >
      {pkg.recommended && (
        <span className="absolute -top-3 left-8 bg-[#D4AF37] text-[#0A0A0A] text-[10px] tracking-widest uppercase px-3 py-1 font-medium">
          Popular
        </span>
      )}

      <p className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-2">{pkg.tagline}</p>
      <h3 className="font-serif text-2xl text-white mb-4 leading-snug">{pkg.name}</h3>

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

      <div className="space-y-2 mb-5 text-sm text-white/50">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#D4AF37]" /> {pkg.duration}
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[#D4AF37]" /> {pkg.capacity}
        </div>
      </div>

      <ul className="space-y-2 mb-6 flex-1">
        {pkg.includes.map((f) => (
          <li key={f} className="flex items-center gap-3 text-white/60 text-sm">
            <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mb-6">
        <span className="font-serif text-3xl text-white">{pkg.priceLabel}</span>
      </div>

      <button
        onClick={() => onBook(pkg)}
        className="w-full py-3.5 border border-[#D4AF37] text-[#D4AF37] tracking-widest uppercase text-xs hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all duration-300"
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
  // වෙනස 1: හිස් අගයක් ගන්න පුළුවන් වෙන්න හැදුවා
  const [numberOfPersons, setNumberOfPersons] = useState<number | string>(1);

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

    // හිස්ව තිබ්බොත් 1ක් විදියට ගන්නවා
    const persons = typeof numberOfPersons === "number" ? numberOfPersons : 1;

    const message =
      `Hi Aloha Water Sports! I would like to book a Fishing tour.%0A%0A` +
      `*Tour:* ${selectedPackage.name}%0A` +
      `*Name:* ${name}%0A` +
      `*Date:* ${date}%0A` +
      `*Time:* ${time}%0A` +
      `*Persons:* ${persons}`;

    const url = `https://wa.me/94776476362?text=${message}`;
    window.open(url, "_blank");
  };

  const renderPriceBlock = () => {
    if (!selectedPackage) return null;

    if (selectedPackage.priceType === "fixed") {
      return (
        <div className="flex items-center justify-between bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-sm px-5 py-4 mt-2">
          <span className="text-white/70 text-sm tracking-wide uppercase">Total Price</span>
          <span className="font-serif text-2xl text-[#D4AF37]">
            {selectedPackage.priceLabel}
          </span>
        </div>
      );
    }

    return (
      <div className="bg-white/5 border border-white/10 rounded-sm px-5 py-4 mt-2">
        <p className="text-white/60 text-sm leading-relaxed">
          {selectedPackage.priceType === "from"
            ? `Starting at ${selectedPackage.priceLabel}. Final price will be confirmed via WhatsApp based on duration.`
            : "Price will be confirmed via WhatsApp based on your preferences."}
        </p>
      </div>
    );
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
              Reserve Your Trip
            </p>
            <h3 className="font-serif text-3xl text-white mb-1 leading-snug">
              {selectedPackage.name}
            </h3>
            <p className="text-white/40 text-sm mb-8">
              {selectedPackage.duration} · {selectedPackage.capacity}
            </p>

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
                  // වෙනස 2: මකනකොට හිස් වෙන්නත්, අලුත් අගය Type කරද්දී ඒක ගන්නත් අවසර දුන්නා
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
                  // වෙනස 3: හිස් කරලා වෙන තැනක් Click කළොත් ආයෙත් 1 වෙනවා
                  onBlur={() => {
                    if (numberOfPersons === "") {
                      setNumberOfPersons(1);
                    }
                  }}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none text-white px-4 py-3 rounded-sm transition-colors"
                />
              </div>

              {renderPriceBlock()}

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

export default function FishingPage() {
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
            src="https://images.unsplash.com/photo-1544943910-4c1dc44aab44?q=80&w=2000&auto=format&fit=crop"
            alt="Deep sea fishing"
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
              <span className="text-[#D4AF37]">Fishing</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-white flex items-center gap-4 flex-wrap">
              <Fish className="w-9 h-9 md:w-12 md:h-12 text-[#D4AF37]" />
              Deep Sea &amp; <span className="italic text-[#D4AF37]">Sport Fishing</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* PRICING */}
      <section className="relative bg-[#0A0A0A] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-4">
              Choose Your Expedition
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white">
              Pricing &amp; Packages
            </h2>
            <p className="text-white/40 max-w-xl mx-auto mt-4 leading-relaxed">
              From relaxed bottom fishing to full-day deep sea pursuits — every trip
              includes expert crew and branded equipment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PACKAGES.map((pkg, i) => (
              <FishingCard key={pkg.id} pkg={pkg} index={i} onBook={openModal} />
            ))}
          </div>
        </div>
      </section>

    <FishingGallery />

      {/* INFO STRIP */}
      <section className="relative bg-[#0E2129] py-16 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <p className="font-serif text-3xl text-[#D4AF37] mb-2">Expert Crew</p>
            <p className="text-white/40 text-sm">
              Experienced local captains who know every reef and drop-off.
            </p>
          </div>
          <div>
            <p className="font-serif text-3xl text-[#D4AF37] mb-2">Branded Gear</p>
            <p className="text-white/40 text-sm">
              Premium rods, reels, and tackle for every skill level.
            </p>
          </div>
          <div>
            <p className="font-serif text-3xl text-[#D4AF37] mb-2">Safety First</p>
            <p className="text-white/40 text-sm">
              Fully equipped vessels with life jackets and safety protocols.
            </p>
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