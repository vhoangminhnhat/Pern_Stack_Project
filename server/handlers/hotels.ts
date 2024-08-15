import { NextFunction, Request, Response } from "express";
import { pool } from "../db";
import { BaseApiResponseModel } from "../dtos/BaseApiResponseModel";
import {
  CreateHotelRequestModel,
  DetailHotelRequestModel,
  HotelListRequestModel,
  HotelListResponseModel,
} from "../dtos/HotelList";
import { generateId } from "../utils/heplers";
import { isEmpty } from "lodash";

export async function getHotels(
  req: Request<HotelListRequestModel>,
  res: Response<BaseApiResponseModel<HotelListResponseModel[]>>,
  next: NextFunction
) {
  try {
    const { name, city } = req.params;

    const data = await pool.query<HotelListResponseModel>(
      "SELECT * from hotel_list"
    );
    let result: HotelListResponseModel[] = [];
    if (!name && !city) {
      return res.status(200).json({
        data: data.rows,
        message: "Get hotel list successfully",
      });
    }
    if (name && city) {
      result = data.rows.filter(
        (item) => item.name === name && item.city === city
      );
    }
    if (name && !city) {
      result = data.rows.filter((item) => item.name === name);
    }
    if (!name && city) {
      result = data.rows.filter((item) => item.city === city);
    }
    return res.status(200).json({
      data: result,
      message: "Get hotel list successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: {
        code: 500,
        message: "Internal server error",
      },
      message: "Create hotel failed",
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
      "SELECT * FROM hotel_list WHERE id = $1",
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
    const { address, code, description, name } = req.body;
    let hotelId = `${generateId(15)}${code}`;

    if (!code) {
      return res.status(400).json({
        data: {},
        error: {
          code: 400,
          message: "Code is required",
        },
        message: "Create hotel failed",
      });
    }
    if (code) {
      const checkCode = await pool.query(
        "SELECT * FROM hotel_list WHERE code = $1"
      );
      if (!isEmpty(checkCode.rows)) {
        return res.status(400).json({
          error: {
            code: 400,
            message: "This code is existed",
          },
          message: "Create hotel failed",
        });
      } else {
        await pool.query(
          "INSERT INTO hotel_list (id, name, code, address, description) VALUES ($1, $2, $3, $4, $5)",
          [hotelId, name, code, address, description]
        );
        return res.status(200).json({
          data: {
            id: hotelId,
            name,
            code,
            address,
            description,
          },
          message: "Create hotel successfully",
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      data: {},
      error: {
        code: 500,
        message: "Internal server error",
      },
      message: "Create hotel failed",
    });
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
