import { Router } from "express";
import {
  addScore,
  addStudent,
  addSubject,
  exportForDropoutPrediction,
  listStudents,
} from "../controllers/student/index.js";
import { protectedRoutes } from "../middlewares/protectedRoutes.js";

const studentRouter = Router();

studentRouter.get("/", protectedRoutes as any, listStudents as any);
studentRouter.post("/add-student", protectedRoutes as any, addStudent as any);
studentRouter.post("/add-subject", protectedRoutes as any, addSubject as any);
studentRouter.post("/add-score", protectedRoutes as any, addScore as any);
studentRouter.get(
  "/export-dropout-data",
  protectedRoutes as any,
  exportForDropoutPrediction as any
);

export default studentRouter;
