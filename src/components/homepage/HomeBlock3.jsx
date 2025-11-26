"use client";

import { motion } from "framer-motion";

export default function HomeBlock3() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 px-6 sm:px-8 md:px-12 lg:px-16 text-left text-white bg-black relative overflow-hidden">
      {/* SPINNING RUNE WHEEL ON RIGHT */}
      <div className="absolute -right-[300px] sm:-right-[350px] md:-right-[450px] top-1/2 -translate-y-1/2 pointer-events-none">
        <img
          src="/assets/rune-wheel.webp"
          alt="rune wheel"
          className="w-[600px] sm:w-[700px] md:w-[900px] opacity-40 sm:opacity-50 md:opacity-60"
          style={{
            animation: 'spin-slow 20s linear infinite'
          }}
        />
      </div>
      {/* LEFT GLOW BORDER */}
      <div className="absolute left-0 top-0 h-full w-1 bg-red-600/60 blur-[1px]"></div>

      {/* RUNE + HEADING – SLIDE IN FIRST */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
        className="relative z-10"
      >
        <div className="mb-4 sm:mb-6 md:mb-8 overflow-hidden">
          <p className="text-red-500/80 font-[var(--font-morph)] tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-[10px] sm:text-xs md:text-sm whitespace-nowrap">
            ᛟᚾᛚᚣ • ᚦᛖ • ᚹᛟᚱᚦᚣ • ᛋᚺᚨᛚᛚ • ᚨᛞᚢᚨᚾᚲᛖ
          </p>
        </div>

        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
          font-[var(--font-morph)] font-bold leading-tight sm:leading-normal mb-4 sm:mb-5 md:mb-6
          tracking-wide drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]"
        >
          THIS IS FOR YOU IF YOU:
        </h2>
      </motion.div>

      {/* PARAGRAPH – FADE AFTER HEADING */}
      <motion.div
        className="text-gray-300 max-w-xl space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg leading-relaxed
        drop-shadow-[0_0_4px_rgba(255,255,255,0.15)] relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          duration: 0.9,
          ease: "easeOut",
          delay: 1.1,
        }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <p>• crave challenge</p>
        <p>• thrive under pressure</p>
        <p>• want to feel alive again</p>
        <p>• seek discipline over comfort</p>
        <p>• desire transformation through effort</p>
      </motion.div>
    </section>
  );
}