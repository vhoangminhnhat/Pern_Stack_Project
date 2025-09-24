import { Request, Response } from "express";
import prisma from "../../../database/db.js";
import { ErrorModel } from "../../dtos/baseApiResponseModel/BaseApiResponseModel.js";
import { getBaseErrorResponse } from "../../utils/helpers.js";

export class TeacherController {
  static async listTeachers(req: Request, res: Response) {
    try {
      const { fullName, username, gender, page = 0, limit = 10 } = req.query;
      const filters: any = {};
      
      if (fullName && typeof fullName === "string") {
        filters.fullName = {
          contains: fullName,
          mode: "insensitive",
        };
      }

      if (username && typeof username === "string") {
        filters.username = {
          contains: username,
          mode: "insensitive",
        };
      }

      if (gender && typeof gender === "string") {
        const genderLower = gender.toLowerCase();
        if (genderLower !== "male" && genderLower !== "female") {
          return getBaseErrorResponse(
            {
              code: 400,
              message: "Gender parameter must be 'male' or 'female'",
            },
            res
          );
        }
        filters.gender = genderLower;
      }

      const pageNum = parseInt(page as string, 10) || 0;
      const limitNum = parseInt(limit as string, 10) || 10;
      const skip = pageNum * limitNum;

      // Add role filter to only show teachers
      filters.role = "TEACHER";

      const [teachers, total] = await Promise.all([
        prisma.user.findMany({
          where: filters,
          skip,
          take: limitNum,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            username: true,
            fullName: true,
            gender: true,
            profileAvatar: true,
            role: true,
            code: true,
            birthDay: true,
            placeOfOrigin: true,
            identifyCard: true,
            religion: true,
            createdAt: true,
            updatedAt: true,
          },
        }),
        prisma.user.count({ where: filters }),
      ]);

      return res.status(200).json({
        data: teachers,
        pagination: { page: pageNum, limit: limitNum, total },
        message: "Get teacher list successfully",
      });
    } catch (error) {
      console.error("Error fetching teachers:", error);
      return getBaseErrorResponse(
        { code: 500, message: "Failed to fetch teachers" },
        res
      );
    }
  }

  static async getTeacher(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const teacher = await prisma.user.findFirst({
        where: { 
          id,
          role: "TEACHER"
        },
        select: {
          id: true,
          username: true,
          fullName: true,
          gender: true,
          profileAvatar: true,
          role: true,
          code: true,
          birthDay: true,
          placeOfOrigin: true,
          identifyCard: true,
          dateOfIssue: true,
          placeOfIssue: true,
          religion: true,
          createdAt: true,
          updatedAt: true,
          schedules: {
            include: {
              subject: {
                select: {
                  id: true,
                  name: true,
                  code: true,
                },
              },
            },
          },
        },
      });

      if (!teacher) {
        return getBaseErrorResponse(
          { code: 404, message: "Teacher not found" },
          res
        );
      }

      return res.status(200).json({
        data: teacher,
        message: "Get teacher successfully",
      });
    } catch (error) {
      console.error("Error fetching teacher:", error);
      return getBaseErrorResponse(
        { code: 500, message: "Failed to fetch teacher" },
        res
      );
    }
  }

  static async createTeacher(req: Request, res: Response) {
    try {
      const {
        username,
        fullName,
        password,
        gender,
        profileAvatar,
        code,
        birthDay,
        placeOfOrigin,
        identifyCard,
        dateOfIssue,
        placeOfIssue,
        religion,
      } = req.body;

      if (!username || !fullName || !password || !gender) {
        return getBaseErrorResponse(
          { code: 400, message: "Missing required fields: username, fullName, password, gender" },
          res
        );
      }

      // Check if username already exists
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUser) {
        return getBaseErrorResponse(
          { code: 400, message: "Username already exists" },
          res
        );
      }

      const teacher = await prisma.user.create({
        data: {
          username,
          fullName,
          password, // In production, this should be hashed
          gender,
          profileAvatar,
          role: "TEACHER",
          code,
          birthDay: birthDay ? new Date(birthDay) : undefined,
          placeOfOrigin,
          identifyCard,
          dateOfIssue: dateOfIssue ? new Date(dateOfIssue) : undefined,
          placeOfIssue,
          religion,
        },
        select: {
          id: true,
          username: true,
          fullName: true,
          gender: true,
          profileAvatar: true,
          role: true,
          code: true,
          birthDay: true,
          placeOfOrigin: true,
          identifyCard: true,
          dateOfIssue: true,
          placeOfIssue: true,
          religion: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return res.status(201).json({
        data: teacher,
        message: "Teacher created successfully",
      });
    } catch (error: any) {
      console.error("Error creating teacher:", error);
      
      if (error.code === 'P2002') {
        return getBaseErrorResponse(
          { code: 400, message: "Username or code already exists" },
          res
        );
      }
      
      return getBaseErrorResponse(
        { code: 500, message: "Failed to create teacher" },
        res
      );
    }
  }

  static async updateTeacher(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        username,
        fullName,
        password,
        gender,
        profileAvatar,
        code,
        birthDay,
        placeOfOrigin,
        identifyCard,
        dateOfIssue,
        placeOfIssue,
        religion,
      } = req.body;

      // Check if teacher exists
      const existingTeacher = await prisma.user.findFirst({
        where: { 
          id,
          role: "TEACHER"
        },
      });

      if (!existingTeacher) {
        return getBaseErrorResponse(
          { code: 404, message: "Teacher not found" },
          res
        );
      }

      // Check if username is being changed and if it already exists
      if (username && username !== existingTeacher.username) {
        const usernameExists = await prisma.user.findUnique({
          where: { username },
        });

        if (usernameExists) {
          return getBaseErrorResponse(
            { code: 400, message: "Username already exists" },
            res
          );
        }
      }

      const updateData: any = {};
      if (username) updateData.username = username;
      if (fullName) updateData.fullName = fullName;
      if (password) updateData.password = password; // In production, this should be hashed
      if (gender) updateData.gender = gender;
      if (profileAvatar !== undefined) updateData.profileAvatar = profileAvatar;
      if (code !== undefined) updateData.code = code;
      if (birthDay) updateData.birthDay = new Date(birthDay);
      if (placeOfOrigin !== undefined) updateData.placeOfOrigin = placeOfOrigin;
      if (identifyCard !== undefined) updateData.identifyCard = identifyCard;
      if (dateOfIssue) updateData.dateOfIssue = new Date(dateOfIssue);
      if (placeOfIssue !== undefined) updateData.placeOfIssue = placeOfIssue;
      if (religion !== undefined) updateData.religion = religion;

      const teacher = await prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          username: true,
          fullName: true,
          gender: true,
          profileAvatar: true,
          code: true,
          birthDay: true,
          placeOfOrigin: true,
          identifyCard: true,
          dateOfIssue: true,
          placeOfIssue: true,
          religion: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return res.status(200).json({
        data: teacher,
        message: "Teacher updated successfully",
      });
    } catch (error: any) {
      console.error("Error updating teacher:", error);
      
      if (error.code === 'P2002') {
        return getBaseErrorResponse(
          { code: 400, message: "Username or code already exists" },
          res
        );
      }
      
      return getBaseErrorResponse(
        { code: 500, message: "Failed to update teacher" },
        res
      );
    }
  }

  static async deleteTeacher(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Check if teacher exists
      const existingTeacher = await prisma.user.findFirst({
        where: { 
          id,
          role: "TEACHER"
        },
      });

      if (!existingTeacher) {
        return getBaseErrorResponse(
          { code: 404, message: "Teacher not found" },
          res
        );
      }

      // Check if teacher has any relationships
      const [scheduleCount, articleCount, messageCount, conversationCount] = await Promise.all([
        prisma.schedule.count({ where: { teacherId: id } }),
        prisma.article.count({ where: { userId: id } }),
        prisma.messages.count({ where: { senderId: id } }),
        prisma.conversations.count({ where: { participantsId: { has: id } } }),
      ]);

      const totalRelationships = scheduleCount + articleCount + messageCount + conversationCount;

      if (totalRelationships > 0) {
        const relationshipDetails = [];
        if (scheduleCount > 0) relationshipDetails.push(`${scheduleCount} schedule(s)`);
        if (articleCount > 0) relationshipDetails.push(`${articleCount} article(s)`);
        if (messageCount > 0) relationshipDetails.push(`${messageCount} message(s)`);
        if (conversationCount > 0) relationshipDetails.push(`${conversationCount} conversation(s)`);

        return getBaseErrorResponse(
          { 
            code: 400, 
            message: `Cannot delete teacher with existing relationships: ${relationshipDetails.join(', ')}. Please remove these relationships first.` 
          },
          res
        );
      }

      await prisma.user.delete({
        where: { id },
      });

      return res.status(200).json({
        message: "Teacher deleted successfully",
      });
    } catch (error: any) {
      console.error("Error deleting teacher:", error);
      
      if (error.code === 'P2003') {
        return getBaseErrorResponse(
          { code: 400, message: "Cannot delete teacher due to existing relationships" },
          res
        );
      }
      
      return getBaseErrorResponse(
        { code: 500, message: "Failed to delete teacher" },
        res
      );
    }
  }
}
