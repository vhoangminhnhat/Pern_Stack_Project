import { Col, Row, Skeleton } from "antd";
import { AuthenticationContext } from "context/AuthenticationContext";
import moment from "moment";

const RevenueComponent = (props) => {
  const { data, loading } = props;
  const { localStrings } = AuthenticationContext();
  return (
    <Skeleton active loading={loading}>
      <Row gutter={[8, 8]} className="p-2">
        <Col xs={24} md={12}>
          <div className="flex flex-col gap-3 p-4 bg-white rounded-lg text-black shadow-lg">
            <h1 className="text-base md:text-lg italic">
              {localStrings.General.Revenue.Day} ({" "}
              {moment().format("DD-MM-YYYY")} )
            </h1>
            <span
              className={`font-bold text-lg ${
                data?.day !== 0 ? "text-green-600" : "text-red-700"
              }`}
            >
              {new Intl.NumberFormat().format(data?.day)} VND
            </span>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className="flex flex-col gap-3 p-4 bg-white rounded-lg text-black shadow-lg">
            <h1 className="text-base md:text-lg italic">
              {localStrings.General.Revenue.Week} ({" "}
              {localStrings.General.Revenue.WeekOfYear} {moment().format("WW")}-
              {moment().format("YYYY")} )
            </h1>
            <span
              className={`font-bold text-lg ${
                data?.week !== 0 ? "text-green-600" : "text-red-700"
              }`}
            >
              {new Intl.NumberFormat().format(data?.week)} VND
            </span>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className="flex flex-col gap-3 p-4 bg-white rounded-lg text-black shadow-lg">
            <h1 className="text-base md:text-lg italic">
              {localStrings.General.Revenue.Month} ({" "}
              {moment().format("MM-YYYY")} )
            </h1>
            <span
              className={`font-bold text-lg ${
                data?.month !== 0 ? "text-green-600" : "text-red-700"
              }`}
            >
              {new Intl.NumberFormat().format(data?.month)} VND
            </span>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className="flex flex-col gap-3 p-4 bg-white rounded-lg text-black shadow-lg">
            <h1 className="text-base md:text-lg italic">
              {localStrings.General.Revenue.LastMonth} ({" "}
              {moment().subtract(1, "month").format("MM-YYYY")} )
            </h1>
            <span
              className={`font-bold text-lg ${
                data?.lastMonth !== 0 ? "text-green-600" : "text-red-700"
              }`}
            >
              {new Intl.NumberFormat().format(data?.lastMonth)} VND
            </span>
          </div>
        </Col>
      </Row>
    </Skeleton>
  );
};

export default RevenueComponent;
