import mongoose, { Schema } from "mongoose";

const roleAssignSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "USER",
      required: true,
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: "ROLE",
      required: true,
    },
  },

  { timestamps: true }
);

export const ROLE_ASSIGN = mongoose.model("ROLE_ASSIGN", roleAssignSchema);
