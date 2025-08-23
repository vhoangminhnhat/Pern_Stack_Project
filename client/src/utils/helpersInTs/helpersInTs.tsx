import { FormItemProps, message, UploadFile } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { isEmpty, isUndefined } from "lodash";
import { strings } from "utils/localizedStrings";

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

export const renderStatus = (value: unknown, localStrings: typeof strings) => {
  switch (value) {
    case "active":
      return (
        <span className="font-semibold text-green-700">
          {localStrings.GlobalLabels.Active}
        </span>
      );
    case "inactive":
      return (
        <span className="font-semibold text-red-700">
          {localStrings.GlobalLabels.Inactive}
        </span>
      );
    case 0:
      return (
        <span className="font-semibold text-green-700">
          {localStrings.GlobalLabels.Active}
        </span>
      );
    case 1:
      return (
        <span className="font-semibold text-red-700">
          {localStrings.GlobalLabels.Inactive}
        </span>
      );
    case -1:
      return (
        <span className="font-semibold text-red-700">
          {localStrings.GlobalLabels.Inactive}
        </span>
      );
  }
};

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

export const getUserType = (value: string) => {
  switch (value) {
    case "user":
      return <span style={{ color: "#473b3b", fontWeight: 700 }}>User</span>;
    case "admin":
      return <span style={{ color: "#180d7a", fontWeight: 700 }}>Admin</span>;
    case "partner":
      return <span style={{ color: "#650d7a", fontWeight: 700 }}>Partner</span>;
  }
};

export const getUserStatus = (value: number, localStrings: typeof strings) => {
  switch (value) {
    case 0:
      return (
        <span style={{ color: "#32a852", fontWeight: 700 }}>
          {localStrings.GlobalLabels.Active}
        </span>
      );
    case 1:
      return (
        <span style={{ color: "#b37f27", fontWeight: 700 }}>
          {localStrings.GlobalLabels.Inactive}
        </span>
      );
    case 2:
      return (
        <span style={{ color: "#ab1111", fontWeight: 700 }}>
          {localStrings.GlobalLabels.Deleted}
        </span>
      );
  }
};

export const getStatus = (value: number, localStrings: typeof strings) => {
  switch (value) {
    case 0:
      return (
        <span style={{ color: "#d9a61c", fontWeight: 700 }}>
          {localStrings.TransactionHistory.Status.Init}
        </span>
      );
    case 1:
      return (
        <span style={{ color: "#2029a8", fontWeight: 700 }}>
          {localStrings.TransactionHistory.Status.Progerssing}
        </span>
      );
    case 2:
      return (
        <span style={{ color: "green", fontWeight: 700 }}>
          {localStrings.TransactionHistory.Status.Finished}
        </span>
      );
    case 3:
      return (
        <span style={{ color: "red", fontWeight: 700 }}>
          {localStrings.TransactionHistory.Status.Error}
        </span>
      );
    case 4:
      return (
        <span style={{ color: "#730d34", fontWeight: 700 }}>
          {localStrings.TransactionHistory.Status.Deleted}
        </span>
      );
    case 5:
      return (
        <span style={{ color: "#c79712", fontWeight: 700 }}>
          {localStrings.TransactionHistory.Status.WaitingToBeConfirmed}
        </span>
      );
    default:
      return "";
  }
};

export const statusForContent = (value: number) => {
  switch (value) {
    case 0:
      return <span className="text-green-600 font-bold">Hoạt động</span>;
    case 1:
      return <span className="text-red-700 font-bold">Không hoạt động</span>;
    default:
      return "";
  }
};

export const statusForSimApplication = (value: number) => {
  switch (value) {
    case 10:
      return "Chờ thanh toán";
    case 11:
      return "Chờ giao hàng";
    case 12:
      return "Chờ nhận hàng";
    case 13:
      return "Giao hàng thành công";
    case 14:
      return "Đã hủy";
    case 15:
      return "Đã hòa mạng";
    case 16:
      return "Hòa mạng thất bại";
    default:
      return "";
  }
};

export const statusForDetails = (value: number) => {
  switch (value) {
    case 0:
      return "Khởi tạo";
    case 1:
      return "Đang xử lý";
    case 2:
      return "Hoàn thành";
    case 3:
      return "Lỗi";
    case 4:
      return "Đã xóa";
    case 5:
      return "Chờ xác nhận";
    default:
      return "";
  }
};

export const formatCurrency = (value) => {
  return `${new Intl.NumberFormat().format(value)} VND`;
};

export const DataFormater = (number: number) => {
  if (number >= 1000000000) {
    return (number / 1000000000).toString() + "B";
  } else if (number >= 1000000) {
    return (number / 1000000).toString() + "M";
  } else if (number >= 1000) {
    return (number / 1000).toString() + "K";
  } else {
    return number.toString();
  }
};

export const autoCorrectJSON = (jsonString: string): string => {
  let correctedJSON = jsonString
    .replace(/(?<=\{|\,)\s*([\w]+)\s*:/g, '"$1":')
    .replace(/(?<=:)\s*'([^']*)'\s*(?=,|\}|$)/g, ' "$1"');
  correctedJSON = correctedJSON.replace(/,\s*([\]}])/g, "$1");
  return correctedJSON;
};

export const renderDuration = (
  lang: string,
  duration: number,
  localString: typeof strings
) => {
  switch (lang) {
    case "vi":
      if (duration < 1) {
        let hour = Math.round(duration * 24);
        return `${hour} ${localString.GlobalLabels.Hour}`;
      } else {
        return `${duration} ${localString.GlobalLabels.Day}`;
      }
    case "en":
      if (duration < 1) {
        let hour = Math.round(duration * 24);
        if (hour <= 1) {
          return `${hour} ${localString.GlobalLabels.Hour}`;
        } else {
          return `${hour} ${localString.GlobalLabels.ManyHours}`;
        }
      } else {
        if (duration > 1) {
          return `${duration} ${localString.GlobalLabels.ManyDays}`;
        } else {
          return `${duration} ${localString.GlobalLabels.Day}`;
        }
      }
  }
};

export const convertToURL = async (value: string) => {
  const res = await fetch(value);
  const blob = await res.blob();
  const blobURL = URL.createObjectURL(blob);
  return `${blobURL}.png`;
};

export const downloadFile = async (fileUrl: string, title: string) => {
  try {
    const response = await axios({
      method: "GET",
      url: fileUrl,
      responseType: "arraybuffer",
    });
    const blob = new Blob([response.data], { type: "image/jpeg" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = title;
    link.click();
  } catch (error) {
    console.error("Error downloading the image:", error);
  }
};

export const convertToAntdDate = (date: string) => {
  const [day, month, year] = date.split("/").map(Number);
  return dayjs(new Date(year, month - 1, day));
};

export const urlToFile = async (
  url: string,
  filename: string
): Promise<UploadFile> => {
  const response = await fetch(url);
  const blob = await response.blob();
  const fileExtension = blob.type.split("/")[1];
  const newFileName = filename.includes(".")
    ? filename
    : `${filename}.${fileExtension}`;
  const file = new File([blob], newFileName, { type: blob.type });
  return {
    uid: newFileName,
    name: newFileName,
    status: "done",
    url: url,
    thumbUrl: url,
    originFileObj: file,
  } as UploadFile;
};

export const paramsChecking = <T extends unknown>(
  value: T | undefined,
  type: "select" | "input"
) => {
  switch (type) {
    case "select":
      return value === "Tất cả" || value === "All" ? undefined : value;
    case "input":
      return isEmpty(value) || isUndefined(value) ? undefined : value;
  }
};

export const createCSVContent = (data: any[]) => {
  if (!data || data.length === 0) return "";
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(","), // Header row
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          if (
            typeof value === "string" &&
            (value.includes(",") || value.includes('"'))
          ) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        })
        .join(",")
    ),
  ];
  return csvRows.join("\n");
};

export const downloadCSV = (content: string, filename: string) => {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
