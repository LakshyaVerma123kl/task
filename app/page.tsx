"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Check login status on mount
  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Call logout API endpoint
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage and state
      localStorage.removeItem("token");
      setIsLoggedIn(false);

      // Remove cookie
      document.cookie = "token=; Max-Age=0; path=/;";

      router.refresh();
    }
  };

  const handleGetStarted = () => {
    if (isLoggedIn) {
      router.push("/dashboard");
    } else {
      router.push("/auth/signup");
    }
  };

  // Prevent hydration mismatch
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
