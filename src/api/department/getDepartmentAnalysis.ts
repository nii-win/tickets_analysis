const getDepartmentAnalysis = async () => {
  const res = await fetch("/departmentAnalysis");
  console.log(res);

  return res.json();
};

export default getDepartmentAnalysis;
