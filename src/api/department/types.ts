export type Params = {
  year: number;
  month: number[];
  company: string;
  department: string;
};

export type TicketsForCancel = {
  month: string;
  cancelOnDay: string;
  noShow: string;
};
