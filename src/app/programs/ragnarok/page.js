"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

import Footer from "@/components/Footer";
import Ragnarok from "@/components/programs/Ragnarok";
import RagnarokPaid from "@/components/programs/RagnarokPaid"; // Import this

export default function RagnarokPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [hasPurchased, setHasPurchased] = useState(null);

  useEffect(() => {
    const init = async () => {
      // 1. Check user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/");
        return;
      }

      setUser(user);

      // 2. Check if user has purchased Ragnarok
      const { data, error } = await supabase
        .from('program_purchases')
        .select('*')
        .eq('user_id', user.id)
        .eq('program_id', 'ragnarok')
        .single();

      setHasPurchased(!!data); // true if purchase exists
    };

    init();
  }, [router]);

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