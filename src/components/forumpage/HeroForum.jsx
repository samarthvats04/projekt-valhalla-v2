"use client";

import { motion } from "framer-motion";

export default function HeroForum() {
  return (
    <section 
      className="relative w-full bg-black text-white py-20 md:py-40 lg:py-48 flex items-center justify-center"
      style={{
        backgroundImage: "url('/assets/forumhero.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.8) 100%)",
        }}
      ></div>

      {/* Top gradient overlay */}
      <div
        className="absolute top-0 left-0 w-full h-16 sm:h-32 pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)",
        }}
      ></div>

      {/* Spinning rune wheels in corners */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-left wheel */}
        <div className="absolute -top-30 -left-40 sm:-top-24 sm:-left-24 md:-top-1/3 md:-left-1/3 w-80 h-80 sm:w-48 sm:h-48 md:w-2/3 md:h-2/3 opacity-80 md:opacity-80">
          <img 
            src="/assets/rune-wheel.webp" 
            alt="" 
            className="w-full h-full object-contain"
            style={{
              animation: 'spin-slow-ccw 45s linear infinite'
            }}
          />
        </div>
        
        {/* Top-right wheel */}
        <div className="absolute -top-30 -right-40 sm:-top-24 sm:-right-24 md:-top-1/3 md:-right-1/3 w-80 h-80 sm:w-48 sm:h-48 md:w-2/3 md:h-2/3 opacity-80 md:opacity-80">
          <img 
            src="/assets/rune-wheel.webp" 
            alt="" 
            className="w-full h-full object-contain"
            style={{
              animation: 'spin-slow-cw 45s linear infinite'
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes spin-slow-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-slow-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>

      {/* Main Content */}
      <div className="text-center px-6 w-full mx-auto relative z-30">
        {/* Rune divider top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <p className="text-red-500/80 font-semibold tracking-[0.4em] text-xs sm:text-sm" style={{ fontFamily: 'Metamorphous, serif' }}>
            ᛟᚾᛚᚣ • ᚦᛖ • ᚹᛟᚱᚦᚣ • ᛋᚺᚨᛚᛚ • ᚨᛞᚢᚨᚾᚲᛖ
          </p>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6 uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
          style={{ fontFamily: "var(--font-morph)" }}
        >
          The Forum of Valhalla
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          className="mt-6 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 tracking-wide leading-relaxed max-w-2xl mx-auto drop-shadow-[0_0_4px_rgba(255,255,255,0.2)] px-4"
        >
          A gathering place for warriors—where ideas strike like steel.
          <br />
          <span className="text-sm sm:text-base text-gray-400 mt-3 block">
            Share your trials. Learn from the fallen. Rise with the worthy.
          </span>
        </motion.p>

        {/* Rune divider bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.9 }}
          className="mt-8"
        >
          <p className="text-red-500/80 font-semibold tracking-[0.4em] text-xs sm:text-sm"style={{ fontFamily: 'Metamorphous, serif' }}>
            ᛟᚾᛚᚣ • ᚦᛖ • ᚹᛟᚱᚦᚣ • ᛋᚺᚨᛚᛚ • ᚨᛞᚢᚨᚾᚲᛖ
          </p>
        </motion.div>

        {/* Decorative accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 1.1 }}
          className="mt-6 h-0.5 w-24 sm:w-32 mx-auto bg-gradient-to-r from-transparent via-red-600 to-transparent"
        />

        {/* Additional information sections - 2x2 grid on desktop, stack on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 1.3 }}
          className="mt-12 sm:mt-16 text-left w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-16 lg:gap-x-24 xl:gap-x-32 gap-y-8 md:gap-y-10">
            {/* Section 1 */}
            <div className="border-l-2 border-red-600/50 pl-6 sm:pl-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white tracking-wide">
                THIS IS NOT A CASUAL DISCUSSION BOARD
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed text-justify">
                The Forum of Valhalla exists for those deep in the trenches of transformation. 
                This is where warriors document their battles, share hard-won wisdom, and hold 
                each other accountable. No fluff. No excuses. Only raw progress and honest struggle.
              </p>
            </div>

            {/* Section 2 */}
            <div className="border-l-2 border-red-600/50 pl-6 sm:pl-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white tracking-wide">
                SHARE YOUR TRIALS, FORGE CONNECTIONS
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed text-justify">
                Post your progress reports. Ask questions about technique and form. Share your 
                nutrition strategies. Celebrate your victories and learn from your failures. 
                The Hall of Echoes remembers every warrior who dares to step forward and claim 
                their path to greatness.
              </p>
            </div>

            {/* Section 3 */}
            <div className="border-l-2 border-red-600/50 pl-6 sm:pl-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white tracking-wide">
                YOUR VOICE SHAPES THE FUTURE
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed text-justify">
                Every thread you create, every reply you post, every piece of feedback you share—
                it all matters. This community drives the evolution of Projekt Valhalla. Your 
                experiences in the trials inform what we build next. Real warriors. Real feedback. 
                Real impact.
              </p>
            </div>

            {/* Section 4 */}
            <div className="border-l-2 border-red-600/50 pl-6 sm:pl-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white tracking-wide">
                THE RULES ARE SIMPLE
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed text-justify">
                Be respectful. Be honest. Be committed. No spam, no toxicity, no shortcuts. 
                We're here to elevate each other through challenge and discipline. Leave your 
                ego at the door—bring only your dedication to becoming stronger, sharper, and 
                more capable with each passing day.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Final rune divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.8 }}
          className="mt-12 sm:mt-16"
        >
          <div className="h-0.5 w-full max-w-md mx-auto bg-gradient-to-r from-transparent via-red-600/30 to-transparent mb-6" />
          <p className="text-red-500/60 font-semibold tracking-[0.35em] text-xs" style={{ fontFamily: 'Metamorphous, serif' }}>
            ᛟᚾᛚᚣ • ᚦᛖ • ᚹᛟᚱᚦᚣ
          </p>
        </motion.div>
      </div>

      {/* Bottom gradient overlay */}
      <div
        className="absolute bottom-0 left-0 w-full h-16 sm:h-20 pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, transparent 100%)",
        }}
      ></div>
    </section>
  );
}