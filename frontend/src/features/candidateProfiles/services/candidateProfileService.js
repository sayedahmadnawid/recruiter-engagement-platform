import api from "../../../services/api";

export const getCandidateByLeadId = async (leadId) => {
  const response = await api.get(`/leads/${leadId}/candidate-profile`);
  return response.data;
};

export const updateCandidateProfile = async (id, data) => {
  const response = await api.put(`/candidate-profiles/${id}`, data);
  return response.data;
};

export const updateCandidateBasicInfo = async (id, data) => {
  const response = await api.put(`/candidate-profiles/${id}/basicInfo`, data);
  return response.data;
};

export const updateCandidateSkills = async (id, data) => {
  const response = await api.put(`/candidate-profiles/${id}/skills`, data);
  return response.data;
};

export const updateCandidateExperience = async (id, data) => {
  const response = await api.put(`/candidate-profiles/${id}/experience`, data);
  return response.data;
};

export const updateCandidateEducation = async (id, data) => {
  const response = await api.put(`/candidate-profiles/${id}/education`, data);
  return response.data;
};

export const updateCandidateCertifications = async (id, data) => {
  const response = await api.put(`/candidate-profiles/${id}/certifications`, data);
  return response.data;
};

export const searchCandidateById = async (query) => {
  const { data } = await api.post("/candidates/search", { query });
  return data.results;
};