import { UploadFile } from "antd";

export class UploadFilesRequestModel {
    name?: string;
    code?: string;
    type?: string;
    description?: string;
    order?: number;
    file?: UploadFile
}