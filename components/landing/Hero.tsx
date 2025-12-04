"use client";

import Link from "next/link";

interface HeroProps {
  onGetStarted: () => void;
  isLoggedIn?: boolean;
}

export default function Hero({ onGetStarted, isLoggedIn = false }: HeroProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white dark:bg-gray-900 transition-colors">
      <div className="text-center">
        <div className="mb-8 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold border border-blue-200 dark:border-blue-800">
            ✨ Welcome to TaskTracker
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight animate-slide-up">
          Organize Your Tasks,
          <span className="block bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mt-2">
            Boost Your Productivity
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
          A simple and powerful task management app to help you stay organized
          and get things done efficiently.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
          {isLoggedIn ? (
            // If logged in, show Dashboard button
            <button
              onClick={onGetStarted}
              className="group px-10 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Go to Dashboard
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          ) : (
            // If not logged in, show Sign Up and Login buttons
            <>
              <Link
                href="/auth/signup"
                className="group px-10 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-block"
              >
                Get Started Free
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
              <Link
                href="/auth/login"
                className="px-10 py-4 text-lg font-bold text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-blue-600 dark:border-blue-400 transform hover:scale-105 inline-block"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Secondary CTA for Learn More */}
        {!isLoggedIn && (
          <div className="mt-6 animate-fade-in-delay-3">
            <a
              href="#features"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors"
            >
              Learn more about features ↓
            </a>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 flex justify-center gap-12 text-center flex-wrap">
          <div className="animate-fade-in-delay-3">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              1000+
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Active Users
            </p>
          </div>
          <div className="animate-fade-in-delay-3">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              50K+
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Tasks Completed
            </p>
          </div>
          <div className="animate-fade-in-delay-3">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              99.9%
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Uptime</p>
          </div>
        </div>
      </div>
    </div>
  );
}
