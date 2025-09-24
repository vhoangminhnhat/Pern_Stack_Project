import { Router } from "express";
import { ScheduleController } from "../controllers/schedule/index.js";
import { protectedRoutes } from "../middlewares/protectedRoutes.js";

const scheduleRouter = Router();

scheduleRouter.get("/", protectedRoutes as any, ScheduleController.listSchedules as any);
scheduleRouter.post("/", protectedRoutes as any, ScheduleController.createSchedule as any);
scheduleRouter.put("/:id", protectedRoutes as any, ScheduleController.updateSchedule as any);
scheduleRouter.delete("/:id", protectedRoutes as any, ScheduleController.deleteSchedule as any);

export default scheduleRouter;
