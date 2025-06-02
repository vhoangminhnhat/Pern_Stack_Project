import axios from "axios";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import prisma from "../../../database/db.js";
import { IGetUserInfo } from "../../middlewares/protectedRoutes.js";
import { ErrorModel, getBaseErrorResponse } from "../../utils/helpers.js";

export class ArticleController {
  async listArticles(req: IGetUserInfo, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return getBaseErrorResponse(
          { code: 401, message: "User not found or unauthorized" },
          res
        );
      }
      const { name, code, url, page = 0, limit = 10 } = req.query;
      const filters: any = { userId };
      if (name) filters.name = { contains: name, mode: "insensitive" };
      if (code) filters.code = { contains: code, mode: "insensitive" };
      if (url) filters.url = { contains: url, mode: "insensitive" };
      const pageNum = parseInt(page as string, 10) || 0;
      const limitNum = parseInt(limit as string, 10) || 10;
      const [articles, total] = await Promise.all([
        prisma.article.findMany({
          where: filters,
          skip: pageNum * limitNum,
          take: limitNum,
          orderBy: { createdAt: "desc" },
        }),
        prisma.article.count({ where: filters }),
      ]);
      return res.status(200).json({
        data: articles,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
        },
        message: "Get article list successfully",
      });
    } catch (error) {
      return getBaseErrorResponse(error as ErrorModel, res);
    }
  }

  async createArticle(req: IGetUserInfo, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return getBaseErrorResponse(
          { code: 401, message: "User not found or unauthorized" },
          res
        );
      }
      const { name, code, url } = req.body;
      if (!name || !code) {
        return getBaseErrorResponse(
          { code: 400, message: "Name and code are required" },
          res
        );
      }

      // Check if article with code already exists
      const existingArticle = await prisma.article.findFirst({
        where: { code, userId },
      });

      if (existingArticle) {
        return getBaseErrorResponse(
          { code: 400, message: "Article with this code already exists" },
          res
        );
      }

      let filePath = undefined;
      const file = (req as Request & { file?: Express.Multer.File }).file;
      if (file) {
        // Validate file type
        if (
          file.mimetype !== "application/pdf" &&
          file.mimetype !==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          return getBaseErrorResponse(
            { code: 400, message: "Only PDF and XLSX files are allowed" },
            res
          );
        }
        filePath = file.filename;
      }
      const article = await prisma.article.create({
        data: { name, code, url, file: filePath, userId: req.user.id },
      });
      return res.status(200).json({
        data: article,
        message: "Create article successfully",
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        return getBaseErrorResponse(
          { code: 400, message: "Code must be unique" },
          res
        );
      }
      return getBaseErrorResponse(error as ErrorModel, res);
    }
  }

  async updateArticle(req: IGetUserInfo, res: Response) {
    try {
      const { code } = req.params;
      const { name, url } = req.body;
      let filePath = undefined;
      const file = (req as Request & { file?: Express.Multer.File }).file;

      const old = await prisma.article.findFirst({
        where: {
          code,
          userId: req.user.id,
        },
      });

      if (!old) {
        return getBaseErrorResponse(
          { code: 404, message: "Article not found" },
          res
        );
      }

      if (file) {
        if (
          file.mimetype !== "application/pdf" &&
          file.mimetype !==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          return getBaseErrorResponse(
            { code: 400, message: "Only PDF and XLSX files are allowed" },
            res
          );
        }
        filePath = file.filename;
        if (old.file) {
          const oldPath = path.join(__dirname, "../../uploads", old.file);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
      }

      const article = await prisma.article.update({
        where: { id: old.id },
        data: { name, url, ...(filePath && { file: filePath }) },
      });

      return res.status(200).json({
        data: article,
        message: "Update article successfully",
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        return getBaseErrorResponse(
          { code: 400, message: "Code must be unique" },
          res
        );
      }
      return getBaseErrorResponse(error as ErrorModel, res);
    }
  }

  async deleteArticle(req: IGetUserInfo, res: Response) {
    try {
      const { code } = req.params;
      const article = await prisma.article.findFirst({
        where: {
          code,
          userId: req.user.id,
        },
      });

      if (!article) {
        return getBaseErrorResponse(
          { code: 404, message: "Article not found" },
          res
        );
      }

      await prisma.article.delete({ where: { id: article.id } });
      if (article.file) {
        const filePath = path.join(__dirname, "../../uploads", article.file);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
      return res.status(200).json({
        data: article,
        message: "Delete article successfully",
      });
    } catch (error) {
      return getBaseErrorResponse(error as ErrorModel, res);
    }
  }

  async summarizeArticle(req: IGetUserInfo, res: Response) {
    try {
      const { code, url, type } = req.query;

      if (!code || !url) {
        return getBaseErrorResponse(
          { code: 400, message: "Code and URL are required" },
          res
        );
      }

      if (!type || (type !== "summary" && type !== "relation")) {
        return getBaseErrorResponse(
          { code: 400, message: "Type must be summary or relation" },
          res
        );
      }

      const article = await prisma.article.findFirst({
        where: {
          code: code as string,
          userId: req.user.id,
        },
      });

      if (!article) {
        return getBaseErrorResponse(
          { code: 404, message: "Article not found" },
          res
        );
      }

      try {
        let summarizedPrompt = `As an academic research analyst, please provide a comprehensive analysis of the following academic article:

Article Title: ${article.name}
Article URL: ${url}

Please structure your analysis in the following sections:

1. Executive Summary (2-3 sentences)
   - Main research question or objective
   - Key findings or conclusions

2. Methodology Overview
   - Research approach
   - Data collection methods
   - Analysis techniques used

3. Key Contributions
   - Main theoretical contributions
   - Practical implications
   - Novel approaches or findings

4. Critical Analysis
   - Strengths of the research
   - Potential limitations
   - Areas for future research

Please ensure your analysis is clear, concise, and maintains academic rigor while being accessible to readers.`;
        let relationPrompt = `As an academic research assistant, please analyze the following article and suggest related academic works:

Article Title: ${article.name}
Article URL: ${url}

Please provide a list of related articles that:
1. Share similar research methodologies or approaches
2. Cover related topics or themes
3. Build upon or extend the findings
4. Present alternative viewpoints or contrasting perspectives
5. Are from the same field of study

For each related article suggestion, please explain briefly why it's relevant to the original article.

Format your response as a structured list with clear explanations for each recommendation.`;
        console.log(url);
        const response = await axios.post(
          "http://127.0.0.1:11434/api/generate",
          {
            model: "deepseek-r1:1.5b",
            prompt: type === "summary" ? summarizedPrompt : relationPrompt,
            stream: false,
          }
        );

        if (!response.data || !response.data.response) {
          throw new Error("Invalid response from Ollama API");
        }

        const cleanSummary = response.data.response
          .replace(/<think>/g, "")
          .replace(/<\/think>/g, "")
          .trim();

        return res.status(200).json({
          data: {
            summary: cleanSummary,
            article: article,
          },
          message: "Article summarized successfully",
        });
      } catch (ollamaError: any) {
        try {
          await axios.get("http://localhost:11434/api/tags");
        } catch (e) {
          return getBaseErrorResponse(
            {
              code: 503,
              message:
                "Ollama service is not running. Please start the Ollama service with 'ollama serve' command.",
            },
            res
          );
        }

        return getBaseErrorResponse(
          {
            code: 500,
            message:
              ollamaError.response?.data?.error ||
              "Failed to generate summary. Please try again.",
          },
          res
        );
      }
    } catch (error) {
      console.error("General error in summarizeArticle:", error);
      return getBaseErrorResponse(error as ErrorModel, res);
    }
  }
}

const articleController = new ArticleController();

export const {
  createArticle,
  deleteArticle,
  listArticles,
  summarizeArticle,
  updateArticle,
} = articleController;
