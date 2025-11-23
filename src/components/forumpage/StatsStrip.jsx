"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

export default function StatsStrip({ pollInterval = 30000 }) {
  const [totalThreads, setTotalThreads] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [activeUsers, setActiveUsers] = useState(null);

  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  // robust thread count
  const fetchThreadsCount = async () => {
    try {
      const { count, error } = await supabase
        .from("forum_threads")
        .select("id", { count: "exact", head: true });

      if (!error && typeof count === "number") {
        setTotalThreads(count);
        return;
      }
    } catch {}

    const rows = await supabase.from("forum_threads").select("id").limit(2000);
    setTotalThreads(rows.data?.length ?? 0);
  };

  // robust total users
  const fetchUsersCount = async () => {
    try {
      const { count, error } = await supabase
        .from("profiles")
        .select("id", { count: "exact", head: true });

      if (!error && typeof count === "number") {
        setTotalUsers(count);
        return;
      }
    } catch {}

    const [threads, replies] = await Promise.all([
      supabase.from("forum_threads").select("user_id").limit(2000),
      supabase.from("forum_replies").select("user_id").limit(2000),
    ]);

    const ids = new Set([
      ...(threads.data?.map((r) => r.user_id) || []),
      ...(replies.data?.map((r) => r.user_id) || []),
    ]);

    setTotalUsers(ids.size);
  };

  // robust active users (last 10 minutes)
  const fetchActiveUsers = async () => {
    try {
      const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();

      const [threads, replies] = await Promise.all([
        supabase
          .from("forum_threads")
          .select("user_id")
          .gte("last_activity", since)
          .limit(2000),

        supabase
          .from("forum_replies")
          .select("user_id")
          .gte("created_at", since)
          .limit(2000),
      ]);

      const ids = new Set([
        ...(threads.data?.map((r) => r.user_id) || []),
        ...(replies.data?.map((r) => r.user_id) || []),
      ]);

      setActiveUsers(ids.size);
    } catch (err) {
      console.error("fetchActiveUsers error:", err);
      setActiveUsers(0);
    }
  };

  useEffect(() => {
    const load = async () => {
      fetchThreadsCount();
      fetchUsersCount();
      fetchActiveUsers();
    };

    load();

    const i = setInterval(() => {
      fetchThreadsCount();
      fetchActiveUsers();
    }, pollInterval);

    return () => clearInterval(i);
  }, [pollInterval]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full bg-gradient-to-b from-[#0a0a0a] to-[#000000] py-8 sm:py-10 md:py-12 relative overflow-hidden"
    >
      
      <div className="absolute inset-0 bg-gradient-to-r from-red-950/5 via-transparent to-red-950/5 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          
          {/* Threads */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center text-center group"
          >
            <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider mb-2 sm:mb-3 font-semibold">
              Threads
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
              {totalThreads ?? "—"}
            </div>
            <div className="mt-2 h-1 w-12 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>

          {/* Warriors */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center text-center group"
          >
            <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider mb-2 sm:mb-3 font-semibold">
              Warriors
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
              {totalUsers ?? "—"}
            </div>
            <div className="mt-2 h-1 w-12 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>

          {/* Active Now */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center text-center group"
          >
            <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider mb-2 sm:mb-3 font-semibold">
              <span className="hidden sm:inline">Active Now</span>
              <span className="sm:hidden">Active</span>
            </div>

            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white group-hover:text-red-400 transition-colors duration-300 flex items-center gap-2">
              {activeUsers ?? "—"}
              {activeUsers > 0 && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/50"
                />
              )}
            </div>

            <div className="mt-2 h-1 w-12 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
