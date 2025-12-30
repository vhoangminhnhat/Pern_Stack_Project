import bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import prisma from "../../../database/db.js";
import {
  BaseApiResponseModel,
  ErrorModel,
} from "../../dtos/baseApiResponseModel/BaseApiResponseModel.js";
import { LoginRequestModel } from "../../dtos/login/LoginRequestModel.js";
import { SignUpRequestModel } from "../../dtos/signUp/SignUpRequestModel.js";
import { SignUpResponseModel } from "../../dtos/signUp/SignUpResponseModel.js";
import { UserResponseModel } from "../../dtos/user/UserResponseModel.js";
import {
  generateTokens,
  getAvatar,
  getBaseErrorResponse,
} from "../../utils/helpers.js";

export class AuthenticationController {
  async onLogin(
    req: Request<{}, {}, LoginRequestModel>,
    res: Response<BaseApiResponseModel<UserResponseModel>>
  ) {
    try {
      const { password, username } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          message: "Login failed",
          error: {
            code: 400,
            message: "Username or password not found !",
          },
        });
      }

      const userInfo = await prisma.user.findUnique({
        where: { username: username },
      });

      if (!userInfo || !userInfo.password) {
        return res.status(400).json({
          error: {
            code: 400,
            message: "Username or password is incorrect",
          },
          message: "Login failed",
        });
      }

      const checkingPass = await bcryptjs.compare(
        password,
        userInfo.password
      );

      if (!checkingPass) {
        return res.status(400).json({
          error: {
            code: 400,
            message: "Password did not match",
          },
          message: "Login failed",
        });
      }

      const token = await generateTokens(userInfo?.id as string, res);
      const userWithoutPassword = { ...userInfo };
      delete (userWithoutPassword as unknown as { password?: string })?.password;

      return res.status(200).json({
        data: {
          ...(userWithoutPassword as UserResponseModel),
          token,
        },
        message: "Login successfully",
      });
    } catch (error: unknown) {
      getBaseErrorResponse(error as unknown as ErrorModel, res);
    }
  }

  async onSignUp(
    req: Request<{}, {}, SignUpRequestModel>,
    res: Response<BaseApiResponseModel<SignUpResponseModel>>
  ) {
    try {
      const { username, fullName, confirmPassword, password, gender } =
        req.body;
      const userInfo = await prisma.user.findUnique({ where: { username } });

      const salt = await bcryptjs.genSalt(10);
      const hasedPass = await bcryptjs.hash(password as string, salt);

      const profileAvatar = getAvatar(username as string, gender as string);

      if (!username || !fullName || !confirmPassword || !password || !gender) {
        return res.status(400).json({
          data: {},
          error: {
            code: 400,
            message: "Sign up information invalid !",
          },
          message: "Sign up failed !",
        });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({
          data: {},
          error: {
            code: 401,
            message: "Confirm pass and pass is not alike !",
          },
          message: "Sign up failed !",
        });
      }

      if (userInfo) {
        return res.status(400).json({
          data: {},
          error: {
            code: 402,
            message: "This username is already exists !",
          },
          message: "Sign up failed !",
        });
      }

      const newUser = await prisma.user.create({
        data: {
          fullName,
          gender,
          password: hasedPass,
          username,
          profileAvatar: profileAvatar as string,
        },
      });

      if (newUser) {
        await generateTokens(newUser.id, res);
        res.status(200).json({
          data: {
            userInfo: newUser,
          },
          message: "Sign up successfully !",
        });
      } else {
        res.status(400).json({
          data: {},
          error: {
            code: 405,
            message: "Invalid user data !",
          },
          message: "Sign up failed !",
        });
      }
    } catch (error) {
      getBaseErrorResponse(error as unknown as ErrorModel, res);
    }
  }

  async onLogout(req: Request, res: Response) {
    try {
      res.cookie("jwt", "", { maxAge: 0 });
      res.status(200).json({
        message: "Log out successfully",
      });
    } catch (error) {
      getBaseErrorResponse(error as unknown as ErrorModel, res);
    }
  }
}

const authenticationController = new AuthenticationController();
export const { onLogin, onSignUp, onLogout } = authenticationController;
