import { IDocument } from "@cyntler/react-doc-viewer";
import { FormInstance, UploadFile } from "antd";
import { Dispatch, SetStateAction } from "react";

export type PreviewFeatureProps = {
  data: {
    docs: IDocument[];
    modal: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
  };
};

export type DownloadFeatureProps = {
  data: {
    downloadModal: boolean;
    downloadFile: (
      file: string,
      title: string,
      type: string
    ) => Promise<boolean>;
    info: any;
    setDownloadModal: Dispatch<SetStateAction<boolean>>;
    setInfo: Dispatch<SetStateAction<any>>;
  };
};

export type UpdateCreateFeatureProps = {
  data: {
    modal: boolean;
    importFile: IFileReplacement;
    handleAction: (info: any, action: string) => Promise<void>;
    actionForm: FormInstance<any>;
    setModal: Dispatch<SetStateAction<boolean>>;
    setImportFile: Dispatch<SetStateAction<IFileReplacement>>;
    info: any;
    setInfo: Dispatch<SetStateAction<any>>;
  };
};

export interface IFileReplacement {
  doc: UploadFile[];
  image: UploadFile[];
}
