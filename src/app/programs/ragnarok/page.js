"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

import Footer from "@/components/Footer";
import Ragnarok from "@/components/programs/Ragnarok";

export default function RagnarokPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [hasPurchased, setHasPurchased] = useState(null); 
  // null = loading, false = unpaid, true = paid

  useEffect(() => {
    const init = async () => {
      // 1. check user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/");
        return;
      }

      setUser(user);

      // 2. TEMPORARY purchase check (replace later with real query)
      // For now it's always unpaid
      setHasPurchased(false);
    };

    init();
  }, []);

  // Loading state
  if (hasPurchased === null) {
    return (
      <main className="bg-black text-white min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="bg-black text-white">
      {hasPurchased ? (
        <RagnarokPaid user={user} />
      ) : (
        <Ragnarok user={user} />
      )}
      <Footer />
    </main>
  );
}