import { useSuspenseQuery } from "@tanstack/react-query";
import { type FC } from "react";
import getDepartmentAnalysis from "../api/department/getDepartmentAnalysis";
import type { Params } from "../api/company/types";
import { Flex } from "antd";
import HorizontalBarChart from "./charts/HorizontalBarChart";
import OverlayAreaChart from "./charts/OverlayAreaChart";
import StackedBarChart from "./charts/StackedBarChart";
import { cancelKeys, timeSlotKeys } from "../constans/chartDataKeys";

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

  return (
    <>
      <Flex vertical gap={48} style={{ padding: 24 }}>
        <HorizontalBarChart
          chartData={departmentAnalysis?.ticketsForCourses ?? []}
          nameKey="coursename"
          valueKey="sum"
          title="チケット数講座ランキング"
        />
        <HorizontalBarChart
          chartData={departmentAnalysis?.studentsForCourses ?? []}
          nameKey="coursename"
          valueKey="students"
          title="受講人数講座ランキング"
        />
        <Flex justify="space-between" gap={48}>
          <OverlayAreaChart
            chartData={departmentAnalysis?.ticketsForMonths ?? []}
            title="月別チケット数"
          />
          <StackedBarChart
            chartData={departmentAnalysis?.ticketsForTimeslot ?? []}
            title="受講時間帯別チケット数 "
            dataKeys={timeSlotKeys}
            xAxisKey="day"
          />
        </Flex>
        <Flex justify="space-between" gap={48}>
          <StackedBarChart
            chartData={departmentAnalysis?.ticketsForCancels ?? []}
            title="月別キャンセルチケット数 "
            dataKeys={cancelKeys}
            xAxisKey="month"
          />
          <StackedBarChart
            chartData={departmentAnalysis?.studentsForCancels ?? []}
            title="受講時間帯別キャンセル受講人数 "
            dataKeys={timeSlotKeys}
            xAxisKey="day"
          />
        </Flex>
      </Flex>
    </>
  );
};

export default DepartmentDashBoard;
