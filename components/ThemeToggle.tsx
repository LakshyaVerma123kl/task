"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 hover:scale-110 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
      aria-label="Toggle Theme"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon size={20} className="transition-transform hover:rotate-12" />
      ) : (
        <Sun size={20} className="transition-transform hover:rotate-45" />
      )}
    </button>
  );
}
