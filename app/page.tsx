"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleGetStarted = () => {
    // We let the dashboard or login page handle the redirect logic based on cookie presence
    router.push("/dashboard");
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  // Note: We don't check isLoggedIn here via localStorage anymore.
  // The Navbar or Hero can link to Dashboard, which will redirect if not logged in.
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors">
      <Navbar isLoggedIn={false} onLogout={handleLogout} />
      <Hero onGetStarted={handleGetStarted} isLoggedIn={false} />
      <Features />
      <Footer />
    </div>
  );
}
