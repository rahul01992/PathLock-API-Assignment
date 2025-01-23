import mongoose, { Schema } from "mongoose";

const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
    },
  },

  { timestamps: true }
);

export const ROLE = mongoose.model("ROLE", roleSchema);
