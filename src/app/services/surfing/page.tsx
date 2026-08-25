// src/app/services/surfing/page.tsx
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
  Camera,
} from "lucide-react";
import SurfingGallery from "./SurfingGallery";

/* -------------------------------------------------------------------------- */
/*  DATA                                                                      */
/* -------------------------------------------------------------------------- */

type PriceMode = "scaling" | "per-person";

interface Package {
  id: string;
  name: string;
  tagline: string;
  location: string;
  duration: string;
  description: string;
  includes: string[];
  tags: string[];
  priceMode: PriceMode;
  priceLabel: string;
  perPersonPrice?: number;
  calcPrice: (n: number) => number;
  recommended?: boolean;
  dayBreakdown?: { day: string; focus: string }[];
}

const MAIN_PACKAGES: Package[] = [
  {
    id: "1-day",
    name: "1-Day Course",
    tagline: "Galle Dewata Beach",
    location: "Galle Dewata Beach",
    duration: "2 Hours",
    description:
      "We guarantee you can surf alone after just 2 hours! A fast-track intro built for total beginners.",
    includes: ["Transport", "Branded Boards", "Wetsuit", "Professional Teacher"],
    tags: ["Beginner Friendly", "Fast Track"],
    priceMode: "scaling",
    priceLabel: "From $50",
    calcPrice: (n: number) => 50 + (n - 1) * 30,
  },
  {
    id: "3-day",
    name: "3-Day Course Progression",
    tagline: "The Complete Journey",
    location: "Galle Dewata Beach",
    duration: "3 Hours / Day",
    description:
      "A structured progression from ocean safety to refined technique — our most transformative surf experience.",
    includes: [
      "Transport",
      "Branded Boards",
      "Wetsuit",
      "Professional Teacher",
      "GoPro Media",
      "Water",
      "Showers",
    ],
    tags: ["Signature Experience", "Full Progression"],
    priceMode: "scaling",
    priceLabel: "From $200",
    calcPrice: (n: number) => 200 + (n - 1) * 100,
    recommended: true,
    dayBreakdown: [
      { day: "Day 1", focus: "Ocean Safety & Fundamentals" },
      { day: "Day 2", focus: "Technique & Wave Reading" },
      { day: "Day 3", focus: "Refining Your Style" },
    ],
  },
];

const QUICK_SESSIONS: Package[] = [
  {
    id: "hikkaduwa",
    name: "Hikkaduwa Turtle Beach",
    tagline: "Gentle Waves, Sea Turtles",
    location: "Hikkaduwa",
    duration: "1 Hour",
    description: "A relaxed session on calm beginner-friendly waves near the turtle sanctuary.",
    includes: ["Branded Boards", "Wetsuit", "Professional Teacher"],
    tags: ["Beginner Friendly"],
    priceMode: "per-person",
    priceLabel: "$10 / person",
    perPersonPrice: 10,
    calcPrice: (n: number) => n * 10,
  },
  {
    id: "dodanduwa",
    name: "Dodanduwa Fishing Harbour",
    tagline: "Local Waters",
    location: "Dodanduwa",
    duration: "1 Hour",
    description: "Surf where the local fishing boats set out — an authentic coastal session.",
    includes: ["Transport", "Branded Boards", "Wetsuit", "Professional Teacher"],
    tags: ["Local Experience"],
    priceMode: "per-person",
    priceLabel: "$20 / person",
    perPersonPrice: 20,
    calcPrice: (n: number) => n * 20,
  },
  {
    id: "narigama",
    name: "Narigama Beach",
    tagline: "Consistent Break",
    location: "Narigama",
    duration: "1 Hour",
    description: "A well-loved beach break offering consistent, forgiving waves for quick sessions.",
    includes: ["Transport", "Branded Boards", "Wetsuit", "Professional Teacher"],
    tags: ["Popular Spot"],
    priceMode: "per-person",
    priceLabel: "$20 / person",
    perPersonPrice: 20,
    calcPrice: (n: number) => n * 20,
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
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=2000')] bg-cover bg-center" />
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
    
    {/* TripAdvisor */}
    <a href="https://www.tripadvisor.com/Attraction_Review-g304134-d28648467-Reviews-Hikkaduwa_Snorkeling_And_Diving_Aloha-Hikkaduwa_Galle_District_Southern_Province.html" target="_blank" rel="noopener noreferrer" aria-label="TripAdvisor" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.005 3.328c-4.437 0-9.697 1.815-11.597 4.772-.44.693-.207 1.933.567 2.656l1.246 1.157c-.206 1.347.16 2.766 1.05 3.79l3.036 3.447c.504.57 1.36.657 1.96.2.597-.457.674-1.286.17-1.856l-3.037-3.447c-.502-.572-.71-1.373-.59-2.146l4.24 3.935c1.472 1.366 3.733 1.366 5.205 0l4.24-3.935c.12.773-.087 1.574-.59 2.146l-3.035 3.447c-.505.57-.428 1.4.17 1.856.598.457 1.455.37 1.96-.2l3.036-3.447c.89-1.024 1.256-2.443 1.05-3.79l1.245-1.157c.774-.723 1.008-1.963.568-2.656-1.9-2.957-7.16-4.772-11.598-4.772zm0 2.215c3.21 0 7.158 1.22 8.71 2.85-1.294-1.354-4.896-2.023-8.71-2.023-3.814 0-7.416.67-8.71 2.023 1.552-1.63 5.5-2.85 8.71-2.85zm-4.71 3.5c1.558 0 2.82 1.26 2.82 2.82 0 1.557-1.262 2.82-2.82 2.82-1.558 0-2.82-1.263-2.82-2.82 0-1.56 1.262-2.82 2.82-2.82zm9.42 0c1.557 0 2.82 1.26 2.82 2.82 0 1.557-1.263 2.82-2.82 2.82-1.557 0-2.82-1.263-2.82-2.82 0-1.56 1.263-2.82 2.82-2.82zm-9.42 1.32c-.83 0-1.5.67-1.5 1.5 0 .828.67 1.5 1.5 1.5.828 0 1.5-.672 1.5-1.5 0-.83-.672-1.5-1.5-1.5zm9.42 0c-.828 0-1.5.67-1.5 1.5 0 .828.672 1.5 1.5 1.5.83 0 1.5-.672 1.5-1.5 0-.83-.67-1.5-1.5-1.5z"/>
      </svg>
    </a>

    {/* Facebook */}
    <a href="https://web.facebook.com/profile.php?id=100063598476996" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    </a>

    {/* YouTube */}
    <a href="https://www.youtube.com/@TharinduAloha" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all">
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
/*  FEATURE CARD (1-Day & 3-Day courses)                                     */
/* -------------------------------------------------------------------------- */

function FeatureCourseCard({
  pkg,
  index,
  onBook,
}: {
  pkg: Package;
  index: number;
  onBook: (pkg: Package) => void;
}) {
  const tiers = [1, 2, 3].map((n) => ({ n, price: pkg.calcPrice(n) }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex flex-col md:flex-row gap-8 p-8 md:p-10 border rounded-sm transition-all duration-500 ${
        pkg.recommended
          ? "border-[#D4AF37] bg-gradient-to-b from-[#D4AF37]/10 to-transparent"
          : "border-white/10 bg-white/[0.02] hover:border-[#D4AF37]/40"
      }`}
    >
      {pkg.recommended && (
        <span className="absolute -top-3 left-8 bg-[#D4AF37] text-[#0A0A0A] text-[10px] tracking-widest uppercase px-3 py-1 font-medium">
          Signature Experience
        </span>
      )}

      <div className="flex-1">
        <p className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-2">{pkg.tagline}</p>
        <h3 className="font-serif text-2xl md:text-3xl text-white mb-3">{pkg.name}</h3>
        <p className="text-white/50 text-sm leading-relaxed mb-5">{pkg.description}</p>

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
            <MapPin className="w-4 h-4 text-[#D4AF37]" /> {pkg.location}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#D4AF37]" /> {pkg.duration}
          </div>
        </div>

        {pkg.dayBreakdown && (
          <div className="mb-6 space-y-2">
            {pkg.dayBreakdown.map((d) => (
              <div key={d.day} className="flex items-center gap-3 text-sm">
                <span className="text-[#D4AF37] font-serif italic w-16 flex-shrink-0">
                  {d.day}
                </span>
                <span className="text-white/50">{d.focus}</span>
              </div>
            ))}
          </div>
        )}

        <ul className="space-y-2 mb-6">
          {pkg.includes.map((f) => (
            <li key={f} className="flex items-center gap-3 text-white/60 text-sm">
              <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <button
          onClick={() => onBook(pkg)}
          className="w-full md:w-auto px-8 py-3.5 border border-[#D4AF37] text-[#D4AF37] tracking-widest uppercase text-xs hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all duration-300"
        >
          Book Now
        </button>
      </div>

      <div className="w-full md:w-56 flex-shrink-0 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Pricing Scale</p>
        <div className="space-y-3">
          {tiers.map((t) => (
            <div key={t.n} className="flex items-center justify-between text-sm">
              <span className="text-white/50 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> {t.n} {t.n === 1 ? "Person" : "People"}
              </span>
              <span className="text-[#D4AF37] font-medium">${t.price}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  QUICK SESSION CARD                                                        */
/* -------------------------------------------------------------------------- */

function QuickSessionCard({
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
      className="flex flex-col p-8 border border-white/10 bg-white/[0.02] hover:border-[#D4AF37]/40 rounded-sm transition-all duration-500"
    >
      <p className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-2">{pkg.tagline}</p>
      <h3 className="font-serif text-2xl text-white mb-3">{pkg.name}</h3>
      <p className="text-white/40 text-sm leading-relaxed mb-5">{pkg.description}</p>

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
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (selectedPackage) {
      // වෙනස 2: කොටුව හිස් වෙලා තියෙන වෙලාවට Price එක 1කට හදලා පෙන්නනවා
      const persons = typeof numberOfPersons === "number" ? numberOfPersons : 1;
      setTotalPrice(selectedPackage.calcPrice(persons));
    }
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

    // හිස්ව තිබ්බොත් 1ක් විදියට ගන්නවා
    const persons = typeof numberOfPersons === "number" ? numberOfPersons : 1;

    const message =
      `Hi Aloha Water Sports! I would like to book a Surfing lesson.%0A%0A` +
      `*Package:* ${selectedPackage.name}%0A` +
      `*Name:* ${name}%0A` +
      `*Date:* ${date}%0A` +
      `*Time:* ${time}%0A` +
      `*Persons:* ${persons}%0A` +
      `*Total Price:* $${totalPrice}`;

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
              Reserve Your Session
            </p>
            <h3 className="font-serif text-3xl text-white mb-1 leading-snug">
              {selectedPackage.name}
            </h3>
            <p className="text-white/40 text-sm mb-8">
              {selectedPackage.location} · {selectedPackage.duration}
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
                  // වෙනස 4: හිස් කරලා වෙන තැනක් Click කළොත් ආයෙත් 1 වෙනවා
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
                  Total Price
                </span>
                <span className="font-serif text-2xl text-[#D4AF37]">${totalPrice}</span>
              </div>

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

export default function SurfingPage() {
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
            src="https://images.unsplash.com/photo-1502933691298-84fc14542831?q=80&w=2000&auto=format&fit=crop"
            alt="Surfing waves"
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
              <span className="text-[#D4AF37]">Surfing</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-white">
              Professional <span className="italic text-[#D4AF37]">Surf Lessons</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* MAIN COURSES */}
      <section className="relative bg-[#0A0A0A] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-4">
              Structured Learning
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white">
              Pricing &amp; Packages
            </h2>
            <p className="text-white/40 max-w-xl mx-auto mt-4 leading-relaxed">
              From a guaranteed 2-hour breakthrough to a full 3-day progression —
              choose the path that fits your journey.
            </p>
          </div>

          <div className="space-y-8 mb-20">
            {MAIN_PACKAGES.map((pkg, i) => (
              <FeatureCourseCard key={pkg.id} pkg={pkg} index={i} onBook={openModal} />
            ))}
          </div>

          {/* QUICK SESSIONS */}
          <div className="text-center mb-12">
            <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-4">
              On the Go
            </p>
            <h3 className="font-serif text-3xl md:text-4xl text-white">
              1-Hour Quick Sessions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {QUICK_SESSIONS.map((pkg, i) => (
              <QuickSessionCard key={pkg.id} pkg={pkg} index={i} onBook={openModal} />
            ))}
          </div>
        </div>
      </section>

      {/* INFO STRIP */}
      <section className="relative bg-[#0E2129] py-16 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <Camera className="w-6 h-6 text-[#D4AF37] mx-auto mb-3" />
            <p className="font-serif text-xl text-white mb-2">GoPro Media</p>
            <p className="text-white/40 text-sm">
              Relive every wave with professional footage on select packages.
            </p>
          </div>
          <div>
            <Users className="w-6 h-6 text-[#D4AF37] mx-auto mb-3" />
            <p className="font-serif text-xl text-white mb-2">Pro Instructors</p>
            <p className="text-white/40 text-sm">
              Certified local surf teachers with years on these exact breaks.
            </p>
          </div>
          <div>
            <Waves className="w-6 h-6 text-[#D4AF37] mx-auto mb-3" />
            <p className="font-serif text-xl text-white mb-2">All Levels Welcome</p>
            <p className="text-white/40 text-sm">
              From first-timers to those refining advanced technique.
            </p>
          </div>
        </div>
      </section>

      <SurfingGallery />

      <Footer />

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPackage={selectedPackage}
      />
    </div>
  );
}