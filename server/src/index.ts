import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import authRouter from "./routes/Authentication.js";
import chatRouter from "./routes/ChatMessages.js";
import myProfileRouter from "./routes/MyProfile.js";
import { getAppApiBase } from "./utils/helpers.js";

dotenv.config();

const app = express();

app.use(cookieParser());

app.use(getAppApiBase("authen"), authRouter);

app.use(getAppApiBase("chat-messages"), chatRouter);

app.use(getAppApiBase("personal"), myProfileRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
