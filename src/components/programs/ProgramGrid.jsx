"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ProgramGrid = () => {
  const router = useRouter();
  
  const programs = [
    {
      id: 'ragnarok',
      title: 'Ragnarok',
      description: 'The ultimate battle for rebirth and strength',
      image: '/assets/ᚱᚨᚷᚾᚨᚱᛟᚲBlackKing.png',
      glowColor: 'rgba(56, 189, 248, 0.7)', // Blue glow for Ascension
      borderGlow: 'rgba(56, 189, 248, 1)', // Deeper red for border
      route: '/programs/ragnarok'
    },
    {
      id: 'berserkyr5',
      title: 'Berserkyr 5',
      description: 'Five moves of fury and power. Coming Soon!',
      image: '/assets/BᛖᚱᛊᛖᚱᚲᛁᚱBlackKing.png',
      glowColor: 'rgba(220, 38, 38, 0.7)', // Red glow for Ragnarok
      borderGlow: 'rgba(220, 38, 38, 1)', // Deeper green for border
      route: '/programs/berserkyr5'
    },
    {
      id: 'ascension',
      title: 'Ascension Protocol',
      description: 'Rise above, transform within. Coming Soon!',
      image: '/assets/ᚨᛊᚲᛖᚾᛊᛟᚾBlackKing.png',
      glowColor: 'rgba(34, 197, 94, 0.7)', // Green glow for Berserkyr
      borderGlow: 'rgba(34, 197, 94, 1)', // Deeper blue for border
      route: '/programs/ascension'
    }
  ];

  const [isMobile, setIsMobile] = useState(false);
  const [hoveredStates, setHoveredStates] = useState({});

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleProgramClick = (route) => {
    router.push(route);
  };

  // Create card variants with custom glow for each program
  const getCardVariants = (glowColor) => ({
    initial: { 
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    },
    hover: { 
      scale: 1.05, 
      boxShadow: `0 20px 25px -5px ${glowColor}, 0 10px 10px -5px ${glowColor}`,
      transition: { duration: 0.3, ease: "easeOut" } 
    }
  });

  const borderGlowVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1, transition: { duration: 0.3 } }
  };

  const overlayVariants = {
    initial: { backgroundColor: "rgba(0,0,0,0.2)" },
    hover: { backgroundColor: "rgba(0,0,0,0.7)", transition: { duration: 0.3 } }
  };

  const titleVariants = {
    initial: { y: -100, opacity: 0 },
    hover: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const descVariants = {
    initial: { y: 100, opacity: 0 },
    hover: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div id="programgrid" className="scroll-mt-20">
      <section
        id="program" 
        className="min-h-screen bg-black text-white py-20 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-center mb-4">
            Choose Your Path
          </h1>
          <p className="text-lg md:text-xl text-gray-400 text-center mb-8 md:mb-16">
            The path you choose defines your fate. Select a program to embark on your journey.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-18">
            {programs.map((program) => {
              const isHovered = hoveredStates[program.id] || false;
              const effectiveHovered = isMobile ? true : isHovered;
              
              return (
                <motion.div
                  key={program.id}
                  className="relative group cursor-pointer w-full max-w-80 md:w-auto mb-8 md:mb-0"
                  variants={getCardVariants(program.glowColor)}
                  initial="initial"
                  animate={effectiveHovered ? "hover" : "initial"}
                  onMouseEnter={() => !isMobile && setHoveredStates(prev => ({ ...prev, [program.id]: true }))}
                  onMouseLeave={() => !isMobile && setHoveredStates(prev => ({ ...prev, [program.id]: false }))}
                  onClick={() => handleProgramClick(program.route)}
                >
                  {/* Border glow - MOVED OUTSIDE the inner container */}
                  <motion.div
                    variants={borderGlowVariants}
                    initial="initial"
                    animate={effectiveHovered ? "hover" : "initial"}
                    className="absolute -bottom-1 left-0 w-full h-2 z-30"
                    style={{ 
                      background: `linear-gradient(90deg, transparent, ${program.borderGlow}, transparent)`,
                      filter: "blur(8px)",
                      boxShadow: `0 0 20px 5px ${program.glowColor}`
                    }}
                  />
                  
                  <div
                    className="relative w-80 h-80 max-w-full aspect-square mx-auto border-4 border-white overflow-hidden flex items-center justify-center bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${program.image})`
                    }}
                  >
                    {/* Darken overlay on hover */}
                    <motion.div
                      variants={overlayVariants}
                      initial="initial"
                      animate={effectiveHovered ? "hover" : "initial"}
                      className="absolute inset-0 z-10"
                    />
                    
                    {/* Title slides from top */}
                    <motion.div
                      variants={titleVariants}
                      initial="initial"
                      animate={effectiveHovered ? "hover" : "initial"}
                      className="absolute top-8 left-1/2 transform -translate-x-1/2 text-white text-2xl md:text-3xl text-center z-20"
                      style={{ fontFamily: 'Metamorphous, serif' }}
                    >
                      {program.title}
                    </motion.div>
                    
                    {/* Description slides from bottom */}
                    <motion.div
                      variants={descVariants}
                      initial="initial"
                      animate={effectiveHovered ? "hover" : "initial"}
                      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white px-4 md:px-6 py-2 text-base md:text-lg text-center rounded z-20"
                    >
                      {program.description}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramGrid;