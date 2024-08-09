import { NextFunction, Request, Response } from "express";
import { pool } from "../db";
import {
  HotelListRequestModel,
  HotelListResponseModel,
} from "../dtos/HotelList";

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
      message: "Get restaurant list successfully",
    });
  } catch (error) {
    console.log(error);
  }
}

export function getHotelDetails(req: Request, res: Response) {
  console.log(req.params);
}

export function createHotels(req: Request, res: Response) {
  console.log(req.body);
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
