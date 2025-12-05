// app/dashboard/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import TaskForm from "@/components/TaskForm";
import TaskCard from "@/components/TaskCard";
import {
  Plus,
  LogOut,
  Loader2,
  Search,
  Filter as FilterIcon,
  X,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

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

export default function Dashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks", {
        params: {
          status: filterStatus === "All" ? undefined : filterStatus,
          priority: filterPriority === "All" ? undefined : filterPriority,
          search: search || undefined,
        },
        withCredentials: true,
      });

      setTasks(res.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        router.replace("/auth/login");
      }
      console.error("Failed to fetch tasks:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filterStatus, filterPriority, search, router]);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchTasks();
    }, 300);
    return () => clearTimeout(handler);
  }, [fetchTasks]);

  const handleCreateOrUpdate = async (data: any) => {
    try {
      if (editingTask) {
        await axios.put(`/api/tasks/${editingTask._id}`, data);
      } else {
        await axios.post("/api/tasks", data);
      }
      setIsModalOpen(false);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      alert("Operation failed. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      alert("Delete failed. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
      {/* Header - Responsive */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 backdrop-blur-lg bg-white/90 dark:bg-gray-900/90">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              <span className="hidden xs:inline">📊 Task Dashboard</span>
              <span className="xs:hidden">📊 Tasks</span>
            </h1>
            <div className="flex items-center gap-1.5 sm:gap-3">
              <ThemeToggle />
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 sm:gap-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-semibold px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-xs sm:text-base"
              >
                <LogOut size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Statistics - Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
          <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl shadow-md border-2 border-gray-100 dark:border-gray-700">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {tasks.length}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">
              Total Tasks
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl shadow-md border-2 border-blue-100 dark:border-blue-900">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
              {tasks.filter((t) => t.status === "To Do").length}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">
              To Do
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl shadow-md border-2 border-yellow-100 dark:border-yellow-900">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              {tasks.filter((t) => t.status === "In Progress").length}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">
              In Progress
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl shadow-md border-2 border-green-100 dark:border-green-900">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400">
              {tasks.filter((t) => t.status === "Done").length}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">
              Completed
            </p>
          </div>
        </div>

        {/* Controls - Responsive */}
        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-lg mb-4 sm:mb-6 md:mb-8 border-2 border-gray-100 dark:border-gray-700">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base border-2 border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Filter Toggle (Mobile) and Desktop Filters */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-semibold text-sm"
              >
                {showFilters ? (
                  <>
                    <X size={16} />
                    Hide Filters
                  </>
                ) : (
                  <>
                    <FilterIcon size={16} />
                    Show Filters
                  </>
                )}
              </button>

              {/* Filters - Responsive Layout */}
              <div
                className={`${
                  showFilters ? "flex" : "hidden"
                } sm:flex flex-col xs:flex-row gap-2 sm:gap-3 flex-1`}
              >
                <select
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base border-2 border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none cursor-pointer font-medium"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>

                <select
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base border-2 border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none cursor-pointer font-medium"
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                >
                  <option value="All">All Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              {/* New Task Button - Always Visible */}
              <button
                onClick={() => {
                  setEditingTask(null);
                  setIsModalOpen(true);
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 transition-all shadow-lg hover:shadow-xl font-bold whitespace-nowrap text-sm sm:text-base"
              >
                <Plus size={18} className="sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">New Task</span>
                <span className="xs:hidden">New</span>
              </button>
            </div>
          </div>
        </div>

        {/* Task Grid - Responsive */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20">
            <Loader2 className="animate-spin h-10 w-10 sm:h-12 sm:w-12 text-blue-600 dark:text-blue-400 mb-3 sm:mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg">
              Loading your tasks...
            </p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">
              📋
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg md:text-xl mb-1 sm:mb-2 px-4">
              No tasks found
            </p>
            <p className="text-gray-500 dark:text-gray-500 mb-4 sm:mb-6 text-xs sm:text-sm md:text-base px-4">
              {search || filterStatus !== "All" || filterPriority !== "All"
                ? "Try adjusting your filters"
                : "Create your first task to get started"}
            </p>
            <button
              onClick={() => {
                setEditingTask(null);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
            >
              <Plus size={18} className="sm:w-5 sm:h-5" /> Create Task
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={handleDelete}
                onUpdate={openEditModal}
              />
            ))}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <TaskForm
            initialData={editingTask}
            onSubmit={handleCreateOrUpdate}
            onCancel={() => {
              setIsModalOpen(false);
              setEditingTask(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
