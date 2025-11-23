"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

import About from "@/components/aboutpage/About";
import Footer from "@/components/Footer";

export default function AboutPage() {

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
		  <About />
		  <Footer />
		</main>
	);
}