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

type Props = {
  chartData: TimeSlot[];
  title: string;
  colors?: string[];
};

const defaultColors = [
  "#4F9D69",
  "#7CB9A6",
  "#A8D5E2",
  "#FFD449",
  "#F9A620",
  "#FCB5B5",
];

const StackedBarChart: React.FC<Props> = ({
  chartData,
  title,
  colors = defaultColors,
}) => {
  const dataKeys = [
    "period1",
    "period2",
    "period3",
    "period4",
    "period5",
    "period6",
  ];
  return (
    <>
      <div style={{ height: 300, flex: 1, minWidth: 200 }}>
        {title && <h3 style={{ textAlign: "center" }}>{title}</h3>}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis dataKey="day" type="category" width={100} />
            <YAxis type="number" />
            <Tooltip />
            <Legend align="right" />
            {dataKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="a"
                fill={colors[index % colors.length]}
                name={`第${index + 1}限`}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default StackedBarChart;
