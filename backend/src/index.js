import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

import authRoutes from "./routes/auth.routes.js";
import healthCheck from "./controllers/health.controllers.js";
import problemRoutes from "./routes/problem.routes.js";

app.use("/api/v1/health", healthCheck);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problems", problemRoutes);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`);
});
