import { Router } from "express";
import {
  onLogin,
  onLogout,
  onSignUp,
} from "../controllers/authentication/index.js";

const authRouter = Router();

authRouter.post("/login", onLogin as any);

authRouter.post("/sign-up", onSignUp as any);

authRouter.post("/log-out", onLogout);

export default authRouter;
