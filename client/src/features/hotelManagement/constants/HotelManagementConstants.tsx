import { ColumnsType } from "antd/es/table";
import { HotelsResponseModel } from "api/repositories/hotels/model/HotelResponseModel";
import { strings } from "utils/localizedStrings";

export const hotelManagementConstants = {
  columns: [
    {
      title: strings.HotelManagement.Columns.Name,
      dataIndex: "name",
      key: "hotelName",
      align: "center",
    },
    {
      title: strings.HotelManagement.Columns.Code,
      dataIndex: "code",
      key: "hotelCode",
      align: "center",
    },
    {
      title: strings.HotelManagement.Columns.City,
      dataIndex: "city",
      key: "hotelCity",
      align: "center",
    },
    {
      title: strings.HotelManagement.Columns.Address,
      dataIndex: "address",
      key: "hotelAddress",
      align: "center",
    },
  ] as ColumnsType<HotelsResponseModel>,
};
