import { Response } from "express";
import prisma from "../../../database/db.js";
import {
    BaseApiResponseModel,
    ErrorModel,
} from "../../dtos/baseApiResponseModel/BaseApiResponseModel.js";
import { UserResponseModel } from "../../dtos/user/UserResponseModel.js";
import { IGetUserInfo } from "../../middlewares/protectedRoutes.js";
import { getBaseErrorResponse } from "../../utils/helpers.js";

export const getProfile = async (
  req: IGetUserInfo,
  res: Response<BaseApiResponseModel<UserResponseModel>>
) => {
  try {
    const { id } = req.user;
    const userInfo = await prisma.user.findUnique({ where: { id } });

    if (!userInfo) {
      return res.status(400).json({
        message: "Get profile failed",
        error: {
          code: 400,
          message: "User not found",
        },
      });
    }

    return res.status(200).json({
      data: userInfo,
      message: "Get profile successfully",
    });
  } catch (error) {
    getBaseErrorResponse(error as unknown as ErrorModel, res);
  }
};
