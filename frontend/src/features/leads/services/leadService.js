import api from "../../../services/api";

export const getLeads = async (params = {}) => {
  const response = await api.get("/leads", { params });
  return response.data;
};

export const createLead = async (lead) => {
  const response = await api.post("/leads", lead, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateLead = async (id, lead) => {
  const response = await api.put(`/leads/${id}`, lead);
  return response.data;
};

export const deleteLead = async (id) => {
  const response = await api.delete(`/leads/${id}`);
  return response.data;
};

export const updateLeadStatus = async (id, status) => {
  const response = await api.patch(`/leads/${id}/status`, { status });
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/stats");
  return response.data;
};
