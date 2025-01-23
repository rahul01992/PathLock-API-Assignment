import { ROLE } from "../models/role.models.js";
import { asyncHandler } from "../utils/handler.utils.js";
import { ErrorResponse, SuccessResponse } from "../utils/responses.utils.js";

export const addRole = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if (!name) return ErrorResponse(res, 400, `Enter the role name`);

    await ROLE.create({ name, description });

    return SuccessResponse(res, `New role added`);
});

export const listAllRoles = asyncHandler(async (req, res) => {
    const roles = await ROLE.find();
    return SuccessResponse(res, null, roles);
});

export const getRoleDetails = asyncHandler(async (req, res) => {
    const roleId = req.params.id;

    const role = await ROLE.findById(roleId);
    if (!role) return ErrorResponse(res, 404, `Role not found`);

    return SuccessResponse(res, null, role);
});

export const updateRoleDetails = asyncHandler(async (req, res) => {
    const roleId = req.params.id;
    const { name, description } = req.body;

    if (!name || !description) return ErrorResponse(res, 400, `Role details missing`);

    let role = await ROLE.findById(roleId);
    if (!role) return ErrorResponse(res, 404, `Role not found`);

    role.name = name;
    role.description = description;
    role = await role.save();

    return SuccessResponse(res, `Details updated`, role);
});

export const deleteRole = asyncHandler(async (req, res) => {
    const roleId = req.params.id;

    const role = await ROLE.findById(roleId);
    if (!role) return ErrorResponse(res, 404, `Role not found`);

    await ROLE.findByIdAndDelete(roleId);

    return SuccessResponse(res, `Role deleted`)
});