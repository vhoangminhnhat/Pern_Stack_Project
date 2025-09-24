import { Router } from "express";
import { TeacherController } from "../controllers/teacher/index.js";
import { protectedRoutes } from "../middlewares/protectedRoutes.js";

const teacherRouter = Router();

teacherRouter.get("/", protectedRoutes as any, TeacherController.listTeachers as any);
teacherRouter.get("/:id", protectedRoutes as any, TeacherController.getTeacher as any);
teacherRouter.post("/", protectedRoutes as any, TeacherController.createTeacher as any);
teacherRouter.put("/:id", protectedRoutes as any, TeacherController.updateTeacher as any);
teacherRouter.delete("/:id", protectedRoutes as any, TeacherController.deleteTeacher as any);

export default teacherRouter;
