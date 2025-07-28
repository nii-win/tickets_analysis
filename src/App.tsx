import { useState, type FC } from "react";
import "./App.css";
import ChartDashBoard from "./components/ChartDashBoard";
import type { Params } from "./api/company/types";
import CompanyFilter from "./components/filter/company/CompanyFilter";

const App: FC = () => {
  const [companyParams, setCompanyParams] = useState<Params | null>(null);

  return (
    <>
      <div style={{ width: 1000 }}>
        <CompanyFilter
          companyParams={companyParams}
          setCompanyParams={setCompanyParams}
        />
        <ChartDashBoard companyParams={companyParams} />
      </div>
    </>
  );
};

export default App;
