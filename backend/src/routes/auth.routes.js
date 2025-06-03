import express from "express";
import {
  login,
  logout,
  me,
  register,
} from "../controllers/auth.controllers.js";
import verifyToken from "../middleware/verifyToken.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);

authRoutes.post("/login", login);

authRoutes.post("/logout", verifyToken, logout);

authRoutes.get("/me", verifyToken, me);

export default authRoutes;
