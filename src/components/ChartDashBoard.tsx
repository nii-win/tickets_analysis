import { Suspense, useState, type FC } from "react";
import HorizontalBarChart from "./charts/HorizontalBarChart";
import HorizontalDoubleBarChart from "./charts/HorizontalDoubleBarChart";
import { Card, Flex, Modal, Typography } from "antd";
import type { Params } from "../api/company/types";
import getCompanyAnalysis from "../api/company/getCompanyAnalysis";
import { useSuspenseQuery } from "@tanstack/react-query";
import Loading from "./common/Loading";
import DepartmentDashBoard from "./DepartmentDashBoard";

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
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Title } = Typography;

  const handleBarClick = (departmentName: string) => {
    setSelectedDepartment(departmentName);
    setIsModalVisible(true);
  };

  return (
    <>
      <Card>
        <Flex vertical gap={48}>
          <HorizontalDoubleBarChart
            chartData={companyAnalysis?.ticketsForBranches ?? []}
            title="チケット数支店ランキング"
            handleBarClick={handleBarClick}
          />
          <HorizontalBarChart
            chartData={companyAnalysis?.studentsForBranches ?? []}
            nameKey="department"
            valueKey="students"
            title="受講人数支店ランキング"
            handleBarClick={handleBarClick}
          />
          <HorizontalBarChart
            chartData={companyAnalysis?.studentsForCourses ?? []}
            nameKey="coursename"
            valueKey="students"
            title="受講人数講座ランキング"
          />
        </Flex>
      </Card>
      <Modal
        title={
          <Title level={3} style={{ textAlign: "center", margin: 0 }}>
            {selectedDepartment}チケット分析
          </Title>
        }
        width={1000}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        destroyOnHidden
        styles={{ body: { maxHeight: "80vh", overflowY: "auto" } }}
      >
        {companyParams && selectedDepartment && (
          <Suspense fallback={<Loading />}>
            <DepartmentDashBoard
              companyParams={companyParams}
              selectedDepartment={selectedDepartment}
            />
          </Suspense>
        )}
      </Modal>
    </>
  );
};

export default ChartDashBoard;
