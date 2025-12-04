import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import jwt from "jsonwebtoken";

// Helper function to verify JWT and extract userId
function getUserIdFromToken(req: Request): string | null {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as { userId: string };
    return decoded.userId;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}

/**
 * GET /api/tasks
 * Fetch all tasks for authenticated user with optional filters
 */
export async function GET(req: Request) {
  try {
    await connectDB();

    // Extract user ID from JWT token
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Search and Filter Logic
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    let query: any = { userId };

    // Filter by status
    if (status && status !== "All") {
      query.status = status;
    }

    // Search in title and description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/tasks
 * Create a new task for authenticated user
 */
export async function POST(req: Request) {
  try {
    await connectDB();

    // Extract user ID from JWT token
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Basic validation
    if (!body.title || body.title.trim() === "") {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Validate status
    const validStatuses = ["To Do", "In Progress", "Done"];
    if (body.status && !validStatuses.includes(body.status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    // Validate priority
    const validPriorities = ["Low", "Medium", "High"];
    if (body.priority && !validPriorities.includes(body.priority)) {
      return NextResponse.json(
        { error: "Invalid priority value" },
        { status: 400 }
      );
    }

    const newTask = await Task.create({
      userId,
      title: body.title.trim(),
      description: body.description?.trim() || "",
      status: body.status || "To Do",
      priority: body.priority || "Medium",
      dueDate: body.dueDate || null,
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Failed to create task:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}
