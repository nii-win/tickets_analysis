type WithMonth = { month: string | number };

const sortByFyMonth = <T extends WithMonth>(data: T[]): T[] => {
  const fyMonthOrder: number[] = [7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6];
  return [...data].sort(
    (a, b) =>
      fyMonthOrder.indexOf(Number(a.month)) -
      fyMonthOrder.indexOf(Number(b.month))
  );
};

export default sortByFyMonth;
