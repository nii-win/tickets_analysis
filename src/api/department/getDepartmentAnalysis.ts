import { axiosInstance } from "../../lib/axios";
import type { Params } from "./types";

const getDepartmentAnalysis = async (values: Params) => {
  const formattedDepartment = values.department.match(/^\d+/)?.[0];
  const res = await axiosInstance.get(
    `tickets_analysis/${formattedDepartment}?companyName=${values.company}&year=${values.year}&months=${values.month}`
  );

  return res.data;
};
export default getDepartmentAnalysis;
