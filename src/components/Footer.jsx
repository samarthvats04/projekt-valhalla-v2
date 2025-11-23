"use client";

import { FaInstagram, FaEnvelope, FaYoutube, FaDiscord } from "react-icons/fa";

export default function Footer() {
  const socials = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/_samarthvats_",
      icon: <FaInstagram size={22} />,
    },
    {
      label: "YouTube",
      href: "https://youtube.com/",
      icon: <FaYoutube size={22} />,
    },
    {
      label: "Discord",
      href: "https://discord.gg/37wZ4EVXBV",
      icon: <FaDiscord size={22} />,
    },
    {
      label: "Email",
      href: "mailto:samarthvats004@gmail.com",
      icon: <FaEnvelope size={22} />,
    },
  ];

  return (
    <footer className="relative z-20 bg-[#000] text-white py-10 sm:py-14 px-5 sm:px-8 border-t border-black">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-12 lg:gap-0">
          
          {/* LEFT — Contact Info */}
          <div className="text-center lg:text-left flex-1 lg:pr-10">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-300">Contact Info</h3>
            <div className="text-gray-400 text-sm sm:text-base space-y-2">
              <p>Kanminike, Kumbalagodu</p>
              <p>Bengaluru (BLR), Karnataka, 560074</p>
              <p>Email: samarthvats004@gmail.com</p>
              <p>Phone: +91 7455013094</p>
            </div>
          </div>

          {/* CENTER — Branding */}
          <div className="text-center flex-1 lg:px-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-[var(--font-morph)] tracking-wider font-bold mb-2">
              PROJEKT VALHALLA
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mb-2 leading-none">
              FOR THE UNTAMED. ONLY THE WORTHY REMAIN
            </p>
            <p className="text-xs sm:text-sm text-gray-400 mb-2">v 1 . 0 . 0</p>
            <p className="text-xs sm:text-sm text-gray-400">© 2025. All rights reserved.</p>
          </div>

          {/* RIGHT — Social Links */}
          <div className="flex-1 text-center lg:text-right lg:pl-10">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-300">Reach Out</h3>

            {/* MOBILE — Icons inline */}
            <div className="flex justify-center lg:hidden gap-6 mt-2">
              {socials.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition duration-300 p-2 rounded-lg hover:bg-gray-800/50"
                >
                  {item.icon}
                </a>
              ))}
            </div>

            {/* DESKTOP — Slide labels */}
            <div className="hidden lg:flex flex-col items-end gap-3 mt-2">
              {socials.map((item, i) => (
                <div key={i} className="relative group">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-400 hover:text-white transition duration-300"
                  >
                    <span className="text-sm opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out mr-3">
                      {item.label}
                    </span>
                    {item.icon}
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
