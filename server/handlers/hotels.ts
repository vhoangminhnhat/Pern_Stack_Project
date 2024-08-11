import { NextFunction, Request, Response } from "express";
import { pool } from "../db";
import {
  CreateHotelRequestModel,
  DetailHotelRequestModel,
  HotelListRequestModel,
  HotelListResponseModel,
} from "../dtos/HotelList";
import { generateId } from "../utils/heplers";
import { BaseApiResponseModel } from "../dtos/BaseApiResponseModel";

export async function getHotels(
  req: Request<HotelListRequestModel>,
  res: Response,
  next: NextFunction
) {
  try {
    const { name } = req.params;

    const data = await pool.query<HotelListResponseModel>(
      "SELECT * from hotel_list"
    );

    let result = [];
    if (!name) {
      result = data?.rows?.filter((item) => item?.name === name);
    } else {
      result = data?.rows;
    }

    res.status(200).json({
      data: {
        data: result,
      },
      message: "Get hotel list successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Get hotel list failed",
    });
  }
}

export async function getHotelDetails(
  req: Request<{}, {}, {}, DetailHotelRequestModel>,
  res: Response
) {
  try {
    const { hotelId } = req.query;
    const data = await pool.query(
      "SELECT * from hotel_list where hotelId = $1",
      [hotelId]
    );
    res.status(200).json({
      data: {
        data: data.rows[0],
      },
      message: "Get hotel detail successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Get hotel detail info failed",
    });
  }
  console.log(req.params);
}

export async function createHotels(
  req: Request<{}, {}, CreateHotelRequestModel, {}>,
  res: Response<BaseApiResponseModel<HotelListResponseModel>>
) {
  try {
    let { address, code, description, name } = req.body;
    let hotelId = generateId(10);
    if (!code || code === undefined) {
      res.status(400).json({
        data: {},
        error: {
          code: 400,
          message: "Code is required",
        },
        message: "Create hotel failed",
      });
    } else {
      const data = await pool.query(
        "INSERT INTO hotel_list (hotelId, name, code, address, description) values ($1, $2, $3, $4, $5)",
        [hotelId, name, code, address, description]
      );
      res.status(200).json({
        data: {
          hotelId,
          name,
          code,
          address,
          description
        },
        message: "Create hotel successfully"
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export function updateHotels(req: Request, res: Response) {
  console.log(req.body);
  res.status(200).json({
    data: {
      id: "sdfdfdf",
      name: "Hotel A",
      code: "hotel-A",
    },
  });
}

export function deleteHotels(req: Request, res: Response) {
  res.status(200).json({
    status: "success",
    message: "Delete successfully",
  });
}
