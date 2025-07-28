import { http, HttpResponse } from "msw";
import { branchTicketsForCompany } from "./mock-data/branchTicketsForCompany";
import { branchStudentsForCompany } from "./mock-data/branchStudentsForCompany";
import { courseStudentsForCompany } from "./mock-data/courseStudentsForCompany";
import { timeSlot } from "./mock-data/timeSlot";
import { monthlyTickets } from "./mock-data/monthlyTickets";
import { courseStudents } from "./mock-data/courseStudents";
import { courseTickets } from "./mock-data/courseTickets";

export const handlers = [
  http.get("/tickets-analysis", () => {
    return HttpResponse.json({
      branchTicketsForCompany: branchTicketsForCompany,
      courseStudentsForCompany: courseStudentsForCompany,
      branchStudentsForCompany: branchStudentsForCompany,
      courseTickets: courseTickets,
      courseStudents: courseStudents,
      timeSlot: timeSlot,
      monthlyTickets: monthlyTickets,
    });
  }),
  http.get("/departmentAnalysis", () => {
    return HttpResponse.json({
      courseTickets: courseTickets,
      courseStudents: courseStudents,
      timeSlot: timeSlot,
      monthlyTickets: monthlyTickets,
    });
  }),
];
