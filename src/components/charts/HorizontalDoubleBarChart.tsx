import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { Flex, Switch, Typography } from "antd";
import type { TicketsForBranches } from "../../api/company/types";
import EmptyData from "../common/EmptyData";
import CustomToolTip from "../common/CustomToolTip";

type Props = {
  chartData: TicketsForBranches[];
  title: string;
  barColor?: string;
  secondaryBarColor?: string;
};

const HorizontalDoubleBarChart: React.FC<Props> = ({
  chartData,
  title,
  barColor = "#70d5f4",
  secondaryBarColor = "#99a9b7ff",
}) => {
  const [allShow, setAllShow] = useState(false);
  const { Title, Text } = Typography;
  const sortedChartData = [...chartData].sort(
    (a, b) => b.this_year - a.this_year
  );
  const defaultShowData = 15;
  const displayedChartData = allShow
    ? sortedChartData
    : sortedChartData.slice(0, defaultShowData);

  const barHeight = 10;
  const chartHeight = displayedChartData.length * (barHeight * 2 * 1.3) + 60;

  const handleChange = () => {
    setAllShow((prev) => !prev);
  };

  return (
    <>
      <div>
        <Flex style={{ position: "relative", width: "100%", minHeight: 24 }}>
          <Title
            level={4}
            style={{
              margin: 0,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {title}
          </Title>
          {chartData.length > defaultShowData ? (
            <div style={{ marginLeft: "auto" }}>
              全件表示
              <Switch onChange={handleChange} size="small" />
            </div>
          ) : null}
        </Flex>
        {chartData.length === 0 ? (
          <EmptyData />
        ) : (
          <div style={{ height: chartHeight }}>
            <BarChart
              data={displayedChartData}
              width={950}
              height={chartHeight}
              layout="vertical"
              barGap={0}
              margin={{ top: 20, right: 10, bottom: 10, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" />
              <YAxis
                dataKey="department"
                type="category"
                width={200}
                tick={{ fontSize: 14 }}
                tickFormatter={(value: string) =>
                  value.length > 10 ? `${value.slice(0, 15)}...` : value
                }
                interval={0}
              />
              <Tooltip content={CustomToolTip} />
              <Legend formatter={(value: string) => <Text>{value}</Text>} />
              <Bar
                barSize={barHeight}
                dataKey="this_year"
                fill={barColor}
                name={"今年"}
                label={{ position: "insideRight", fill: "#104911" }}
              />
              <Bar
                barSize={barHeight}
                dataKey="last_year"
                fill={secondaryBarColor}
                name={"前年"}
                label={{ position: "insideRight", fill: "#104911" }}
              />
            </BarChart>
          </div>
        )}
      </div>
    </>
  );
};

export default HorizontalDoubleBarChart;
