"use client";

import { motion } from "framer-motion";

export default function HomeBlock2() {
  return (
    <section className="w-full py-24 px-20 text-right text-white bg-black relative">
      {/* SPINNING RUNE WHEEL ON LEFT */}
      <div className="absolute -left-[450px] top-1/2 -translate-y-1/2 pointer-events-none">
        <img
          src="/assets/rune-wheel.png"
          alt="rune wheel"
          className="w-[900px] opacity-60"
          style={{
            animation: 'spin-slow-reverse 20s linear infinite'
          }}
        />
      </div>
      {/* RIGHT GLOW BORDER */}
      <div className="absolute right-0 top-0 h-full w-1 bg-red-500/60 blur-[1px]"></div>

      {/* RUNE DIVIDER + HEADING — SLIDE IN FROM RIGHT */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="mb-8">
          <p className="text-red-500/80 font-[var(--font-morph)] tracking-[0.4em] text-sm">
            ᛟᚾᛚᚣ • ᚦᛖ • ᚹᛟᚱᚦᚣ • ᛋᚺᚨᛚᛚ • ᚨᛞᚢᚨᚾᚲᛖ
          </p>
        </div>

        <h2
          className="text-3xl sm:text-4xl lg:text-5xl 
          font-[var(--font-morph)] font-bold leading-normal mb-6
          tracking-wide drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]"
        >
          THE TRIALS ARE NOT PROGRAMS.<br />THEY ARE TESTS.
        </h2>
      </motion.div>

      {/* PARAGRAPH — FADE IN AFTER HEADING */}
      <motion.p
        className="text-gray-300 max-w-3xl text-base sm:text-lg leading-relaxed 
        drop-shadow-[0_0_4px_rgba(255,255,255,0.15)] ml-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          duration: 0.9,
          ease: "easeOut",
          delay: 1.1,   // same cinematic delay as block1
        }}
        viewport={{ once: true, margin: "-80px" }}
      >
        Each protocol is crafted as a trial — designed to pressure your body,
        temper your mind, and drag out the version of you hidden beneath comfort
        and excuses.
        <br /><br />
        You don't complete routines. <span className="font-semibold">You survive trials.</span>
      </motion.p>
    </section>
  );
}
