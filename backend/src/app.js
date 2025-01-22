import express from "express";
import userRoutes from "./routes/user.routes/.js"
import roleRoutes from "./routes/role.routes.js";
import roleAssignRoutes from "./routes/roleAssign.routes.js"

const app = express();

app.use("/users", userRoutes);

app.use("/roles", roleRoutes);

app.use("/user-roles", roleAssignRoutes);

export default app;