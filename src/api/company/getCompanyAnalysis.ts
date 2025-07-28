import { axiosInstance } from "../../lib/axios";
import type { CompanyAnalysis, Params } from "./types";

const getCompanyAnalysis = async (values: Params) => {
  const res = await axiosInstance.get<CompanyAnalysis>(
    `tickets_analysis?companyName=${values.company}&year=${values.year}&months=${values.month}`
  );

  console.log(res);
  return res.data;
};

export default getCompanyAnalysis;
