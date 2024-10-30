import { Router } from "express";
import {
  onLogin,
  onLogout,
  onSignUp,
} from "../controllers/authentication/index.js";

const authRouter = Router();

authRouter.get("/login", onLogin);

authRouter.post("/sign-up", onSignUp as any);

authRouter.post("/log-out", onLogout);

export default authRouter;
