export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12 mt-20 border-t border-gray-800 dark:border-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">TaskTracker</h3>
          <p className="text-gray-400 dark:text-gray-500">
            Organize your tasks, boost your productivity
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-400 dark:text-gray-500">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
          <p className="text-gray-500 dark:text-gray-600 text-sm pt-4 border-t border-gray-800 dark:border-gray-900">
            &copy; {new Date().getFullYear()} TaskTracker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
