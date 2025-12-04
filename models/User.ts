// models/User.ts
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: true,
    },
    // Google OAuth fields
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allow multiple null values
    },
    name: {
      type: String,
    },
    picture: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        const { password, ...rest } = ret;
        return rest;
      },
    },
  }
);

// Prevent multiple models with same name in development
export default mongoose.models.User || mongoose.model("User", UserSchema);
