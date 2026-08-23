import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
  updateLeadStatus,
} from "../services/leadService";

import { useToast } from "../../../context/ToastContext";

export function useLeads({ searchTerm, statusFilter, currentPage }) {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingLead, setEditingLead] = useState(null);
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
  });

  const navigate = useNavigate();
  const { showToast } = useToast();

  const loadLeads = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = {
        search: searchTerm,
        status: statusFilter,
        page: currentPage,
      };

      const response = await getLeads(params);

      // Laravel paginate metadata maps results to data key
      setLeads(response.data || []);
      setPaginationData({
        currentPage: response.current_page,
        lastPage: response.last_page,
        total: response.total,
      });
    } catch (error) {
      console.error("Error loading leads:", error);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, statusFilter, currentPage]);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const handleCreateLead = async (leadData) => {
    try {
      await createLead(leadData);
      await loadLeads();
    } catch (error) {
      console.error(error);
      throw error; // re-thrown so LeadForm's submitAction can catch it
    }
  };

  const handleEditLead = (lead) => {
    setEditingLead(lead);
  };

  const handleViewLead = (leadData) => {
    navigate(`/leads/${leadData.id}/profile`);
  };

  const handleUpdateLead = async (leadData) => {
    try {
      await updateLead(editingLead.id, leadData);
      setEditingLead(null);
      await loadLeads();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleDeleteLead = async (id) => {
    const confirmed = window.confirm("Delete this lead?");
    if (!confirmed) return;

    try {
      await deleteLead(id);
      showToast("Lead deleted successfully!", "success");
      await loadLeads();
    } catch (error) {
      console.error(error);
      showToast("Failed to delete lead.", "error");
    }
  };

  const handleStatusChange = async (leadId, newStatus) => {
    const originalLeads = [...leads];

    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead,
      ),
    );

    try {
      await updateLeadStatus(leadId, newStatus);
    } catch (error) {
      console.error("Status update failed:", error);
      setLeads(originalLeads);
    }
  };

  return {
    leads,
    isLoading,
    editingLead,
    setEditingLead,
    paginationData,
    loadLeads,
    handleCreateLead,
    handleEditLead,
    handleViewLead,
    handleUpdateLead,
    handleDeleteLead,
    handleStatusChange,
  };
}
