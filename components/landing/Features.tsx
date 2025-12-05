import {
  CheckCircle,
  Filter,
  Calendar,
  BarChart2,
  Lock,
  Smartphone,
} from "lucide-react";

const featuresData = [
  {
    title: "Task Management",
    description:
      "Create, update, and organize your tasks with ease. Track progress and stay on top of your work.",
    icon: (
      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
    ),
    bg: "bg-blue-100 dark:bg-blue-900/30",
    borderColor: "border-blue-200 dark:border-blue-800",
  },
  {
    title: "Smart Filtering",
    description:
      "Filter tasks by status, priority, or search by keywords. Find what you need instantly.",
    icon: (
      <Filter className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
    ),
    bg: "bg-purple-100 dark:bg-purple-900/30",
    borderColor: "border-purple-200 dark:border-purple-800",
  },
  {
    title: "Due Dates",
    description:
      "Set due dates for your tasks and never miss a deadline. Stay organized and on schedule.",
    icon: (
      <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
    ),
    bg: "bg-green-100 dark:bg-green-900/30",
    borderColor: "border-green-200 dark:border-green-800",
  },
  {
    title: "Priority Levels",
    description:
      "Set priority levels for your tasks. Focus on what matters most and maximize productivity.",
    icon: (
      <BarChart2 className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 dark:text-yellow-400" />
    ),
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    borderColor: "border-yellow-200 dark:border-yellow-800",
  },
  {
    title: "Secure & Private",
    description:
      "Your tasks are securely stored and only accessible by you. JWT authentication ensures privacy.",
    icon: (
      <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 dark:text-red-400" />
    ),
    bg: "bg-red-100 dark:bg-red-900/30",
    borderColor: "border-red-200 dark:border-red-800",
  },
  {
    title: "Responsive Design",
    description:
      "Access your tasks anywhere, anytime. Fully responsive design works on all devices.",
    icon: (
      <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
    ),
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
    borderColor: "border-indigo-200 dark:border-indigo-800",
  },
];

export default function Features() {
  return (
    <div
      id="features"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900 transition-colors"
    >
      {/* Section Header - Responsive */}
      <div className="text-center mb-10 sm:mb-12 md:mb-16">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4">
          Powerful Features
        </h2>
        <p className="text-sm xs:text-base sm:text-lg text-gray-600 dark:text-gray-400 px-4">
          Everything you need to manage your tasks effectively
        </p>
      </div>

      {/* Features Grid - Responsive columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {featuresData.map((feature, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 hover:-translate-y-1"
          >
            {/* Icon Container - Responsive */}
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-4 sm:mb-5 border-2 ${feature.borderColor}`}
            >
              {feature.icon}
            </div>

            {/* Title - Responsive */}
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
              {feature.title}
            </h3>

            {/* Description - Responsive */}
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
