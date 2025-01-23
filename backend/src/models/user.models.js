import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      required: true,
    },
  },

  { timestamps: true }
);

export const USER = mongoose.model("USER", userSchema);
