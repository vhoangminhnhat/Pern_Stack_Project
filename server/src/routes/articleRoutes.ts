import { Router } from "express";
import multer from "multer";
import {
  createArticle,
  deleteArticle,
  listArticles,
  updateArticle,
} from "../controllers/article/index.js";
import protectedRoutes from "../middlewares/protectedRoutes.js";
import { getAppApiBase } from "../utils/helpers.js";

const upload = multer({ dest: "uploads/" });
const articleRouter = Router();

articleRouter.get(
  getAppApiBase(""),
  protectedRoutes as any,
  listArticles as any
);
articleRouter.post(
  getAppApiBase(""),
  protectedRoutes as any,
  upload.single("file"),
  createArticle as any
);
articleRouter.put(
  getAppApiBase(":id"),
  protectedRoutes as any,
  upload.single("file"),
  updateArticle as any
);
articleRouter.delete(
  getAppApiBase(":id"),
  protectedRoutes as any,
  deleteArticle as any
);

export default articleRouter;
