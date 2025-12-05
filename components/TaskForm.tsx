// components/TaskForm.tsx
"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface TaskFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function TaskForm({
  initialData,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "To Do",
    priority: "Medium",
    dueDate: "",
  });

  useEffect(() => {
    if (initialData) {
      let formattedDate = "";
      if (initialData.dueDate) {
        try {
          formattedDate = new Date(initialData.dueDate)
            .toISOString()
            .split("T")[0];
        } catch (e) {
          console.error("Invalid date:", initialData.dueDate);
        }
      }

      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        status: initialData.status || "To Do",
        priority: initialData.priority || "Medium",
        dueDate: formattedDate,
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50 animate-in">
      <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[95%] sm:max-w-lg max-h-[90vh] overflow-hidden border-2 border-gray-200 dark:border-gray-700 animate-scale-in flex flex-col">
        {/* Header - Responsive */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-900 shrink-0">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
            {initialData ? "✏️ Edit Task" : "✨ Create New Task"}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-1.5 sm:p-2 rounded-full hover:bg-white/50 dark:hover:bg-gray-700/50"
            aria-label="Close"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Form - Scrollable on small screens */}
        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 space-y-3.5 sm:space-y-5 overflow-y-auto flex-1"
        >
          {/* Title */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Enter task title"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Add task details (optional)"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all resize-none placeholder-gray-400 dark:placeholder-gray-500"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* Status and Priority - Responsive Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                Status
              </label>
              <select
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all cursor-pointer"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                Priority
              </label>
              <select
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all cursor-pointer"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
              Due Date
            </label>
            <input
              type="date"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
            />
          </div>
        </form>

        {/* Action Buttons - Fixed at bottom, Responsive */}
        <div className="flex gap-2 sm:gap-3 p-4 sm:p-6 pt-0 shrink-0">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex-1 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {initialData ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
