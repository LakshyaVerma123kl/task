"use client";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export default function Navbar({ isLoggedIn, onLogout }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 backdrop-blur-lg bg-white/90 dark:bg-gray-900/90 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                TaskTracker
              </h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />

            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  📊 Dashboard
                </Link>
                <button
                  onClick={onLogout}
                  className="px-6 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800 animate-slide-down">
            {isLoggedIn ? (
              <div className="flex flex-col gap-2">
                <Link
                  href="/dashboard"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  📊 Dashboard
                </Link>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all text-left"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/auth/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
