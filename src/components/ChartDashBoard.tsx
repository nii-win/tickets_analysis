import { type FC } from "react";
import HorizontalBarChart from "./charts/HorizontalBarChart";
import HorizontalDoubleBarChart from "./charts/HorizontalDoubleBarChart";
import { Card, Flex } from "antd";
import type {
  // CourseTickets,
  // MonthlyTickets,
  Params,
  // StudentsForCourses,
  // TimeSlot,
} from "../api/company/types";
import getCompanyAnalysis from "../api/company/getCompanyAnalysis";
import { useSuspenseQuery } from "@tanstack/react-query";
// import OverlayAreaChart from "./charts/OverlayAreaChart";
// import StackedBarChart from "./charts/StackedBarChart";

// type DepartmentAnalysis = {
//   courseTickets: CourseTickets[];
//   courseStudents: StudentsForCourses[];
//   timeSlot: TimeSlot[];
//   monthlyTickets: MonthlyTickets[];
// };

type propsType = {
  companyParams: Params | null;
};

const ChartDashBoard: FC<propsType> = (props) => {
  const { companyParams } = props;
  const { data: companyAnalysis } = useSuspenseQuery({
    queryKey: ["companyAnalysis", companyParams],
    queryFn: () => getCompanyAnalysis(companyParams!),
    staleTime: 1000 * 60 * 5,
  });
  // const { Title } = Typography;
  const barColor = "#FFD449";
  const secondaryBarColor = "#A8D5E2";

  // const [departmentAnalysis, setDepartmentAnalysis] =
  //   useState<DepartmentAnalysis | null>(null);

  // useEffect(() => {
  //   fetch("/departmentAnalysis")
  //     .then((res) => res.json())
  //     .then((data) => setDepartmentAnalysis(data));
  // }, []);

  return (
    <>
      <Card>
        <Flex vertical gap={48}>
          <HorizontalDoubleBarChart
            chartData={companyAnalysis?.ticketsForBranches ?? []}
            title="チケット数支店ランキング"
            barColor={barColor}
            secondaryBarColor={secondaryBarColor}
          />
          <HorizontalBarChart
            chartData={companyAnalysis?.studentsForBranches ?? []}
            nameKey="department"
            valueKey="students"
            title="受講人数支店ランキング"
            barColor={barColor}
          />
          <HorizontalBarChart
            chartData={companyAnalysis?.studentsForCourses ?? []}
            nameKey="coursename"
            valueKey="students"
            title="受講人数講座ランキング"
            barColor={barColor}
          />
        </Flex>
      </Card>
      {/* <Title level={1} style={{ textAlign: "center", marginTop: 48 }}>
        PCA新宿支店チケット分析
      </Title>
      <Flex vertical gap={48}>
        <HorizontalBarChart
          chartData={departmentAnalysis?.courseTickets ?? []}
          nameKey="coursename"
          valueKey="tickets"
          title="チケット数講座ランキング"
          barColor={barColor}
        />
        <HorizontalBarChart
          chartData={departmentAnalysis?.courseStudents ?? []}
          nameKey="coursename"
          valueKey="students"
          title="受講人数講座ランキング"
          barColor={barColor}
        />
        <Flex justify="space-between" gap={48}>
          <OverlayAreaChart
            chartData={departmentAnalysis?.monthlyTickets ?? []}
            title="月別チケット数"
            colors={{ thisYear: barColor, lastYear: secondaryBarColor }}
          />
          <StackedBarChart
            chartData={departmentAnalysis?.timeSlot ?? []}
            title="曜日別チケット数 "
          />
        </Flex>
      </Flex> */}
    </>
  );
};

export default ChartDashBoard;
