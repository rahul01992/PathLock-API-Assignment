import mongoose from "mongoose";
import { USER } from "../models/user.models.js";
import { asyncHandler } from "../utils/handler.utils.js";
import { ErrorResponse, SuccessResponse } from "../utils/responses.utils.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const createNewUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) return ErrorResponse(res, 400, "Fill all the details");

  let user = await USER.findOne({ email, name });
  if (user) return ErrorResponse(res, 400, "User already exists");

  user = await USER.create({ name, email, status: "Active" });

  return SuccessResponse(res, "New user created", user);
});

export const retrieveAllUsers = asyncHandler(async (req, res) => {
  const user = await USER.find().sort({ status: 1 }).exec();
  return SuccessResponse(res, null, user);
});

export const retrieveUserDetails = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  if (!isValidObjectId(userId))
    return ErrorResponse(res, 404, "User not found ");

  const user = await USER.findById(userId);
  if (!user) return ErrorResponse(res, 404, "User not found ");

  return SuccessResponse(res, null, user);
});

export const updateUserDetails = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  if (!isValidObjectId(userId))
    return ErrorResponse(res, 404, "User not found ");

  const { name, email, status } = req.body;

  if (!name || !email || !status) {
    return ErrorResponse(res, 400, "Fill all the details");
  }

  let user = await USER.findById(userId);
  if (!user) return ErrorResponse(res, 404, " User not found ");

  // user.status = user.status === "Active" ? "Inactive" : "Active";
  user.name = name;
  user.email = email;
  user.status = status;

  user = await user.save();

  return SuccessResponse(res, " Status updated successfully", user);
});

export const softDeleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  if (!isValidObjectId(userId))
    return ErrorResponse(res, 404, "User not found ");

  const user = await USER.findById(userId);
  if (!user) return ErrorResponse(res, 404, " User not found");

  if (user.status == "Inactive") {
    return ErrorResponse(res, 400, "Already Inactive User");
  }
  user.status = "Inactive";

  await user.save();

  return SuccessResponse(res, "User set to inactive", user);
});
