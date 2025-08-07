import { useSuspenseQuery } from "@tanstack/react-query";
import { type FC } from "react";
import getDepartmentAnalysis from "../api/department/getDepartmentAnalysis";
import type { Params } from "../api/company/types";
import { Flex } from "antd";
import HorizontalBarChart from "./charts/HorizontalBarChart";
import OverlayAreaChart from "./charts/OverlayAreaChart";
import StackedBarChart from "./charts/StackedBarChart";

type propsType = {
  companyParams: Params;
  selectedDepartment: string;
};
const DepartmentDashBoard: FC<propsType> = (props) => {
  const { companyParams, selectedDepartment } = props;
  const { data: departmentAnalysis } = useSuspenseQuery({
    queryKey: ["departmentAnalysis", companyParams, selectedDepartment],
    queryFn: () =>
      getDepartmentAnalysis({
        ...companyParams,
        department: selectedDepartment,
      }),
    staleTime: 1000 * 60 * 5,
  });

  const barColor = "#FFD449";
  const secondaryBarColor = "#A8D5E2";

  return (
    <>
      <Flex vertical gap={48} style={{ padding: 24 }}>
        <HorizontalBarChart
          chartData={departmentAnalysis?.ticketsForCourses ?? []}
          nameKey="coursename"
          valueKey="sum"
          title="チケット数講座ランキング"
          barColor={barColor}
        />
        <HorizontalBarChart
          chartData={departmentAnalysis?.studentsForCourses ?? []}
          nameKey="coursename"
          valueKey="students"
          title="受講人数講座ランキング"
          barColor={barColor}
        />
        <Flex justify="space-between" gap={48}>
          <OverlayAreaChart
            chartData={departmentAnalysis?.ticketsForMonths ?? []}
            title="月別チケット数"
            colors={{ thisYear: barColor, lastYear: secondaryBarColor }}
          />
          <StackedBarChart
            chartData={departmentAnalysis?.ticketsForTimeslot ?? []}
            title="曜日別チケット数 "
          />
        </Flex>
      </Flex>
    </>
  );
};

export default DepartmentDashBoard;
