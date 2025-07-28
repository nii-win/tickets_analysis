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
  return (
    <>
      <div style={{ height: 300, flex: 1, minWidth: 200 }}>
        {title && <h3 style={{ textAlign: "center" }}>{title}</h3>}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />

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
      </div>
    </>
  );
};

export default OverlayAreaChart;
