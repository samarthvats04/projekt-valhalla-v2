"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

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
      className={`w-full flex items-center justify-center my-12 sm:my-14 md:my-16 lg:my-20 ${className}`}
    >
      <div className="flex items-center gap-3 sm:gap-4 md:gap-6 w-full max-w-4xl px-4">
        <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-red-700/40 to-red-700/40" />
        <div className="relative px-3 sm:px-4 md:px-6 text-red-500/90 tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] text-[10px] sm:text-xs font-semibold uppercase whitespace-nowrap overflow-hidden">
          <div className="absolute inset-0 blur-xl bg-red-500/20" />
          <span className="relative font-semibold" style={{ fontFamily: 'Metamorphous, serif' }}>ᛟᚾᛚᚣ • ᚦᛖ • ᚹᛟᚱᚦᚣ • ᛋᚺᚨᛚᛚ • ᚨᛞᚢᚨᚾᚲᛖ</span>
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
      className={`w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </motion.section>
  );
}

/* --- Enhanced Creator Section with Image Swap --- */
function CreatorSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  
  const [currentImage, setCurrentImage] = useState("/assets/creator-main.webp");
  const [nextImage, setNextImage] = useState(null);
  const [sideImage1, setSideImage1] = useState("/assets/creator-side-1.webp");
  const [sideImage2, setSideImage2] = useState("/assets/creator-side-2.webp");
  const [isScalingDown, setIsScalingDown] = useState(false);
  const [isScalingUp, setIsScalingUp] = useState(false);

  const handleImageSwap = (clickedImage, setClickedImage) => {
    if (isScalingDown || isScalingUp) return;
    
    const tempMain = currentImage;
    
    // Step 1: Scale down current image
    setIsScalingDown(true);
    
    // Step 2: After scale down completes, swap images and start scaling up
    setTimeout(() => {
      setCurrentImage(clickedImage);
      setClickedImage(tempMain);
      setIsScalingDown(false);
      setIsScalingUp(true);
      
      // Step 3: Complete scale up
      setTimeout(() => {
        setIsScalingUp(false);
      }, 500);
    }, 350);
  };

  return (
    <section ref={ref} className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
        {/* Left: Enhanced photo composition with swap functionality */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={slideLeft}
          className="relative w-full flex items-center justify-center lg:justify-end order-2 lg:order-1"
        >
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] mx-auto">
            {/* Main photo with enhanced styling - Sequential scale transition */}
            <div className="relative w-full aspect-[17/22] overflow-hidden rounded-2xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-black/40 z-10" />
              
              <img
                src={currentImage}
                alt="Creator main"
                className="w-full h-full object-cover"
                style={{ 
                  transform: isScalingDown ? 'scale(0.85)' : (isScalingUp ? 'scale(1)' : 'scale(1)'),
                  opacity: isScalingDown ? 0 : (isScalingUp ? 1 : 1),
                  transition: isScalingUp ? 'all 500ms cubic-bezier(0.34, 1.56, 0.64, 1)' : 'all 350ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
              
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl z-20" />
            </div>

            {/* Decorative accent behind */}
            <div className="absolute -inset-4 bg-gradient-to-br from-red-600/10 to-transparent rounded-3xl -z-10 blur-2xl" />

            {/* Side images - visible on all screens with click to swap */}
            <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-6 justify-center lg:mt-0">
              {/* Top right image - desktop only positioned */}
              <motion.img
                initial={{ opacity: 0, x: 20, rotate: -12 }}
                animate={inView ? { opacity: 1, x: 0, rotate: -6 } : {}}
                transition={{ delay: 0.3, duration: 0.7 }}
                src={sideImage1}
                alt="Creator side 1"
                onClick={() => handleImageSwap(sideImage1, setSideImage1)}
                className="w-[110px] sm:w-[120px] lg:w-[130px] h-[140px] sm:h-[150px] lg:h-[170px] object-cover rounded-xl border-2 border-red-800/50 shadow-2xl hover:scale-105 hover:border-red-600 hover:z-30 hover:rotate-0 transition-all duration-300 ease-out cursor-pointer relative z-20 lg:absolute lg:-right-8 xl:-right-12 lg:top-4"
              />
              {/* Bottom right image - desktop only positioned */}
              <motion.img
                initial={{ opacity: 0, x: 20, rotate: 12 }}
                animate={inView ? { opacity: 1, x: 0, rotate: 6 } : {}}
                transition={{ delay: 0.4, duration: 0.7 }}
                src={sideImage2}
                alt="Creator side 2"
                onClick={() => handleImageSwap(sideImage2, setSideImage2)}
                className="w-[110px] sm:w-[120px] lg:w-[130px] h-[140px] sm:h-[150px] lg:h-[170px] object-cover rounded-xl border-2 border-red-800/40 shadow-xl hover:scale-105 hover:border-red-600 hover:z-30 hover:rotate-0 transition-all duration-300 ease-out cursor-pointer relative z-20 lg:absolute lg:-right-8 xl:-right-12 lg:bottom-4"
              />
            </div>
          </div>
        </motion.div>

        {/* Right: Enhanced text content */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={slideRight}
          className="w-full text-left order-1 lg:order-2"
        >
          <div className="space-y-4 sm:space-y-6">
            <div>
              <p className="text-[#C40000] tracking-[0.15em] sm:tracking-[0.2em] font-bold text-xs uppercase mb-2 sm:mb-3">
                The One Who Forged This Path
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-[var(--font-morph)] font-bold mb-4 sm:mb-6 leading-[1.1] text-white">
                Built from chaos.<br />
                <span className="text-[#C40000]">Forged in discipline.</span>
              </h2>
            </div>

            <div className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed text-justify">
              <p>
                I didn't grow up with structure. Life was messy, loud and unforgiving. Fitness gave me an axis – a system that translated effort into identity.
              </p>

              <p className="text-gray-400 text-justify">
                Valhalla is the result: a deliberate path for those who want to turn struggle into strength. This is not a spotlight for vanity. It's a toolbox for the relentless.
              </p>

              <p className="text-white font-medium text-justify">
                If you carve the time, the results will carve you.
              </p>
            </div>

            <div className="pt-2 sm:pt-4">
              <button
                onClick={() => (location.href = "/programs")}
                className="group relative inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-red-900 hover:bg-red-700 transition-all duration-300 font-bold text-sm sm:text-base shadow-lg shadow-red-900/30 hover:shadow-xl hover:shadow-red-900/50 hover:-translate-y-0.5"
              >
                <span>See the Trials</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      {/* Background container */}
      <div className="fixed inset-0 top-[80px] z-0">
        <Image
          src="/assets/aboutbg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={70}
        />
      </div>


      {/* Darkening overlay */}
      <div className="fixed inset-0 z-0 bg-black/50" />

      {/* Enhanced gradient overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />

      {/* Subtle vignette */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-40" />

      <div className="relative z-10 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-20 sm:pb-24 md:pb-28 lg:pb-32">
        {/* Hero / Creed - Enhanced */}
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 sm:space-y-6"
          >
            <p className="text-[#C40000] tracking-[0.2em] sm:tracking-[0.3em] font-bold text-xs uppercase">
              The Creed
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[var(--font-morph)] font-bold leading-[1.15] max-w-4xl mx-auto">
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
            className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base md:text-lg mt-6 sm:mt-8"
          >
            In a world obsessed with shortcuts, Valhalla stands for the opposite: discipline, structure, and the quiet violence of consistent effort. This is a place for the untamed – those who choose to rebuild themselves through fire.
          </motion.p>
        </div>

        <RuneDivider />

        {/* WHAT VALHALLA IS - Enhanced */}
        <AnimatedSection variant={fadeUp} className="py-8 sm:py-10 lg:py-16">
          <div className="max-w-4xl">
            <p className="text-[#C40000] tracking-[0.15em] sm:tracking-[0.2em] font-bold text-xs uppercase mb-2 sm:mb-3">
              What Valhalla Is
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-[var(--font-morph)] font-bold mb-4 sm:mb-6 leading-tight">
              Strength is forged, not found.
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg text-justify">
              Projekt Valhalla is a collection of challenge-based training programs, each built to push you past complacency and into capability. No trends. No gimmicks. Just structured, brutally effective training and the discipline to see it through.
            </p>
          </div>
        </AnimatedSection>

        <RuneDivider />

        {/* WHO THIS IS FOR - Enhanced with better list styling */}
        <AnimatedSection variant={fadeUp} className="py-8 sm:py-10 lg:py-16">
          <div className="max-w-4xl">
            <p className="text-[#C40000] tracking-[0.15em] sm:tracking-[0.2em] font-bold text-xs uppercase mb-2 sm:mb-3">
              Who This Is For
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-[var(--font-morph)] font-bold mb-6 sm:mb-8 leading-tight">
              Not for everyone. <span className="text-[#C40000]">For the relentless.</span>
            </h2>

            <motion.div
              variants={containerStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="space-y-4 sm:space-y-5"
            >
              {[
                "You feel stuck and want a clear, brutal direction.",
                "You value discipline over motivation and want structure that delivers.",
                "You want to transform – not just perform for the mirror.",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-start gap-3 sm:gap-4 group"
                >
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-red-500 mt-2 sm:mt-2.5 group-hover:scale-150 transition-transform duration-300" />
                  <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        <RuneDivider />

        {/* Creator section */}
        <CreatorSection />

        <RuneDivider />

        {/* THE PATH AHEAD - Enhanced with two-line heading */}
        <AnimatedSection variant={fadeUp} className="py-8 sm:py-10 lg:py-16 text-center">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <p className="text-[#C40000] tracking-[0.15em] sm:tracking-[0.2em] font-bold text-xs uppercase">
              The Path Ahead
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-[var(--font-morph)] font-bold leading-tight">
              More trials.<br />
              <span className="text-[#C40000]">Same intent.</span>
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg">
              Valhalla will grow – more programs, more tools, and a community of grinders who value the work. The goal remains unchanged: create a path for the relentless. Choose a trial. Own it.<br /><br />
              New trials are already in development – each one designed to test a different aspect of your capability. Strength. Endurance. Mental resilience. Mobility. Every protocol will push you further than the last.<br /><br />
              You're not a customer here. You're a participant. Every trial you complete, every piece of feedback you share, every conversation in the Hall – it all contributes to what Valhalla becomes.
            </p>
          </div>
        </AnimatedSection>

        <div className="h-16 sm:h-20 md:h-24" />
      </div>
    </main>
  );
}