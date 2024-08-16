import axios from "axios";
import { Request, Response } from "express";
import { BaseApiResponseModel } from "../dtos/BaseApiResponseModel";
import { CityResponseModel } from "../dtos/City";

const http = axios.create({
  baseURL: "https://vapi.vnappmob.com/api",
});

export async function getCityList(
  req: Request,
  res: Response<BaseApiResponseModel<CityResponseModel[]>>
) {
  try {
    const data = await http.get("/province", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (data?.data?.results) {
      return res.status(200).json({
        data: data?.data?.results as CityResponseModel[],
        message: "Get city list successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: {
        code: 500,
        message: "Internal server error",
      },
      message: "Get city list failed",
    });
  }
}
