"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

import Forum from "@/components/forumpage/Forum";
import Footer from "@/components/Footer";
import StatsStrip from "@/components/forumpage/StatsStrip";
import HeroForum from "@/components/forumpage/HeroForum";

export default function ForumPage() {
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) router.replace("/");
    };
    check();
  }, []);
  
  return(
	<>
	  <HeroForum />
	  <StatsStrip />
	  <Forum />
	  <Footer />
	</>
  );
}
