"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

import Footer from "@/components/Footer";
import Hero from "@/components/homepage/Hero";
import HomeBlock1 from "@/components/homepage/HomeBlock1";
import HomeBlock2 from "@/components/homepage/HomeBlock2";
import HomeBlock3 from "@/components/homepage/HomeBlock3";
import HomeBlock4 from "@/components/homepage/HomeBlock4";

export default function HomePage() {
  
  // Redirect to login if not authenticated
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) router.replace("/");
    };
    check();
  }, []);
  
  return (
    <main className="bg-black text-white">
      <Hero />
	  <HomeBlock1 />
	  <HomeBlock2 />
	  <HomeBlock3 />
	  <HomeBlock4 />
	  <Footer />
    </main>
  );
}
