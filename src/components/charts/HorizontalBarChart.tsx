import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  Rectangle,
  CartesianGrid,
} from "recharts";
import type {} from "../ChartDashBoard";
import { Flex, Switch, Typography } from "antd";
import type {
  CourseTickets,
  StudentsForBranches,
  StudentsForCourses,
} from "../../api/company/types";
import EmptyData from "../common/EmptyData";
import CustomToolTip from "../common/CustomToolTip";

type ChartData = StudentsForBranches | StudentsForCourses | CourseTickets;
type Props = {
  chartData: ChartData[];
  nameKey: string;
  valueKey: string;
  barColor?: string;
  title: string;
};

const HorizontalBarChart: React.FC<Props> = ({
  chartData,
  nameKey,
  valueKey,
  title,
  barColor = "#70d5f4",
}) => {
  const [allShow, setAllShow] = useState(false);
  const { Title } = Typography;

  const sortedChartData = [...chartData].sort((a, b) => {
    const aValue = a[valueKey as keyof ChartData];
    const bValue = b[valueKey as keyof ChartData];
    return (bValue as number) - (aValue as number);
  });

  const defaultShowData = 20;
  const displayedChartData = allShow
    ? sortedChartData
    : sortedChartData.slice(0, defaultShowData);

  const barHeight = 15;
  const chartHeight = displayedChartData.length * (barHeight * 1.2) + 60;

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
          <div style={{ width: "100%" }}>
            <BarChart
              width={950}
              height={chartHeight}
              layout="vertical"
              data={displayedChartData}
              margin={{ top: 20, right: 10, bottom: 10, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" />
              <YAxis
                dataKey={nameKey}
                type="category"
                width={200}
                tick={{
                  fontSize: 14,
                }}
                tickFormatter={(value: string) =>
                  value.length > 10 ? `${value.slice(0, 15)}...` : value
                }
                interval={0}
              />
              <Tooltip content={CustomToolTip} />
              <Bar
                dataKey={valueKey}
                barSize={barHeight}
                fill={barColor}
                activeBar={<Rectangle fill="#99a9b7ff" />}
                label={{ position: "insideRight", fill: "#104911" }}
                name={valueKey === "tickets" ? "チケット数" : "受講人数"}
              >
                {displayedChartData.map((_, index) => (
                  <Cell key={`cell-${index}`} />
                ))}
              </Bar>
            </BarChart>
          </div>
        )}
      </div>
    </>
  );
};

export default HorizontalBarChart;
