import { Router } from "express";
import { 
    addRole,
    deleteRole,
    getRoleDetails,
    listAllRoles,
    updateRoleDetails,
} from "../controllers/role.controllers.js";

const router = Router();

router.post("/", addRole);

router.get("/", listAllRoles);

router.get("/:id", getRoleDetails);

router.put("/:id", updateRoleDetails);

router.delete("/:id", deleteRole);

export default router;