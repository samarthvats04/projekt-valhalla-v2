"use client";

import { motion } from 'framer-motion';

export default function RagnarokPaid({ user }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-black to-black" />
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, cyan 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto py-20">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            {/* Runes decoration */}
            <p className="text-cyan-400/80 font-bold tracking-[0.3em] text-xs uppercase mb-6">
              ᛟᚾᛚᚣ ᚦᛖ ᚹᛟᚱᚦᚣ
            </p>

            {/* Welcome message */}
            <h1 
              className="text-6xl sm:text-7xl md:text-8xl font-extrabold mb-8 tracking-tight uppercase"
              style={{ fontFamily: "var(--font-morph)" }}
            >
              Welcome,<br />
              <span className="text-cyan-200">Warrior</span>
            </h1>

            {/* User greeting */}
            <p className="text-xl sm:text-2xl text-gray-300 mb-12 leading-relaxed">
              {user?.email && (
                <span className="block text-cyan-400 font-semibold mb-4">
                  {user.email}
                </span>
              )}
              You have unlocked the path to Valhalla.<br />
              Your transformation begins now.
            </p>

            {/* Coming soon notice */}
            <div className="border-2 border-cyan-500/50 rounded-xl p-8 sm:p-12 bg-cyan-950/10 backdrop-blur-sm max-w-2xl mx-auto">
              <div className="text-6xl mb-6">⚔️</div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-morph)" }}>
                THE TRIALS AWAIT
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                The complete Ragnarok program interface is being forged.<br />
                Your 6-week journey through the three phases will be available here soon.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-cyan-300">
                <div className="flex items-center gap-2">
                  <span>⚡</span>
                  <span>The Mjolnir</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🗡️</span>
                  <span>The Gungnir</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⚔️</span>
                  <span>The Skofnung</span>
                </div>
              </div>
            </div>

            {/* Runes decoration bottom */}
            <p className="text-cyan-400/80 font-bold tracking-[0.3em] text-xs uppercase mt-12">
              ᛈᚱᛖᛈᚨᚱᛖ ᚠᛟᚱ ᚹᚨᚱ
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* Additional placeholder sections */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6">
            {['Week 1-2', 'Week 3-4', 'Week 5-6'].map((week, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="p-6 rounded-lg border border-cyan-500/30 bg-cyan-950/10 text-center"
              >
                <div className="text-4xl mb-4">
                  {idx === 0 ? '🔨' : idx === 1 ? '🗡️' : '⚔️'}
                </div>
                <h3 className="text-xl font-bold mb-2 text-cyan-200">{week}</h3>
                <p className="text-gray-400 text-sm">Coming Soon</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}