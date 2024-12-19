import {UploadFile} from 'antd';

export class ReplaceFilesRequestModel {
  code?: string;
  name?: string;
  type?: string;
  description?: string;
  order?: number;
  file?: UploadFile;
}
