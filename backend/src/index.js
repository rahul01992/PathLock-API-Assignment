import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import connectDB from "./configs/database.configs.js";
import app from "./app.js";
import { APP_NAME } from "./constants.js";

const PORT = process.env.PORT || 8000;

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`App is live at port no. ${PORT}`);
    })
})

app.get("/", (req, res) => {
    res.send(`<h2>${APP_NAME}</h2>`);
});