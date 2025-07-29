import { Suspense, useState, type FC } from "react";
import "./App.css";
import ChartDashBoard from "./components/ChartDashBoard";
import type { Params } from "./api/company/types";
import CompanyFilter from "./components/filter/company/CompanyFilter";
import Loading from "./components/common/Loading";
import EmptyData from "./components/common/EmptyData";
import { Card, Flex, Typography } from "antd";

const App: FC = () => {
  const [companyParams, setCompanyParams] = useState<Params | null>(null);
  const { Title } = Typography;

  return (
    <>
      <div style={{ width: 1000 }}>
        <Flex vertical gap={30}>
          <Title level={2} style={{ margin: 0 }}>
            リアルタイムチケット分析
          </Title>
          <CompanyFilter
            companyParams={companyParams}
            setCompanyParams={setCompanyParams}
          />
          {companyParams ? (
            <Suspense fallback={<Loading />}>
              <ChartDashBoard companyParams={companyParams} />
            </Suspense>
          ) : (
            <Card>
              <EmptyData />
            </Card>
          )}
        </Flex>
      </div>
    </>
  );
};

export default App;
