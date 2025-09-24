import { Router } from "express";
import { SubjectController } from "../controllers/subject/index.js";
import { protectedRoutes } from "../middlewares/protectedRoutes.js";

const subjectRouter = Router();

subjectRouter.get("/", protectedRoutes as any, SubjectController.listSubjects as any);
subjectRouter.get("/:id", protectedRoutes as any, SubjectController.getSubject as any);
subjectRouter.post("/", protectedRoutes as any, SubjectController.createSubject as any);
subjectRouter.put("/:id", protectedRoutes as any, SubjectController.updateSubject as any);
subjectRouter.delete("/:id", protectedRoutes as any, SubjectController.deleteSubject as any);

export default subjectRouter;
