"use client";

import Link from "next/link";

interface HeroProps {
  onGetStarted: () => void;
  isLoggedIn?: boolean;
}

export default function Hero({ onGetStarted, isLoggedIn = false }: HeroProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-900 transition-colors">
      <div className="text-center">
        {/* Badge - Responsive */}
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs sm:text-sm font-semibold border border-blue-200 dark:border-blue-800">
            ✨ Welcome to TaskTracker
          </span>
        </div>

        {/* Main Heading - Responsive text sizes */}
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight animate-slide-up px-2">
          Organize Your Tasks,
          <span className="block bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mt-1 sm:mt-2">
            Boost Your Productivity
          </span>
        </h1>

        {/* Subheading - Responsive */}
        <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay px-4">
          A simple and powerful task management app to help you stay organized
          and get things done efficiently.
        </p>

        {/* CTA Buttons - Responsive layout and sizing */}
        <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center animate-fade-in-delay-2 px-4">
          {isLoggedIn ? (
            <button
              onClick={onGetStarted}
              className="group px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg sm:rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Go to Dashboard
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          ) : (
            <>
              <Link
                href="/auth/signup"
                className="group px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg sm:rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-block text-center"
              >
                <span className="hidden xs:inline">Get Started Free</span>
                <span className="xs:hidden">Sign Up Free</span>
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
              <Link
                href="/auth/login"
                className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg sm:rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-blue-600 dark:border-blue-400 transform hover:scale-105 inline-block text-center"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Learn More Link - Only show when not logged in */}
        {!isLoggedIn && (
          <div className="mt-5 sm:mt-6 animate-fade-in-delay-3">
            <a
              href="#features"
              className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors"
            >
              Learn more about features ↓
            </a>
          </div>
        )}

        {/* Stats Section - Responsive grid */}
        <div className="mt-12 sm:mt-16 flex flex-col xs:flex-row justify-center gap-6 xs:gap-8 sm:gap-12 text-center">
          <div className="animate-fade-in-delay-3">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              1000+
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
              Active Users
            </p>
          </div>
          <div className="animate-fade-in-delay-3">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              50K+
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
              Tasks Completed
            </p>
          </div>
          <div className="animate-fade-in-delay-3">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              99.9%
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
              Uptime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
