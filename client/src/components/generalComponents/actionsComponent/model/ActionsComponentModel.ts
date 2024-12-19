import { CountryListResponseModel } from "api/repositories/countryManagement/model/CountryListResponseModel";
import { CreateRoamingRequestModel } from "api/repositories/packagesManagement/roamingManagement/model/createActions/CreateRoamingRequestModel";
import { PartnerRoamingModel } from "api/repositories/packagesManagement/roamingManagement/model/RoamingManagementResponseModel";
import {
  MultiSelectOps,
  SelectOps,
  TreeSelectOps,
} from "components/generalComponents/selectComponent/model/SelectOpsModel";
import { CSSProperties, ReactNode } from "react";

export type DetailKey<T extends Object> = keyof T;

export type DetailActionsType<T extends Object> = {
  data: ActionsComponentType<T>[];
  info: T;
  onDataChange?: (data: CreateRoamingRequestModel[]) => void;
};

export type ActionsComponentType<T extends Object> = {
  name: string;
  detailKey?: keyof T;
  label: string;
  type:
    | "input"
    | "select"
    | "text-area"
    | "input-number"
    | "tree-select"
    | "multi-select"
    | "dynamic-form"
    | "date"
    | "password";
  forPhone?: boolean;
  style?: CSSProperties;
  allowClear?: boolean;
  onSelect?: (value?: unknown) => Promise<void> | void;
  onChange?: (value?: unknown) => Promise<void> | void;
  initialVals?: string | number | boolean;
  disableForSelect?: boolean;
  icon?: ReactNode;
  pointerEvents?: boolean;
  createFormRules?: {
    stricted: boolean;
    type: string;
    message: string;
  };
  placeholder?: string;
  options?: SelectOps[] | TreeSelectOps[] | MultiSelectOps[];
  countries?: Array<CountryListResponseModel>;
  roamingPartners?: Array<PartnerRoamingModel>;
  colLg?: number;
};
