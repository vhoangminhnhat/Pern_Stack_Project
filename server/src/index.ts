import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import articleRouter from "./routes/articleRoutes.js";
import authRouter from "./routes/Authentication.js";
import chatRouter from "./routes/ChatMessages.js";
import myProfileRouter from "./routes/MyProfile.js";
import studentRouter from "./routes/StudentRoutes.js";
import { getAppApiBase } from "./utils/helpers.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

app.use(cookieParser());

app.use(getAppApiBase("article"), articleRouter);

app.use(getAppApiBase("authen"), authRouter);

app.use(getAppApiBase("chat-messages"), chatRouter);

app.use(getAppApiBase("personal"), myProfileRouter);

app.use(getAppApiBase("students"), studentRouter);

console.log("DATABASE_URL used by server:", process.env.DATABASE_URL);
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
