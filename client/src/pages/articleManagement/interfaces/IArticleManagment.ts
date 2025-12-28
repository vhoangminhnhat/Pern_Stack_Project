import { FormInstance } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { ArticleManagementResponseModel } from "api/repositories/articleManagement/model/ArticleManagementResponseModel";
import { Dispatch, SetStateAction } from "react";

export interface IUploadArticleFeature {
  data: {
    actionForm: FormInstance<any>;
    detailInfo: ArticleManagementResponseModel;
    detailModal: boolean;
    handleActions: (values: any, action: "create" | "update") => Promise<void>;
    handleUploadChange: (type: string) => (info: any) => void;
    importFile: { file: any[]; fileList?: UploadFile[] };
    modalLoading: boolean;
    setDetailInfo: (info: any) => void;
    setDetailModal: (open: boolean) => void;
  };
}

export interface IArticleManagementSummarize {
  data: {
    summary: string;
    modal: boolean;
    actionType: string;
    setActionType: Dispatch<SetStateAction<string>>;
    setModal: Dispatch<SetStateAction<boolean>>;
  };
}
