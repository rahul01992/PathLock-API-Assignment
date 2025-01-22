import { ROLE_ASSIGN } from "../models/roleAssign.models.js";
import { asyncHandler } from "../utils/handler.utils.js";
import { ErrorResponse, SuccessResponse } from "../utils/responses.utils.js";

export const assignRole = asyncHandler(async (req, res) => {
    const { userId, roleId } = req.body;

    await ROLE_ASSIGN.create({ userId, roleId });

    return SuccessResponse(res, `Role assigned`);
});

export const listRoleAssigns = asyncHandler(async (req, res) => {
    const roleAssigns = await ROLE_ASSIGN.find();
    return SuccessResponse(res, null, roleAssigns);
});

export const deleteRoleAssign = asyncHandler(async (req, res) => {
    
});