import express from "express";
import fileUpload from "express-fileupload";
import userRoutes from "./routes/user.routes.js";
import roleRoutes from "./routes/role.routes.js";
import roleAssignRoutes from "./routes/roleAssign.routes.js";

const app = express();

app.use(express.json({ limit: "16kb " }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(fileUpload());

app.use("/users", userRoutes);

app.use("/roles", roleRoutes);

app.use("/user-roles", roleAssignRoutes);

export default app;
