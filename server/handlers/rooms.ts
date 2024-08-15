import { Request, Response } from "express";
import { RoomsRequestModel, RoomsResponseModel } from "../dtos/Rooms";
import { pool } from "../db";
import { BaseApiResponseModel } from "../dtos/BaseApiResponseModel";

export async function GetRooms(
  req: Request<RoomsRequestModel, {}, {}, {}>,
  res: Response<BaseApiResponseModel<RoomsResponseModel[]>>
) {
  try {
    const { code, hotelRef, name } = req.params;
    if (!code && !hotelRef && !name) {
      const data = await pool.query("SELECT * FROM rooms");
      return res.status(200).json({
        data: data.rows,
        message: "Get room list successfully",
      });
    }
    if (code && hotelRef && name) {
      const filteredData = await pool.query(
        "SELECT * FROM rooms WHERE code = $1 AND hotelRef = $2 AND name = $3",
        [code, hotelRef, name]
      );
      return res.status(200).json({
        data: filteredData.rows,
        message: "Get room list successfully",
      });
    }
    if (code && !hotelRef && !name) {
      const codeData = await pool.query("SELECT * FROM rooms WHERE code = $1");
      return res.status(200).json({
        data: codeData.rows,
        message: "Get room list successdully",
      });
    };
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: {
        code: 500,
        message: "Internal server error",
      },
      message: "Internal server error",
    });
  }
}
