import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import prisma from "../../../database/db.js";
import { IGetUserInfo } from "../../middlewares/protectedRoutes.js";
import { ErrorModel, getBaseErrorResponse } from "../../utils/helpers.js";

export const listArticles = async (req: IGetUserInfo, res: Response) => {
  try {
    const articles = await prisma.article.findMany({
      where: { userId: req.user.id },
    });
    return res.json(articles);
  } catch (error) {
    return getBaseErrorResponse(error as ErrorModel, res);
  }
};

export const createArticle = async (req: IGetUserInfo, res: Response) => {
  try {
    const { name, code, url } = req.body;
    if (!name || !code) {
      return getBaseErrorResponse(
        { code: 400, message: "Name and code are required" },
        res
      );
    }
    // File upload
    let filePath = undefined;
    const file = (req as Request & { file?: Express.Multer.File }).file;
    if (file) {
      filePath = file.filename;
    }
    const article = await prisma.article.create({
      data: { name, code, url, file: filePath, userId: req.user.id },
    });
    return res.status(201).json(article);
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
    return res.json(article);
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
    return res.json({ message: "Article deleted" });
  } catch (error) {
    return getBaseErrorResponse(error as ErrorModel, res);
  }
};
