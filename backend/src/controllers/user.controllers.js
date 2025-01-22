import { USER } from "../models/user.models.js";
import { asyncHandler } from "../utils/handler.utils.js";
import { ErrorResponse, SuccessResponse } from "../utils/responses.utils.js";

export const createNewUser = asyncHandler(async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) return ErrorResponse(res, 400, `Fill all the details`);

    const user = await USER.findOne({ email });
    if (user) return ErrorResponse(res, 400, `User already exists`);

    await USER.create({ name, email });

    return SuccessResponse(res, `New user created`);
});

export const retrieveAllUsers = asyncHandler(async (req, res) => {
    const user = await USER.find().sort({ status: 1 }).exec();
    return SuccessResponse(res, null, user);
});

export const retrieveUserDetails = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const user = await USER.findById(userId);
    if (!user) return ErrorResponse(res, 404, `User not found`);

    return SuccessResponse(res, null, user);
});

export const updateUserDetails = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const { name } = req.body;

    const user = await USER.findById(userId);
    if (!user) return ErrorResponse(res, 404, `User not found`);

    // user.status = user.status === "Active" ? "Inactive" : "Active";
    user.name = name;

    await user.save();

    return SuccessResponse(res, `Status updated successfully`);
});

export const softDeleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const user = await USER.findById(userId);
    if (!user) return ErrorResponse(res, 404, `User not found`);

    user.status = "Inactive";

    await user.save();

    return SuccessResponse(res, `User set to inactive`);
});
