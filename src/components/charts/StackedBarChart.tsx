import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import type { TimeSlot } from "../../api/company/types";
import { Typography } from "antd";
import CustomToolTip from "../common/CustomToolTip";
import { timeSlotColors } from "../../constans/chartColors";
import EmptyData from "../common/EmptyData";
import type { TicketsForCancel } from "../../api/department/types";

type Props = {
  chartData: TimeSlot[]|TicketsForCancel[];
  title: string;
  dataKeys: { key: string; label: string }[];
  xAxisKey: string;
};

const StackedBarChart: React.FC<Props> = ({
  chartData,
  title,
  dataKeys,
  xAxisKey,
}) => {
  const { Title, Text } = Typography;

  return (
    <>
      <div style={{ flex: 1, minWidth: 200 }}>
        <Title level={4} style={{ textAlign: "center" }}>
          {title}
        </Title>
        {chartData.length === 0 ? (
          <EmptyData />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 10, bottom: 10, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey={xAxisKey}
                type="category"
                tickFormatter={(value) =>
                  xAxisKey === "month" ? `${value}月` : value
                }
                interval={0}
              />
              <YAxis type="number" />
              <Tooltip
                content={(props) => (
                  <CustomToolTip {...props} xAxisKey={xAxisKey} />
                )}
              />
              <Legend
                formatter={(value: string) => <Text>{value}</Text>}
              />
              {dataKeys.map((datakey, index) => (
                <Bar
                  key={datakey.key}
                  dataKey={datakey.key}
                  stackId="a"
                  fill={timeSlotColors[index]}
                  name={datakey.label}
                  maxBarSize={40}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </>
  );
};

export default StackedBarChart;
