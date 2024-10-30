import express from "express";
import {
  onLogin,
  onLogout,
  onSignUp,
} from "../controllers/authentication/index.js";

const authRouter = express.Router();

authRouter.get("/login", onLogin);

authRouter.post("/sign-up", onSignUp);

authRouter.post("/log-out", onLogout);

export default authRouter;
