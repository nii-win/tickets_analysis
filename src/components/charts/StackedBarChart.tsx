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
import EmptyData from "../common/EmptyData";

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
  const { Title, Text } = Typography;
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
      <div style={{ flex: 1, minWidth: 200 }}>
        <Title level={4} style={{ textAlign: "center" }}>
          {title}
        </Title>
        {chartData.length === 0 ? (
          <EmptyData />
        ) : (
          <ResponsiveContainer aspect={1.5}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 10, bottom: 10, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" type="category" />
              <YAxis type="number" />
              <Tooltip content={CustomToolTip} />
              <Legend
                align="right"
                formatter={(value: string) => <Text>{value}</Text>}
              />
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
        )}
      </div>
    </>
  );
};

export default StackedBarChart;
