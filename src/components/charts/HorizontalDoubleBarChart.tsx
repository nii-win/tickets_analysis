import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  LabelList,
  Label,
} from "recharts";
import { Flex, Switch, Typography } from "antd";
import type { TicketsForBranches } from "../../api/company/types";
import EmptyData from "../common/EmptyData";
import CustomToolTip from "../common/CustomToolTip";
import type { BarRectangleItem } from "recharts/types/cartesian/Bar";
import { barColor, secondaryBarColor } from "../../constans/chartColors";

type Props = {
  chartData: TicketsForBranches[];
  title: string;
  handleBarClick?: (departmentName: string) => void;
};

const HorizontalDoubleBarChart: React.FC<Props> = ({
  chartData,
  title,
  handleBarClick,
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
          <div style={{ width: "100%" }}>
            <ResponsiveContainer height={chartHeight}>
              <BarChart
                data={displayedChartData}
                layout="vertical"
                barGap={0}
                margin={{ top: 20, right: 10, bottom: 10, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number">
                  <Label
                    value="チケット数"
                    offset={-5}
                    position="insideBottom"
                  />
                </XAxis>
                <YAxis
                  dataKey="department"
                  type="category"
                  width={250}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value: string) => {
                    const str = String(value);
                    const index = str.indexOf("_");
                    return index !== -1 ? str.slice(index + 1) : str;
                  }}
                  interval={0}
                />
                <Tooltip content={CustomToolTip} />
                <Legend
                  formatter={(value: string) => <Text>{value}</Text>}
                  wrapperStyle={{ bottom: -5, left: 100 }}
                />
                <Bar
                  barSize={barHeight}
                  dataKey="this_year"
                  fill={barColor}
                  name={"今年"}
                  onClick={(data: BarRectangleItem) => {
                    handleBarClick?.(data.payload.department);
                  }}
                  style={{ cursor: handleBarClick ? "pointer" : "default" }}
                >
                  <LabelList
                    dataKey="this_year"
                    formatter={(value) => {
                      const num = Number(value);
                      if (num === 0) return "";
                      if (num % 1 === 0) return num;
                      return num.toFixed(2);
                    }}
                    position="insideRight"
                  />
                </Bar>
                <Bar
                  barSize={barHeight}
                  dataKey="last_year"
                  fill={secondaryBarColor}
                  name={"前年"}
                  onClick={(data: BarRectangleItem) => {
                    handleBarClick?.(data.payload.department);
                  }}
                  style={{ cursor: handleBarClick ? "pointer" : "default" }}
                >
                  <LabelList
                    dataKey="last_year"
                    formatter={(value) =>
                      Number(value) === 0 ? "" : Number(value).toFixed(2)
                    }
                    position="insideRight"
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </>
  );
};

export default HorizontalDoubleBarChart;
