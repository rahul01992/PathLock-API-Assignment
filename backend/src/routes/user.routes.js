import { Router } from "express";
import {
  createNewUser,
  retrieveAllUsers,
  retrieveUserDetails,
  softDeleteUser,
  updateUserDetails,
} from "../controllers/user.controllers.js";

const router = Router();

router.post("/", createNewUser);

router.get("/", retrieveAllUsers);

router.get("/:id", retrieveUserDetails);

router.put("/:id", updateUserDetails);

router.delete("/:id", softDeleteUser);

export default router;
