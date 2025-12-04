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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/auth/login");
      return;
    }

    // Set axios default header
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setIsAuthenticated(true);
  }, [router]);

  const fetchTasks = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks", {
        params: {
          status: filterStatus === "All" ? undefined : filterStatus,
          search: search || undefined,
        },
      });

      let filteredTasks = res.data;

      // Filter by priority on client side
      if (filterPriority !== "All") {
        filteredTasks = filteredTasks.filter(
          (task: Task) => task.priority === filterPriority
        );
      }

      setTasks(filteredTasks);
    } catch (error: any) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        router.replace("/auth/login");
      }
      console.error("Failed to fetch tasks:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filterStatus, filterPriority, search, router, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const handler = setTimeout(() => {
      fetchTasks();
    }, 300);
    return () => clearTimeout(handler);
  }, [filterStatus, filterPriority, search, fetchTasks, isAuthenticated]);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    document.cookie = "token=; Max-Age=0; path=/;";
    router.replace("/");
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Don't render dashboard until authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
      </div>
    );
  }

  // Get task statistics
  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === "To Do").length,
    inProgress: tasks.filter((t) => t.status === "In Progress").length,
    done: tasks.filter((t) => t.status === "Done").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 backdrop-blur-lg bg-white/90 dark:bg-gray-900/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              📊 Task Dashboard
            </h1>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-semibold px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-2 border-gray-100 dark:border-gray-700">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.total}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Total Tasks
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-2 border-blue-100 dark:border-blue-900">
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {stats.todo}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              To Do
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-2 border-yellow-100 dark:border-yellow-900">
            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              {stats.inProgress}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              In Progress
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-2 border-green-100 dark:border-green-900">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {stats.done}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Completed
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-8 border-2 border-gray-100 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search tasks by title or description..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-semibold"
            >
              <FilterIcon size={18} />
              Filters
            </button>

            <div
              className={`${
                showFilters ? "flex" : "hidden"
              } sm:flex flex-col sm:flex-row gap-3`}
            >
              <select
                className="px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none cursor-pointer font-medium"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>

              <select
                className="px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none cursor-pointer font-medium"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <option value="All">All Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <button
                onClick={() => {
                  setEditingTask(null);
                  setIsModalOpen(true);
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl font-bold whitespace-nowrap"
              >
                <Plus size={20} /> New Task
              </button>
            </div>
          </div>
        </div>

        {/* Task Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Loading your tasks...
            </p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-600 dark:text-gray-400 text-xl mb-2">
              No tasks found
            </p>
            <p className="text-gray-500 dark:text-gray-500 mb-6">
              {search || filterStatus !== "All" || filterPriority !== "All"
                ? "Try adjusting your filters"
                : "Create your first task to get started"}
            </p>
            <button
              onClick={() => {
                setEditingTask(null);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Plus size={20} /> Create Task
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
