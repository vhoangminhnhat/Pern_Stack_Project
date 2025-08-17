import { Router } from "express";
import {
  addScore,
  addStudent,
  updateStudent,
  addSubject,
  exportForDropoutPrediction,
  getDropoutPredictionData,
  predictDropout,
  getStudentWithPrediction,
  listStudents,
} from "../controllers/student/index.js";
import { protectedRoutes } from "../middlewares/protectedRoutes.js";

const studentRouter = Router();

studentRouter.get("/", protectedRoutes as any, listStudents as any);
studentRouter.post("/add-student", protectedRoutes as any, addStudent as any);
studentRouter.put("/update-student/:id", protectedRoutes as any, updateStudent as any);
studentRouter.post("/add-subject", protectedRoutes as any, addSubject as any);
studentRouter.post("/add-score", protectedRoutes as any, addScore as any);
studentRouter.get(
  "/export-dropout-data",
  protectedRoutes as any,
  exportForDropoutPrediction as any
);
studentRouter.get(
  "/dropout-prediction-data",
  protectedRoutes as any,
  getDropoutPredictionData as any
);
studentRouter.post(
  "/predict-dropout",
  protectedRoutes as any,
  predictDropout as any
);
studentRouter.get(
  "/:studentId",
  protectedRoutes as any,
  getStudentWithPrediction as any
);

export default studentRouter;
