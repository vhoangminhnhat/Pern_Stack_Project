import { Request, Response } from "express";
import prisma from "../../../database/db.js";
import { ErrorModel } from "../../dtos/baseApiResponseModel/BaseApiResponseModel.js";
import { getBaseErrorResponse } from "../../utils/helpers.js";

export class StudentController {
  static async listStudents(req: Request, res: Response) {
    try {
      const students = await prisma.student.findMany({
        include: {
          scores: {
            include: {
              subject: true,
            },
          },
        },
      });
      return res
        .status(200)
        .json({ data: students, message: "List of students" });
    } catch (error) {
      return getBaseErrorResponse(error as ErrorModel, res);
    }
  }

  static async addStudent(req: Request, res: Response) {
    try {
      const { studentId, fullName, gender, birthDate } = req.body;
      const student = await prisma.student.create({
        data: { studentId, fullName, gender, birthDate },
      });
      return res.status(201).json({ data: student, message: "Student added" });
    } catch (error) {
      return getBaseErrorResponse(error as ErrorModel, res);
    }
  }

  static async addSubject(req: Request, res: Response) {
    try {
      const { code, name } = req.body;
      const subject = await prisma.subject.create({ data: { code, name } });
      return res.status(201).json({ data: subject, message: "Subject added" });
    } catch (error) {
      return getBaseErrorResponse(error as ErrorModel, res);
    }
  }

  static async addScore(req: Request, res: Response) {
    try {
      const { studentId, subjectId, value } = req.body;
      const score = await prisma.score.create({
        data: { studentId, subjectId, value },
      });
      return res.status(201).json({ data: score, message: "Score added" });
    } catch (error) {
      return getBaseErrorResponse(error as ErrorModel, res);
    }
  }

  static async exportForDropoutPrediction(req: Request, res: Response) {
    try {
      const students = await prisma.student.findMany({
        include: {
          scores: true,
        },
      });
      const data = students.map((student) => {
        const scoresObj: Record<string, number> = {};
        student.scores.forEach((score) => {
          scoresObj[score.subjectId] = score.value;
        });
        return {
          student_id: student.studentId,
          ...scoresObj,
        };
      });
      return res
        .status(200)
        .json({ data, message: "Exported for dropout prediction" });
    } catch (error) {
      return getBaseErrorResponse(error as ErrorModel, res);
    }
  }
}

export const {
  listStudents,
  addStudent,
  addSubject,
  addScore,
  exportForDropoutPrediction,
} = StudentController;
