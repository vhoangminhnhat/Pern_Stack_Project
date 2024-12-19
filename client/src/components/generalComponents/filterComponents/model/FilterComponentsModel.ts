import {
  SelectOps,
  TreeSelectOps,
} from "components/generalComponents/selectComponent/model/SelectOpsModel";
import { ReactNode } from "react";
import dayjs from "dayjs";

export type FilterAttributes = {
  colLg: number;
  filterName: string;
  placeholder: string;
  labelName: string;
  filterType: string;
  defaultValue: unknown | string;
  defaultRangeDay?: [dayjs.Dayjs, dayjs.Dayjs];
  options: SelectOps[] | TreeSelectOps[] | [];
  prefixIcon?: ReactNode;
  onChange?: (value?: unknown) => void | Promise<void>;
};
