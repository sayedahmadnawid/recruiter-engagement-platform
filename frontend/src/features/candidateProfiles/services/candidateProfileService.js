import api from "../../../services/api";

export const getCandidateByLeadId = async (leadId) => {
  const response = await api.get(`/leads/${leadId}/candidate-profile`);
  return response.data;
};

export const updateCandidateProfile = async (id, data) => {
  const response = await api.put(`/candidate-profiles/${id}`, data);
  return response.data;
};
