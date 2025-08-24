import axios from "axios";
import { Request, Response } from "express";
import FormData from "form-data";
import path from "path";
import XLSX from "xlsx";
import prisma from "../../../database/db.js";
import { ErrorModel } from "../../dtos/baseApiResponseModel/BaseApiResponseModel.js";
import { getBaseErrorResponse } from "../../utils/helpers.js";

export class StudentController {
  static async listStudents(req: Request, res: Response) {
    try {
      const { fullName, gender, studentId, page, limit } = req.query;
      const whereClause: any = {};

      if (fullName && typeof fullName === "string") {
        whereClause.fullName = {
          contains: fullName,
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
        whereClause.gender = genderLower;
      }

      if (studentId && typeof studentId === "string") {
        whereClause.studentId = {
          contains: studentId,
          mode: "insensitive",
        };
      }

      // Pagination logic
      const pageNum = parseInt(page as string, 10) || 0;
      const limitNum = parseInt(limit as string, 10) || 10;
      const skip = pageNum * limitNum;

      // Get total count for pagination info
      const totalStudents = await prisma.student.count({
        where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
      });

      const students = await prisma.student.findMany({
        where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
        include: {
          scores: {
            include: {
              subject: true,
            },
          },
        },
        skip,
        take: limitNum,
      });

      return res.status(200).json({
        data: students,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: totalStudents,
        },
        message: "List of students",
        filters: {
          fullName: fullName || null,
          gender: gender || null,
          studentId: studentId || null,
        },
      });
    } catch (error) {
      return getBaseErrorResponse(error as ErrorModel, res);
    }
  }

  static async addStudent(req: Request, res: Response) {
    try {
      const {
        studentId,
        fullName,
        gender,
        birthDate,
        curricularUnits1stSemEnrolled,
        curricularUnits1stSemApproved,
        curricularUnits1stSemGrade,
        curricularUnits2ndSemEnrolled,
        curricularUnits2ndSemApproved,
        curricularUnits2ndSemGrade,
        debtor,
        tuitionFeesUpToDate,
        totalEnrolled,
        totalApproved,
        totalFailed,
        averageGrade,
        unpassedCourses,
      } = req.body;

      // Validate numeric fields
      if (curricularUnits1stSemGrade && (curricularUnits1stSemGrade < 0 || curricularUnits1stSemGrade > 20)) {
        return res.status(400).json({
          error: "First semester grade must be between 0 and 20",
        });
      }

      if (curricularUnits2ndSemGrade && (curricularUnits2ndSemGrade < 0 || curricularUnits2ndSemGrade > 20)) {
        return res.status(400).json({
          error: "Second semester grade must be between 0 and 20",
        });
      }

      if (averageGrade && (averageGrade < 0 || averageGrade > 20)) {
        return res.status(400).json({
          error: "Average grade must be between 0 and 20",
        });
      }

      // Convert birthDate string to Date object if provided
      let birthDateObj: Date | undefined = undefined;
      if (birthDate) {
        const parsedDate = new Date(birthDate);
        if (isNaN(parsedDate.getTime())) {
          return res.status(400).json({
            error: "Invalid birthDate format. Please use YYYY-MM-DD format.",
          });
        }
        birthDateObj = parsedDate;
      }

      const student = await prisma.student.create({
        data: {
          studentId,
          fullName,
          gender,
          birthDate: birthDateObj,
          curricularUnits1stSemEnrolled: curricularUnits1stSemEnrolled || 0,
          curricularUnits1stSemApproved: curricularUnits1stSemApproved || 0,
          curricularUnits1stSemGrade: curricularUnits1stSemGrade || 0.0,
          curricularUnits2ndSemEnrolled: curricularUnits2ndSemEnrolled || 0,
          curricularUnits2ndSemApproved: curricularUnits2ndSemApproved || 0,
          curricularUnits2ndSemGrade: curricularUnits2ndSemGrade || 0.0,
          debtor: debtor || false,
          tuitionFeesUpToDate:
            tuitionFeesUpToDate !== undefined ? tuitionFeesUpToDate : true,
          totalEnrolled: totalEnrolled || 0,
          totalApproved: totalApproved || 0,
          totalFailed: totalFailed || 0,
          averageGrade: averageGrade || 0.0,
          unpassedCourses: unpassedCourses || 0,
        },
      });
      return res.status(201).json({ data: student, message: "Student added" });
    } catch (error) {
      return getBaseErrorResponse(error as ErrorModel, res);
    }
  }

  static async updateStudent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        fullName,
        gender,
        birthDate,
        curricularUnits1stSemEnrolled,
        curricularUnits1stSemApproved,
        curricularUnits1stSemGrade,
        curricularUnits2ndSemEnrolled,
        curricularUnits2ndSemApproved,
        curricularUnits2ndSemGrade,
        debtor,
        tuitionFeesUpToDate,
        totalEnrolled,
        totalApproved,
        totalFailed,
        averageGrade,
        unpassedCourses,
      } = req.body;

      // Validate numeric fields
      if (curricularUnits1stSemGrade && (curricularUnits1stSemGrade < 0 || curricularUnits1stSemGrade > 20)) {
        return res.status(400).json({
          error: "First semester grade must be between 0 and 20",
        });
      }

      if (curricularUnits2ndSemGrade && (curricularUnits2ndSemGrade < 0 || curricularUnits2ndSemGrade > 20)) {
        return res.status(400).json({
          error: "Second semester grade must be between 0 and 20",
        });
      }

      if (averageGrade && (averageGrade < 0 || averageGrade > 20)) {
        return res.status(400).json({
          error: "Average grade must be between 0 and 20",
        });
      }

      // Convert birthDate string to Date object if provided
      let birthDateObj: Date | undefined = undefined;
      if (birthDate) {
        const parsedDate = new Date(birthDate);
        if (isNaN(parsedDate.getTime())) {
          return res.status(400).json({
            error: "Invalid birthDate format. Please use YYYY-MM-DD format.",
          });
        }
        birthDateObj = parsedDate;
      }

      const student = await prisma.student.update({
        where: { id },
        data: {
          fullName,
          gender,
          birthDate: birthDateObj,
          curricularUnits1stSemEnrolled,
          curricularUnits1stSemApproved,
          curricularUnits1stSemGrade,
          curricularUnits2ndSemEnrolled,
          curricularUnits2ndSemApproved,
          curricularUnits2ndSemGrade,
          debtor,
          tuitionFeesUpToDate,
          totalEnrolled,
          totalApproved,
          totalFailed,
          averageGrade,
          unpassedCourses,
        },
      });
      return res
        .status(200)
        .json({ data: student, message: "Student updated" });
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

  static async getDropoutPredictionData(req: Request, res: Response) {
    try {
      const students = await prisma.student.findMany({
        select: {
          studentId: true,
          fullName: true,
          gender: true,
          curricularUnits1stSemEnrolled: true,
          curricularUnits1stSemApproved: true,
          curricularUnits1stSemGrade: true,
          curricularUnits2ndSemEnrolled: true,
          curricularUnits2ndSemApproved: true,
          curricularUnits2ndSemGrade: true,
          debtor: true,
          tuitionFeesUpToDate: true,
          totalEnrolled: true,
          totalApproved: true,
          totalFailed: true,
          averageGrade: true,
          unpassedCourses: true,
        },
      });

      const formattedData = students.map((student) => ({
        Gender: student.gender === "male" ? 0 : 1,
        "Curricular units 1st sem (enrolled)":
          student.curricularUnits1stSemEnrolled,
        "Curricular units 1st sem (approved)":
          student.curricularUnits1stSemApproved,
        "Curricular units 1st sem (grade)": student.curricularUnits1stSemGrade,
        "Curricular units 2nd sem (enrolled)":
          student.curricularUnits2ndSemEnrolled,
        "Curricular units 2nd sem (approved)":
          student.curricularUnits2ndSemApproved,
        "Curricular units 2nd sem (grade)": student.curricularUnits2ndSemGrade,
        Debtor: student.debtor ? 1 : 0,
        "Tuition fees up to date": student.tuitionFeesUpToDate ? 1 : 0,
        total_enrolled: student.totalEnrolled,
        total_approved: student.totalApproved,
        total_failed: student.totalFailed,
        average_grade: student.averageGrade,
        unpassed_courses: student.unpassedCourses,
      }));

      return res.status(200).json({
        data: formattedData,
        message: "Dropout prediction data exported",
      });
    } catch (error) {
      return getBaseErrorResponse(error as ErrorModel, res);
    }
  }

  static async predictDropout(req: Request, res: Response) {
    try {
      const { studentIds } = req.body;

      if (!studentIds || !Array.isArray(studentIds)) {
        return res.status(400).json({
          error: "studentIds array is required",
        });
      }

      // Get student data for prediction
      const students = await prisma.student.findMany({
        where: {
          studentId: { in: studentIds },
        },
        select: {
          studentId: true,
          fullName: true,
          gender: true,
          curricularUnits1stSemEnrolled: true,
          curricularUnits1stSemApproved: true,
          curricularUnits1stSemGrade: true,
          curricularUnits2ndSemEnrolled: true,
          curricularUnits2ndSemApproved: true,
          curricularUnits2ndSemGrade: true,
          debtor: true,
          tuitionFeesUpToDate: true,
          totalEnrolled: true,
          totalApproved: true,
          totalFailed: true,
          averageGrade: true,
          unpassedCourses: true,
        },
      });

      if (students.length === 0) {
        return res.status(404).json({
          error: "No students found with the provided IDs",
        });
      }

      // Format data for Python API
      const predictionData = students.map((student) => ({
        Gender: student.gender === "male" ? 0 : 1,
        "Curricular units 1st sem (enrolled)":
          student.curricularUnits1stSemEnrolled,
        "Curricular units 1st sem (approved)":
          student.curricularUnits1stSemApproved,
        "Curricular units 1st sem (grade)": student.curricularUnits1stSemGrade,
        "Curricular units 2nd sem (enrolled)":
          student.curricularUnits2ndSemEnrolled,
        "Curricular units 2nd sem (approved)":
          student.curricularUnits2ndSemApproved,
        "Curricular units 2nd sem (grade)": student.curricularUnits2ndSemGrade,
        Debtor: student.debtor ? 1 : 0,
        "Tuition fees up to date": student.tuitionFeesUpToDate ? 1 : 0,
        total_enrolled: student.totalEnrolled,
        total_approved: student.totalApproved,
        total_failed: student.totalFailed,
        average_grade: student.averageGrade,
        unpassed_courses: student.unpassedCourses,
      }));

      // Call Python API for prediction
      const pythonApiUrl =
        process.env.PYTHON_API_URL || "http://localhost:8000";
      const response = await axios.post(
        `${pythonApiUrl}/predict`,
        {
          data: predictionData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const predictionResult = response.data;
      const predictions = predictionResult.predictions;

      // Update students with prediction results
      const updatePromises = students.map((student, index) =>
        prisma.student.update({
          where: { studentId: student.studentId },
          data: {
            dropoutPrediction: predictions[index],
            dropoutPredictionDate: new Date(),
          },
        })
      );

      await Promise.all(updatePromises);

      // Return results with student info
      const results = students.map((student, index) => ({
        studentId: student.studentId,
        fullName: student.fullName,
        dropoutPrediction: predictions[index],
        predictionDate: new Date(),
      }));

      return res.status(200).json({
        data: results,
        message: "Dropout predictions completed successfully",
      });
    } catch (error) {
      return getBaseErrorResponse(error as ErrorModel, res);
    }
  }

  static async getStudentWithPrediction(req: Request, res: Response) {
    try {
      const { studentId } = req.params;

      const student = await prisma.student.findUnique({
        where: { studentId },
        include: {
          scores: {
            include: {
              subject: true,
            },
          },
        },
      });

      if (!student) {
        return res.status(404).json({
          error: "Student not found",
        });
      }

      return res.status(200).json({
        data: student,
        message: "Student data retrieved",
      });
    } catch (error) {
      return getBaseErrorResponse(error as ErrorModel, res);
    }
  }

  static async predictDropoutFromFile(req: Request, res: Response) {
    try {
      const uploadedFile = (req as any).file as Express.Multer.File | undefined;
      if (!uploadedFile) {
        return res
          .status(400)
          .json({ error: "file is required (field name: 'file')" });
      }

      const pythonApiUrl =
        process.env.PYTHON_API_URL || "http://localhost:8000";

      let fileBuffer = uploadedFile.buffer as Buffer;
      let fileNameToSend = uploadedFile.originalname || "upload.csv";
      const fileExtension = path.extname(fileNameToSend).toLowerCase();
      if (fileExtension === ".xlsx" || fileExtension === ".xls") {
        const workbook = XLSX.read(fileBuffer, { type: "buffer" });
        const firstSheetName = workbook.SheetNames[0];
        const firstSheet = workbook.Sheets[firstSheetName];
        const csvString = XLSX.utils.sheet_to_csv(firstSheet);
        fileBuffer = Buffer.from(csvString, "utf8");
        fileNameToSend = "upload.csv";
      }

      const form = new FormData();
      form.append("file", fileBuffer, {
        filename: fileNameToSend,
        contentType: "text/csv",
      } as any);

      const response = await axios.post(`${pythonApiUrl}/predict-file`, form, {
        headers: {
          ...form.getHeaders(),
        },
        maxBodyLength: Infinity,
      });

      const result = response.data as {
        student_ids: (string | number)[];
        predictions: number[];
      };

      // Try to persist predictions back to DB for existing students
      const updatePromises = (result.student_ids || []).map((sid, index) => {
        return prisma.student
          .update({
            where: { studentId: String(sid) },
            data: {
              dropoutPrediction: result.predictions[index],
              dropoutPredictionDate: new Date(),
            },
          })
          .catch(() => null);
      });

      await Promise.all(updatePromises);

      const combined = (result.student_ids || []).map((sid, index) => ({
        studentId: String(sid),
        dropoutPrediction: result.predictions[index],
      }));

      return res.status(200).json({
        data: combined,
        message: "Dropout predictions from file completed successfully",
      });
    } catch (error) {
      return getBaseErrorResponse(error as ErrorModel, res);
    }
  }
}

export const {
  listStudents,
  addStudent,
  updateStudent,
  addSubject,
  addScore,
  exportForDropoutPrediction,
  getDropoutPredictionData,
  predictDropout,
  getStudentWithPrediction,
  predictDropoutFromFile,
} = StudentController;
