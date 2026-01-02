import api from "./axios";

export const getDailyReport = (date) =>
  api.get("/reports/daily", { params: { report_date: date } });

export const downloadDailyPDF = (date) =>
  api.get("/reports/daily/pdf", {
    params: { report_date: date },
    responseType: "blob",
  });
