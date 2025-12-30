import { Router } from "express";
import multer from "multer";
import {
  createArticle,
  deleteArticle,
  downloadFile,
  listArticles,
  summarizeArticle,
  updateArticle,
} from "../controllers/article/index.js";
import { protectedRoutes } from "../middlewares/protectedRoutes.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and XLSX files are allowed"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

const articleRouter = Router();

articleRouter.get("/", protectedRoutes as any, listArticles as any);
articleRouter.get(
  "/summarize",
  protectedRoutes as any,
  summarizeArticle as any
);
articleRouter.get(
  "/download/:filename",
  protectedRoutes as any,
  downloadFile as any
);
articleRouter.post(
  "/create",
  protectedRoutes as any,
  upload.single("file"),
  createArticle as any
);
articleRouter.put(
  "/update",
  protectedRoutes as any,
  upload.single("file"),
  updateArticle as any
);
articleRouter.delete("/delete", protectedRoutes as any, deleteArticle as any);

export default articleRouter;
