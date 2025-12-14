"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const Gate = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // Form states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // 🚨 AUTO-REDIRECT IF USER IS ALREADY LOGGED IN
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.replace("/home");
      }
    };
    checkUser();
  }, [router]);

  const closeModals = () => {
    setShowLogin(false);
    setShowSignup(false);
    setShowForgotPassword(false);
    setError("");
    setEmail("");
    setPassword("");
    setUsername("");
    setConfirmPassword("");
    setResetEmail("");
    document.body.style.overflow = "unset";
  };

  const openModal = (type) => {
    document.body.style.overflow = "hidden";
    setError("");
    setShowLogin(false);
    setShowSignup(false);
    setShowForgotPassword(false);
    
    if (type === "login") setShowLogin(true);
    if (type === "signup") setShowSignup(true);
    if (type === "forgot") setShowForgotPassword(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Check if input is email or username
    const isEmail = email.includes('@');
    
    let loginEmail = email;
    
    // If it's a username, fetch the email from profiles table
    if (!isEmail) {
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('email')
        .eq('username', email)
        .single();

      if (fetchError || !profile) {
        setError("Username not found");
        setLoading(false);
        return;
      }

      loginEmail = profile.email;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/home");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: username,
        },
      },
    });

    if (error) {
      let errorMessage = error.message;
      if (errorMessage.includes('should contain at least one character of each')) {
        errorMessage = "Your password must include at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&* etc.).";
      }
      setError(errorMessage);
      setLoading(false);
    } else {
      setError("Success! Check your email to confirm your account.");
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setError("Success! Check your email for the password reset link.");
      setLoading(false);
    }
  };

  return (
    <>
      {/* GATE SCREEN */}
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 z-50 bg-black text-white"
        style={{
          backgroundImage: "url('/assets/gate-bg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]"></div>

        <div className="relative z-10 h-full overflow-y-auto">
          <AnimatePresence mode="wait">
            {!showInfo ? (
              <motion.div
                key="main-content"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="min-h-full flex flex-col justify-center items-center px-4 py-12"
              >
                <div className="text-center max-w-2xl mx-auto w-full">
                  <motion.img
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1.2, rotate: 0 }}
                    transition={{ duration: 1.2 }}
                    src="/assets/valhalla-logo.webp"
                    alt="Logo"
                    className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 animate-pulse"
                  />

                  <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-wider mb-4 px-4 py-4 leading-snug"
                  >
                    PROJEKT<br />VALHALLA
                  </motion.h1>

                  <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-lg text-gray-300 mb-10"
                  >
                    FOR THE UNTAMED, ONLY THE WORTHY REMAIN.
                  </motion.p>

                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="flex gap-4 justify-center w-full"
                  >
                    <button
                      onClick={() => openModal("login")}
                      className="bg-white text-black font-bold px-8 py-3 rounded-lg hover:bg-gray-200 active:scale-90 transition-all duration-300"
                    >
                      Login
                    </button>

                    <button
                      onClick={() => openModal("signup")}
                      className="bg-white text-black font-bold px-8 py-3 rounded-lg hover:bg-gray-200 active:scale-90 transition-all duration-300"
                    >
                      Sign Up
                    </button>
                  </motion.div>
                </div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  onClick={() => setShowInfo(true)}
                  className="absolute bottom-8 text-gray-400 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 text-sm tracking-wider"
                >
                  NEW HERE? TAP TO LEARN MORE ↓
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="info-content"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
                className="min-h-full flex flex-col justify-start items-center px-4 py-16"
              >
                <div className="max-w-3xl w-full space-y-8">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="border-l-2 border-gray-500 pl-6 py-4"
                  >
                    <h3 className="text-2xl font-bold mb-3 text-white">What Projekt Valhalla Actually Is</h3>
                    <p className="text-gray-300 leading-relaxed mb-3 text-justify">
                      Projekt Valhalla is a structured training platform designed for people who want clarity, progression, and control over their fitness journey.
                    </p>
                    <p className="text-gray-300 leading-relaxed mb-3 text-justify">
                      Instead of endless workout variations or daily randomness, Valhalla focuses on well-defined programs built around clear goals. Each program follows a system — phases, progression logic, and intent — so you're never guessing what to do next.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-justify">
                      This platform isn't about chasing novelty. It's about building capability over time, with structure doing the heavy lifting.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="border-l-2 border-gray-500 pl-6 py-4"
                  >
                    <h3 className="text-2xl font-bold mb-3 text-white">How Training Is Structured</h3>
                    <p className="text-gray-300 leading-relaxed mb-3 text-justify">
                      Every trial inside Valhalla is divided into distinct training phases, each serving a specific purpose — such as strength development, muscle growth, or endurance capacity.
                    </p>
                    <p className="text-gray-300 leading-relaxed mb-3 text-justify">
                      You don't train everything at once. You train with focus, complete a phase, and then move forward.
                    </p>
                    <p className="text-gray-300 leading-relaxed mb-2 text-justify">
                      Each phase clearly outlines:
                    </p>
                    <ul className="text-gray-300 leading-relaxed mb-3 space-y-1 ml-4 text-justify">
                      <li>• the type of training you'll perform</li>
                      <li>• the intensity you're expected to work at</li>
                      <li>• how progression is meant to happen</li>
                      <li>• when restraint matters as much as effort</li>
                    </ul>
                    <p className="text-gray-300 leading-relaxed text-justify">
                      This approach removes confusion and replaces it with direction. You train knowing exactly why the work exists.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="border-l-2 border-gray-500 pl-6 py-4"
                  >
                    <h3 className="text-2xl font-bold mb-3 text-white">Who This Platform Is Built For</h3>
                    <p className="text-gray-300 leading-relaxed mb-3 text-justify">
                      Valhalla is built for people who want discipline over motivation and structure over chaos.
                    </p>
                    <p className="text-gray-300 leading-relaxed mb-2">
                      If you're tired of:
                    </p>
                    <ul className="text-gray-300 leading-relaxed mb-3 space-y-1 ml-4 text-justify">
                      <li>• saving workouts without following them</li>
                      <li>• jumping between programs every few weeks</li>
                      <li>• feeling busy in the gym but unsure if you're progressing</li>
                      <li>• monotonous and cliched workout routines</li>
                    </ul>
                    <p className="text-gray-300 leading-relaxed mb-3 text-justify">
                      this platform is meant for you.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-justify">
                      It rewards consistency, patience, and effort — not shortcuts or hype. The expectation is simple: show up, follow the structure, and earn progress.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="border-l-2 border-gray-500 pl-6 py-4"
                  >
                    <h3 className="text-2xl font-bold mb-3 text-white">Community, Without the Noise</h3>
                    <p className="text-gray-300 leading-relaxed mb-3 text-justify">
                      Training is individual, but learning doesn't have to be isolated.
                    </p>
                    <p className="text-gray-300 leading-relaxed mb-2 text-justify">
                      Valhalla includes a dedicated forum where users discuss:
                    </p>
                    <ul className="text-gray-300 leading-relaxed mb-3 space-y-1 ml-4 text-justify">
                      <li>• program execution</li>
                      <li>• adjustments and plateaus</li>
                      <li>• recovery, fatigue, and setbacks</li>
                      <li>• lessons learned during each phase</li>
                    </ul>
                    <p className="text-gray-300 leading-relaxed mb-3 text-justify">
                      There are no algorithms pushing trends, no influencer theatrics, and no empty motivation posts. Just focused discussion around training and improvement.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-justify">
                      The goal is simple: learn faster by learning together.
                    </p>
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    onClick={() => setShowInfo(false)}
                    className="mx-auto block bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-gray-200 hover:scale-115 active:scale-90 transition-all duration-300 mt-12"
                  >
                    Enter the Realm
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* MODALS */}
      <AnimatePresence>
        {(showLogin || showSignup || showForgotPassword) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
            onClick={closeModals}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#18181b] w-full max-w-md rounded-xl p-6 shadow-xl border border-gray-700"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-white text-2xl font-bold">
                  {showLogin && "Login"}
                  {showSignup && "Create Account"}
                  {showForgotPassword && "Reset Password"}
                </h2>
                <button
                  onClick={closeModals}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              {error && (
                <div
                  className={`mb-4 p-3 rounded-lg ${
                    error.includes("Success")
                      ? "bg-green-900/30 border border-green-700 text-green-300"
                      : "bg-red-900/30 border border-red-700 text-red-300"
                  }`}
                >
                  {error}
                </div>
              )}

              {/* LOGIN FORM */}
              {showLogin && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Username or Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                  />

                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => openModal("forgot")}
                      className="text-sm text-gray-400 hover:text-white transition"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 active:scale-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Loading..." : "Login"}
                  </button>
                </form>
              )}

              {/* SIGNUP FORM */}
              {showSignup && (
                <form onSubmit={handleSignup} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                  />

                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 active:scale-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Loading..." : "Sign Up"}
                  </button>
                </form>
              )}

              {/* FORGOT PASSWORD FORM */}
              {showForgotPassword && (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <p className="text-gray-400 text-sm mb-4">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>

                  <input
                    type="email"
                    placeholder="Email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => openModal("login")}
                      className="text-sm text-gray-400 hover:text-white transition"
                    >
                      Back to Login
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gate;