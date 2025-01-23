import { ROLE_ASSIGN } from "../models/roleAssign.models.js";
import { asyncHandler } from "../utils/handler.utils.js";
import { ErrorResponse, SuccessResponse } from "../utils/responses.utils.js";
import mongoose from "mongoose";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const assignRole = asyncHandler(async (req, res) => {
  const { userId, roleId } = req.body;

  if (!isValidObjectId(userId))
    return ErrorResponse(res, 404, "User is not found ");
  if (!isValidObjectId(roleId))
    return ErrorResponse(res, 404, "Role not found ");

  let roleAssigned = await ROLE_ASSIGN.findOne({ userId, roleId });
  if (roleAssigned) {
    return ErrorResponse(res, 400, "Role already assigned to user");
  }

  roleAssigned = await ROLE_ASSIGN.create({ userId, roleId });

  roleAssigned = await ROLE_ASSIGN.findById(roleAssigned._id)
    .populate("userId", "name email status")
    .populate("roleId", "name description")
    .exec();

  return SuccessResponse(res, `Role assigned`, roleAssigned);
});

export const listRoleAssigns = asyncHandler(async (req, res) => {
  const roleAssigns = await ROLE_ASSIGN.find()
    .populate("userId", "name email status")
    .populate("roleId", "name description")
    .exec();
  //  console.log(roleAssigns);

  if (roleAssigns.length == 0) {
    return ErrorResponse(res, 404, "No role assigned to user");
  }
  return SuccessResponse(res, null, roleAssigns);
});

export const deleteRoleAssign = asyncHandler(async (req, res) => {
  const roleAssignId = req.params.id;
  await ROLE_ASSIGN.findByIdAndDelete(roleAssignId);

  return SuccessResponse(res, `Role unassigned`);
});
