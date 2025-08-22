const getFiscalInfo = () => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentFY = now.getFullYear() + (currentMonth >= 7 ? 1 : 0);

  const years = [currentFY - 3,currentFY - 2, currentFY - 1, currentFY];
  const allMonths = [7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6];
  const quarters = [
    { label: "Q1", range: [7, 8, 9] },
    { label: "Q2", range: [10, 11, 12] },
    { label: "Q3", range: [1, 2, 3] },
    { label: "Q4", range: [4, 5, 6] },
  ];
  const companies = [
    "THD",
    "TPD",
    "TPE",
    "TPI",
    "TCSN",
    "TPDN",
    "TPEN",
    "TPIN",
  ];

  const getAvailableMonths = (selectedFY: number | null): number[] => {
    if (!selectedFY || selectedFY < currentFY) {
      return allMonths;
    }

    if (currentMonth >= 7) {
      return allMonths.filter((m) => m >= 7 && m <= currentMonth);
    } else {
      return allMonths.filter((m) => m >= 7 || m <= currentMonth);
    }
  };

  return {
    currentFY,
    years,
    allMonths,
    quarters,
    companies,
    getAvailableMonths,
  };
};

export default getFiscalInfo;
