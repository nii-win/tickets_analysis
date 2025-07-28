export type Params = { year: number; month: number[]; company: string };

export type StudentsForBranches = {
  department: string;
  students: number;
};

export type StudentsForCourses = {
  coursename: string;
  students: number;
};

export type TicketsForBranches = {
  department: string;
  this_year: number;
  next_year: number;
};

export type CourseTickets = {
  coursename: string;
  tickets: number;
};

export type TimeSlot = {
  day: string;
  period1: number;
  period2: number;
  period3: number;
  period4: number;
  period5: number;
  period6: number;
};

export type MonthlyTickets = {
  month: string;
  this_year: number;
  last_year: number;
};

export type CompanyAnalysis = {
  departments: string[];
  studentsForBranches: StudentsForBranches[];
  studentsForCourses: StudentsForCourses[];
  ticketsForBranches: TicketsForBranches[];
};
