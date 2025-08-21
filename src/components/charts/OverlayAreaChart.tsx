import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import type { MonthlyTickets } from "../../api/company/types";
import { Typography } from "antd";
import CustomToolTip from "../common/CustomToolTip";
import EmptyData from "../common/EmptyData";
import { barColor, secondaryBarColor } from "../../constans/chartColors";

type Props = {
  chartData: MonthlyTickets[];
  title?: string;
};

const OverlayAreaChart: React.FC<Props> = ({ chartData, title }) => {
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
            <AreaChart
              data={chartData}
              margin={{ top: 20, right: 10, bottom: 10, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tickFormatter={(value) => `${value}月`} />
              <YAxis />
              <Tooltip
                content={(props) => (
                  <CustomToolTip {...props} xAxisKey="month" />
                )}
              />
              <Legend formatter={(value: string) => <Text>{value}</Text>} />
              <Area
                type="monotone"
                dataKey="last_year"
                stroke={secondaryBarColor}
                fill={secondaryBarColor}
                name="昨年"
              />
              <Area
                type="monotone"
                dataKey="this_year"
                stroke={barColor}
                fill={barColor}
                name="今年"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </>
  );
};

export default OverlayAreaChart;
