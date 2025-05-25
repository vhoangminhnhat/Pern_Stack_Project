import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../database/db.js";
import { DecodedToken } from "../dtos/decodedToken/DecodedToken.js";

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
    let token = req.cookies.jwt;

    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7); // Remove 'Bearer ' prefix
      }
    }

    if (!token) {
      return res.status(400).json({
        error: {
          code: 400,
          message: "Unauthorized - No token found",
        },
        message: "Verified failed",
      });
    }

    // Add logging to debug token
    console.log('Received token:', token);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
      
      prisma.user
        .findUnique({
          where: { id: decoded.userId },
          select: {
            id: true,
            fullName: true,
            username: true,
            gender: true,
            profileAvatar: true,
          },
        })
        .then((userInfo) => {
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
        })
        .catch((error) => {
          next(error);
        });
    } catch (jwtError) {
      console.error('JWT Verification Error:', jwtError);
      return res.status(401).json({
        error: {
          code: 401,
          message: "Invalid token format",
        },
        message: "Token verification failed",
      });
    }
  } catch (error) {
    next(error);
  }
};

export default protectedRoutes;
