import SignatureCanvas from 'react-signature-canvas';
import { Dispatch } from 'react';
import { TravelSimResponseModel } from 'api/repositories/travelSim/model/TravelSimResponseModel';
import { NationListResponseModel } from 'api/repositories/travelSim/model/nationList/NationListResponseModel';
import { UploadFile } from 'antd';
import { RcFile } from 'antd/es/upload';

export interface IGenerateForm {
  handleGenerateFiles: (data: {
    sessionId: Array<string>;
    portrait: UploadFile | string;
    image: string;
  }) => Promise<void> | void;
  sessionLog: {
    sessionId: Array<string>;
    portrait: UploadFile | string;
    image: string;
  }
}

export interface ICreateForm {
  signature: SignatureCanvas;
  setSignature: Dispatch<SignatureCanvas>;
  submitLoading: boolean,
  clearSignature: () => void,
  uploadInfo: (values: any) => Promise<void>,
  setProfileType: Dispatch<number>,
  sectionIds: string[],
  userFiles: { portrait: UploadFile | string; videocall: UploadFile | string },
}

export interface IConfirmForm {
  userData: TravelSimResponseModel;
  loading: boolean;
  confirmInfo: (values: any) => Promise<void>;
  nationList: NationListResponseModel[];
  profileType: number;
}