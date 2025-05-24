import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../database/db.js";
import { ErrorModel } from "../dtos/baseApiResponseModel/BaseApiResponseModel.js";
import { DecodedToken } from "../dtos/decodedToken/DecodedToken.js";
import { getBaseErrorResponse } from "../utils/helpers.js";

export interface IGetUserInfo extends Request {
  user: {
    id: string;
  };
}

const protectedRoutes = (
  req: IGetUserInfo,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(400).json({
        error: {
          code: 400,
          message: "Unauthorized - No token found",
        },
        message: "Verified failed",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    if (!decoded) {
      return res.status(400).json({
        error: {
          code: 403,
          message: "Forbidden",
        },
        message: "Verified failed",
      });
    }

    prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        fullName: true,
        username: true,
        gender: true,
        profileAvatar: true,
      },
    }).then(userInfo => {
      if (!userInfo) {
        return res.status(400).json({
          error: {
            code: 400,
            message: "User not found",
          },
          message: "Get profile failed",
        });
      }
      req.user = userInfo;
      next();
    }).catch(error => {
      next(error);
    });
  } catch (error) {
    next(error);
  }
};

export default protectedRoutes;
