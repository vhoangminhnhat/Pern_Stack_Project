import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import prisma from "../../../database/db.js";
import { IGetUserInfo } from "../../middlewares/protectedRoutes.js";
import { ErrorModel, getBaseErrorResponse } from "../../utils/helpers.js";

export const listArticles = async (req: IGetUserInfo, res: Response) => {
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
      data: {
        data: articles,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
        },
      },
      message: "Get article list successfully",
    });
  } catch (error) {
    return getBaseErrorResponse(error as ErrorModel, res);
  }
};

export const createArticle = async (req: IGetUserInfo, res: Response) => {
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
    let filePath = undefined;
    const file = (req as Request & { file?: Express.Multer.File }).file;
    if (file) {
      filePath = file.filename;
    }
    const article = await prisma.article.create({
      data: { name, code, url, file: filePath, userId: req.user.id },
    });
    return res.status(200).json({
      data: {
        data: article,
      },
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
};

export const updateArticle = async (req: IGetUserInfo, res: Response) => {
  try {
    const { id } = req.params;
    const { name, code, url } = req.body;
    let filePath = undefined;
    const file = (req as Request & { file?: Express.Multer.File }).file;
    // Only update if the article belongs to the user
    const old = await prisma.article.findUnique({ where: { id } });
    if (!old || old.userId !== req.user.id) {
      return getBaseErrorResponse({ code: 403, message: "Forbidden" }, res);
    }
    if (file) {
      filePath = file.filename;
      if (old.file) {
        const oldPath = path.join(__dirname, "../../uploads", old.file);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }
    const article = await prisma.article.update({
      where: { id },
      data: { name, code, url, ...(filePath && { file: filePath }) },
    });
    return res.status(200).json({
      data: {
        data: article,
      },
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
};

export const deleteArticle = async (req: IGetUserInfo, res: Response) => {
  try {
    const { id } = req.params;
    const article = await prisma.article.findUnique({ where: { id } });
    if (!article || article.userId !== req.user.id) {
      return getBaseErrorResponse({ code: 403, message: "Forbidden" }, res);
    }
    await prisma.article.delete({ where: { id } });
    // Delete file if exists
    if (article.file) {
      const filePath = path.join(__dirname, "../../uploads", article.file);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    return res.status(200).json({
      data: {
        data: article,
      },
      message: "Delete article successfully",
    });
  } catch (error) {
    return getBaseErrorResponse(error as ErrorModel, res);
  }
};
