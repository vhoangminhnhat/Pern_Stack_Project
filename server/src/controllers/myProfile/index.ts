import { Response } from "express";
import prisma from "../../../database/db.js";
import {
  BaseApiResponseModel,
  ErrorModel,
} from "../../dtos/baseApiResponseModel/BaseApiResponseModel.js";
import { UserResponseModel } from "../../dtos/user/UserResponseModel.js";
import { IGetUserInfo } from "../../middlewares/protectedRoutes.js";
import { getBaseErrorResponse } from "../../utils/helpers.js";

export class MyProfileController {
  async getProfile(
    req: IGetUserInfo,
    res: Response<BaseApiResponseModel<UserResponseModel>>
  ) {
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

      // Format dates for response
      const formattedUserInfo: UserResponseModel = new UserResponseModel(
        userInfo.id,
        undefined,
        userInfo.conversationId,
        userInfo.createdAt,
        userInfo.fullName,
        userInfo.gender,
        userInfo.password,
        userInfo.updatedAt,
        userInfo.username,
        userInfo.profileAvatar,
        userInfo.code || undefined,
        userInfo.birthDay ? new Date(userInfo.birthDay) : undefined,
        userInfo.placeOfOrigin || undefined,
        userInfo.identifyCard || undefined,
        userInfo.dateOfIssue ? new Date(userInfo.dateOfIssue) : undefined,
        userInfo.placeOfIssue || undefined,
        userInfo.religion || undefined
      );

      return res.status(200).json({
        data: formattedUserInfo,
        message: "Get profile successfully",
      });
    } catch (error) {
      getBaseErrorResponse(error as unknown as ErrorModel, res);
    }
  }

  async updateProfile(
    req: IGetUserInfo,
    res: Response<BaseApiResponseModel<UserResponseModel>>
  ) {
    try {
      const { id } = req.user;
      const {
        fullName,
        code,
        birthDay,
        placeOfOrigin,
        identifyCard,
        dateOfIssue,
        placeOfIssue,
        religion,
      } = req.body;

      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          fullName,
          code,
          birthDay: birthDay ? new Date(birthDay) : undefined,
          placeOfOrigin,
          identifyCard,
          dateOfIssue: dateOfIssue ? new Date(dateOfIssue) : undefined,
          placeOfIssue,
          religion,
        },
      });

      // Format dates for response
      const formattedUserInfo: UserResponseModel = new UserResponseModel(
        updatedUser.id,
        undefined,
        updatedUser.conversationId,
        updatedUser.createdAt,
        updatedUser.fullName,
        updatedUser.gender,
        updatedUser.password,
        updatedUser.updatedAt,
        updatedUser.username,
        updatedUser.profileAvatar,
        updatedUser.code || undefined,
        updatedUser.birthDay ? new Date(updatedUser.birthDay) : undefined,
        updatedUser.placeOfOrigin || undefined,
        updatedUser.identifyCard || undefined,
        updatedUser.dateOfIssue ? new Date(updatedUser.dateOfIssue) : undefined,
        updatedUser.placeOfIssue || undefined,
        updatedUser.religion || undefined
      );

      return res.status(200).json({
        data: formattedUserInfo,
        message: "Profile updated successfully",
      });
    } catch (error) {
      getBaseErrorResponse(error as unknown as ErrorModel, res);
    }
  }
}

const myProfileController = new MyProfileController();
export const { getProfile, updateProfile } = myProfileController;
