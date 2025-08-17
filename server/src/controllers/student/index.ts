import { Request, Response } from "express";
import prisma from "../../../database/db.js";
import { ErrorModel } from "../../dtos/baseApiResponseModel/BaseApiResponseModel.js";
import { getBaseErrorResponse } from "../../utils/helpers.js";
import axios from "axios";

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
        unpassedCourses
      } = req.body;
      
      const student = await prisma.student.create({
        data: { 
          studentId, 
          fullName, 
          gender, 
          birthDate,
          curricularUnits1stSemEnrolled: curricularUnits1stSemEnrolled || 0,
          curricularUnits1stSemApproved: curricularUnits1stSemApproved || 0,
          curricularUnits1stSemGrade: curricularUnits1stSemGrade || 0.0,
          curricularUnits2ndSemEnrolled: curricularUnits2ndSemEnrolled || 0,
          curricularUnits2ndSemApproved: curricularUnits2ndSemApproved || 0,
          curricularUnits2ndSemGrade: curricularUnits2ndSemGrade || 0.0,
          debtor: debtor || false,
          tuitionFeesUpToDate: tuitionFeesUpToDate !== undefined ? tuitionFeesUpToDate : true,
          totalEnrolled: totalEnrolled || 0,
          totalApproved: totalApproved || 0,
          totalFailed: totalFailed || 0,
          averageGrade: averageGrade || 0.0,
          unpassedCourses: unpassedCourses || 0
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
        unpassedCourses
      } = req.body;
      
      const student = await prisma.student.update({
        where: { id },
        data: { 
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
          unpassedCourses
        },
      });
      return res.status(200).json({ data: student, message: "Student updated" });
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
        Gender: student.gender === 'male' ? 0 : 1,
        "Curricular units 1st sem (enrolled)": student.curricularUnits1stSemEnrolled,
        "Curricular units 1st sem (approved)": student.curricularUnits1stSemApproved,
        "Curricular units 1st sem (grade)": student.curricularUnits1stSemGrade,
        "Curricular units 2nd sem (enrolled)": student.curricularUnits2ndSemEnrolled,
        "Curricular units 2nd sem (approved)": student.curricularUnits2ndSemApproved,
        "Curricular units 2nd sem (grade)": student.curricularUnits2ndSemGrade,
        "Debtor": student.debtor ? 1 : 0,
        "Tuition fees up to date": student.tuitionFeesUpToDate ? 1 : 0,
        "total_enrolled": student.totalEnrolled,
        "total_approved": student.totalApproved,
        "total_failed": student.totalFailed,
        "average_grade": student.averageGrade,
        "unpassed_courses": student.unpassedCourses,
      }));

      return res.status(200).json({ 
        data: formattedData, 
        message: "Dropout prediction data exported" 
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
          error: "studentIds array is required" 
        });
      }

      // Get student data for prediction
      const students = await prisma.student.findMany({
        where: {
          studentId: { in: studentIds }
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
          error: "No students found with the provided IDs" 
        });
      }

      // Format data for Python API
      const predictionData = students.map((student) => ({
        Gender: student.gender === 'male' ? 0 : 1,
        "Curricular units 1st sem (enrolled)": student.curricularUnits1stSemEnrolled,
        "Curricular units 1st sem (approved)": student.curricularUnits1stSemApproved,
        "Curricular units 1st sem (grade)": student.curricularUnits1stSemGrade,
        "Curricular units 2nd sem (enrolled)": student.curricularUnits2ndSemEnrolled,
        "Curricular units 2nd sem (approved)": student.curricularUnits2ndSemApproved,
        "Curricular units 2nd sem (grade)": student.curricularUnits2ndSemGrade,
        "Debtor": student.debtor ? 1 : 0,
        "Tuition fees up to date": student.tuitionFeesUpToDate ? 1 : 0,
        "total_enrolled": student.totalEnrolled,
        "total_approved": student.totalApproved,
        "total_failed": student.totalFailed,
        "average_grade": student.averageGrade,
        "unpassed_courses": student.unpassedCourses,
      }));

      // Call Python API for prediction
      const pythonApiUrl = process.env.PYTHON_API_URL || 'http://localhost:8000';
      const response = await axios.post(`${pythonApiUrl}/predict`, {
        data: predictionData
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

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
        message: "Dropout predictions completed successfully" 
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
          error: "Student not found" 
        });
      }

      return res.status(200).json({ 
        data: student, 
        message: "Student data retrieved" 
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
} = StudentController;
