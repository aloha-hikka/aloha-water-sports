"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const SERVICE_DATA: Record<
  string,
  {
    title: string;
    tagline: string;
    description: string;
    image: string;
    details: string[];
    duration: string;
    price: string;
    difficulty: string;
  }
> = {
  snorkeling: {
    title: "Snorkeling",
    tagline: "Beneath the surface, another world awaits.",
    description:
      "Explore Hikkaduwa's magnificent coral reef sanctuary — one of the most pristine in the Indian Ocean. Our expert guides will lead you through vibrant coral gardens teeming with over 170 species of reef fish, gentle sea turtles, and dazzling marine life. Suitable for all skill levels.",
    image:
      "https://images.pexels.com/photos/26927362/pexels-photo-26927362.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    details: [
      "Full snorkel gear included",
      "Professional guide escort",
      "Turtle watching opportunities",
      "Coral reef photography",
    ],
    duration: "2–3 hours",
    price: "From $35 USD",
    difficulty: "All levels",
  },
  diving: {
    title: "Diving",
    tagline: "Descend into the extraordinary deep.",
    description:
      "Discover the mysteries that lie beneath Hikkaduwa's surface. From the legendary shipwrecks at 20 metres to the vibrant reef walls alive with colour, our PADI-certified instructors ensure every dive is safe, unforgettable, and deeply transformative.",
    image:
      "https://images.pexels.com/photos/4621616/pexels-photo-4621616.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    details: [
      "PADI certified instructors",
      "Full equipment provided",
      "Wreck & reef dives available",
      "Night dives on request",
    ],
    duration: "Half-day / Full-day",
    price: "From $75 USD",
    difficulty: "Beginner to Advanced",
  },
  surfing: {
    title: "Surfing",
    tagline: "Ride the raw power of the Indian Ocean.",
    description:
      "Hikkaduwa delivers some of Sri Lanka's most consistent surf breaks. Whether you're stepping on a board for the first time or looking to master your cut-back, our experienced instructors will read the ocean for you and help you find your flow.",
    image:
      "https://images.pexels.com/photos/34457608/pexels-photo-34457608.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    details: [
      "Beginner & intermediate lessons",
      "Soft-top boards for beginners",
      "Video analysis available",
      "Small group sessions",
    ],
    duration: "2 hours",
    price: "From $45 USD",
    difficulty: "Beginner to Intermediate",
  },
  fishing: {
    title: "Fishing",
    tagline: "Deep-sea expeditions at golden hour.",
    description:
      "Cast your lines into the deep blue of the Indian Ocean aboard our well-equipped fishing boats. Target yellowfin tuna, dorado, wahoo, and sailfish on exhilarating offshore expeditions, or enjoy peaceful reef fishing with the Hikkaduwa coastline as your backdrop.",
    image:
      "https://images.pexels.com/photos/14318336/pexels-photo-14318336.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    details: [
      "Deep-sea & reef fishing",
      "Full tackle & equipment",
      "Dawn & sunset trips",
      "Catch-and-release available",
    ],
    duration: "4–8 hours",
    price: "From $120 USD",
    difficulty: "All levels",
  },
};

export default function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const service = SERVICE_DATA[params.slug];

  if (!service) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 mb-4" style={{ fontFamily: "var(--font-inter, sans-serif)" }}>
            Service not found
          </p>
          <Link href="/" className="text-[#D4AF37] underline text-sm">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* Hero */}
      <div className="relative h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${service.image}')`, filter: "grayscale(30%)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 lg:px-20 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-[#D4AF37]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#D4AF37]"
                style={{ fontFamily: "var(--font-inter, sans-serif)" }}>
                Aloha Water Sports
              </span>
            </div>
            <h1
              className="text-white leading-none mb-3"
              style={{
                fontFamily: "var(--font-playfair, serif)",
                fontSize: "clamp(3rem, 8vw, 7rem)",
                letterSpacing: "-0.03em",
              }}
            >
              {service.title}
            </h1>
            <p className="text-white/50 text-base max-w-sm"
              style={{ fontFamily: "var(--font-inter, sans-serif)" }}>
              {service.tagline}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 sm:px-12 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/30 hover:text-white/70 transition-colors text-xs tracking-[0.2em] uppercase mb-12"
          style={{ fontFamily: "var(--font-inter, sans-serif)" }}
        >
          <ArrowLeft size={13} /> Back to Home
        </Link>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <p
              className="text-white/55 leading-[1.9] text-base"
              style={{ fontFamily: "var(--font-inter, sans-serif)" }}
            >
              {service.description}
            </p>
          </div>

          <div className="space-y-4">
            {[
              { label: "Duration", value: service.duration },
              { label: "Starting Price", value: service.price },
              { label: "Difficulty", value: service.difficulty },
            ].map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center border-b border-white/8 pb-3"
              >
                <span
                  className="text-white/30 text-xs tracking-[0.2em] uppercase"
                  style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                >
                  {item.label}
                </span>
                <span
                  className="text-white text-sm"
                  style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3
            className="text-[#D4AF37] text-sm tracking-[0.2em] uppercase mb-4"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            What&apos;s Included
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {service.details.map((d) => (
              <div key={d} className="flex items-center gap-3">
                <div className="w-1 h-1 bg-[#D4AF37] rotate-45 flex-shrink-0" />
                <span
                  className="text-white/50 text-sm"
                  style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                >
                  {d}
                </span>
              </div>
            ))}
          </div>
        </div>

        <a
          href="https://wa.me/94771234567"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#D4AF37] text-[#0A0A0A] text-xs tracking-[0.25em] uppercase px-8 py-4 font-semibold hover:bg-[#E8C84A] transition-colors"
          style={{ fontFamily: "var(--font-inter, sans-serif)" }}
        >
          Book This Experience
          <ArrowLeft size={13} className="rotate-180" />
        </a>
      </div>
    </main>
  );
}
