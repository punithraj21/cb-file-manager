import express from "express";
import dotenv from "dotenv";

import fileManagerRoutes from "./src/routes/fileManagerRoutes";
import userRoutes from "./src/routes/userRoutes";
import { authenticateToken } from "./src/middlewares/authMiddleware";
import multer from "./src/utils/multer";

// configures dotenv to work in your application
dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (request, response) => {
  response.status(200).send("File Manager is UP!");
});
app.use(express.json());
app.use("/auth", userRoutes);
app.use("/api", authenticateToken, multer.single("file"), fileManagerRoutes);

app.listen(PORT, () => {
  console.log("Server running at PORT: ", PORT);
});
