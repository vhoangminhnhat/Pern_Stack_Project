import { Router } from "express";
import {
  onLogin,
  onLogout,
  onSignUp,
} from "../controllers/authentication/index.js";
import { getAppApiBase } from "../utils/helpers.js";

const authRouter = Router();

authRouter.get(getAppApiBase("login"), onLogin as any);

authRouter.post(getAppApiBase("sign-up"), onSignUp as any);

authRouter.post(getAppApiBase("log-out"), onLogout);

export default authRouter;
