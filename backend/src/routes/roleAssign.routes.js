import { Router } from "express";
import {
  assignRole,
  deleteRoleAssign,
  listRoleAssigns,
} from "../controllers/roleAssign.controllers.js";

const router = Router();

router.post("/", assignRole);

router.get("/", listRoleAssigns);

router.delete("/:id", deleteRoleAssign);

export default router;
