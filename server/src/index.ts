import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import articleRouter from "./routes/articleRoutes.js";
import authRouter from "./routes/Authentication.js";
import chatRouter from "./routes/ChatMessages.js";
import myProfileRouter from "./routes/MyProfile.js";
import studentRouter from "./routes/StudentRoutes.js";
import scheduleRouter from "./routes/ScheduleRoutes.js";
import teacherRouter from "./routes/TeacherRoutes.js";
import subjectRouter from "./routes/SubjectRoutes.js";
import { getAppApiBase } from "./utils/helpers.js";

dotenv.config();

const app = express();

//Parser
app.use(express.json());
app.use(cookieParser());

//Prevent CORS
app.use(
  cors({
    origin: "http://localhost:3000", // FE
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Disposition"],
    credentials: true,
  })
);

//Preflight
app.options("*", cors());
//Routes
app.use(getAppApiBase("article"), articleRouter);
app.use(getAppApiBase("authen"), authRouter);
app.use(getAppApiBase("chat-messages"), chatRouter);
app.use(getAppApiBase("personal"), myProfileRouter);
app.use(getAppApiBase("students"), studentRouter);
app.use(getAppApiBase("schedules"), scheduleRouter);
app.use(getAppApiBase("teachers"), teacherRouter);
app.use(getAppApiBase("subjects"), subjectRouter);

//Server starting
console.log("DATABASE_URL used by server:", process.env.DATABASE_URL);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
