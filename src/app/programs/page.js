"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

import ProgramHero from "@/components/programs/ProgramHero";
import ProgramGrid from "@/components/programs/ProgramGrid";
import Footer from "@/components/Footer";

export default function Programs() {
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
		  <ProgramHero />
		  <ProgramGrid />
		  <Footer />
		</main>
	);
}