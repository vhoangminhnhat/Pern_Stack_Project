import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../database/db.js";
import { DecodedToken } from "../dtos/decodedToken/DecodedToken.js";

export interface IGetUserInfo extends Request {
  user: {
    id: string;
  };
}

export class MiddleWare {
  async protectedRoutes(req: IGetUserInfo, res: Response, next: NextFunction) {
    try {
      let token;
      if (req.headers.authorization) {
        const authHeader = req.headers.authorization;
        console.log("Auth header:", authHeader);
        if (authHeader.startsWith("Bearer ")) {
          token = authHeader.substring(7);
          console.log("Extracted token from header:", token);
        }
      }

      if (!token) {
        token = req.cookies.jwt;
      }

      if (!token) {
        console.log("No token found in either headers or cookies");
        return res.status(400).json({
          error: {
            code: 400,
            message: "Unauthorized - No token found",
          },
          message: "Verified failed",
        });
      }

      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as DecodedToken;

        const userInfo = await prisma.user.findUnique({
          where: { id: decoded.userId },
          select: {
            id: true,
            fullName: true,
            username: true,
            gender: true,
            profileAvatar: true,
          },
        });

        if (!userInfo) {
          return res.status(400).json({
            error: {
              code: 400,
              message: "User not found",
            },
            message: "Get profile failed",
          });
        }

        console.log("User found:", userInfo);
        req.user = userInfo;
        next();
      } catch (jwtError) {
        console.error("JWT Verification Error:", jwtError);
        return res.status(401).json({
          error: {
            code: 401,
            message: "Invalid token format",
          },
          message: "Token verification failed",
        });
      }
    } catch (error) {
      console.error("General error in protectedRoutes:", error);
      next(error);
    }
  }
}

const middleWare = new MiddleWare();
export const { protectedRoutes } = middleWare;
