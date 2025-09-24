import { Request, Response } from "express";
import prisma from "../../../database/db.js";
import { ErrorModel } from "../../dtos/baseApiResponseModel/BaseApiResponseModel.js";
import { getBaseErrorResponse } from "../../utils/helpers.js";

export class ScheduleController {
  static async listSchedules(req: Request, res: Response) {
    try {
      const { teacherId, subjectId, className, page = 0, limit = 10 } = req.query;
      const filters: any = {};
      if (teacherId) filters.teacherId = teacherId;
      if (subjectId) filters.subjectId = subjectId;
      if (className) filters.className = { contains: className, mode: "insensitive" };
      const pageNum = parseInt(page as string, 10) || 0;
      const limitNum = parseInt(limit as string, 10) || 10;
      const [schedules, total] = await Promise.all([
        prisma.schedule.findMany({
          where: filters,
          skip: pageNum * limitNum,
          take: limitNum,
          orderBy: { startTime: "asc" },
          include: {
            teacher: { select: { id: true, fullName: true } },
            subject: { select: { id: true, name: true, code: true } },
          },
        }),
        prisma.schedule.count({ where: filters }),
      ]);
      return res.status(200).json({
        data: schedules,
        pagination: { page: pageNum, limit: limitNum, total },
        message: "Get schedule list successfully",
      });
    } catch (error) {
      return getBaseErrorResponse(error as ErrorModel, res);
    }
  }

  static async createSchedule(req: Request, res: Response) {
    try {
      const { teacherId, subjectId, className, startTime, endTime, location, note } = req.body;
      if (!teacherId || !subjectId || !className || !startTime || !endTime) {
        return getBaseErrorResponse(
          { code: 400, message: "Missing required fields" },
          res
        );
      }

      // Validate that teacher exists
      const teacher = await prisma.user.findUnique({
        where: { id: teacherId }
      });
      if (!teacher) {
        return getBaseErrorResponse(
          { code: 400, message: "Teacher not found" },
          res
        );
      }

      // Validate that subject exists
      const subject = await prisma.subject.findUnique({
        where: { id: subjectId }
      });
      if (!subject) {
        return getBaseErrorResponse(
          { code: 400, message: "Subject not found" },
          res
        );
      }

      const schedule = await prisma.schedule.create({
        data: {
          teacherId,
          subjectId,
          className,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          location,
          note,
        },
      });
      return res.status(201).json({
        data: schedule,
        message: "Schedule created successfully",
      });
    } catch (error: any) {
      console.error("Error creating schedule:", error);
      
      // Handle Prisma foreign key constraint errors
      if (error.code === 'P2003') {
        return getBaseErrorResponse(
          { code: 400, message: "Invalid teacher or subject ID. Please check that both exist in the database." },
          res
        );
      }
      
      return getBaseErrorResponse(
        { code: 500, message: "Failed to create schedule" },
        res
      );
    }
  }

  static async updateSchedule(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { teacherId, subjectId, className, startTime, endTime, location, note } = req.body;
      const schedule = await prisma.schedule.update({
        where: { id },
        data: {
          teacherId,
          subjectId,
          className,
          startTime: startTime ? new Date(startTime) : undefined,
          endTime: endTime ? new Date(endTime) : undefined,
          location,
          note,
        },
      });
      return res.status(200).json({
        data: schedule,
        message: "Schedule updated successfully",
      });
    } catch (error) {
      return getBaseErrorResponse(error as ErrorModel, res);
    }
  }

  static async deleteSchedule(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.schedule.delete({ where: { id } });
      return res.status(200).json({ message: "Schedule deleted successfully" });
    } catch (error) {
      return getBaseErrorResponse(error as ErrorModel, res);
    }
  }
}
