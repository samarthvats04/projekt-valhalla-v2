"use client";

export default function HomeBlock4() {
  return (
    <section 
      className="w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 text-center text-white bg-black relative"
      style={{
        backgroundImage: "url('/assets/home4.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Vignette/Radial Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0.1%, rgba(0,0,0,0.7) 100%)",
        }}
      ></div>

      {/* Top gradient overlay */}
      <div
        className="absolute top-0 left-0 w-full h-16 sm:h-24 md:h-32 pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)",
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Content Container with higher z-index */}
      <div className="relative z-20">
        {/* TOP RUNE DIVIDER */}
        <div className="flex justify-center mb-6 sm:mb-8 md:mb-10 overflow-hidden">
          <p className="text-red-500/80 font-[var(--font-morph)] tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.35em] text-[10px] sm:text-xs md:text-sm whitespace-nowrap">
            ᛟᚾᛚᚣ • ᚦᛖ • ᚹᛟᚱᚦᚣ • ᛋᚺᚨᛚᛚ • ᚨᛞᚢᚨᚾᚲᛖ
          </p>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[var(--font-morph)] font-bold mb-4 sm:mb-5 md:mb-6 leading-tight sm:leading-normal">
          ASCENSION IS THE REWARD.
        </h2>

        <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed space-y-2 sm:space-y-3">
          Strength you never knew you had.  
          Willpower you didn't believe was possible.
          <br /><br />
          Valhalla does not give results – it forces you to become the person who
          creates them, rep by rep, day after day.
        </p>

        {/* BOTTOM RUNE DIVIDER */}
        <div className="flex justify-center mt-6 sm:mt-8 md:mt-10 overflow-hidden">
          <p className="text-red-500/80 font-[var(--font-morph)] tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.35em] text-[10px] sm:text-xs md:text-sm whitespace-nowrap">
            ᛟᚾᛚᚣ • ᚦᛖ • ᚹᛟᚱᚦᚣ • ᛋᚺᚨᛚᛚ • ᚨᛞᚢᚨᚾᚲᛖ
          </p>
        </div>  
      </div>

      {/* Bottom gradient overlay */}
      <div
        className="absolute bottom-0 left-0 w-full h-8 sm:h-12 md:h-16 pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, transparent 100%)",
        }}
      ></div>
    </section>
  );
}