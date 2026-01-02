import api from "./axios";

export const getInvoices = (date) =>
  api.get("/invoices", { params: { invoice_date: date } });

export const createInvoice = (data) => api.post("/invoices", data);
export const updateInvoice = (id, data) => api.put(`/invoices/${id}`, data);
export const deleteInvoice = (id) => api.delete(`/invoices/${id}`);
