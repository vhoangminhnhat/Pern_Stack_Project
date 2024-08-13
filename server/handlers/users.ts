import { Request, Response } from "express";
import { isEmpty } from "lodash";
import { pool } from "../db";
import { BaseApiResponseModel } from "../dtos/BaseApiResponseModel";
import { UsersRequestModel, UsersResponseModel } from "../dtos/Users";
import { generateId } from "../utils/heplers";

export async function getUsers(
  req: Request<UsersRequestModel>,
  res: Response<BaseApiResponseModel<UsersResponseModel[]>>
) {
  try {
    const { email, phone } = req.params;
    const data = await pool.query<UsersResponseModel>("SELECT * FROM users");
    let result = [];
    if (email && !phone) {
      result = data.rows.filter((item) => item.email === email);
      return res.status(200).json({
        data: result,
        message: "Get user list successfully",
      });
    }
    if (!email && phone) {
      result = data.rows.filter((item) => item.phone === phone);
      return res.status(200).json({
        data: result,
        message: "Get uset list successfully",
      });
    }
    if (email && phone) {
      result = data.rows.filter(
        (item) => item.email === email && item.phone === phone
      );
      return res.status(200).json({
        data: result,
        message: "Get user list successfully",
      });
    }
    if (!email && !phone) {
      return res.status(200).json({
        data: data.rows,
        message: "Get user list successfully",
      });
    }
    if (email === undefined || phone === undefined) {
      return res.status(400).json({
        error: {
          code: 400,
          message: "Email and phone must not be undefined",
        },
        message: "Get user list failed",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error encountered",
    });
  }
}

export async function CreateUser(
  req: Request<{}, {}, UsersResponseModel, {}>,
  res: Response<BaseApiResponseModel<UsersResponseModel>>
) {
  try {
    const { email, name, phone, roles, address, description } = req.body;
    const userId = `id${generateId(7)}${phone}`;
    if (!email && phone) {
      return res.status(400).json({
        error: {
          code: 400,
          message: "Email is required",
        },
        message: "Create user failed",
      });
    }
    if (!phone && email) {
      return res.status(400).json({
        error: {
          code: 400,
          message: "Phone is required",
        },
        message: "Create user failed",
      });
    }
    if (!phone && !email) {
      return res.status(400).json({
        error: {
          code: 400,
          message: "Phone and email are required",
        },
        message: "Create user failed",
      });
    }
    if (phone && email) {
      const checkData = await pool.query(
        "SELECT * FROM users WHERE phone = $1",
        [phone]
      );
      if (!isEmpty(checkData.rows)) {
        return res.status(400).json({
          error: {
            code: 400,
            message: "This user is existed",
          },
          message: "Create user failed",
        });
      } else {
        const data = await pool.query(
          "INSERT INTO users (userId, email, phone, name, address, description) values ($1, $2, $3, $4, $5, $6)",
          [userId, email, phone, name, address, description]
        );
        return res.status(200).json({
          data: data.rows[0],
          message: "Create user successfully",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error encountered",
    });
  }
}
