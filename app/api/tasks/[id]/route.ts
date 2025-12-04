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
 * PUT /api/tasks/[id]
 * Update a specific task
 */
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    // Extract user ID from JWT token
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();

    // Find task and verify ownership
    const task = await Task.findOne({ _id: id, userId });
    if (!task) {
      return NextResponse.json(
        { error: "Task not found or unauthorized" },
        { status: 404 }
      );
    }

    // Validation
    if (body.title !== undefined && body.title.trim() === "") {
      return NextResponse.json(
        { error: "Title cannot be empty" },
        { status: 400 }
      );
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

    // Update task
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title: body.title?.trim(),
        description: body.description?.trim(),
        status: body.status,
        priority: body.priority,
        dueDate: body.dueDate || null,
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Failed to update task:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/tasks/[id]
 * Delete a specific task
 */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    // Extract user ID from JWT token
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // Find task and verify ownership
    const task = await Task.findOne({ _id: id, userId });
    if (!task) {
      return NextResponse.json(
        { error: "Task not found or unauthorized" },
        { status: 404 }
      );
    }

    // Delete task
    await Task.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete task:", error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
