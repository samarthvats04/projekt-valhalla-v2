"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check current user
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const goTo = (path) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const goHome = () => {
    router.push("/home");
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 left-0 w-full bg-[#000] bg-opacity-90 backdrop-blur-md z-[999] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">

        {/* Mobile Layout */}
        <div className="flex justify-between items-center md:hidden">
          <div className="flex items-center space-x-2">
            <img
              src="/assets/valhalla-logo.png"
              alt="Projekt Valhalla Logo"
              onClick={goHome}
              className="w-15 h-15 object-contain rounded-full transition-transform duration-300 ease-in-out hover:scale-150 hover:shadow-[0_0_15px_3px_rgba(255,0,0,0.4)] animate-spin cursor-pointer"
              style={{ animationDuration: "8s" }}
            />
            <h1
              className="text-white text-lg sm:text-xl font-bold tracking-wider cursor-pointer hover:text-gray-300 transition-colors duration-300"
              onClick={goHome}
            >
              PROJEKT VALHALLA
            </h1>
          </div>

          <button
            onClick={toggleMobileMenu}
            className="relative w-8 h-8 flex flex-col justify-center items-center space-y-1 focus:outline-none group"
            aria-label="Toggle mobile menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src="/assets/valhalla-logo.png"
              alt="Projekt Valhalla Logo"
              onClick={goHome}
              className="w-18 h-18 lg:w-20 lg:h-20 object-contain rounded-full transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-[0_0_20px_5px_rgba(255,255,255,0.6)] animate-spin cursor-pointer"
              style={{ animationDuration: "8s" }}
            />
            <h1
              className="text-white text-2xl lg:text-4xl xl:text-5xl tracking-wider font-bold cursor-pointer hover:text-gray-300 transition-colors duration-300"
              onClick={goHome}
            >
              PROJEKT VALHALLA
            </h1>
          </div>

          <nav className="flex space-x-8 lg:space-x-12 xl:space-x-15 text-sm lg:text-base text-gray-400 font-semibold items-center">
            <button
              onClick={() => goTo("/programs")}
              className="hover:text-white hover:scale-110 transition-all duration-300 ease-in-out focus:outline-none"
            >
              Programs
            </button>
            <button
              onClick={() => goTo("/forum")}
              className="hover:text-white hover:scale-110 transition-all duration-300 ease-in-out focus:outline-none"
            >
              Forum
            </button>
            <button
              onClick={() => goTo("/about")}
              className="hover:text-white hover:scale-110 transition-all duration-300 ease-in-out focus:outline-none"
            >
              About
            </button>
            {user && (
              <button
                onClick={handleLogout}
                className="bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition-all duration-300 ease-in-out focus:outline-none"
              >
                <FontAwesomeIcon icon={faRightFromBracket} className="text-black" />
              </button>
            )}
          </nav>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="pt-4 pb-2 space-y-4 border-t border-gray-700 mt-4">
            <button
              onClick={() => goTo("/programs")}
              className="block w-full text-left text-gray-400 hover:text-white transition-colors font-semibold py-2 px-2 rounded hover:bg-gray-800"
            >
              Programs
            </button>
            <button
              onClick={() => goTo("/forum")}
              className="block w-full text-left text-gray-400 hover:text-white transition-colors font-semibold py-2 px-2 rounded hover:bg-gray-800"
            >
              Forum
            </button>
            <button
              onClick={() => goTo("/about")}
              className="block w-full text-left text-gray-400 hover:text-white transition-colors font-semibold py-2 px-2 rounded hover:bg-gray-800"
            >
              About
            </button>
            {user && (
              <button
                onClick={handleLogout}
                className="block text-left bg-white text-black font-bold py-2 px-2 rounded hover:bg-gray-200 transition-colors"
              >
                <FontAwesomeIcon icon={faRightFromBracket} className="text-black" />
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;