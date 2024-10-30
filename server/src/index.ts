import express from 'express';
import authRouter from './routes/Authentication.js';
import chatRouter from './routes/ChatMessages.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use("/api/v1/authen", authRouter);

app.use("/api/v1/chat-messages", chatRouter);

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})