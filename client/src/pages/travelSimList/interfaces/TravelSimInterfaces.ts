import { FormInstance, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { NationListResponseModel } from "api/repositories/travelSim/model/nationList/NationListResponseModel";
import { TravelSimResponseModel } from "api/repositories/travelSim/model/TravelSimResponseModel";
import { UpdateProfileStatusRequestModel } from "api/repositories/travelSim/model/updateProfileStatus/UpdateProfileStatusRequestModel";
import { ITravelSimRepository } from "api/repositories/travelSim/TravelSimRepository";
import { Dispatch, SetStateAction } from "react";

export interface ITravelSimImages {
  portrait: UploadFile[];
  front: UploadFile[];
  sim: UploadFile[];
  signature?: UploadFile[];
  videocall?: UploadFile[];
}

export interface ITravelSimListFeature {
  travelSimRepository?: ITravelSimRepository;
}

export interface ITravelSimActions {
  data: {
    actionForm: FormInstance<any>;
    open: boolean;
    onCancel: () => void;
    onAction: (
      body: unknown,
      action: "ocr" | "update" | "confirm"
    ) => Promise<void>;
    detail: TravelSimResponseModel;
    loading: boolean;
    dialCode: string;
    handleUploadChange: (
      type: "portrait" | "signature" | "front" | "sim" | "videocall"
    ) => (info: UploadChangeParam) => void;
    setDialCode: Dispatch<SetStateAction<string>>;
    detailImages: ITravelSimImages;
    nationList: NationListResponseModel[];
    setNationList: Dispatch<SetStateAction<NationListResponseModel[]>>;
  };
}

export interface IUpdateProfileStatus {
  data: {
    modal: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
    updateProfileStatus: (
      body: UpdateProfileStatusRequestModel
    ) => Promise<void>;
    updateForm: FormInstance<any>;
    profileId: string;
    detail: TravelSimResponseModel;
  };
}
