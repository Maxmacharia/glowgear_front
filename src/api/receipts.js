import api from "./axios";

export const getReceipts = (date) =>
  api.get("/receipts", { params: { receipt_date: date } });

export const createReceipt = (data) => api.post("/receipts", data);
export const updateReceipt = (id, data) => api.put(`/receipts/${id}`, data);
export const deleteReceipt = (id) => api.delete(`/receipts/${id}`);
