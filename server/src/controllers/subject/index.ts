import { Request, Response } from "express";
import prisma from "../../../database/db.js";
import { ErrorModel } from "../../dtos/baseApiResponseModel/BaseApiResponseModel.js";
import { getBaseErrorResponse } from "../../utils/helpers.js";

export class SubjectController {
  static async listSubjects(req: Request, res: Response) {
    try {
      const { name, code, page = 0, limit = 10 } = req.query;
      const filters: any = {};
      
      if (name && typeof name === "string") {
        filters.name = {
          contains: name,
          mode: "insensitive",
        };
      }

      if (code && typeof code === "string") {
        filters.code = {
          contains: code,
          mode: "insensitive",
        };
      }

      const pageNum = parseInt(page as string, 10) || 0;
      const limitNum = parseInt(limit as string, 10) || 10;
      const skip = pageNum * limitNum;

      const [subjects, total] = await Promise.all([
        prisma.subject.findMany({
          where: filters,
          skip,
          take: limitNum,
          orderBy: { name: "asc" },
          include: {
            _count: {
              select: {
                schedules: true,
                scores: true,
              },
            },
          },
        }),
        prisma.subject.count({ where: filters }),
      ]);

      return res.status(200).json({
        data: subjects,
        pagination: { page: pageNum, limit: limitNum, total },
        message: "Get subject list successfully",
      });
    } catch (error) {
      console.error("Error fetching subjects:", error);
      return getBaseErrorResponse(
        { code: 500, message: "Failed to fetch subjects" },
        res
      );
    }
  }

  static async getSubject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const subject = await prisma.subject.findUnique({
        where: { id },
        include: {
          schedules: {
            include: {
              teacher: {
                select: {
                  id: true,
                  fullName: true,
                  username: true,
                },
              },
            },
          },
          scores: {
            include: {
              student: {
                select: {
                  id: true,
                  fullName: true,
                  studentId: true,
                },
              },
            },
          },
          _count: {
            select: {
              schedules: true,
              scores: true,
            },
          },
        },
      });

      if (!subject) {
        return getBaseErrorResponse(
          { code: 404, message: "Subject not found" },
          res
        );
      }

      return res.status(200).json({
        data: subject,
        message: "Get subject successfully",
      });
    } catch (error) {
      console.error("Error fetching subject:", error);
      return getBaseErrorResponse(
        { code: 500, message: "Failed to fetch subject" },
        res
      );
    }
  }

  static async createSubject(req: Request, res: Response) {
    try {
      const { name, code } = req.body;

      if (!name || !code) {
        return getBaseErrorResponse(
          { code: 400, message: "Missing required fields: name, code" },
          res
        );
      }

      // Check if code already exists
      const existingSubject = await prisma.subject.findUnique({
        where: { code },
      });

      if (existingSubject) {
        return getBaseErrorResponse(
          { code: 400, message: "Subject code already exists" },
          res
        );
      }

      const subject = await prisma.subject.create({
        data: {
          name,
          code,
        },
        include: {
          _count: {
            select: {
              schedules: true,
              scores: true,
            },
          },
        },
      });

      return res.status(201).json({
        data: subject,
        message: "Subject created successfully",
      });
    } catch (error: any) {
      console.error("Error creating subject:", error);
      
      if (error.code === 'P2002') {
        return getBaseErrorResponse(
          { code: 400, message: "Subject code already exists" },
          res
        );
      }
      
      return getBaseErrorResponse(
        { code: 500, message: "Failed to create subject" },
        res
      );
    }
  }

  static async updateSubject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, code } = req.body;

      // Check if subject exists
      const existingSubject = await prisma.subject.findUnique({
        where: { id },
      });

      if (!existingSubject) {
        return getBaseErrorResponse(
          { code: 404, message: "Subject not found" },
          res
        );
      }

      // Check if code is being changed and if it already exists
      if (code && code !== existingSubject.code) {
        const codeExists = await prisma.subject.findUnique({
          where: { code },
        });

        if (codeExists) {
          return getBaseErrorResponse(
            { code: 400, message: "Subject code already exists" },
            res
          );
        }
      }

      const updateData: any = {};
      if (name) updateData.name = name;
      if (code) updateData.code = code;

      const subject = await prisma.subject.update({
        where: { id },
        data: updateData,
        include: {
          _count: {
            select: {
              schedules: true,
              scores: true,
            },
          },
        },
      });

      return res.status(200).json({
        data: subject,
        message: "Subject updated successfully",
      });
    } catch (error: any) {
      console.error("Error updating subject:", error);
      
      if (error.code === 'P2002') {
        return getBaseErrorResponse(
          { code: 400, message: "Subject code already exists" },
          res
        );
      }
      
      return getBaseErrorResponse(
        { code: 500, message: "Failed to update subject" },
        res
      );
    }
  }

  static async deleteSubject(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Check if subject exists
      const existingSubject = await prisma.subject.findUnique({
        where: { id },
      });

      if (!existingSubject) {
        return getBaseErrorResponse(
          { code: 404, message: "Subject not found" },
          res
        );
      }

      // Check if subject has schedules or scores
      const scheduleCount = await prisma.schedule.count({
        where: { subjectId: id },
      });

      const scoreCount = await prisma.score.count({
        where: { subjectId: id },
      });

      if (scheduleCount > 0 || scoreCount > 0) {
        return getBaseErrorResponse(
          { code: 400, message: "Cannot delete subject with existing schedules or scores. Please remove them first." },
          res
        );
      }

      await prisma.subject.delete({
        where: { id },
      });

      return res.status(200).json({
        message: "Subject deleted successfully",
      });
    } catch (error: any) {
      console.error("Error deleting subject:", error);
      
      if (error.code === 'P2003') {
        return getBaseErrorResponse(
          { code: 400, message: "Cannot delete subject due to existing relationships" },
          res
        );
      }
      
      return getBaseErrorResponse(
        { code: 500, message: "Failed to delete subject" },
        res
      );
    }
  }
}
