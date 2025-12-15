"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const ProgramsHero = () => {
  const heroRef = useRef(null);
  const [stars, setStars] = useState([]);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Generate star positions only on client side
  useEffect(() => {
    setStars(
      Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 2,
      }))
    );
  }, []);

  const scrollToPrograms = () => {
    const programGrid = document.getElementById('programgrid');
    if (programGrid) {
      programGrid.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div ref={heroRef} className="relative h-screen w-full overflow-hidden bg-black">
        <motion.div
          style={{ y, scale }}
          className="absolute inset-0 z-0 flex items-start pt-24 md:items-center md:pt-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url('/assets/programhero.webp')`,
              filter: 'brightness(0.3)',
              backgroundPosition: 'center 40%'
            }}
          />
          <motion.div
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-radial from-red-500/10 via-transparent to-transparent"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-10" />

        <motion.div
          style={{ opacity }}
          className="relative z-20 h-full flex flex-col items-center justify-start pt-24 md:justify-center md:pt-0 px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6"
          >
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className="h-0.5 w-12 sm:w-20 md:w-24 bg-gradient-to-r from-transparent via-red-600 to-red-600"
              />
              <p className="text-red-500/80 tracking-[0.4em] text-xs sm:text-sm" style={{ fontFamily: 'Metamorphous, serif' }}>
                ᛟᚾᛚᚣ • ᚦᛖ • ᚹᛟᚱᚦᚣ • ᛋᚺᚨᛚᛚ • ᚨᛊᚲᚨᚾᛞ
              </p>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className="h-0.5 w-12 sm:w-20 md:w-24 bg-gradient-to-l from-transparent via-red-600 to-red-600"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-6"
          >
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-wider uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
              style={{ fontFamily: 'Metamorphous, serif' }}
            >
              Your Saga Begins
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mb-6 leading-relaxed px-4"
          >
            These aren&apos;t just workout programs—they&apos;re complete transformation systems. Each path is a carefully designed trial, 
            forged to push your limits and rebuild you from the ground up. <br /> <br />
            <span className="block mt-2 text-red-500 font-bold text-sm md:text-base">Choose your path. Commit to the journey. Become worthy. <br /><br /></span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
                className="h-0.5 w-12 sm:w-20 md:w-24 bg-gradient-to-r from-transparent via-red-600 to-red-600"
              />
              <p className="text-red-500/80 tracking-[0.4em] text-xs sm:text-sm" style={{ fontFamily: 'Metamorphous, serif' }}>
                ᛟᚾᛚᚣ • ᚦᛖ • ᚹᛟᚱᚦᚣ • ᛋᚺᚨᛚᛚ • ᚨᛊᚲᚨᚾᛞ
              </p>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
                className="h-0.5 w-12 sm:w-20 md:w-24 bg-gradient-to-l from-transparent via-red-600 to-red-600"
              />
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            onClick={scrollToPrograms}
            className="group relative px-8 py-3 md:px-10 md:py-4 bg-transparent border-2 border-white text-gray-400 font-semibold tracking-wider overflow-hidden transition-all duration-300 hover:border-red-500"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              BEGIN YOUR TRIAL
            </span>
            <motion.div
              className="absolute inset-0 bg-red-500"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 1 }}
            className="mt-6 h-0.5 w-24 sm:w-32 mx-auto bg-gradient-to-r from-transparent via-red-600 to-transparent"
          />
        </motion.div>

        <div className="absolute inset-0 pointer-events-none z-10">
          {stars.map((star, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
              }}
              animate={{
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
              }}
            />
          ))}
        </div>
      </div>

      {/* Info Sections */}
      <section className="relative w-full bg-black text-white py-12 md:py-24">
        <div className="relative z-10 text-center px-6 w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-16 lg:gap-x-24 xl:gap-x-32 gap-y-8 md:gap-y-10 max-w-7xl mx-auto">
              {/* Section 1 */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
                className="border-l-2 border-red-600/50 pl-6 sm:pl-8 text-left"
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white tracking-wide">
                  BUILT ON DISCIPLINE, NOT TRENDS
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed text-justify">
                  Every program in Projekt Valhalla is rooted in proven strength principles and designed for 
                  real results. No gimmicks. No shortcuts. Just carefully structured training that demands 
                  your full commitment and rewards it with genuine transformation.
                </p>
              </motion.div>

              {/* Section 2 */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                className="border-l-2 border-red-600/50 pl-6 sm:pl-8 text-left"
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white tracking-wide">
                  MORE THAN JUST WORKOUTS
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed text-justify">
                  Each path combines physical training with mental fortitude protocols. You'll build raw 
                  strength while developing the iron mindset needed to push through barriers. This is total 
                  transformation—body, mind, and spirit forged together in the crucible of challenge.
                </p>
              </motion.div>

              {/* Section 3 */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
                className="border-l-2 border-red-600/50 pl-6 sm:pl-8 text-left"
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white tracking-wide">
                  CHOOSE YOUR CHALLENGE LEVEL
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed text-justify">
                  Whether you're ready for the complete overhaul of Ragnarok, the focused intensity of 
                  Berserkyr 5, or the systematic progression of Ascension Protocol, there's a path waiting 
                  for you. Each program scales to your current level while pushing you beyond it.
                </p>
              </motion.div>

              {/* Section 4 */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewport={{ once: true }}
                className="border-l-2 border-red-600/50 pl-6 sm:pl-8 text-left"
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white tracking-wide">
                  THE TRIAL BEGINS NOW
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed text-justify">
                  Selecting a program is just the first step. What follows is weeks of structured chaos, 
                  purposeful suffering, and deliberate growth. You'll be tested. You'll want to quit. But 
                  if you stay the course, you'll emerge transformed. The only question is: are you ready?
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Final rune divider */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 sm:mt-16"
          >
            <div className="h-0.5 w-full max-w-md mx-auto bg-gradient-to-r from-transparent via-red-600/30 to-transparent mb-6" />
            <p className="text-red-500/60 font-[Metamorphous,serif] tracking-[0.35em] text-xs">
              ᛟᚾᛚᚣ • ᚦᛖ • ᚹᛟᚱᚦᚣ
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ProgramsHero;