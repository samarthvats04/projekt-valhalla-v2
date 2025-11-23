"use client";

import React from "react";
import { useRouter } from "next/navigation";

function Hero() {
  const router = useRouter();
  
  const handleExploreClick = () => {
    router.push("/programs");
  };

  return (
    <section
      id="hero"
      className="scroll-mt-24 min-h-screen relative flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20"
      style={{
        backgroundImage: "url('/assets/herobgr.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlays */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0.5%, rgba(0,0,0,0.7) 100%)",
        }}
      ></div>

      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Top gradient overlay */}
      <div
        className="absolute top-0 left-0 w-full h-24 sm:h-32 pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)",
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center items-center w-full h-full max-w-5xl mx-auto">
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight tracking-wide">
          Forge Your Legend
        </h2>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mb-8 sm:mb-10 lg:mb-12 leading-relaxed px-2 sm:px-0">
          Defy the odds. Test thy spirit.
          <br />
          Unbridle thy potential.
          <br className="hidden sm:block" />
          <br className="hidden sm:block" />
          <span className="block mt-2 sm:mt-0">Are you worthy?</span>
        </p>

        <button
          onClick={handleExploreClick}
          className="bg-white text-black font-semibold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-full transition-all duration-300 hover:bg-gray-200 hover:scale-105 sm:hover:scale-110 hover:shadow-[0_0_16px_4px_rgba(255,0,0,0.5)] text-sm sm:text-base lg:text-lg min-h-[44px] touch-manipulation focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
        >
          Claim Your Path
        </button>
      </div>

      {/* Bottom gradient overlay */}
      <div
        className="absolute bottom-0 left-0 w-full h-12 sm:h-16 pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, transparent 100%)",
        }}
      ></div>
    </section>
  );
}

export default Hero;
