import api from "./axios";

export const getExpenses = (date) =>
  api.get("/expenses", { params: { expense_date: date } });

export const createExpense = (data) => api.post("/expenses", data);
export const updateExpense = (id, data) => api.put(`/expenses/${id}`, data);
export const deleteExpense = (id) => api.delete(`/expenses/${id}`);
