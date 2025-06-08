import { Router } from "express";
import verifyToken, { checkAdmin } from "../middleware/verifyToken.js";
import {
  createProblem,
  deleteProblem,
  getAllProblems,
  getProblemById,
  getSolvedProblems,
  updateProblem,
} from "../controllers/problem.controllers.js";

const problemRoutes = Router();

problemRoutes
  .route("/")
  .post(verifyToken, checkAdmin, createProblem)
  .get(verifyToken, getAllProblems);

problemRoutes
  .route("/:id")
  .get(verifyToken, getProblemById)
  .put(verifyToken, checkAdmin, updateProblem)
  .delete(verifyToken, checkAdmin, deleteProblem);

problemRoutes.get("/solved", verifyToken, getSolvedProblems);

export default problemRoutes;
