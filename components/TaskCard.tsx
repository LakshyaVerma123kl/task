// components/TaskCard.tsx
"use client";

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "To Do" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onUpdate: (task: Task) => void;
}

const TaskCard = ({ task, onDelete, onUpdate }: TaskCardProps) => {
  const priorityColors = {
    High: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800",
    Medium:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
    Low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800",
  };

  const statusColors = {
    "To Do":
      "bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300 border-gray-200 dark:border-gray-600",
    "In Progress":
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    Done: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800",
  };

  const formatDate = (date?: string) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  return (
    <div className="group p-4 sm:p-5 md:p-6 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl shadow-sm bg-white dark:bg-gray-800 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300">
      {/* Header with Title and Priority */}
      <div className="flex justify-between items-start gap-2 mb-2 sm:mb-3">
        <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white flex-1 pr-2 leading-tight break-words">
          {task.title}
        </h3>
        <span
          className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full font-semibold whitespace-nowrap border shrink-0 ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority}
        </span>
      </div>

      {/* Description - Responsive line clamp */}
      {task.description && (
        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-2 sm:mt-3 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
          {task.description}
        </p>
      )}

      {/* Status and Due Date Tags - Responsive */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
        <span
          className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full font-semibold border ${
            statusColors[task.status]
          }`}
        >
          {task.status}
        </span>
        {task.dueDate && (
          <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 font-semibold border border-purple-200 dark:border-purple-800">
            📅 {formatDate(task.dueDate)}
          </span>
        )}
      </div>

      {/* Action Buttons - Responsive */}
      <div className="flex gap-1.5 sm:gap-2 mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => onUpdate(task)}
          className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2.5 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md sm:rounded-lg transition-all duration-200 border border-blue-200 dark:border-blue-800"
        >
          <span className="hidden xs:inline">✏️ Edit</span>
          <span className="xs:hidden">✏️</span>
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2.5 text-xs sm:text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md sm:rounded-lg transition-all duration-200 border border-red-200 dark:border-red-800"
        >
          <span className="hidden xs:inline">🗑️ Delete</span>
          <span className="xs:hidden">🗑️</span>
        </button>
      </div>

      {/* Created Date - Responsive */}
      <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100 dark:border-gray-700/50 text-[10px] sm:text-xs text-gray-500 dark:text-gray-500">
        Created: {new Date(task.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default TaskCard;
