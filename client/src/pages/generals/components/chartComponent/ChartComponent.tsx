import { Skeleton } from "antd";
import { AuthenticationContext } from "context/AuthenticationContext";
import { useState } from "react";
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { colorFormat } from "utils/format/ColorFormat";

const ChartComponent = (props) => {
  const { data, loading, dataFormat } = props || {};
  const [activeIndex, setActiveIndex] = useState<string | number>("");
  const { localStrings } = AuthenticationContext();
  const tooltipFormatter = (value, name) => {
    const formatMoney = new Intl.NumberFormat().format(value);
    if (name === localStrings.General.Charts.TotalRevenue) {
      return formatMoney + "VND";
    }
    return formatMoney;
  };
  return (
    <Skeleton active loading={loading}>
      <div className="flex flex-col justify-center items-center gap-4 bg-white rounded-md shadow-xl">
        <h1 className="mt-3 textColor" style={{ color: colorFormat?.Blue }}>
          {localStrings.General.Charts.Title}
        </h1>
        <ResponsiveContainer width={"100%"} height={500} className={"p-1"}>
          <ComposedChart
            data={data?.filter(
              (item) => item?.value !== 0 && item?.count !== 0
            )}
            margin={{
              top: 20,
              right: 60,
              bottom: 20,
              left: 80,
            }}
            className="font-bold"
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="time" className="font-bold" />
            <YAxis
              yAxisId="left"
              orientation="left"
              stroke="#003300"
              tickFormatter={dataFormat}
              label={{
                value: localStrings.General.Charts.Transaction,
                angle: 0,
                position: "left",
                fill: "#003300",
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#ff7300"
              tickFormatter={dataFormat}
              label={{
                value: "VND",
                angle: 0,
                position: "right",
                stroke: "#ff7300",
                fill: "#ff7300",
              }}
            />
            <Tooltip formatter={tooltipFormatter} />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="count"
              isAnimationActive={true}
              name={localStrings.General.Charts.SuccessTransaction}
              barSize={25}
              onClick={(data, index) => setActiveIndex(index)}
              fill="#003300"
            >
              {data?.map((entry, index) => (
                <Cell cursor="pointer" key={`cell-${index}`} />
              ))}
            </Bar>
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="value"
              isAnimationActive={true}
              activeDot={{ r: 7 }}
              name={localStrings.General.Charts.TotalRevenue}
              stroke="#ff7300"
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Skeleton>
  );
};

export default ChartComponent;
