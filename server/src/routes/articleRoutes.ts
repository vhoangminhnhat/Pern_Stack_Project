import { Router } from "express";
import multer from "multer";
import {
    createArticle,
    deleteArticle,
    listArticles,
    updateArticle,
} from "../controllers/article/index.js";
import protectedRoutes from "../middlewares/protectedRoutes.js";

const upload = multer({ dest: "uploads/" });
const articleRouter = Router();

articleRouter.get("/", protectedRoutes as any, listArticles as any);
articleRouter.post(
  "/",
  protectedRoutes as any,
  upload.single("file"),
  createArticle as any
);
articleRouter.put(
  "/:id",
  protectedRoutes as any,
  upload.single("file"),
  updateArticle as any
);
articleRouter.delete("/:id", protectedRoutes as any, deleteArticle as any);

export default articleRouter;
