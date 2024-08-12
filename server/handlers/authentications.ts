import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { isEmpty } from "lodash";
import { pool } from "../db";
import {
  LoginRequestModel,
  LoginResponseModel,
  SignUpRequestModel,
  SignUpResponseModel,
} from "../dtos/Authentications";
import { BaseApiResponseModel } from "../dtos/BaseApiResponseModel";
import { tokenGeneration } from "../utils/heplers";

export async function Login(
  req: Request<{}, {}, LoginRequestModel, {}>,
  res: Response<BaseApiResponseModel<LoginResponseModel>>
) {
  const { password, userName } = req.body;
  if (!userName || !password) {
    return res.status(400).json({
      message: "Login failed",
      error: {
        code: 400,
        message: "Invalid login information",
      },
    });
  }
  if (userName && password) {
    try {
      const data = await pool.query("SELECT * from users WHERE userName = $1", [
        userName,
      ]);
      if (isEmpty(data.rows)) {
        return res.status(400).json({
          message: "Login failed",
          error: {
            code: 400,
            message: "User name not existed",
          },
        });
      }

      const validPassword = bcrypt.compare(password, data.rows[0].password);
      if (!validPassword) {
        return res.status(400).json({
          message: "Login failed",
          error: {
            code: 400,
            message: "Password is invalid",
          },
        });
      }
      const token = tokenGeneration(data.rows[0].userId);
      return res.status(200).json({
        message: "Login successfully",
        data: {
          jwt: token,
          user: data.rows[0],
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: "Login failed",
        error: {
          code: 400,
          message: "Error encoutered",
        },
      });
    }
  }
}

export async function Register(
  req: Request<{}, {}, SignUpRequestModel, {}>,
  res: Response<BaseApiResponseModel<SignUpResponseModel>>,
  next: NextFunction
) {
  try {
    const { email, password, phone, roles, userName } = req.body;
    const data = await pool.query("SELECT * from users WHERE phone = $1", [
      phone,
    ]);
    if (!isEmpty(data.rows)) {
      return res.status(400).json({
        error: {
          code: 400,
          message: "User already existed",
        },
        message: "Sign up failed",
      });
    }
    const genSalt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password as string, genSalt);
    const newUser = await pool.query(
      "INSERT INTO users (userName, password, email, phone) values ($1, $2, $3, $4) RETURNING *",
      [userName, encryptedPassword, email, phone]
    );
    return res.status(200).json({
      message: "Sign up successfully",
      data: {
        user: newUser.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Sign up failed",
      error: {
        code: 400,
        message: "Error encountered",
      },
    });
  }
}
