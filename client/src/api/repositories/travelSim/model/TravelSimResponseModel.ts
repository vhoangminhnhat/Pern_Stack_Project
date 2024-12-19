export class TravelSimResponseModel {
  serial?: string;
  sim?: string;
  createdAt?: string;
  profileId?: string;
  status?: number | string;
  type?: string;
  idNumber?: string;
  name?: string;
  birthDay?: string;
  sex?: number | string;
  address?: string;
  placeOfOrigin?: string;
  issueDate?: string;
  issuePlace?: string;
  phoneContact?: string;
  emailContact?: string;
  ocrSupplier?: string;
  imagesPath?: ImagesPathItem[];
  dialCode?: string;
  nationality?: string;
  connectedTime?: string;
  reason?: string;
}

class ImagesPathItem {
  type?: string;
  path?: string;
}
