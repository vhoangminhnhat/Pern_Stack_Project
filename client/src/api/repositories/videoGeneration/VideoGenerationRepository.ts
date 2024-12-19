import { TOOLS } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import client from "api/client";
import { VideoGenerationResponseModel } from "./model/VideoGenerationResponseModel";

export interface IVideoGenerationRepository {
  genVideo(
    form: FormData
  ): Promise<BaseApiResponseModel<VideoGenerationResponseModel>>;
}

class VideoGenerationImpl implements IVideoGenerationRepository {
  async genVideo(
    form: FormData
  ): Promise<BaseApiResponseModel<VideoGenerationResponseModel>> {
    return await client?.post(TOOLS?.VIDEO_GENERATION, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}

export const defaultVideoGenerationRepository = new VideoGenerationImpl();
