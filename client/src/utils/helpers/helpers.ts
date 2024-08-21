import { FormItemProps, message } from "antd";
import { isEmpty } from "lodash";

export const convertToISO = (dateStr: {
  $y: number;
  $M: number;
  $D: number;
}) => {
  const year = dateStr.$y;
  const month = dateStr.$M + 1;
  const day = dateStr.$D;
  const isoDate = `${year.toString().padStart(4, "0")}-${month
    .toString()
    .padStart(2, "0")}-${day.toString().padStart(2, "0")}T00:00:00.000Z`;
  return isoDate;
};

export const getMessage = (
  info: string,
  time: number,
  type: "success" | "error" | "warning"
) => {
  switch (type) {
    case "success":
      return message.success({
        content: info,
        duration: time,
      });
    case "error":
      return message.error({
        content: info,
        duration: time,
      });
    case "warning":
      return message.warning({
        content: info,
        duration: time,
      });
  }
};

export const createFormRules = (
  stricted: boolean,
  dataType: string,
  message: string
) => {
  return [
    {
      required: stricted,
      type: dataType,
      message: message,
    },
  ] as FormItemProps["rules"];
};

export const getFormInitialVals = <O extends Object>(
  data: O,
  value: keyof O
) => {
  if (!isEmpty(data)) {
    return data[value];
  } else {
    return undefined;
  }
};
