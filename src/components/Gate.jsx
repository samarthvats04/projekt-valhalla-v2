"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const Gate = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

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
      setError(error.message);
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
        className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-black text-white px-4"
        style={{
          backgroundImage: "url('/assets/gate-bg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]"></div>

        <div className="relative z-10 text-center max-w-2xl mx-auto w-full">
          <motion.img
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1.2, rotate: 0 }}
            transition={{ duration: 1.2 }}
            src="/assets/valhalla-logo.png"
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
              className="bg-white text-black font-bold px-8 py-3 rounded-lg hover:bg-gray-200 transition"
            >
              Login
            </button>

            <button
              onClick={() => openModal("signup")}
              className="bg-white text-black font-bold px-8 py-3 rounded-lg hover:bg-gray-200 transition"
            >
              Sign Up
            </button>
          </motion.div>
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
                    className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
                    className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
                    className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
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