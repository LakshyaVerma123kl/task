export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-8 sm:py-10 md:py-12 mt-12 sm:mt-16 md:mt-20 border-t border-gray-800 dark:border-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 sm:space-y-4">
          {/* Logo/Brand - Responsive */}
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            TaskTracker
          </h3>

          {/* Tagline - Responsive */}
          <p className="text-sm sm:text-base text-gray-400 dark:text-gray-500 px-4">
            Organize your tasks, boost your productivity
          </p>

          {/* Copyright - Responsive */}
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-600 pt-3 sm:pt-4 border-t border-gray-800 dark:border-gray-900">
            &copy; {new Date().getFullYear()} TaskTracker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
