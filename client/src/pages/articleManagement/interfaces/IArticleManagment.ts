import { FormInstance } from "antd";
import { ArticleManagementResponseModel } from "api/repositories/articleManagement/model/ArticleManagementResponseModel";
import { Dispatch, SetStateAction } from "react";

export interface IUploadArticleFeature {
  data: {
    actionForm: FormInstance<any>;
    detailInfo: ArticleManagementResponseModel;
    detailModal: boolean;
    handleActions: (values: any, action: "create" | "update") => Promise<void>;
    handleUploadChange: (type: string) => (info: any) => void;
    importFile: { file: any[] };
    modalLoading: boolean;
    setDetailInfo: (info: any) => void;
    setDetailModal: (open: boolean) => void;
  };
}

export interface IArticleManagementSummarize {
  data: {
    summary: string;
    modal: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
  };
}
