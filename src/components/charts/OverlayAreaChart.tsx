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

type Props = {
  chartData: MonthlyTickets[];
  title?: string;
  colors?: {
    thisYear?: string;
    lastYear?: string;
  };
};

const defaultColors = {
  thisYear: "#1890ff", // 青
  lastYear: "#f5222d", // 赤
};

const OverlayAreaChart: React.FC<Props> = ({
  chartData,
  title,
  colors = defaultColors,
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
          <ResponsiveContainer aspect={1.5}>
            <AreaChart
              data={chartData}
              margin={{ top: 20, right: 10, bottom: 10, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={CustomToolTip} />
              <Legend formatter={(value: string) => <Text>{value}</Text>} />
              <Area
                type="monotone"
                dataKey="last_year"
                stroke={colors.lastYear}
                fill={colors.lastYear}
                name="昨年"
              />
              <Area
                type="monotone"
                dataKey="this_year"
                stroke={colors.thisYear}
                fill={colors.thisYear}
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
