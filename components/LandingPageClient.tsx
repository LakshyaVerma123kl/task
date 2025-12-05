"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";

export default function LandingPageClient({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleGetStarted = () => {
    router.push("/dashboard");
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Hero onGetStarted={handleGetStarted} isLoggedIn={isLoggedIn} />
      <Features />
      <Footer />
    </div>
  );
}
