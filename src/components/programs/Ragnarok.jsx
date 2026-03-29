"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FlameKindling, ChevronsUp, ChartColumnIncreasing, ListCollapse } from 'lucide-react';

export default function Ragnarok( {user} ) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [hoveredWeapon, setHoveredWeapon] = useState(null);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Payment handler
  const handlePayment = async () => {
    try {
      // Create order
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          program_id: 'ragnarok', 
          user_id: user?.id 
        })
      });
      
      if (!orderRes.ok) {
        throw new Error('Failed to create order');
      }
      
      const order = await orderRes.json();

      // Razorpay checkout options
      const options = {
        key: process.env.NEXT_PUBLIC_RZP_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "Projekt Valhalla",
        description: "Ragnarok Program",
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            const result = await verifyRes.json();
            
            if (result.success) {
              alert("Payment successful! Welcome to Ragnarok. Redirecting...");
              window.location.reload(); // Reload to show paid content
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Verification error:", error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          email: user?.email || '',
        },
        theme: {
          color: "#0891b2" // Cyan color matching your theme
        },
        modal: {
          ondismiss: function() {
            console.log("Payment cancelled by user");
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        console.error("Payment failed:", response.error);
        alert("Payment failed. Please try again.");
      });
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const features = [
    {
      title: "3 Distinct Phases",
      description: "The Mjolnir, The Gungnir, and The Skofnung - each testing different aspects of your strength",
      icon: FlameKindling
    },
    {
      title: "6 Week Challenge",
      description: "A complete transformation protocol designed to push you beyond your limits",
      icon: ChevronsUp
    },
    {
      title: "Progressive Overload",
      description: "Strategic progression from raw strength to hypertrophy to brutal conditioning",
      icon: ChartColumnIncreasing
    },
    {
      title: "Detailed Programming",
      description: "Every set, every rep, every rest period carefully calculated for maximum results",
      icon: ListCollapse
    }
  ];

  const weapons = [
    {
      title: "Mjolnir",
      description: "Forged in the heart of a dying star, Mjolnir represents <span class='font-bold text-cyan-200'>Absolute Power and Strength</span>. Heavy compounds tear you down to your foundation—only to rebuild you stronger. This is where legends begin. Low reps, maximum weight, uncompromising intensity."
    },
    {
      title: "Gungnir",
      description: "Odin's spear never misses its mark. Neither will you. Precision-oriented brutality carves definition into every fiber. <span class='font-bold text-cyan-200'>Maximum Muscle Activation and Hypertrophy</span> through tempered intensity and targeted destruction. This phase sculpts warriors—functional, powerful, unstoppable."
    },
    {
      title: "Skofnung",
      description: "The legendary sword that could only be drawn by those worthy. Blazing intensity tests the limits of your <span class='font-bold text-cyan-200'>Durability and Endurance</span>. High volume, relentless pace, absolute focus. From the ashes of exhaustion, you reemerge—forged anew, unbreakable, immortal."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/forumhero.webp"
            alt=""
            fill
            priority
            className="object-cover"
            quality={75}
          />
          <div className="absolute inset-0 bg-black/70" />
          <div 
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.9) 100%)"
            }}
          />
        </div>

        {/* Spinning Rune Wheels */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-1/3 -left-1/3 w-2/3 h-2/3 opacity-20">
            <div className="relative w-full h-full scale-[1.4] sm:scale-100">
              <Image 
                src="/assets/rune-wheel.webp" 
                alt="" 
                fill
                className="object-contain animate-spin-slow-ccw"
              />
            </div>
          </div>
          <div className="absolute -top-1/3 -right-1/3 w-2/3 h-2/3 opacity-20">
            <div className="relative w-full h-full scale-[1.4] sm:scale-100">
              <Image 
                src="/assets/rune-wheel.webp" 
                alt="" 
                fill
                className="object-contain animate-spin-slow-cw"
              />
            </div>
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
          .animate-spin-slow-cw {
            animation: spin-slow-cw 45s linear infinite;
          }
          .animate-spin-slow-ccw {
            animation: spin-slow-ccw 45s linear infinite;
          }
        `}</style>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-2 pb-8 sm:py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 sm:mb-6 md:mb-8"
          >
            <p className="text-cyan-400/80 font-bold tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs uppercase">
              ᛟᚾᛚᚣ • ᚦᛖ • ᚹᛟᚱᚦᚣ • ᛋᚢᚱᚡᛁᚡᛖ • ᚨᛚᛚᛒᚨᛚᛚᛟᚹ
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-16 sm:mb-6 md:mb-8 tracking-tight uppercase"
            style={{ fontFamily: "var(--font-morph)" }}
          >
            Ragnarok
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-base sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-16 sm:mb-8 md:mb-10 leading-relaxed px-2"
          >
            <span className='block'>
              The ultimate 6-week challenge designed to{" "}
            </span>
            
            <span className="block text-cyan-200 font-bold">maximise your functional physical potential</span>
          </motion.p>

          {/* Lore Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="text-left max-w-3xl mx-auto mb-16 sm:mb-8 md:mb-10 px-2 sm:px-4"
          >
            <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6 py-2">
              <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">
                In Norse mythology, <span className="text-cyan-200 font-semibold">Ragnarok</span> marks the twilight of the gods—a cataclysmic battle where the old world burns and a new one rises from the ashes.
              </p>
              <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">
                This program embodies that same destructive rebirth. You will be broken down, stripped of weakness, and <span className="text-cyan-200 font-semibold">reforged into something stronger</span>. This is your Ragnarok.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="h-0.5 w-24 sm:w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent mb-4 sm:mb-6" />
            <p className="text-cyan-400/80 font-bold tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs uppercase">
              ᛟᚾᛚᚣ • ᚦᛖ • ᚹᛟᚱᚦᚣ
            </p>
          </motion.div>
        </div>
      </section>

      {/* What Ragnarok Specialises In */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden">
        {/* Spinning wheel background */}
        <div className="absolute -right-[300px] sm:-right-[350px] md:-right-[450px] top-1/2 -translate-y-1/2 pointer-events-none">
          <div className="relative w-[600px] sm:w-[700px] md:w-[900px] h-[600px] sm:h-[700px] md:h-[900px] opacity-30">
            <Image
              src="/assets/rune-wheel.webp"
              alt=""
              fill
              className="object-contain animate-spin-slow-cw"
            />
          </div>
        </div>

        <div className="absolute left-0 top-0 h-full w-1 bg-cyan-300/90 blur-[1px]"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-8 sm:mb-12"
          >
            <p className="text-cyan-400 tracking-[0.15em] sm:tracking-[0.2em] font-bold text-xs uppercase mb-2 sm:mb-3">
              What This Trial Forges
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight" style={{ fontFamily: "var(--font-morph)" }}>
              NOT A ROUTINE.<br />
              <span className="text-cyan-200">A TRANSFORMATION.</span>
            </h2>
            <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl">
              Ragnarok is a 6-week battle against mediocrity. Three distinct phases—each named after legendary Norse weapons—will strip away weakness and rebuild you from the ground up. This isn't about looking good. It's about becoming unstoppable.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16"
          >
            {features.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  onMouseEnter={() => setHoveredFeature(idx)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className="p-4 sm:p-6 rounded-lg bg-gradient-to-br from-cyan-900/20 to-transparent border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`transition-transform duration-300 ${hoveredFeature === idx ? 'scale-110' : ''}`}>
                      <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-200" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">{feature.title}</h3>
                      <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* The Three Phases - Square Cards with Cross-Fade and Scale */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute -left-[300px] sm:-left-[350px] md:-left-[450px] top-1/2 -translate-y-1/2 pointer-events-none">
          <div className="relative w-[600px] sm:w-[700px] md:w-[900px] h-[600px] sm:h-[700px] md:h-[900px] opacity-30">
            <Image
              src="/assets/rune-wheel.webp"
              alt=""
              fill
              className="object-contain animate-spin-slow-ccw"
            />
          </div>
        </div>

        <div className="absolute right-0 top-0 h-full w-1 bg-cyan-300/90 blur-[1px]"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-right mb-8 sm:mb-12"
          >
            <p className="text-cyan-400 tracking-[0.15em] sm:tracking-[0.2em] font-bold text-xs uppercase mb-2 sm:mb-3">
              The Three Weapons
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight" style={{ fontFamily: "var(--font-morph)" }}>
              YOUR PATH TO<br />
              <span className="text-cyan-200">ASCENSION</span>
            </h2>
          </motion.div>
          
          {/* Hint Text - MOVED TO TOP */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center text-gray-500 text-sm mb-8"
          >
            <span className="hidden sm:inline">Hover over</span>
            <span className="sm:hidden">Tap</span>
            {" "}each weapon to reveal its power
          </motion.p>

          {/* Three Square Cards with Cross-Fade and Scale */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col md:flex-row justify-center items-stretch gap-8 md:gap-12 mb-8"
          >
            {weapons.map((weapon, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                onMouseEnter={() => setHoveredWeapon(idx)}
                onMouseLeave={() => setHoveredWeapon(null)}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="flex-1 w-[85%] max-w-xs sm:max-w-sm md:max-w-none mx-auto"
              >
                <div className="relative w-full aspect-square border-8 border-white cursor-pointer overflow-hidden bg-black flex items-center justify-center transition-transform duration-300">
                  {/* Title - Fades out on hover */}
                  <motion.div
                    animate={{
                      opacity: hoveredWeapon === idx ? 0 : 1
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <h3 className="text-5xl sm:text-5xl md:text-6xl font-bold text-white text-center px-4" style={{ fontFamily: "var(--font-morph)" }}>
                      {weapon.title}
                    </h3>
                  </motion.div>

                  {/* Description - Fades in on hover */}
                  <motion.div
                    animate={{
                      opacity: hoveredWeapon === idx ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <p className="text-sm sm:text-base text-gray-300 text-center px-6 py-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: weapon.description }} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Unlock CTA */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/ragnarok-hero.webp"
            alt=""
            fill
            className="object-cover"
            quality={75}
          />
          <div className="absolute inset-0 bg-black/80" />
          <div 
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.9) 100%)"
            }}
          />
        </div>

        {/* Spinning Rune Wheels */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -bottom-1/3 -left-1/3 w-2/3 h-2/3 opacity-20">
            <div className="relative w-full h-full scale-[1.4] sm:scale-100">
              <Image 
                src="/assets/rune-wheel.webp" 
                alt="" 
                fill
                className="object-contain animate-spin-slow-ccw"
              />
            </div>
          </div>
          <div className="absolute -bottom-1/3 -right-1/3 w-2/3 h-2/3 opacity-20">
            <div className="relative w-full h-full scale-[1.4] sm:scale-100">
              <Image 
                src="/assets/rune-wheel.webp" 
                alt="" 
                fill
                className="object-contain animate-spin-slow-cw"
              />
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="mb-6 sm:mb-8">
              <p className="text-cyan-400/80 font-bold tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs uppercase mb-4 sm:mb-6">
                ᛟᚾᛚᚣ • ᚦᛖ • ᚹᛟᚱᚦᚣ • ᛋᚢᚱᚡᛁᚡᛖ • ᚨᛚᛚᛒᚨᛚᛚᛟᚹ
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2" style={{ fontFamily: "var(--font-morph)" }}>
                READY TO FACE YOUR<br />
                <span className="text-cyan-200">RAGNAROK?</span>
              </h2>
              <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed px-2">
                One-time payment. Lifetime access. No subscriptions.<br className="hidden sm:block" />
                The trials await those bold enough to face them.
              </p>
            </div>

            <button 
              onClick={handlePayment}
              className="group relative inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-xl bg-cyan-700 hover:bg-cyan-500 transition-all duration-300 font-bold text-base sm:text-lg shadow-2xl shadow-cyan-900/50 hover:shadow-cyan-900/80 hover:-translate-y-1 mb-4 sm:mb-6"
            >
              <span>Unlock Ragnarok - ₹999</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-gray-400 px-2">
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Complete 6-week protocol</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-500">✓</span>
                <span>All three phases unlocked</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Lifetime updates</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom gradient */}
      <div className="h-8 sm:h-12 md:h-16 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}