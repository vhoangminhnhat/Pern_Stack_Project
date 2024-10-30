import { Request, Response, NextFunction } from "express";
import { SignUpRequestModel } from "../../dtos/signUp/SignUpRequestModel.js";
import {
  BaseApiResponseModel,
  ErrorModel,
} from "../../dtos/baseApiResponseModel/BaseApiResponseModel.js";
import { SignUpResponseModel } from "../../dtos/signUp/SignUpResponseModel.js";
import prisma from "../../../database/db.js";
import bcryptjs from "bcryptjs";
import { generateTokens, getAvatar } from "../../utils/helpers.js";
import { Gender } from "@prisma/client";

export const onLogin = async (req: Request, res: Response) => {};

export const onSignUp = async (
  req: Request<{}, {}, SignUpRequestModel>,
  res: Response<BaseApiResponseModel<SignUpResponseModel>>,
) => {
  try {
    const { username, fullName, confirmPassword, password, gender } = req.body;
    const userInfo = await prisma.user.findUnique({ where: { username } });
    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hasedPass = await bcryptjs.hash(password as string, salt);

    //create avatar based on gender
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
    error as ErrorModel;
    console.log(error);
    res.status(500).json({
      data: {},
      message: `System error !`,
    });
  }
};

export const onLogout = async (req: Request, res: Response) => {};
