"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Optimized About page for Projekt Valhalla
 * Enhanced visual hierarchy, improved animations, cohesive design
 */

/* --- Animation variants --- */
const containerStagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  show: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
  },
};

/* --- Rune Divider with enhanced styling --- */
function RuneDivider({ className = "" }) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className={`w-full flex items-center justify-center my-16 lg:my-20 ${className}`}
    >
      <div className="flex items-center gap-6 w-full max-w-4xl px-4">
        <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-red-700/40 to-red-700/40" />
        <div className="relative px-6 text-red-400/90 tracking-[0.3em] text-xs font-semibold uppercase">
          <div className="absolute inset-0 blur-xl bg-red-500/20" />
          <span className="relative">ᛟᚾᛚᚣ • ᚦᛖ • ᚹᛟᚱᚦᚣ • ᛋᚺᚨᛚᛚ • ᚨᛞᚢᚨᚾᚲᛖ</span>
        </div>
        <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-red-700/40 to-red-700/40" />
      </div>
    </motion.div>
  );
}

/* --- Section wrapper --- */
function AnimatedSection({ children, variant = fadeUp, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={variant}
      className={`w-full max-w-6xl mx-auto px-6 lg:px-8 ${className}`}
    >
      {children}
    </motion.section>
  );
}

/* --- Enhanced Creator Section --- */
function CreatorSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="w-full max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: Enhanced photo composition */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={slideLeft}
          className="relative w-full flex items-center justify-center lg:justify-end order-2 lg:order-1"
        >
          <div className="relative">
            {/* Main photo with enhanced styling */}
            <div className="relative w-[340px] h-[440px] lg:w-[420px] lg:h-[520px] overflow-hidden rounded-2xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-black/40 z-10" />
              <img
                src="/assets/creator-main.webp"
                alt="Creator main"
                className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
            </div>

            {/* Decorative accent behind */}
            <div className="absolute -inset-4 bg-gradient-to-br from-red-600/10 to-transparent rounded-3xl -z-10 blur-2xl" />

            {/* Side images with improved positioning */}
            <motion.img
              initial={{ opacity: 0, x: 20, rotate: -12 }}
              animate={inView ? { opacity: 1, x: 0, rotate: -6 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
              src="/assets/creator-side-1.webp"
              alt="Creator side 1"
              className="hidden md:block absolute -right-12 top-8 w-[180px] h-[140px] object-cover rounded-xl border-2 border-red-800/50 shadow-2xl hover:scale-200 hover:z-20 hover:rotate-0 transition-all duration-500 ease-out cursor-pointer"
            />
            <motion.img
              initial={{ opacity: 1, x: 20, rotate: 12 }}
              animate={inView ? { opacity: 1, x: 0, rotate: 6 } : {}}
              transition={{ delay: 0.4, duration: 0.7 }}
              src="/assets/creator-side-2.webp"
              alt="Creator side 2"
              className="hidden md:block absolute -right-8 bottom-12 w-[120px] h-[160px] object-cover rounded-xl border-2 border-red-800/40 shadow-xl hover:scale-200 hover:z-20 hover:rotate-0 transition-all duration-500 ease-out cursor-pointer"
            />
          </div>
        </motion.div>

        {/* Right: Enhanced text content */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={slideRight}
          className="w-full text-left order-1 lg:order-2"
        >
          <div className="space-y-6">
            <div>
              <p className="text-[#C40000] tracking-[0.2em] font-bold text-xs uppercase mb-3">
                The One Who Forged This Path
              </p>
              <h2 className="text-3xl lg:text-5xl font-[var(--font-morph)] font-bold mb-6 leading-[1.1] text-white">
                Built from chaos.<br />
                <span className="text-[#C40000]">Forged in discipline.</span>
              </h2>
            </div>

            <div className="space-y-4 text-gray-300 text-base lg:text-lg leading-relaxed">
              <p>
                I didn't grow up with structure. Life was messy, loud and unforgiving. Fitness gave me an axis — a system that translated effort into identity.
              </p>

              <p className="text-gray-400">
                Valhalla is the result: a deliberate path for those who want to turn struggle into strength. This is not a spotlight for vanity. It's a toolbox for the relentless.
              </p>

              <p className="text-white font-medium">
                If you carve the time, the results will carve you.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => (location.href = "/programs")}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-red-900 hover:bg-red-700 transition-all duration-300 font-bold text-base shadow-lg shadow-red-900/30 hover:shadow-xl hover:shadow-red-900/50 hover:-translate-y-0.5"
              >
                <span>See the Trials</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* --- Main About Page --- */
export default function About() {
  return (
    <main className="relative w-full min-h-screen text-white overflow-x-hidden">
      {/* Background container  */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 bg-black"
        style={{
		  top: '80px',        // Adjust based on your header height
		  bottom: '0',        // Footer will naturally cover its area
    	  left: 0,
    	  right: 0,
          backgroundImage: "url('/assets/aboutbg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Darkening overlay */}
      <div className="fixed inset-0 z-0 bg-black/50" />

      {/* Enhanced gradient overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />

      {/* Subtle vignette */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-40" />

      <div className="relative z-10 pt-32 pb-32">
        {/* Hero / Creed - Enhanced */}
        <div className="w-full max-w-5xl mx-auto px-6 lg:px-8 text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <p className="text-[#C40000] tracking-[0.3em] font-bold text-xs uppercase">
              The Creed
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[var(--font-morph)] font-bold leading-[1.15] max-w-4xl mx-auto">
              Projekt Valhalla is not a routine.
              <br />
              <span className="text-[#C40000]">It's a trial.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.9 }}
            className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-lg mt-8"
          >
            In a world obsessed with shortcuts, Valhalla stands for the opposite: discipline, structure, and the quiet violence of consistent effort. This is a place for the untamed — those who choose to rebuild themselves through fire.
          </motion.p>
        </div>

        <RuneDivider />

        {/* WHAT VALHALLA IS - Enhanced */}
        <AnimatedSection variant={fadeUp} className="py-12 lg:py-16">
          <div className="max-w-4xl">
            <p className="text-[#C40000] tracking-[0.2em] font-bold text-xs uppercase mb-3">
              What Valhalla Is
            </p>
            <h2 className="text-3xl lg:text-4xl font-[var(--font-morph)] font-bold mb-6 leading-tight">
              Strength is forged, not found.
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              Projekt Valhalla is a collection of challenge-based training programs, each built to push you past complacency and into capability. No trends. No gimmicks. Just structured, brutally effective training and the discipline to see it through.
            </p>
          </div>
        </AnimatedSection>

        <RuneDivider />

        {/* WHO THIS IS FOR - Enhanced with better list styling */}
        <AnimatedSection variant={fadeUp} className="py-12 lg:py-16">
          <div className="max-w-4xl">
            <p className="text-[#C40000] tracking-[0.2em] font-bold text-xs uppercase mb-3">
              Who This Is For
            </p>
            <h2 className="text-3xl lg:text-4xl font-[var(--font-morph)] font-bold mb-8 leading-tight">
              Not for everyone. <span className="text-[#C40000]">For the relentless.</span>
            </h2>

            <motion.div
              variants={containerStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="space-y-5"
            >
              {[
                "You feel stuck and want a clear, brutal direction.",
                "You value discipline over motivation and want structure that delivers.",
                "You want to transform — not just perform for the mirror.",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-start gap-4 group"
                >
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-red-500 mt-2.5 group-hover:scale-150 transition-transform duration-300" />
                  <p className="text-gray-300 text-lg leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        <RuneDivider />

        {/* Creator section */}
        <CreatorSection />

        <RuneDivider />

        {/* THE PATH AHEAD - Enhanced */}
        <AnimatedSection variant={fadeUp} className="py-12 lg:py-16 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-[#C40000] tracking-[0.2em] font-bold text-xs uppercase">
              The Path Ahead
            </p>
            <h2 className="text-3xl lg:text-4xl font-[var(--font-morph)] font-bold leading-tight">
              More trials. <span className="text-[#C40000]">Same intent.</span>
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              Valhalla will grow — more programs, more tools, and a community of grinders who value the work. The goal remains unchanged: create a path for the relentless. Choose a trial. Own it.
            </p>
          </div>
        </AnimatedSection>

        <div className="h-24" />
      </div>
    </main>
  );
}