import { Request, Response } from "express";
import { LoginRequestModel, LoginResponseModel } from "../dtos/Authentications";
import { BaseApiResponseModel } from "../dtos/BaseApiResponseModel";
import { pool } from "../db";

export async function Login(
  req: Request<{}, {}, LoginRequestModel, {}>,
  res: Response<BaseApiResponseModel<LoginResponseModel>>
) {
  const { password, userName } = req.body;
  if(!userName || !password) {
    return res.status(400).json({
        message: "Login failed",
        error: {
            code: 400,
            message: "Invalid login information"
        }
    })
  };
  if(userName && password) {
    try {
        const data = await pool.query("SELECT * from users where values")
    } catch (error) {
        
    }
  }

}
